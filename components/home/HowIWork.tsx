import { useTranslations } from "next-intl";
import SectionHeading from "@/components/shared/SectionHeading";

const ITEMS = ["1", "2", "3", "4"] as const;

export default function HowIWork() {
  const t = useTranslations("home.page.howIWork");

  return (
    <section className="bg-bg-deep border-y border-border-default py-[60px] max-md:py-[42px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-2">
          {ITEMS.map((item) => (
            <div key={item} className="pt-6 border-t border-border-warm">
              <p className="text-[13px] text-ink-3 font-medium tracking-[0.04em] mb-3">
                {t(`items.${item}.num`)}
              </p>
              <h3 className="text-[20px] font-medium text-ink leading-[1.25] mb-3">
                {t(`items.${item}.title`)}
              </h3>
              <p className="text-[15px] leading-[1.6] text-ink-2">
                {t(`items.${item}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
