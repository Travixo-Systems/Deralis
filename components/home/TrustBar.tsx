"use client";

import { useTranslations } from "next-intl";

const itemKeys = ["item1", "item2", "item3", "item4"] as const;

export default function TrustBar() {
  const t = useTranslations("home.trustBar");

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3">
          {itemKeys.map((key) => (
            <span
              key={key}
              className="text-sm text-[var(--dd-text-muted)] px-3.5 py-2 rounded-full"
              style={{ border: "0.5px solid var(--dd-border)" }}
            >
              {t(key)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
