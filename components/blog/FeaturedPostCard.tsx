import { useLocale, useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { Link } from "@/i18n/navigation";
import { DsCardPeak } from "@/components/shared/DsCard";
import { formatBlogDate, formatReadTime, getFeaturedPost, type Locale } from "@/lib/blog";

export default function FeaturedPostCard() {
  const t = useTranslations("blog");
  const locale = useLocale() as Locale;
  const post = getFeaturedPost(locale);

  return (
    <DsCardPeak>
      <div style={{ maxWidth: 820 }}>
        <p style={eyebrow}>{t("featured.eyebrow")}</p>
        <h2 style={h2Style}>{post.title}</h2>
        <p style={meta}>
          <span>{formatBlogDate(post.date, locale)}</span>
          <span style={sep}> · </span>
          <span>{formatReadTime(post.readTime, locale)}</span>
        </p>
        <p style={excerpt}>{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} style={cta}>
          {t("featured.cta")}
        </Link>
      </div>
    </DsCardPeak>
  );
}

const eyebrow: CSSProperties = {
  fontSize: "var(--fs-eyebrow)",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--text-on-peak-dim)",
  marginBottom: 22,
  fontWeight: 600,
  fontFamily: "var(--font-ibm-plex-sans), sans-serif",
  transition: "color 450ms ease",
};

const h2Style: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: "clamp(32px, 3.6vw, 44px)",
  fontWeight: 500,
  lineHeight: 1.08,
  letterSpacing: "-0.018em",
  color: "var(--text-on-peak)",
  marginBottom: 20,
  maxWidth: "24ch",
  transition: "color 450ms ease",
};

const meta: CSSProperties = {
  fontSize: 12,
  color: "var(--text-on-peak-dim)",
  fontFamily: "var(--font-mono), ui-monospace, monospace",
  letterSpacing: "0.04em",
  marginBottom: 22,
  transition: "color 450ms ease",
};

const sep: CSSProperties = { opacity: 0.6, margin: "0 6px" };

const excerpt: CSSProperties = {
  fontSize: 15,
  lineHeight: 1.6,
  color: "var(--text-on-peak-muted)",
  maxWidth: "58ch",
  marginBottom: 32,
  transition: "color 450ms ease",
};

const cta: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  padding: "18px 28px",
  background: "var(--text-on-peak)",
  color: "var(--card-peak)",
  fontSize: 14,
  fontWeight: 600,
  borderRadius: "var(--radius-button)",
  textDecoration: "none",
  transition: "background-color 450ms ease, color 450ms ease, opacity 200ms ease",
};
