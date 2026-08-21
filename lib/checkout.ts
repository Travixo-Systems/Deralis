/**
 * Stripe payment link for the operational diagnostic.
 *
 * The variable is still named ..._AUDIT_LINK: the offer was renamed in August
 * 2026, but the name is already configured in the deploy environment and
 * renaming it would break the build until someone re-adds it. Not worth it for
 * a name only maintainers see.
 *
 * Set NEXT_PUBLIC_STRIPE_AUDIT_LINK in the deploy environment. Use the live
 * link in production and a test-mode link (buy.stripe.com/test_...) elsewhere,
 * so a preview deploy can never take a real payment.
 *
 * There is deliberately no hardcoded fallback. A fallback would let a
 * misconfigured environment ship silently, and would pin the live link into
 * git history, where rotating it later leaves the old value behind forever.
 *
 * NEXT_PUBLIC_* values are inlined into the client bundle during `next build`,
 * so a missing value cannot be detected at runtime. It is validated at build
 * time instead, below.
 *
 * Keep the linked price consistent with common.auditCta in messages/{fr,en}.json.
 */
const link = process.env.NEXT_PUBLIC_STRIPE_AUDIT_LINK;

if (process.env.NODE_ENV === "production" && !link) {
  throw new Error(
    "NEXT_PUBLIC_STRIPE_AUDIT_LINK is not set. Every paid audit CTA would ship as a " +
      "dead link. Set it in the build environment (Vercel: Settings, Environment " +
      "Variables) before deploying."
  );
}

/** Empty in dev when unset; the CTA is hidden rather than rendered as href="#". */
export const STRIPE_AUDIT_LINK = link ?? "";
