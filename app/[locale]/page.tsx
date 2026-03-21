import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import Services from "@/components/home/Services";
import SocialProof from "@/components/home/SocialProof";
import WhoWeWorkWith from "@/components/home/WhoWeWorkWith";
import Approach from "@/components/home/Approach";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Highlight from "@/components/home/Highlight";
import ROICalculator from "@/components/home/ROICalculator";
import FAQ from "@/components/home/FAQ";
import WhatHappensNext from "@/components/home/WhatHappensNext";
import FinalCTA from "@/components/home/FinalCTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <SocialProof />
      <WhoWeWorkWith />
      <Approach />
      <FeaturedProjects />
      <Highlight />
      <ROICalculator />
      <FAQ />
      <WhatHappensNext />
      <FinalCTA />
    </>
  );
}
