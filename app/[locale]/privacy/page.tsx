import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import DsCard from "@/components/shared/DsCard";
import LegalSection from "@/components/legal/LegalSection";
import type { CSSProperties } from "react";

const h1Style: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: "var(--fs-h2)",
  fontWeight: 500,
  lineHeight: 1.08,
  letterSpacing: "-0.015em",
  marginBottom: 12,
};

const subtitleStyle: CSSProperties = {
  fontSize: "var(--fs-body-sm)",
  color: "var(--text-muted)",
  marginBottom: 0,
  transition: "color 450ms ease",
};

const pStyle: CSSProperties = {
  fontSize: "var(--fs-body-sm)",
  lineHeight: 1.65,
  color: "var(--text-secondary)",
  transition: "color 450ms ease",
};

const pStrongStyle: CSSProperties = {
  ...pStyle,
  fontWeight: 500,
  color: "var(--text-primary)",
};

const linkStyle: CSSProperties = {
  color: "var(--text-primary)",
  textDecoration: "none",
  borderBottom: "1px solid var(--border-strong)",
  paddingBottom: 1,
  transition: "color 300ms ease, border-color 300ms ease",
};

const ulStyle: CSSProperties = {
  listStyle: "disc",
  paddingLeft: 24,
  margin: "12px 0",
  display: "flex",
  flexDirection: "column",
  gap: 4,
  fontSize: "var(--fs-body-sm)",
  lineHeight: 1.65,
  color: "var(--text-secondary)",
};

const h3Style: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: 17,
  fontWeight: 500,
  color: "var(--text-primary)",
  marginBottom: 8,
  marginTop: 24,
};

const backLinkStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  fontSize: 14,
  color: "var(--text-muted)",
  textDecoration: "none",
  marginBottom: 32,
  transition: "color 300ms ease",
};

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  return (
    <>
      {/* Title card */}
      <DsCard style={{ maxWidth: 820 }}>
        <Link href="/" style={backLinkStyle}>← {t("title")}</Link>
        <h1 style={h1Style}>{t("title")}</h1>
        <p style={subtitleStyle}>{t("lastUpdated")}</p>
      </DsCard>

      {/* Intro card */}
      <DsCard style={{ maxWidth: 820 }}>
        <p style={{ ...pStyle, fontSize: 17 }}>{t("intro")}</p>
      </DsCard>

      <LegalSection title={t("sections.dataCollected.title")}>
        <h3 style={{ ...h3Style, marginTop: 0 }}>{t("sections.dataCollected.voluntary.title")}</h3>
        <p style={pStyle}>{t("sections.dataCollected.voluntary.intro")}</p>
        <ul style={ulStyle}>
          {(t.raw("sections.dataCollected.voluntary.items") as string[]).map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p style={pStyle}>{t("sections.dataCollected.voluntary.note")}</p>

        <h3 style={h3Style}>{t("sections.dataCollected.technical.title")}</h3>
        <p style={pStyle}>{t("sections.dataCollected.technical.intro")}</p>
        <ul style={ulStyle}>
          {(t.raw("sections.dataCollected.technical.items") as string[]).map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p style={pStyle}>{t("sections.dataCollected.technical.note")}</p>
        <p style={{ ...pStrongStyle, marginTop: 12 }}>{t("sections.dataCollected.technical.noTrackers")}</p>
      </LegalSection>

      <LegalSection title={t("sections.howWeUse.title")}>
        <p style={pStyle}>{t("sections.howWeUse.intro")}</p>
        <ul style={ulStyle}>
          {(t.raw("sections.howWeUse.items") as string[]).map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p style={pStrongStyle}>{t("sections.howWeUse.noSell")}</p>
      </LegalSection>

      <LegalSection title={t("sections.legalBasis.title")}>
        <p style={pStyle}>{t("sections.legalBasis.intro")}</p>
        <ul style={ulStyle}>
          <li>{t("sections.legalBasis.items.legitimate")}</li>
          <li>{t("sections.legalBasis.items.contract")}</li>
          <li>{t("sections.legalBasis.items.consent")}</li>
        </ul>
      </LegalSection>

      <LegalSection title={t("sections.storage.title")}>
        <p style={pStyle}>{t("sections.storage.intro1")}</p>
        <p style={pStyle}>{t("sections.storage.intro2")}</p>
        <ul style={ulStyle}>
          <li>{t("sections.storage.items.inquiries")}</li>
          <li>{t("sections.storage.items.project")}</li>
          <li>{t("sections.storage.items.analytics")}</li>
        </ul>
      </LegalSection>

      <LegalSection title={t("sections.sharing.title")}>
        <p style={pStyle}>{t("sections.sharing.intro")}</p>
        <ul style={ulStyle}>
          {(t.raw("sections.sharing.items") as string[]).map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p style={pStyle}>{t("sections.sharing.compliance")}</p>
        <p style={pStrongStyle}>{t("sections.sharing.noMarketing")}</p>
      </LegalSection>

      <LegalSection title={t("sections.rights.title")}>
        <p style={pStyle}>{t("sections.rights.intro")}</p>
        <ul style={ulStyle}>
          {(t.raw("sections.rights.items") as string[]).map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p style={pStyle}>
          {t("sections.rights.exercise")}{" "}
          <a href="mailto:contact@deralis.digital" style={linkStyle}>contact@deralis.digital</a>
        </p>
      </LegalSection>

      <LegalSection title={t("sections.cookies.title")}>
        <p style={pStyle}>{t("sections.cookies.intro")}</p>
        <ul style={ulStyle}>
          {(t.raw("sections.cookies.items") as string[]).map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p style={pStrongStyle}>{t("sections.cookies.noAds")}</p>
      </LegalSection>

      <LegalSection title={t("sections.contact.title")}>
        <p style={pStyle}>
          {t("sections.contact.intro")}{" "}
          <a href="mailto:contact@deralis.digital" style={linkStyle}>contact@deralis.digital</a>
        </p>
      </LegalSection>
    </>
  );
}
