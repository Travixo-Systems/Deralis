import { useTranslations } from "next-intl";
import { DsCardPeak } from "@/components/shared/DsCard";
import TabLabel from "@/components/shared/TabLabel";
import RichText from "@/components/shared/RichText";
import type { CSSProperties } from "react";

// Grid layout via CSS class .grid-peak (responsive handled in globals.css)

const peakEyebrowStyle: CSSProperties = {
  fontSize: "var(--fs-eyebrow)",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--text-on-peak-dim)",
  marginBottom: 20,
  fontWeight: 600,
};

const h2Style: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: "var(--fs-h2)",
  fontWeight: 500,
  lineHeight: 1.04,
  letterSpacing: "-0.02em",
  color: "var(--text-on-peak)",
};

const bodyStyle: CSSProperties = {
  fontSize: "var(--fs-body)",
  lineHeight: 1.6,
  color: "var(--text-on-peak-muted)",
  maxWidth: "48ch",
};

const tagsStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginTop: 24,
};

const tagStyle: CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--text-on-peak-muted)",
  padding: "6px 12px",
  background: "transparent",
  border: "1px solid var(--text-on-peak-dim)",
  fontWeight: 600,
  borderRadius: "var(--radius-pill)",
  transition: "border-color 450ms ease, color 450ms ease",
};

export default function ExclusionPeak() {
  const t = useTranslations("home.page.exclusion");
  const tags: string[] = t.raw("tags");

  return (
    <DsCardPeak>
      <TabLabel variant="on-peak" style={{ left: 56 }}>
        {t("eyebrow")}
      </TabLabel>

      <div className="grid-peak">
        <div>
          <p style={peakEyebrowStyle}>{t("eyebrow")}</p>
          <h2 style={h2Style}>{t("headline")}</h2>
        </div>
        <div>
          <p style={bodyStyle}>{t("body1")}</p>
          <p style={{ ...bodyStyle, marginTop: 14 }}>
            <RichText html={t.raw("body2")} />
          </p>
          <div style={tagsStyle}>
            {tags.map((tag) => (
              <span key={tag} style={tagStyle}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </DsCardPeak>
  );
}
