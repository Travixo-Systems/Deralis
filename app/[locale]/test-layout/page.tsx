import "./test-layout.css";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { parseRichText } from "@/components/shared/RichText";
import CTAPrimary from "@/components/shared/CTAPrimary";
import CTASecondary from "@/components/shared/CTASecondary";
import Image from "next/image";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TestLayoutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="test-layout-page">
      {/* 12-col grid overlay */}
      <div className="test-grid-overlay" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="test-grid-col" />
        ))}
      </div>

      <div className="test-container">
        {/* Card 1: Hero */}
        <HeroCard />

        {/* Card 2: Flow strip — small accent card */}
        <FlowCard />

        {/* Card 3: Who section */}
        <WhoCard />

        {/* Card 4: Case study — dark peak */}
        <CaseStudyCard />

        {/* Card 5: Audit CTA — accent card */}
        <AuditCTACard />

        {/* Card 6: How I Work */}
        <HowCard />

        {/* Card 7: Final CTA */}
        <FinalCTACard />
      </div>
    </div>
  );
}

function HeroCard() {
  const t = useTranslations("home.page.hero");
  const tActions = useTranslations("common.actions");

  return (
    <section className="test-card test-card--warm">
      <div className="test-card-inner test-card-inner--wide">
        <div className="grid grid-cols-1 md:grid-cols-[1.65fr_1fr] gap-10 md:gap-16 items-start">
          <div>
            <p className="test-eyebrow">{t("eyebrow")}</p>
            <h1 className="test-h1">
              {parseRichText(t.raw("headline"))}
            </h1>
            <div className="mb-8 max-w-[560px]">
              <p className="text-[20px] font-medium leading-[1.55] test-ink mb-1">
                {t("sub1")}
              </p>
              <p className="text-[18px] leading-[1.55] test-ink-muted">
                {t("sub2")}
              </p>
            </div>
            <div className="flex items-center gap-7 flex-wrap">
              <CTAPrimary href="/audit">{tActions("discoverAudit")}</CTAPrimary>
              <CTASecondary href="/projects">{tActions("viewOurWork")}</CTASecondary>
            </div>
          </div>
          <aside className="test-aside">
            <p className="test-aside-heading">{t("anchor.backgroundHeading")}</p>
            <p className="text-[14px] leading-[1.7] test-ink-muted mb-7">
              {parseRichText(t.raw("anchor.backgroundProse"))}
            </p>
            <p className="test-aside-heading">{t("anchor.builtHeading")}</p>
            <div className="flex flex-col gap-3">
              <div>
                <span className="text-[15px] font-medium test-ink block">{t("anchor.built1Name")}</span>
                <span className="text-[13px] test-ink-muted">{t("anchor.built1Desc")}</span>
              </div>
              <div>
                <span className="text-[15px] font-medium test-ink block">
                  {t("anchor.built2Name")} <span className="font-normal test-ink-soft">({t("anchor.built2Tag")})</span>
                </span>
                <span className="text-[13px] test-ink-muted">{t("anchor.built2Desc")}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function FlowCard() {
  const t = useTranslations("home.page.flow");
  const steps = ["step1", "step2", "step3", "step4", "step5"] as const;

  return (
    <section className="test-card test-card--small test-card--accent">
      <div className="test-card-inner flex items-center gap-5 flex-nowrap overflow-x-auto">
        <span className="text-[13px] font-semibold tracking-[0.03em] test-ink-accent-label shrink-0 mr-2">
          {t("label")}
        </span>
        {steps.map((step, i) => (
          <span key={step} className="flex items-center gap-5 shrink-0">
            {i > 0 && <span className="text-[14px] test-ink-soft" aria-hidden="true">→</span>}
            <span className="text-[14px] font-medium test-ink">{t(step)}</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function WhoCard() {
  const t = useTranslations("home.page.who");
  const cards = ["card1", "card2", "card3"] as const;

  return (
    <section className="test-card test-card--neutral">
      <div className="test-card-inner">
        <p className="test-eyebrow">{t("eyebrow")}</p>
        <h2 className="test-h2">{parseRichText(t.raw("title"))}</h2>
        <p className="text-[17px] leading-[1.6] test-ink-muted mb-10 max-w-[600px]">{t("intro")}</p>
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-x-8">
          {cards.map((card, i) => {
            const tags: string[] = t.raw(`${card}.tags`) as string[];
            return (
              <div
                key={card}
                className={`py-7 ${
                  i === 2 ? "md:col-span-2 md:border-t md:border-[var(--test-border)] md:pt-7 md:max-w-[560px]" : ""
                } ${i === 0 ? "md:pr-8 md:border-r md:border-[var(--test-border)]" : ""} ${
                  i === 1 ? "md:pl-8" : ""
                } ${i < 2 ? "max-md:border-b max-md:border-[var(--test-border)]" : ""}`}
              >
                <h3 className={`text-[19px] font-medium leading-[1.3] mb-2.5 ${card === "card3" ? "test-ink-soft" : "test-ink"}`}>
                  {t(`${card}.title`)}
                </h3>
                <p className="text-[15px] leading-[1.65] test-ink-muted mb-3">{t(`${card}.description`)}</p>
                <div className="flex flex-col gap-1 text-[12px] test-ink-soft leading-[1.6]">
                  {tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard() {
  const t = useTranslations("home.page.casestudy");
  const tScreenshots = useTranslations("projectDetail.travixo.screenshots");

  return (
    <section className="test-card test-card--dark">
      <div className="test-card-inner test-card-inner--wide">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-14 items-center">
          <div>
            <p className="test-eyebrow test-eyebrow--dark">{t("label")}</p>
            <h2 className="test-h2 test-h2--dark">{t("title")}</h2>
            <p className="text-[13px] font-medium tracking-[0.01em] mb-5" style={{ color: "rgba(247,244,237,0.5)" }}>{t("context")}</p>
            <p className="text-[17px] leading-[1.65] mb-7 max-w-[480px]" style={{ color: "rgba(247,244,237,0.78)" }}>{t("prose")}</p>
            <a href="/projects/travixo" className="inline-flex items-center gap-2 text-[14px] font-medium no-underline pb-[3px]" style={{ color: "#F7F4ED", borderBottom: "1px solid rgba(247,244,237,0.4)" }}>
              {t("linkLabel")} <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="rounded-lg overflow-hidden" style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 12px 28px rgba(0,0,0,0.3)" }}>
            <Image
              src="/projects/travixo/travixo-dashboard.png"
              alt={tScreenshots("dashboard.alt")}
              width={1191}
              height={982}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function AuditCTACard() {
  const t = useTranslations("common.auditCta");
  const tActions = useTranslations("common.actions");

  return (
    <section className="test-card test-card--accent">
      <div className="test-card-inner test-card-inner--wide">
        <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-14 items-center">
          <div>
            <p className="test-eyebrow test-eyebrow--accent">{t("eyebrow")}</p>
            <h2 className="test-h2 test-h2--accent">{t("headline")}</h2>
            <div className="text-[17px] leading-[1.6] test-ink-accent max-w-[540px]">
              <p className="mb-3">{t("body1")}</p>
              <p>{t("body2")}</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <CTAPrimary href="/audit">{tActions("discoverAudit")}</CTAPrimary>
            <p className="text-[12px] test-ink-accent-muted">{t("note")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowCard() {
  const t = useTranslations("home.page.howIWork");
  const items = ["1", "2", "3", "4"] as const;

  return (
    <section className="test-card test-card--warm">
      <div className="test-card-inner">
        <p className="test-eyebrow">{t("eyebrow")}</p>
        <h2 className="test-h2">{parseRichText(t.raw("title"))}</h2>
        <p className="text-[17px] leading-[1.6] test-ink-muted mb-8 max-w-[600px]">{t("intro")}</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-7">
          {items.map((item) => (
            <div key={item} className="pt-5 border-t border-[var(--test-border)]">
              <p className="text-[12px] test-ink-soft font-medium tracking-[0.04em] mb-2.5">{t(`items.${item}.num`)}</p>
              <h3 className="text-[18px] font-medium test-ink leading-[1.25] mb-2.5">{t(`items.${item}.title`)}</h3>
              <p className="text-[14px] leading-[1.6] test-ink-muted">{t(`items.${item}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTACard() {
  const t = useTranslations("home.page.finalCta");
  const tActions = useTranslations("common.actions");

  return (
    <section className="test-card test-card--neutral">
      <div className="test-card-inner">
        <h2 className="test-h2">{parseRichText(t.raw("headline"))}</h2>
        <p className="text-[17px] leading-[1.6] test-ink-muted mb-8 max-w-[560px]">{t("description")}</p>
        <div className="flex items-center gap-7 flex-wrap">
          <CTAPrimary href="/audit">{tActions("discoverAudit")}</CTAPrimary>
          <a
            href="mailto:contact&#64;deralis.digital"
            className="text-[14px] font-medium test-ink no-underline border-b border-transparent pb-[2px] hover:border-current transition-all duration-150 cursor-pointer"
          >
            contact&#64;deralis.digital
          </a>
        </div>
        <p className="mt-5 text-[12px] test-ink-soft">{t("note")}</p>
      </div>
    </section>
  );
}
