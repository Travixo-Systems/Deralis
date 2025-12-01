"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Lightbulb, Code2, Bot, Settings } from "lucide-react";

const serviceKeys = ["consulting", "development", "ai", "support"] as const;

const serviceIcons = {
  consulting: Lightbulb,
  development: Code2,
  ai: Bot,
  support: Settings,
};

const serviceHrefs = {
  consulting: "/services#consulting",
  development: "/services#development",
  ai: "/services#ai",
  support: "/services#automation",
};

export default function Services() {
  const t = useTranslations("home.services");
  const tActions = useTranslations("common.actions");

  return (
    <section className="py-12 lg:py-16 bg-[var(--dd-bg-soft)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-3">
            {t("title")} <span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
          <p className="text-[var(--dd-text-muted)] max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {serviceKeys.map((key) => {
            const Icon = serviceIcons[key];
            const features = [
              t(`items.${key}.features.0`),
              t(`items.${key}.features.1`),
              t(`items.${key}.features.2`),
            ];

            return (
              <div
                key={key}
                className="p-5 rounded-xl bg-[var(--dd-bg)] border border-[var(--dd-border)] card-hover flex flex-col"
              >
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[var(--dd-accent)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--dd-text-main)] mb-2">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-sm text-[var(--dd-text-muted)] mb-4 flex-grow">
                  {t(`items.${key}.description`)}
                </p>
                <ul className="space-y-1 mb-4">
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      className="text-xs text-[var(--dd-text-dim)] flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-[var(--dd-accent)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={serviceHrefs[key]}
                  className="text-[var(--dd-accent)] text-sm font-medium hover:underline inline-flex items-center gap-1"
                >
                  {t(`cta.${key}`)}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/services" className="btn-secondary">
            {tActions("viewAllServices")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
