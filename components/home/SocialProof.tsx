"use client";

import { useTranslations } from "next-intl";

export default function SocialProof() {
  const t = useTranslations("home.socialProof");

  const metrics = [
    { key: "metric1" },
    { key: "metric2" },
    { key: "metric3" },
    { key: "metric4" },
  ];

  return (
    <section className="py-12 lg:py-16 bg-[var(--dd-bg)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Outcome statements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.key}
              className="text-center p-4 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)]"
            >
              <p className="text-sm font-medium text-[var(--dd-text-main)]">
                {t(`${metric.key}.label`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
