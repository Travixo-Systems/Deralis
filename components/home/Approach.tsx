"use client";

import { useTranslations } from "next-intl";
import { MessageSquare, FileSearch, Code2, Rocket } from "lucide-react";

const stepKeys = ["step1", "step2", "step3", "step4"] as const;

const stepIcons = {
  step1: MessageSquare,
  step2: FileSearch,
  step3: Code2,
  step4: Rocket,
};

export default function Approach() {
  const t = useTranslations("home.approach");

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

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stepKeys.map((key, index) => {
            const Icon = stepIcons[key];

            return (
              <div key={key} className="relative">
                {/* Connector line (hidden on mobile and last item) */}
                {index < stepKeys.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-[2px] bg-gradient-to-r from-[var(--dd-border)] to-transparent" />
                )}

                <div className="p-5 rounded-xl bg-[var(--dd-bg)] border border-[var(--dd-border)] card-hover h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[var(--dd-accent)]" />
                    </div>
                    <span className="text-[var(--dd-accent)] font-mono font-bold text-sm">
                      {t(`steps.${key}.number`)}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[var(--dd-text-main)] mb-2">
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p className="text-sm text-[var(--dd-text-muted)]">
                    {t(`steps.${key}.description`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
