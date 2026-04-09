import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";
import AuditCTA from "@/components/shared/AuditCTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TraviXoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <TraviXoHero />
      <LeadScreenshot />
      <WhatItIs />
      <WhatIBuilt />
      <InsideTheSystem />
      <TechStack />
      <LinksSection />
      <RelatedProjects />
      <AuditCTA />
    </>
  );
}

function TraviXoHero() {
  const t = useTranslations("projectDetail.travixo");
  const tLabels = useTranslations("projectDetail.labels");

  const metaCells = [
    { label: tLabels("category"), value: t("meta.category") },
    { label: tLabels("role"), value: t("meta.role") },
    { label: tLabels("status"), value: t("meta.status") },
    { label: tLabels("started"), value: t("meta.started"), muted: true },
  ];

  return (
    <section className="py-8 pb-[52px] max-md:py-6 max-md:pb-[34px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="max-w-[820px]">
          <p className="text-[14px] text-ink-label tracking-[0.03em] font-semibold mb-6">
            {t("eyebrow")}
          </p>
          <h1
            className="text-[60px] leading-[1.05] font-medium tracking-[-0.025em] mb-7 max-w-[780px] max-md:text-[38px] max-md:mb-6"
            dangerouslySetInnerHTML={{ __html: t("title") }}
          />
          <p className="text-[22px] font-medium leading-[1.5] text-ink max-w-[720px] mb-10">
            {t("standfirst")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-7 border-t border-border-warm max-w-[820px]">
            {metaCells.map((cell) => (
              <div key={cell.label}>
                <p className="text-[12px] font-semibold text-ink-label tracking-[0.04em] uppercase mb-2">
                  {cell.label}
                </p>
                <p
                  className={`text-[15px] leading-[1.4] text-ink ${
                    cell.muted ? "font-normal" : "font-medium"
                  }`}
                >
                  {cell.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadScreenshot() {
  const t = useTranslations("projectDetail.travixo.screenshots");

  return (
    <section className="pb-[60px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="bg-white border border-border-warm rounded-[10px] overflow-hidden casestudy-shadow">
          <Image
            src="/projects/travixo/travixo-dashboard.png"
            alt={t("lead.alt")}
            width={1191}
            height={982}
            priority
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}

function WhatItIs() {
  const t = useTranslations("projectDetail.travixo.whatItIs");
  const tLabels = useTranslations("projectDetail.labels");

  const paragraphs = [t("p1"), t("p2"), t("p3")];

  return (
    <section className="py-[60px] max-md:py-[42px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <SectionHeading
          eyebrow={tLabels("whatItIs")}
          title={t("title")}
        />
        <div className="max-w-[720px]">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-[18px] leading-[1.7] text-ink-2 mb-[22px] last:mb-0"
            >
              {p}
            </p>
          ))}
          <p className="text-[18px] leading-[1.7] text-ink font-medium mt-[22px]">
            {t("p4")}
          </p>
        </div>
      </div>
    </section>
  );
}

function WhatIBuilt() {
  const t = useTranslations("projectDetail.travixo.whatIBuilt");
  const tLabels = useTranslations("projectDetail.labels");

  const items = ["1", "2", "3", "4", "5"] as const;

  return (
    <section className="bg-bg-deep border-y border-border-default py-[60px] max-md:py-[42px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <SectionHeading
          eyebrow={tLabels("whatIBuilt")}
          title={t("title")}
        />
        <div className="max-w-[820px] mt-2">
          {items.map((num, i) => (
            <div
              key={num}
              className={`grid grid-cols-[60px_1fr] gap-6 py-7 border-t border-border-warm items-start ${
                i === items.length - 1 ? "border-b border-border-warm" : ""
              }`}
            >
              <p className="text-[13px] text-ink-3 font-medium tracking-[0.04em] pt-1">
                0{num}
              </p>
              <div>
                <h3 className="text-[20px] font-medium text-ink leading-[1.3] mb-2.5">
                  {t(`items.${num}.title`)}
                </h3>
                <p className="text-base leading-[1.65] text-ink-2 max-w-[620px]">
                  {t(`items.${num}.body`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InsideTheSystem() {
  const t = useTranslations("projectDetail.travixo.inside");
  const tLabels = useTranslations("projectDetail.labels");
  const tScreenshots = useTranslations("projectDetail.travixo.screenshots");

  const screenshots = [
    { src: "/projects/travixo/travixo-fleet.png", width: 875, height: 935, alt: tScreenshots("equipmentRegister.alt"), caption: t("cap1") },
    { src: "/projects/travixo/travixo-qr.png", width: 971, height: 943, alt: tScreenshots("inspectionWorkflow.alt"), caption: t("cap2") },
  ];

  return (
    <section className="py-[60px] max-md:py-[42px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <SectionHeading
          eyebrow={tLabels("insideTheSystem")}
          title={t("title")}
        />
        <div className="flex flex-col gap-14 mt-2">
          {screenshots.map((shot, i) => (
            <div key={i}>
              <div className="bg-white border border-border-warm rounded-[10px] overflow-hidden casestudy-shadow">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-[14px] text-ink-2-soft leading-[1.55] mt-4 max-w-[620px]">
                {shot.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechStack() {
  const t = useTranslations("projectDetail.travixo.stack");

  const layers = ["frontend", "backend", "data", "infrastructure", "tooling"] as const;

  return (
    <section className="bg-bg-deep border-y border-border-default py-[60px] max-md:py-[42px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
        />
        <div className="max-w-[820px] mt-2">
          {layers.map((layer, i) => (
            <div
              key={layer}
              className={`grid grid-cols-[180px_1fr] gap-8 py-[18px] border-t border-border-default items-baseline max-md:grid-cols-1 max-md:gap-2 ${
                i === layers.length - 1 ? "border-b border-border-default" : ""
              }`}
            >
              <span className="text-[11px] font-semibold text-ink-3 tracking-[0.04em] uppercase">
                {t(`layers.${layer}.label`)}
              </span>
              <span className="text-[14px] text-ink-2 leading-[1.6]">
                {t(`layers.${layer}.items`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LinksSection() {
  const t = useTranslations("projectDetail.travixo.links");
  const tLabels = useTranslations("projectDetail.labels");

  return (
    <section className="py-[60px] max-md:py-[42px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <SectionHeading
          eyebrow={tLabels("whereToFind")}
          title={tLabels("linksTitle")}
        />
        <div className="max-w-[820px] mt-2">
          <div className="grid grid-cols-[180px_1fr] gap-8 py-[22px] border-t border-border-warm items-baseline max-md:grid-cols-1 max-md:gap-2">
            <span className="text-[12px] font-semibold text-ink-label tracking-[0.04em] uppercase">
              {t("liveLabel")}
            </span>
            <a
              href="https://app.travixosystems.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-ink no-underline border-b border-ink pb-[2px] hover:text-accent hover:border-accent transition-colors"
            >
              {t("liveValue")}
            </a>
          </div>
          <div className="grid grid-cols-[180px_1fr] gap-8 py-[22px] border-t border-border-warm border-b border-border-warm items-baseline max-md:grid-cols-1 max-md:gap-2">
            <span className="text-[12px] font-semibold text-ink-label tracking-[0.04em] uppercase">
              {t("repoLabel")}
            </span>
            <span className="text-base text-ink-2-soft">{t("repoValue")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function RelatedProjects() {
  const t = useTranslations("projectDetail.travixo.related");
  const tLabels = useTranslations("projectDetail.labels");

  const cards = ["card1", "card2", "card3"] as const;

  return (
    <section className="bg-bg-deep border-y border-border-default py-[60px] max-md:py-[42px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <SectionHeading
          eyebrow={tLabels("relatedProjects")}
          title={tLabels("relatedTitle")}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 mt-2">
          {cards.map((card, i) => {
            const hasDisclosure = card === "card3";
            return (
            <div
              key={card}
              className={`py-8 max-md:py-6 ${
                i < 2
                  ? "md:pr-8 md:border-r md:border-border-default"
                  : ""
              } ${i > 0 ? "md:pl-8" : ""} ${
                i < 2 ? "max-md:border-b max-md:border-border-default" : ""
              }`}
            >
              <p className="text-[13px] text-ink-label tracking-[0.03em] font-semibold mb-3.5">
                {t(`${card}.eyebrow`)}
              </p>
              <h3 className="text-[20px] font-medium text-ink leading-[1.3] mb-3">
                {t(`${card}.title`)}
              </h3>
              <p className="text-[15px] leading-[1.6] text-ink-2 mb-[18px]">
                {t(`${card}.body`)}
              </p>
              {hasDisclosure && (
                <p className="text-[13px] text-ink-3 leading-[1.55] mb-3">
                  {t(`${card}.disclosure`)}
                </p>
              )}
              <a
                href={t(`${card}.url`)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-medium text-ink no-underline border-b border-ink pb-[2px] hover:text-accent hover:border-accent transition-colors"
              >
                {tLabels("viewProject")}
              </a>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
