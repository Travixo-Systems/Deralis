# CLAUDE CODE MIGRATION BRIEF
## Deralis Digital — dark navy + cyan → warm cream system migration

**Version:** 1.1 (operator decisions folded in 2026-04-09)
**Date:** April 9, 2026
**Working directory:** `D:\Dev\projects\deralis`
**Source of truth hierarchy:**
1. `DERALISDESIGNSPEC.md` (tokens, components, editorial, bug fix, motion policy)
2. Section 0 operator-locked decisions in this brief
3. The rest of this brief (funnels, copy framing, cleanup targets)
4. Locked HTML mockups in `/mnt/user-data/uploads/deralis-*.html` (visual layout, spacing rhythm, surface treatments)

If any two sources disagree, the spec wins over Section 0 wins over the rest of the brief wins over the mockups. If Section 0 and the spec disagree, stop and ask the operator.

---

## Section 0: Operator-locked decisions (2026-04-09)

These are answers the operator gave after reviewing brief v1.0. They override any earlier "ask the operator" flag in the later sections. Read this section first, apply throughout.

### 0.1 Project detail routing — OPTION A (locked)

Create a static route at `app/[locale]/projects/travixo/page.tsx`. Do NOT create a dynamic `[slug]` route for project detail pages in this migration.

Reasoning (operator): one real detail page is locked now, the project detail template is not fully standardized, dynamic routing before template stability adds unnecessary complexity. Build static first. Generalize later.

**Impact on Section 3:** the decision note under the file mapping table is now closed. Treat "Option A" as the only valid choice.

### 0.2 Booking flow separation — two distinct channels (locked)

The site has TWO conversion channels and they must not be conflated:

**Channel 1: Free discovery call (Calendly).** Purpose: quick fit check, clarify the buyer's situation, decide whether a paid audit makes sense. This is the ONLY place Calendly appears on the site. Canonical location: the Contact page, BELOW the contact form, as a secondary text link styled as `.cta-secondary`. NOT on the homepage. NOT on Services. NOT on Projects. NOT on About.

**Locked Calendly treatment on the Contact page:**
- **Placement:** directly below the form submit button, separated by ~32px vertical spacing. Not in a sidebar (the spec bans sidebars on Contact). Not above the form. Not floating.
- **Visual weight:** `.cta-secondary` component (text link with transparent bottom border that fills in on hover). NOT a filled button. Visually subordinate to the form's primary submit.
- **Wording rule:** the word "free" must appear, but the word "call" must be used, NOT "consultation". The spec bans "free consultation" framing because it clashes with the €300 paid audit positioning. "Free discovery call" is the locked phrase (EN). French equivalent: "appel de découverte gratuit" or similar — translate and flag for operator review on the same seven-flag list in Section 6. The purpose of the link must be unambiguous: this is a discovery call to decide whether an audit fits, NOT a free version of the audit.
- **Suggested copy (EN, subject to operator edit):** `"Not sure an audit is right for you? Book a free discovery call →"`. The `→` arrow is the literal Unicode character, not a lucide icon, consistent with the rest of the site.
- **i18n keys:** add `contact.page.discoveryCall.intro` and `contact.page.discoveryCall.linkLabel` (or equivalent) to both `en.json` and `fr.json`. Flag the French wording for operator review.
- **Destination:** the Calendly URL. Plain `<a>` with `target="_blank" rel="noopener noreferrer"` because Calendly is an external service. NOT wrapped in the localized next-intl `Link`.

**Channel 2: Paid Systems Audit (€300).** Purpose: actual paid entry point, scoped diagnostic, written brief. This is what every `cta-primary` audit button across the site points to. The destination is an internal `/audit` page (see 0.7), NOT Calendly.

**Why this matters:** pointing audit CTAs to Calendly blurs the line between the free conversation and the paid diagnostic, and weakens the pricing model. Every audit CTA on every page points to the paid audit flow, never to Calendly.

**Impact on components:**
- `components/shared/AuditCTA.tsx` — button href resolves to `/audit` (internal Link)
- `components/home/HomeHero.tsx` — primary CTA href resolves to `/audit`
- `components/shared/CTAPrimary.tsx` — when used as an audit button on homepage, services, projects, about, blog → href is `/audit`
- `components/contact/ContactForm.tsx` — NO Calendly link inside the form
- Contact page layout — adds a separate optional secondary block or text link offering a free discovery call via Calendly, visibly distinct from the form's submit button
- `components/shared/CalendlyButton.tsx` — KEEP, but restrict its usage to the Contact page only. If it currently appears anywhere else, remove those call sites. Restyle to match `.cta-secondary` (text link, no button chrome) so it reads as subordinate to the form.

### 0.3 About page `ScreenshotGallery` — DELETE (locked)

Delete `components/about/ScreenshotGallery.tsx` entirely. Do not migrate, do not restyle, do not keep as a reserve.

Reasoning (operator): the new About page is text-led and credibility-led. A screenshot gallery adds noise and weakens the page's purpose. If visuals are needed later, they get added intentionally, not by reusing an old component.

**Impact on Section 5:** remove any hedging language about "verify if needed". The deletion is unconditional.

### 0.4 Contact form states — production gate (locked)

The contact form MUST have visible success, error, and field-level validation states before the Contact page ships to production. Happy-path-only is acceptable for local development and staging testing, NOT for production deploy.

Locked requirements:
- **Success state:** inline success message replacing or appearing above the form. Clear and calm. No redirect to a separate thank-you page, no modal. One block that tells the user the message was received and roughly what happens next.
- **Error state (form level):** inline error at the top of the form when the submission fails for backend reasons (network error, 500, rate limit). Short, calm, actionable.
- **Error state (field level):** when a specific field fails validation (empty required field, invalid email format, message under minlength 20), surface a field-level error directly below the offending field in `--ink-2` weight 400. Border color on the offending field shifts to a warm error color. **The error color token is a PLACEHOLDER in this migration — the value is decided later by the operator.** Use a temporary variable `--border-error` in `:root` with a clearly-flagged placeholder value (suggested `#B84A3A` but NOT ratified), wire it through `@theme inline` as `--color-border-error`, and add a comment in `globals.css` stating `/* PLACEHOLDER — value pending operator decision, do not treat as canonical */`. Flag in the migration output: "Error token is placeholder, needs ratification before production." Do NOT add the value to the spec. Do NOT document it as a locked token. The spec update to v1.3 for form error states happens ONLY after the operator picks the final color.
- **Spam protection:** honeypot is acceptable for v1 given current volume. It is NOT a long-term strategy. The brief should note this as technical debt to revisit once the site receives real submission volume.

**Impact on Section 5.13 ContactForm and Section 11.3:** the form must ship with all three states. The Phase 6 checklist for the Contact page does not pass until success, error (form level), and error (field level) are all implemented and visually verified.

**Impact on the spec:** the v1.2 spec explicitly lists error state, success state, and spam protection as "Still requires decisions before any form ships to production (v1.2)". This Section 0 entry fills those in. Update `DERALISDESIGNSPEC.md` to v1.3 at cleanup time to record these decisions plus the `--border-error` token value if it gets ratified.

### 0.5 Typography fixer script — verify or remove reference (locked)

The spec mentions a typography fixer script that runs on `fr.json` after every translation session. The brief's Section 6 flagged this as "verify whether it exists". Decision locked:

- **If the script exists in the repo** (`scripts/typography-fix.*`, `fix-typo.*`, or any filename matching the purpose): standardize its path and name, document it in the spec, run it against `fr.json` after any edits during this migration.
- **If the script does NOT exist**: create it OR remove the mention from the spec before the migration output is considered complete. Do not leave a dangling reference.

Principle (operator): spec references must map to real repo artifacts; otherwise the spec becomes unreliable.

**Recommended minimum script if creating from scratch** (Node.js, idempotent):

```js
// scripts/fix-french-typography.js
// Idempotent. Run: node scripts/fix-french-typography.js
const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'messages', 'fr.json');
const raw = fs.readFileSync(target, 'utf8');

// Replace &nbsp; with U+00A0 inside string values
let fixed = raw.replace(/&nbsp;/g, '\u00A0');

// Verify guillemets have U+00A0 inside: « texte » not «texte»
// Verify U+00A0 before ? ! : ; »
// Add more rules as needed — keep every rule idempotent.

fs.writeFileSync(target, fixed, 'utf8');
console.log('Typography fix applied to fr.json');
```

Flag in the migration output: which path exists, whether it was created, whether it was run.

### 0.6 Cloudflare settings — locked values

Apply these on the production zone before the production deploy. Confirm in the Cloudflare dashboard:

- **Rocket Loader:** OFF. Breaks Next.js hydration. Non-negotiable.
- **Mirage:** OFF. Conflicts with `next/image`.
- **Polish:** OFF, or test carefully if kept. Default to OFF. Conflicts with `next/image`.
- **Auto Minify HTML:** acceptable but redundant with Next.js build output. Either state is fine. Leave as-is unless it causes a bug.
- **Auto Minify CSS/JS:** OFF. Non-negotiable. Cloudflare minification of already-minified Next.js build output introduces rare but hard-to-diagnose bugs (whitespace-sensitive strings, source map misalignment, template literal edge cases) that only manifest through Cloudflare and not in local testing. Cost of turning off is zero. Turn off in the Cloudflare dashboard before the production deploy.
- **Bot Fight Mode:** keep ON (operator confirmed active). Verify the contact form backend does not get challenged.
- **AI Crawl Control:** keep as configured by the operator (legitimate crawlers allowed).
- **Email obfuscation:** the `&#64;` fix in Section 2 bypasses it regardless. Leaving the Cloudflare setting ON is fine as belt-and-braces; turning it OFF is also fine.

**Impact on Section 10:** Section 10 previously flagged these for verification. Section 0.6 closes them. The migration output should include a "Cloudflare settings verified" checklist confirming each value matches the locked state above.

### 0.7 Audit CTA destination URL — internal `/audit` (locked)

Every audit CTA across the entire site points to the same internal path: `/audit`. No per-page variation. No Calendly. No mailto. No inline payment link in the CTA itself.

**Impact on current scope — LOCKED: Path 2.** The `/audit` page is OUT OF SCOPE for this migration. It ships as a separate, immediately-following PR.

What this means for execution:
- This migration wires every audit CTA to the internal path `/audit`.
- `app/[locale]/audit/page.tsx` is NOT created in this migration.
- The migration PR stays on the staging branch until the separate `/audit` PR is ready. Both PRs merge to `main` together, or the `/audit` PR merges first.
- Do NOT merge the migration to `main` while audit CTAs point to a 404. This is a hard gate on the production deploy.
- On staging during the migration, every audit button will 404. That is acceptable because only the operator sees staging. Do NOT add a temporary fallback to Calendly, a mailto, or an external URL. The href stays `/audit` throughout.
- Do NOT create `audit.page.*` i18n keys in this migration. Those belong to the separate PR.

**Required action for Claude Code:**
1. Wire every audit CTA to `/audit` via the localized `<Link>` from `@/i18n/navigation`.
2. Do NOT build the `/audit` page.
3. Do NOT fall back to Calendly or any other destination.
4. Before requesting production merge, verify the separate `/audit` PR has shipped and the page renders in both locales. Until then, the migration stays on staging.

### 0.8 `messages/en.json` availability — verify first, do not assume

Locked from operator pushback: do NOT assume `en.json` is ready. Claude Code's first repo action is to inspect `messages/en.json` and report:

- File exists: yes / no
- If yes: key count, top-level structure, whether it mirrors `fr.json`
- Key diff between `en.json` and `fr.json` (how many keys exist in one but not the other)
- Whether any value is empty, placeholder, or English-equivalent of a French key

If the file is missing or substantially out of sync with `fr.json`, STOP before touching any other file. Report the state. Ask the operator whether to:
- Generate `en.json` by extracting strings from the English HTML mockups (preferred if the file is missing entirely)
- Patch the gaps only (preferred if most keys exist and only a few are missing)
- Wait for the operator to deliver a hand-curated `en.json`

Do NOT silently generate `en.json` from scratch without confirmation. The English strings are editorial content that must pass the spec's banned-vocabulary and voice rules, and a naive extraction from mockups without an editorial pass risks introducing content that violates the spec.

### 0.9 Old `--dd-*` tokens — do not delete in Phase 1 (locked)

Locked from operator pushback. Phase 1 (foundation) adds the NEW tokens alongside the old `--dd-*` variables. The old tokens stay in place during every page migration so that non-migrated pages (Legal, Privacy, Terms, and any page whose migration has not shipped yet) continue to render correctly.

Old tokens are deleted ONLY in Phase 7 (cleanup), and only after grep verification returns zero references across `app`, `components`, and `src`. Delete simultaneously from the `:root` block, the `@theme inline` block, and any semantic alias block that references them.

**Impact on Section 4:** the 10-step globals.css migration already reflects this ordering. Section 0.9 is a hard lock — if any phase tries to delete old tokens before Phase 7, STOP.

### 0.10 Spec version inconsistency — fix before reuse

The `DERALISDESIGNSPEC.md` file has inconsistent version markers: the header says "Version: 1.3 (merged motion policy, hero variants, case study variants, concept-item, projects page funnel lock)", the body says "This is v1.2 of the design specification, derived from deralis-homepage-v16.html locked on April 8, 2026, with French language conventions ratified on April 9, 2026", and the changelog at the bottom goes up to v1.2.

Rule (operator): header, footer changelog, and versioning section must all match. Choose v1.3 everywhere if that is the true current version. Otherwise choose v1.2 everywhere.

**Recommended:** the features listed in the header ("merged motion policy, hero variants, case study variants, concept-item, projects page funnel lock") are all present in the spec body, which suggests v1.3 IS the true version and the footer changelog is stale. Update:
1. The header stays as "Version: 1.3"
2. The body "This is v1.x of..." sentence updates to v1.3
3. The changelog gets a new top entry: `**v1.3** (April 9, 2026) — Motion policy merged, hero variants locked, case study variants locked, concept-item variant introduced, Projects page funnel locked.`

**Do this as part of the Phase 7 cleanup**, not during active page migration. The spec is a reference document for humans, not a runtime artifact, so its version stamp does not block migration progress. But it must be fixed before the brief or the spec gets reused on a future project. Flag in the migration output as a required pre-reuse fix.

### Summary of Section 0 impacts across the rest of the brief

| Section | What changed |
|---|---|
| §3 project detail routing | Locked to Option A. Remove "ask operator" hedging. |
| §3 Calendly / CalendlyButton | Keep component, restrict to Contact page only, restyle as `.cta-secondary`. |
| §5 AuditCTA, CTAPrimary, HomeHero | All audit buttons href = `/audit`. Never Calendly, never mailto. |
| §5 Contact page | Add optional Calendly free discovery call as a secondary link next to the form, visually subordinate to the form submit. |
| §5 ContactForm | Add success, form-level error, field-level error states. Propose `--border-error` token. |
| §5 ScreenshotGallery | Delete unconditionally, do not hedge. |
| §6 `/audit` page i18n | New `audit.page.*` subtree needed in both files if building the audit page in-scope. |
| §6 en.json handling | First action is to inspect and report; do not silently regenerate. |
| §10 Cloudflare | Values locked; verification step becomes an apply-and-confirm step. |
| §12 Phase 6 | Contact page Phase 6 does not pass production checklist without success/error states. |
| §12 Phase 7 | Spec version fix (1.2 → 1.3 everywhere) added to cleanup tasks. |
| §12 new phase | If building `/audit` in-scope, insert a new mini-phase between Phase 6 and Phase 7: "Phase 6.5: Build minimal /audit page" OR handle under Path 2 as a separate PR blocking production merge. |

End of Section 0. The remainder of the brief preserves its original structure; where it conflicts with Section 0, Section 0 wins.

---

## Pre-flight: known inputs and known gaps

### Inputs you will receive
- `DERALISDESIGNSPEC.md` — design spec v1.2, 896 lines. Read this first, in full, before touching any file.
- Locked HTML mockups (11 files): `deralis-homepage-v16.html`, `deralis-homepage-v16-fr.html`, `deralis-services-v1.html`, `deralis-services-v1-fr.html`, `deralis-projects-v1_1_.html`, `deralis-about-v1.html`, `deralis-contact-v1.html`, `deralis-blog-v1.html`, `deralis-blog-post-template-v1.html`, `deralis-project-detail-template-v1.html`.
- `messages/fr.json` — production-ready French translations, parallel-key architecture, U+00A0 codepoints preserved. DO NOT regenerate. DO NOT rewrite existing strings. Extend only.
- `messages/en.json` — existing English translations in the repo. Must be extended to mirror `fr.json` key-for-key where new `*.page.*` subtrees exist, and new `home.page.*` and `services.page.*` subtrees must be created on both sides (see the gap below).

### Known gap: `home` and `services` have NO `.page.*` subtree in fr.json

Four of the six content pages follow the parallel-key architecture:
- `projects.page.*` — exists
- `about.page.*` — exists
- `contact.page.*` — exists
- `blog.page.*` — exists

Two do NOT:
- `home.*` — only the OLD keys (`home.hero`, `home.services`, `home.clients`, `home.approach`, `home.featured`, `home.highlight`, `home.faq`, `home.cta`, `home.trustBar`) exist. There is no `home.page.*` subtree.
- `services.*` — only the OLD keys (`services.metadata`, `services.hero`, `services.techBar`, `services.items`, `services.cards`, `services.comparison`, `services.notSure`, `services.faq`) exist. There is no `services.page.*` subtree.

This is a real divergence from the parallel-key architecture used on the other four pages. You must NOT silently rewrite the old `home.*` and `services.*` keys because they may still be referenced by currently-shipping code that has not been migrated yet, and overwriting them would break the live site.

**Required action:** create new `home.page.*` and `services.page.*` subtrees in BOTH `messages/fr.json` AND `messages/en.json`, mirroring the shape of the existing `projects.page.*`, `about.page.*`, `contact.page.*`, and `blog.page.*` subtrees. Populate them by extracting every string from `deralis-homepage-v16.html` (English source), `deralis-homepage-v16-fr.html` (French source), and `deralis-services-v1.html` / `deralis-services-v1-fr.html`. The French source files already contain the locked French copy with U+00A0 codepoints, middot separators, and imperative CTA forms — copy verbatim, do not re-translate.

