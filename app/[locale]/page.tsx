import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import FlowStrip from "@/components/home/FlowStrip";
import WhoSection from "@/components/home/WhoSection";
import HomeCaseStudy from "@/components/home/HomeCaseStudy";
import AuditCTA from "@/components/shared/AuditCTA";
import HowIWork from "@/components/home/HowIWork";
import HomeFinalCTA from "@/components/home/HomeFinalCTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const fullTitle = isEn
    ? "Deralis Digital · Systems that replace disconnected tools and manual coordination"
    : "Deralis Digital · Des systèmes qui remplacent les outils déconnectés et la coordination manuelle";
  const description = isEn
    ? "I design and build operational systems that replace disconnected tools and manual coordination in growing businesses."
    : "Je conçois et construis des systèmes opérationnels qui remplacent les outils déconnectés et la coordination manuelle dans des entreprises en croissance.";
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
      <FlowStrip />
      <WhoSection />
      <HomeCaseStudy />
      <AuditCTA />
      <HowIWork />
      <HomeFinalCTA />
    </>
  );
}
