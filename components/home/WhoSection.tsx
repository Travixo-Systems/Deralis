import { useTranslations } from "next-intl";
import SectionHeading from "@/components/shared/SectionHeading";

const CARDS = ["card1", "card2", "card3"] as const;

export default function WhoSection() {
  const t = useTranslations("home.page.who");

  return (
    <section className="py-[60px] max-md:py-[42px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
          className="mb-10 max-md:mb-7"
        />
        <div className="grid grid-cols-1 md:grid-cols-3">
          {CARDS.map((card, i) => {
            const tags: string[] = t.raw(`${card}.tags`) as string[];
            const isExclude = card === "card3";
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
                <h3
                  className={`text-[20px] font-medium leading-[1.3] mb-3 ${
                    isExclude ? "text-ink-label" : "text-ink"
                  }`}
                >
                  {t(`${card}.title`)}
                </h3>
                <p className="text-base leading-[1.65] text-ink-2 mb-4">
                  {t(`${card}.description`)}
                </p>
                <div className="flex flex-col gap-1.5 text-[13px] text-ink-2-soft leading-[1.6]">
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
