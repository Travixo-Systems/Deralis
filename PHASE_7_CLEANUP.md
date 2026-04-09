# Phase 7 Cleanup Tracking

Items collected during migration phases. Each item is verified and executed during Phase 7.

---

### Funnel architecture cleanup (spec v1.5)

- **Delete components/shared/CalendlyButton.tsx** — vestigial component from a previous business model where free calls were offered. Conflicts with the locked audit-first positioning per spec v1.5 "no public booking surface" rule. Verify orphan status with grep before deletion (see Step 2 of the funnel architecture lock).
- **Update any file that imports CalendlyButton** (current importers as of Phase 4.5):
  - `app/[locale]/about/page.tsx` — 2 usage sites (lines 76, 363). Will be rewritten in Phase 6.
  - `components/contact/ContactForm.tsx` — import only. Will be replaced entirely in Phase 6.
  - `components/home/FinalCTA.tsx` — import only. Already dead code (not imported by any page since Phase 3).
  Remove the import line and any JSX usage. If the file's only purpose was to render the CalendlyButton, evaluate whether the entire file should be deleted.
- **Verify with grep after deletion:** `grep -rn "CalendlyButton" app/ components/ lib/` should return zero matches.
- **Verify with grep that no booking surfaces exist anywhere:** `grep -rni "calendly\|cal.com\|savvycal\|book.*call\|schedule.*call" app/ components/ lib/ messages/` should return zero matches outside of:
  - Comments referencing the architectural decision (acceptable)
  - The post-payment Resend email template (acceptable, but only if it exists in lib/ or app/api/ — never in components/ or app/[locale]/)
  - The lib/nurture-emails.ts file IF the operator decides to keep nurture emails (separate decision)

### Dead code from pre-migration phases

- **Delete components/layout/Footer.tsx** — old footer, replaced by SiteFooter.tsx in Phase 2. Not imported anywhere.
- **Delete components/lead-gen/NewsletterSignup.tsx** — only imported by old Footer.tsx.
- **Delete components/lead-gen/ folder** if empty after NewsletterSignup removal.
- **Delete old homepage components** in components/home/ that are no longer imported by any page: BeforeAfter.tsx, TrustBar.tsx, Services.tsx, WhoWeWorkWith.tsx, Approach.tsx, FeaturedProjects.tsx, Highlight.tsx, FAQ.tsx, BlogPreview.tsx, FinalCTA.tsx. Verify each with grep before deletion.
- **Delete old home.* and services.* flat keys** from both messages/en.json and messages/fr.json after verifying zero references in migrated code. The new .page.* subtrees replace them.
- **Delete leadGen top-level key** from both JSON files after grep verification confirms zero references.

### Spec version consistency (Section 0.10)

- **Update DERALISDESIGNSPEC.md versioning section** — body says "This is v1.2", changelog stops at v1.2 (now has v1.5 entry). Update the body sentence to match the header version. Add missing v1.3 and v1.4 changelog entries.

### Contact form field error i18n (Phase 6 follow-up #1)

- **Add i18n keys** `contact.page.form.errors.required`, `contact.page.form.errors.email`, `contact.page.form.errors.minLength` to both en.json and fr.json.
  - EN values: "Required", "Invalid email", "Minimum 20 characters"
  - FR values: "Obligatoire", "Email invalide", "20 caractères minimum"
- **Wire ContactForm.tsx** to read error strings from `useTranslations("contact.page.form.errors")` instead of hardcoded English.

### Blog post dates from frontmatter (Phase 6 follow-up #3)

- **Parse frontmatter `date` field** in `app/[locale]/blog/[slug]/page.tsx` and use it in the article hero meta row instead of the hardcoded placeholder dates.
- **Blog index page** (`app/[locale]/blog/page.tsx`) posts array currently has hardcoded `date` strings. Either read from frontmatter at build time or keep as-is if the dates are editorial (operator-curated display dates rather than file dates).

### Old CSS cleanup

- **Delete orphaned --dd-* variables** from app/globals.css after grep verification returns zero references across app, components, and src.
- **Delete orphaned old utility classes** (.gradient-text, .gradient-border, .glow, .card-hover, .bg-mesh, .noise, .btn-primary, .btn-secondary, input/textarea/select styling, animation keyframes, custom scrollbar styles, focus styles using --dd-accent).
- **Update semantic aliases** (--background, --foreground) to point at new tokens.
