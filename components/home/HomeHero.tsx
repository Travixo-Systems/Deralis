import { useTranslations } from "next-intl";
import CTAPrimary from "@/components/shared/CTAPrimary";
import CTASecondary from "@/components/shared/CTASecondary";

export default function HomeHero() {
  const t = useTranslations("home.page.hero");
  const tActions = useTranslations("common.actions");

  return (
    <section className="py-8 pb-[52px] max-md:py-6 max-md:pb-[34px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12 grid grid-cols-1 md:grid-cols-[1.65fr_1fr] gap-10 md:gap-20 items-start">
        {/* Left column */}
        <div>
          <p className="text-base text-ink-label font-medium tracking-[0.01em] mb-7 max-md:text-[15px] max-md:mb-5">
            {t("eyebrow")}
          </p>
          <h1
            className="text-[64px] leading-[1.04] font-medium tracking-[-0.025em] mb-8 max-w-[760px] max-md:text-[38px] max-md:mb-6"
            dangerouslySetInnerHTML={{ __html: t("headline") }}
          />
          <div className="mb-9 max-w-[600px]">
            <p className="text-ink font-medium text-[22px] leading-[1.6] max-md:text-[19px]">
              {t("sub1")}
            </p>
            <p className="text-ink-2-soft text-[20px] leading-[1.6] max-md:text-[17px]">
              {t("sub2")}
            </p>
            {t("sub3") && (
              <p className="text-ink-2-soft text-[20px] leading-[1.6] mt-4 max-md:text-[17px]">
                {t("sub3")}
              </p>
            )}
          </div>
          <div className="flex items-center gap-8 flex-wrap">
            <CTAPrimary href="/audit">{tActions("discoverAudit")}</CTAPrimary>
            <CTASecondary href="/projects">{tActions("viewOurWork")}</CTASecondary>
          </div>
        </div>

        {/* Right column — Trust Anchor */}
        <aside className="border-l border-border-warm pl-9 pt-1.5 max-w-[360px] max-md:border-l-0 max-md:border-t max-md:border-border-warm max-md:pl-0 max-md:pt-6 max-md:max-w-full">
          {/* Background */}
          <h3 className="text-[14px] text-ink-label font-semibold tracking-[0.03em] mb-3.5">
            {t("anchor.backgroundHeading")}
          </h3>
          <p
            className="text-[15px] leading-[1.7] text-ink mb-8"
            dangerouslySetInnerHTML={{ __html: t("anchor.backgroundProse") }}
          />

          {/* What I've built */}
          <h3 className="text-[14px] text-ink-label font-semibold tracking-[0.03em] mb-3.5">
            {t("anchor.builtHeading")}
          </h3>
          <div className="flex flex-col">
            <div className="py-[13px] border-b border-border-default pt-0">
              <span className="text-base font-medium text-ink block mb-1">
                {t("anchor.built1Name")}
              </span>
              <span className="text-[14px] leading-[1.6] text-ink-2">
                {t("anchor.built1Desc")}
              </span>
            </div>
            <div className="py-[13px] pb-0">
              <span className="text-base font-medium text-ink block mb-1">
                {t("anchor.built2Name")}{" "}
                <span className="text-ink-3 font-normal">({t("anchor.built2Tag")})</span>
              </span>
              <span className="text-[14px] leading-[1.6] text-ink-2">
                {t("anchor.built2Desc")}
              </span>
            </div>
          </div>

          {/* Signature */}
          <p className="text-[13px] leading-[1.7] text-ink-2 pt-[22px] mt-[26px] border-t border-border-warm">
            {t("anchor.signature")}
          </p>
        </aside>
      </div>
    </section>
  );
}
