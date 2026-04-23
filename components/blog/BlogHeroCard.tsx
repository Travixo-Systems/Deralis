import { useLocale, useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import DsCard from "@/components/shared/DsCard";
import TabLabel from "@/components/shared/TabLabel";
import RichText from "@/components/shared/RichText";
import { getTopicCounts, type Locale } from "@/lib/blog";

const TOPIC_ORDER = ["strategy", "development", "automation", "ai"] as const;

export default function BlogHeroCard() {
  const t = useTranslations("blog");
  const locale = useLocale() as Locale;
  const counts = new Map(getTopicCounts(locale).map((r) => [r.categoryKey, r]));
  const topics = TOPIC_ORDER
    .filter((key) => (counts.get(key)?.count ?? 0) > 0)
    .map((key) => counts.get(key)!);

  return (
    <DsCard>
      <div className="grid-hero">
        <div>
          <p style={eyebrow}>{t("eyebrow")}</p>
          <h1 style={h1Style} className="hero-h1-responsive">
            <RichText html={t.raw("hero.h1") as string} />
          </h1>
          <p style={subtitle}>{t("hero.subtitle")}</p>
        </div>

        <aside style={anchorBlock}>
          <TabLabel variant="default" heroSize style={{ left: 32 }}>
            {t("topics.tab")}
          </TabLabel>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {topics.map((topic, i) => (
              <li
                key={topic.categoryKey}
                style={{
                  ...builtItem,
                  marginBottom: i === topics.length - 1 ? 0 : 18,
                }}
              >
                <span style={topicName}>{topic.categoryLabel}</span>
                <span style={topicCount}>
                  {t(topic.count === 1 ? "topics.count.singular" : "topics.count.plural", {
                    count: topic.count,
                  })}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </DsCard>
  );
}

const eyebrow: CSSProperties = {
  fontSize: "var(--fs-eyebrow)",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--text-muted)",
  marginBottom: 26,
  fontWeight: 600,
  fontFamily: "var(--font-ibm-plex-sans), sans-serif",
  transition: "color 450ms ease",
};

const h1Style: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: "var(--fs-h1)",
  fontWeight: 500,
  lineHeight: 1.02,
  letterSpacing: "-0.02em",
  marginBottom: 26,
  maxWidth: "14ch",
};

const subtitle: CSSProperties = {
  fontSize: 18,
  lineHeight: 1.55,
  color: "var(--text-secondary)",
  maxWidth: "46ch",
  transition: "color 450ms ease",
};

const anchorBlock: CSSProperties = {
  background: "var(--card-peak)",
  color: "var(--text-on-peak)",
  padding: "40px 36px 32px",
  position: "relative",
  borderRadius: 12,
  boxShadow: "var(--hero-peak-shadow)",
  transition: "background-color 450ms ease, color 450ms ease",
};

const builtItem: CSSProperties = {
  paddingLeft: 14,
  borderLeft: "2px solid var(--accent)",
  display: "flex",
  flexDirection: "column",
  gap: 4,
  transition: "border-color 450ms ease",
};

const topicName: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: 14,
  fontWeight: 600,
  color: "var(--text-on-peak)",
  letterSpacing: "-0.005em",
};

const topicCount: CSSProperties = {
  fontFamily: "var(--font-mono), ui-monospace, monospace",
  fontSize: 11,
  color: "var(--text-on-peak-muted)",
  letterSpacing: "0.02em",
};
