"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Mail } from "lucide-react";

export default function FinalCTA() {
  const t = useTranslations("home.cta");
  const tActions = useTranslations("common.actions");

  return (
    <section className="py-12 lg:py-16 bg-[var(--dd-bg-soft)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="gradient-border p-8 lg:p-12 text-center relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--dd-grad-from)]/5 to-[var(--dd-grad-to)]/5" />

          <div className="relative">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--dd-text-main)] mb-3">
              {t("title")}
            </h2>
            <p className="text-[var(--dd-text-muted)] max-w-xl mx-auto mb-6">
              {t("description")}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Link href="/contact" className="btn-primary">
                {tActions("speakToEngineer")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:contact@deralis.digital"
                className="btn-secondary"
              >
                <Mail className="w-4 h-4" />
                contact@deralis.digital
              </a>
            </div>

            <p className="text-xs text-[var(--dd-text-dim)]">
              {t("note")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
