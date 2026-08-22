import { useTranslations } from "next-intl";
import DsCard from "@/components/shared/DsCard";
import type { CSSProperties } from "react";
import WordReveal from "@/components/shared/WordReveal";
import AutoDemo from "@/components/shared/AutoDemo";

const eyebrowStyle: CSSProperties = {
  fontSize: "var(--fs-eyebrow)",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--text-muted)",
  marginBottom: 24,
  fontWeight: 600,
  transition: "color 450ms ease",
};

const h2Style: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: "var(--fs-h2)",
  fontWeight: 500,
  lineHeight: 1.08,
  letterSpacing: "-0.02em",
  marginBottom: 22,
  maxWidth: "22ch",
};

const introStyle: CSSProperties = {
  fontSize: "var(--fs-intro)",
  lineHeight: 1.55,
  color: "var(--text-secondary)",
  marginBottom: 72,
  maxWidth: "58ch",
};

const flowProcessStyle: CSSProperties = {
  position: "relative",
  paddingTop: 8,
};

const flowLineStyle: CSSProperties = {
  position: "absolute",
  top: 16,
  // Centres of the outer columns in a 3 column grid, so the connector starts
  // and ends on the first and last dots rather than overshooting them.
  left: "16.667%",
  right: "16.667%",
  height: 1,
  background: "var(--border-strong)",
  zIndex: 1,
  transition: "background-color 450ms ease",
};

// Grid layout via CSS class .grid-flow (responsive handled in globals.css)

const flowStepStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0 18px",
  textAlign: "center",
};

const flowDotStyle: CSSProperties = {
  width: 17,
  height: 17,
  borderRadius: "50%",
  position: "relative",
  zIndex: 3,
};

const flowNumStyle: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: 38,
  fontWeight: 500,
  color: "var(--accent)",
  marginTop: 22,
  lineHeight: 1,
  transition: "color 450ms ease",
};

const flowTitleStyle: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: 21,
  fontWeight: 500,
  color: "var(--text-primary)",
  marginTop: 14,
  letterSpacing: "-0.01em",
};

const flowDescStyle: CSSProperties = {
  fontSize: 13,
  lineHeight: 1.55,
  color: "var(--text-secondary)",
  marginTop: 10,
  maxWidth: "24ch",
};

// Three mandatory phases. Suivi is optional post-deployment support and is
// rendered below, deliberately un-numbered, so the sequence stays honest:
// an engagement can end at Extensions and most will.
const optionalStyle: CSSProperties = {
  marginTop: 56,
  paddingTop: 26,
  borderTop: "1px solid var(--border-soft)",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "baseline",
  gap: "6px 14px",
};

const optionalLabelStyle: CSSProperties = {
  fontSize: "var(--fs-eyebrow)",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontWeight: 600,
  color: "var(--text-muted)",
  transition: "color 450ms ease",
};

const optionalTitleStyle: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: 19,
  fontWeight: 500,
  color: "var(--text-primary)",
  letterSpacing: "-0.01em",
};

const optionalDescStyle: CSSProperties = {
  fontSize: 14,
  lineHeight: 1.55,
  color: "var(--text-secondary)",
  flexBasis: "100%",
  maxWidth: "52ch",
  margin: 0,
  transition: "color 450ms ease",
};

const ITEMS = ["1", "2", "3"] as const;

export default function HowIWork() {
  const t = useTranslations("home.page.howIWork");

  return (
    <DsCard>
      <p style={eyebrowStyle}>{t("eyebrow")}</p>
      <h2 style={h2Style} aria-label={t("title")}>
        <WordReveal>{t("title")}</WordReveal>
      </h2>
      <p style={introStyle}>{t("intro")}</p>

      <AutoDemo
        stepSelector=".flow-step"
        holdMs={950}
        gapMs={180}
        startDelayMs={450}
        style={flowProcessStyle}
      >
        <div style={flowLineStyle} className="flow-line-responsive flow-line">
          <span className="flow-line-fill" aria-hidden="true" />
        </div>
        <div className="grid-flow" data-cascade>
          {/* Nodes at the four arm ends of the cross. Only drawn below 960px,
              where the flow becomes a cross rather than a single row. */}
          <span className="flow-cross-node flow-cross-node-top" aria-hidden="true" />
          <span className="flow-cross-node flow-cross-node-bottom" aria-hidden="true" />
          <span className="flow-cross-node flow-cross-node-left" aria-hidden="true" />
          <span className="flow-cross-node flow-cross-node-right" aria-hidden="true" />
          {ITEMS.map((item) => (
            <div key={item} className="lift-step flow-step" style={flowStepStyle} tabIndex={0}>
              <div style={flowDotStyle} className="flow-dot-responsive flow-dot" />
              <div style={flowNumStyle}>{t(`items.${item}.num`)}</div>
              <div style={flowTitleStyle}>{t(`items.${item}.title`)}</div>
              <div style={flowDescStyle}>{t(`items.${item}.description`)}</div>
            </div>
          ))}
        </div>
      </AutoDemo>

      <div style={optionalStyle}>
        <span style={optionalLabelStyle}>{t("optional.label")}</span>
        <span style={optionalTitleStyle}>{t("optional.title")}</span>
        <p style={optionalDescStyle}>{t("optional.description")}</p>
      </div>
    </DsCard>
  );
}
