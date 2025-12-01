"use client";

import { useTranslations } from "next-intl";
import { Rocket, Building2, RefreshCw } from "lucide-react";

const audienceKeys = ["startups", "smb", "modernization"] as const;

const audienceIcons = {
  startups: Rocket,
  smb: Building2,
  modernization: RefreshCw,
};

export default function WhoWeWorkWith() {
  const t = useTranslations("home.clients");

  return (
    <section className="py-12 lg:py-16">
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

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {audienceKeys.map((key) => {
            const Icon = audienceIcons[key];
            const points = [
              t(`items.${key}.points.0`),
              t(`items.${key}.points.1`),
              t(`items.${key}.points.2`),
            ];

            return (
              <div
                key={key}
                className="gradient-border p-6"
              >
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[var(--dd-accent)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--dd-text-main)] mb-2">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-sm text-[var(--dd-text-muted)] mb-4">
                  {t(`items.${key}.description`)}
                </p>
                <ul className="space-y-1">
                  {points.map((point, index) => (
                    <li
                      key={index}
                      className="text-xs text-[var(--dd-text-dim)] flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-[var(--dd-accent)]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
