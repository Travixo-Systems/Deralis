import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import WhoWeWorkWith from "@/components/home/WhoWeWorkWith";
import Approach from "@/components/home/Approach";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Highlight from "@/components/home/Highlight";
import FAQ from "@/components/home/FAQ";
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
      <Services />
      <WhoWeWorkWith />
      <Approach />
      <FeaturedProjects />
      <Highlight />
      <FAQ />
      <FinalCTA />
    </>
  );
}
