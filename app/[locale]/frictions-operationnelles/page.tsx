import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import DsCard, { DsCardPaper } from "@/components/shared/DsCard";
import FrictionCalculator from "@/components/frictions/FrictionCalculator";
import type { CSSProperties } from "react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "frictions.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: `https://www.deralis.digital/${locale}/frictions-operationnelles`,
      images: [{ url: "https://www.deralis.digital/og-image.png", width: 1200, height: 630, alt: "Deralis Digital" }],
    },
  };
}

const eyebrowStyle: CSSProperties = {
  fontSize: "var(--fs-eyebrow)",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--text-muted)",
  fontWeight: 600,
  marginBottom: 18,
};

const h1Style: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: "var(--fs-h1)",
  fontWeight: 500,
  lineHeight: 1.05,
  letterSpacing: "-0.02em",
  marginBottom: 22,
};

const subStyle: CSSProperties = {
  fontSize: "var(--fs-subhead)",
  lineHeight: 1.5,
  color: "var(--text-primary)",
  maxWidth: "46ch",
  marginBottom: 18,
};

const introStyle: CSSProperties = {
  fontSize: 17,
  lineHeight: 1.6,
  color: "var(--text-secondary)",
  maxWidth: "58ch",
};

const methodTitleStyle: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: 23,
  fontWeight: 500,
  marginBottom: 16,
  color: "var(--text-primary)",
};

const methodPStyle: CSSProperties = {
  fontSize: 14,
  lineHeight: 1.65,
  color: "var(--text-secondary)",
  maxWidth: "70ch",
  marginBottom: 14,
};

const formulaStyle: CSSProperties = {
  fontFamily: "var(--font-ibm-plex-mono), ui-monospace, monospace",
  fontSize: 13,
  lineHeight: 1.6,
  color: "var(--text-primary)",
  background: "var(--canvas)",
  border: "1px solid var(--border-soft)",
  borderRadius: "var(--radius-internal)",
  padding: "14px 16px",
  marginBottom: 20,
  overflowX: "auto",
};

function Hero() {
  const t = useTranslations("frictions.hero");
  return (
    <DsCard>
      <p style={eyebrowStyle}>{t("eyebrow")}</p>
      <h1 style={h1Style} className="hero-h1-responsive">{t("h1")}</h1>
      <p style={subStyle}>{t("sub")}</p>
      <p style={introStyle}>{t("intro")}</p>
    </DsCard>
  );
}

function Method() {
  const t = useTranslations("frictions.method");
  return (
    <DsCardPaper>
      <h2 style={methodTitleStyle}>{t("title")}</h2>
      <p style={formulaStyle}>{t("formula")}</p>
      <p style={methodPStyle}>{t("p1")}</p>
      <p style={methodPStyle}>{t("p2")}</p>
      <p style={methodPStyle}>{t("p3")}</p>
    </DsCardPaper>
  );
}

export default async function FrictionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <FrictionCalculator />
      <Method />
    </>
  );
}
