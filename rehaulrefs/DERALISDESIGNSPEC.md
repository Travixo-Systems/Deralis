# Deralis Digital Design Specification

**Version:** 1.5 (funnel architecture lock: no public booking surfaces, contact form is written-message-only, post-payment scheduling private)
**Date:** April 9, 2026
**Status:** Source of truth for all Deralis Digital web work
**Reference files:** `deralis-homepage-v16.html`, `deralis-services-v1.html`, `deralis-projects-v1.html`, `deralis-contact-v1.html`

---

## Purpose

This document captures every locked design decision from the homepage redesign session that produced `deralis-homepage-v16.html`. It exists so that future builds (other pages, codebase migration, French translations, third-party developers) can apply the same visual system without re-deriving it from screenshots or guessing.

If something is in this document, it is locked. If something is not in this document, it has not been decided yet and should not be invented.

---

## Foundational principles

Five rules sit above every specific token below. If a future change conflicts with one of these, the principle wins.

1. **Independent practice positioning, not agency.** First-person "I" everywhere. No "we", "our", "us" except the single "we" inside the audit CTA headline ("Nothing is built until we agree it's worth building"), where it reads as "me and the client" rather than corporate plural.
2. **No em-dashes.** Anywhere. Code comments, headings, meta descriptions, ARIA labels, anywhere.
3. **No fabricated metrics, testimonials, or client results.** TraviXO has zero paying clients as of this document's date. All copy must remain inside verifiable honest framings until real results exist.
4. **No AI filler words.** Banned vocabulary: leverage, seamlessly, robust, cutting-edge, delve, streamlined, unlock, empower, harness, foster, navigate (as a verb meaning "deal with"), journey (as a metaphor).
5. **European B2B services register, not developer-tool marketing.** Warm cream backgrounds, not dark navy. Soft frames, not browser chrome with macOS traffic lights. Calm hierarchy, not loud genre markers.

---

## How to use this spec for other pages

This document is the design system for the entire Deralis Digital site, not just the homepage. The homepage `deralis-homepage-v16.html` is the visual reference because it is the first page that has been built against this system, but every token, component, editorial rule, and foundational principle in this document applies to every other page on the site without modification.

When building a new page (Services, Projects, About, Blog, Contact, or any future page), the process is:

1. **Inherit the entire design system as-is.** Use the same color tokens, the same font loading and type scale, the same spacing tier discipline, the same `.wrap` container, the same 880px breakpoint, the same nav, the same footer, the same section heading pattern, the same CTA components, the same label system, the same hover transitions. Do not re-derive these. Do not invent new tokens. If a needed token does not exist, add it to this document first, then use it.

2. **Decide the page-level funnel.** Each page has a different job and therefore a different vertical flow. The homepage funnel is recognition → process preview → qualification → proof → conversion → clarification → final capture. The Services page funnel will be different. The About page funnel will be different. Each page needs its own funnel decision before any layout work begins, and that funnel decision should be written down somewhere referenceable, ideally appended to this document.

3. **Compose the page from existing components.** Use the section heading pattern, the cards, the CTAs, the case study screenshot frame, the trust anchor pattern, the audit CTA block, and so on. Do not invent new component types unless absolutely required. If a new component is required (e.g. a form input on the Contact page, a long-form blog body, a pricing table), specify it in this document before building it.

4. **Verify against the editorial rules.** Every word of copy must pass the banned vocabulary list, the no-em-dashes rule, the honest framing requirements, and the first-person voice rule.

5. **Verify against the foundational principles.** If any decision in the new page conflicts with one of the five foundational principles, the principles win.

The design system is closed (locked tokens, locked components). The page library is open (each page is composed from those tokens and components into whatever vertical flow that page needs).

---

## On consistency: what locks, what flexes

This section exists because the question "should every page on the site match exactly?" has a non-obvious answer that affects how this spec is applied. The short answer is no, but the reasoning matters.

The research literature on design system consistency (Nielsen Norman Group, IxDF, CXL, design system measurement studies from UXPin and others) supports consistency at three specific levels: token-level (colors, type, spacing units), component-level (nav, buttons, forms, CTAs), and behavioral-level (same actions produce the same results). It does NOT support pixel-level page matching, and NN/g explicitly warns against "consistency for consistency's sake" overriding other heuristics. Variation is endorsed when it directs attention, marks transitions, or serves a page's specific job. The strongest documented conversion impact in the literature comes from unifying three completely different checkout flows into one (a 15% lift), not from matching padding values across pages of an already-coherent site.

For Deralis Digital specifically, at current traffic volumes, A/B testing cross-page consistency is statistically impossible. Decisions in this section are craft principles, not data-driven claims. They are correct because they reduce cognitive load and reinforce the system's logic, not because they have been measured to lift conversion by a specific percentage.

### What locks across every page (mandatory)

Every page on the Deralis Digital site MUST share the following without exception. If a future page diverges on any of these, the system fractures and the divergence must be either reverted or formally added to this spec.

