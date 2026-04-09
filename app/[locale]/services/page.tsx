import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import CTAPrimary from "@/components/shared/CTAPrimary";
import CTASecondary from "@/components/shared/CTASecondary";
import SectionHeading from "@/components/shared/SectionHeading";
import ServiceBlock from "@/components/services/ServiceBlock";
import AuditCTA from "@/components/shared/AuditCTA";
import OngoingSupport from "@/components/services/OngoingSupport";
import QuestionList from "@/components/shared/QuestionList";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ServicesHero />
      <CoreServices />
      <AuditCTA />
      <OngoingSupport />
      <QuestionsSection />
      <ServicesFinalCTA />
    </>
  );
}

function ServicesHero() {
  const t = useTranslations("services.page.hero");
  const tActions = useTranslations("common.actions");

  return (
    <section className="py-8 pb-[52px] max-md:py-6 max-md:pb-[34px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="max-w-[820px]">
          <p className="text-base text-ink-label font-medium tracking-[0.01em] mb-7 max-md:text-[15px] max-md:mb-5">
            {t("eyebrow")}
          </p>
          <h1
            className="text-[60px] leading-[1.05] font-medium tracking-[-0.025em] mb-8 max-md:text-[36px] max-md:mb-6"
            dangerouslySetInnerHTML={{ __html: t("headline") }}
          />
          <p className="text-[20px] leading-[1.6] text-ink-2 mb-9 max-w-[640px] max-md:text-[17px]">
            {t("description")}
          </p>
          <div className="flex items-center gap-8 flex-wrap">
            <CTAPrimary href="/audit">{tActions("discoverAudit")}</CTAPrimary>
            <CTASecondary href="/projects">{tActions("viewOurWork")}</CTASecondary>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoreServices() {
  const t = useTranslations("services.page");

  const blocks = ["1", "2", "3"] as const;

  return (
    <section className="bg-bg-deep border-t border-border-default pt-[60px] pb-6 max-md:pt-[44px] max-md:pb-4">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <SectionHeading
          eyebrow={t("coreServices.eyebrow")}
          title={t("coreServices.title")}
          className="mb-14 max-md:mb-8"
        />

        {blocks.map((num) => {
          const meta = [
            {
              label: t(`blocks.${num}.meta.whoLabel`),
              value: t(`blocks.${num}.meta.whoValue`),
              bold: false,
            },
            {
              label: t(`blocks.${num}.meta.timelineLabel`),
              value: t(`blocks.${num}.meta.timelineValue`),
              bold: false,
            },
            {
              label: t(`blocks.${num}.meta.investmentLabel`),
              value: t(`blocks.${num}.meta.investmentValue`),
              bold: num === "1",
            },
          ];

          const prose = [t(`blocks.${num}.prose1`), t(`blocks.${num}.prose2`)];
          if (num !== "1") {
            prose.push(t(`blocks.${num}.prose3`));
          }

          return (
            <ServiceBlock
              key={num}
              num={t(`blocks.${num}.num`)}
              name={t(`blocks.${num}.name`)}
              meta={meta}
              prose={prose}
              richProseIndices={num === "1" ? [1] : undefined}
              id={
                num === "1"
                  ? "audit"
                  : num === "2"
                  ? "custom"
                  : "extensions"
              }
            />
          );
        })}
      </div>
    </section>
  );
}

function QuestionsSection() {
  const t = useTranslations("services.page.questions");

  const items = ["1", "2", "3", "4"].map((num) => ({
    question: t(`items.${num}.question`),
    answer: t(`items.${num}.answer`),
  }));

  return (
    <section className="py-[60px] max-md:py-[42px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          className="mb-10 max-md:mb-7"
        />
        <QuestionList items={items} />
      </div>
    </section>
  );
}

function ServicesFinalCTA() {
  const t = useTranslations("services.page.finalCta");
  const tActions = useTranslations("common.actions");

  return (
    <section className="border-t border-border-default py-[60px] pb-[34px] max-md:py-[44px] max-md:pb-7">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12 text-center">
        <div className="max-w-[720px] mx-auto">
          <h2
            className="text-[42px] leading-[1.1] font-medium tracking-[-0.025em] mb-[22px] max-md:text-[26px]"
            dangerouslySetInnerHTML={{ __html: t("headline") }}
          />
          <p className="text-[18px] leading-[1.6] text-ink-2 mb-8 max-w-[580px] mx-auto max-md:text-base">
            {t("description")}
          </p>
          <div className="flex items-center justify-center gap-7 flex-wrap">
            <CTAPrimary href="/audit">{tActions("discoverAudit")}</CTAPrimary>
            <a
              href="mailto:contact&#64;deralis.digital"
              className="text-[15px] font-medium text-ink no-underline border-b border-transparent pb-[2px] hover:border-ink transition-[border-color] duration-150"
            >
              contact&#64;deralis.digital
            </a>
          </div>
          <p className="mt-6 text-[13px] text-ink-3">{t("note")}</p>
        </div>
      </div>
    </section>
  );
}
