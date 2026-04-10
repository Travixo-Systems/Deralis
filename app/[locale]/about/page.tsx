import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import CTASecondary from "@/components/shared/CTASecondary";
import SectionHeading from "@/components/shared/SectionHeading";
import AuditCTA from "@/components/shared/AuditCTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.page.metadata" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://www.deralis.digital/${locale}/about`,
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

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <BackgroundSection />
      <PrinciplesSection />
      <BuildingSection />
      <AuditCTA />
    </>
  );
}

function AboutHero() {
  const t = useTranslations("about.page.hero");

  return (
    <section className="py-8 pb-[52px] max-md:py-6 max-md:pb-[34px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="max-w-[820px]">
          <p className="text-base text-ink-label font-medium tracking-[0.01em] mb-7 max-md:text-[15px] max-md:mb-5">
            {t("eyebrow")}
          </p>
          <h1
            className="text-[60px] leading-[1.04] font-medium tracking-[-0.025em] mb-8 max-w-[760px] max-md:text-[38px] max-md:mb-6"
            dangerouslySetInnerHTML={{ __html: t("title") }}
          />
          <div className="mb-9 max-w-[640px]">
            <p className="text-ink font-medium text-[22px] leading-[1.6] mb-4 max-md:text-[19px]">
              {t("sub1")}
            </p>
            <p className="text-ink-2-soft text-[19px] leading-[1.6] mb-4 max-md:text-[17px]">
              {t("sub2")}
            </p>
            <p className="text-ink-2-soft text-[19px] leading-[1.6] mb-4 max-md:text-[17px]">
              {t("sub3")}
            </p>
            <p className="text-ink-2-soft text-[19px] leading-[1.6] max-md:text-[17px]">
              {t("sub4")}
            </p>
          </div>
          <CTASecondary href="#how">{t("ctaSecondary")}</CTASecondary>
        </div>
      </div>
    </section>
  );
}

function BackgroundSection() {
  const t = useTranslations("about.page.background");

  return (
    <section className="bg-bg-deep border-y border-border-default py-[60px] max-md:py-[42px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
        />
        <div className="max-w-[880px] border-t border-border-warm">
          <div className="py-6 border-b border-border-warm">
            <p className="text-[20px] font-medium text-ink leading-[1.3] mb-1">
              {t("role1.title")}
            </p>
            <p className="text-[15px] text-ink-2">{t("role1.company")}</p>
          </div>
          <div className="py-6 border-b border-border-warm">
            <p className="text-[20px] font-medium text-ink leading-[1.3] mb-1">
              {t("role2.title")}
            </p>
            <p className="text-[15px] text-ink-2">{t("role2.company")}</p>
          </div>
        </div>
        <p
          className="text-[17px] leading-[1.65] text-ink-2 max-w-[720px] mt-8"
          dangerouslySetInnerHTML={{ __html: t("closing") }}
        />
      </div>
    </section>
  );
}

function PrinciplesSection() {
  const t = useTranslations("about.page.principles");

  const principles = [
    { num: "01", key: "p1" },
    { num: "02", key: "p2" },
    { num: "03", key: "p3" },
  ] as const;

  return (
    <section id="how" className="py-[60px] max-md:py-[42px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
        />
        <div className="grid grid-cols-1 md:grid-cols-3">
          {principles.map(({ num, key }, i) => (
            <div
              key={key}
              className={`py-8 max-md:py-6 ${
                i < 2 ? "md:pr-8 md:border-r md:border-border-default" : ""
              } ${i > 0 ? "md:pl-8" : ""} ${
                i < 2 ? "max-md:border-b max-md:border-border-default" : ""
              }`}
            >
              <p className="text-[13px] text-ink-3 font-medium tracking-[0.04em] mb-3">
                {num}
              </p>
              <h3 className="text-[20px] font-medium text-ink leading-[1.3] mb-3">
                {t(`${key}.title`)}
              </h3>
              <p className="text-base leading-[1.65] text-ink-2">
                {t(`${key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuildingSection() {
  const t = useTranslations("about.page.building");

  return (
    <section className="bg-bg-deep border-y border-border-default py-[60px] max-md:py-[42px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 mt-2">
          <div className="py-8 md:pr-12 md:border-r md:border-border-default max-md:border-b max-md:border-border-default max-md:py-6">
            <h3 className="text-[22px] font-medium text-ink mb-3.5">
              {t("card1.title")}
            </h3>
            <p className="text-base leading-[1.65] text-ink-2">
              {t("card1.body")}
            </p>
          </div>
          <div className="py-8 md:pl-12 max-md:py-6">
            <h3 className="text-[22px] font-medium text-ink mb-3.5">
              {t("card2.title")}
            </h3>
            <p className="text-base leading-[1.65] text-ink-2">
              {t("card2.body")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
