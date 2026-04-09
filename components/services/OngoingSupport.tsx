import { useTranslations } from "next-intl";

export default function OngoingSupport() {
  const t = useTranslations("services.page.ongoing");

  return (
    <section className="bg-bg-deep border-y border-border-default py-14 max-md:py-[42px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-16 items-start max-md:gap-7">
        {/* Left: metadata */}
        <div>
          <p className="text-[14px] text-ink-label tracking-[0.03em] font-semibold mb-3.5">
            {t("eyebrow")}
          </p>
          <h2 className="text-[30px] leading-[1.15] font-medium tracking-[-0.02em] mb-5 max-md:text-[24px]">
            {t("title")}
          </h2>
          <p className="text-[14px] text-ink-2 font-medium tracking-[0.01em]">
            {t("context")}
          </p>
        </div>

        {/* Right: body */}
        <div>
          <p className="text-[17px] leading-[1.65] text-ink-2 mb-[18px] max-w-[580px] max-md:text-base">
            {t("prose1")}
          </p>
          <p className="text-[17px] leading-[1.65] text-ink-2 mb-[18px] max-w-[580px] max-md:text-base">
            {t("prose2")}
          </p>
          <p className="text-[17px] leading-[1.65] text-ink-2 mb-6 max-w-[580px] max-md:text-base">
            {t("prose3")}
          </p>

          <div className="mt-6 pt-5 border-t border-border-warm flex items-baseline gap-4 flex-wrap">
            <span className="text-[22px] font-medium text-ink tracking-[-0.01em]">
              {t("price")}
            </span>
            <span className="text-[14px] text-ink-2">
              {t("priceNote")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
