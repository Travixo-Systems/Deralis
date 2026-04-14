import { useTranslations } from "next-intl";
import DsCard from "@/components/shared/DsCard";
import TabLabel from "@/components/shared/TabLabel";
import RichText from "@/components/shared/RichText";
import { Link } from "@/i18n/navigation";
import type { CSSProperties } from "react";

// Grid layout via CSS class .grid-hero (responsive handled in globals.css)

const eyebrowStyle: CSSProperties = {
  fontSize: "var(--fs-eyebrow)",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--text-muted)",
  marginBottom: 26,
  fontWeight: 600,
  fontFamily: "var(--font-ibm-plex-sans), sans-serif",
  transition: "color 450ms ease",
};

const h1Style: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: "var(--fs-h1)",
  fontWeight: 500,
  lineHeight: 1.02,
  letterSpacing: "-0.02em",
  marginBottom: 36,
};

const subheadStackStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
  marginBottom: 40,
  maxWidth: "48ch",
};

const subheadPStyle: CSSProperties = {
  fontSize: "var(--fs-subhead)",
  lineHeight: 1.5,
  color: "var(--text-secondary)",
  transition: "color 450ms ease",
};

const ctaRowStyle: CSSProperties = {
  display: "flex",
  gap: 18,
  alignItems: "center",
  flexWrap: "wrap",
};

const ctaPrimaryStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 12,
  padding: "17px 30px",
  background: "var(--text-primary)",
  color: "var(--canvas)",
  fontSize: 14,
  fontWeight: 500,
  border: "none",
  borderRadius: "var(--radius-button)",
  cursor: "pointer",
  fontFamily: "inherit",
  textDecoration: "none",
  transition: "background-color 450ms ease, color 450ms ease, transform 150ms ease",
};

const ctaSecondaryStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "16px 4px",
  background: "transparent",
  color: "var(--text-primary)",
  fontSize: 14,
  fontWeight: 500,
  textDecoration: "none",
  cursor: "pointer",
  border: "none",
  fontFamily: "inherit",
  transition: "color 300ms ease",
};

const anchorBlockStyle: CSSProperties = {
  background: "var(--card-peak)",
  color: "var(--text-on-peak)",
  padding: "40px 36px 32px",
  position: "relative",
  borderRadius: 12,
  boxShadow: "0 30px 60px rgba(26, 29, 27, 0.2), 0 10px 20px rgba(26, 29, 27, 0.1)",
  transition: "background-color 450ms ease, color 450ms ease",
};

const builtItemStyle: CSSProperties = {
  paddingLeft: 14,
  borderLeft: "2px solid var(--accent)",
  marginBottom: 18,
  transition: "border-color 450ms ease",
};

const builtNameStyle: CSSProperties = {
  display: "block",
  fontSize: 14,
  fontWeight: 600,
  color: "var(--text-on-peak)",
  marginBottom: 4,
  letterSpacing: "-0.005em",
};

const builtDescStyle: CSSProperties = {
  display: "block",
  fontSize: 12,
  lineHeight: 1.55,
  color: "var(--text-on-peak-muted)",
};

const trajectoryStyle: CSSProperties = {
  marginTop: 56,
  paddingTop: 48,
  borderTop: "2px solid var(--border-strong)",
  transition: "border-color 450ms ease",
};

const trajectoryLabelStyle: CSSProperties = {
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--text-muted)",
  fontWeight: 600,
  marginBottom: 24,
  fontFamily: "var(--font-ibm-plex-sans), sans-serif",
  transition: "color 450ms ease",
};

const trajectoryListStyle: CSSProperties = {
  display: "flex",
  gap: 26,
  flexWrap: "wrap",
  alignItems: "center",
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: "clamp(20px, 2.2vw, 22px)",
  fontWeight: 500,
  color: "var(--text-primary)",
  letterSpacing: "-0.01em",
  transition: "color 450ms ease",
};

const sepStyle: CSSProperties = {
  color: "var(--text-muted)",
  fontSize: 14,
};

export default function HomeHero() {
  const t = useTranslations("home.page.hero");

  const employers: string[] = JSON.parse(
    JSON.stringify(t.raw("trajectory.employers"))
  );

  return (
    <DsCard>
      <div className="grid-hero-centered">
        <div>
          <p style={eyebrowStyle}>{t("eyebrow")}</p>
          <h1 style={h1Style} className="hero-h1-responsive">
            <RichText html={t.raw("h1")} />
          </h1>
          <div style={subheadStackStyle}>
            <p style={subheadPStyle}>
              <RichText html={t.raw("subhead1")} />
            </p>
            <p style={subheadPStyle}>
              {t("subhead2")}
            </p>
            <p style={subheadPStyle}>
              {t("subhead3")}
            </p>
          </div>
          <div style={ctaRowStyle}>
            <Link href="/audit" style={ctaPrimaryStyle}>
              {t("ctaPrimary")}
            </Link>
            <Link href="/projects" style={ctaSecondaryStyle}>
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>

        <aside style={anchorBlockStyle}>
          <TabLabel variant="default" heroSize style={{ left: 32 }}>
            {t("anchor.tab")}
          </TabLabel>

          <div style={{ ...builtItemStyle }}>
            <span style={builtNameStyle}>{t("anchor.travixoName")}</span>
            <span style={builtDescStyle}>{t("anchor.travixoDesc")}</span>
          </div>
          <div style={builtItemStyle}>
            <span style={builtNameStyle}>{t("anchor.consulaireName")}</span>
            <span style={builtDescStyle}>{t("anchor.consulaireDesc")}</span>
          </div>
          <div style={{ ...builtItemStyle, marginBottom: 0 }}>
            <span style={builtNameStyle}>{t("anchor.arcadiaName")}</span>
            <span style={builtDescStyle}>{t("anchor.arcadiaDesc")}</span>
          </div>

          <p style={{
            marginTop: 22,
            paddingTop: 18,
            borderTop: "1px solid var(--text-on-peak-dim)",
            fontSize: 11,
            color: "var(--text-on-peak-dim)",
            fontStyle: "italic",
            transition: "color 450ms ease, border-color 450ms ease",
          }}>
            {t("anchor.signature")}
          </p>
        </aside>
      </div>

      <div style={trajectoryStyle}>
        <p style={trajectoryLabelStyle}>{t("trajectory.label")}</p>
        <div style={trajectoryListStyle} className="trajectory-responsive">
          {employers.map((name, i) => (
            <span key={name}>
              {i > 0 && <span style={sepStyle}> · </span>}
              {name}
            </span>
          ))}
        </div>
      </div>
    </DsCard>
  );
}
