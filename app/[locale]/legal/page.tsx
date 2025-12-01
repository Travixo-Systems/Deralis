"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export default function LegalPage() {
  const t = useTranslations("legal");
  const tActions = useTranslations("common.actions");
  const tLegal = useTranslations("common.legal");

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
          {t("subtitle")}
        </p>

        <div className="prose prose-invert max-w-none space-y-8 text-[var(--dd-text-muted)]">
          {/* Site Publisher */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              {t("sections.publisher.title")}
            </h2>
            <ul className="list-none space-y-2">
              <li>
                <strong className="text-[var(--dd-text-main)]">{t("sections.publisher.fields.name")}:</strong> {t("sections.publisher.fields.nameValue")}
              </li>
              <li>
                <strong className="text-[var(--dd-text-main)]">{t("sections.publisher.fields.form")}:</strong> {t("sections.publisher.fields.formValue")}
              </li>
              <li>
                <strong className="text-[var(--dd-text-main)]">{t("sections.publisher.fields.address")}:</strong> {t("sections.publisher.fields.addressValue")}
              </li>
              <li>
                <strong className="text-[var(--dd-text-main)]">{t("sections.publisher.fields.email")}:</strong>{" "}
                <a href="mailto:contact@deralis.digital" className="text-[var(--dd-accent)] hover:underline">
                  contact@deralis.digital
                </a>
              </li>
              <li>
                <strong className="text-[var(--dd-text-main)]">{t("sections.publisher.fields.director")}:</strong> {t("sections.publisher.fields.directorValue")}
              </li>
            </ul>
          </section>

          {/* Hosting */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              {t("sections.hosting.title")}
            </h2>
            <ul className="list-none space-y-2">
              <li>
                <strong className="text-[var(--dd-text-main)]">{t("sections.hosting.fields.provider")}:</strong> {t("sections.hosting.fields.providerValue")}
              </li>
              <li>
                <strong className="text-[var(--dd-text-main)]">{t("sections.hosting.fields.address")}:</strong> {t("sections.hosting.fields.addressValue")}
              </li>
              <li>
                <strong className="text-[var(--dd-text-main)]">{t("sections.hosting.fields.website")}:</strong>{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--dd-accent)] hover:underline"
                >
                  https://vercel.com
                </a>
              </li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              {t("sections.ip.title")}
            </h2>
            <p>
              {t("sections.ip.content")}
            </p>
          </section>

          {/* Liability */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              {t("sections.liability.title")}
            </h2>
            <p>
              {t("sections.liability.content")}
            </p>
          </section>

          {/* Personal Data */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              {t("sections.personalData.title")}
            </h2>
            <p>
              {t("sections.personalData.content")}{" "}
              <Link href="/privacy" className="text-[var(--dd-accent)] hover:underline">
                {t("sections.personalData.link")}
              </Link>
              .
            </p>
          </section>

          {/* Contact */}
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
