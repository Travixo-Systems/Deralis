import { NextRequest, NextResponse } from "next/server";

// TODO: Install resend: npm install resend
// import { Resend } from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, message } = body;

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

    // Format service name
    const serviceLabels: Record<string, string> = {
      consulting: "Strategic Consulting",
      development: "Full-Stack Development",
      ai: "AI & Automation",
      support: "Ongoing Support",
      other: "Other / Not sure",
    };

    const serviceName = serviceLabels[service] || service || "Not specified";

    // Email content
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || "Not provided"}</p>
      <p><strong>Service:</strong> ${serviceName}</p>
      <p><strong>Budget:</strong> ${budget || "Not specified"}</p>
      <hr />
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, "<br />")}</p>
    `;

    const emailText = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Service: ${serviceName}
Budget: ${budget || "Not specified"}

Message:
${message}
    `;

    // TODO: Uncomment when Resend is set up
    /*
    const { data, error } = await resend.emails.send({
      from: "Deralis Digital <noreply@deralis.digital>",
      to: ["contact@deralis.digital"],
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
    */

    // For now, just log the submission
    console.log("Contact form submission:", {
      name,
      email,
      company,
      service: serviceName,
      budget,
      message,
    });

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