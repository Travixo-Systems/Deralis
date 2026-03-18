"use client";

import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";

export default function SocialProof() {
  const t = useTranslations("home.socialProof");

  const testimonials = [
    { key: "testimonial1" },
    { key: "testimonial2" },
    { key: "testimonial3" },
  ];

  const metrics = [
    { key: "metric1" },
    { key: "metric2" },
    { key: "metric3" },
    { key: "metric4" },
  ];

  return (
    <section className="py-12 lg:py-16 bg-[var(--dd-bg)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--dd-text-main)] mb-3">
            {t("title")}{" "}
            <span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
          <p className="text-[var(--dd-text-muted)] max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Metrics bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {metrics.map((metric) => (
            <div
              key={metric.key}
              className="text-center p-4 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)]"
            >
              <p className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
                {t(`${metric.key}.value`)}
              </p>
              <p className="text-sm text-[var(--dd-text-muted)]">
                {t(`${metric.key}.label`)}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.key}
              className="relative p-6 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)] card-hover"
            >
              <Quote className="w-8 h-8 text-[var(--dd-accent)] opacity-30 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[var(--dd-accent)] text-[var(--dd-accent)]"
                  />
                ))}
              </div>

              <p className="text-[var(--dd-text-muted)] text-sm mb-4 leading-relaxed italic">
                &ldquo;{t(`${testimonial.key}.quote`)}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[var(--dd-grad-from)] to-[var(--dd-grad-to)] flex items-center justify-center text-[var(--dd-bg)] font-bold text-sm">
                  {t(`${testimonial.key}.initials`)}
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--dd-text-main)]">
                    {t(`${testimonial.key}.name`)}
                  </p>
                  <p className="text-xs text-[var(--dd-text-dim)]">
                    {t(`${testimonial.key}.role`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
