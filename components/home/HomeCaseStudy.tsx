import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function HomeCaseStudy() {
  const t = useTranslations("home.page.casestudy");
  const tScreenshots = useTranslations("projectDetail.travixo.screenshots");

  return (
    <section className="border-t border-border-default py-[52px] pb-[44px] max-md:py-[42px] max-md:pb-[34px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12 grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-[72px] items-center max-md:gap-8">
        {/* Content */}
        <div>
          <p className="text-[14px] text-ink-label font-semibold tracking-[0.03em] mb-[18px]">
            {t("label")}
          </p>
          <h2 className="text-[40px] font-medium text-ink leading-[1.1] tracking-[-0.02em] mb-5 max-md:text-[28px]">
            {t("title")}
          </h2>
          <p className="text-[14px] font-medium text-ink-2 tracking-[0.01em] mb-6">
            {t("context")}
          </p>
          <p className="text-[18px] leading-[1.65] text-ink-2 mb-7 max-w-[500px] max-md:text-base">
            {t("prose")}
          </p>
          <Link
            href="/projects/travixo"
            className="inline-flex items-center gap-2 text-[15px] font-medium text-ink no-underline border-b border-ink pb-[3px] hover:text-accent hover:border-accent transition-colors"
          >
            {t("linkLabel")}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="bg-white border border-border-warm rounded-[10px] overflow-hidden casestudy-shadow">
          <Image
            src="/projects/travixo/travixo-dashboard.png"
            alt={tScreenshots("dashboard.alt")}
            width={1191}
            height={982}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