After migration, the old `home.*` and `services.*` keys become candidates for orphaned-key cleanup (see Section 6).

### Known gap: `messages/en.json` was not attached to this synthesis chat

The operator stated `messages/en.json` exists in the repo but it was NOT attached to the synthesis chat that produced this brief. You must read it directly from `messages/en.json` as your first action. If it does not exist, generate it from the English HTML mockups mirroring the `fr.json` key tree exactly — every key in `fr.json` must have a matching key in `en.json`, with identical nesting, identical key names, and identical types (string for string, list for list, object for object).

### Known constraint: U+00A0 codepoints in fr.json

The French non-breaking space is the actual Unicode codepoint U+00A0, not the `&nbsp;` HTML entity. The existing `fr.json` already uses codepoints. When you read, write, or edit `fr.json`:
- Preserve U+00A0 as an actual codepoint in the file bytes.
- Never convert to `&nbsp;` or `\u00A0` escape sequences.
- Never convert to a regular ASCII space.
- If you see a literal `&nbsp;` inside any French string, that is a bug — replace with U+00A0.
- Prettier is NOT in use in the project (verified), so the auto-strip risk is lower. BUT if Prettier is ever added, `messages/fr.json` and `messages/en.json` must go into the Prettier ignore list immediately.
- Verify with a grep for the literal `&nbsp;` sequence across the repo after migration. Zero matches is the target.

### Operator policy reminder

This operator (George) runs a ruthless-mentor policy: no glazing, no agreement for the sake of agreement. If during execution you discover the brief is wrong, the spec is wrong, or a locked decision produces a broken result, STOP and flag it in writing before pressing on. Do not work around a contradiction silently. Do not invent to cover a gap. If a mockup file ends mid-sentence, use the spec and the locked decisions to fill it, and note explicitly in your output what you filled in.

---

## Section 1: Context and goal

### What this migration is

The Deralis Digital Next.js codebase currently ships a dark navy + cyan visual system ("the old site") layered on Tailwind v4, next-intl v4, and a domain-organized React component library. That visual system is being replaced end-to-end with the warm cream system specified in `DERALISDESIGNSPEC.md` and demonstrated in `deralis-homepage-v16.html` and the ten other locked mockup files.

This is a REPLACEMENT migration, not an additive one. The old CSS tokens, the old utility classes, the old hero, the old header, the old sticky mobile CTA, the old contact form, and the Manrope font all go away. The new tokens, the new components, the Inter font, and the new page funnels take their place. The brief defines the full replacement plan.

### Why it is happening

Three drivers:

1. **Positioning correction.** The old dark navy + cyan visual system reads as a developer-tool marketing template (Vercel, Webflow, Linear landing pages). The new system repositions Deralis Digital as European B2B services — warm cream backgrounds, calm hierarchy, soft frames, no browser chrome on case studies, no gradient text, no glow effects, practitioner voice. See the spec's foundational principles section for the full rationale.

2. **Performance.** Current LCP is 4.8s on mobile. Target is under 2.5s. Removing the old TraviXO hero screenshot from the homepage, the Framer Motion JavaScript payload, the gradient texture layers, and a handful of render-blocking CSS patterns accounts for most of the expected win.

3. **Honesty.** The old site contains copy patterns that imply fabricated metrics, a larger team, and a maturity the practice does not yet have. The new spec locks honest framing: TraviXO has zero paying clients, Government Application Portal is flagged as a spec pitch, George's Loxam role is eighteen months as a Helpdesk Technician, no invented percentages, no fabricated testimonials. Every copy surface in the new site must pass this check.

### What success looks like

- Every page on the site matches its locked mockup visually, within the constraints of real-device rendering and browser font metrics.
- Every page passes the 8-point checklist from the spec (tokens, type scale, spacing scale, nav identity, footer identity, CTA components, funnel, copy rules).
- The 8-point checklist passes for each of: homepage, Services, Projects, About, Blog index, Blog post, Contact, Project detail (TraviXO).
- No `--dd-*` variables remain in `app/globals.css` or anywhere else.
- No `gradient-text`, `gradient-border`, `glow`, `card-hover`, `bg-mesh`, or `noise` utility classes remain.
- No Framer Motion imports remain. `framer-motion` is removed from `package.json`. `grep -r "framer-motion"` returns zero matches.
- No literal `@` characters remain in email addresses inside `.tsx` / `.ts` / `.jsx` / `.js` files. All email instances use the `&#64;` HTML entity pattern.
- Both `messages/en.json` and `messages/fr.json` have identical key trees, with new `home.page.*`, `services.page.*`, `projects.page.*`, `about.page.*`, `contact.page.*`, `blog.page.*` subtrees populated from the locked mockups.
- All French strings render with U+00A0 codepoints intact, French guillemets with non-breaking spaces inside, price format `300 U+00A0 €`, imperative `Cartographiez` CTA form site-wide, middot separators in metadata lines.
- The three known old-site files (`components/home/Hero.tsx`, `components/layout/Header.tsx`, `components/lead-gen/StickyMobileCTA.tsx`) are deleted. The old `components/contact/ContactForm.tsx` is replaced. The `components/lead-gen/` folder is empty or deleted.
- LCP on mobile is under 2.5s on the homepage (measured in Lighthouse on the deployed preview).

### Reference files and where to find them

The spec is the source of truth. The mockups are the visual reference. When you are implementing a page, you open two files side by side: the spec, to verify tokens and components; the mockup, to verify visual layout. The `fr.json` file is the source of truth for French copy. The `en.json` file (when extended) is the source of truth for English copy.

---

## Section 2: The non-negotiable bug fix — email obfuscation

### The bug

Cloudflare's email obfuscation script, enabled by default on the production domain, scans rendered HTML for any substring matching an email pattern (`name@domain.tld`) and silently rewrites the `href` on the surrounding `<a>` tag to a `/cdn-cgi/l/email-protection/` URL. The visible text gets replaced with `[email protected]`. This is fine for spam protection on static pages with no JavaScript, but it makes every email link in the site unclickable for legitimate users, makes the visible address look like placeholder junk, and is particularly bad on the Contact page where it is the primary fallback contact channel.

The bug was caught during the v16 homepage build, after affecting v8 through v15 silently. The spec documents the fix. This brief enforces it site-wide.

### The fix

Every email address anywhere in any `.tsx`, `.ts`, `.jsx`, `.js`, or `.mdx` file in the codebase MUST use the `&#64;` HTML entity in place of the literal `@` character. The entity renders as `@` in browsers but does not match Cloudflare's email-pattern regex, so the obfuscation script does not touch it.

This applies to BOTH the `href="mailto:..."` attribute value AND the visible text content between the `<a>` opening and closing tags. Both must use the entity.

#### JSX example — correct

```tsx
// components/layout/SiteFooter.tsx
<a
  href="mailto:contact&#64;deralis.digital"
  className="text-ink no-underline hover:text-accent transition-colors"
>
  contact&#64;deralis.digital
</a>
```

#### JSX example — wrong (will be rewritten by Cloudflare)

```tsx
// DO NOT DO THIS
<a href="mailto:contact@deralis.digital">
  contact@deralis.digital
</a>
```

#### Why not use runtime string concatenation instead?

Runtime string concatenation (e.g. `"contact" + "@" + "deralis.digital"`) works but adds unnecessary indirection, creates a hydration mismatch risk in Next.js App Router (the server renders one thing, the client renders another), and is harder to grep for during audits. The HTML entity approach is simpler, server-render-safe, hydration-safe, and survives any Cloudflare dashboard setting change.

#### Why not just disable Cloudflare email obfuscation?

Disabling the setting works but depends on Cloudflare configuration state that can be silently re-enabled by a dashboard default, a security scan recommendation, or a future account migration. The `&#64;` pattern is independent of Cloudflare configuration and survives any toggle. Disable the setting IN ADDITION if you want belt-and-braces, but the entity pattern is the primary fix.

### Scope of the fix

Every email instance in the repo must use this pattern. The likely locations:

- `components/layout/SiteFooter.tsx` — footer Contact column (email displayed as plaintext with mailto link)
- `components/contact/ContactForm.tsx` — possibly absent; the new form does not need to display an email inline, but if there is an email fallback in the form intro text or in an error message, it uses the entity pattern.
- `app/[locale]/contact/page.tsx` — the Contact page hero or alternative-methods section may display an email inline.
- `app/[locale]/legal/page.tsx` and `app/[locale]/privacy/page.tsx` — these legal pages typically cite a contact email for data subject requests. Both must use the entity pattern.
- Any blog post frontmatter or signature block that references an email.
- Any SEO metadata component that sets `openGraph.emails` or similar (if present, confirm the format expected by next/metadata and adjust accordingly — OpenGraph typically accepts an email array, not HTML entities, but that is a metadata field, not a rendered href, so entity encoding does not apply there; use a real `@` in metadata and the entity only in rendered JSX).

### Grep verification

After migration, run the following greps. Each must return zero matches in rendered JSX files:

```bash
grep -rn 'contact@deralis.digital' src app components
grep -rn 'href="mailto:[^"]*@' src app components
grep -rn '>[^<]*@deralis\.digital<' src app components
```

The first matches any literal `contact@deralis.digital` string. The second matches any `mailto:` href with a literal `@`. The third matches any visible text content containing `@deralis.digital`. All three should return zero after the migration.

The following grep SHOULD return matches (it is the correct pattern):

```bash
grep -rn 'contact&#64;deralis.digital' src app components
```

### Metadata exception

Next.js metadata fields (`metadata.openGraph`, `metadata.authors`, `metadata.other`) accept real email addresses in plain format because they do not render into the DOM as text — they render into `<meta>` tags in the document head. Cloudflare's obfuscator rewrites visible text in `<a>` tags, not `<meta>` attributes. Use real `@` in metadata, entity-encoded `@` in rendered JSX.

```tsx
// app/[locale]/layout.tsx or app/layout.tsx — CORRECT
export const metadata: Metadata = {
  authors: [{ name: "Uwa Ugboaja", email: "contact@deralis.digital" }],
  // ...
};
```

### Final note

If after migration any email link on the deployed site shows `[email protected]` in the browser, the fix was not applied to that instance. Find the file, replace the literal `@` with `&#64;`, redeploy, verify.

---

## Section 3: File mapping

This table maps every locked mockup file to the actual Next.js page or component file that Claude Code must create or modify.

| # | Mockup file | Next.js target | Notes |
|---|---|---|---|
| 1 | `deralis-homepage-v16.html` | `app/[locale]/page.tsx` | Homepage. Composed inline from shared components + homepage-specific sections. Replaces the existing `app/[locale]/page.tsx` which currently imports `components/home/Hero.tsx` (to be deleted). |
| 2 | `deralis-homepage-v16-fr.html` | Same target as above | French variant of the same page. next-intl routing handles the locale switch; you render the same component and pull strings via `useTranslations()`. Do NOT create a second page file for French. |
| 3 | `deralis-services-v1.html` | `app/[locale]/services/page.tsx` | Services page. Uses the `.hero-inner` single-column hero variant. Uses the `.service-block` component for sequential service detail. Uses the `.ongoing` pattern for the post-delivery section. Uses the `.questions` pattern for Common Questions. |
| 4 | `deralis-services-v1-fr.html` | Same target as above | French variant, next-intl handled. |
| 5 | `deralis-projects-v1_1_.html` | `app/[locale]/projects/page.tsx` | Projects page. Uses `.hero-inner`. Uses `.casestudy` component twice (TraviXO as anchor proof, Government Application Portal as spec pitch). Uses `.concept-item` variant for the concept builds strip. Mid-funnel audit CTA placement. See the spec's "Projects page funnel (LOCKED)" section. |
| 6 | `deralis-about-v1.html` | `app/[locale]/about/page.tsx` | About page. Funnel not yet locked in the spec (the spec lists it under "Still requires page-level decisions"). The mockup IS the funnel. Implement the funnel as shown in the mockup and flag to the operator that the spec's "Still requires decisions" list needs updating to ratify the funnel post-migration. |
| 7 | `deralis-contact-v1.html` | `app/[locale]/contact/page.tsx` | Contact page. Replaces the existing contact page. The new form has name, email, company, website, message ONLY. No service dropdown. No budget dropdown. No sidebar blocks. See Section 5 for the component spec. |
| 8 | `deralis-blog-v1.html` | `app/[locale]/blog/page.tsx` | Blog index page. Simple list of posts with meta lines. Uses the audit CTA block before the footer. |
| 9 | `deralis-blog-post-template-v1.html` | `app/[locale]/blog/[slug]/page.tsx` | Blog post detail template. Dynamic route. Reads markdown bodies from `content/[post-slug].md` (English) or `content/fr/[post-slug].md` (French). Blog post chrome (signature block, more-strip, meta labels) comes from `blogPost.*` i18n keys. |
| 10 | `deralis-project-detail-template-v1.html` | `app/[locale]/projects/[slug]/page.tsx` OR a dedicated `app/[locale]/projects/travixo/page.tsx` | See the decision note below the table. |
| 11 | `deralis-homepage-v16.html` (nav + footer sections) | `components/layout/SiteNav.tsx` and `components/layout/SiteFooter.tsx` | The nav and footer are shared site-wide. Extract once, use on every page via `app/[locale]/layout.tsx`. |

### Decision note: project detail routing

The spec's "Still requires page-level decisions" list includes "Project detail template" as an open question. The mockup `deralis-project-detail-template-v1.html` is a concrete rendering of the TraviXO case. Two possible routing choices:

**Option A (recommended for v1):** hardcode a single route at `app/[locale]/projects/travixo/page.tsx` that renders the TraviXO detail page. This is the only delivered-work detail page the site currently needs. The Government Application Portal is a spec pitch and does not deserve a dedicated detail page (it is documented inline on the Projects index page via the `.casestudy` component with a `.casestudy-note` honest-disclosure note). The concept builds on the Projects page link out to live external artifacts and do not need internal detail pages. Result: one route, one file, minimal routing surface, no dynamic slug machinery until it is genuinely needed.

**Option B:** create a dynamic route at `app/[locale]/projects/[slug]/page.tsx` that reads project metadata from an MDX file or a data file keyed by slug, with only `travixo` as a valid slug for now. Adds routing machinery in advance of need. Appropriate if the operator plans to publish additional delivered-work detail pages in the next three months.

**Ask the operator before implementing.** If no answer comes back within the migration window, default to Option A (`app/[locale]/projects/travixo/page.tsx`) because it is the smaller change and the spec's project detail template is explicitly marked as "still requires decisions" — building a dynamic route based on an undecided template is the wrong order of operations.

### Existing routes that must be preserved, not touched

The following routes exist in the current codebase and are outside the scope of this migration. Do NOT delete them, refactor them, or touch their files except to update shared components they import (nav, footer):

- `app/[locale]/legal/page.tsx` — legal notice
- `app/[locale]/privacy/page.tsx` — privacy policy
- `app/[locale]/terms/page.tsx` — terms of service
- `app/api/**` — contact form backend and any other API routes

After migration, these pages will automatically inherit the new `SiteNav` and `SiteFooter` via `app/[locale]/layout.tsx`. Verify they render correctly in both languages after the migration, but do NOT rewrite their body content.

### Layout files

- `app/layout.tsx` — root layout. Font loading (Inter via `next/font/google`) lives here. The `html` and `body` tags live here. Update to remove Manrope and add Inter. See Section 4.
- `app/[locale]/layout.tsx` — locale layout. Imports `SiteNav` and `SiteFooter`. Wraps all children. The `next-intl` `NextIntlClientProvider` lives here. Update to use the new `SiteNav` and `SiteFooter` components. Delete the import of the old `Header` component.

### Existing components inventory (from the operator's answers)

Current folder tree under `components/`:
- `components/about/ScreenshotGallery.tsx` — existing, from the old About page. Review during About page migration: the new About page mockup does not show a screenshot gallery in the same form. Most likely deleted or replaced.
- `components/analytics/ClarityScript.tsx` — outside migration scope, leave alone.
- `components/contact/ContactForm.tsx` — REPLACE entirely. The new form has only name, email, company, website, message. No service dropdown, no budget dropdown, no sidebar.
- `components/home/Hero.tsx` — DELETE. Uses Framer Motion, old `--dd-*` variables, old hero structure. The new homepage composes its hero inline in `app/[locale]/page.tsx` using the locked spec components (or extracts to a new `components/home/HomeHero.tsx` — see Section 5 for the decision).
- `components/layout/Header.tsx` — DELETE. Uses Framer Motion, old `--dd-*` variables. Replaced by `components/layout/SiteNav.tsx`.
- `components/lead-gen/StickyMobileCTA.tsx` — DELETE entirely. The new design system has no sticky mobile CTA. The conversion ask is distributed across the locked CTA sections (hero, audit CTA, final CTA) which appear multiple times during any mobile scroll. After deletion, the `components/lead-gen/` folder may be empty — delete the folder too if so.
- `components/seo/` — outside migration scope if it only contains SEO/metadata helpers. Verify contents before touching.
- `components/shared/CalendlyButton.tsx` — verify if Calendly is still the booking flow. If the new audit CTA routes to a Calendly link, keep and update styling to match `.cta-primary`. If Calendly has been replaced by a different booking flow (e.g. a custom audit form), DELETE. ASK the operator for confirmation before deleting.


---

## Section 4: Tailwind config and globals.css migration

This is a REPLACEMENT migration, not an additive one. The existing `app/globals.css` contains the complete OLD design system under `--dd-*` prefixed CSS variables, plus Manrope font loading, plus old utility classes (`.gradient-text`, `.gradient-border`, `.glow`, `.card-hover`, `.bg-mesh`, `.noise::after`). ALL of that is OLD and gets replaced in a coordinated sequence.

The project uses Tailwind CSS v4.1.17 via `@tailwindcss/postcss`. There is NO `tailwind.config.js` file. Design tokens go directly into `app/globals.css` via `@import "tailwindcss"` followed by `@theme inline` blocks. This is the Tailwind v4 architecture. Do NOT create a `tailwind.config.js` as part of this migration.

