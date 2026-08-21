import { useTranslations } from "next-intl";
import DsCard from "@/components/shared/DsCard";
import { Link } from "@/i18n/navigation";
import PullQuote from "@/components/shared/PullQuote";
import type { CSSProperties } from "react";

const eyebrowStyle: CSSProperties = {
  fontSize: "var(--fs-eyebrow)",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--text-muted)",
  fontWeight: 600,
  transition: "color 450ms ease",
};

const introStyle: CSSProperties = {
  fontSize: 19,
  lineHeight: 1.55,
  color: "var(--text-secondary)",
  maxWidth: "60ch",
  marginBottom: 14,
  transition: "color 450ms ease",
};

// Deliberately tighter than WhoSection: this section sits directly above it, and
// two full-weight card grids in a row read as a second homepage inside the homepage.
const costCardStyle: CSSProperties = {
  background: "var(--card-paper)",
  border: "1px solid var(--border-soft)",
  borderLeft: "3px solid var(--accent)",
  borderRadius: "var(--radius-internal)",
  padding: "26px 24px",
  transition: "background-color 450ms ease, color 450ms ease, border-color 450ms ease",
};

const costCardH3Style: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: 19,
  fontWeight: 500,
  lineHeight: 1.25,
  marginBottom: 12,
  letterSpacing: "-0.01em",
  color: "var(--text-primary)",
};

const costCardPStyle: CSSProperties = {
  fontSize: "var(--fs-body-sm)",
  lineHeight: 1.6,
  color: "var(--text-secondary)",
  margin: 0,
};

/* The audit finding this answers: every euro figure on the site was a price I
   charge, so a reader had no denominator to weigh 1 280 € against. This puts one
   number in front of him before he clicks anything. Inputs are shown so the
   arithmetic is checkable, and it is labelled a hypothesis because it is one. */
const workedStyle: CSSProperties = {
  marginTop: 30,
  paddingLeft: 18,
  borderLeft: "2px solid var(--accent)",
};

const workedLabelStyle: CSSProperties = {
  fontSize: "var(--fs-eyebrow)",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontWeight: 600,
  color: "var(--text-muted)",
  marginBottom: 10,
  transition: "color 450ms ease",
};

const workedInputsStyle: CSSProperties = {
  fontFamily: "var(--font-ibm-plex-mono), ui-monospace, monospace",
  fontSize: 13,
  lineHeight: 1.6,
  color: "var(--text-secondary)",
  marginBottom: 8,
  transition: "color 450ms ease",
};

const workedOutputStyle: CSSProperties = {
  fontSize: 16,
  lineHeight: 1.55,
  color: "var(--text-primary)",
  fontWeight: 500,
  margin: 0,
  transition: "color 450ms ease",
};

/* Reads as an offer rather than a footnote: the whole panel is the click target,
   it leads with the cost of trying (free, two minutes), and it carries a real
   button. Outlined rather than filled so it stays subordinate to the diagnostic
   CTA further down the page. */
const ctaPanelStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 28,
  marginTop: 34,
  padding: "26px 30px",
  background: "var(--canvas)",
  border: "1px solid var(--accent)",
  borderRadius: "var(--radius-internal)",
  textDecoration: "none",
  color: "inherit",
  transition: "background-color 200ms ease, transform 150ms ease",
};

const ctaEyebrowStyle: CSSProperties = {
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontWeight: 600,
  color: "var(--accent)",
  marginBottom: 8,
};

const ctaTitleStyle: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: 19,
  fontWeight: 500,
  lineHeight: 1.25,
  letterSpacing: "-0.01em",
  color: "var(--text-primary)",
  maxWidth: "34ch",
};

const ctaButtonStyle: CSSProperties = {
  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  padding: "15px 26px",
  background: "var(--text-primary)",
  color: "var(--canvas)",
  fontSize: 12,
  fontWeight: 500,
  borderRadius: "var(--radius-button)",
  whiteSpace: "nowrap",
};

const CARDS = ["card1", "card2", "card3"] as const;

export default function CostSection() {
  const t = useTranslations("home.page.cost");

  return (
    <DsCard>
      <p style={eyebrowStyle}>{t("eyebrow")}</p>
      <p style={introStyle}>{t("intro1")}</p>
      <p style={introStyle}>{t("intro2")}</p>

      <PullQuote html={t.raw("pullquote")} />

      <div className="grid-3col">
        {CARDS.map((c) => (
          <div key={c} style={costCardStyle}>
            <h3 style={costCardH3Style}>{t(`${c}.title`)}</h3>
            <p style={costCardPStyle}>{t(`${c}.description`)}</p>
          </div>
        ))}
      </div>

      <div style={workedStyle} className="cost-worked">
        <p style={workedLabelStyle}>{t("worked.label")}</p>
        <p style={workedInputsStyle}>{t("worked.inputs")}</p>
        <p style={workedOutputStyle}>{t("worked.output")}</p>
      </div>

      {/* Bridges the vocabulary: this section names coordination, the calculator
          names friction. The panel states the relationship rather than leaving a
          reader to cross the gap unaided. */}
      <Link
        href="/frictions-operationnelles"
        style={ctaPanelStyle}
        className="cost-cta-panel"
      >
        <span>
          <span style={ctaEyebrowStyle} className="cost-cta-eyebrow">
            {t("calculatorCta.eyebrow")}
          </span>
          <span style={ctaTitleStyle} className="cost-cta-title">
            {t("calculatorCta.title")}
          </span>
        </span>
        <span style={ctaButtonStyle}>{t("calculatorCta.button")}</span>
      </Link>
    </DsCard>
  );
}
