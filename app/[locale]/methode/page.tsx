import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import HeroCard from "@/components/methode/HeroCard";
import StagesCard from "@/components/methode/StagesCard";
import ClimaxPeakCard from "@/components/methode/ClimaxPeakCard";
import FinalCard from "@/components/methode/FinalCard";
import AnimateIn from "@/components/shared/AnimateIn";
import { localeUrl, alternateLanguages } from "@/i18n/urls";
import { ServicesJsonLd } from "@/components/seo/JsonLd";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "methode.metadata" });
  return {
    alternates: {
      canonical: localeUrl(locale, "/methode"),
      languages: alternateLanguages("/methode"),
    },
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: localeUrl(locale, `/methode`),
      images: [{ url: "https://www.deralis.digital/og-image.png", width: 1200, height: 630, alt: "Deralis Digital" }],
    },
  };
}

export default async function MethodePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ServicesJsonLd />
      <HeroCard />
      <AnimateIn>
        <StagesCard />
      </AnimateIn>
      <AnimateIn>
        <ClimaxPeakCard />
      </AnimateIn>
      <AnimateIn>
        <FinalCard />
      </AnimateIn>
    </>
  );
}
