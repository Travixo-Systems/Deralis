"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  const t = useTranslations("terms");
  const tActions = useTranslations("common.actions");

  return (
    <section className="pt-24 pb-16 lg:pt-28 lg:pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--dd-text-muted)] hover:text-[var(--dd-text-main)] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {tActions("backToHome")}
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-4">
          {t("title")}
        </h1>
        <p className="text-[var(--dd-text-dim)] mb-8">
          {t("lastUpdated")}
        </p>

        <div className="prose prose-invert max-w-none space-y-8 text-[var(--dd-text-muted)]">
          <p className="text-lg">
            {t("intro")}
          </p>

          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              {t("sections.websiteUse.title")}
            </h2>
            <p className="mb-3">
              {t("sections.websiteUse.intro")}
            </p>
            <ul className="list-disc pl-6 space-y-1">
              {(t.raw("sections.websiteUse.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              {t("sections.services.title")}
            </h2>
            <p className="mb-3">{t("sections.services.intro")}</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              {(t.raw("sections.services.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="font-medium text-[var(--dd-text-main)]">
              {t("sections.services.note")}
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              {t("sections.quotes.title")}
            </h2>
            <p className="mb-3">{t("sections.quotes.intro")}</p>
            <ul className="list-disc pl-6 space-y-1">
              {(t.raw("sections.quotes.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              {t("sections.payment.title")}
            </h2>
            <p className="mb-3">
              {t("sections.payment.intro")}
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              {(t.raw("sections.payment.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="font-medium text-[var(--dd-text-main)]">
              {t("sections.payment.late")}
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              {t("sections.ip.title")}
            </h2>
            <p className="mb-3">{t("sections.ip.intro")}</p>
            <ul className="list-disc pl-6 space-y-1">
              {(t.raw("sections.ip.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              {t("sections.confidentiality.title")}
            </h2>
            <p>
              {t("sections.confidentiality.content")}
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              {t("sections.liability.title")}
            </h2>
            <p className="mb-3">{t("sections.liability.intro")}</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              {(t.raw("sections.liability.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="font-medium text-[var(--dd-text-main)]">
              {t("sections.liability.limit")}
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              {t("sections.termination.title")}
            </h2>
            <p>
              {t("sections.termination.content")}
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              {t("sections.law.title")}
            </h2>
            <p>
              {t("sections.law.content")}
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              {t("sections.contact.title")}
            </h2>
            <p>
              {t("sections.contact.intro")}{" "}
              <a href="mailto:contact@deralis.digital" className="text-[var(--dd-accent)] hover:underline">
                contact@deralis.digital
              </a>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