### Step 1: Read the existing `app/globals.css` before touching it

Before making any change, read the full current contents of `app/globals.css` and list to the operator:
1. Every `--dd-*` variable that exists
2. Every semantic alias (`--background`, `--foreground`, `--color-background`, etc.)
3. The full font loading block (the Manrope setup)
4. Every utility class defined in the file (`.gradient-text`, `.gradient-border`, etc.)
5. The `@theme inline` block contents, in full
6. Any `@import`, `@layer`, or `@media` blocks that are NOT part of the old design system (these may need to be preserved)

This inventory is the starting state. You will refer back to it during Step 4 to verify that every item is either migrated, deleted, or deliberately preserved.

### Step 2: Add the new spec tokens to the `:root` block

Add every color token from the spec to the `:root` block, ABOVE or BELOW the existing `--dd-*` variables (do not delete the old variables yet). The new tokens coexist with the old ones during migration so that pages that have not yet been rewritten still render.

```css
:root {
  /* New design system (spec v1.2) */
  --bg: #F7F4ED;
  --bg-deep: #F2EEE6;
  --bg-cta: #F2F5F7;
  --bg-footer: #EFEAD8;

  --ink: #14110D;
  --ink-2: #6B655C;
  --ink-2-soft: #7F7A70;
  --ink-3: #9A9388;
  --ink-label: #5C5750;

  --ink-cool: #5A6472;
  --ink-cool-label: #4E5865;
  --ink-cool-muted: #8791A0;

  --border: #DCD5C2;
  --border-warm: #D4CCBA;
  --border-cool: #DCE2EA;

  --accent: #1B3A5C;

  /* Old design system (--dd-*) variables remain here temporarily */
  /* DO NOT DELETE until all pages are migrated. */
  /* Step 4 will identify unreferenced --dd-* variables for deletion. */
  /* ...existing --dd-* variables stay in place... */
}
```

**Collision warning: `--border`.** Tailwind v4 has an internal default `--color-border` token used by the `border-*` utility. The spec's `--border` is a raw custom property that does not directly collide with `--color-border`, but when you expose it via `@theme inline` as `--color-border-default` (Step 3 below), naming discipline matters. Do NOT overwrite `--color-border` itself, or you will change every `border` utility in the app (including any remaining border utilities in legacy pages that have not been migrated). Use a suffixed name.

### Step 3: Expose the new tokens as Tailwind v4 utilities via `@theme inline`

The `@theme inline` block in Tailwind v4 is what exposes CSS custom properties as Tailwind utility classes. To let components use classes like `bg-bg`, `text-ink`, `border-border-warm`, `text-accent`, you must add entries in `@theme inline`.

```css
@theme inline {
  /* Surface colors */
  --color-bg: var(--bg);
  --color-bg-deep: var(--bg-deep);
  --color-bg-cta: var(--bg-cta);
  --color-bg-footer: var(--bg-footer);

  /* Ink (text) colors */
  --color-ink: var(--ink);
  --color-ink-2: var(--ink-2);
  --color-ink-2-soft: var(--ink-2-soft);
  --color-ink-3: var(--ink-3);
  --color-ink-label: var(--ink-label);

  /* Cool accent colors (used only on --bg-cta surfaces) */
  --color-ink-cool: var(--ink-cool);
  --color-ink-cool-label: var(--ink-cool-label);
  --color-ink-cool-muted: var(--ink-cool-muted);

  /* Borders — using suffixed names to avoid colliding with Tailwind defaults */
  --color-border-default: var(--border);
  --color-border-warm: var(--border-warm);
  --color-border-cool: var(--border-cool);

  /* Accent */
  --color-accent: var(--accent);

  /* ... existing old-system --color-* entries remain here during migration ... */
}
```

After this, Tailwind utility classes map as follows (Tailwind v4 uses the CSS variable name after `--color-` as the utility suffix):

| Tailwind class | Maps to |
|---|---|
| `bg-bg` | `background-color: var(--bg)` |
| `bg-bg-deep` | `background-color: var(--bg-deep)` |
| `bg-bg-cta` | `background-color: var(--bg-cta)` |
| `bg-bg-footer` | `background-color: var(--bg-footer)` |
| `text-ink` | `color: var(--ink)` |
| `text-ink-2` | `color: var(--ink-2)` |
| `text-ink-2-soft` | `color: var(--ink-2-soft)` |
| `text-ink-3` | `color: var(--ink-3)` |
| `text-ink-label` | `color: var(--ink-label)` |
| `text-ink-cool` | `color: var(--ink-cool)` |
| `text-ink-cool-label` | `color: var(--ink-cool-label)` |
| `text-ink-cool-muted` | `color: var(--ink-cool-muted)` |
| `text-accent` | `color: var(--accent)` |
| `bg-accent` | `background-color: var(--accent)` |
| `border-border-default` | `border-color: var(--border)` |
| `border-border-warm` | `border-color: var(--border-warm)` |
| `border-border-cool` | `border-color: var(--border-cool)` |
| `border-accent` | `border-color: var(--accent)` |

**Decision on naming convention:** use the suffixed pattern consistently. `border-border-default` rather than trying to override `border-border`. This avoids collision with Tailwind's internal default token and makes the intent explicit in component code.

**Ink as a background color.** Components will need `background-color: var(--ink)` for the primary CTA button and the logo mark. The `@theme inline` entry `--color-ink: var(--ink)` automatically makes `bg-ink` available. Verify this by writing a test component with `<div className="bg-ink text-bg p-4">Test</div>` and checking that it renders dark-on-cream after the Tailwind rebuild.

### Step 4: Replace the font — Manrope → Inter

The spec requires Inter. The current repo loads Manrope via `next/font/google` in `app/layout.tsx`. Four changes are needed.

#### 4a. Update `app/layout.tsx`

Remove the Manrope import. Add an Inter import with the weights the spec uses (400, 500, 600, plus italic 400 and italic 500).

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-bg text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
```

Notes:
- `display: 'swap'` is required for the LCP target. Without it, Next.js may block render until the font loads.
- The `variable` entry `--font-inter` is what the `@theme inline` block references to map `font-sans` to Inter.
- The `className={inter.variable}` on `<html>` is what makes the CSS variable available in the cascade. Without this, `--font-inter` resolves to nothing and fonts fall back to system-ui.
- Weight `600` is required because the spec uses weight 600 for labels and eyebrows. Do NOT skip it.
- Italic weights 400 and 500 are required because the spec uses `<em>` tags in headlines and the accent italic treatment.
- Do NOT load weights 300, 700, or 800. The spec bans them.

#### 4b. Update the `@theme inline` `--font-sans` entry

In `app/globals.css`, the `@theme inline` block currently maps `--font-sans` to Manrope. Update to Inter:

```css
@theme inline {
  --font-sans: var(--font-inter), system-ui, -apple-system, sans-serif;
  /* ...other entries... */
}
```

After this, every Tailwind class that uses `font-sans` (or components that inherit from the body) resolves to Inter.

#### 4c. Remove Manrope references from the repo

Grep for Manrope references:

```bash
grep -rn "Manrope\|manrope\|--font-manrope" .
```

Every match gets removed or replaced. Expected locations:
- `app/layout.tsx` — the old `Manrope` import (deleted in 4a)
- `app/globals.css` — any `--font-manrope` reference in the `@theme inline` block (updated in 4b)
- Possibly `components/**` — any direct reference to `font-manrope` in a `className` string. Replace with `font-sans` (or delete the class entirely, since `font-sans` is the body default after the swap).

#### 4d. Verify after the font swap

Run the dev server. Navigate to the homepage. Open DevTools, inspect the `<body>`, confirm the computed `font-family` shows `Inter` first, not Manrope. Visually verify that headlines render in Inter's characteristic medium weight with the spec letter-spacing (`-0.025em` for the hero, `-0.02em` for section titles).

### Step 5: Identify and verify orphaned old CSS for deletion

The old design system has utility classes that are no longer needed by the new pages but MAY still be referenced by pages that have not been migrated yet (Legal, Privacy, Terms, or any page outside this migration's scope).

Run these greps across the full repo. For each, list every file that matches and propose a per-file action.

```bash
# Old utility classes
grep -rn "gradient-text" app components src
grep -rn "gradient-border" app components src
grep -rn "\.glow\b" app components src
grep -rn "card-hover" app components src
grep -rn "bg-mesh" app components src
grep -rn "\.noise" app components src

# Old --dd-* variables
grep -rn "\-\-dd-" app components src
```

For each match:
- **If the file is being migrated in this brief** (homepage, services, projects, about, blog, contact, project detail, site layout): the class or variable reference must be removed as part of the page migration. It does not survive.
- **If the file is OUTSIDE migration scope** (legal, privacy, terms, API routes, SEO helpers, analytics scripts): leave the class or variable reference in place. Do NOT silently rewrite. Flag to the operator as "old-system reference still present in non-migration file; defer cleanup until that page is migrated."
- **If the class or variable is referenced ONLY by the old utility class DEFINITIONS themselves** (e.g. `.gradient-border::before` in `globals.css` refers to `.gradient-border`): the definition is an orphan once its consumers are gone. Mark for deletion.

After the page-level migration is complete, re-run the greps. Any match that remains is either:
(a) in a file that is deliberately out of scope (legal, privacy, terms) — leave alone
(b) a dead definition in `globals.css` with zero consumers — delete

Never silently delete a class that has a consumer. Never leave a dead definition after its consumers are gone.

### Step 6: Update the semantic aliases

The old file has semantic aliases like:

```css
--background: var(--dd-bg);
--foreground: var(--dd-text-main);
--color-background: var(--background);
--color-foreground: var(--foreground);
```

After all pages are migrated and the old `--dd-*` variables are deleted, update the aliases to point at the new tokens:

```css
--background: var(--bg);
--foreground: var(--ink);
--color-background: var(--background);
--color-foreground: var(--foreground);
```

This preserves the `bg-background` and `text-foreground` utility class names that Next.js scaffolding often generates. If those classes are not used anywhere in the migrated code, you can delete the aliases entirely. Verify with grep before deleting.

### Step 7: Remove `framer-motion` from the project

Framer Motion is used by three files in the current codebase: `components/home/Hero.tsx`, `components/layout/Header.tsx`, `components/lead-gen/StickyMobileCTA.tsx`. All three are being deleted (see Section 5). After deletion:

```bash
grep -rn "from 'framer-motion'" app components src
grep -rn 'from "framer-motion"' app components src
```

Both greps must return zero matches.

Then remove from `package.json`:

```bash
npm uninstall framer-motion
# or yarn remove framer-motion
# or pnpm remove framer-motion
```

Verify by checking `package.json` dependencies and running `npm ls framer-motion` — should return "empty".

### Step 8: Verify after migration

The final state of `app/globals.css` should contain:

1. `@import "tailwindcss";` at the top.
2. The `:root` block with ONLY the new spec tokens (`--bg`, `--bg-deep`, `--bg-cta`, `--bg-footer`, `--ink`, `--ink-2`, `--ink-2-soft`, `--ink-3`, `--ink-label`, `--ink-cool`, `--ink-cool-label`, `--ink-cool-muted`, `--border`, `--border-warm`, `--border-cool`, `--accent`). Zero `--dd-*` variables.
3. The `@theme inline` block exposing every token as a Tailwind utility via the `--color-*` and `--font-sans` pattern.
4. Zero instances of `.gradient-text`, `.gradient-border`, `.glow`, `.card-hover`, `.bg-mesh`, or `.noise`.
5. Zero references to Manrope.
6. Optionally: the allowed page-load fade-in, wrapped in `@media (prefers-reduced-motion: reduce)`. See the spec's Motion section. This is OPTIONAL. Do NOT add unless the operator explicitly opts in per-page.
7. Optionally: a body class resetting margin/padding if Tailwind's preflight does not handle it (it does by default; you likely do not need a custom reset).

The final state of `package.json` should contain:

- Zero `framer-motion`.
- `next/font` already installed (it is bundled with Next.js, no separate install needed).
- `@tailwindcss/postcss` at the current version.
- `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react` at their current versions — do NOT reinstall duplicates.
- `next-intl` at `^4.5.6` or higher — do NOT downgrade.

### Step 9: Optional page-load fade-in (if the operator opts in)

The spec allows ONE optional addition: a page-load fade-in, 150-200ms, opacity only, wrapped in `@media (prefers-reduced-motion: reduce)` to disable for motion-sensitive users. This is optional per page.

If the operator opts in, add to `app/globals.css`:

```css
@media (prefers-reduced-motion: no-preference) {
  body {
    animation: fade-in 180ms ease-out;
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}
```

Do NOT add this by default. Do NOT add any other animation. Do NOT add transforms, delays, stagger, or per-element timing. The spec is explicit: opacity only, single element, no motion of any kind beyond the opacity change.

### Step 10: What you must NOT do in this step

- Do NOT install `framer-motion`, `gsap`, `aos`, `lottie-react`, `anime.js`, `react-spring`, `motion-one`, or any other JavaScript animation library. If any of them appear in `package.json` after the framer-motion removal, investigate — they are not supposed to be there. If they are there because of a transitive dependency, that is fine, but they must not be imported from any `.tsx` or `.ts` file in the app.
- Do NOT create a `tailwind.config.js`. The project is Tailwind v4. All configuration lives in `app/globals.css` via `@theme inline`.
- Do NOT convert `app/globals.css` to a `.scss` or `.module.css` file. Keep it as `.css`.
- Do NOT add a `postcss.config.js` that introduces additional PostCSS plugins unless the spec requires it. It does not.
- Do NOT add Tailwind plugins (`@tailwindcss/typography`, `@tailwindcss/forms`, etc.) unless a specific component explicitly requires it. The spec defines its own typography and form patterns from scratch. Adding `@tailwindcss/typography` would introduce a competing set of defaults.
- Do NOT use `!important` in any new CSS. The spec uses specificity and cascade order. If you find yourself reaching for `!important`, the problem is in the Tailwind class stacking, not the cascade.


---

## Section 5: Component library structure

This section defines which locked components from the spec become reusable React components, where they live in the folder structure, what props they accept, how i18n keys map into them, and which spec classes they use.

### Guiding principles for this section

1. **Follow the existing domain-organized folder convention.** The repo already has `components/about/`, `components/analytics/`, `components/contact/`, `components/home/`, `components/layout/`, `components/lead-gen/`, `components/seo/`, `components/shared/`. New components for a specific page go into the matching domain folder. Layout chrome (nav, footer) goes into `components/layout/`. Content components used across multiple pages go into `components/shared/`.

2. **Do NOT flatten the structure.** Do NOT create `components/Button.tsx` at the root. Do NOT create a `components/ui/` folder (that is a shadcn/ui convention and the project does not use shadcn/ui as its base).

3. **PascalCase TSX files.** `SiteNav.tsx`, `SiteFooter.tsx`, `AuditCTA.tsx`. Never `site-nav.tsx` or `site_nav.tsx`.

4. **Colocate where sensible, extract where shared.** A component used only by one page (e.g. the homepage trust anchor) lives in that page's domain folder (`components/home/TrustAnchor.tsx`). A component used by two or more pages (e.g. the audit CTA block) lives in `components/shared/`.

5. **Pass i18n key paths as props, resolve inside the component with `useTranslations()`.** Do NOT pass resolved strings from parent to child unless the parent has a good reason to pre-resolve (e.g. the Projects page has two instances of `CaseStudyFrame` and each needs different copy). When in doubt, pass the i18n namespace and let the component resolve its own strings.

6. **Use `class-variance-authority` (cva) only when a component has genuine variants that cannot be expressed by utility props.** The primary CTA button has ONE variant (primary, filled). The secondary CTA has ONE variant (text link). Neither needs cva. The case study component has two hero variants (`.hero-grid` vs `.hero-inner`) that ARE legitimate variants — but both live on the `Hero` component family, not on the button family. Use cva sparingly. Most components do not need it.

7. **Use `clsx` and `tailwind-merge` (via a `cn` helper) for conditional class composition.** If the project already has a `lib/utils.ts` or `components/shared/cn.ts` helper, use it. If not, create one:

```tsx
// lib/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

8. **Icons: use `lucide-react` only where the spec allows.** The spec bans icons except where they earn their place by carrying meaning the text cannot. Allowed locations:
   - The primary CTA arrow (`→`) — this is NOT a lucide icon, it is the literal arrow character `→` (U+2192) rendered as text and translated on hover. Do NOT replace with `<ArrowRight>` from lucide-react.
   - The footer contact block MAY use `<Mail>` and `<MapPin>` from lucide if the operator wants visual anchors, but the mockups show text-only. Default to text-only. Only add icons if explicitly requested.
   - The nav mobile hamburger (if a mobile menu is built) — acceptable. But the current spec's nav HIDES the nav links on mobile entirely and only shows the logo, language toggle, and primary CTA. There may be no hamburger at all. Verify against the mockup before adding.

### Component list

Below is the full component inventory for the migration. Each entry specifies file location, props, i18n mapping, and spec references.

---

#### 5.1 `components/layout/SiteNav.tsx`

**Purpose:** Site-wide navigation, identical on every page per the spec's mandatory consistency rules.

**Props:**

```tsx
type SiteNavProps = {
  locale: 'en' | 'fr';
  currentPath: string; // e.g. '/services', '/projects', '/about', '/contact', '/blog', '/'
};
```

The `currentPath` is used to apply the `active` modifier class on the current page's nav link. Resolve from `usePathname()` from `next-intl/navigation` at the call site (in `app/[locale]/layout.tsx`) and pass down.

**Structure (from spec and mockup):**

```tsx
<nav className="site-nav border-b border-border-default py-[22px]">
  <div className="wrap nav-inner flex items-center justify-between gap-10">
    <Link href="/" className="logo flex items-center gap-3 text-ink font-medium text-base tracking-tight">
      <span className="logo-mark w-6 h-6 bg-ink rounded-[5px]" />
      Deralis Digital
    </Link>
    <ul className="nav-links flex gap-8 list-none hidden md:flex">
      {/* nav items — see i18n mapping below */}
    </ul>
    <div className="nav-cta-wrap flex items-center gap-5">
      <LanguageToggle /> {/* See 5.3 */}
      <Link href="/contact" className="nav-cta ...">
        {t('nav.ctaLabel')}
      </Link>
    </div>
  </div>
