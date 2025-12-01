import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY!;
const fromEmail = process.env.RESEND_FROM_EMAIL!;
const toEmail = process.env.RESEND_TO_EMAIL!;

if (!resendApiKey) {
  throw new Error("RESEND_API_KEY is not set in environment variables");
}
if (!fromEmail) {
  throw new Error("RESEND_FROM_EMAIL is not set in environment variables");
}
if (!toEmail) {
  throw new Error("RESEND_TO_EMAIL is not set in environment variables");
}

const resend = new Resend(resendApiKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, message } = body || {};

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

    // Service labels
    const serviceLabels: Record<string, string> = {
      consulting: "Strategic Consulting",
      development: "Full-Stack Development",
      ai: "AI & Automation",
      support: "Ongoing Support",
      other: "Other / Not sure",
    };

    const serviceName = serviceLabels[service as string] || service || "Not specified";

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0f172a; border-bottom: 2px solid #22d3ee; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; width: 120px;">Name:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Email:</td>
            <td style="padding: 8px 0; color: #0f172a;">
              <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Company:</td>
            <td style="padding: 8px 0; color: #0f172a;">${company || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Service:</td>
            <td style="padding: 8px 0; color: #0f172a;">${serviceName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Budget:</td>
            <td style="padding: 8px 0; color: #0f172a;">${budget || "Not specified"}</td>
          </tr>
        </table>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <h3 style="color: #0f172a; margin-top: 0;">Message:</h3>
          <p style="color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 30px;">
          Sent from deralis.digital contact form
        </p>
      </div>
    `;

    const emailText = `
New Contact Form Submission
===========================

Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Service: ${serviceName}
Budget: ${budget || "Not specified"}

Message:
${message}

---
Sent from deralis.digital contact form
    `.trim();

    const { data, error } = await resend.emails.send({
      from: `Deralis Digital <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `New inquiry from ${name} - ${serviceName}`,
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
