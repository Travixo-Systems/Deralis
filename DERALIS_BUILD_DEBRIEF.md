# DERALIS BUILD DEBRIEF

Generated for skill extraction. Machine-readable format.

---

## 1. PROJECT_META

```yaml
name: Deralis Digital
purpose: Marketing site and lead generation platform for an independent web engineering practice
audience: Founders, SMB operators, and teams in France/Europe needing custom internal tools, SaaS platforms, or workflow automation
problem_solved: Replaces a generic agency site with a positioning-accurate platform that qualifies leads through discovery-first pricing and domain-specific proof points
url: https://deralis.digital
stack: [Next.js 16, React 19, TypeScript 5.9, Tailwind CSS 4, next-intl 4, Framer Motion, Resend, Vercel]
repo: https://github.com/Travixo-Systems/Deralis
```

---

## 2. REQUIREMENTS

- Bilingual site (EN default at root, FR at /fr) with full content parity
- Personal voice throughout (I/my/me, not we/our/us)
- Discovery-first pricing model: no project quotes without a paid €750 audit
- Services page with four categories: consulting, development, AI/automation, support
- TraviXO proof point with link to production SaaS as credibility anchor
- Blog system with markdown source files and localized listing metadata
- Contact form with email delivery via Resend
- Lead generation: exit intent popup, sticky mobile CTA, newsletter signup, lead magnet
- Automated 3-email nurture sequence triggered on lead capture
- SEO: JSON-LD structured data, hreflang alternates, sitemap, robots.txt
- Microsoft Clarity analytics
- Calendly integration for booking calls
- Dark theme with cyan/blue gradient accent system
- [?] ROI calculator exists but unclear if actively promoted or tested with users
- [?] Lead magnet popup references a downloadable asset that may not exist yet

---

## 3. DECISIONS

| Decision | Chose | Over | Why | Repeat? |
|----------|-------|------|-----|---------|
| i18n approach | next-intl with JSON message files | react-intl, next-translate | Native Next.js App Router support, `t.rich()` for inline JSX, locale prefix control | Yes |
| Locale routing | `localePrefix: 'as-needed'` | Always show prefix | EN serves at clean root URL, FR at /fr — no /en clutter | Yes |
| Styling | Tailwind v4 + CSS custom properties | Tailwind v3, CSS modules | CSS vars enable theme tokens (`--dd-accent`) reusable across utility and custom classes | Yes |
| Email service | Resend | SendGrid, Nodemailer | Simple API, good DX, supports React email templates | Yes |
| Blog storage | Markdown files in `content/blog/` | CMS, database | No external dependency, version-controlled, works with static generation | Yes |
| Pricing display | Scope-dependent with fixed audit fee | Showing price ranges | Ranges anchor low and attract unqualified leads; discovery-first filters better | Yes |
| Component architecture | Page-level components, no shared UI library | shadcn/ui components | Site is marketing-focused; pages are unique enough that shared primitives add indirection without reuse | Maybe |
| Analytics | Microsoft Clarity only | Google Analytics, Plausible | Session replay and heatmaps more useful than pageview counts for a conversion-focused site | Yes |
| Font | Manrope (primary) + Inter (secondary) | System fonts, single font | Manrope for headings/brand feel, Inter for body readability | Yes |
| Caching strategy | Aggressive static + no-cache HTML | Default Next.js caching | Cloudflare-compatible; prevents stale content on redeploy while caching immutable assets | Yes |

---

## 4. DEVIATIONS

| What prompt said | What I did | Type | Why |
|------------------|-----------|------|-----|
| None | N/A | N/A | N/A |

---

## 5. PRACTICES

| Practice | Where |
|----------|-------|
| CSS custom properties as design tokens with `--dd-` namespace | app/globals.css:8-22 |
| Locale-aware metadata generation with hreflang alternates | app/[locale]/layout.tsx:39-80 |
| `t.rich()` for embedding JSX links inside translated strings | app/[locale]/services/page.tsx:336-347 |
| Structured data injection via `dangerouslySetInnerHTML` for FAQ schema | app/[locale]/services/page.tsx:293-309 |
| Security headers in next.config (X-Frame-Options, nosniff, referrer) | next.config.ts:40-55 |
| Static params generation from routing config for locale pages | app/[locale]/layout.tsx (generateStaticParams) |
| Calendly integration as shared button component with consistent CTA | components/shared/CalendlyButton.tsx |
| 3-email nurture sequence defined as data in a single file | lib/nurture-emails.ts |
| Blog content split: markdown body in `content/`, listing metadata in messages JSON | content/blog/, messages/en.json |
| GA4 event tracking abstracted into typed helper functions | lib/analytics.ts |
| Font variable injection at root layout, consumed in locale layout | app/layout.tsx, app/[locale]/layout.tsx |
| Lead gen components (exit intent, sticky CTA) loaded at layout level | app/[locale]/layout.tsx |

