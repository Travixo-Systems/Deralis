"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

const faqKeys = ["pricing", "tools", "timeline", "remote", "support"] as const;

export default function FAQ() {
  const t = useTranslations("home.faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-3">
            {t("title")} <span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
          <p className="text-[var(--dd-text-muted)]">
            {t("description")}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqKeys.map((key, index) => (
            <div
              key={key}
              className="rounded-xl border border-[var(--dd-border)] bg-[var(--dd-bg-card)] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--dd-bg-soft)] transition-colors"
              >
                <span className="font-medium text-[var(--dd-text-main)] text-sm">
                  {t(`items.${key}.question`)}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[var(--dd-text-muted)] transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-[var(--dd-text-muted)] leading-relaxed">
                    {t(`items.${key}.answer`)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
