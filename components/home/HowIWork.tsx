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

/* Support sits below the three phases, separated by a rule and without a
   number. Numbering it made an optional purchase read as a fourth stage
   every engagement passes through. */
const supportBlockStyle: CSSProperties = {
  marginTop: 64,
  paddingTop: 32,
  borderTop: "1px solid var(--border-soft)",
  transition: "border-color 450ms ease",
};

const supportEyebrowStyle: CSSProperties = {
  fontSize: "var(--fs-eyebrow)",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--text-muted)",
  fontWeight: 600,
  marginBottom: 14,
  transition: "color 450ms ease",
};

const supportTitleStyle: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: 21,
  fontWeight: 500,
  color: "var(--text-primary)",
  letterSpacing: "-0.01em",
  marginBottom: 8,
};

const supportDescStyle: CSSProperties = {
  fontSize: 14,
  lineHeight: 1.6,
  color: "var(--text-secondary)",
  maxWidth: "52ch",
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

      <div style={supportBlockStyle}>
        <p style={supportEyebrowStyle}>{t("support.eyebrow")}</p>
        <p style={supportTitleStyle}>{t("support.title")}</p>
        <p style={supportDescStyle}>{t("support.description")}</p>
      </div>
    </DsCard>
  );
}
