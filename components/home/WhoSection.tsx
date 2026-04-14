import { useTranslations } from "next-intl";
import DsCard from "@/components/shared/DsCard";
import PullQuote from "@/components/shared/PullQuote";
import type { CSSProperties } from "react";

const eyebrowStyle: CSSProperties = {
  fontSize: "var(--fs-eyebrow)",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--text-muted)",
  fontWeight: 600,
  transition: "color 450ms ease",
};

const introStyle: CSSProperties = {
  fontSize: 19,
  lineHeight: 1.55,
  color: "var(--text-secondary)",
  maxWidth: "60ch",
  marginBottom: 14,
  transition: "color 450ms ease",
};

// Grid layout via CSS class .grid-2col (responsive handled in globals.css)

const whoCardStyle: CSSProperties = {
  background: "var(--card-paper)",
  border: "1px solid var(--border-soft)",
  borderLeft: "3px solid var(--accent)",
  borderRadius: "var(--radius-internal)",
  padding: "36px 32px",
  transition: "background-color 450ms ease, color 450ms ease, border-color 450ms ease, transform 150ms ease, box-shadow 150ms ease",
};

const whoCardH3Style: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: 23,
  fontWeight: 500,
  lineHeight: 1.2,
  marginBottom: 16,
  letterSpacing: "-0.01em",
  color: "var(--text-primary)",
};

const whoCardPStyle: CSSProperties = {
  fontSize: "var(--fs-body-sm)",
  lineHeight: 1.6,
  color: "var(--text-secondary)",
  marginBottom: 22,
};

const tagsStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const tagStyle: CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--text-muted)",
  padding: "6px 12px",
  background: "var(--card-main)",
  border: "1px solid var(--border-soft)",
  fontWeight: 600,
  borderRadius: "var(--radius-pill)",
  transition: "background-color 450ms ease, color 450ms ease, border-color 450ms ease",
};

export default function WhoSection() {
  const t = useTranslations("home.page.who");

  const card1Tags: string[] = t.raw("card1.tags");
  const card2Tags: string[] = t.raw("card2.tags");

  return (
    <DsCard>
      <p style={eyebrowStyle}>{t("eyebrow")}</p>
      <p style={introStyle}>{t("intro1")}</p>
      <p style={introStyle}>{t("intro2")}</p>

      <PullQuote html={t.raw("pullquote")} />

      <div className="grid-2col">
        <div style={whoCardStyle}>
          <h3 style={whoCardH3Style}>{t("card1.title")}</h3>
          <p style={whoCardPStyle}>{t("card1.description")}</p>
          <div style={tagsStyle}>
            {card1Tags.map((tag) => (
              <span key={tag} style={tagStyle}>{tag}</span>
            ))}
          </div>
        </div>
        <div style={whoCardStyle}>
          <h3 style={whoCardH3Style}>{t("card2.title")}</h3>
          <p style={whoCardPStyle}>{t("card2.description")}</p>
          <div style={tagsStyle}>
            {card2Tags.map((tag) => (
              <span key={tag} style={tagStyle}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </DsCard>
  );
}
