"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Lightbulb,
  Code2,
  Bot,
  Settings,
  CheckCircle2,
  Users,
  Clock,
  Target,
  X,
  Server
} from "lucide-react";

const serviceKeys = ["consulting", "development", "ai", "support"] as const;

const serviceIcons = {
  consulting: Lightbulb,
  development: Code2,
  ai: Bot,
  support: Settings,
};

const techStack = [
  "Next.js 15",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Supabase",
  "Prisma",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Vercel",
];

export default function ServicesPage() {
  const t = useTranslations("services");
  const tActions = useTranslations("common.actions");
  const tStats = useTranslations("common.stats");

  const stats = [
    { icon: Users, value: "5+", label: tStats("platformsShippedShort"), sublabel: "Next.js / SQL / Supabase" },
    { icon: Clock, value: "24h", label: tStats("responseTimeShort"), sublabel: "Engineering support" },
    { icon: Target, value: "100%", label: tStats("deliveryRateShort"), sublabel: "Shipped & deployed" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 lg:pt-28 lg:pb-10 bg-mesh">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--dd-bg-card)] border border-[var(--dd-border)] mb-4">
              <Server className="w-4 h-4 text-[var(--dd-accent)]" />
              <span className="text-sm text-[var(--dd-text-muted)]">
                {t("hero.badge")}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--dd-text-main)] mb-4">
              {t("hero.title")}{" "}
              <span className="gradient-text">{t("hero.titleHighlight")}</span>
            </h1>
            <p className="text-lg text-[var(--dd-text-muted)] mb-6 leading-relaxed">
              {t("hero.description")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                {tActions("speakToEngineer")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/projects" className="btn-secondary">
                {tActions("seePlatforms")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-6 border-y border-[var(--dd-border)] bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="w-4 h-4 text-[var(--dd-accent)]" />
                  <span className="text-2xl font-bold text-[var(--dd-text-main)]">
                    {stat.value}
                  </span>
                </div>
                <p className="text-sm text-[var(--dd-text-muted)]">{stat.label}</p>
                <p className="text-xs text-[var(--dd-text-dim)]">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Bar */}
      <section className="py-6 bg-[var(--dd-bg)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-sm text-[var(--dd-text-dim)] mb-4">
            {t("techBar.label")}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech) => (
              <div
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] hover:border-[var(--dd-accent)] transition-colors"
              >
                <span className="text-[var(--dd-text-muted)] text-sm">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-12 lg:space-y-16">
            {serviceKeys.map((key, index) => {
              const Icon = serviceIcons[key];
              const features = t.raw(`items.${key}.features`) as string[];

              return (
                <div
                  key={key}
                  id={t(`items.${key}.id`)}
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-start ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[var(--dd-accent)]" />
                    </div>

                    <p className="text-sm text-[var(--dd-accent)] font-medium mb-1">
                      {t(`items.${key}.subtitle`)}
                    </p>
                    <h2 className="text-2xl font-bold text-[var(--dd-text-main)] mb-3">
                      {t(`items.${key}.title`)}
                    </h2>
                    <p className="text-[var(--dd-text-muted)] mb-4 leading-relaxed">
                      {t(`items.${key}.description`)}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-4">
                      {features.map((feature: string) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[var(--dd-accent)] mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-[var(--dd-text-muted)]">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {key === "development" && (
                      <p className="text-sm text-[var(--dd-text-dim)] italic mb-4 pl-3 border-l-2 border-[var(--dd-accent)]">
                        &quot;{t(`items.${key}.note`)}&quot;
                      </p>
                    )}

                    <Link
                      href={`/contact?service=${key}`}
                      className="btn-primary inline-flex"
                    >
                      {t(`items.${key}.cta`)}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Card */}
                  <div
                    className={`gradient-border p-6 ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <h3 className="text-base font-semibold text-[var(--dd-text-main)] mb-2">
                      {t("cards.whoFor")}
                    </h3>
                    <p className="text-sm text-[var(--dd-text-muted)] mb-4">
                      {t(`items.${key}.whoFor`)}
                    </p>
                    <div className="pt-4 border-t border-[var(--dd-border)]">
                      <p className="text-xs text-[var(--dd-text-dim)] mb-1">
                        {t("cards.timeline")}
                      </p>
                      <p className="text-[var(--dd-text-main)] font-medium text-sm">
                        {t(`items.${key}.timeline`)}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-[var(--dd-border)] mt-4">
                      <p className="text-xs text-[var(--dd-text-dim)] mb-1">
                        {t("cards.investment")}
                      </p>
                      <p className="text-[var(--dd-text-main)] font-medium text-sm">
                        {t(`items.${key}.investment`)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-8 lg:py-10 bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[var(--dd-text-main)] mb-2">
              {t("comparison.title")}
            </h2>
            <p className="text-sm text-[var(--dd-text-muted)]">
              {t("comparison.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Typical Agency */}
            <div className="p-5 rounded-xl bg-[var(--dd-bg)] border border-[var(--dd-border)]">
              <div className="flex items-center gap-2 mb-3">
                <X className="w-4 h-4 text-red-400" />
                <h3 className="font-semibold text-[var(--dd-text-main)] text-sm">
                  {t("comparison.typical.title")}
                </h3>
              </div>
              <ul className="space-y-2 text-[var(--dd-text-muted)] text-sm">
                {(t.raw("comparison.typical.items") as string[]).map((item: string) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Deralis Digital */}
            <div className="p-5 rounded-xl bg-[var(--dd-bg)] border border-[var(--dd-accent)] shadow-lg shadow-[var(--dd-accent)]/10">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-[var(--dd-accent)]" />
                <h3 className="font-semibold text-[var(--dd-text-main)] text-sm">
                  {t("comparison.deralis.title")}
                </h3>
              </div>
              <ul className="space-y-2 text-[var(--dd-text-muted)] text-sm">
                {(t.raw("comparison.deralis.items") as string[]).map((item: string) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--dd-accent)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--dd-text-main)] mb-2">
            {t("notSure.title")}
          </h2>
          <p className="text-[var(--dd-text-muted)] max-w-xl mx-auto mb-6">
            {t("notSure.description")}
          </p>
          <Link href="/contact" className="btn-primary">
            {tActions("speakToEngineer")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 lg:py-10 bg-[var(--dd-bg-soft)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--dd-text-main)] mb-6 text-center">
            {t("faq.title")}
          </h2>
          <div className="space-y-3">
            {(["cost", "tech", "remote", "takeover"] as const).map((key) => (
              <div
                key={key}
                className="p-4 rounded-xl bg-[var(--dd-bg)] border border-[var(--dd-border)]"
              >
                <h3 className="font-semibold text-[var(--dd-text-main)] mb-1 text-sm">
                  {t(`faq.items.${key}.question`)}
                </h3>
                <p className="text-sm text-[var(--dd-text-muted)]">
                  {t(`faq.items.${key}.answer`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-8 border-t border-[var(--dd-border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[var(--dd-text-muted)] mb-3">
            {t("finalCta.title")}
          </p>
          <Link href="/contact" className="btn-primary">
            {tActions("buildYourSystem")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
