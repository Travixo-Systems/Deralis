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

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const fullTitle = isEn
    ? "Deralis Digital · Clearer operations, faster growth"
    : "Deralis Digital · Optimisez vos opérations, accélérez votre croissance";
  const description = isEn
    ? "I design solutions that keep work and information moving together from one person to the next, using the teams and tools you already have. Two day operational diagnostic, dossier within five business days."
    : "Je conçois des solutions où le travail et l'information avancent ensemble d'une personne à l'autre, avec les équipes et les outils déjà en place. Diagnostic opérationnel en deux jours, dossier sous cinq jours ouvrés.";
  return {
    title: { absolute: fullTitle },
    description,
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      url: isEn ? "https://www.deralis.digital" : `https://www.deralis.digital/${locale}`,
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