- Every color token from the Color tokens section
- The Inter font loading and full typography scale
- The full spacing scale (24, 32, 40, 48, 56, 60, 64, 72, 80 px on desktop; 24, 32, 40, 42, 44, 48 px on mobile). Pages may select different values from this scale, but the scale itself does not vary per page.
- The `.wrap` container (1240px max-width, 48px / 24px gutters)
- The 880px mobile breakpoint
- The site nav component (literally identical, with the current page's link in active state)
- The site footer component (literally identical, with the Services column matching the canonical service list)
- Primary CTA (`.cta-primary`) and secondary text-link CTA (`.cta-secondary`) — same styling, same hover states, same arrow translate
- The label system (`--ink-label` and `--ink-cool-label`, 14-16px, weight 600)
- The italicized `<em>` accent treatment for headlines (one word per headline maximum, in `--accent` blue)
- All editorial rules and banned vocabulary
- The `&#64;` HTML entity pattern for any email address anywhere on the site
- The five foundational principles at the top of this document

### What flexes per page (allowed variation)

The following are explicitly allowed to vary per page based on the page's job. Variation here is not drift; it is the design system being used correctly.

- **Section padding values within the scale.** The homepage hero is 32/52. The Services page hero is also 32/52, but the Services page core services section is 60/24 because it sits inside a deep cream surface and the bottom padding interacts with the service block internal spacing. Both pages use values from the locked scale; the specific values differ because the sections do different jobs.
- **Surface treatments per section.** A page may use `--bg`, `--bg-deep`, `--bg-cta`, and `--bg-footer` in any combination that serves the page's rhythm. The Services page uses `--bg-deep` on two sections (core services and ongoing support); the homepage uses it on one (How I work). This is correct, not inconsistent.
- **Section count.** The homepage has 6 content sections. The Services page has 6 content sections. The About page may have 4. The Projects page may have 8. Each page is sized to its job.
- **Hero treatment.** The homepage hero is brand-defining and uses a 64px headline with a two-column trust anchor layout. The Services page hero is informational continuation and uses a 60px headline with a single-column layout and no anchor. Different jobs, different heroes, same design system underneath.
- **Page funnel structure.** Each page has its own vertical flow, decided per page based on what the page is for. See "How to use this spec for other pages" for the process.
- **Component composition.** A page may use any subset of the locked components in any order. The Services page uses the audit CTA section component without using the trust anchor component. That is correct.

### What is forbidden

Even with the flex above, certain things break the system regardless of page. These are violations:

- Inventing new colors outside the token list
- Using a font weight other than 400, 500, or 600
- Using a font other than Inter
- Adding a section padding value not on the locked scale (e.g. 73px is not allowed)
- Building a CTA that does not match `.cta-primary` or `.cta-secondary`
- Reproducing the nav or footer with even minor differences
- Introducing a fourth surface color outside the four locked backgrounds
- Adding shadows, gradients, or texture beyond the case study screenshot frame's two-layer shadow
- Adding icons unless they earn their place by carrying meaning the text cannot
- Using em-dashes anywhere
- Any of the AI filler vocabulary in the editorial rules
- Adding any motion outside the locked allowed list in the "Motion and animation" section. Specifically forbidden: scroll-triggered animations, page transitions, stagger effects, parallax, scale or rotation hover effects, JavaScript animation libraries (Framer Motion, GSAP, AOS, etc.). Hover transitions are CSS-only and limited to the specific cases documented in the motion section.

### Practical test for any new page

Before shipping a new page, verify it against this checklist:

1. Does every color on the page come from the token list? If not, fix.
2. Does every font size come from the type scale? If not, fix.
3. Does every spacing value come from the locked scale? If not, fix.
4. Is the nav literally identical to the homepage nav? If not, fix.
5. Is the footer literally identical to the homepage footer? If not, fix.
6. Are all CTAs using the locked component classes? If not, fix.
7. Does the page funnel make sense for the page's job? If not, redesign the funnel.
8. Does the copy pass the editorial rules? If not, rewrite.

If the page passes all eight checks, it is consistent with the system regardless of whether its specific section padding values match any other page on the site exactly.

---

## Color tokens

All colors are defined as CSS custom properties on the `:root` selector. Use these tokens, never raw hex values.

### Surfaces

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#F7F4ED` | Default page background. Warm off-white. |
| `--bg-deep` | `#F2EEE6` | Slightly deeper warm cream. The system's content depth surface. Used wherever a section needs to read as a distinct content block without introducing a new color. Examples: homepage "How I work" services section, Services page core services section, Services page Ongoing Support section. Multiple `--bg-deep` blocks on the same page are acceptable and create paired content zones around cool tint conversion surfaces. |
| `--bg-cta` | `#F2F5F7` | Light cool tint. The single primary visual break, used for the audit CTA section and the flow strip. Both surfaces visually rhyme to bookend the warm content. |
| `--bg-footer` | `#EFEAD8` | Deepest warm cream. Footer only. |

### Ink (text)

| Token | Hex | Usage |
|---|---|---|
| `--ink` | `#14110D` | Warm near-black. All primary headlines, body copy, and high-contrast text. Never use pure black `#000`. |
| `--ink-2` | `#6B655C` | Secondary text. Used for descriptions, intro copy, anchor descriptions. |
| `--ink-2-soft` | `#7F7A70` | Tertiary text. Used for the second and third sentences of the subhead stack to create hierarchy separation from the dominant first sentence. |
| `--ink-3` | `#9A9388` | Quaternary text. Used for closing notes, "(spec)" qualifier text, fine print. |
| `--ink-label` | `#5C5750` | Warm label color. Used for section eyebrows, anchor headings, footer column headings. Deliberately darker than `--ink-2-soft` so labels read as structural anchors. |

### Cool accents (used only on `--bg-cta` surfaces)

| Token | Hex | Usage |
|---|---|---|
| `--ink-cool` | `#5A6472` | Secondary text on cool tint surfaces. Audit CTA body copy. |
| `--ink-cool-label` | `#4E5865` | Label color on cool tint surfaces. Audit CTA eyebrow, flow strip "How I work" label. |
| `--ink-cool-muted` | `#8791A0` | Fine print on cool tint surfaces. Audit CTA fixed-price note. |

### Borders

| Token | Hex | Usage |
|---|---|---|
| `--border` | `#DCD5C2` | Default warm border. Used for nav bottom border, section dividers, subtle separators. Updated from `#E8E2D4` after the Services page calibration revealed the lighter value created insufficient structural separation at typical viewing distances. |
| `--border-warm` | `#D4CCBA` | Slightly darker warm border. Used for the trust anchor's left vertical line, the case study screenshot frame, the footer top border, the footer bottom-bar divider. |
| `--border-cool` | `#DCE2EA` | Cool border. Used only on `--bg-cta` surfaces (audit CTA top/bottom borders, flow strip top/bottom borders, service item top borders inside the warm "How I work" section). |

### Accent

| Token | Hex | Usage |
|---|---|---|
| `--accent` | `#1B3A5C` | Deep ink blue. NEVER cyan. Used for: italicized words inside headlines (`<em>` tag), the audit CTA H2 color, the final CTA italicized word, primary CTA hover state. The accent appears sparingly and always with intent. |

---

## Typography

### Font family

Inter only. Loaded from Google Fonts with preconnect hints. No fallback fonts beyond the system stack:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
```

```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

### Weights used

- **400** (regular) — body copy default
- **500** (medium) — headlines, emphasis, CTAs, the dominant first sentence in the subhead stack
- **600** (semibold) — labels only (eyebrows, anchor headings, footer column headings, flow strip label, audit CTA eyebrow)

Never use 700 (bold) or 800. Never use weight 300 or 200.

### Italic

Italic 400 and italic 500 are loaded but used only for the `<em>` tag inside headlines, which colors the italicized word in `--accent` blue. This is the page's only italic usage.

### Type scale (desktop)

| Element | Size | Weight | Line height | Letter spacing | Color |
|---|---|---|---|---|---|
| Hero headline (h1) | 64px | 500 | 1.04 | -0.025em | `--ink` |
| Section title (h2) | 40px | 500 | 1.1 | -0.02em | `--ink` |
| Audit CTA h2 | 40px | 500 | 1.12 | -0.02em | `--accent` |
| Final CTA h2 | 44px | 500 | 1.1 | -0.025em | `--ink` |
| Section intro | 18px | 400 | 1.6 | normal | `--ink-2` |
| Subhead first sentence | 22px | 500 | 1.6 | normal | `--ink` |
| Subhead follow-up sentences | 20px | 400 | 1.6 | normal | `--ink-2-soft` |
| Body copy | 16px | 400 | 1.6 | normal | `--ink` or `--ink-2` |
| Eyebrow (hero) | 16px | 500 | 1.6 | 0.01em | `--ink-label` |
| Section eyebrow | 14px | 600 | 1.6 | 0.03em | `--ink-label` |
| Audit CTA eyebrow | 15px | 600 | 1.6 | 0.03em | `--ink-cool-label` |
| Flow strip label | 14px | 600 | 1.6 | 0.03em | `--ink-cool-label` |
| Anchor heading | 14px | 600 | 1.6 | 0.03em | `--ink-label` |
| Anchor prose | 15px | 400 | 1.7 | normal | `--ink` |
| Built item name | 16px | 500 | 1.6 | normal | `--ink` |
| Built item description | 14px | 400 | 1.6 | normal | `--ink-2` |
| Anchor signature | 13px | 400 | 1.7 | normal | `--ink-2` |
| Microline / fine print | 13px | 400 | 1.55 | normal | `--ink-3` |
| Service item number | 13px | 500 | 1.6 | 0.04em | `--ink-3` |
| CTA button text | 15px | 500 | 1.6 | normal | varies |

### Type scale (mobile, breakpoint 880px)

| Element | Mobile size |
|---|---|
| Hero headline | 38px |
| Section title | 28px |
| Audit CTA h2 | 28px |
| Final CTA h2 | 28px |
| Section intro | 16px |
| Subhead first sentence | 19px |
| Subhead follow-up sentences | 17px |
| Eyebrow (hero) | 15px |
| Anchor prose | 16px |
| Built item name | 17px |
| Built item description | 15px |

---

## Spacing system

Two-tier discipline locked after multiple calibration passes. All values are in pixels.

### Section padding (desktop, locked from v16)

| Section | Top | Bottom |
|---|---|---|
| Hero | 32 | 52 |
| Flow strip (cool tint) | 24 | 24 |
| Who I work with | 60 | 60 |
| Case study | 52 | 44 |
| Audit CTA (cool tint) | 60 | 60 |
| How I work (deep cream) | 60 | 60 |
| Final CTA | 60 | 34 |
| Footer | 36 | 22 |

Hero top is deliberately tight. Final CTA and footer are tight at the bottom of the page so the closing reads as a continuation rather than a new section.

### Section padding (mobile, breakpoint 880px)

| Section | Top | Bottom |
|---|---|---|
| Hero | 24 | 34 |
| Sections (.section, .who, .howiwork) | 42 | 42 |
| Case study | 42 | 34 |
| Audit CTA | 42 | 42 |
| Final CTA | 44 | 28 |
| Footer | 32 | 20 |

### Internal spacing (inside sections)

| Element | Margin |
|---|---|
| Section heading wrap (eyebrow + title + intro block) | margin-bottom 40px |
| Section eyebrow → title | margin-bottom 16px |
| Section title → intro | margin-bottom 16px |
| Hero eyebrow → headline | margin-bottom 28px |
| Hero headline → subhead | margin-bottom 32px |
| Hero subhead → CTA row | margin-bottom 36px |
| Subhead paragraph spacing | margin-bottom 16px |
| Anchor block → next anchor block | margin-bottom 32px |
| Anchor heading → prose | margin-bottom 14px |
| Built item padding | 13px 0 |
| Service item padding-top | 24px |
| Footer column heading → list | margin-bottom 14px |
| Footer column list item gap | 8px |
| Footer grid → bottom border | margin-bottom 28px |
| Footer-bottom padding-top | 18px |

### Wrap (container)

```css
.wrap {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 48px;
}
```

Mobile: `padding: 0 24px`.

### Breakpoint

Single breakpoint at `880px`. Below this, the layout shifts to single-column mobile mode.

---

## Layout structure

The homepage is a six-section vertical flow plus nav and footer. Section order is locked. Reordering must be justified against the funnel logic below.

### Funnel order (locked, do not reorder without revisiting)

1. **Nav** — site-wide
2. **Hero + trust anchor** — recognition + credentials
3. **Flow strip** — process preview (cool tint surface, visually rhymes with audit CTA)
4. **Who I work with** — qualification filter
5. **Case study (TraviXO)** — proof
6. **Audit CTA** — conversion moment (cool tint, the page's primary visual hinge)
7. **How I work** — service menu (deep cream surface, secondary visual break)
8. **Final CTA** — soft restatement and capture
9. **Footer** — site-wide

The logic: recognition → process preview → qualification → proof → conversion → clarification → final capture. Proof comes before the conversion ask. Service detail comes after the conversion ask, because a buyer who has decided to book the audit does not need to see the full service ladder before deciding.

### Hero grid

Two-column asymmetric:
```css
.hero-grid {
  display: grid;
  grid-template-columns: 1.65fr 1fr;
  gap: 80px;
  align-items: start;
}
```

Mobile: collapses to single column with 40px gap.

### Trust anchor

Lives in the right column of the hero grid. Bordered on the left with `--border-warm`. Three internal blocks:

1. **Background** — narrative prose, single sentence about technical client work history at French software and industrial companies, naming Loxam as the source of TraviXO domain knowledge.
2. **What I've built** — two items: TraviXO (live SaaS, "Built solo. Live.") and Government portal flagged as "(spec)". Each item has a name, optional qualifier, and a one-sentence description.
3. **Signature line** — "Independent. Bilingual French and English. One person, every line of code." Separated from the blocks above by a top border.

The trust anchor must never imply employment at companies George did not work at. Loxam is the only company name allowed at hero level.

---

## Component specifications

### Navigation

```css
nav.site-nav {
  border-bottom: 1px solid var(--border);
  padding: 22px 0;
}
```

Structure: logo on left, nav links centered, language toggle + primary CTA button on right. Logo is a 24x24px filled square in `--ink` next to the wordmark in 16px medium.

Nav links: 14px regular, `--ink-2`, hover state `--ink`. Hidden on mobile.

Primary nav CTA: outlined button, 13px medium, 1px border in `--ink`, hover fills with `--ink` background and `--bg` text.

**Nav primary CTA route-aware override:** the nav primary CTA's label and href are funnel-stage-dependent. On every page EXCEPT the audit page, the nav CTA renders the entry-page label `See what the audit covers →` (English) / `Découvrez l'audit →` (French) and links to `/audit`. On the audit page itself, the nav CTA is overridden to render the destination-page label `Start the audit (€300)` (English) / `Démarrez l'audit (300 €)` (French) and links to the Stripe payment link URL. The override is implemented via `usePathname()` from `next-intl/navigation` and a conditional render. Without the override, the nav CTA on `/audit` would point to the page the buyer is already on. See 'French language conventions → CTA verb form' for the full two-stage architecture.

### Hero CTAs

Two CTAs side by side: a primary and a secondary text link.

**Primary CTA (`.cta-primary`)**: filled button, `--ink` background, `--bg` text. 17px 28px padding, 8px border-radius, 15px medium text. Hover state changes background to `--accent`. Includes an arrow `→` that translates 3px right on hover.

**Secondary CTA (`.cta-secondary`)**: text link, 15px medium `--ink`, no background, transparent bottom border that becomes `--ink` on hover.

### Hero variants

The site uses two hero variants. Both share the same eyebrow, h1 italic accent treatment, `.cta-row`, and locked CTA components. They differ in column structure and headline scale.

**Two-column hero (`.hero-grid`)** — used on the homepage. Asymmetric grid `1.65fr / 1fr` with 80px gap and `align-items: start`. Right column contains the trust anchor (credential block with vertical left border in `--border-warm`). H1 at 64px desktop, 38px mobile. Used when the page needs hero-level credentialing because the buyer is arriving cold and needs immediate proof that George is real.

**Single-column hero (`.hero-inner`)** — used on the Services page and the Projects page. Single column with `max-width: 820px`, no trust anchor, no second grid column. H1 at 60px desktop (deliberately one step down from the homepage's 64px to signal "sub-page, not the brand-defining first impression"), 38px mobile. Subhead `.hero-sub` at `max-width: 640px`. Used when the page proof lives in the body (Services page service blocks, Projects page case studies) and the hero only needs to set expectation without re-establishing credentials.

**Decision principle:** use `.hero-grid` with the trust anchor when the page needs hero-level credentialing (homepage). Use `.hero-inner` when the page proof lives in the body and the hero only needs to set expectation (Services, Projects, likely About and Contact too unless the About page chooses to put the personal credential block in the hero).

**Mobile collapse:** both variants collapse to the same 38px h1 on mobile at the 880px breakpoint. The `.hero-grid` two-column layout collapses to single-column with the trust anchor moving below the main content; the `.hero-inner` single-column layout simply adjusts its padding scale.

**Naming note:** the canonical class name for the single-column variant is `.hero-inner`, not `.hero-single`. The Services page locked this name first. Any future page that introduces a single-column hero must use `.hero-inner` to keep the React component library single-source.

### Flow strip

```css
.flow-strip {
  background: var(--bg-cta);
  border-top: 1px solid var(--border-cool);
  border-bottom: 1px solid var(--border-cool);
  padding: 24px 0;
}
```

Single horizontal row: "How I work" label in `--ink-cool-label` 14px 600, followed by five steps separated by `→` arrows. Steps in `--ink` 15px medium, arrows in `--ink-3` 14px. Wraps on mobile.

### Section heading pattern

Every major content section uses the same opening structure:

```html
<div class="section-heading-wrap">
  <p class="section-eyebrow">Eyebrow text</p>
  <h2 class="section-title">Section title.</h2>
  <p class="section-intro">Intro sentence.</p>
</div>
```

The wrap has a `max-width: 720px` and `margin-bottom: 40px`. Eyebrow is 14px 600 in `--ink-label`. Title is 40px 500 in `--ink` with -0.02em letter-spacing. Intro is 18px 400 in `--ink-2`, max-width 620px.

### Who I work with cards

Three columns separated by vertical 1px borders in `--border`. No icons. No bordered card containers. Each card has:

- Title (h3) in 20px medium `--ink`
- One-sentence description in 16px `--ink-2`
- Three tag lines in 13px `--ink-2-soft`, displayed as a vertical stack with 6px gap

The third card uses `.exclude` modifier which sets the heading color to `--ink-label` (slightly muted) to signal it as the disqualifier card.

### Case study

Two-column grid (1fr / 1.15fr) with 72px gap. Left column contains the label, the project name as h2 (40px), a context line (14px medium), one or more prose paragraphs (18px), and a closing element. Right column contains the screenshot frame.

**Label slot is variable.** The label slot does honest framing work and is not fixed copy. Valid values include "Case study" (homepage TraviXO, Projects page TraviXO) and "Spec pitch" (Projects page Government Application Portal). The label is always 14px in `--ink-label` with `0.03em` letter-spacing and weight 600. The label tells the buyer what kind of work this is before they read the prose.

**Prose paragraph count is variable per use.** The homepage case study uses one paragraph (the section is constrained as a tight overview). Anchor case study instances on dedicated pages may use up to four paragraphs (TraviXO on the Projects page uses four because it is the page's primary proof surface). Supporting case study instances use two paragraphs (Government on the Projects page). When prose exceeds three paragraphs, see the alignment override below.

**Closing element is variable.** Two valid options:

1. **Single text link** (`.casestudy-link`): used when there is an honest place to send the buyer. TraviXO uses "See the system →" pointing to the live SaaS. Default for delivered work.
2. **Honest disclosure note** (`.casestudy-note`): a 13px line in `--ink-3` that replaces the link when there is nowhere honest to link to (spec pitches, in-progress work, internal tools, work where outcomes are still pending). The Government Application Portal uses this with text like "Spec pitch. Not a delivered engagement. Status updated when the buyer responds." Use this whenever a text link would force a fabricated destination.

**Alignment override for long-prose instances.** The default `.casestudy-grid` uses `align-items: center`. When `.casestudy-prose` exceeds three paragraphs, the screenshot frame on the right floats in the center of empty space adjacent to the longer text column, which reads as a layout bug. The fix: scope `align-items: start` to that specific instance via an ID or modifier class. The Projects page TraviXO instance uses `#travixo .casestudy-grid { align-items: start; }`. Apply this whenever a case study uses four or more prose paragraphs.

Right column contains the screenshot frame:

```css
.casestudy-visual {
  background: #FFFFFF;
  border: 1px solid var(--border-warm);
  border-radius: 10px;
  box-shadow: 0 20px 50px -24px rgba(20, 17, 13, 0.18),
              0 2px 6px -2px rgba(20, 17, 13, 0.06);
  overflow: hidden;
  aspect-ratio: 16 / 10;
}
```

**Strict screenshot rules:**
- No browser chrome
- No macOS traffic lights
- No address bar
- 16:10 aspect ratio
- White background container with `--border-warm` border
- Subtle two-layer shadow (long soft shadow + tight close shadow)
- 10px border radius

**What the case study section must NOT contain (homepage scope):**
- Tech stack badges
- "Visit live" buttons
- Metrics or numbers
- Testimonials or quotes
- **Homepage scope only:** the homepage case study slot holds exactly one project (TraviXO). Do not multiply the case study section on the homepage.

**Per-page reuse rule:** the `.casestudy` component is reusable. On any page other than the homepage, the component may appear multiple times within a single vertical flow when each instance documents a distinct project. The Projects page uses it twice: TraviXO as anchor proof and the Government Application Portal as a labelled spec pitch. Each instance is independent and uses its own honest framing in the label slot.

### Audit CTA

The page's primary visual break. Cool tint background, cool borders top and bottom. Two-column grid (1.35fr / 1fr) with 64px gap and `align-items: center`.

Left column: eyebrow ("Start with a systems audit"), H2 in `--accent` blue, two-paragraph body in `--ink-cool`.

Right column: filled button + small note below.

**Component variants by funnel stage** — the same `AuditCTA` React component renders with two different configurations depending on whether it appears on an entry page or on the audit page itself.

- **Entry-page configuration** (homepage, services, projects, project detail, about, contact, blog index, blog post pages): button label `See what the audit covers →` (EN) / `Découvrez l'audit →` (FR), href `/audit`, H2 `Nothing is built until we agree it's worth building.` The H2 is the only place on the page where 'we' is permitted; it reads as 'me and the client'. This is the philosophy signal.

- **Destination-page configuration** (audit page only, as the page's tail CTA): button label `Start the audit (€300)` (EN) / `Démarrez l'audit (300 €)` (FR, U+00A0 between `300` and `€`), href is the Stripe payment link, H2 shifts from philosophy to decision-clarity with locked direction `You are not buying a call. You are buying a decision.` (EN, FR parallel locked when audit page mockup is built). The component accepts an optional `headlineOverride` prop for this purpose.

### How I work service menu

Four columns. Each item has:
- Number label (01 through 04) in 13px medium `--ink-3`
- Title (h3) in 20px medium `--ink`
- One-sentence description in 15px `--ink-2`
- Top border in `--border-warm`, padding-top 24px

No icons. No bordered cards. No bullet lists. No prices. Background is `--bg-deep` (`#F2EEE6`) with `--border` top and bottom borders.

### Concept builds variant (`.concept-item`)

Variant of the four-column service menu introduced on the Projects page. Used when the four-column grid contains items that link out to live external artifacts (interactive demos, hosted prototypes, working concepts) rather than describing internal sequential services.

**Decision principle:** use `.service-item` (the locked variant from "How I work") when the four columns describe internal sequential services with no external destination. Use `.concept-item` when each column has a live thing to link to.

**Structural differences from `.service-item`:**

- `display: flex; flex-direction: column` so the link element can `margin-top: auto` and align across columns regardless of description length
- A `.concept-link` element below the description: 14px medium `--ink`, `border-bottom: 1px solid var(--border-warm)`, `padding-bottom: 3px`, hover transitions to `--accent` color and border. **Deliberately smaller than `.casestudy-link`** to signal subordinate hierarchy: a concept demo is supporting evidence, not anchor proof.

**Same as `.service-item`:**

- Number label (01 through 04) treatment, color, letter-spacing
- Title and description treatment
- Top border in `--border-warm`, padding-top 24px
- Sits inside a `--bg-deep` background section

**When NOT to use:** if the four items have no external destination, use `.service-item` instead. The presence of `.concept-link` is the only reason this variant exists. Do not introduce it for cosmetic reasons.

### Final CTA

Centered, single column, max-width 720px. H2 with one italicized word in `--accent`. Supporting paragraph below. Two action buttons centered in a row: primary CTA + secondary text link to the contact email. Closing note below in fine print.

### Service block (sequential service detail)

Introduced on the Services page. Used for displaying a sequential service in detail with metadata and prose. Two-column grid layout (1fr / 1.6fr) with 64px gap.

Left column (`.service-block-meta`) contains:
- A small numerical label (`.service-num`) in 13px medium `--ink-3` with 0.04em letter-spacing (matches the homepage "How I work" service item numbering)
- The service name as h3 (`.service-name`) in 32px medium `--ink` with -0.02em letter-spacing
- A metadata list (`.service-meta-list`) with a top border in `--border` and three rows: each row has a small uppercase label (`.service-meta-label`, 12px 600 in `--ink-label` with 0.04em letter-spacing and uppercase text-transform) above its value (`.service-meta-value`, 15px 500 in `--ink`). The `.muted` modifier on a value drops it to weight 400 while keeping `--ink` color, so the contrast hierarchy is carried by weight rather than color.

Right column (`.service-block-body`) contains 2-3 paragraphs of prose at 18px in `--ink-2`, with `<strong>` elements in `--ink` weight 500 for emphasis.

Each `.service-block` has a top border in `--border-warm` (the slightly stronger warm border, deliberately chosen for clearer block separation than the default `--border`). 48px top and bottom padding.

Service blocks should ONLY be used for sequential service displays where each block represents one step in a defined sequence. Do not use for non-sequential content.

### Post-delivery section (`.ongoing` pattern)

Introduced on the Services page for the Ongoing Support section. The pattern for any section that represents content structurally subordinate to a main content area but still important enough to deserve its own section.

Sits on `--bg-deep` background with top and bottom borders in `--border`. Two-column grid (1fr / 1.4fr) with 64px gap. Left column has a small eyebrow, the section title at 30px (smaller than primary section titles to signal subordinate status), and a context line in 14px medium `--ink-2`. Right column has prose body and any pricing or specifics.

The pricing display pattern uses a horizontal flex layout with a price element at 22px medium `--ink` next to a context note at 14px `--ink-2`, separated above by a thin border in `--border-warm` and 24px top margin.

This pattern is reusable on any page that needs to add a "by the way, also" section without giving it equal weight to the main content above.

### Inline question list (`.questions` pattern)

Introduced on the Services page for Common Questions. The pattern for any FAQ-style content list.

NOT an accordion. NOT a card grid. Each `.question-item` has 24px vertical padding and a top border in `--border`. The last item has a bottom border to close the list. Inside each item: an h3 question at 20px medium `--ink` (margin-bottom 12px) and a paragraph answer at 16px in `--ink-2` (max-width 720px).

The list itself sits in a `.questions-list` container with a max-width of 820px so that long answer paragraphs do not exceed comfortable reading width.

Use this pattern instead of accordions for any FAQ on the site. Accordions hide content and add interaction cost; the inline list rewards scanning and lets buyers read the answers without clicking.

### Form components

Introduced on the Contact page (`deralis-contact-v1.html`). The pattern for any form on the site.

**Field wrapper (`.field`).** 24px bottom margin. Each field is one label plus one input or textarea, stacked vertically. No floating labels. No inline labels.

**Field label (`.field-label`).** 14px weight 600 in `--ink-label`, letter-spacing 0.01em (NOT the 0.03em uppercase eyebrow letter-spacing, because labels are mixed case to read as instructional rather than structural). 8px margin-bottom. Required fields carry a small `*` in `--accent` immediately after the label text. Optional fields carry ` (optional)` in `--ink-3` weight 400, 6px left margin.

**Text input default (`.field-input`).** Full-width, 14px 16px padding, 16px font-size, weight 400, color `--ink`, background `--bg` (the page surface, not white, because white inputs would introduce a fifth surface color). 1px border in `--border`, 8px border-radius (matches CTA button radius). `font-family: 'Inter'` set explicitly so user-agent serif fallbacks do not appear. Placeholder color `--ink-3`.

**Text input hover.** Border-color shifts to `--border-warm`. No background change.

**Text input focus.** Border-color shifts to `--accent`. No box-shadow halo. No glow ring. The accent border is the entire focus signal, deliberately quiet to match the calm hierarchy rule. `outline: none` is set because the border change replaces the default outline.

**Textarea (`.field-textarea`).** Same styling as text input. Min-height 160px. `resize: vertical` only. Inter font explicitly inherited (browsers default textareas to monospace otherwise).

**Submit button.** Uses `.cta-primary` with `width: 100%`, `justify-content: center`, and 18px 28px padding (slightly taller than the 17px 28px hero variant to balance the form column visually). The `<button>` element inherits the same class as the `<a>` link variant; both are styled identically.

**Form intro block (`.form-intro`).** Sits above the first field, 40px bottom margin. Two paragraphs at 18px in `--ink-2`, with the first paragraph weight 500 in `--ink` to match the subhead-stack first-sentence pattern. Mobile: 16px.

**Form container width.** Max-width 640px, centered inside `.wrap`. Narrower than the trust anchor (360px) but well below the wrap max (1240px). The 640px figure comes from the longest comfortable line-length for input text at 16px and the visual weight that makes the form read as the section's primary instrument rather than a side panel.

**Validation pattern (mockup).** Native HTML5 (`required`, `type="email"`, `minlength="20"` on the message). The Contact page mockup uses `novalidate` on the form so browser-default error styling does not appear before real error states are designed. Backend wiring is handled in the migration brief.

**Still requires decisions before production (v1.2).** Error state border color, error message position and styling, success state after submission, and spam protection treatment (honeypot vs captcha) are NOT decided. The mockup hides this with `novalidate`. No form ships to production until v1.2 fills these in.

### Footer

Four-column grid (1.4fr / 1fr / 1fr / 1.4fr) on `--bg-footer` background with `--border-warm` top border.

- Column 1: brand logo + tagline
- Column 2: Navigation links
- Column 3: Services links (must match the four service items in the "How I work" section: Systems Audit, Custom System, Extensions, Ongoing)
- Column 4: Contact details (email + location + bilingual note)

Below the four-column grid: a horizontal divider in `--border-warm`, then a row with copyright on the left and legal links on the right.

**Footer Services column must always match the "How I work" section.** If one changes, the other must change. They are the same canonical service list shown in two places.

Mobile collapses to a 2-column layout, with brand and contact spanning the full width.

---

## Editorial rules

These rules apply to all copy on every page, not just the homepage.

### Voice

- First-person "I" everywhere except the audit CTA H2 exception noted above.
- Practitioner talking to peers, not marketer pushing CTAs.
- Honest broker framing. Direct but not aggressive.
- No "we", "our", "us" elsewhere.
- French equivalent: default to "je". "Nous" is permitted only for the "vous et moi" sense in the audit CTA H2 exception, and rare structural-clarity cases. Generic "nous" register is forbidden.
- If a line feels written rather than spoken, rewrite it. Applies to both languages. Anything that reads explanatory, marketing, or generic gets cut or restructured.

### Banned vocabulary

- Em-dashes (use commas, periods, or restructure the sentence)
- "leverage" (as a verb)
- "seamlessly"
- "robust"
- "cutting-edge"
- "delve"
- "streamlined"
- "unlock" (in the metaphorical sense)
- "empower"
- "harness"
- "foster"
- "navigate" (as a verb meaning "deal with")
- "journey" (as a metaphor for process)
- "solutions" (use "system" or name the actual thing)
- "transform" (overused; use "change", "rebuild", or specific verbs)

### Honest framing requirements

- TraviXO has zero paying clients. All copy must remain consistent with this fact until real results exist.
- The Government Application Portal is a spec pitch, not a delivered engagement. It must always be flagged as "(spec)" or "Spec pitch" when mentioned.
- George's Loxam role was Helpdesk Technician (18 months), not an operations role. Copy can reference "eighteen months inside the equipment rental industry at Loxam" but not "led operations at Loxam" or similar.
- Ariane Systems is a hospitality check-in software company, not aerospace, and not in equipment rental. It does not appear on the homepage. It can appear on the About page with correct context.
- No fabricated testimonials.
- No fabricated metrics ("X% improvement", "Y hours saved", "Z clients served").
- No implied statistical authority ("in 9 out of 10 cases I see", "the average ops manager").

### Forbidden patterns

- Browser-chrome screenshots with macOS traffic lights (developer-tool genre marker, anti-brand)
- Tech stack badges on case study pages (anti-brand for European B2B services register)
- Multiple CTAs competing in the same section (one primary, optionally one secondary text link)
- "Free consultation" framing (the audit is a paid €300 entry point, never free)
- "Get a quote" framing (the audit is the entry point, not a quote request)
- **Public booking surfaces of any kind.** No public Calendly link, no public Cal.com link, no public SavvyCal link, no "schedule a call" button on any page, no embedded scheduling widget, no calendar picker visible to non-paying buyers. The audit-first model requires that the only path to a call with the operator is through paid audit purchase. A public booking surface defeats the model by creating a free-call back door. The post-payment scheduling tool (whichever the operator picks: Calendly, Cal.com, SavvyCal, or other) is a PRIVATE link delivered only in the post-payment confirmation email after Stripe checkout completes. It is never displayed on any public page, never linked from any other component, never referenced in nav or footer. The contact form is the only non-payment channel, and it is for written messages only — the operator replies via email, never via call. If a buyer wants a call, the path is the audit. No exceptions.

---

## French language conventions

These rules apply to every French string on the site, including new translations, existing `fr.json` content, and any future page added to the bilingual scope. They are non-negotiable for visual and editorial consistency.

### CTA verb form

The audit CTA wording is funnel-stage-dependent. There are TWO canonical strings, not one. Same component, different label and href depending on funnel stage.

**Stage 1: Entry-page CTA** — used on every page that is NOT the audit page itself, including the site nav on those pages. Job: move the buyer from discovery to understanding by sending them to the audit page. Does NOT include the price.
- English: `See what the audit covers →`
- French: `Découvrez l'audit →`
- Both imperative form, both include trailing arrow `→` as part of the canonical string (Unicode character, not an icon).
- Href: `/audit` (locale-prefixed).

**Stage 2: Destination-page CTA** — used ONLY on the audit page itself: hero CTA, page's tail audit CTA section, and the site nav override on the audit route. Job: convert from understanding to commitment. Includes the price because the price is load-bearing context at the commitment moment.
- English: `Start the audit (€300)`
- French: `Démarrez l'audit (300 €)` with U+00A0 between `300` and `€`
- Both imperative, both include price in parentheses, NEITHER includes a trailing arrow (this is the final action, not a navigation pointer).
- Href: the Stripe payment link URL (placeholder until Phase 8 prerequisites met).

**Reasoning:** A button that doesn't change between funnel stages signals to the buyer that nothing changed about their relationship to the offer. Two CTAs with identical labels imply two pages at the same funnel stage. The two-stage split makes the wording match the funnel reality.

**Nav override on audit route:** the nav's audit CTA on `/audit` switches to the destination-page configuration via `usePathname()` from `next-intl/navigation`. Without this, the nav button creates a dead interaction (points to the page the buyer is already on).

### Separators in metadata lines

- Use middot (`·`) with a regular space on each side, not commas, for inline metadata sequences.
- Applies to: case study context lines (`SaaS B2B · Location de matériel · Conformité VGP`), eyebrow tags with multiple segments, footer location lines, service investment rows where multiple facts are joined.
- Reason: middots match the editorial register, separate cleanly without implying enumeration, and are already established in the English files.

### Typography (mandatory)

- Non-breaking space (U+00A0) before `?`, `!`, `:`, `;`, and `»`.
- Non-breaking space (U+00A0) after `«`.
- French guillemets `« »` for quoted phrases. Never straight `'` or `"` for quotation. Apostrophes (`l'audit`, `n'est`, `aujourd'hui`) stay as straight `'` and are never confused with quotation marks.
- The U+00A0 character must be the actual Unicode codepoint, not the HTML entity `&nbsp;`. The entity is correct in static HTML files; the codepoint is correct in `fr.json` and any string consumed by next-intl as plain text.
- When porting strings from HTML files into `fr.json`, swap `&nbsp;` for the U+00A0 character.
- Add `fr.json` to the Prettier ignore list. Some Prettier configurations strip U+00A0 as stray whitespace.
- A typography fixer script lives in the project root. Run it on `fr.json` after every translation session. It is idempotent.

### Number and currency format

- Currency symbol after the number with non-breaking space (U+00A0): `300 €`, not `€300`. The space between the digit and the symbol must be U+00A0, not a regular space.
- Spelled-out form (`300 euros`) is permitted but the symbol form is preferred for consistency with the English `€300` pattern.
- Do not mix forms within the same page.

### Editorial register for French

- Formal "vous" everywhere. The site is B2B services. "Tu" is forbidden regardless of context.
- The "if it feels written, rewrite" rule applies with extra force in French. French copy is more prone to brochure register than English. Watch for: stacked abstract nouns, "qui... qui... qui" rhythms, "la connaissance métier qui a donné naissance à..." formulations, and any sentence that could appear unchanged in a Big Four consultancy white paper.

### Translation sourcing protocol

- `fr.json` is the source of truth for all existing French copy.
- New strings get translated once, added to `fr.json`, then referenced from the HTML or component.
- Never re-translate a string that already has a French version in `fr.json`. If the existing wording does not fit the new context, flag it for review and let the operator decide. Do not silently rewrite.
- The English version of any page must be locked before its French translation begins. Translating against an unlocked English version creates drift and wasted work.

---

## Motion and animation

The motion policy for the entire site is locked. Future additions or changes to motion require updating this section first, not adding motion ad hoc per page.

### Allowed motion (the entire allowed set)

**1. Hover transitions on interactive elements.** All hover transitions are CSS-only via the `transition` property. No JavaScript. Specifically:

- Primary CTA: `background` from `--ink` to `--accent`, `0.18s` ease
- Primary CTA arrow: `transform: translateX(3px)` on hover, `0.18s` ease
- Secondary CTA: `border-bottom-color` from transparent to `--ink`, `0.15s` ease
- Nav links: `color` from `--ink-2` to `--ink`, `0.15s` ease
- Footer links: `color` from `--ink` to `--accent`, `0.15s` ease
- Case study link: `color` and `border-color` to `--accent`, `0.15s` ease
- Concept link (projects page): same as case study link, smaller scale
- Nav primary CTA outlined button: `background` and `color` swap on hover, `0.15s` ease

**2. Optional page-load fade-in.** A single light fade-in on page load is allowed. Constraints:

- Duration: 150 to 200 milliseconds
- No delay chains, no stagger, no per-element timing
- The entire page fades in as one element from `opacity: 0` to `opacity: 1`
- No transform, no slide-up, no movement of any kind, only opacity
- Implemented via CSS only (no JavaScript animation library)
- Wrapped in `@media (prefers-reduced-motion: reduce)` to disable for users with motion sensitivity preferences
- This is optional. A site with no fade-in is also correct. Do not add it unless it serves the page.

### Forbidden motion (no exceptions)

- Scroll-triggered reveal animations (no fade-up-on-scroll, no slide-in-on-scroll)
- Page transition animations (no fade between pages, no slide between pages)
- Stagger animations on lists or grids (no item-by-item delay chains)
- Parallax effects of any kind
- Scroll-driven sticky elements that animate as they stick
- Hover animations involving scale, rotation, or any transform other than the locked `translateX(3px)` arrow shift
- JavaScript animation libraries (Framer Motion, GSAP, AOS, lottie-react, anime.js, etc.) — none of these are needed and adding any of them is a violation of the spec
- Loading spinners or skeleton screens with motion (static skeleton placeholders are acceptable, motion-based loaders are not)
- Cursor-following effects, magnetic buttons, hover trails, particle effects, gradient animations, or any other "modern startup landing page" motion patterns

### Reasoning for the policy

The Deralis Digital positioning is calm, deliberate, European B2B services register. Scroll-triggered motion is a hype signal that conflicts with that positioning. The reference sites in this register (French B2B services practices, legal practices, accounting firms) almost universally use static layouts with hover-only motion. The lack of motion is itself a positioning statement: it says "this practitioner cares about the substance of the work, not about animating the marketing." Adding scroll-driven motion would visually align Deralis Digital with the Webflow template aesthetic that the spec's foundational principles explicitly distance from.

Performance is the secondary reason. The current site's LCP is 4.8s on mobile, target is under 2.5s. Static pages with CSS-only hover transitions have zero motion-related performance cost. Adding any JavaScript animation library is added bundle weight that works against the LCP target.

Accessibility is the third reason. Static designs have zero motion-related accessibility cost. Any added motion would need `prefers-reduced-motion` handling, which adds engineering complexity and creates a path for accessibility regressions.

**If a future page or feature appears to need motion that isn't on the allowed list, the correct response is to redesign the page or feature to not need it, not to add the motion. The static system is the system.**

---

## Known bugs and gotchas

### Email obfuscation bug (CRITICAL)

The file creation pipeline used during this session automatically rewrites any literal `@` character in email addresses with Cloudflare's `__cf_email__` obfuscation pattern. This affected every file from v8 through v15 silently and was only caught at v16.

**Symptom:** Emails render as `[email protected]` in the browser instead of `contact@deralis.digital`.

**Root cause:** Cloudflare email obfuscation script rewrites any text matching the email pattern in HTML.

**Fix used in v16:**

```html
<a href="mailto:contact&#64;deralis.digital">contact&#64;deralis.digital</a>
```

The `&#64;` HTML entity for `@` bypasses the obfuscator because the source no longer contains a literal `@` character. Browsers render the entity as `@` correctly.

**For the Next.js codebase migration:** Either use the same `&#64;` pattern in JSX, OR construct the email at runtime with JavaScript string concatenation, OR disable Cloudflare email obfuscation in the dashboard for the production domain. The Cloudflare account currently has Bot Fight Mode and AI Crawl Control enabled, so email obfuscation is likely active by default.

### Hero top spacing

Hero top padding is 32px on desktop. This is deliberately aggressive. Anything below ~24px will start to feel clipped against the nav border on shorter viewport heights. Do not reduce further without re-verifying on small laptop screens.

### Cool tint surfaces

Two surfaces use the cool tint `--bg-cta`: the flow strip (top of page) and the audit CTA (middle of page). These visually rhyme and bookend the warm content. Adding a third cool tint surface anywhere on the page will break this rhythm. Do not introduce a third one without revisiting the visual structure as a whole.

---

## Transferable to other pages without modification

Everything in this document applies to every other page on the site as-is. The following list is explicit so that future readers do not assume otherwise:

- All color tokens
- Full typography scale and font loading
- Spacing tier discipline (60-68px section padding desktop, 24-32px internal, mobile scaled proportionally)
- The `.wrap` container (1240px max-width, 48px / 24px gutters)
- The 880px mobile breakpoint
- The site nav component (use it as-is on every page, with the current page's nav link in active state)
- The site footer component (use it as-is on every page, with the Services column matching the canonical service list)
- The section heading pattern (eyebrow + title + intro)
- Primary CTA (`.cta-primary`) and secondary text-link CTA (`.cta-secondary`) components
- The label system (`--ink-label` and `--ink-cool-label`, 14-16px, weight 600)
- Hover transitions on buttons and links
- The italicized `<em>` accent treatment for headlines (one word per headline maximum, in `--accent` blue)
- The case study screenshot frame treatment (soft frame, no chrome, no traffic lights, 16:10, white background, `--border-warm` border, 10px border radius, two-layer shadow). This frame is reusable for any product visualization on any page, not just the homepage case study.
- The trust anchor pattern (right-column credential block with vertical left border in `--border-warm`). Reusable on the About page or any page that needs a credential sidebar.
- The three-column-with-vertical-dividers card pattern from "Who I work with". Reusable for any 3-column comparative content on any page.
- The audit CTA component. Reusable as-is on any page that needs to drop the audit conversion moment (Services page, Projects page, etc.).
- The flow strip component. Reusable for any horizontal process band on any page.
- All editorial rules and banned vocabulary
- The honest framing requirements
- The forbidden patterns
- The `&#64;` HTML entity pattern for any email address anywhere on the site

When building a new page, start by importing this entire list. The components are the LEGO bricks. The page is what you build with them.

---

## Still requires page-level decisions

The following are NOT in v1 of this spec and need explicit decisions before any new page is built. Each item below represents a real gap that will cause inconsistency if filled in by improvisation rather than by a deliberate decision documented here.

### Page funnel structures

The homepage funnel is locked. Every other page needs its own funnel decision:

- **Services page funnel.** Likely: full service detail → comparison or sequence → audit CTA. Not yet decided.
- **Projects page funnel (LOCKED, projects-v1).** Hero single-column without trust anchor → TraviXO case study as full anchor proof → Audit CTA (mid-funnel placement) → Government Application Portal as labelled spec pitch (case study component variant) → Concept builds strip (4-column grid on `--bg-deep`) → Final CTA → Footer. Logic: anchor proof first, conversion ask in the middle, supporting proof and capability demonstration after the conversion ask, soft restatement at the end. The mid-funnel audit CTA placement is a deliberate departure from a tail-only conversion pattern: by the time a buyer reaches it on the Projects page they have seen the strongest live proof and are at peak intent.
- **About page funnel.** Likely: who I am → background and history → how I work → contact CTA. Not yet decided. This is the page where the Ariane Systems context can live with correct framing.
- **Blog index funnel.** Likely: list of posts → category filter → newsletter or audit CTA. Not yet decided.
- **Contact page funnel.** Likely: short context → form → alternative contact methods. Requires form components (see below) before it can be built.

Each page needs its funnel written down before layout work begins.

### Form components

Ratified into the Component specifications section above as of v1.1 (Contact page build, `deralis-contact-v1.html`). Default state, hover, focus, label pattern, textarea, submit button, intro block, container width, and HTML5 validation pattern are all locked.

Still requires decisions before any form ships to production (v1.2):

- Error state border color and error message position
- Success state after submission (inline confirmation, redirect to a thank-you state, or replace-form-with-message)
- Submission failure state (network error, server error)
- Spam protection treatment (honeypot recommended over captcha for current volume, but not yet decided)

### Blog post body styling

v16 has no long-form prose. A blog article needs treatments for:

- Article hero (title, eyebrow, publish date, reading time)
- Body h2, h3, h4 (size, weight, color, margin top/bottom)
- Body paragraphs and line length
- Inline links inside body copy (color, underline behavior)
- Blockquotes
- Inline code (font, background, padding)
- Code blocks (font, background, syntax highlighting approach)
- Ordered and unordered lists
- Images with captions
- Pull quotes or callout boxes
- Footnotes if used
- Author bio or signature at the end
- Related posts strip

None of these have a treatment in v16.

### Project detail template

The case study block on the homepage is a single tight card. A full project detail page needs:

- Project hero (project name, category, date, role)
- Long-form narrative section
- Multiple screenshots in sequence (using the soft-frame treatment from v16)
- Optional architecture diagrams
- "What I built" breakdown
- Technologies used (note: this contradicts the homepage rule of "no tech stack badges on case study"; the rule may relax on the dedicated detail page but needs an explicit decision)
- Links section (live site, repo if public)
- Related projects strip

### Loading, error, empty states

When a page is loading, when an error occurs, when a list (e.g. projects, blog posts) is empty, what does it look like? Not yet decided.

### Dark mode

Genuinely not in v16. The decision is not "how should dark mode look" but "should dark mode exist at all on a warm-cream-palette services site." Make the existence decision before designing the appearance.

### Internationalization beyond French

The site is bilingual French and English. Both languages share the design system. French language conventions are locked in the dedicated section above and apply to every French string without exception. Other languages are not in scope. If a future expansion requires Spanish, German, or another language, the type scale should be re-verified for diacritic and word-length compatibility, and the typography conventions section will need a parallel ruleset for that language.

### Print stylesheet

Not specified. Likely low priority but worth a decision before someone needs to print a Services page or a project case study.

---

## Versioning

This is v1.5 of the design specification, derived from `deralis-homepage-v16.html` locked on April 8, 2026, with French language conventions ratified on April 9, 2026.

Future changes to the design system should update this document and increment the version. Any change that breaks one of the foundational principles requires re-deriving the principles, not just patching the spec.

The reference HTML file (`deralis-homepage-v16.html`) is the visual source of truth. If this document and the file disagree, the file wins, and this document should be updated to match. For French-specific conventions, `fr.json` is the source of truth for existing content; this document is the source of truth for the rules that govern it.

### Changelog

- **v1.5** (April 9, 2026) — Funnel architecture lock: added "no public booking surfaces" rule to forbidden patterns. Contact form is the only non-payment channel and is written-message-only. Post-payment scheduling tool (any operator-chosen tool) is private and only appears in the post-payment confirmation email.
- **v1.4** (April 9, 2026) — Two-stage CTA architecture: entry-page vs destination-page CTAs, nav route-aware override, audit page H2 override.
- **v1.3** (April 9, 2026) — Motion policy merged, hero variants locked, case study variants locked, concept-item variant introduced, Projects page funnel locked.
- **v1.2** (April 9, 2026) — French language conventions section added: Cartographiez imperative locked, middot separators locked, U+00A0 typography rules locked, "nous" exception scope clarified, "if it feels written, rewrite" rule extended to both languages, translation sourcing protocol documented.
- **v1.1** (April 8, 2026) — Form components ratified from Contact page build.
- **v1.0** (April 8, 2026) — Initial spec derived from `deralis-homepage-v16.html`.
