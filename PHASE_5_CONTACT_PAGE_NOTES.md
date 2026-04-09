# Phase 5 — Contact Page Implementation Guidance

Locked decisions from spec v1.5. Read before building the contact page.

---

## (a) No booking surfaces

The contact form is the only non-payment channel on the site. It is for written messages only. There is no Calendly button, no scheduling widget, no "book a call" link, no booking surface of any kind on the contact page or anywhere else.

## (b) Form fields (locked)

Exactly these fields, no more:
- **Name** — required
- **Email** — required
- **Company** — optional
- **Website** — optional
- **Message** — required, min 20 characters

NO service dropdown. NO budget dropdown. NO sidebar blocks. This was already locked in the contact page mockup (deralis-contact-v1.html).

## (c) Form intro copy (locked direction, operator-approve final wording)

Visible above the form:

> I read every message personally. Expect a reply within 2 working days.
>
> If you already know you want to start, the audit is the faster path.

The "the audit is the faster path" line is a soft redirect, not a deflection. It tells buyers who are already convinced that there is a more direct route, without pushing buyers who legitimately need a written conversation.

The "the audit" text should link to `/audit` using the localized `<Link>` from `@/i18n/navigation`.

## (d) Reply email template placeholder

The reply email template (post-form-submission auto-reply or operator manual reply) must also include the soft redirect. The reply should be a real personal message but should end with a paragraph naming the audit as the next step for buyers who are ready to commit.

Phase 6 (when the contact page is built) does not need to write this template, but it must reserve a placeholder/comment in the contact page code noting that the reply email template needs to include this language. The Resend template lives in `lib/` or `app/api/` and is updated when the contact form backend is wired.

## (e) Contact page tail CTA

The contact page tail CTA section (final CTA pointing to `/audit`) stays as locked in the contact page funnel. This is the standard entry-page audit CTA component using the `discoverAudit` i18n key. No changes from the locked design.
