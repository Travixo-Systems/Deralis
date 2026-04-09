# Phase 5 — Contact Page Implementation Notes

**Status:** Locked decisions for the new contact page that replaces `components/contact/ContactForm.tsx`
**Source of truth:** `DERALISDESIGNSPEC.md` v1.5 (specifically "French language conventions → CTA verb form" and "Editorial rules → Forbidden patterns → no public booking surfaces")
**Read this before Phase 6 builds the contact page.** Every locked decision below is non-negotiable and must be reflected in the final implementation.

---

## The funnel architecture context (read this first)

The Deralis Digital site operates an audit-first model. The audit is the only paid entry point. There are no free calls, no fit calls, no discovery calls, no consultations, no public booking surfaces of any kind anywhere on the site. This is locked in spec v1.5 under the "no public booking surface" forbidden pattern.

**The contact page is the ONLY non-payment channel on the site.** It is for written messages only. The operator (Uwa) reads every message personally and replies via email. There is never a path from a contact form submission to a free call.

**The contact form's job in the funnel:** catch buyers who want to talk to the operator but are not yet ready to commit to the €300 audit, AND provide a soft redirect to the audit for buyers who arrive at the contact page already convinced.

---

## Locked form fields (do not add or remove)

The form has exactly five fields:

1. **Name** — required, single line text input
2. **Email** — required, email input with HTML5 validation
3. **Company** — optional, single line text input
4. **Website** — optional, single line text input (URL format suggested but not enforced)
5. **Message** — required, textarea, minimum 20 characters

**Do NOT add:**
- Service dropdown (consulting / development / AI / support / other) — locked OUT
- Budget dropdown (5k-10k / 10k-25k / over 25k / not sure) — locked OUT, contradicts the audit-first model
- "How did you hear about us" field — locked OUT
- Marketing consent checkbox — locked OUT, no marketing emails are sent
- Industry dropdown — locked OUT
- Phone number field — locked OUT, the operator does not publish a phone number publicly
- Anything else not in the five-field list above

**The form is deliberately short.** Five fields total, three required, two optional. Any addition is a violation of the locked spec.

---

## Locked form intro copy (visible above the form)

The form intro copy must include the soft redirect to the audit. Locked direction (operator-approve final wording during Phase 6):

> I read every message personally. Expect a reply within 2 working days.
>
> If you already know you want to start, the audit is the faster path.

The "the audit is the faster path" line is a soft redirect, not a deflection. It tells buyers who are already convinced that there's a more direct route, without pushing buyers who legitimately need a written conversation. The line is hyperlinked to `/audit`.

