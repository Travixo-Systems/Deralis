import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import CostSection from "@/components/home/CostSection";
import WhoSection from "@/components/home/WhoSection";
import ExclusionPeak from "@/components/home/ExclusionPeak";
import HomeCaseStudy from "@/components/home/HomeCaseStudy";
import HowIWork from "@/components/home/HowIWork";
import ClimaxPeak from "@/components/home/ClimaxPeak";
import AnimateIn from "@/components/shared/AnimateIn";
import { localeUrl, alternateLanguages } from "@/i18n/urls";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const fullTitle = isEn
    ? "Deralis Digital · Give time back to what makes money"
    : "Deralis Digital · Redonnez du temps à ce qui rapporte";
  const description = isEn
    ? "Less time spent searching for information, checking progress and chasing answers. Two-day operational diagnostic, dossier within five business days."
    : "Moins de temps passé à chercher l’information, vérifier l’avancement et relancer. Diagnostic opérationnel en deux jours, dossier sous cinq jours ouvrés.";
  return {
    alternates: {
      canonical: localeUrl(locale, ""),
      languages: alternateLanguages(""),
    },
    title: { absolute: fullTitle },
    description,
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      url: localeUrl(locale),
      siteName: "Deralis Digital",
      locale: isEn ? "en_US" : "fr_FR",
      images: [
        {
          url: "https://www.deralis.digital/og-image.png",
          width: 1200,
          height: 630,
          alt: "Deralis Digital",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["https://www.deralis.digital/og-image.png"],
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HomeHero />
      <AnimateIn>
        <CostSection />
      </AnimateIn>
      <AnimateIn>
        <WhoSection />
      </AnimateIn>
      <AnimateIn>
        <ExclusionPeak />
      </AnimateIn>
      <AnimateIn>
        <HomeCaseStudy />
      </AnimateIn>
      <AnimateIn>
        <HowIWork />
      </AnimateIn>
      <AnimateIn>
        <ClimaxPeak />
      </AnimateIn>
    </>
  );
}
