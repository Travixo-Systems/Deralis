"use client";

import { useTranslations } from "next-intl";
import { Shield, Clock, Globe, Award } from "lucide-react";

export default function TrustBar() {
  const t = useTranslations("home.trustBar");

  const items = [
    { icon: Shield, key: "item1" },
    { icon: Clock, key: "item2" },
    { icon: Globe, key: "item3" },
    { icon: Award, key: "item4" },
  ];

  return (
    <section className="py-6 bg-[var(--dd-bg-card)] border-y border-[var(--dd-border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {items.map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              <item.icon className="w-4 h-4 text-[var(--dd-accent)]" />
              <span className="text-sm text-[var(--dd-text-muted)]">
                {t(item.key)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
