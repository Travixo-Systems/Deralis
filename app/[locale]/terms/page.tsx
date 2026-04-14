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

export default function TermsPage() {
  const t = useTranslations("terms");

  return (
    <>
      <DsCard style={{ maxWidth: 820 }}>
        <Link href="/" style={backLinkStyle}>← {t("title")}</Link>
        <h1 style={h1Style}>{t("title")}</h1>
        <p style={subtitleStyle}>{t("lastUpdated")}</p>
      </DsCard>

      <DsCard style={{ maxWidth: 820 }}>
        <p style={{ ...pStyle, fontSize: 17 }}>{t("intro")}</p>
      </DsCard>

      <LegalSection title={t("sections.websiteUse.title")}>
        <p style={pStyle}>{t("sections.websiteUse.intro")}</p>
        <ul style={ulStyle}>
          {(t.raw("sections.websiteUse.items") as string[]).map((item) => <li key={item}>{item}</li>)}
        </ul>
      </LegalSection>

      <LegalSection title={t("sections.services.title")}>
        <p style={pStyle}>{t("sections.services.intro")}</p>
        <ul style={ulStyle}>
          {(t.raw("sections.services.items") as string[]).map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p style={pStrongStyle}>{t("sections.services.note")}</p>
      </LegalSection>

      <LegalSection title={t("sections.quotes.title")}>
        <p style={pStyle}>{t("sections.quotes.intro")}</p>
        <ul style={ulStyle}>
          {(t.raw("sections.quotes.items") as string[]).map((item) => <li key={item}>{item}</li>)}
        </ul>
      </LegalSection>

      <LegalSection title={t("sections.payment.title")}>
        <p style={pStyle}>{t("sections.payment.intro")}</p>
        <ul style={ulStyle}>
          {(t.raw("sections.payment.items") as string[]).map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p style={pStrongStyle}>{t("sections.payment.late")}</p>
      </LegalSection>

      <LegalSection title={t("sections.ip.title")}>
        <p style={pStyle}>{t("sections.ip.intro")}</p>
        <ul style={ulStyle}>
          {(t.raw("sections.ip.items") as string[]).map((item) => <li key={item}>{item}</li>)}
        </ul>
      </LegalSection>

      <LegalSection title={t("sections.confidentiality.title")}>
        <p style={pStyle}>{t("sections.confidentiality.content")}</p>
      </LegalSection>

      <LegalSection title={t("sections.liability.title")}>
        <p style={pStyle}>{t("sections.liability.intro")}</p>
        <ul style={ulStyle}>
          {(t.raw("sections.liability.items") as string[]).map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p style={pStrongStyle}>{t("sections.liability.limit")}</p>
      </LegalSection>

      <LegalSection title={t("sections.termination.title")}>
        <p style={pStyle}>{t("sections.termination.content")}</p>
      </LegalSection>

      <LegalSection title={t("sections.law.title")}>
        <p style={pStyle}>{t("sections.law.content")}</p>
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
