import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function LegalPage() {
  const t = useTranslations("legal");

  return (
    <section className="py-[60px] max-md:py-[42px]">
      <div className="mx-auto max-w-[820px] px-6 md:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-ink mb-8 transition-colors no-underline"
        >
          ← {t("title")}
        </Link>

        <h1 className="text-[36px] font-medium text-ink tracking-[-0.02em] mb-3 max-md:text-[28px]">
          {t("title")}
        </h1>
        <p className="text-ink-3 mb-10">
          {t("subtitle")}
        </p>

        <div className="space-y-10 text-ink-2">
          <section>
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.publisher.title")}</h2>
            <ul className="list-none space-y-2 text-[15px] leading-[1.65]">
              <li><strong className="text-ink font-medium">{t("sections.publisher.fields.name")}:</strong> {t("sections.publisher.fields.nameValue")}</li>
              <li><strong className="text-ink font-medium">{t("sections.publisher.fields.form")}:</strong> {t("sections.publisher.fields.formValue")}</li>
              <li><strong className="text-ink font-medium">{t("sections.publisher.fields.siret")}:</strong> {t("sections.publisher.fields.siretValue")}</li>
              <li><strong className="text-ink font-medium">{t("sections.publisher.fields.address")}:</strong> {t("sections.publisher.fields.addressValue")}</li>
              <li>
                <strong className="text-ink font-medium">{t("sections.publisher.fields.email")}:</strong>{" "}
                <a href="mailto:contact&#64;deralis.digital" className="text-ink no-underline border-b border-border-warm hover:text-accent hover:border-accent transition-colors">
                  contact&#64;deralis.digital
                </a>
              </li>
              <li><strong className="text-ink font-medium">{t("sections.publisher.fields.vat")}:</strong> {t("sections.publisher.fields.vatValue")}</li>
              <li><strong className="text-ink font-medium">{t("sections.publisher.fields.director")}:</strong> {t("sections.publisher.fields.directorValue")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.hosting.title")}</h2>
            <ul className="list-none space-y-2 text-[15px] leading-[1.65]">
              <li><strong className="text-ink font-medium">{t("sections.hosting.fields.provider")}:</strong> {t("sections.hosting.fields.providerValue")}</li>
              <li><strong className="text-ink font-medium">{t("sections.hosting.fields.address")}:</strong> {t("sections.hosting.fields.addressValue")}</li>
              <li>
                <strong className="text-ink font-medium">{t("sections.hosting.fields.website")}:</strong>{" "}
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-ink no-underline border-b border-border-warm hover:text-accent hover:border-accent transition-colors">
                  https://vercel.com
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.ip.title")}</h2>
            <p className="text-[15px] leading-[1.65]">{t("sections.ip.content")}</p>
          </section>

          <section>
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.liability.title")}</h2>
            <p className="text-[15px] leading-[1.65]">{t("sections.liability.content")}</p>
          </section>

          <section>
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.personalData.title")}</h2>
            <p className="text-[15px] leading-[1.65]">
              {t("sections.personalData.content")}{" "}
              <Link href="/privacy" className="text-ink no-underline border-b border-border-warm hover:text-accent hover:border-accent transition-colors">
                {t("sections.personalData.link")}
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.contact.title")}</h2>
            <p className="text-[15px] leading-[1.65]">
              {t("sections.contact.intro")}{" "}
              <a href="mailto:contact&#64;deralis.digital" className="text-ink no-underline border-b border-border-warm hover:text-accent hover:border-accent transition-colors">
                contact&#64;deralis.digital
              </a>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
