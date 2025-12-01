import { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import WhoWeWorkWith from "@/components/home/WhoWeWorkWith";
import Approach from "@/components/home/Approach";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Highlight from "@/components/home/Highlight";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Deralis Digital — Modern Web Systems, Not Just Websites",
  description:
    "We build high-performance web platforms with Next.js, databases, and automation. SaaS applications, dashboards, and custom systems that help businesses scale.",
  keywords: [
    "web development",
    "Next.js development",
    "SaaS development",
    "custom web applications",
    "database applications",
    "web agency France",
  ],
  openGraph: {
    title: "Deralis Digital — Modern Web Systems, Not Just Websites",
    description:
      "High-performance web platforms with Next.js, databases, and automation. Real software for real businesses.",
    url: "https://deralis.digital",
  },
};

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
