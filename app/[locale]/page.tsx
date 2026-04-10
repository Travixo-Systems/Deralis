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
  const tagline = isEn
    ? "Systems that replace manual work"
    : "Des systèmes qui remplacent le travail manuel";
  const fullTitle = `Deralis Digital: ${tagline}`;
  const description = isEn
    ? "Too much still runs through spreadsheets, workarounds, and disconnected tools. I build the system that fixes that."
    : "Trop de choses passent encore par des tableurs, des contournements et des outils déconnectés. Je construis le système qui règle ça.";
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
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
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
