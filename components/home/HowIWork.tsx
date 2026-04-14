import { useTranslations } from "next-intl";
import DsCard from "@/components/shared/DsCard";
import type { CSSProperties } from "react";

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
  left: "12.5%",
  right: "12.5%",
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
  background: "var(--card-main)",
  border: "2px solid var(--accent)",
  position: "relative",
  zIndex: 3,
  transition: "background-color 450ms ease, border-color 450ms ease",
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

const ITEMS = ["1", "2", "3", "4"] as const;

export default function HowIWork() {
  const t = useTranslations("home.page.howIWork");

  return (
    <DsCard>
      <p style={eyebrowStyle}>{t("eyebrow")}</p>
      <h2 style={h2Style}>{t("title")}</h2>
      <p style={introStyle}>{t("intro")}</p>

      <div style={flowProcessStyle}>
        <div style={flowLineStyle} className="flow-line-responsive" />
        <div className="grid-flow">
          {ITEMS.map((item) => (
            <div key={item} style={flowStepStyle}>
              <div style={flowDotStyle} className="flow-dot-responsive" />
              <div style={flowNumStyle}>{t(`items.${item}.num`)}</div>
              <div style={flowTitleStyle}>{t(`items.${item}.title`)}</div>
              <div style={flowDescStyle}>{t(`items.${item}.description`)}</div>
            </div>
          ))}
        </div>
      </div>
    </DsCard>
  );
}