**Editorial rules apply:**
- First-person "I" throughout
- No em-dashes
- No banned vocabulary (no "consultation," no "free call," no "schedule a call," none of the AI filler words)
- No fabricated metrics (no "I reply within 24 hours" if you can't honestly hit that number every single time)
- "2 working days" is the locked SLA for reply turnaround. If the operator cannot consistently hit 2 working days, this number gets updated before launch.

---

## Locked reply email template guidance

When a buyer submits the form, the operator receives the message and replies personally via email. **The reply email template must also include the soft redirect to the audit.** The reply should be a real personal message addressed to the specific buyer's question, but it should end with a paragraph naming the audit as the next step for buyers who are ready to commit.

**Phase 6 does NOT need to write the email template content.** Phase 6 only needs to:

1. Wire the form to send to the operator's email via Resend (the codebase already has Resend installed)
2. Reserve a placeholder/comment in the contact page code noting that the reply email template needs to include the soft redirect language
3. The actual Resend email template (probably in `lib/` or `app/api/`) gets updated when the contact form backend is wired to send the confirmation/notification

**Suggested reply email closing paragraph for the operator's reference (not required final wording):**

> If you'd like to move forward, the next step is the Systems Audit (€300). It's a structured 60–90 minute call plus a written brief that maps your operation, identifies the friction points, and tells you what to build and what not to build. You can start it here: [link to /audit]

This paragraph appears at the end of every reply, regardless of the conversation's content. The operator can edit it per-buyer if they want, but the default is to include it verbatim.

---

## Locked tail CTA section

The contact page has a tail CTA section pointing to the audit. This uses the standard entry-page audit CTA component (`AuditCTA` shared component) with the `discoverAudit` i18n key. **No changes from the locked Phase 5 design.**

The tail CTA appears AFTER the form, at the bottom of the page, before the footer. It's the same component used on the homepage, services page, projects page, about page, blog index, and blog post pages. The label reads "See what the audit covers →" (English) / "Découvrez l'audit →" (French) and links to `/audit`.

This is the third soft redirect on the contact page (after the form intro and the eventual reply email). Three soft redirects is the maximum — the contact page should not feel like it's trying to deflect the buyer from contacting at all. The contact form is a real channel and the redirects are honest alternatives, not aggressive funneling.

---

## What the contact page does NOT contain

These are explicit exclusions. Every item below is forbidden by the locked spec or the locked editorial rules.

- **No Calendly button.** The old `components/contact/ContactForm.tsx` had no Calendly button visible, but the file imports `CalendlyButton` from `components/shared/CalendlyButton.tsx`. The new contact page must not import `CalendlyButton`. The button itself is queued for deletion in Phase 7.
- **No Cal.com link, no SavvyCal link, no embedded scheduling widget.**
- **No "schedule a call" button.**
- **No "book a free consultation" framing.**
- **No "let's hop on a quick call" CTA.**
- **No discovery call offer.**
- **No fit call offer.**
- **No live chat widget (Intercom, Crisp, Drift, etc.).**
- **No phone number** — the operator does not publish a phone number publicly.
- **No address listing beyond what's already in the footer** ("Île-de-France · Remote across France, UK, US"). The contact page does not duplicate the footer location.
- **No social media links** — the contact page is for direct contact, not for redirecting to LinkedIn / Twitter / etc.
- **No "follow us" prompts.**
- **No newsletter signup form.**
- **No downloadable freebies ("download the guide," "get the checklist," etc.).**
- **No urgency framing ("limited slots this week").**
- **No countdown timers.**
- **No testimonials.**
- **No embedded video.**
- **No contact form fields beyond the locked five.**
- **No animation beyond the locked CSS hover transitions** from the spec.

---

## Contact page funnel structure (locked)

1. Site nav — same `SiteNav` component as every other page
2. Hero (`.hero-inner` single-column variant, max-width 820px) — eyebrow, h1, short subhead
3. Form intro section — the locked soft-redirect copy above the form
4. Contact form — the five fields, single column, centered, max-width 640px per the spec's Form components section
5. Alternative contact methods (small section) — direct email link with `&#64;` HTML entity pattern, maybe a one-line note about response time, nothing else
6. Tail CTA section — `AuditCTA` shared component with `discoverAudit` key, pointing to `/audit`
7. Site footer — same `SiteFooter` component as every other page

Six content sections plus nav and footer. Shorter than the audit page, longer than the projects index. The form is the visual centerpiece.

---

## i18n keys the contact page needs

The contact page needs new keys under the `contact.page.*` subtree in both `messages/en.json` and `messages/fr.json`. The exact key tree depends on Phase 6's component structure, but at minimum:

- `contact.page.metadata.title` — page title for SEO
- `contact.page.metadata.description` — meta description (note: must use first-person "Talk to me" not "Talk to George")
- `contact.page.hero.eyebrow` — small label above h1
- `contact.page.hero.title` — h1
- `contact.page.hero.subtitle` — subhead paragraph
- `contact.page.formIntro.line1` — "I read every message personally. Expect a reply within 2 working days."
- `contact.page.formIntro.line2` — "If you already know you want to start, the audit is the faster path." (with linked phrase)
- `contact.page.form.name.label`, `contact.page.form.name.placeholder`
- `contact.page.form.email.label`, `contact.page.form.email.placeholder`
- `contact.page.form.company.label`, `contact.page.form.company.placeholder`, `contact.page.form.company.optional`
- `contact.page.form.website.label`, `contact.page.form.website.placeholder`, `contact.page.form.website.optional`
- `contact.page.form.message.label`, `contact.page.form.message.placeholder`
- `contact.page.form.required` — the asterisk text or "(required)" indicator
- `contact.page.form.submit` — submit button label
- `contact.page.form.success.title`, `contact.page.form.success.description` — post-submit confirmation
- `contact.page.form.error.title`, `contact.page.form.error.description` — submission error
- `contact.page.alternativeContact.title` — section heading
- `contact.page.alternativeContact.emailLabel` — label for direct email link
- `contact.page.alternativeContact.note` — small note about response time

Both `en.json` and `fr.json` must have identical key trees. Run the standard key diff verification after Phase 6 ships the contact page.

**Locked French specifics from spec v1.5:**

- All French strings use U+00A0 codepoints (not `&nbsp;` entities) for non-breaking spaces before `?`, `!`, `:`, `;`
- French quotation marks `«&nbsp;...&nbsp;»` instead of straight quotes
- The audit CTA uses the imperative `Découvrez l'audit →` form
- Default "je" first-person, the "nous" exception does NOT apply on the contact page (no audit CTA H2 here)
- Formal "vous" register everywhere

---

## Editorial flag carried forward from earlier work

`contact.page.metadata.description` — the original copy said "Talk to George before booking..." which violated the first-person rule. This was corrected in an earlier phase to "Talk to me before booking..." Verify the current value matches the corrected version.

---

## Old `ContactForm.tsx` disposition

The existing `components/contact/ContactForm.tsx` is deleted entirely in Phase 6 and replaced with new components built against the locked decisions above. **Do NOT refactor the old file.** The conflicts with the spec are at six levels: old `--dd-*` CSS variables, service dropdown that doesn't exist in spec, budget dropdown that contradicts audit-first model, sidebar blocks not in funnel, old utility classes, hardcoded literal `@` email. **Replace, don't refactor.**

The new contact page implementation goes into `components/contact/` (the existing folder, currently containing only the old `ContactForm.tsx` to be deleted). New components likely include:

- `components/contact/ContactForm.tsx` (new, replacing the old one) — the form itself
- `components/contact/ContactHero.tsx` (optional, may be inline in `app/[locale]/contact/page.tsx` instead)
- `components/contact/ContactFormIntro.tsx` (optional, may be inline)
- `components/contact/AlternativeContact.tsx` (optional, may be inline)

Phase 6's implementation chat decides which components to extract vs inline based on reusability. The default is inline; extract only if the component is reused or genuinely complex.

---

## Build verification checklist for Phase 6

After Phase 6 ships the contact page:

- Build passes with zero errors and zero warnings
- All 5 form fields render and accept input
- The form submits to the API endpoint (Resend or equivalent)
- Both EN and FR pages render correctly
- The form intro soft-redirect link to `/audit` works
- The tail CTA `AuditCTA` button reads "See what the audit covers →" / "Découvrez l'audit →"
- Zero references to `bookCall` or `bookCallShort` (use `discoverAudit` / `discoverAuditShort`)
- Zero `dangerouslySetInnerHTML` in the new contact components (use plain text or the `richProseIndices` opt-in pattern from `ServiceBlock` only if absolutely necessary)
- Zero CalendlyButton imports
- Zero references to "free call," "schedule a call," "book a call," "consultation," "discovery call," "fit call"
- The `&#64;` HTML entity pattern is used for any displayed email addresses
- The 880px breakpoint behaves correctly (form collapses to single column on mobile)
- Key diff between `en.json` and `fr.json` passes
