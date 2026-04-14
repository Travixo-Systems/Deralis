import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import DsCard from "@/components/shared/DsCard";
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
  marginBottom: 40,
  transition: "color 450ms ease",
};

const h2Style: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: 20,
  fontWeight: 500,
  marginBottom: 16,
  color: "var(--text-primary)",
};

const pStyle: CSSProperties = {
  fontSize: "var(--fs-body-sm)",
  lineHeight: 1.65,
  color: "var(--text-secondary)",
  transition: "color 450ms ease",
};

const linkStyle: CSSProperties = {
  color: "var(--text-primary)",
  textDecoration: "none",
  borderBottom: "1px solid var(--border-strong)",
  paddingBottom: 1,
  transition: "color 300ms ease, border-color 300ms ease",
};

const ulStyle: CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  fontSize: "var(--fs-body-sm)",
  lineHeight: 1.65,
  color: "var(--text-secondary)",
};

const sectionStyle: CSSProperties = {
  marginBottom: 40,
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

export default function LegalPage() {
  const t = useTranslations("legal");

  return (
    <DsCard style={{ maxWidth: 820 }}>
      <Link href="/" style={backLinkStyle}>
        ← {t("title")}
      </Link>

      <h1 style={h1Style}>{t("title")}</h1>
      <p style={subtitleStyle}>{t("subtitle")}</p>

      <section style={sectionStyle}>
        <h2 style={h2Style}>{t("sections.publisher.title")}</h2>
        <ul style={ulStyle}>
          <li><strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>{t("sections.publisher.fields.name")}:</strong> {t("sections.publisher.fields.nameValue")}</li>
          <li><strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>{t("sections.publisher.fields.form")}:</strong> {t("sections.publisher.fields.formValue")}</li>
          <li><strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>{t("sections.publisher.fields.siret")}:</strong> {t("sections.publisher.fields.siretValue")}</li>
          <li><strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>{t("sections.publisher.fields.address")}:</strong> {t("sections.publisher.fields.addressValue")}</li>
          <li><strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>{t("sections.publisher.fields.email")}:</strong>{" "}
            <a href="mailto:contact@deralis.digital" style={linkStyle}>contact@deralis.digital</a>
          </li>
          <li><strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>{t("sections.publisher.fields.vat")}:</strong> {t("sections.publisher.fields.vatValue")}</li>
          <li><strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>{t("sections.publisher.fields.director")}:</strong> {t("sections.publisher.fields.directorValue")}</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>{t("sections.hosting.title")}</h2>
        <ul style={ulStyle}>
          <li><strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>{t("sections.hosting.fields.provider")}:</strong> {t("sections.hosting.fields.providerValue")}</li>
          <li><strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>{t("sections.hosting.fields.address")}:</strong> {t("sections.hosting.fields.addressValue")}</li>
          <li><strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>{t("sections.hosting.fields.website")}:</strong>{" "}
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>https://vercel.com</a>
          </li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>{t("sections.ip.title")}</h2>
        <p style={pStyle}>{t("sections.ip.content")}</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>{t("sections.liability.title")}</h2>
        <p style={pStyle}>{t("sections.liability.content")}</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>{t("sections.personalData.title")}</h2>
        <p style={pStyle}>
          {t("sections.personalData.content")}{" "}
          <Link href="/privacy" style={linkStyle}>{t("sections.personalData.link")}</Link>.
        </p>
      </section>

      <section style={{ marginBottom: 0 }}>
        <h2 style={h2Style}>{t("sections.contact.title")}</h2>
        <p style={pStyle}>
          {t("sections.contact.intro")}{" "}
          <a href="mailto:contact@deralis.digital" style={linkStyle}>contact@deralis.digital</a>
        </p>
      </section>
    </DsCard>
  );
}
