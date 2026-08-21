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

const calculatorLinkStyle: CSSProperties = {
  display: "inline-block",
  marginTop: 28,
  fontSize: 15,
  fontWeight: 500,
  color: "var(--text-primary)",
  textDecoration: "none",
  borderBottom: "1px solid var(--border-strong)",
  paddingBottom: 3,
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

      {/* Bridges the vocabulary: this section names coordination, the calculator
          names friction. The link states the relationship rather than leaving a
          reader to cross the gap unaided. */}
      <Link href="/frictions-operationnelles" style={calculatorLinkStyle}>
        {t("calculatorLink")}
      </Link>
    </DsCard>
  );
}
