/**
 * Stripe payment link for the decision audit.
 *
 * This is a public URL by design: it is rendered into the href of every paid
 * CTA, so it already ships to the browser on each audit page. Keeping the live
 * link in source rather than only in the deploy environment means a
 * misconfigured environment can never ship a dead button, which is what the
 * previous `|| "#"` fallbacks did silently.
 *
 * NEXT_PUBLIC_STRIPE_AUDIT_LINK overrides it, for a test-mode link
 * (buy.stripe.com/test_...) or after rotating the payment link.
 *
 * Live link verified 21 August 2026: Deralis Systems Audit, EUR 1,280.00.
 * Keep the price consistent with common.auditCta in messages/{fr,en}.json.
 */
export const STRIPE_AUDIT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_AUDIT_LINK || "https://buy.stripe.com/9B6eVffkuejZglU4hgg3601";
