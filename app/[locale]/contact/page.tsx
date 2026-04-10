import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ContactForm from "@/components/contact/ContactForm";
import AuditCTA from "@/components/shared/AuditCTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.page" });
  const title = t("metadata.title");
  const description = t("metadata.description");
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website" as const,
      url: `https://www.deralis.digital/${locale}/contact`,
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContactHero />
      <FormSection />
      <NextStrip />
      <MethodsSection />
      <AuditCTA />
    </>
  );
}

async function ContactHero() {
  const t = await getTranslations("contact.page.hero");

  return (
    <section className="py-8 pb-[52px] max-md:py-6 max-md:pb-[34px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="max-w-[760px]">
          <p className="text-base text-ink-label font-medium tracking-[0.01em] mb-7 max-md:text-[15px] max-md:mb-5">
            {t("eyebrow")}
          </p>
          <h1
            className="text-[64px] leading-[1.04] font-medium tracking-[-0.025em] mb-8 max-md:text-[38px] max-md:mb-6"
            dangerouslySetInnerHTML={{ __html: t("title") }}
          />
          <div className="max-w-[620px]">
            <p className="text-ink font-medium text-[22px] leading-[1.6] mb-4 max-md:text-[19px]">
              {t("sub1Prefix")}{" "}
              <Link
                href="/audit"
                className="text-ink no-underline border-b border-ink pb-[1px] hover:text-accent hover:border-accent transition-colors"
              >
                {t("sub1LinkText")}
              </Link>
              {t("sub1Suffix")}
            </p>
            <p className="text-ink-2-soft text-[20px] leading-[1.6] max-md:text-[17px]">
              {t("sub2")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

async function FormSection() {
  const t = await getTranslations("contact.page.formIntro");

  return (
    <section className="border-t border-border-default py-[60px] max-md:py-[42px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <div className="mb-10 max-md:mb-8">
            <p className="text-ink font-medium text-[18px] leading-[1.6] mb-3.5 max-md:text-base">
              {t("p1")}
            </p>
            <p className="text-[18px] leading-[1.6] text-ink-2 max-md:text-base">
              {t("p2")}
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

async function NextStrip() {
  const t = await getTranslations("contact.page.nextStrip");

  const steps = [t("step1"), t("step2"), t("step3")];

  return (
    <div className="bg-bg-cta border-y border-border-cool py-6 max-md:py-[18px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12 flex items-center gap-5 flex-wrap max-md:gap-3.5">
        <span className="text-[14px] text-ink-cool-label tracking-[0.03em] font-semibold mr-3 max-md:text-[13px]">
          {t("label")}
        </span>
        {steps.map((step, i) => (
          <span key={i} className="flex items-center gap-5 max-md:gap-3.5">
            {i > 0 && (
              <span className="text-[14px] text-ink-3" aria-hidden="true">→</span>
            )}
            <span className="text-[15px] text-ink font-medium max-md:text-[14px]">
              {step}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

async function MethodsSection() {
  const t = await getTranslations("contact.page.methods");

  const methods = [
    {
      heading: t("emailHeading"),
      content: (
        <a
          href="mailto:contact&#64;deralis.digital"
          className="text-ink no-underline border-b border-border-warm pb-[1px] hover:text-accent hover:border-accent transition-colors"
        >
          contact&#64;deralis.digital
        </a>
      ),
    },
    {
      heading: t("locationHeading"),
      content: (
        <>
          <span>{t("locationValue")}</span>
          <span className="text-ink-2 block mt-1.5 text-[14px]">{t("locationMuted")}</span>
        </>
      ),
    },
    {
      heading: t("languagesHeading"),
      content: (
        <>
          <span>{t("languagesValue")}</span>
          <span className="text-ink-2 block mt-1.5 text-[14px]">{t("languagesMuted")}</span>
        </>
      ),
    },
  ];

  return (
    <section className="py-[60px] max-md:py-[42px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {methods.map((method) => (
            <div key={method.heading} className="border-l border-border-warm pl-8 pt-1.5 max-md:pl-6">
              <h3 className="text-[14px] text-ink-label font-semibold tracking-[0.03em] mb-3.5">
                {method.heading}
              </h3>
              <div className="text-[15px] leading-[1.7] text-ink">
                {method.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
