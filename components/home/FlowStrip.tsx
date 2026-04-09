import { useTranslations } from "next-intl";

const STEPS = ["step1", "step2", "step3", "step4", "step5"] as const;

export default function FlowStrip() {
  const t = useTranslations("home.page.flow");

  return (
    <section className="bg-bg-cta border-y border-border-cool py-6 max-md:py-[18px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12 flex items-center gap-5 flex-wrap max-md:gap-3.5">
        <span className="text-[14px] text-ink-cool-label tracking-[0.03em] font-semibold mr-3 max-md:text-[13px]">
          {t("label")}
        </span>
        {STEPS.map((step, i) => (
          <span key={step} className="flex items-center gap-5 max-md:gap-3.5">
            {i > 0 && (
              <span className="text-[14px] text-ink-3" aria-hidden="true">
                →
              </span>
            )}
            <span className="text-[15px] text-ink font-medium max-md:text-[14px]">
              {t(step)}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
