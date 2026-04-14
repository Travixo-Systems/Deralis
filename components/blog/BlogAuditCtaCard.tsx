import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { Link } from "@/i18n/navigation";
import DsCard from "@/components/shared/DsCard";
import RichText from "@/components/shared/RichText";

export default function BlogAuditCtaCard() {
  const t = useTranslations("common.auditCta");

  return (
    <DsCard>
      <div style={{ maxWidth: 720 }}>
        <p style={eyebrow}>{t("eyebrow")}</p>
        <h2 style={h2Style}>
          <RichText html={t.raw("headline") as string} />
        </h2>
        <p style={body}>{t("body1")}</p>
        <p style={body}>{t("body2")}</p>
        <Link href="/audit" style={cta}>
          {t("ctaLabel")}
        </Link>
        <span style={metaLine}>{t("ctaMeta")}</span>
      </div>
    </DsCard>
  );
}

const eyebrow: CSSProperties = {
  fontSize: "var(--fs-eyebrow)",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--text-muted)",
  marginBottom: 20,
  fontWeight: 600,
  fontFamily: "var(--font-ibm-plex-sans), sans-serif",
  transition: "color 450ms ease",
};

const h2Style: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: "clamp(28px, 3.2vw, 38px)",
  fontWeight: 500,
  lineHeight: 1.08,
  letterSpacing: "-0.02em",
  color: "var(--text-primary)",
  marginBottom: 24,
  maxWidth: "22ch",
  transition: "color 450ms ease",
};

const body: CSSProperties = {
  fontSize: 16,
  lineHeight: 1.6,
  color: "var(--text-secondary)",
  marginBottom: 14,
  maxWidth: "48ch",
  transition: "color 450ms ease",
};

const cta: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  marginTop: 18,
  padding: "17px 28px",
  background: "var(--text-primary)",
  color: "var(--canvas)",
  fontSize: 14,
  fontWeight: 500,
  borderRadius: "var(--radius-button)",
  textDecoration: "none",
  transition: "background-color 450ms ease, color 450ms ease",
};

const metaLine: CSSProperties = {
  display: "block",
  marginTop: 14,
  fontSize: 12,
  color: "var(--text-muted)",
  fontStyle: "italic",
  transition: "color 450ms ease",
};
