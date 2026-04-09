import { useTranslations } from "next-intl";
import CTAPrimary from "@/components/shared/CTAPrimary";

export default function HomeFinalCTA() {
  const t = useTranslations("home.page.finalCta");
  const tActions = useTranslations("common.actions");

  return (
    <section className="py-[60px] pb-[34px] max-md:py-[44px] max-md:pb-7">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12 text-center">
        <div className="max-w-[720px] mx-auto">
          <h2
            className="text-[44px] leading-[1.1] font-medium tracking-[-0.025em] mb-6 max-md:text-[28px]"
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
