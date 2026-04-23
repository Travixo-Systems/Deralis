import { useTranslations } from "next-intl";
import DsCard from "@/components/shared/DsCard";
import TabLabel from "@/components/shared/TabLabel";
import Image from "next/image";
import type { CSSProperties } from "react";

const proofIntroStyle: CSSProperties = {
  textAlign: "center",
  maxWidth: 640,
  margin: "0 auto 56px",
};

const eyebrowStyle: CSSProperties = {
  fontSize: "var(--fs-eyebrow)",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--accent)",
  marginBottom: 16,
  fontWeight: 600,
  transition: "color 450ms ease",
};

const h2Style: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: "clamp(36px, 4.5vw, 48px)",
  fontWeight: 500,
  lineHeight: 1.08,
  letterSpacing: "-0.02em",
  marginBottom: 16,
  color: "var(--text-primary)",
};

const subtitleStyle: CSSProperties = {
  fontSize: "var(--fs-body)",
  color: "var(--text-secondary)",
  lineHeight: 1.55,
};

// Grid layout via CSS class .grid-proof (responsive handled in globals.css)

const tileStyle: CSSProperties = {
  background: "var(--card-paper)",
  border: "1px solid var(--border-strong)",
  borderRadius: "var(--radius-internal)",
  boxShadow: "var(--tile-shadow)",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  transition: "background-color 450ms ease, border-color 450ms ease, box-shadow 450ms ease",
};

const chromeStyle: CSSProperties = {
  padding: "13px 20px",
  display: "flex",
  alignItems: "center",
  gap: 16,
  borderBottom: "1px solid var(--border-soft)",
  borderRadius: "var(--radius-internal) var(--radius-internal) 0 0",
  transition: "background-color 450ms ease",
};

const dotStyle: CSSProperties = {
  width: 11,
  height: 11,
  borderRadius: "50%",
  transition: "background-color 450ms ease",
};

const urlStyle: CSSProperties = {
  flex: 1,
  background: "var(--card-paper)",
  border: "1px solid var(--border-soft)",
  borderRadius: "var(--radius-internal)",
  padding: "7px 14px",
  fontFamily: "var(--font-ibm-plex-mono), monospace",
  fontSize: 11,
  color: "var(--text-muted)",
  transition: "background-color 450ms ease, color 450ms ease, border-color 450ms ease",
};

const footerStyle: CSSProperties = {
  padding: "22px 28px",
  borderTop: "1px solid var(--border-soft)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  flexWrap: "wrap",
  borderRadius: "0 0 var(--radius-internal) var(--radius-internal)",
  transition: "background-color 450ms ease, border-color 450ms ease",
};

const factLabelStyle: CSSProperties = {
  display: "block",
  fontSize: 9,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: "var(--text-muted)",
  fontWeight: 700,
  marginBottom: 3,
};

const factValueStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "var(--text-primary)",
};

const proofCtaStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "11px 18px",
  background: "var(--text-primary)",
  color: "var(--canvas)",
  fontSize: 12,
  fontWeight: 600,
  borderRadius: "var(--radius-internal)",
  textDecoration: "none",
  cursor: "pointer",
  border: "none",
  fontFamily: "inherit",
  transition: "background-color 450ms ease, color 450ms ease, transform 150ms ease",
};

const capRowStyle: CSSProperties = {
  display: "flex",
  gap: 12,
  padding: "11px 14px",
  background: "var(--card-main)",
  border: "1px solid var(--border-soft)",
  borderLeft: "2px solid var(--accent)",
  borderRadius: "var(--radius-button)",
  alignItems: "flex-start",
  transition: "background-color 450ms ease, color 450ms ease, border-color 450ms ease",
};

const capLabelStyle: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--accent)",
  paddingTop: 1,
  minWidth: 18,
  transition: "color 450ms ease",
};

const capNameStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "var(--text-primary)",
  fontFamily: "var(--font-ibm-plex-mono), monospace",
  letterSpacing: "-0.01em",
};

const capDescStyle: CSSProperties = {
  fontSize: 11,
  lineHeight: 1.45,
  color: "var(--text-muted)",
};

export default function HomeCaseStudy() {
  const t = useTranslations("home.page.proof");

  return (
    <DsCard>
      <div style={proofIntroStyle}>
        <p style={eyebrowStyle}>{t("eyebrow")}</p>
        <h2 style={h2Style}>{t("h2")}</h2>
        <p style={subtitleStyle}>{t("subtitle")}</p>
      </div>

      <div className="grid-proof" style={{ paddingTop: 14 }}>
        {/* TraviXO tile */}
        <div style={tileStyle}>
          <TabLabel variant="status-ok" style={{ left: 32, top: -11 }}>
            {t("travixo.tab")}
          </TabLabel>
          <div style={chromeStyle} className="chrome-bar">
            <div style={{ display: "flex", gap: 5 }}>
              <span style={dotStyle} className="chrome-dot" />
              <span style={dotStyle} className="chrome-dot" />
              <span style={dotStyle} className="chrome-dot" />
            </div>
            <div style={urlStyle}>
              <span style={{ marginRight: 8, fontSize: 10 }} aria-hidden="true">🔒</span>
              {t("travixo.url")}
            </div>
          </div>
          <div style={{ lineHeight: 0, flex: 1 }}>
            <Image
              src="/projects/travixo/travixo-dashboard.png"
              alt="TraviXO dashboard"
              width={1191}
              height={982}
              sizes="(max-width: 960px) 100vw, 520px"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          <div style={footerStyle}>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {(["stack", "architecture", "build"] as const).map((key) => (
                <div key={key}>
                  <span style={factLabelStyle}>{t(`travixo.facts.${key}.label`)}</span>
                  <span style={factValueStyle}>{t(`travixo.facts.${key}.value`)}</span>
                </div>
              ))}
            </div>
            <a href="/projects/travixo" style={proofCtaStyle}>
              {t("travixo.cta")}
            </a>
          </div>
        </div>

        {/* Consulaire tile */}
        <div style={tileStyle}>
          <TabLabel variant="accent" style={{ left: 32, top: -11 }}>
            {t("consulaire.tab")}
          </TabLabel>
          <div style={chromeStyle} className="chrome-bar">
            <div style={{ display: "flex", gap: 5 }}>
              <span style={dotStyle} className="chrome-dot" />
              <span style={dotStyle} className="chrome-dot" />
              <span style={dotStyle} className="chrome-dot" />
            </div>
            <div style={urlStyle}>
              <span style={{ marginRight: 8, fontSize: 10 }} aria-hidden="true">🔒</span>
              {t("consulaire.url")}
            </div>
          </div>
          <div style={{ lineHeight: 0, flex: 1 }}>
            <Image
              src="/projects/gov-portal/gov-portal.png"
              alt="Portail consulaire"
              width={1534}
              height={730}
              sizes="(max-width: 960px) 100vw, 520px"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          <div style={footerStyle}>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {(["stack", "format", "origine"] as const).map((key) => (
                <div key={key}>
                  <span style={factLabelStyle}>{t(`consulaire.facts.${key}.label`)}</span>
                  <span style={factValueStyle}>{t(`consulaire.facts.${key}.value`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DsCard>
  );
}
