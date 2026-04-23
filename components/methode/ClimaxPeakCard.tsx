import { useTranslations } from "next-intl";
import { DsCardPeak } from "@/components/shared/DsCard";
import RichText from "@/components/shared/RichText";
import { Link } from "@/i18n/navigation";
import type { CSSProperties } from "react";

// Reuses common.auditCta keys (home.climax.* equivalent per the spec)
export default function ClimaxPeakCard() {
  const t = useTranslations("common.auditCta");
  const FACT_KEYS = ["duree", "livrable", "prix", "garantie", "langue"] as const;

  return (
    <DsCardPeak>
      <div className="grid-climax">
        <div>
          <p style={peakEyebrow}>{t("eyebrow")}</p>
          <h2 style={h2}><RichText html={t.raw("headline")} /></h2>
          <p style={body}>{t("body1")}</p>
          <p style={body}>{t("body2")}</p>
          <Link href="/audit" style={ctaPeak}>{t("ctaLabel")}</Link>
          <span style={meta}>{t("ctaMeta")}</span>
        </div>

        {/* Facts panel */}
        <div style={factsPanel}>
          {FACT_KEYS.map((key) => (
            <div key={key} style={factRow}>
              <span style={factLabel}>{t(`facts.${key}.label`)}</span>
              <span style={factVal}>{t(`facts.${key}.value`)}</span>
            </div>
          ))}
        </div>
      </div>
    </DsCardPeak>
  );
}

const peakEyebrow: CSSProperties = {
  fontSize: "var(--fs-eyebrow)", textTransform: "uppercase", letterSpacing: "0.14em",
  color: "var(--text-on-peak-dim)", marginBottom: 22, fontWeight: 600,
};
const h2: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "clamp(38px, 4.6vw, 52px)",
  fontWeight: 500, lineHeight: 1.04, letterSpacing: "-0.02em",
  color: "var(--text-on-peak)", marginBottom: 28,
};
const body: CSSProperties = {
  fontSize: 16, lineHeight: 1.6, color: "var(--text-on-peak-muted)",
  marginBottom: 14, maxWidth: "42ch",
};
const ctaPeak: CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 12, padding: "18px 32px",
  background: "var(--text-on-peak)", color: "var(--card-peak)", fontSize: 14, fontWeight: 600,
  borderRadius: "var(--radius-button)", textDecoration: "none", marginTop: 18,
};
const meta: CSSProperties = {
  display: "block", marginTop: 14, fontSize: 12, color: "var(--text-on-peak-dim)", fontStyle: "italic",
};
const factsPanel: CSSProperties = {
  background: "var(--peak-surface-elevated)", borderLeft: "3px solid var(--text-on-peak)",
  padding: 32, borderRadius: "var(--radius-button)",
  display: "flex", flexDirection: "column", gap: 18,
  transition: "background-color 450ms ease, border-color 450ms ease",
};
const factRow: CSSProperties = {
  display: "grid", gridTemplateColumns: "110px 1fr", gap: 16, fontSize: 13, alignItems: "baseline",
};
const factLabel: CSSProperties = {
  color: "var(--text-on-peak-dim)", fontSize: 10, textTransform: "uppercase",
  letterSpacing: "0.12em", fontWeight: 700,
};
const factVal: CSSProperties = {
  color: "var(--text-on-peak)", fontWeight: 500,
};
