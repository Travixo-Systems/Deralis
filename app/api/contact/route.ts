import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const emailHtml = `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #14110D; border-bottom: 1px solid #D4CCBA; padding-bottom: 10px;">
          New inquiry from ${name}
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px 0; color: #6B655C; width: 120px;">Name:</td>
            <td style="padding: 8px 0; color: #14110D; font-weight: 500;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6B655C;">Email:</td>
            <td style="padding: 8px 0; color: #14110D;">
              <a href="mailto:${email}" style="color: #1B3A5C;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6B655C;">Company:</td>
            <td style="padding: 8px 0; color: #14110D;">${company || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6B655C;">Website:</td>
            <td style="padding: 8px 0; color: #14110D;">${website || "Not provided"}</td>
          </tr>
        </table>
        <div style="background: #F2EEE6; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <h3 style="color: #14110D; margin-top: 0;">Message:</h3>
          <p style="color: #14110D; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="color: #9A9388; font-size: 12px; margin-top: 30px;">
          Sent from deralis.digital contact form
        </p>
      </div>
    `;

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
      subject: `New inquiry from ${name}${company ? ` (${company})` : ""}`,
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
