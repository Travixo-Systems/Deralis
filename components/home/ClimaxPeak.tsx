import { useTranslations } from "next-intl";
import { DsCardPeak } from "@/components/shared/DsCard";
import RichText from "@/components/shared/RichText";
import { Link } from "@/i18n/navigation";
import type { CSSProperties } from "react";

// Grid layout via CSS class .grid-climax (responsive handled in globals.css)

const peakEyebrowStyle: CSSProperties = {
  fontSize: "var(--fs-eyebrow)",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--text-on-peak-dim)",
  marginBottom: 22,
  fontWeight: 600,
};

const h2Style: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: "clamp(38px, 4.6vw, 52px)",
  fontWeight: 500,
  lineHeight: 1.04,
  letterSpacing: "-0.02em",
  color: "var(--text-on-peak)",
  marginBottom: 28,
};

const bodyStyle: CSSProperties = {
  fontSize: "var(--fs-body)",
  lineHeight: 1.6,
  color: "var(--text-on-peak-muted)",
  marginBottom: 14,
  maxWidth: "42ch",
};

const ctaPeakStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 12,
  padding: "18px 32px",
  background: "var(--text-on-peak)",
  color: "var(--card-peak)",
  fontSize: 14,
  fontWeight: 600,
  border: "none",
  borderRadius: "var(--radius-button)",
  cursor: "pointer",
  fontFamily: "inherit",
  marginTop: 32,
  textDecoration: "none",
  transition: "background-color 450ms ease, color 450ms ease, transform 150ms ease",
};

const peakMetaStyle: CSSProperties = {
  display: "block",
  marginTop: 14,
  fontSize: 12,
  color: "var(--text-on-peak-dim)",
  fontStyle: "italic",
};

const factsStyle: CSSProperties = {
  background: "var(--peak-surface-elevated)",
  borderLeft: "3px solid var(--text-on-peak)",
  padding: 32,
  borderRadius: "var(--radius-button)",
  display: "flex",
  flexDirection: "column",
  gap: 18,
  transition: "background-color 450ms ease, border-color 450ms ease",
};

const factRowStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "110px 1fr",
  gap: 16,
  fontSize: 13,
  alignItems: "baseline",
};

const factLabelStyle: CSSProperties = {
  color: "var(--text-on-peak-dim)",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontWeight: 700,
};

const factValStyle: CSSProperties = {
  color: "var(--text-on-peak)",
  fontWeight: 500,
};

const FACT_KEYS = ["duree", "livrable", "prix", "garantie", "langue"] as const;

export default function ClimaxPeak() {
  const t = useTranslations("common.auditCta");

  return (
    <DsCardPeak>
      <div className="grid-climax">
        <div>
          <p style={peakEyebrowStyle}>{t("eyebrow")}</p>
          <h2 style={h2Style}>
            <RichText html={t.raw("headline")} />
          </h2>
          <p style={bodyStyle}>{t("body1")}</p>
          <p style={bodyStyle}>{t("body2")}</p>
          <Link href="/audit" style={ctaPeakStyle}>
            {t("ctaLabel")}
          </Link>
          <span style={peakMetaStyle}>{t("ctaMeta")}</span>
        </div>
        <div style={factsStyle}>
          {FACT_KEYS.map((key) => (
            <div key={key} style={factRowStyle}>
              <span style={factLabelStyle}>{t(`facts.${key}.label`)}</span>
              <span style={factValStyle}>{t(`facts.${key}.value`)}</span>
            </div>
          ))}
        </div>
      </div>
    </DsCardPeak>
  );
}
