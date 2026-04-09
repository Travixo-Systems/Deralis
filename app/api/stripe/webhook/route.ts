// OPERATOR ACTION REQUIRED: Register this webhook in Stripe dashboard at
// https://dashboard.stripe.com/webhooks
// Endpoint URL: https://deralisdigital.com/api/stripe/webhook
// Listen for checkout.session.completed event only.
// Copy the resulting signing secret to STRIPE_WEBHOOK_SECRET in .env.local and Vercel.

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendAuditConfirmationEmail } from "@/lib/audit-emails";

function verifyStripeSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const parts = signature.split(",").reduce(
    (acc, part) => {
      const [key, value] = part.split("=");
      if (key === "t") acc.timestamp = value;
      if (key === "v1") acc.signatures.push(value);
      return acc;
    },
    { timestamp: "", signatures: [] as string[] }
  );

  if (!parts.timestamp || parts.signatures.length === 0) return false;

  const signedPayload = `${parts.timestamp}.${payload}`;
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");

  return parts.signatures.some(
    (sig) =>
      crypto.timingSafeEqual(
        Buffer.from(sig, "hex"),
        Buffer.from(expectedSignature, "hex")
      )
  );
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 503 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  if (!verifyStripeSignature(body, signature, webhookSecret)) {
    console.error("Stripe webhook signature verification failed");
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  const event = JSON.parse(body);

  if (event.type === "checkout.session.completed") {
    const session = event.data?.object;
    const email = session?.customer_details?.email || "";
    const name = session?.customer_details?.name || "";
    const country = session?.customer_details?.address?.country || "";
    const language = country === "FR" ? "fr" : "en";

    if (email) {
      sendAuditConfirmationEmail(email, name, language).catch((err) =>
        console.error("Failed to send audit confirmation email:", err)
      );
    } else {
      console.error(
        "Stripe checkout completed but no email found in session:",
        session?.id
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
