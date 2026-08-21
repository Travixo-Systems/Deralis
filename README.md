# Deralis Digital

Operational systems for established French businesses.

**Live:** [deralis.digital](https://deralis.digital)

## What this is

I build the operational systems businesses need to keep running when their tools and processes no longer follow. Deralis Digital works with established French PMEs (10 to 50 people) whose execution has outgrown spreadsheets, inboxes, and disconnected software.

## Stack

Next.js 16 (App Router), React 19, TypeScript 5.9, Tailwind CSS v4.1, next-intl 4.5, Supabase (PostgreSQL, Prisma), Resend, Stripe, deployed on Vercel. Bilingual FR/EN.

## Environment

Set these in the deploy environment (Vercel: Settings, Environment Variables).
`NEXT_PUBLIC_*` values are inlined into the client bundle at build time, so they
must be present when the build runs, not only at runtime.

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_STRIPE_AUDIT_LINK` | Yes | Stripe payment link for the operational diagnostic. (Variable name kept from before the offer was renamed, to avoid breaking configured environments.) **The production build fails without it**, rather than shipping paid CTAs as dead links. Use the live link in production and a `buy.stripe.com/test_...` link in preview environments, so a preview deploy cannot take a real payment. Keep the linked price consistent with `common.auditCta` in `messages/{fr,en}.json`. |
| `NEXT_PUBLIC_DISCOVERY_CALL_LINK` | No | Booking link for the free discovery call, a secondary path presented on `/audit` only. When unset the link is not rendered. |

## Related

[TraviXO Systems](https://app.travixosystems.com): VGP compliance software for the French equipment rental industry, built and operated under the same entity.

## Contact

Via the form at [deralis.digital](https://deralis.digital).

---
UGBOAJA Uwa Chidera, Entrepreneur Individuel. SIREN 852525963. TVA non applicable, art. 293 B du CGI.
