"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  const t = useTranslations("privacy");
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
              {t("sections.dataCollected.title")}
            </h2>

            <h3 className="text-lg font-medium text-[var(--dd-text-main)] mb-2">
              {t("sections.dataCollected.voluntary.title")}
            </h3>
            <p className="mb-3">
              {t("sections.dataCollected.voluntary.intro")}
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              {(t.raw("sections.dataCollected.voluntary.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mb-6">{t("sections.dataCollected.voluntary.note")}</p>

            <h3 className="text-lg font-medium text-[var(--dd-text-main)] mb-2">
              {t("sections.dataCollected.technical.title")}
            </h3>
            <p className="mb-3">
              {t("sections.dataCollected.technical.intro")}
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              {(t.raw("sections.dataCollected.technical.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>{t("sections.dataCollected.technical.note")}</p>
            <p className="mt-3 font-medium text-[var(--dd-text-main)]">
              {t("sections.dataCollected.technical.noTrackers")}
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              {t("sections.howWeUse.title")}
            </h2>
            <p className="mb-3">{t("sections.howWeUse.intro")}</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              {(t.raw("sections.howWeUse.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="font-medium text-[var(--dd-text-main)]">
              {t("sections.howWeUse.noSell")}
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              {t("sections.legalBasis.title")}
            </h2>
            <p className="mb-3">{t("sections.legalBasis.intro")}</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong className="text-[var(--dd-text-main)]">{t("sections.legalBasis.items.legitimate")}</strong></li>
              <li><strong className="text-[var(--dd-text-main)]">{t("sections.legalBasis.items.contract")}</strong></li>
              <li><strong className="text-[var(--dd-text-main)]">{t("sections.legalBasis.items.consent")}</strong></li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              {t("sections.storage.title")}
            </h2>
            <p className="mb-3">
              {t("sections.storage.intro1")}
            </p>
            <p className="mb-3">{t("sections.storage.intro2")}</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong className="text-[var(--dd-text-main)]">{t("sections.storage.items.inquiries")}</strong></li>
              <li><strong className="text-[var(--dd-text-main)]">{t("sections.storage.items.project")}</strong></li>
              <li><strong className="text-[var(--dd-text-main)]">{t("sections.storage.items.analytics")}</strong></li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              {t("sections.sharing.title")}
            </h2>
            <p className="mb-3">{t("sections.sharing.intro")}</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              {(t.raw("sections.sharing.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mb-3">{t("sections.sharing.compliance")}</p>
            <p className="font-medium text-[var(--dd-text-main)]">
              {t("sections.sharing.noMarketing")}
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              {t("sections.rights.title")}
            </h2>
            <p className="mb-3">{t("sections.rights.intro")}</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              {(t.raw("sections.rights.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              {t("sections.rights.exercise")}{" "}
              <a href="mailto:contact@deralis.digital" className="text-[var(--dd-accent)] hover:underline">
                contact@deralis.digital
              </a>
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              {t("sections.cookies.title")}
            </h2>
            <p className="mb-3">{t("sections.cookies.intro")}</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              {(t.raw("sections.cookies.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="font-medium text-[var(--dd-text-main)]">
              {t("sections.cookies.noAds")}
            </p>
          </section>

          {/* Section 8 */}
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
