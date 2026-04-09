import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function TermsPage() {
  const t = useTranslations("terms");

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
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.websiteUse.title")}</h2>
            <p className="text-[15px] leading-[1.65] mb-3">{t("sections.websiteUse.intro")}</p>
            <ul className="list-disc pl-6 space-y-1 text-[15px] leading-[1.65]">
              {(t.raw("sections.websiteUse.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.services.title")}</h2>
            <p className="text-[15px] leading-[1.65] mb-3">{t("sections.services.intro")}</p>
            <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px] leading-[1.65]">
              {(t.raw("sections.services.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-[15px] leading-[1.65] font-medium text-ink">{t("sections.services.note")}</p>
          </section>

          <section>
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.quotes.title")}</h2>
            <p className="text-[15px] leading-[1.65] mb-3">{t("sections.quotes.intro")}</p>
            <ul className="list-disc pl-6 space-y-1 text-[15px] leading-[1.65]">
              {(t.raw("sections.quotes.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.payment.title")}</h2>
            <p className="text-[15px] leading-[1.65] mb-3">{t("sections.payment.intro")}</p>
            <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px] leading-[1.65]">
              {(t.raw("sections.payment.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-[15px] leading-[1.65] font-medium text-ink">{t("sections.payment.late")}</p>
          </section>

          <section>
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.ip.title")}</h2>
            <p className="text-[15px] leading-[1.65] mb-3">{t("sections.ip.intro")}</p>
            <ul className="list-disc pl-6 space-y-1 text-[15px] leading-[1.65]">
              {(t.raw("sections.ip.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.confidentiality.title")}</h2>
            <p className="text-[15px] leading-[1.65]">{t("sections.confidentiality.content")}</p>
          </section>

          <section>
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.liability.title")}</h2>
            <p className="text-[15px] leading-[1.65] mb-3">{t("sections.liability.intro")}</p>
            <ul className="list-disc pl-6 space-y-1 mb-4 text-[15px] leading-[1.65]">
              {(t.raw("sections.liability.items") as string[]).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-[15px] leading-[1.65] font-medium text-ink">{t("sections.liability.limit")}</p>
          </section>

          <section>
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.termination.title")}</h2>
            <p className="text-[15px] leading-[1.65]">{t("sections.termination.content")}</p>
          </section>

          <section>
            <h2 className="text-[20px] font-medium text-ink mb-4">{t("sections.law.title")}</h2>
            <p className="text-[15px] leading-[1.65]">{t("sections.law.content")}</p>
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
