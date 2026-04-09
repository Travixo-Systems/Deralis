# Phase 9 — Production Readiness Checklist

Items that must ship before or alongside the production deploy but are NOT Phase 7 cleanup work.

---

### Auto-reply email template (Phase 6 follow-up #2)

- **Create a Resend auto-reply template** sent to the buyer after form submission. Currently only the operator notification email exists (`app/api/contact/route.ts`).
- The auto-reply must include the soft redirect to the audit page per PHASE_5_CONTACT_PAGE_NOTES.md section (d): "If you already know you want to start, the audit is the faster path."
- Template lives in `lib/` or `app/api/`. Never in `components/` or `app/[locale]/`.
- The auto-reply subject and body should be bilingual (detect from the form submission locale or default to English).

### Stripe payment link

- `NEXT_PUBLIC_STRIPE_AUDIT_LINK` env var must be set before the audit page ships.
- SiteNav route-aware override on `/audit` currently falls back to `#`.

### Cloudflare settings verification

- Per Section 0.6: Rocket Loader OFF, Mirage OFF, Polish OFF, CSS/JS minify OFF.
- Verify Bot Fight Mode does not challenge the contact form backend.

### Screenshot assets

- Replace all placeholder text in case study and TraviXO detail page with real `next/image` screenshots.

### Concept build external URLs

- Replace `#` placeholder hrefs on the four concept build demo links with real external URLs.
