import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import DsCard, { DsCardPaper } from "@/components/shared/DsCard";
import FrictionCalculator from "@/components/frictions/FrictionCalculator";
import type { CSSProperties } from "react";
import AnimateIn from "@/components/shared/AnimateIn";
import { localeUrl, alternateLanguages } from "@/i18n/urls";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "frictions.metadata" });
  return {
    alternates: {
      canonical: localeUrl(locale, "/frictions-operationnelles"),
      languages: alternateLanguages("/frictions-operationnelles"),
    },
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: localeUrl(locale, `/frictions-operationnelles`),
      images: [{ url: "https://www.deralis.digital/og-image.png", width: 1200, height: 630, alt: "Deralis Digital" }],
    },
  };
}

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

const metaStyle: CSSProperties = {
  fontSize: 13,
  color: "var(--text-muted)",
  letterSpacing: "0.02em",
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

const sourcesLabelStyle: CSSProperties = {
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--text-muted)",
  fontWeight: 600,
  marginTop: 26,
  marginBottom: 10,
};

const sourcesListStyle: CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: "0 0 22px",
  fontSize: 14,
  lineHeight: 1.9,
};

const sourceLinkStyle: CSSProperties = {
  color: "var(--text-secondary)",
  textDecoration: "underline",
  textUnderlineOffset: 3,
};

const legalStyle: CSSProperties = {
  fontSize: 12,
  lineHeight: 1.65,
  color: "var(--text-muted)",
  maxWidth: "72ch",
  paddingTop: 18,
  borderTop: "1px solid var(--border-soft)",
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
      <h1 style={h1Style} className="hero-h1-responsive">{t("h1")}</h1>
      <p style={subStyle}>{t("sub")}</p>
      <p style={metaStyle}>{t("meta")}</p>
    </DsCard>
  );
}

function Method() {
  const t = useTranslations("frictions.method");
  return (
    <DsCardPaper>
      <h2 style={methodTitleStyle}>{t("title")}</h2>

      <p style={methodPStyle}>{t("intro")}</p>
      <p style={formulaStyle}>{t("formula")}</p>
      <p style={methodPStyle}>{t("shareIntro")}</p>
      <p style={formulaStyle}>{t("shareFormula")}</p>

      <p style={methodPStyle}>{t("p1")}</p>
      <p style={methodPStyle}>{t("p2")}</p>
      <p style={methodPStyle}>{t("p3")}</p>

      <p style={sourcesLabelStyle}>{t("sourcesLabel")}</p>
      <ul style={sourcesListStyle}>
        <li>
          <a
            style={sourceLinkStyle}
            href="https://www.hbs.edu/ris/Publication%20Files/04-045_d62528d4-7931-4ea1-a205-d9683c639d6e.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("sourceTdabc")}
          </a>
        </li>
        <li>
          <a
            style={sourceLinkStyle}
            href="https://recherche.iseor.com/intervention_socioeconomique.asp"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("sourceIseor")}
          </a>
        </li>
      </ul>

      <p style={legalStyle}>{t("legal")}</p>
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
      <AnimateIn>
        <Method />
      </AnimateIn>
    </>
  );
}
