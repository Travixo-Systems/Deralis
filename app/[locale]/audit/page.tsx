import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import SectionHeading from "@/components/shared/SectionHeading";
import QuestionList from "@/components/shared/QuestionList";
import AuditCTA from "@/components/shared/AuditCTA";

type Props = {
  params: Promise<{ locale: string }>;
};

const stripeLink = process.env.NEXT_PUBLIC_STRIPE_AUDIT_LINK || "#";

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "audit.page" });
  const title = t("metadata.title");
  const description = t("metadata.description");
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website" as const,
      url: `https://www.deralis.digital/${locale}/audit`,
    },
  };
}

export default async function AuditPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AuditHero />
      <WalkawaySection />
      <InPracticeSection />
      <DeliverablesSection />
      <FlowStrip />
      <NotForSection />
      <RefundSection />
      <TailCTA />
      <FAQSection />
    </>
  );
}

function AuditHero() {
  const t = useTranslations("audit.page.hero");
  const tActions = useTranslations("common.actions");

  return (
    <section className="pt-14 pb-14 max-md:pt-10 max-md:pb-10">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="max-w-[820px]">
          <p className="text-base text-ink-label font-medium tracking-[0.01em] mb-7 max-md:text-[15px] max-md:mb-5">
            {t("eyebrow")}
          </p>
          <h1
            className="text-[60px] leading-[1.05] font-medium tracking-[-0.025em] mb-7 max-w-[780px] max-md:text-[38px] max-md:mb-[22px]"
            dangerouslySetInnerHTML={{ __html: t("headline") }}
          />
          <div className="mb-9 max-w-[680px] max-md:mb-7">
            <p className="text-ink-2-soft text-[20px] leading-[1.6] mb-3.5 max-md:text-[17px]">
              {t("sub1")}
            </p>
            <p className="text-ink-2-soft text-[20px] leading-[1.6] mb-3.5 max-md:text-[17px]">
              {t("sub2")}
            </p>
            <p className="text-ink-2-soft text-[20px] leading-[1.6] max-md:text-[17px]">
              {t("sub3")}
            </p>
          </div>
          <a
            href={stripeLink}
            className="group inline-flex items-center gap-2.5 px-7 py-[17px] bg-ink text-bg text-[15px] font-medium rounded-lg transition-colors hover:bg-accent no-underline"
          >
            {tActions("startAudit")}
            <span aria-hidden="true" className="transition-transform duration-[180ms] group-hover:translate-x-[3px]">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function WalkawaySection() {
  const t = useTranslations("audit.page.walkaway");

  return (
    <section className="bg-bg-deep border-y border-border-default py-[72px] max-md:py-12">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
        />
        <div className="max-w-[820px]">
          {(t.raw("items") as string[]).map((item, i) => (
            <div
              key={i}
              className={`py-6 border-t border-border-default max-md:py-5 ${
                i === 3 ? "border-b border-border-default" : ""
              }`}
            >
              <h3 className="text-[20px] font-medium text-ink leading-[1.35] max-md:text-[18px]">
                {item}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InPracticeSection() {
  const t = useTranslations("audit.page.inPractice");
  const tActions = useTranslations("common.actions");

  const steps = ["1", "2", "3", "4", "5"] as const;

  return (
    <section className="py-[72px] max-md:py-12">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        {/* Disclaimer */}
        <div className="border-l-2 border-border-warm pl-[22px] mb-10 max-w-[640px] max-md:pl-[18px] max-md:mb-7">
          <p className="text-[15px] font-medium text-ink leading-[1.55] max-md:text-[14px]">
            {t("disclaimerLead")}
          </p>
          <p className="text-[14px] text-ink-2 leading-[1.6] mt-1.5 max-md:text-[13px]">
            {t("disclaimerBody")}
          </p>
        </div>

        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
        />

        <div className="max-w-[820px]">
          {steps.map((num, i) => (
            <div
              key={num}
              className={`py-6 border-t border-border-default max-md:py-5 ${
                i === steps.length - 1 ? "border-b border-border-default" : ""
              }`}
            >
              <h3 className="text-[20px] font-medium text-ink leading-[1.35] mb-3 max-md:text-[18px]">
                {t(`steps.${num}.heading`)}
              </h3>
              <p className="text-base leading-[1.65] text-ink-2 max-w-[720px] max-md:text-[15px]">
                {t(`steps.${num}.body`)}
              </p>
            </div>
          ))}
        </div>

        {/* Mid-page CTA */}
        <div className="flex items-center justify-start gap-6 flex-wrap mt-11 pt-8 border-t border-border-default">
          <a
            href={stripeLink}
            className="group inline-flex items-center gap-2.5 px-7 py-[17px] bg-ink text-bg text-[15px] font-medium rounded-lg transition-colors hover:bg-accent no-underline"
          >
            {tActions("startAudit")}
            <span aria-hidden="true" className="transition-transform duration-[180ms] group-hover:translate-x-[3px]">
              →
            </span>
          </a>
          <p className="text-[14px] text-ink-2 max-w-[420px]">
            {t("midCtaNote")}
          </p>
        </div>
      </div>
    </section>
  );
}

function DeliverablesSection() {
  const t = useTranslations("audit.page.deliverables");

  return (
    <section className="py-[72px] max-md:py-12">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
        />
        <div className="max-w-[820px]">
          {(t.raw("items") as string[]).map((item, i, arr) => (
            <div
              key={i}
              className={`py-6 border-t border-border-default max-md:py-5 ${
                i === arr.length - 1 ? "border-b border-border-default" : ""
              }`}
            >
              <h3 className="text-[20px] font-medium text-ink leading-[1.35] max-md:text-[18px]">
                {item}
              </h3>
            </div>
          ))}

          <p className="text-[14px] text-ink-label tracking-[0.03em] font-semibold mt-12 mb-1 max-md:mt-9">
            {t("notIncludedLabel")}
          </p>

          {(t.raw("excludes") as string[]).map((item, i, arr) => (
            <div
              key={i}
              className={`py-6 border-t border-border-default max-md:py-5 ${
                i === arr.length - 1 ? "border-b border-border-default" : ""
              }`}
            >
              <h3 className="text-[20px] font-medium text-ink-label leading-[1.35] max-md:text-[18px]">
                {item}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FlowStrip() {
  const t = useTranslations("audit.page.flow");

  const steps = ["step1", "step2", "step3", "step4"] as const;

  return (
    <div className="bg-bg-cta border-y border-border-cool py-6 max-md:py-[18px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12 flex items-center gap-5 flex-wrap max-md:gap-3.5">
        <span className="text-[14px] text-ink-cool-label tracking-[0.03em] font-semibold mr-3 max-md:text-[13px]">
          {t("label")}
        </span>
        {steps.map((step, i) => (
          <span key={step} className="flex items-center gap-5 max-md:gap-3.5">
            {i > 0 && (
              <span className="text-[14px] text-ink-3" aria-hidden="true">→</span>
            )}
            <span className="text-[15px] text-ink font-medium max-md:text-[14px]">
              {t(step)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function NotForSection() {
  const t = useTranslations("audit.page.notFor");

  return (
    <section className="py-[72px] max-md:py-12">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
        />
        <div className="max-w-[820px]">
          {(t.raw("items") as string[]).map((item, i, arr) => (
            <div
              key={i}
              className={`py-6 border-t border-border-default max-md:py-5 ${
                i === arr.length - 1 ? "border-b border-border-default" : ""
              }`}
            >
              <h3 className="text-[20px] font-medium text-ink-label leading-[1.35] max-md:text-[18px]">
                {item}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RefundSection() {
  const t = useTranslations("audit.page.refund");

  return (
    <section className="py-[72px] max-md:py-12">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
        />
        <div className="max-w-[720px]">
          <p className="text-[19px] leading-[1.65] text-ink-2 mb-[18px] max-md:text-base">
            {t("p1")}
          </p>
          <p className="text-[19px] leading-[1.65] text-ink-2 max-md:text-base">
            {t("p2")}
          </p>
        </div>
      </div>
    </section>
  );
}

function TailCTA() {
  const t = useTranslations("audit.page.tailCta");

  return (
    <AuditCTA
      eyebrowOverride={t("eyebrow")}
      headlineOverride={t("headline")}
      bodyOverride={t("body")}
      noteOverride={t("note")}
      destination
    />
  );
}

function FAQSection() {
  const t = useTranslations("audit.page.faq");

  const items = ["1", "2", "3", "4", "5", "6", "7"].map((num) => ({
    question: t(`items.${num}.question`),
    answer: t(`items.${num}.answer`),
  }));

  return (
    <section className="py-[60px] max-md:py-12">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
        />
        <QuestionList items={items} />
      </div>
    </section>
  );
}
