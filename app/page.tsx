import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import WhoWeWorkWith from "@/components/home/WhoWeWorkWith";
import Approach from "@/components/home/Approach";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Highlight from "@/components/home/Highlight";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
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