</nav>
```

**CRITICAL:** the spec defines exact values for nav padding (22px vertical), logo mark size (24×24px, 5px radius), nav link size (14px regular, `--ink-2` color), active link color (`--ink`, weight 500). These are all in the spec's Navigation section. Reproduce EXACTLY.

**Tailwind v4 note:** Tailwind v4 uses arbitrary-value syntax for non-scale values (`py-[22px]`, `w-[24px]`). Use arbitrary values where the spec specifies an exact pixel that is not in Tailwind's default spacing scale. Do NOT round to the nearest scale value.

**i18n mapping:**

```tsx
const t = useTranslations('common.nav');
const tCta = useTranslations('common.actions');

// Nav items (existing keys, do not change)
const navItems = [
  { href: '/', label: t('home'), match: ['/'] },
  { href: '/services', label: t('services'), match: ['/services'] },
  { href: '/projects', label: t('projects'), match: ['/projects'] },
  { href: '/blog', label: t('blog'), match: ['/blog'] },
  { href: '/about', label: t('about'), match: ['/about'] },
  { href: '/contact', label: t('contact'), match: ['/contact'] },
];

// Primary CTA label: existing key is `common.actions.bookCall`
// French value already uses the imperative "Cartographiez votre système (300 €)"
const ctaLabel = tCta('bookCall');
```

**Active state:** add the `active` modifier (which in the mockup is `text-ink font-medium`) to the item whose `match` array contains a path matching the current pathname. For the homepage, match exactly `/`. For other pages, match any pathname starting with the item's href.

**Hover transitions:** 0.15s color transition on nav links (`--ink-2` → `--ink`), 0.15s background swap on the primary nav CTA outlined button. All CSS only via Tailwind's `transition-colors` and `hover:` modifiers. No Framer Motion.

**Language toggle:** separate component, see 5.3 below.

**Mobile behavior:** at ≤880px, the `nav-links` ul is hidden entirely via `hidden md:flex` (or `hidden` below `md` with `md:flex` above). The logo, language toggle, and primary CTA remain visible. The spec does NOT specify a hamburger menu — verify with the operator whether the mobile nav should add one in v2 or ship as logo + toggle + CTA only for v1. Default to the spec as written (no hamburger, no mobile menu drawer).

---

#### 5.2 `components/layout/SiteFooter.tsx`

**Purpose:** Site-wide footer, identical on every page. Four-column grid on `--bg-footer`, with brand, navigation, services, and contact columns.

**Props:**

```tsx
type SiteFooterProps = {
  locale: 'en' | 'fr';
};
```

**Structure (from spec and mockup):**

```tsx
<footer className="site-footer bg-bg-footer border-t border-border-warm pt-9 pb-[22px]">
  <div className="wrap">
    <div className="footer-grid grid grid-cols-[1.4fr_1fr_1fr_1.4fr] gap-10 mb-7">
      {/* Column 1: Brand */}
      <div className="footer-brand">
        <Link href="/" className="logo flex items-center gap-3 mb-3 ...">
          <span className="logo-mark w-6 h-6 bg-ink rounded-[5px]" />
          Deralis Digital
        </Link>
        <p className="footer-tagline text-sm leading-relaxed text-ink-2 max-w-[260px]">
          {t('footer.tagline')}
        </p>
      </div>

      {/* Column 2: Navigation */}
      <div className="footer-col">
        <h4>{t('footer.navigation')}</h4>
        <ul>
          <li><Link href="/">{t('nav.home')}</Link></li>
          {/* ... */}
        </ul>
      </div>

      {/* Column 3: Services */}
      <div className="footer-col">
        <h4>{t('footer.services')}</h4>
        <ul>
          <li><Link href="/services#audit">{t('footer.servicesList.audit')}</Link></li>
          <li><Link href="/services#custom">{t('footer.servicesList.custom')}</Link></li>
          <li><Link href="/services#extensions">{t('footer.servicesList.extensions')}</Link></li>
          <li><Link href="/services#ongoing">{t('footer.servicesList.ongoing')}</Link></li>
        </ul>
      </div>

      {/* Column 4: Contact */}
      <div className="footer-col footer-contact">
        <h4>{t('footer.contact')}</h4>
        <p>
          <a href="mailto:contact&#64;deralis.digital" className="text-ink no-underline hover:text-accent transition-colors">
            contact&#64;deralis.digital
          </a>
        </p>
        <p className="muted text-ink-2">{t('footer.location')}</p>
        <p className="muted text-ink-2 mt-3">{t('footer.languages')}</p>
      </div>
    </div>

    <div className="footer-bottom flex justify-between items-center pt-[18px] border-t border-border-warm text-[13px] text-ink-2 flex-wrap gap-4">
      <p>{t('footer.copyright')}</p>
      <div className="footer-bottom-links flex gap-6">
        <Link href="/legal">{t('footer.legal')}</Link>
        <Link href="/privacy">{t('footer.privacy')}</Link>
      </div>
    </div>
  </div>
</footer>
```

**CRITICAL:** the email address MUST use `&#64;` for both the `href` value and the visible text. See Section 2.

**Services column:** the four items MUST match the four items in the homepage "How I work" section. The spec locks this:
> "Footer Services column must always match the 'How I work' section. If one changes, the other must change. They are the same canonical service list shown in two places."

**i18n mapping:** most keys already exist in `common.footer.*`. The services list items will need new keys under `common.footer.servicesList.audit`, `common.footer.servicesList.custom`, `common.footer.servicesList.extensions`, `common.footer.servicesList.ongoing`. Verify the existing keys first and only add what is missing.

**Mobile:** collapses to `grid-cols-2` below 880px, with brand and contact columns spanning full width (`col-span-2`). The spec is explicit: "Mobile collapses to a 2-column layout, with brand and contact spanning the full width."

---

#### 5.3 `components/layout/LanguageToggle.tsx`

**Purpose:** Language switch between EN and FR. The mockup shows "EN / FR" as a static text label, but the real component needs to link to the alternate locale version of the current page.

**Props:** none (reads locale and pathname from hooks).

**Implementation:**

```tsx
'use client';

import { usePathname, useRouter } from 'next-intl/navigation';
import { useLocale } from 'next-intl';

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale = locale === 'en' ? 'fr' : 'en';

  return (
    <button
      onClick={() => router.replace(pathname, { locale: otherLocale })}
      className="lang text-[13px] text-ink-3 hover:text-ink transition-colors"
      aria-label={/* from i18n */}
    >
      {locale === 'en' ? 'EN / FR' : 'FR / EN'}
    </button>
  );
}
```

**next-intl v4 note:** the v4 navigation API uses `usePathname` and `useRouter` from `next-intl/navigation` (NOT from `next/navigation`). Verify by checking `i18n/navigation.ts` in the repo — it likely re-exports the localized versions.

**Accessibility:** the button must have an `aria-label` in the current language (e.g. "Switch to French" or "Passer en français"). Add keys under `common.actions.changeLanguage` (already exists) and use it.

---

#### 5.4 `components/shared/AuditCTA.tsx`

**Purpose:** The audit CTA block. Used on homepage, Projects page (mid-funnel), Services page, Blog index, About page. Shared component because every appearance is visually identical.

**Props:**

```tsx
type AuditCTAProps = {
  // All text is resolved from i18n inside the component.
  // If any instance needs a different variant (e.g. different eyebrow text),
  // add a `variant` prop here. Default: no variant, uses the canonical strings.
};
```

**Structure (from spec and mockup):**

```tsx
<section className="audit-cta bg-bg-cta border-y border-border-cool py-[60px]">
  <div className="wrap audit-cta-grid grid grid-cols-[1.35fr_1fr] gap-16 items-center">
    <div>
      <p className="audit-cta-eyebrow text-[15px] text-ink-cool-label font-semibold mb-[22px] tracking-[0.03em]">
        {t('auditCta.eyebrow')}
      </p>
      <h2 className="text-[40px] font-medium leading-[1.12] tracking-[-0.02em] text-accent max-w-[580px] mb-6">
        {t('auditCta.headline')}
      </h2>
      <div className="audit-cta-body text-[19px] leading-[1.6] text-ink-cool max-w-[580px]">
        <p className="mb-[14px]">{t('auditCta.body1')}</p>
        <p>{t('auditCta.body2')}</p>
      </div>
    </div>
    <div className="audit-cta-action flex flex-col items-start gap-4">
      <Link
        href={/* audit destination */}
        className="audit-cta-button inline-flex items-center gap-2.5 px-[30px] py-[18px] bg-ink text-bg-cta text-[15px] font-medium rounded-lg hover:bg-accent transition-colors"
      >
        {t('auditCta.buttonLabel')}
        <span aria-hidden="true">→</span>
      </Link>
      <p className="audit-cta-note text-[13px] text-ink-cool-muted">
        {t('auditCta.note')}
      </p>
    </div>
  </div>
</section>
```

**CRITICAL:** the H2 color is `--accent` (deep ink blue), NOT `--ink`. This is one of the two places the accent is used at headline scale (the other is the `<em>` tag inside headlines).

**The H2 contains the only "we" allowed on the site.** The spec:
> "The H2 ('Nothing is built until we agree it's worth building.') is the only place on the page where 'we' is permitted. It reads as 'me and the client' given the page context."

The French equivalent is the locked `nous` exception: "Rien n'est construit tant que nous ne sommes pas d'accord sur sa valeur." This is the ONE `nous` allowed in the French translation. Do NOT flag it for editorial review.

**i18n keys:** create under `common.auditCta.*` so the block is a shared resource. Keys: `eyebrow`, `headline`, `body1`, `body2`, `buttonLabel` (maps to `common.actions.bookCall` which already contains the locked imperative French form `Cartographiez votre système (300 €)`), `note`.

**Hover transition:** background transitions from `--ink` to `--accent` over 0.18s. No arrow translation on this specific button per the mockup (the arrow is static). Verify against the mockup; if the mockup shows `translateX(3px)` on hover, add it via `group` and `group-hover:translate-x-[3px]`. Default: static arrow.

**Mobile:** grid collapses to single column at 880px with 28px gap. H2 drops to 28px. Body drops to 16px.

---

#### 5.5 `components/shared/SectionHeading.tsx`

**Purpose:** The canonical section heading pattern (eyebrow + title + intro). Used on every content section across the site that opens with this structure.

**Props:**

```tsx
type SectionHeadingProps = {
  eyebrow: string;
  title: string; // May contain an <em> tag for the italic accent word
  intro?: string; // Optional
  className?: string; // For layout customization (max-width, alignment)
};
```

**Structure:**

```tsx
<div className={cn("section-heading-wrap max-w-[720px] mb-10", className)}>
  <p className="section-eyebrow text-[14px] text-ink-label font-semibold tracking-[0.03em] mb-4">
    {eyebrow}
  </p>
  <h2
    className="section-title text-[40px] font-medium text-ink leading-[1.1] tracking-[-0.02em] mb-4"
    dangerouslySetInnerHTML={{ __html: title }}
  />
  {intro && (
    <p className="section-intro text-[18px] text-ink-2 leading-[1.6] max-w-[620px]">
      {intro}
    </p>
  )}
</div>
```

**`dangerouslySetInnerHTML` justification:** titles may contain `<em>` tags for the italic accent word (e.g. `"From the <em>practice</em>"`). The safest way to render embedded HTML from a trusted i18n source is `dangerouslySetInnerHTML`. Alternatives (parsing into React nodes, using a rich-text library) add bundle weight for a single use case. Since the i18n JSON files are under the operator's control and not user-generated, the XSS surface is the operator's own typos, which is acceptable.

**Alternative (safer):** accept `title` as `ReactNode` and have the page pass `<>From the <em className="italic font-medium text-accent not-italic-fallback">practice</em></>`. This is more verbose at call sites but avoids `dangerouslySetInnerHTML`. Pick one convention and apply consistently. **Recommendation: ReactNode for simplicity and safety.** The `dangerouslySetInnerHTML` approach is faster for a bulk migration but introduces an unnecessary XSS lineage.

**Final recommendation:** `title: string` with `<em>` tags inline, rendered via `dangerouslySetInnerHTML`, is the v1 approach. Refactor to ReactNode in v2 if the operator wants the stricter form. The spec's italic accent rule is "one word per headline maximum" so the HTML tag depth is bounded.