---

## 6. PATTERNS

```yaml
name: Bilingual translation with JSX embedding
when_to_use: When a translated string needs an inline link, bold text, or other JSX element
snippet: |
  // messages/en.json: "text": "See <link>TraviXO</link> in production."
  {t.rich("proof.text", {
    link: (chunks) => (
      <a href="https://example.com" className="text-[var(--dd-accent)]">{chunks}</a>
    ),
  })}
```

```yaml
name: CSS design token system
when_to_use: When adding any color, border, or background that should respect the theme
snippet: |
  /* Define in globals.css */
  :root { --dd-accent: #38bdf8; --dd-bg-card: #0d1424; }
  /* Use in components */
  className="text-[var(--dd-accent)] bg-[var(--dd-bg-card)]"
```

```yaml
name: Service card iteration from translation keys
when_to_use: When rendering a list of items where all content lives in translation files
snippet: |
  const serviceKeys = ["consulting", "development", "ai", "support"] as const;
  {serviceKeys.map((key) => (
    <div key={key}>
      <h2>{t(`items.${key}.title`)}</h2>
      <p>{t(`items.${key}.description`)}</p>
    </div>
  ))}
```

```yaml
name: Locale-aware metadata with template
when_to_use: When generating page metadata that varies by locale
snippet: |
  const titles = {
    fr: { default: "Titre FR", template: "%s: Deralis Digital" },
    en: { default: "Title EN", template: "%s: Deralis Digital" },
  };
  return { title: titles[locale], description: descriptions[locale] };
```

```yaml
name: FAQ with JSON-LD structured data
when_to_use: When rendering FAQ sections that should appear in Google rich results
snippet: |
  <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: faqKeys.map((key) => ({
        "@type": "Question", name: t(`faq.items.${key}.question`),
        acceptedAnswer: { "@type": "Answer", text: t(`faq.items.${key}.answer`) },
      })),
    }),
  }} />
```

```yaml
name: Comparison grid (us vs them)
when_to_use: When showing differentiation between your approach and the industry default
snippet: |
  {(t.raw("comparison.typical.items") as string[]).map((item) => (
    <li className="flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />{item}
    </li>
  ))}
```

```yaml
name: Gradient border card
when_to_use: When a card needs visual emphasis without a solid colored background
snippet: |
  <div className="gradient-border p-6">
    {/* content */}
  </div>
  /* globals.css: .gradient-border uses ::before pseudo with gradient */
```

```yaml
name: API route with Resend email
when_to_use: When handling form submissions that need to send transactional email
snippet: |
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: process.env.RESEND_TO_EMAIL,
    subject: `New contact: ${name}`,
    html: emailBody,
  });
```

---

## 7. DEPENDENCIES

| Package | Does | Chose over | Why |
|---------|------|-----------|-----|
| next-intl | i18n routing, translation, locale detection | next-translate, react-intl | Best App Router integration, `t.rich()` for JSX in translations, locale prefix control |
| resend | Transactional email delivery | SendGrid, AWS SES | Minimal API surface, good TypeScript types, no config overhead |
| framer-motion | Page transitions and scroll animations | CSS animations, react-spring | Declarative API, layout animations, good React 19 support |
| lucide-react | Icon library | heroicons, react-icons | Tree-shakeable, consistent style, smaller bundle per icon |
| class-variance-authority | Component variant management | Manual className logic | Type-safe variant definitions for buttons and cards |
| tailwind-merge | Merge conflicting Tailwind classes | Manual deduplication | Prevents `bg-red bg-blue` conflicts when composing className props |
| next-seo | SEO meta tag management | Manual Head tags | Structured API for OG, Twitter, JSON-LD meta |

---

## 8. HARD_PROBLEMS

```yaml
problem: Maintaining full content parity across EN and FR with 800+ translation keys
difficulty: complexity
solution: All copy lives in messages/{locale}.json with identical key structures. Components never hardcode strings. Translation keys are iterated via t.raw() for arrays and t.rich() for JSX-embedded strings. Any key added to en.json must be mirrored in fr.json or the page breaks visibly.
files: [messages/en.json, messages/fr.json]
```

