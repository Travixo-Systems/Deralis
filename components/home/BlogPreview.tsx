"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    slug: "why-profitable-businesses-run-on-manual-work",
    titleEN: "Why Profitable Businesses Still Run on Manual Work in 2026",
    titleFR: "Pourquoi les entreprises rentables fonctionnent encore au travail manuel en 2026",
  },
  {
    slug: "web-system-not-just-a-website",
    titleEN: "Why Your Business Needs a Web System, Not Just a Website",
    titleFR: "Pourquoi votre entreprise a besoin d'un système web, pas d'un simple site",
  },
  {
    slug: "saas-vs-custom-build",
    titleEN: "SaaS vs Custom Build: How to Make the Right Choice",
    titleFR: "SaaS ou sur mesure : comment faire le bon choix",
  },
];

export default function BlogPreview() {
  const locale = useLocale();
  const isFR = locale === "fr";

  const sectionTitle = isFR ? "Du terrain" : "From the practice";
  const readLabel = isFR ? "Lire" : "Read";

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-3">
            {sectionTitle}
          </h2>
        </div>

        {/* Article cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group p-5 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)] card-hover flex flex-col"
            >
              <h3 className="text-base font-semibold text-[var(--dd-text-main)] mb-4 flex-grow group-hover:text-[var(--dd-accent)] transition-colors">
                {isFR ? article.titleFR : article.titleEN}
              </h3>
              <span className="text-[var(--dd-accent)] text-sm font-medium inline-flex items-center gap-1">
                {readLabel}
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