**CSS for the `<em>` italic accent:** add to `app/globals.css` in a small utility block (since Tailwind's default `em` styling will apply its usual italic, but the color and weight need overriding):

```css
.section-title em,
.hero-headline em,
.final-cta em {
  font-style: italic;
  font-weight: 500;
  color: var(--accent);
}
```

---

#### 5.6 `components/shared/CTAPrimary.tsx` and `components/shared/CTASecondary.tsx`

**Purpose:** The two canonical CTA patterns from the spec. Used everywhere a CTA appears.

**Decision: do we need React components for these, or are they Tailwind class strings?**

The spec defines two CTA classes: `.cta-primary` and `.cta-secondary`. Both are styled entirely via CSS. In a traditional HTML context, you just add the class to an `<a>` tag. In a React + Tailwind v4 context, you have three options:

**Option 1: Tailwind class string repeated at every call site.** Verbose but transparent. Any change to CTA styling requires editing every call site.

**Option 2: A single component `CTAPrimary` that renders an `<a>` or a `<Link>` with the canonical class string baked in.** DRY. Any change to CTA styling lives in one place. Adds a tiny amount of component overhead.

**Option 3: A `cn()` helper that exports the canonical class string as a constant.** E.g. `export const ctaPrimaryClass = "inline-flex items-center gap-2.5 px-7 py-[17px] bg-ink text-bg rounded-lg ..."`. Components import and spread. Halfway between the other two.

**Recommendation: Option 2.** Create `components/shared/CTAPrimary.tsx` and `components/shared/CTASecondary.tsx` because:
- The spec treats them as components, not utility classes
- Hover behavior, arrow translation, and focus states need to be encapsulated
- Any future addition (loading state, disabled state) lives in one file
- Call sites become `<CTAPrimary href="/audit">...</CTAPrimary>` which reads cleanly

**`CTAPrimary` implementation:**

```tsx
// components/shared/CTAPrimary.tsx
import { Link } from '@/i18n/navigation'; // next-intl localized Link
import { cn } from '@/lib/cn';
import type { ComponentProps, ReactNode } from 'react';

type CTAPrimaryProps = {
  href: string;
  children: ReactNode;
  showArrow?: boolean; // default: true
  className?: string;
} & Omit<ComponentProps<typeof Link>, 'href' | 'children' | 'className'>;

export function CTAPrimary({ href, children, showArrow = true, className, ...rest }: CTAPrimaryProps) {
  return (
    <Link
      href={href}
      className={cn(
        "cta-primary group inline-flex items-center gap-2.5 px-7 py-[17px] bg-ink text-bg text-[15px] font-medium rounded-lg transition-colors hover:bg-accent",
        className
      )}
      {...rest}
    >
      {children}
      {showArrow && (
        <span
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-[3px]"
        >
          →
        </span>
      )}
    </Link>
  );
}
```

**Critical details:**
- `group` on the Link + `group-hover:translate-x-[3px]` on the arrow span: this is how Tailwind expresses the `.cta-primary:hover .arrow { transform: translateX(3px) }` pattern from the spec.
- The arrow is a Unicode character `→` (U+2192), NOT a lucide icon. Do NOT import `<ArrowRight>`.
- `transition-colors` (0.15s default) on the button itself. The spec says 0.18s for the background swap. Override with arbitrary value `transition-[background-color] duration-[180ms]` if precision matters. For v1, Tailwind's default `transition-colors` (0.15s) is close enough; revisit if the operator notices.
- `bg-ink` → `hover:bg-accent` is the full hover behavior.
- `text-bg` on hover: the spec does NOT specify a text color change on hover (only background). Keep the text color static.
- `aria-hidden="true"` on the arrow because it is a decorative visual element; screen readers should read the button's text content, not the arrow character.
- `showArrow` prop: most CTAs use the arrow; the audit CTA block button uses it. Submit buttons on forms may NOT use an arrow. Default true, allow override.
- `children` is the button label, resolved by the call site from i18n.

**`CTASecondary` implementation:**

```tsx
// components/shared/CTASecondary.tsx
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { ComponentProps, ReactNode } from 'react';

type CTASecondaryProps = {
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, 'href' | 'children' | 'className'>;

export function CTASecondary({ href, children, className, ...rest }: CTASecondaryProps) {
  return (
    <Link
      href={href}
      className={cn(
        "cta-secondary text-[15px] font-medium text-ink no-underline border-b border-transparent hover:border-ink transition-[border-color] duration-150",
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
```

**Justification:** secondary CTA is a text link with a transparent bottom border that fills in on hover. Zero background, zero padding, zero icon. Matches the spec exactly.

**Do NOT use `class-variance-authority` for these two components.** They have no real variants. If a third CTA variant appears later (outlined, icon-only), revisit and introduce cva then.

---

#### 5.7 `components/home/` — homepage-specific components

The homepage has several page-specific components. Decide per-component whether to extract or inline. General rule: extract if the component is non-trivial (>20 lines of JSX) OR has its own internal logic OR is visually complex enough that it clutters `page.tsx`. Otherwise, inline it.

**`components/home/HomeHero.tsx`:** the two-column hero grid with headline, subhead, CTA row, and trust anchor. Extract because it has substantial internal structure and the trust anchor alone is ~30 lines of JSX.

**`components/home/TrustAnchor.tsx`:** the right-column credential block inside the hero. Extract if the About page or any other page reuses it; otherwise colocate inside `HomeHero.tsx`. Per the spec:
> "The trust anchor pattern (right-column credential block with vertical left border in `--border-warm`). Reusable on the About page or any page that needs a credential sidebar."

So the trust anchor IS reusable. Move to `components/shared/TrustAnchor.tsx` and accept the content as props so the About page can pass different copy.

**`components/home/FlowStrip.tsx`:** the horizontal process strip on `--bg-cta`. Extract only if reused. The spec says it is reusable but the projects page mockup does not show it. Default: inline in homepage `page.tsx` unless another page needs it.

**`components/home/WhoIWorkWithCards.tsx`:** the three-column comparative cards with the `.exclude` modifier on the third column. The spec says the pattern is reusable:
> "The three-column-with-vertical-dividers card pattern from 'Who I work with'. Reusable for any 3-column comparative content on any page."

Move to `components/shared/ComparativeCards.tsx` if any other page uses it. Otherwise keep in `components/home/`.

**`components/home/HowIWork.tsx`:** the four-column service menu on `--bg-deep`. Distinct from `components/projects/ConceptItems.tsx` (which uses the `.concept-item` variant for the concept builds strip on the Projects page). Keep separate because the spec distinguishes `.service-item` from `.concept-item`:
> "Decision principle: use `.service-item` (the locked variant from 'How I work') when the four columns describe internal sequential services with no external destination. Use `.concept-item` when each column has a live thing to link to."

---

#### 5.8 `components/shared/CaseStudyFrame.tsx`

**Purpose:** The case study component. Used on:
- Homepage (once, for TraviXO as proof)
- Projects page (twice: TraviXO as anchor proof, Government Application Portal as spec pitch)

Per the spec:
> "Per-page reuse rule: the `.casestudy` component is reusable. On any page other than the homepage, the component may appear multiple times within a single vertical flow when each instance documents a distinct project."

**Props:**

```tsx
type CaseStudyFrameProps = {
  label: string; // "Case study" or "Spec pitch" (from i18n)
  projectName: string; // h2 project name
  context: string; // one-line category/domain context
  proseParagraphs: string[]; // 1 to 4 paragraphs
  closingElement:
    | { type: 'link'; href: string; label: string } // .casestudy-link
    | { type: 'note'; text: string }; // .casestudy-note honest disclosure
  screenshot: {
    src: string;
    alt: string;
  };
  alignStart?: boolean; // for long-prose instances (4+ paragraphs), apply align-items: start
};
```

**Structure:**

```tsx
<div
  className={cn(
    "casestudy-grid grid grid-cols-[1fr_1.15fr] gap-[72px]",
    alignStart ? "items-start" : "items-center"
  )}
>
  <div className="casestudy-content">
    <p className="casestudy-label text-[14px] text-ink-label font-semibold tracking-[0.03em] mb-4">
      {label}
    </p>
    <h2 className="casestudy-name text-[40px] font-medium text-ink leading-[1.1] tracking-[-0.02em] mb-3">
      {projectName}
    </h2>
    <p className="casestudy-context text-[14px] font-medium text-ink-2 mb-6">
      {context}
    </p>
    <div className="casestudy-prose text-[18px] leading-[1.6] text-ink-2">
      {proseParagraphs.map((p, i) => (
        <p key={i} className={i < proseParagraphs.length - 1 ? "mb-4" : ""}>{p}</p>
      ))}
    </div>
    {closingElement.type === 'link' ? (
      <a
        href={closingElement.href}
        className="casestudy-link inline-block mt-6 text-[15px] font-medium text-ink border-b border-border-warm pb-[3px] hover:text-accent hover:border-accent transition-colors"
      >
        {closingElement.label}
        <span aria-hidden="true" className="ml-1.5">→</span>
      </a>
    ) : (
      <p className="casestudy-note mt-6 text-[13px] text-ink-3 leading-[1.55]">
        {closingElement.text}
      </p>
    )}
  </div>

  <div className="casestudy-visual bg-white border border-border-warm rounded-[10px] overflow-hidden aspect-[16/10]"
    style={{
      boxShadow: "0 20px 50px -24px rgba(20, 17, 13, 0.18), 0 2px 6px -2px rgba(20, 17, 13, 0.06)"
    }}
  >
    <img
      src={screenshot.src}
      alt={screenshot.alt}
      className="w-full h-full object-cover"
    />
  </div>
</div>
```

**Tailwind v4 note on box-shadow:** the spec's two-layer shadow does not map cleanly to Tailwind's default shadow utilities. Use `style={{ boxShadow: "..." }}` inline OR define a custom utility in `app/globals.css`:

```css
.casestudy-shadow {
  box-shadow: 0 20px 50px -24px rgba(20, 17, 13, 0.18),
              0 2px 6px -2px rgba(20, 17, 13, 0.06);
}
```

Recommendation: define the custom class in globals.css to keep JSX clean.

**Screenshot image:** use `next/image` with `Image` from `next/image`, width and height set explicitly (800 and 500 for a 16:10 ratio at a reasonable resolution), `priority` only if the case study is above the fold (homepage: no, the case study is 5th in the funnel; Projects page: no, the first case study is below the hero).

**`alignStart` usage:** the spec says:
> "The default `.casestudy-grid` uses `align-items: center`. When `.casestudy-prose` exceeds three paragraphs, the screenshot frame on the right floats in the center of empty space adjacent to the longer text column, which reads as a layout bug. The fix: scope `align-items: start` to that specific instance via an ID or modifier class. The Projects page TraviXO instance uses `#travixo .casestudy-grid { align-items: start; }`. Apply this whenever a case study uses four or more prose paragraphs."

Pass `alignStart={true}` on the Projects page TraviXO instance (4 paragraphs per `fr.json`). Default `false` elsewhere (homepage TraviXO = 1 paragraph, Projects page Government = 2 paragraphs).

---

#### 5.9 `components/projects/ConceptItems.tsx`

**Purpose:** The four-column concept builds strip on the Projects page. Uses `.concept-item` variant (not `.service-item`) because each column links to a live external artifact.

**Props:**

```tsx
type ConceptItem = {
  number: string; // "01", "02", "03", "04"
  title: string;
  description: string;
  linkHref: string;
  linkLabel: string;
};

type ConceptItemsProps = {
  items: ConceptItem[]; // exactly 4 expected
};
```

**Structure:** four-column grid, each item is a flex column with `margin-top: auto` on the link so it aligns to the bottom regardless of description length (per the spec). Each item has a top border in `--border-warm`, padding-top 24px, sits inside a `--bg-deep` section.

**CRITICAL:** use `.concept-item`, NOT `.service-item`. The difference is that `.concept-item` has a `.concept-link` element below the description, deliberately smaller than `.casestudy-link` to signal subordinate hierarchy.

---

#### 5.10 `components/services/ServiceBlock.tsx`

**Purpose:** The sequential service detail component used on the Services page. Two-column grid (1fr / 1.6fr), left column has metadata (number, name, meta list), right column has prose.

**Props:**

```tsx
type ServiceBlockMetaRow = {
  label: string; // uppercase small label
  value: string;
  muted?: boolean; // apply the .muted modifier (weight 400, --ink color)
};

type ServiceBlockProps = {
  number: string; // "01"
  name: string;
  meta: ServiceBlockMetaRow[]; // typically 3 rows
  prose: string[]; // 2-3 paragraphs, may contain <strong> tags
  id?: string; // for anchor linking from nav
};
```

**Top border:** `--border-warm` (the stronger warm border, per the spec). 48px top and bottom padding.

**Prose rendering:** if the prose contains `<strong>` tags, use `dangerouslySetInnerHTML` (same justification as SectionHeading) OR accept `prose` as `ReactNode[]` and let the call site build the JSX. For the Services page, ReactNode is cleaner because the `<strong>` tags are contextual emphasis that the i18n system should preserve.

**Create `components/services/` folder.** It does not exist yet.

---

#### 5.11 `components/services/OngoingSupport.tsx`

**Purpose:** The post-delivery section (`.ongoing` pattern) from the spec. Sits on `--bg-deep`, two-column grid (1fr / 1.4fr), left column has eyebrow + smaller section title (30px, not 40px, to signal subordinate status) + context line, right column has prose and pricing.

**Pricing display pattern:**

```tsx
<div className="ongoing-pricing flex items-baseline gap-3 pt-6 mt-6 border-t border-border-warm">
  <span className="ongoing-price text-[22px] font-medium text-ink">
    {t('price')} {/* e.g. "150 €/h" with U+00A0 */}
  </span>
  <span className="ongoing-price-note text-[14px] text-ink-2">
    {t('priceNote')} {/* e.g. "à la demande, facturé au mois" */}
  </span>
</div>
```

---

#### 5.12 `components/shared/QuestionItem.tsx` and `components/shared/QuestionList.tsx`

**Purpose:** The inline question list pattern (`.questions`). Used on Services page for Common Questions. Reusable for any FAQ-style content.

**NOT an accordion.** Each item is always open. Per the spec:
> "Use this pattern instead of accordions for any FAQ on the site. Accordions hide content and add interaction cost; the inline list rewards scanning and lets buyers read the answers without clicking."

**`QuestionList` props:**

```tsx
type QuestionListProps = {
  items: { question: string; answer: string }[];
};
```

**Structure:** `max-width: 820px` container, each `.question-item` has 24px vertical padding, top border in `--border`, last item also has bottom border.

**`QuestionItem` internal structure:** h3 (20px medium `--ink`, 12px margin-bottom) + paragraph (16px, `--ink-2`, max-width 720px).

---

#### 5.13 `components/contact/ContactForm.tsx` — COMPLETE REPLACEMENT

**Purpose:** The Contact page form. Replaces the existing `components/contact/ContactForm.tsx` entirely.

**CRITICAL — forbidden features from the old form:**
- NO service dropdown
- NO budget dropdown
- NO sidebar blocks (Contact Info, What to Expect, Quick Questions)
- NO "free consultation" framing
- NO "get a quote" framing

Per the spec:
> "'Free consultation' framing (the audit is a paid €300 entry point, never free)"
> "'Get a quote' framing (the audit is the entry point, not a quote request)"

**Fields (locked by spec and mockup):**
1. **Name** — required
2. **Email** — required, `type="email"`
3. **Company** — optional
4. **Website** — optional
5. **Message** — required, textarea, `minlength="20"` per the spec

**Props:** none (the form is self-contained, submits to the existing `app/api/contact/route.ts` or equivalent).

**Structure (from spec's Form components section):**

```tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';

export function ContactForm() {
  const t = useTranslations('contact.page.form');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });
      // Success / failure handling — see note below
    } catch (err) {
      // Error handling
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate // per spec: HTML5 validation styling not yet designed
      className="contact-form max-w-[640px] mx-auto"
    >
      <div className="field mb-6">
        <label htmlFor="name" className="field-label block text-[14px] font-semibold text-ink-label tracking-[0.01em] mb-2">
          {t('name.label')}
          <span className="text-accent ml-1">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="field-input w-full px-4 py-[14px] text-base font-normal text-ink bg-bg border border-border-default rounded-lg font-sans hover:border-border-warm focus:border-accent focus:outline-none transition-colors placeholder:text-ink-3"
        />
      </div>

      <div className="field mb-6">
        <label htmlFor="email" className="field-label block text-[14px] font-semibold text-ink-label tracking-[0.01em] mb-2">
          {t('email.label')}
          <span className="text-accent ml-1">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="field-input w-full px-4 py-[14px] text-base font-normal text-ink bg-bg border border-border-default rounded-lg font-sans hover:border-border-warm focus:border-accent focus:outline-none transition-colors placeholder:text-ink-3"
        />
      </div>

      <div className="field mb-6">
        <label htmlFor="company" className="field-label block text-[14px] font-semibold text-ink-label tracking-[0.01em] mb-2">
          {t('company.label')}
          <span className="text-ink-3 font-normal ml-1.5">{t('company.optional')}</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          className="field-input ..."
        />
      </div>

      <div className="field mb-6">
        <label htmlFor="website" className="field-label ...">
          {t('website.label')}
          <span className="text-ink-3 font-normal ml-1.5">{t('website.optional')}</span>
        </label>
        <input
          id="website"
          name="website"
          type="url"
          className="field-input ..."
        />
      </div>

      <div className="field mb-6">
        <label htmlFor="message" className="field-label ...">
          {t('message.label')}
          <span className="text-accent ml-1">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={20}
          className="field-textarea w-full px-4 py-[14px] text-base font-normal text-ink bg-bg border border-border-default rounded-lg font-sans min-h-[160px] resize-y hover:border-border-warm focus:border-accent focus:outline-none transition-colors placeholder:text-ink-3"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="cta-primary w-full justify-center py-[18px] px-7 bg-ink text-bg rounded-lg text-[15px] font-medium hover:bg-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}
```

**Critical CSS details (from spec):**
- Field label: 14px weight 600, `--ink-label`, letter-spacing 0.01em (NOT 0.03em — labels are mixed case, not uppercase)
- Field input background: `--bg` (page surface), NOT white — avoids introducing a fifth surface color
- Field input border: 1px `--border` default, 8px radius (matches CTA button radius)
- Focus state: border color shifts to `--accent`, `outline: none`, NO box-shadow halo, NO glow ring
- Textarea: min-height 160px, `resize: vertical` only, Inter font explicitly inherited
- Required indicator: small `*` in `--accent` after the label text
- Optional indicator: ` (optional)` in `--ink-3` weight 400 after the label
- Submit button: uses `.cta-primary` with `width: 100%`, `justify-content: center`, padding 18px 28px (taller than the hero variant's 17px 28px)
- Form container: max-width 640px centered
- Form uses `noValidate` per the spec (HTML5 validation styling not yet designed; v1.2 decision pending)

**Error state, success state, submission failure:** the spec's v1.2 decisions section flags these as NOT YET DECIDED. Do NOT invent an error state in this migration. Implement the happy path (submit → API call → navigate or show a simple success message). For the error path, log to console and show a minimal generic message. Flag to the operator that error state, success state, and spam protection require a v1.2 spec decision before production.

**Spam protection:** the spec says "honeypot recommended over captcha for current volume, but not yet decided." Add a hidden honeypot field as a v1 precaution:

```tsx
<div className="hidden" aria-hidden="true">
  <label htmlFor="website-verify">Leave this empty</label>
  <input
    id="website-verify"
    name="website-verify"
    type="text"
    tabIndex={-1}
    autoComplete="off"
  />
</div>
```

On the backend, reject any submission where `website-verify` has a value. This is a free anti-spam measure that real users will never fill in.

**CAUTION on the honeypot field name:** do NOT name the honeypot `website` because the form has a real `website` field. Name it `website-verify` or `url-check` or similar. Document the name in the API route so the backend knows which field to check.

---

#### 5.14 `components/blog/BlogPostSignature.tsx` and `components/blog/BlogPostMoreStrip.tsx`

**Purpose:** The chrome components at the bottom of each blog post. Signature block (author info) and "more from the practice" strip (cross-links to other posts).

Keys already exist in `fr.json` under `blogPost.signatureBlock.*` and `blogPost.moreStrip.*`. Confirm the English equivalents exist in `en.json` and extract the JSX from `deralis-blog-post-template-v1.html`.

**Blog post body:** NOT a component. The body comes from markdown files at `content/[slug].md` (English) and `content/fr/[slug].md` (French). Render via `@next/mdx` OR a markdown-to-HTML library like `remark` + `remark-html`. The operator should decide which — if `@next/mdx` is already installed, use it; if not, use `remark` + `remark-html` for a lighter dependency.

Verify which markdown processor is installed:

```bash
npm ls @next/mdx remark remark-html rehype
```

If `@next/mdx` is present, use it. If `remark` is present, use it. If neither, recommend adding `remark` + `remark-html` (lighter than `@next/mdx`, no build-time MDX compilation needed).


---

## Section 6: i18n key mapping

### Starting state

The project uses next-intl v4.5.6. Translation files live at:
- `messages/en.json`
- `messages/fr.json`

The `fr.json` file is production-ready. It uses a parallel-key architecture: new copy for Projects, About, Contact, and Blog pages lives under `*.page.*` subtrees (e.g. `projects.page.travixo`, `about.page.background`, `contact.page.hero`, `blog.page.hero`) alongside pre-existing keys at original paths.

**Known gap (re-stating from pre-flight):** `home` and `services` do NOT have `.page.*` subtrees in `fr.json`. New `home.page.*` and `services.page.*` subtrees must be CREATED during this migration, in both `messages/fr.json` and `messages/en.json`.

### The rules

1. **Never regenerate `fr.json`.** Extend it. Every existing key stays.
2. **Never silently rewrite an existing French string.** If the wording is off, FLAG it to the operator, do not fix it yourself. The seven flagged strings below are existing editorial debt — additional flags get added to the same list, never silently corrected.
3. **Mirror structure between `en.json` and `fr.json`.** Every key in one must exist in the other. Identical nesting. Identical key names. Same types (string for string, list for list, object for object).
4. **U+00A0 codepoints in French strings.** Not `&nbsp;`, not `\u00A0` escape sequences, not regular spaces. The actual Unicode codepoint in the file bytes.
5. **Middot separators (` · `) in French metadata lines.** Not commas.
6. **Imperative `Cartographiez` for all audit CTA labels in French.** Not the infinitive `Cartographier`. The existing `common.actions.bookCall` key in `fr.json` already holds the canonical form `Cartographiez votre système (300 €)` with U+00A0 before `€`.
7. **First-person `je` in French.** The ONE exception is the audit CTA H2 ("Rien n'est construit tant que nous ne sommes pas d'accord sur sa valeur"). Any other `nous` gets flagged.
8. **French guillemets ` « » ` with U+00A0 inside.** Not straight `'` or `"`.
9. **Blog post bodies are NOT in i18n files.** They live in markdown files at `content/*.md` (English) and `content/fr/*.md` (French). Only the blog post CHROME (signature, more-strip, meta labels) is in `blogPost.*` in the JSON files.
10. **No hardcoded strings in JSX.** Every visible string comes through `useTranslations()`. The ONE exception is the blog post body, which comes from markdown.

### The work plan

Execute in this order:

#### Step 1: Inventory what exists

Read `messages/fr.json` and `messages/en.json` in full. Build a map of every key that exists in each file. Diff the two — any key that exists in one but not the other is a mismatch that must be resolved (see Step 4).

#### Step 2: Extract English strings from the locked mockups

For each locked mockup file, extract every visible English string. For each string, decide which i18n key it maps to:
- If the key exists in `en.json` already (e.g. `projects.page.travixo.prose1` exists because the French was written first and the English key was implied): populate the English key with the extracted string.
- If the key does NOT exist: create the key following the established `*.page.*` convention for that page.

The mockups and their expected i18n targets:

| Mockup | Expected i18n namespace |
|---|---|
| `deralis-homepage-v16.html` | `home.page.*` (NEW — does not exist yet) |
| `deralis-services-v1.html` | `services.page.*` (NEW — does not exist yet) |
| `deralis-projects-v1_1_.html` | `projects.page.*` (exists) |
| `deralis-about-v1.html` | `about.page.*` (exists) |
| `deralis-contact-v1.html` | `contact.page.*` (exists) |
| `deralis-blog-v1.html` | `blog.page.*` (exists) |
| `deralis-blog-post-template-v1.html` | `blogPost.*` (exists, shared across all blog posts) |
| `deralis-project-detail-template-v1.html` | `projectDetail.travixo.*` (exists for TraviXO specifically) |

#### Step 3: Populate `home.page.*` and `services.page.*` in both files

Extract English strings from `deralis-homepage-v16.html` and `deralis-services-v1.html`. Extract French strings from `deralis-homepage-v16-fr.html` and `deralis-services-v1-fr.html`. Build parallel subtrees under `home.page.*` and `services.page.*` in both JSON files.

**CRITICAL:** when extracting French strings from the French mockup files:
- The mockup files may contain `&nbsp;` HTML entities because they are static HTML. Convert to U+00A0 codepoints when porting to `fr.json`.
- Preserve middot separators exactly.
- Preserve French guillemets and the U+00A0 characters inside them.
- Preserve the imperative `Cartographiez` form in CTA labels.
- Do NOT re-translate. Use the mockup's French verbatim.

**Proposed structure** (for Claude Code to flesh out during extraction):

```
home.page.hero.eyebrow
home.page.hero.title           # contains <em>practice</em> or equivalent — preserve tag
home.page.hero.sub1
home.page.hero.sub2
home.page.hero.sub3
home.page.hero.ctaPrimary      # or reference common.actions.bookCall
home.page.hero.ctaSecondary
home.page.trustAnchor.bgHeading
home.page.trustAnchor.bgProse
home.page.trustAnchor.builtHeading
home.page.trustAnchor.builtItems.travixo.name
home.page.trustAnchor.builtItems.travixo.qualifier
home.page.trustAnchor.builtItems.travixo.desc
home.page.trustAnchor.builtItems.govPortal.name
home.page.trustAnchor.builtItems.govPortal.qualifier
home.page.trustAnchor.builtItems.govPortal.desc
home.page.trustAnchor.signature
home.page.flowStrip.label
home.page.flowStrip.steps      # list of 5 strings
home.page.whoIWorkWith.eyebrow
home.page.whoIWorkWith.title
home.page.whoIWorkWith.intro
home.page.whoIWorkWith.cards.1.title
home.page.whoIWorkWith.cards.1.desc
home.page.whoIWorkWith.cards.1.tags          # list
home.page.whoIWorkWith.cards.2.title
...
home.page.caseStudy.label
home.page.caseStudy.projectName
home.page.caseStudy.context
home.page.caseStudy.prose                    # list of 1 paragraph (homepage scope)
home.page.caseStudy.linkLabel
home.page.auditCta.*                         # OR reference common.auditCta.*
home.page.howIWork.eyebrow
home.page.howIWork.title
home.page.howIWork.intro
home.page.howIWork.items.1.number
home.page.howIWork.items.1.title
home.page.howIWork.items.1.desc
... (4 items)
home.page.finalCta.title
home.page.finalCta.sub
home.page.finalCta.ctaPrimary
home.page.finalCta.ctaSecondary
home.page.finalCta.note
```

Same pattern for `services.page.*`:

```
services.page.hero.eyebrow
services.page.hero.title
services.page.hero.sub1
services.page.hero.sub2
services.page.hero.ctaPrimary
services.page.hero.ctaSecondary
services.page.coreServices.eyebrow
services.page.coreServices.title
services.page.coreServices.intro
services.page.coreServices.blocks.audit.number
services.page.coreServices.blocks.audit.name
services.page.coreServices.blocks.audit.meta.whoFor.label
services.page.coreServices.blocks.audit.meta.whoFor.value
services.page.coreServices.blocks.audit.meta.timeline.label
services.page.coreServices.blocks.audit.meta.timeline.value
services.page.coreServices.blocks.audit.meta.investment.label
services.page.coreServices.blocks.audit.meta.investment.value
services.page.coreServices.blocks.audit.prose             # list of 2-3 strings
... (4 blocks: audit, custom, extensions, ongoing — but ongoing may be in the separate Ongoing Support section, verify against mockup)
services.page.ongoingSupport.*
services.page.commonQuestions.eyebrow
services.page.commonQuestions.title
services.page.commonQuestions.questions                   # list of {question, answer} objects
services.page.auditCta.*                                   # OR reference common.auditCta.*
services.page.finalCta.*
```

**Do NOT manually rewrite the full key tree in this brief.** The structure above is guidance. Claude Code's job is to extract the strings from the mockups and follow the pattern. The exact key names can vary slightly from this proposal as long as the pattern (page-scoped, section-scoped, nested by component) is consistent with the existing `projects.page.*`, `about.page.*`, `contact.page.*`, `blog.page.*` subtrees.

#### Step 4: Verify parallel key trees

After all subtrees exist in both files, verify that the key trees are identical. A simple diff:

```bash
cd messages
python3 -c "
import json
with open('en.json') as f: en = json.load(f)
with open('fr.json') as f: fr = json.load(f)

def keys(d, prefix=''):
    s = set()
    if isinstance(d, dict):
        for k, v in d.items():
            p = prefix + '.' + k if prefix else k
            s.add(p)
            s.update(keys(v, p))
    elif isinstance(d, list):
        for i, v in enumerate(d):
            s.update(keys(v, prefix + f'[{i}]'))
    return s

en_keys = keys(en)
fr_keys = keys(fr)
only_en = en_keys - fr_keys
only_fr = fr_keys - en_keys
print(f'Only in en: {len(only_en)}')
for k in sorted(only_en): print(f'  {k}')
print(f'Only in fr: {len(only_fr)}')
for k in sorted(only_fr): print(f'  {k}')
"
```

Every key should appear in both files. If the diff has any entries, resolve them: add the missing key, or flag if the operator needs to decide.

#### Step 5: Wire components to the new keys

For each page component, replace any hardcoded string with `t('...')` calls resolving to the new `*.page.*` keys. Old keys remain untouched — they get cleaned up in Step 7.

#### Step 6: Verify nothing hardcodes strings

```bash
grep -rn "t\('" app components | wc -l  # should be high
grep -rn 'children="[A-Z]' app components | head  # finds hardcoded JSX text
```

Any substantial visible string in JSX that is NOT wrapped in `t('...')` or resolved from props is a bug. Exception: the blog post body markdown file content, which is deliberately hardcoded per locale.

#### Step 7: Orphaned-key cleanup (post-migration)

This runs AFTER all pages render correctly using the new keys.

For each key in the OLD subtrees (`home.hero`, `home.services`, `home.clients`, `home.approach`, `home.featured`, `home.highlight`, `home.faq`, `home.cta`, `home.trustBar`, `services.hero`, `services.techBar`, `services.items`, `services.cards`, `services.comparison`, `services.notSure`, `services.faq`, and any pre-existing keys on Projects/About/Contact/Blog that are NOT under `*.page.*`):

```bash
# For each old key, grep the full repo for references
grep -rn "t('home.hero')" app components src
grep -rn "'home.hero'" app components src
grep -rn "home\.hero" app components src
```

If the grep returns ZERO matches, the key is orphaned and safe to delete. Delete from both `en.json` and `fr.json` simultaneously.

If the grep returns ANY matches, leave the key in place. Investigate: is the match in a file that should have been migrated? If yes, migrate it first, then re-check.

**NEVER delete a key without verifying it has no references.** A silent delete breaks the live site.

**Post-cleanup verification:**

```bash
# After cleanup, this should return zero
grep -rn "t('home\.hero\." app components src
grep -rn "t('services\.items\." app components src
# etc
```

And the new keys should have references:

```bash
grep -rn "t('home\.page\." app components src  # should return many matches
grep -rn "t('services\.page\." app components src  # should return many matches
```

### Seven flagged French strings (editorial debt)

The French translation work produced seven strings that need operator review before production deployment. These are NOT bugs to fix during migration — they are open editorial questions. Surface them to the operator at the end of the migration so a decision can be recorded before the deploy.

1. **`projects.page.govPortal.context`** — current value: `En cours d'examen`. Alternatives considered: `En attente de retour`, `Entre les mains de l'acheteur`. Operator decision pending on which phrasing best fits the honest framing for a spec pitch in the buyer's hands.

2. **`projects.page.concepts.items.4.title`** — spelling discrepancy. French uses `Marché Diaspora` (with accent). English mockup uses `Marche Diaspora` (no accent). Brand name decision pending: is the product name consistently accented or not across both languages?

3. **`about.page.background.role2.title`** — current value: `Technicien helpdesk`. Alternative: `Technicien support`. The first is a borrowed English term, the second is French. Loxam context decision pending — what did George's official job title say?

4. **`projectDetail.travixo.meta.role`** — the English is `Solo founder, every line of code`. The French was clipped to omit `of code` for rhythm. Verify whether the French rhythm holds without it or restore.

5. **`about.page.principles.p2.title`** and **`about.page.principles.p2.body`** — current value uses `Définir « terminé » avant de commencer`, with `terminé` in French guillemets as a metaphorical marker. Needs editorial review: is the metaphorical use of `terminé` in guillemets the intended register, or does it read awkwardly?

6. **`contact.page.hero.title`** — current value: `Clarifions ce qui est cassé avant de construire quoi que ce soit`. The `Clarifions` is first-person plural imperative (`nous`), which is ONE of the possible uses but sits close to the `nous` exception boundary (the audit CTA H2). Alternatives flagged: first-person singular reformulation, or imperative `vous` direct address. Operator decision pending.

7. **`projects.page.hero.title`** — current value has `réels... réel` repetition inherited from the English source. Likely needs a rewrite in both languages. Flag as a bilingual editorial issue, not just a French one.

**Report format for the operator:** output a markdown table at the end of the migration listing each flagged string, its current value, the alternatives considered, and the decision needed. The operator will resolve and update both files, then redeploy.

### Additional flags to surface during migration

Beyond the seven known items, any NEW editorial concern discovered during the mockup → i18n extraction goes on the same list. Examples that might come up:
- A French string in the existing `fr.json` that uses a banned word from the English banned list (the French equivalent of `journey`, `unlock`, `empower` also needs flagging)
- A French string that uses straight `"` instead of guillemets
- A French string that uses a regular space before `?` or `!` instead of U+00A0
- A French string that uses the infinitive `Cartographier` anywhere (should be imperative `Cartographiez`)
- A French string that uses `&nbsp;` instead of U+00A0

For each: add to the flagged-strings list, do NOT silently rewrite.

### Typography fixer script

The spec mentions:
> "A typography fixer script lives in the project root. Run it on fr.json after every translation session. It is idempotent."

Verify whether this script actually exists in the repo (`D:\Dev\projects\deralis\`). Likely names: `scripts/typography-fix.js`, `scripts/fix-french-typography.js`, `fix-typo.js`, or similar.

If it exists: run it against `fr.json` after any edits to `fr.json` during the migration. Verify it preserves U+00A0 correctly.

If it does NOT exist: flag to the operator that the spec references a script that is not in the repo. Either create it (small script that converts `&nbsp;` → U+00A0 and verifies non-breaking space placement rules), or update the spec to remove the reference. Do NOT silently skip; the spec is the source of truth and a reference to a missing script is a contradiction that needs resolution.


---

## Section 7: Image handling

### Where images live

The existing project uses `public/projects/` for project screenshots. For the migration, extend the convention domain-by-domain:

- `public/projects/travixo/` — TraviXO screenshots (homepage case study, Projects page anchor proof, Project detail page)
- `public/projects/gov-portal/` — Government Application Portal spec pitch screenshots (if any; the spec pitch does not have delivered work, so screenshots may be wireframes or mock UIs)
- `public/projects/concepts/` — screenshots for the four concept builds on the Projects page (if any; these may not have screenshots and link out to live demos instead)
- `public/about/` — any About page images (team photo is explicitly NOT part of the spec, but the About page mockup may have a context image)
- `public/blog/` — blog post featured images
- `public/og/` — OpenGraph social share images for metadata (one per locale, per page if customized)

### Which image component to use

Use `next/image` (`<Image>` from `next/image`) for every rendered image EXCEPT:
- The 24×24px logo mark, which is a CSS `background-color: var(--ink)` div with a border radius. Not a raster image. No component needed.
- Any SVG used as a decorative background or pattern (none are currently specified in the mockups).
- Screenshots rendered inside the `.casestudy-visual` frame — use `next/image` with explicit width and height so Next.js emits the correct aspect ratio and the CLS is zero.

**`next/image` required props:**
- `src`: file path relative to `public/`
- `alt`: localized alt text from i18n (every image needs French and English alt text)
- `width` and `height`: explicit dimensions matching the source file's aspect ratio
- `sizes`: responsive sizes attribute (e.g. `"(max-width: 880px) 100vw, 50vw"` for the case study frame)
- `priority`: only on images above the fold on the page (homepage hero has NO image; the homepage case study is the 5th section, no priority; Services page hero has no image; no page has a priority image by default)

### Image naming convention

`public/{domain}/{project-or-context}/{descriptor}-{locale}.{ext}` if the image varies by language (e.g. a screenshot showing French UI vs English UI). Otherwise `public/{domain}/{project-or-context}/{descriptor}.{ext}`.

Examples:
- `public/projects/travixo/equipment-list-fr.png`
- `public/projects/travixo/equipment-list-en.png`
- `public/blog/ai-business-operations/feature.jpg`
- `public/about/workspace.jpg`

### Strict screenshot rules (from spec)

Every product screenshot used anywhere on the site MUST comply:
- NO browser chrome
- NO macOS traffic light dots (red/yellow/green window buttons)
- NO address bar
- NO navigation shell around the application UI
- 16:10 aspect ratio for screenshots displayed in the `.casestudy-visual` frame
- Other aspect ratios allowed only if the frame component supports them (it does not, in v1)

If any existing screenshot in `public/projects/` has browser chrome or traffic lights, it must be replaced or re-cropped before use. Flag to the operator any screenshot that needs cropping — do NOT edit the images yourself without approval, and do NOT ship the migration with non-compliant screenshots.

### Alt text requirements

Every image needs alt text in both languages, sourced from i18n keys. NEVER hardcode alt text in JSX.

Example key structure:
```
home.page.caseStudy.screenshot.alt
projects.page.travixo.screenshot.alt
projects.page.govPortal.screenshot.alt
projects.page.concepts.items.1.screenshot.alt
about.page.workspace.alt
blog.posts.ai-business-operations.featuredImage.alt
```

Alt text rules:
- Describe what the image shows in the context of the page
- Do NOT start with "Image of" or "Screenshot of" — that is redundant for screen readers which already announce the element as an image
- Keep under 120 characters
- In French, apply the same editorial rules (no banned vocabulary, practitioner voice)

### Performance: image optimization

The current site's LCP is 4.8s on mobile. Screenshots and featured images contribute. Apply these rules to every image:

1. **Use modern formats.** Next.js `next/image` auto-serves WebP or AVIF when the browser supports it. Source files can stay as PNG or JPG.
2. **Right-size the source.** A 16:10 case study screenshot does not need to be 3000×1875px. 1600×1000px is sufficient for Retina display at a maximum render width of ~800px. Over-large sources inflate the build without visible quality improvement.
3. **Use `sizes` attribute correctly.** `sizes` tells the browser what display width to expect, so it downloads the appropriate `srcset` variant. For a component that takes ~50% of the viewport on desktop and 100% on mobile: `sizes="(max-width: 880px) 100vw, 50vw"`.
4. **Avoid `priority` unless the image is genuinely LCP.** The spec's foundational layout has NO hero image on the homepage (the hero is typographic). The LCP candidate on the homepage is the h1 text, not an image. No image needs `priority` on the homepage. Do NOT blindly add `priority` to every image — it tells Next.js to preload, which competes with critical resources.
5. **Lazy load below-the-fold images.** `next/image` does this by default when `priority` is absent. Do not override.
6. **Avoid CLS by setting explicit width/height.** Every `<Image>` must have width and height props. This is the #1 source of CLS in React apps.

### Missing images

If a mockup references an image that does not exist in `public/` yet (likely for the Projects page concept builds, possibly for the Project detail template):
- Use a placeholder image temporarily (a 16:10 blank cream-colored rectangle at the spec's `--bg-deep` color)
- Flag to the operator in the migration output: "Image X needed for Y location, placeholder deployed"
- Do NOT ship to production with placeholder images. The operator must supply real images before deploy.

---

## Section 8: Routing and i18n routing

### Current routing shape

App Router. Locale segment at `app/[locale]/`. Locales: `en`, `fr`. Routes:

- `app/[locale]/page.tsx` — homepage (`/en`, `/fr`)
- `app/[locale]/services/page.tsx`
- `app/[locale]/projects/page.tsx`
- `app/[locale]/projects/travixo/page.tsx` (NEW — or dynamic `[slug]`, see Section 3)
- `app/[locale]/about/page.tsx`
- `app/[locale]/contact/page.tsx`
- `app/[locale]/blog/page.tsx`
- `app/[locale]/blog/[slug]/page.tsx` — dynamic blog post detail
- `app/[locale]/legal/page.tsx` (existing, leave alone)
- `app/[locale]/privacy/page.tsx` (existing, leave alone)
- `app/[locale]/terms/page.tsx` (existing, leave alone)
- `app/api/**` (existing, outside locale segment)

### next-intl v4 configuration

The repo has the canonical next-intl v4 setup:
- `i18n/routing.ts` — defines locales, default locale, localized pathnames (if any)
- `i18n/navigation.ts` — re-exports localized `Link`, `usePathname`, `useRouter`, `redirect`, `permanentRedirect`, `getPathname`
- `i18n/request.ts` — server-side request config (loads messages for the current locale)

DO NOT rewrite these files. They are the glue between Next.js App Router and the translation files. Verify they reference `messages/en.json` and `messages/fr.json` correctly. If the middleware or config specifies the default locale, leave it as-is unless the operator confirms a change.

### Link usage

Always import `Link` from `@/i18n/navigation` (or wherever the repo re-exports it), NOT from `next/link`. The localized `Link` automatically prepends the current locale to the href, so `<Link href="/services">` becomes `/en/services` or `/fr/services` depending on the current locale.

```tsx
import { Link } from '@/i18n/navigation';

<Link href="/services">{t('nav.services')}</Link>
```

For external links (e.g. the TraviXO live site, the Calendly link, the Government portal spec destination), use a plain `<a>` tag with `target="_blank" rel="noopener noreferrer"`.

### Language toggle active-page preservation

When switching from `/en/services` to `/fr/services`, the user should land on the French Services page, not the French homepage. The `LanguageToggle` component (5.3 above) uses `router.replace(pathname, { locale: otherLocale })` which preserves the pathname and only swaps the locale prefix. Verify this works by testing: navigate to `/en/projects`, click the language toggle, confirm you end up on `/fr/projects`.

### Active nav link detection

`usePathname()` from `next-intl/navigation` returns the path WITHOUT the locale prefix. So on `/en/services`, `usePathname()` returns `/services`. Use this for active nav link comparison:

```tsx
const pathname = usePathname();
const isActive = (href: string) => {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
};
```

The `/` case needs exact match because every pathname starts with `/`. Every other case uses `startsWith` so `/projects` is active on both `/projects` and `/projects/travixo`.

### Metadata per page

Each page should export a `generateMetadata` function that reads the page's i18n keys for `title` and `description`:

```tsx
// app/[locale]/services/page.tsx
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'services.metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}
```

The `services.metadata.title` and `services.metadata.description` keys already exist in `fr.json`. Verify equivalents exist in `en.json` and populate if missing.

### Sitemap and robots

Outside the scope of this migration unless the operator flags it. If the existing `app/sitemap.ts` or `app/robots.ts` file references old route shapes, update to the new shape. Otherwise leave alone.

---

## Section 9: Performance considerations

### LCP target

**Current:** 4.8s on mobile.
**Target:** under 2.5s on mobile, measured in Lighthouse (mobile, throttled).

### What contributes to the current LCP

Likely culprits (verify before acting):
1. The old homepage hero with a large TraviXO product screenshot (removed entirely by the new typographic hero)
2. Framer Motion bundle weight (removed entirely by deleting the three old components)
3. Manrope font loading with multiple weights (replaced by Inter with `display: swap`)
4. Gradient texture layers in CSS (`.bg-mesh`, `.gradient-border::before`) (removed during globals.css cleanup)
5. Render-blocking stylesheets or scripts (verify in the current Lighthouse report)

### What the migration does for LCP

1. **Removes the homepage hero image.** The new homepage hero is typographic — a 64px h1, a subhead stack, a CTA row, and a trust anchor with NO image. The LCP candidate shifts from a large image download to a text render, which happens as soon as the font loads. Expected win: large (1.5-2.5s).
2. **Removes Framer Motion.** Framer Motion is ~35KB gzipped minimum and bundles into every page that imports it. Removing it shrinks the main bundle substantially. Expected win: moderate (100-300ms on slow networks).
3. **Replaces Manrope with Inter loaded via `next/font/google` with `display: swap`.** `next/font` self-hosts the font, avoiding external DNS lookup and connection cost. `display: swap` shows a fallback font immediately while Inter loads, which means text is readable from the first paint. Expected win: moderate (200-500ms on first visit).
4. **Removes gradient texture layers and heavy CSS.** `.bg-mesh` and `.gradient-border::before` use multiple background layers and box-shadows that the browser recalculates on paint. Removing them cuts the paint cost. Expected win: small but measurable.
5. **Static layout with zero JavaScript animation.** No scroll handlers, no IntersectionObserver chains, no rAF loops. Minimum main-thread work. Expected win: TTI (time to interactive) improves significantly, which is distinct from LCP but related.

### What the migration does NOT automatically do for LCP

- **Image optimization.** If the case study screenshot is 3000×1875px, the migration does not auto-resize. Supply right-sized source images (see Section 7).
- **Code splitting.** Next.js App Router code-splits by route automatically. Do not introduce manual `dynamic()` imports unless a specific component is large and below-the-fold.
- **Server Components.** All page-level components should default to Server Components. Client Components (`'use client'`) should only be the ones that genuinely need interactivity: `ContactForm`, `LanguageToggle`, potentially a mobile nav toggle if added. The current code may have `'use client'` on components that do not need it — each one shipped to the client adds bundle weight. Audit during the migration.

### Font loading optimization

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-inter',
  display: 'swap',
  preload: true, // default true, explicit here for clarity
});
```

- `subsets: ['latin']` only loads the Latin character range (covers English and French). Do NOT add `['latin-ext']` unless you need extended Latin characters (rare for French).
- `display: 'swap'` is critical. Without it, browsers block text rendering until the font loads.
- `preload: true` is the default for primary fonts — Next.js emits `<link rel="preload">` for the font files.
- Do NOT add `preconnect` tags manually to Google Fonts. `next/font` self-hosts the fonts, so there is nothing to preconnect to.
- Do NOT load the font via `<link href="https://fonts.googleapis.com/...">` in the HTML head. The spec's HTML snippet shows this pattern for the static mockup, but in Next.js you MUST use `next/font` instead.

### CSS bundle size

Tailwind v4 auto-purges unused classes at build time. The `app/globals.css` file should contain only the tokens, the `@theme inline` block, and any utility class definitions that are genuinely used. After the migration, the shipped CSS should be significantly smaller because:
- Old utility classes (`.gradient-text`, etc.) are removed
- Old `--dd-*` variables are removed
- The new system uses fewer colors overall (16 tokens vs the old system's many)

Measure before and after with:

```bash
npm run build
# check .next/static/css/*.css file sizes
ls -lh .next/static/css/
```

Target: the main CSS bundle under 15KB gzipped.

### JavaScript bundle size

The main JS bundle should shrink because:
- Framer Motion is removed (~35KB gzipped)
- No new animation libraries are added
- No shadcn/ui or similar component library is added

Measure with:

```bash
npm run build
# Next.js prints bundle sizes at end of build
```

Target: the main JS bundle under 150KB gzipped for First Load JS on the homepage.

### Preconnect hints

The spec's static HTML has Google Fonts preconnect tags. In Next.js with `next/font`, these are unnecessary because fonts are self-hosted. Do NOT add preconnect tags for Google Fonts in `app/layout.tsx`.

Do add preconnect hints for any third-party service that actually serves critical resources (e.g. if a Clarity or Plausible analytics script loads from an external domain, preconnect to that domain). Verify against the existing `components/analytics/ClarityScript.tsx`.

---

## Section 10: Cloudflare considerations

### Active settings

The operator confirmed these are active:
- **Bot Fight Mode.** Cloudflare challenges suspicious bot traffic. Should not affect legitimate users. Do not disable during migration.
- **AI Crawl Control.** Configured to allow legitimate AI crawlers (GPTBot, ClaudeBot, etc.). Do not change during migration unless the operator explicitly wants to reconfigure.
- **Email obfuscation.** THE bug source. See Section 2. The `&#64;` entity fix bypasses the obfuscator. After migration, verify in the Cloudflare dashboard whether email obfuscation should remain enabled. The `&#64;` fix works regardless, so disabling is optional but precautionary.
- **Static asset cache rules.** Cloudflare caches `_next/static/*` paths aggressively. The migration should not break this. After deploy, verify that the new CSS/JS bundles get cached correctly (check response headers for `cf-cache-status: HIT` on second request).

### Verification after deploy

1. **Bot Fight Mode:** submit the contact form as a real user. If Cloudflare challenges the submission, the form backend may be misconfigured (user agent, headers). Verify by checking Cloudflare's "Firewall Events" log.
2. **AI Crawl Control:** verify `robots.txt` still allows legitimate crawlers and the `ai.txt` or similar (if used) is intact.
3. **Email obfuscation:** visit the deployed Contact page and Footer on a real browser. View source. Confirm the email link renders as `contact@deralis.digital` in the visible text (not `[email protected]`). Confirm the `href` is `mailto:contact&#64;deralis.digital` or equivalent. Click the link; the mail client should open with the correct address prefilled.
4. **Cache rules:** check the Cloudflare dashboard's Cache Analytics after 24 hours of traffic. Cache hit rate should be high (>80%) for static assets.

### Rocket Loader, Auto Minify, Mirage, Polish

The operator did not mention these explicitly. Verify in the Cloudflare dashboard:
- **Rocket Loader:** SHOULD BE OFF for Next.js sites. Rocket Loader defers JavaScript execution, which can break Next.js hydration. If on, turn off.
- **Auto Minify (HTML, CSS, JS):** can stay on for HTML, but CSS and JS minification are already handled by Next.js at build time. Enabling Cloudflare's minify on top is redundant but not harmful.
- **Mirage:** image optimization. If on, it may interact with `next/image` in ways that cause double-optimization or cache mismatches. Test: load a page with images, check the response headers on the image URLs. If both Next.js and Cloudflare are serving optimized variants, disable one. Prefer leaving `next/image` as the primary and disabling Mirage.
- **Polish:** lossless or lossy image optimization. Same concern as Mirage. Prefer Next.js's optimization.

Flag all four to the operator for verification. Do NOT change Cloudflare settings without explicit approval.

### Cache invalidation on deploy

After deploying the migration, purge the Cloudflare cache for the deployed paths:

```
# In the Cloudflare dashboard, Caching → Purge Cache → Purge Everything (or targeted URLs)
```

Or via API:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

Targeted purge is safer than "purge everything" on a live site — only purge the paths that changed. For this migration, every page changes, so "purge everything" is acceptable.


---

## Section 11: Testing checklist

Run this checklist before merging any migration PR to main. Every item is a hard pass/fail.

### 11.1 Visual and structural

- [ ] Homepage renders at `/en` matching `deralis-homepage-v16.html` within real-device rendering tolerance
- [ ] Homepage renders at `/fr` matching `deralis-homepage-v16-fr.html`
- [ ] Services page renders at `/en/services` and `/fr/services` matching the locked mockups
- [ ] Projects page renders at `/en/projects` and `/fr/projects` matching the locked mockup
- [ ] Project detail (TraviXO) renders matching `deralis-project-detail-template-v1.html`
- [ ] About page renders at `/en/about` and `/fr/about` matching the locked mockup
- [ ] Blog index renders at `/en/blog` and `/fr/blog` matching the locked mockup
- [ ] Blog post detail renders matching `deralis-blog-post-template-v1.html` for at least one post (AI business operations guide) in both languages
- [ ] Contact page renders at `/en/contact` and `/fr/contact` matching the locked mockup
- [ ] Nav is literally identical across every page (same markup, same classes, same items, with only the active-link state differing)
- [ ] Footer is literally identical across every page
- [ ] Footer Services column matches the "How I work" section on the homepage (four items: Systems Audit, Custom System, Extensions, Ongoing)
- [ ] Case study screenshot frame has NO browser chrome, NO traffic light dots, NO address bar, 16:10 aspect ratio, white background, `--border-warm` border, 10px radius, two-layer shadow
- [ ] All audit CTA buttons link to the same audit destination (verify the href value in the operator's spec — likely `/audit` or an external Calendly URL)
- [ ] Mobile breakpoint at 880px collapses all multi-column grids to single column correctly
- [ ] Hero on mobile shows 38px h1 (not 64px)
- [ ] Section titles on mobile show 28px (not 40px)
- [ ] Nav links are hidden on mobile (below 880px); logo, language toggle, and primary CTA remain visible
- [ ] Footer collapses to 2-column grid on mobile with brand and contact spanning full width
- [ ] The 8-point practical test from the spec passes for every page:
  - [ ] Every color on the page comes from the token list
  - [ ] Every font size comes from the type scale
  - [ ] Every spacing value comes from the locked scale
  - [ ] The nav is literally identical to the homepage nav
  - [ ] The footer is literally identical to the homepage footer
  - [ ] All CTAs use the locked component classes
  - [ ] The page funnel makes sense for the page's job
  - [ ] The copy passes the editorial rules

### 11.2 Editorial

- [ ] No em-dashes anywhere in any rendered page (grep `em-dash` and `—` in rendered HTML)
- [ ] No banned vocabulary in any rendered page (`leverage`, `seamlessly`, `robust`, `cutting-edge`, `delve`, `streamlined`, `unlock`, `empower`, `harness`, `foster`, `navigate` as verb, `journey` as metaphor, `solutions`, `transform`)
- [ ] No first-person plural ("we", "our", "us") anywhere in English except the single audit CTA H2 exception
- [ ] No `nous` anywhere in French except the single audit CTA H2 exception and any flagged string on the seven-item list (contact hero `Clarifions` is on the flagged list and may be changed post-migration)
- [ ] No "free consultation" framing anywhere
- [ ] No "get a quote" framing anywhere
- [ ] No fabricated metrics or percentages
- [ ] TraviXO is framed honestly (zero paying clients implied through copy, never stated as "serving X clients")
- [ ] Government Application Portal is flagged as "(spec)" or "Spec pitch" in every reference
- [ ] Loxam is referenced as "eighteen months inside the equipment rental industry at Loxam" or equivalent, never as operational leadership

### 11.3 Email and contact

- [ ] All email links in rendered HTML use `contact&#64;deralis.digital` in both the `href` and the visible text (NOT literal `@`)
- [ ] Clicking any email link opens the user's mail client with `contact@deralis.digital` prefilled in the To: field (the browser renders the entity as `@` at click time)
- [ ] NO `/cdn-cgi/l/email-protection/` URL appears in any rendered `href` attribute (view source to verify)
- [ ] NO `[email protected]` placeholder text appears in any visible location
- [ ] Contact form submits successfully to the backend API
- [ ] Contact form rejects submissions where the honeypot field has a value
- [ ] Contact form displays a minimal success or error message on submit (exact behavior pending spec v1.2 decisions)

### 11.4 i18n and French typography

- [ ] `messages/fr.json` and `messages/en.json` have identical key trees (verify with the Python diff script in Section 6)
- [ ] All new `home.page.*` and `services.page.*` keys exist in both files
- [ ] Fr.json is in the project's Prettier ignore list IF Prettier gets added (currently not in use, so this is a future-proofing item)
- [ ] All French pages render with U+00A0 codepoints intact — no visible literal `&nbsp;` strings anywhere
- [ ] No `&nbsp;` literal strings appear in any rendered French page (grep the rendered HTML)
- [ ] French guillemets `« »` render with non-breaking spaces inside (`« texte »`, not `«texte»`)
- [ ] French price format renders correctly: `300 €` with U+00A0, never `€300` or `300€`
- [ ] French question marks, colons, semicolons, exclamation marks have U+00A0 before them
- [ ] The `Cartographiez` (imperative) form is used in every CTA button in French; `Cartographier` (infinitive) does NOT appear
- [ ] Middot separators ` · ` are used in French subtitle and metadata strings, not commas
- [ ] The seven flagged French strings are listed in the migration output for the operator to resolve
- [ ] Language toggle preserves the current pathname when switching locales (test: `/en/services` → click toggle → lands on `/fr/services`)
- [ ] Every page has both an `en` and `fr` rendering with translated content (no page silently falls back to English in French mode)

### 11.5 Cleanup verification

- [ ] `components/home/Hero.tsx` has been deleted
- [ ] `components/layout/Header.tsx` has been deleted
- [ ] `components/lead-gen/StickyMobileCTA.tsx` has been deleted
- [ ] `components/lead-gen/` folder is empty or deleted
- [ ] `components/contact/ContactForm.tsx` has been replaced with the new spec-compliant form
- [ ] New ContactForm has ONLY these fields: name (required), email (required), company (optional), website (optional), message (required, minlength 20). NO service dropdown. NO budget dropdown. NO sidebar.
- [ ] `framer-motion` is removed from `package.json` dependencies
- [ ] `grep -rn "framer-motion" app components src` returns zero matches
- [ ] `grep -rn "from 'framer-motion'" app components src` returns zero matches
- [ ] `grep -rn 'from "framer-motion"' app components src` returns zero matches
- [ ] No other JavaScript animation library is present in `package.json` (no gsap, aos, lottie-react, anime.js, react-spring, motion-one)
- [ ] `grep -rn "\-\-dd-" app components src` returns zero matches (all old `--dd-*` variable references removed after all pages migrated)
- [ ] `grep -rn "gradient-text" app components src` returns zero matches
- [ ] `grep -rn "gradient-border" app components src` returns zero matches
- [ ] `grep -rn "\.glow\b" app components src` returns zero matches (if any remain, they must be in non-migration files — verify manually)
- [ ] `grep -rn "bg-mesh" app components src` returns zero matches
- [ ] `grep -rn "card-hover" app components src` returns zero matches
- [ ] `grep -rn "Manrope\|manrope" .` returns zero matches (except possibly in old commit history, which is fine)
- [ ] No old translation keys (`home.hero.title`, `home.services.items`, etc.) have any references in the migrated code
- [ ] Orphaned old keys in `fr.json` and `en.json` have been identified via grep and deleted simultaneously from both files
- [ ] Blog post bodies are NOT in `messages/fr.json` or `messages/en.json` — they live in markdown files at `content/*.md` and `content/fr/*.md`

### 11.6 Motion policy verification

- [ ] NO scroll-triggered reveal animations exist on any page
- [ ] NO page transitions between routes
- [ ] NO stagger animations on any list or grid
- [ ] NO parallax effects
- [ ] NO scroll-driven sticky elements (the old `StickyMobileCTA` is deleted and nothing replaces it)
- [ ] NO hover transforms beyond the locked `translateX(3px)` on the primary CTA arrow
- [ ] NO loading spinners with motion (static skeleton placeholders are acceptable if used at all)
- [ ] Optional page-load fade-in (if enabled) is wrapped in `@media (prefers-reduced-motion: reduce)` and uses opacity only
- [ ] All hover transitions are CSS-only via the `transition` property
- [ ] Hover transition timing: 0.15s for color and border changes, 0.18s for the primary CTA background and arrow transform
- [ ] No JavaScript `onMouseEnter`, `onMouseLeave`, or `useHover` hooks for styling (hover is pure CSS)

### 11.7 Performance

- [ ] Homepage LCP on mobile (Lighthouse, throttled) is under 2.5s — measured on the deployed preview, not local dev
- [ ] Homepage FCP on mobile is under 1.5s
- [ ] CLS (Cumulative Layout Shift) is 0 on every page (no layout shifts from image loading, font loading, or dynamic content insertion)
- [ ] TBT (Total Blocking Time) is under 200ms on every page
- [ ] First Load JS (Next.js build output) for the homepage is under 150KB gzipped
- [ ] Main CSS bundle is under 15KB gzipped
- [ ] No render-blocking third-party scripts on any page
- [ ] `next/image` is used for every raster image with explicit width and height
- [ ] No `priority` prop on images below the fold

### 11.8 Accessibility

- [ ] Every image has an `alt` attribute (non-empty unless the image is purely decorative; decorative images use `alt=""`)
- [ ] Every form field has an associated `<label>`
- [ ] Required fields are marked with both `required` attribute and visible `*` indicator
- [ ] Focus states are visible on every interactive element (nav links, CTAs, form fields, buttons)
- [ ] Focus state on form fields uses the `--accent` border color per the spec (no glow ring)
- [ ] Tab order through the page is logical (top to bottom, left to right)
- [ ] Language toggle has an `aria-label` announcing the target language
- [ ] The language attribute `lang="en"` or `lang="fr"` is set on the `<html>` element correctly per the current locale
- [ ] Headings hierarchy is correct (one h1 per page, h2s and h3s in descending order, no skipped levels)
- [ ] Color contrast ratios meet WCAG AA (the warm cream palette has been designed for this but verify with an automated check)

### 11.9 Routing and links

- [ ] All internal links use `<Link>` from `@/i18n/navigation`, not `next/link`
- [ ] All external links use plain `<a>` with `target="_blank" rel="noopener noreferrer"`
- [ ] No broken internal links (every `href` points to a page that exists)
- [ ] The language toggle preserves the current pathname across locale switches
- [ ] The active nav link state is correct on every page

### 11.10 Existing routes preserved

- [ ] `/en/legal` and `/fr/legal` still render correctly with the new nav and footer
- [ ] `/en/privacy` and `/fr/privacy` still render correctly
- [ ] `/en/terms` and `/fr/terms` still render correctly
- [ ] `app/api/**` routes are unchanged
- [ ] `components/analytics/ClarityScript.tsx` still loads on every page (if that was its previous behavior)
- [ ] No 404s on any previously-working URL

---

## Section 12: Rollout sequence

### Why sequence matters

A site migration of this scope should NOT be deployed as a single big-bang release. Too many surfaces change at once, and if any of them break, rollback is painful. Instead, deploy incrementally on a staging branch, verify each page in isolation, and promote to production only after each page passes its checklist.

### Recommended sequence

#### Phase 0: Preparation (no deploy)

1. Read the spec, read the mockups, read `fr.json`, read the existing codebase.
2. Inventory the old code: run all the grep commands from Sections 4 and 5 to identify every file that references the old system. Document the starting state.
3. Create a new git branch: `migration/warm-cream-system`.
4. Confirm with the operator which audit CTA destination URL is canonical (see Section 3 project detail routing decision, and check whether `/audit` is a real route or a Calendly URL).

#### Phase 1: Foundation (one PR)

1. Update `app/layout.tsx` to load Inter via `next/font/google`. Remove Manrope.
2. Update `app/globals.css`:
   - Add the new spec tokens to `:root`
   - Add the new tokens to `@theme inline`
   - Update `--font-sans` to use Inter
   - Leave old `--dd-*` variables and old utility classes in place for now (other pages still reference them)
3. Create the `cn()` helper in `lib/cn.ts` if it does not already exist.
4. Commit and push. Deploy to staging. Verify:
   - Legal, Privacy, Terms pages still render correctly (they use the OLD system via old variables)
   - Font has switched to Inter site-wide
   - Homepage still renders the OLD design (no components have been migrated yet)

If anything breaks in Phase 1, fix before proceeding.

#### Phase 2: Layout chrome (one PR)

1. Create `components/layout/SiteNav.tsx`.
2. Create `components/layout/SiteFooter.tsx`.
3. Create `components/layout/LanguageToggle.tsx`.
4. Update `app/[locale]/layout.tsx` to import and render `SiteNav` and `SiteFooter` around `{children}`.
5. Delete `components/layout/Header.tsx`.
6. Delete `components/home/Hero.tsx` (the OLD one — the new homepage hero will live inside `page.tsx` or in a new `components/home/HomeHero.tsx` in Phase 3).
7. Delete `components/lead-gen/StickyMobileCTA.tsx`.
8. Remove `framer-motion` from `package.json`.
9. Run `npm install` to update the lockfile.
10. Fix any imports that break as a result of the deletions.

At this point, the OLD homepage will fail to render because `Hero.tsx` is gone. That is expected. Phase 3 rebuilds the homepage.

Commit. Do NOT deploy yet — the homepage is broken.

#### Phase 3: Homepage rebuild (one PR on top of Phase 2)

1. Rewrite `app/[locale]/page.tsx` from scratch using the locked spec components.
2. Create any homepage-specific components: `components/home/HomeHero.tsx`, `components/home/FlowStrip.tsx` (if extracting), etc.
3. Create the shared components needed by the homepage: `components/shared/AuditCTA.tsx`, `components/shared/CaseStudyFrame.tsx`, `components/shared/SectionHeading.tsx`, `components/shared/CTAPrimary.tsx`, `components/shared/CTASecondary.tsx`, `components/shared/TrustAnchor.tsx`.
4. Add new `home.page.*` subtree to `messages/en.json` and `messages/fr.json` with strings extracted from `deralis-homepage-v16.html` and `deralis-homepage-v16-fr.html`.
5. Deploy to staging. Run the full checklist on the homepage in both languages.
6. Verify LCP on mobile via Lighthouse.

If anything fails, fix. Do not proceed until the homepage passes all checklist items.

#### Phase 4: Services page (one PR)

1. Create `components/services/ServiceBlock.tsx` and `components/services/OngoingSupport.tsx`.
2. Create `components/shared/QuestionItem.tsx` and `components/shared/QuestionList.tsx`.
3. Rewrite `app/[locale]/services/page.tsx` from scratch.
4. Add `services.page.*` subtree to both JSON files.
5. Deploy to staging. Run checklist.

#### Phase 5: Projects page + project detail (one PR)

1. Create `components/projects/ConceptItems.tsx`.
2. Rewrite `app/[locale]/projects/page.tsx`.
3. Create `app/[locale]/projects/travixo/page.tsx` (or dynamic `[slug]`, per operator decision).
4. Use the existing `projects.page.*` subtree in both JSON files (verify English equivalents exist).
5. Deploy to staging. Run checklist.

#### Phase 6: About, Blog, Contact (one PR or three small PRs)

1. Rewrite `app/[locale]/about/page.tsx`. Verify `about.page.*` exists in both JSON files.
2. Rewrite `app/[locale]/blog/page.tsx` and `app/[locale]/blog/[slug]/page.tsx`. Verify `blog.page.*` and `blogPost.*` exist in both JSON files.
3. Rewrite `app/[locale]/contact/page.tsx`. Replace `components/contact/ContactForm.tsx` entirely. Verify `contact.page.*` exists.
4. Delete `components/shared/CalendlyButton.tsx` if Calendly is no longer the booking flow (ASK operator).
5. Delete `components/about/ScreenshotGallery.tsx` if the new About page does not use it (verify against the mockup).
6. Deploy to staging. Run checklist on each page.

#### Phase 7: Cleanup (one PR)

1. Run all cleanup greps from Section 4 Step 5 and Section 6 Step 7.
2. Delete orphaned old `--dd-*` variables from `app/globals.css`.
3. Delete orphaned old utility classes from `app/globals.css`.
4. Delete orphaned old `home.*` and `services.*` keys from both JSON files (after verifying zero references in the migrated code).
5. Update semantic aliases in `globals.css` to point at the new tokens.
6. Final grep pass: verify zero matches for all forbidden patterns.
7. Deploy to staging. Run the full checklist one more time, end to end.

#### Phase 8: Production deploy

1. Merge the migration branch to `main`.
2. Deploy to production.
3. Purge the Cloudflare cache.
4. Run Lighthouse on the production URL for the homepage, verify LCP under 2.5s.
5. Smoke test: navigate through every page in both languages, verify nothing is broken.
6. Monitor Cloudflare's Firewall Events log for the first 24 hours to catch any unexpected bot-challenge interactions.
7. Monitor the contact form backend for submissions (expect a possible dip until buyers rediscover the form location).
8. Update the spec (`DERALISDESIGNSPEC.md`) with any decisions that got locked during the migration (e.g. About page funnel, project detail routing choice, contact form error states if any were designed). Increment the spec version to v1.3.

### Rollback plan

If Phase 8 deploys a catastrophic regression (homepage down, contact form broken, LCP regresses to 6+ seconds):

1. Revert the `main` branch to the commit before the merge.
2. Redeploy.
3. Purge Cloudflare cache.
4. Investigate on the migration branch.
5. Fix. Re-run checklist. Re-deploy.

Do NOT attempt to hotfix in production. Rollback is faster and safer.

### Deployment cadence

Do NOT deploy all phases on the same day. Spread across at least a week to give the operator time to verify each phase in the wild, catch edge cases on real devices, and adjust before the next phase adds more surface area.

Recommended cadence: one phase per business day. If a phase fails checklist, pause, fix, reverify before the next phase. Do not queue phases behind a broken one.

---

## Appendix A: Grep commands reference

All grep commands used in this brief, collected for convenience. Run from the project root (`D:\Dev\projects\deralis`).

### Old-system identification

```bash
# Framer Motion
grep -rn "from 'framer-motion'" app components src
grep -rn 'from "framer-motion"' app components src
grep -rn "framer-motion" app components src

# Old --dd-* variables (in CSS and any component that inlines them)
grep -rn "\-\-dd-" app components src

# Old utility classes
grep -rn "gradient-text" app components src
grep -rn "gradient-border" app components src
grep -rn "\.glow\b" app components src
grep -rn "card-hover" app components src
grep -rn "bg-mesh" app components src
grep -rn "\.noise" app components src

# Old font
grep -rn "Manrope" .
grep -rn "manrope" .
grep -rn "\-\-font-manrope" .

# Old button classes (need verification — these may have been renamed, not deleted)
grep -rn "btn-primary" app components src
grep -rn "btn-secondary" app components src
```

### Email obfuscation verification

```bash
# Should return zero matches after migration
grep -rn 'contact@deralis.digital' app components src
grep -rn 'href="mailto:[^"]*@' app components src

# Should return matches (correct pattern)
grep -rn 'contact&#64;deralis.digital' app components src
```

### i18n verification

```bash
# Should return high counts (strings coming from i18n)
grep -rn "useTranslations(" app components src | wc -l
grep -rn "t('home\.page\." app components src

# Should return zero (no hardcoded strings after migration)
grep -rn 'children="[A-Z]' app components src | head
```

### French typography verification

```bash
# Should return zero (U+00A0 must be actual codepoints, not entities)
grep -F '&nbsp;' messages/fr.json
grep -F '\u00A0' messages/fr.json

# Should return the canonical imperative form
grep -F 'Cartographiez' messages/fr.json

# Should return zero (infinitive form is forbidden)
grep -F 'Cartographier votre' messages/fr.json
```

---

## Appendix B: What NOT to do

A collected list of anti-patterns that would violate the spec, the brief, or both. If Claude Code is tempted to do any of these, STOP and ask the operator.

### Do NOT

- Install any JavaScript animation library (framer-motion, gsap, aos, lottie-react, anime.js, react-spring, motion-one, etc.)
- Create a `tailwind.config.js` file (Tailwind v4 has no config file)
- Install `@tailwindcss/typography` or `@tailwindcss/forms` (the spec defines its own typography and form patterns)
- Install `shadcn/ui` or copy shadcn components into the project (the project has its own component library convention)
- Create a `components/ui/` folder
- Use kebab-case for component file names
- Use literal `@` in any email address in rendered JSX
- Hardcode any visible string in JSX (except blog post markdown bodies)
- Silently rewrite an existing French string without flagging it
- Silently delete an i18n key without verifying zero references
- Silently delete a CSS class definition without verifying zero references
- Add scroll-triggered animations, page transitions, stagger effects, parallax, or any other forbidden motion pattern
- Add a sticky mobile CTA, a floating CTA, a modal CTA, or any other CTA pattern not in the spec
- Add a service dropdown or budget dropdown to the contact form
- Add sidebar blocks (Contact Info, What to Expect, Quick Questions) to the contact page
- Use "free consultation" or "get a quote" framing anywhere
- Invent metrics, testimonials, or client results
- Claim George has clients TraviXO does not have
- Imply Ariane Systems is in equipment rental or aerospace
- Imply George's Loxam role was operational leadership
- Use em-dashes anywhere
- Use any banned vocabulary word
- Use `nous` in French anywhere except the single audit CTA H2 exception
- Use the infinitive `Cartographier` in CTA labels — always imperative `Cartographiez`
- Use straight quotes `'` or `"` for French quotation (always `« »`)
- Use regular spaces before French `?`, `!`, `:`, `;`, `»` (always U+00A0)
- Use `&nbsp;` HTML entity in `fr.json` (always U+00A0 codepoint)
- Use `€300` format in French (always `300 €` with U+00A0)
- Use pure black `#000` anywhere (always `--ink` = `#14110D`)
- Use cyan or any gradient anywhere
- Add shadows, gradients, or texture beyond the case study screenshot frame's two-layer shadow
- Use font weight 300, 700, or 800
- Use a font other than Inter
- Add section padding values outside the locked scale (e.g. 73px is forbidden)
- Reproduce the nav or footer with even minor differences between pages
- Introduce a fourth surface color outside the four locked backgrounds
- Add browser-chrome screenshots with macOS traffic lights
- Add tech stack badges on case studies (homepage scope; the project detail page may relax this pending spec v1.3 decision)
- Add multiple CTAs competing in the same section
- Add accordions for FAQ content (use the inline question list pattern)
- Create a new component type when a locked component already covers the use case

### Do

- Ask the operator when any decision is unclear
- Flag editorial debt, do not rewrite silently
- Verify greps before and after each cleanup step
- Run the full checklist on every deployed page in both languages
- Preserve U+00A0 codepoints byte-for-byte in JSON files
- Follow the existing folder and naming conventions
- Prefer smaller PRs and incremental deploys over big-bang releases
- Defer to the spec when the spec and the mockups disagree
- Defer to the mockups for visual layout details the spec does not specify
- Defer to the operator when the spec and the brief both leave a decision open

---

## Appendix C: Outputs the operator expects from Claude Code

When Claude Code finishes the migration (or any phase of it), the output to the operator must include:

1. **A diff summary.** Which files were created, modified, or deleted. Grouped by phase.
2. **Grep verification results.** The before-and-after counts for every grep command in Appendix A.
3. **The seven flagged French strings list**, plus any additional editorial flags discovered during migration, formatted as a markdown table with columns: Key, Current value, Alternatives, Decision needed.
4. **The open questions list.** Any decision the brief flagged for the operator that was not resolvable during execution:
   - Project detail routing: Option A (`/projects/travixo`) or Option B (`/projects/[slug]`)
   - Calendly button: keep or delete
   - About page ScreenshotGallery component: keep, replace, or delete
   - Contact form error/success states (v1.2 spec decision needed before production)
   - Typography fixer script existence (does `scripts/typography-fix.js` or similar exist in the repo?)
   - Cloudflare Rocket Loader, Auto Minify, Mirage, Polish settings verification
   - Audit CTA destination URL canonical value
5. **The Lighthouse report** for the deployed staging homepage, including LCP, FCP, CLS, TBT, and total page weight.
6. **A brief written summary** (5-15 lines) of anything surprising or unexpected discovered during the migration. Examples:
   - "Phase 2 revealed that `components/seo/` contained a reference to Framer Motion I had not planned for. Refactored to remove."
   - "The existing `en.json` was missing 47 keys that `fr.json` has. Extracted from the English mockups."
   - "The audit CTA destination URL was `https://calendly.com/deralis-digital/audit` in the current code, not `/audit` as the mockups suggest. Used the Calendly URL per the operator's latest Stripe + booking setup."

---

## Closing note for Claude Code

This brief is exhaustive by design. It is longer than it needs to be for any single step, and shorter than it needs to be for the whole migration. When you execute, do NOT try to hold the whole document in your head at once. Instead:

1. Read the brief in full once.
2. Re-read Section 3 (file mapping) and Section 5 (component library) when starting a page.
3. Re-read Section 4 (globals.css migration) before touching CSS.
4. Re-read Section 6 (i18n mapping) before touching JSON files.
5. Re-read Section 11 (testing checklist) before declaring any phase complete.
6. Re-read Appendix B (what NOT to do) when tempted by any pattern that feels clever.

If the spec and the brief disagree, the spec wins. If the brief and a mockup disagree on copy, the spec's editorial rules win (the mockup is a visual reference, not a copy reference). If the operator contradicts the brief during execution, the operator wins — but flag the contradiction in writing before pressing on so the brief can be updated.

This migration is the operator's attempt to pivot the Deralis Digital site from a developer-tool template aesthetic into a calm European B2B services practice. Every decision in the spec and in this brief is downstream of that repositioning. When you are tempted to add something "just because it would be cool", ask: does this fit a calm European B2B services practice? If no, do not add it. The restraint IS the system.

End of brief.
