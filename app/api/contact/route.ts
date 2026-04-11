import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_NAME = 200;
const MAX_EMAIL = 200;
const MAX_COMPANY = 200;
const MAX_WEBSITE = 500;
const MAX_MESSAGE = 5000;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Best-effort in-memory rate limit. Serverless instances are ephemeral and
// not shared, so this blunts casual abuse but is not a hard guarantee. For
// durable limits, back this with Upstash/Redis.
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 5;
const rateBuckets = new Map<string, number[]>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const hits = (rateBuckets.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) {
    rateBuckets.set(ip, hits);
    return false;
  }
  hits.push(now);
  rateBuckets.set(ip, hits);
  return true;
}

export async function POST(request: NextRequest) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.RESEND_TO_EMAIL;

  if (!resendApiKey || !fromEmail || !toEmail) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 503 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const resend = new Resend(resendApiKey);

  try {
    const body = await request.json();
    const { name, email, company, website, message, locale } = body || {};

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate types and length caps
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      (company != null && typeof company !== "string") ||
      (website != null && typeof website !== "string")
    ) {
      return NextResponse.json(
        { error: "Invalid field types" },
        { status: 400 }
      );
    }

    if (
      name.length > MAX_NAME ||
      email.length > MAX_EMAIL ||
      (company && company.length > MAX_COMPANY) ||
      (website && website.length > MAX_WEBSITE) ||
      message.length > MAX_MESSAGE
    ) {
      return NextResponse.json(
        { error: "Input too long" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = company ? escapeHtml(company) : "Not provided";
    const safeWebsite = website ? escapeHtml(website) : "Not provided";
    const safeMessage = escapeHtml(message);

    const emailHtml = `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #14110D; border-bottom: 1px solid #D4CCBA; padding-bottom: 10px;">
          New inquiry from ${safeName}
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px 0; color: #6B655C; width: 120px;">Name:</td>
            <td style="padding: 8px 0; color: #14110D; font-weight: 500;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6B655C;">Email:</td>
            <td style="padding: 8px 0; color: #14110D;">
              <a href="mailto:${safeEmail}" style="color: #1B3A5C;">${safeEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6B655C;">Company:</td>
            <td style="padding: 8px 0; color: #14110D;">${safeCompany}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6B655C;">Website:</td>
            <td style="padding: 8px 0; color: #14110D;">${safeWebsite}</td>
          </tr>
        </table>
        <div style="background: #F2EEE6; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <h3 style="color: #14110D; margin-top: 0;">Message:</h3>
          <p style="color: #14110D; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
        </div>
        <p style="color: #9A9388; font-size: 12px; margin-top: 30px;">
          Sent from deralis.digital contact form
        </p>
      </div>
    `;

    // Strip CR/LF from single-line fields to block header injection
    const singleLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();
    const subjectName = singleLine(name).slice(0, 100);
    const subjectCompany = company ? singleLine(company).slice(0, 100) : "";

    const emailText = `
New inquiry from ${name}
===========================

Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Website: ${website || "Not provided"}

Message:
${message}

---
Sent from deralis.digital contact form
    `.trim();

    const { data, error } = await resend.emails.send({
      from: `Deralis Digital <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `New inquiry from ${subjectName}${subjectCompany ? ` (${subjectCompany})` : ""}`,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", data?.id);

    // Send auto-reply to buyer (non-blocking)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://deralisdigital.com";
    const isFr = locale === "fr";
    const replySubject = isFr
      ? "Message bien re\u00e7u. Je vous r\u00e9ponds bient\u00f4t"
      : "Got your message. I'll reply soon";
    const replyBody = isFr
      ? `Merci pour votre message. Je lis chaque message personnellement et je vous r\u00e9ponds sous 2 jours ouvr\u00e9s.\n\nSi vous savez d\u00e9j\u00e0 que vous souhaitez avancer, l'audit est la voie la plus directe\u00a0:\n${siteUrl}/fr/audit\n\nUwa\nDeralis Digital`
      : `Thanks for your message. I read every contact form submission personally and I'll reply within 2 working days.\n\nIf you already know you want to move forward, the audit is the faster path:\n${siteUrl}/audit\n\nUwa\nDeralis Digital`;

    resend.emails
      .send({
        from: `Deralis Digital <${fromEmail}>`,
        to: [email],
        replyTo: fromEmail,
        subject: replySubject,
        text: replyBody,
      })
      .catch((err) => console.error("Auto-reply error:", err));

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