```yaml
problem: Pricing copy that qualifies leads without anchoring too low
difficulty: ambiguity
solution: Replaced specific price ranges (€3,000–€25,000) with "Scope-dependent — discussed after discovery." Only the audit (€750 fixed) and retainer (from €290/month) show numbers. FAQ answer explains the discovery-first process. This required rewriting the FAQ cost answer and all four investment lines.
files: [messages/en.json, messages/fr.json]
```

```yaml
problem: Positioning shift from agency voice to solo practitioner without breaking existing copy
difficulty: constraints
solution: Global find-and-replace of we/our/us patterns across both locale files and all components. Required manual review of every instance because some "we" usages were in client-facing context ("we will discuss") vs brand context ("we build"). Commit b9669bd covers the full sweep.
files: [messages/en.json, messages/fr.json, components/layout/Footer.tsx, components/home/Hero.tsx]
```

---

## 9. TECH_DEBT

1. [INCOMPLETE] ROI calculator component exists but may not be wired to analytics or tested with real users → validate with session recordings, remove if unused
2. [INCOMPLETE] Lead magnet popup references a downloadable asset → confirm asset exists or remove the popup
3. [FRAGILE] Translation key parity between en.json and fr.json has no automated check → add a build-time script that diffs key structures
4. [SUBOPTIMAL] Blog article metadata (slug, category, date) duplicated in page.tsx and messages JSON → single source of truth, generate listing from markdown frontmatter
5. [INCOMPLETE] No .env.example file → create one documenting RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_EMAIL
6. [SUBOPTIMAL] Nurture email sequence defined but trigger mechanism unclear → verify Resend workflow or webhook integration
7. [FRAGILE] Middleware file is named proxy.ts but Next.js expects middleware.ts → verify this is correctly picked up or rename
8. [SUBOPTIMAL] No automated tests of any kind → add at minimum: JSON parse check for both locale files, build smoke test

---

## 10. STYLE_RULES

RULE: All user-facing strings must live in messages/{locale}.json, never hardcoded in components.
RULE: Use CSS custom properties prefixed with `--dd-` for all colors, borders, and backgrounds.
RULE: Separator in page titles is colon-space (`: `), not pipe or dash. Template: `%s: Deralis Digital`.
RULE: Voice is first-person singular (I/my/me). Never use we/our/us for the brand.
RULE: No em dashes in copy. Use commas, periods, or restructure the sentence.
RULE: No AI filler words. Never use "leverage," "utilize," "streamline," or "cutting-edge."
RULE: Blog first h2 uses `mt-0`. All subsequent h2 elements use `mt-10`.
RULE: Blog article container max-width is `850px`, not `max-w-3xl`.
RULE: Pricing for scoped projects shows "Scope-dependent — discussed after discovery." Only fixed-fee items show numbers.
RULE: The word "engineer" or "engineering" is preferred over "developer" or "development" in positioning copy.
RULE: Every CTA button that books a call uses `tActions("bookCall")` mapped to CalendlyButton or Link to /contact.
RULE: When adding a new translation key to en.json, always add the equivalent key to fr.json in the same commit.

---

## 11. CONTEXT_FOR_NEW_SESSION

- FACT: This is a Next.js 16 + React 19 bilingual marketing site for Deralis Digital, an independent web engineering practice.
- FACT: All copy lives in messages/en.json and messages/fr.json. Components reference translation keys via next-intl's `useTranslations` hook.
- FACT: English is served at the root URL. French is served at /fr. Locale prefix is 'as-needed' so /en never appears.
- FACT: Voice is first-person singular (I build, my work, me). The brand was repositioned from agency to solo practitioner.
- FACT: Pricing is discovery-first. Only the audit (€750 fixed) and retainer (from €290/month) show amounts. Projects say "Scope-dependent."
- FACT: The design system uses CSS custom properties prefixed --dd- defined in app/globals.css. Dark theme with cyan/blue gradients.
- FACT: Title separators are colon-space (`: `), not pipe or dash. Template: `%s: Deralis Digital`.
- FACT: Blog content lives in content/blog/{slug}.md with frontmatter. Listing metadata is in messages JSON under blog.posts.
- FACT: CLAUDE.md in repo root contains project-specific instructions that override defaults. Read it first.
- FACT: The services page ends with a TraviXO proof point (linked to travixosystems.com) directly above the final CTA, using t.rich() for the inline link.
