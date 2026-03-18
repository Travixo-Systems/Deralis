import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL;
const toEmail = process.env.RESEND_TO_EMAIL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source, name } = body || {};

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send notification email to the team
    if (resendApiKey && fromEmail && toEmail) {
      const resend = new Resend(resendApiKey);

      const sourceLabels: Record<string, string> = {
        newsletter: "Newsletter Signup",
        lead_magnet: "Lead Magnet Download",
        exit_intent: "Exit Intent Popup",
        roi_calculator: "ROI Calculator",
        footer: "Footer Signup",
      };

      const sourceLabel = sourceLabels[source] || source || "Unknown";

      await resend.emails.send({
        from: `Deralis Digital <${fromEmail}>`,
        to: [toEmail],
        subject: `New Lead: ${sourceLabel} — ${email}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0f172a; border-bottom: 2px solid #22d3ee; padding-bottom: 10px;">
              New Lead Captured
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 120px;">Source:</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${sourceLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Email:</td>
                <td style="padding: 8px 0; color: #0f172a;">
                  <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
                </td>
              </tr>
              ${name ? `<tr>
                <td style="padding: 8px 0; color: #64748b;">Name:</td>
                <td style="padding: 8px 0; color: #0f172a;">${name}</td>
              </tr>` : ""}
            </table>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 30px;">
              Lead captured from deralis.digital
            </p>
          </div>
        `,
        text: `New Lead: ${sourceLabel}\nEmail: ${email}${name ? `\nName: ${name}` : ""}`,
      });
    }

    return NextResponse.json(
      { success: true, message: "Lead captured successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
