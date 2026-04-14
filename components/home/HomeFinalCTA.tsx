import { useTranslations } from "next-intl";
import { DsCardFinal } from "@/components/shared/DsCard";
import RichText from "@/components/shared/RichText";
import { Link } from "@/i18n/navigation";
import type { CSSProperties } from "react";

const h2Style: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: "clamp(32px, 4vw, 44px)",
  fontWeight: 500,
  lineHeight: 1.1,
  margin: "0 auto 22px",
  letterSpacing: "-0.02em",
  maxWidth: "22ch",
};

const pStyle: CSSProperties = {
  fontSize: "var(--fs-body)",
  color: "var(--text-secondary)",
  maxWidth: "52ch",
  margin: "0 auto 36px",
  lineHeight: 1.55,
};

const actionsStyle: CSSProperties = {
  display: "flex",
  gap: 18,
  justifyContent: "center",
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

export default function HomeFinalCTA() {
  const t = useTranslations("home.page.finalCta");
  const tHero = useTranslations("home.page.hero");
  const tNav = useTranslations("common.nav");

  return (
    <DsCardFinal>
      <h2 style={h2Style}>
        <RichText html={t.raw("headline")} />
      </h2>
      <p style={pStyle}>{t("description")}</p>
      <div style={actionsStyle}>
        <Link href="/audit" style={ctaPrimaryStyle}>
          {tHero("ctaPrimary")}
        </Link>
        <Link href="/contact" style={ctaSecondaryStyle}>
          {tNav("contact")} →
        </Link>
      </div>
    </DsCardFinal>
  );
}
