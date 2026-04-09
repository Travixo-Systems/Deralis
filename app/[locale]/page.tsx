import { setRequestLocale } from "next-intl/server";
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
