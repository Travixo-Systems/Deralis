import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function PrivacyPage() {
  const t = useTranslations("privacy");

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
        <p className="text-ink-3 mb-10">{t("lastUpdated")}</p>

        <div className="space-y-10 text-ink-2">
          <p className="text-[17px] leading-[1.65]">{t("intro")}</p>

          <section>
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.dataCollected.title")}</h2>
            <h3 className="text-[17px] font-medium text-ink mb-2">{t("sections.dataCollected.voluntary.title")}</h3>
            <p className="text-[15px] leading-[1.65] mb-3">{t("sections.dataCollected.voluntary.intro")}</p>
            <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px] leading-[1.65]">
              {(t.raw("sections.dataCollected.voluntary.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-[15px] leading-[1.65] mb-6">{t("sections.dataCollected.voluntary.note")}</p>

            <h3 className="text-[17px] font-medium text-ink mb-2">{t("sections.dataCollected.technical.title")}</h3>
            <p className="text-[15px] leading-[1.65] mb-3">{t("sections.dataCollected.technical.intro")}</p>
            <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px] leading-[1.65]">
              {(t.raw("sections.dataCollected.technical.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-[15px] leading-[1.65]">{t("sections.dataCollected.technical.note")}</p>
            <p className="text-[15px] leading-[1.65] mt-3 font-medium text-ink">{t("sections.dataCollected.technical.noTrackers")}</p>
          </section>

          <section>
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.howWeUse.title")}</h2>
            <p className="text-[15px] leading-[1.65] mb-3">{t("sections.howWeUse.intro")}</p>
            <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px] leading-[1.65]">
              {(t.raw("sections.howWeUse.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-[15px] leading-[1.65] font-medium text-ink">{t("sections.howWeUse.noSell")}</p>
          </section>

          <section>
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.legalBasis.title")}</h2>
            <p className="text-[15px] leading-[1.65] mb-3">{t("sections.legalBasis.intro")}</p>
            <ul className="list-disc pl-6 space-y-1 text-[15px] leading-[1.65]">
              <li>{t("sections.legalBasis.items.legitimate")}</li>
              <li>{t("sections.legalBasis.items.contract")}</li>
              <li>{t("sections.legalBasis.items.consent")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.storage.title")}</h2>
            <p className="text-[15px] leading-[1.65] mb-3">{t("sections.storage.intro1")}</p>
            <p className="text-[15px] leading-[1.65] mb-3">{t("sections.storage.intro2")}</p>
            <ul className="list-disc pl-6 space-y-1 text-[15px] leading-[1.65]">
              <li>{t("sections.storage.items.inquiries")}</li>
              <li>{t("sections.storage.items.project")}</li>
              <li>{t("sections.storage.items.analytics")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.sharing.title")}</h2>
            <p className="text-[15px] leading-[1.65] mb-3">{t("sections.sharing.intro")}</p>
            <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px] leading-[1.65]">
              {(t.raw("sections.sharing.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-[15px] leading-[1.65] mb-3">{t("sections.sharing.compliance")}</p>
            <p className="text-[15px] leading-[1.65] font-medium text-ink">{t("sections.sharing.noMarketing")}</p>
          </section>

          <section>
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.rights.title")}</h2>
            <p className="text-[15px] leading-[1.65] mb-3">{t("sections.rights.intro")}</p>
            <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px] leading-[1.65]">
              {(t.raw("sections.rights.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-[15px] leading-[1.65]">
              {t("sections.rights.exercise")}{" "}
              <a href="mailto:contact&#64;deralis.digital" className="text-ink no-underline border-b border-border-warm hover:text-accent hover:border-accent transition-colors">
                contact&#64;deralis.digital
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.cookies.title")}</h2>
            <p className="text-[15px] leading-[1.65] mb-3">{t("sections.cookies.intro")}</p>
            <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px] leading-[1.65]">
              {(t.raw("sections.cookies.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-[15px] leading-[1.65] font-medium text-ink">{t("sections.cookies.noAds")}</p>
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
