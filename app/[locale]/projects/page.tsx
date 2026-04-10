import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import CTAPrimary from "@/components/shared/CTAPrimary";
import CTASecondary from "@/components/shared/CTASecondary";
import CaseStudySection from "@/components/shared/CaseStudySection";
import AuditCTA from "@/components/shared/AuditCTA";
import SectionHeading from "@/components/shared/SectionHeading";
import ConceptItems from "@/components/projects/ConceptItems";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects.page.metadata" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://www.deralis.digital/${locale}/projects`,
      images: [
        {
          url: "https://www.deralis.digital/og-image.png",
          width: 1200,
          height: 630,
          alt: "Deralis Digital",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.deralis.digital/og-image.png"],
    },
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ProjectsHero />
      <TraviXOCaseStudy />
      <AuditCTA />
      <GovPortalCaseStudy />
      <ConceptsStrip />
      <ProjectsFinalCTA />
    </>
  );
}

function ProjectsHero() {
  const t = useTranslations("projects.page.hero");
  const tActions = useTranslations("common.actions");

  return (
    <section className="py-8 pb-[52px] max-md:py-6 max-md:pb-[34px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="max-w-[820px]">
          <p className="text-base text-ink-label font-medium tracking-[0.01em] mb-7 max-md:text-[15px] max-md:mb-5">
            {t("eyebrow")}
          </p>
          <h1
            className="text-[60px] leading-[1.05] font-medium tracking-[-0.025em] mb-8 max-w-[780px] max-md:text-[38px] max-md:mb-6"
            dangerouslySetInnerHTML={{ __html: t("title") }}
          />
          <div className="mb-9 max-w-[640px] max-md:mb-7">
            <p className="text-ink font-medium text-[22px] leading-[1.6] max-md:text-[19px]">
              {t("sub1")}
            </p>
            <p className="text-ink-2-soft text-[20px] leading-[1.6] mb-4 max-md:text-[17px]">
              {t("sub2")}
            </p>
            <p className="text-ink-2-soft text-[20px] leading-[1.6] max-md:text-[17px]">
              {t("sub3")}
            </p>
          </div>
          <div className="flex items-center gap-8 flex-wrap">
            <CTASecondary href="#travixo">{t("ctaSecondary")}</CTASecondary>
            <CTAPrimary href="/audit">{tActions("discoverAudit")}</CTAPrimary>
          </div>
        </div>
      </div>
    </section>
  );
}

function TraviXOCaseStudy() {
  const t = useTranslations("projects.page.travixo");
  const tScreenshots = useTranslations("projectDetail.travixo.screenshots");

  return (
    <CaseStudySection
      id="travixo"
      label={t("label")}
      title="TraviXO Systems"
      context={t("context")}
      prose={[t("prose1"), t("prose2"), t("prose3"), t("prose4")]}
      closing={{
        type: "link",
        href: "/projects/travixo",
        label: t("linkLabel"),
      }}
      screenshotAlt={tScreenshots("dashboard.alt")}
      screenshotSrc="/projects/travixo/travixo-dashboard.png"
      screenshotWidth={1191}
      screenshotHeight={982}
      screenshotPriority
      alignStart
    />
  );
}

function GovPortalCaseStudy() {
  const t = useTranslations("projects.page.govPortal");

  return (
    <CaseStudySection
      id="government"
      label={t("label")}
      title={t("title")}
      context={t("context")}
      prose={[t("prose1"), t("prose2")]}
      closing={{
        type: "note",
        text: t("note"),
        link: { href: t("url"), label: t("viewBuildLabel") },
      }}
      screenshotAlt={t("screenshot.alt")}
      screenshotSrc="/projects/gov-portal/gov-portal.png"
      screenshotWidth={1550}
      screenshotHeight={792}
    />
  );
}

function ConceptsStrip() {
  const t = useTranslations("projects.page.concepts");

  const items = ["1", "2", "3", "4"].map((num) => ({
    num: `0${num}`,
    title: t(`items.${num}.title`),
    description: t(`items.${num}.desc`),
    linkHref: t(`items.${num}.url`),
    linkLabel: t(`items.${num}.linkLabel`),
  }));

  return (
    <section className="bg-bg-deep border-y border-border-default py-[60px] max-md:py-[42px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
        />
        <ConceptItems items={items} />
      </div>
    </section>
  );
}

function ProjectsFinalCTA() {
  const t = useTranslations("projects.page.finalCta");
  const tActions = useTranslations("common.actions");

  return (
    <section className="py-[60px] pb-[34px] max-md:py-[44px] max-md:pb-7">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12 text-center">
        <div className="max-w-[720px] mx-auto">
          <h2
            className="text-[44px] leading-[1.1] font-medium tracking-[-0.025em] mb-6 max-md:text-[28px]"
            dangerouslySetInnerHTML={{ __html: t("title") }}
          />
          <p className="text-[18px] leading-[1.6] text-ink-2 mb-8 max-w-[580px] mx-auto max-md:text-base">
            {t("body")}
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
