import { useLocale } from "next-intl";
import type { CSSProperties } from "react";
import { Link } from "@/i18n/navigation";
import DsCard from "@/components/shared/DsCard";
import { formatBlogDate, formatReadTime, getNonFeaturedPosts, type BlogPost } from "@/lib/blog";

export default function PostListCard() {
  const locale = useLocale();
  const posts = getNonFeaturedPosts();
  const [large, ...tight] = posts;

  return (
    <DsCard>
      <div style={{ maxWidth: 820 }}>
        <LargeRow post={large} locale={locale} />
        <div style={divider} />
        {tight.map((post, i) => (
          <TightRow
            key={post.slug}
            post={post}
            locale={locale}
            last={i === tight.length - 1}
          />
        ))}
      </div>
    </DsCard>
  );
}

function LargeRow({ post, locale }: { post: BlogPost; locale: string }) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-post-row" style={largeRow}>
      <div style={largeMetaLine}>
        <span style={largeDate}>{formatBlogDate(post.date, locale)}</span>
        <span style={readTimePill}>{formatReadTime(post.readTime, locale)}</span>
      </div>
      <h3 style={largeTitle}>{post.title}</h3>
      <p style={largeExcerpt}>{post.description}</p>
      <span style={categoryPill}>{post.category}</span>
    </Link>
  );
}

function TightRow({
  post,
  locale,
  last,
}: {
  post: BlogPost;
  locale: string;
  last: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="blog-post-row"
      style={{
        ...tightRow,
        borderBottom: last ? "none" : "1px solid rgba(20, 17, 13, 0.08)",
      }}
    >
      <div style={tightMain}>
        <div style={tightTitleLine}>
          <span style={tightDate}>{formatBlogDate(post.date, locale)}</span>
          <h3 style={tightTitle}>{post.title}</h3>
        </div>
        <p style={tightDesc}>{post.description}</p>
      </div>
      <span style={readTimePillSmall}>{formatReadTime(post.readTime, locale)}</span>
    </Link>
  );
}

const divider: CSSProperties = {
  height: 1,
  background: "var(--border-soft)",
  margin: "0 0 4px",
};

const largeRow: CSSProperties = {
  display: "block",
  padding: "8px 0 32px",
};

const largeMetaLine: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 14,
  marginBottom: 16,
};

const largeDate: CSSProperties = {
  fontSize: 12,
  color: "var(--text-muted)",
  fontFamily: "var(--font-mono), ui-monospace, monospace",
  letterSpacing: "0.04em",
};

const readTimePill: CSSProperties = {
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: "var(--text-muted)",
  border: "1px solid var(--border-strong)",
  borderRadius: "var(--radius-pill)",
  padding: "3px 8px",
  fontFamily: "var(--font-ibm-plex-sans), sans-serif",
  fontWeight: 600,
};

const largeTitle: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: "clamp(22px, 2.2vw, 24px)",
  fontWeight: 500,
  lineHeight: 1.22,
  letterSpacing: "-0.015em",
  color: "var(--text-primary)",
  marginBottom: 12,
  maxWidth: "30ch",
};

const largeExcerpt: CSSProperties = {
  fontSize: 15,
  lineHeight: 1.55,
  color: "var(--text-secondary)",
  maxWidth: "62ch",
  marginBottom: 18,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const categoryPill: CSSProperties = {
  display: "inline-block",
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--text-muted)",
  borderLeft: "2px solid var(--accent)",
  paddingLeft: 10,
};

const tightRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 18,
  padding: "22px 0",
  textDecoration: "none",
  color: "inherit",
};

const tightMain: CSSProperties = {
  flex: 1,
  minWidth: 0,
};

const tightTitleLine: CSSProperties = {
  display: "flex",
  alignItems: "baseline",
  gap: 12,
  marginBottom: 6,
  flexWrap: "wrap",
};

const tightDate: CSSProperties = {
  fontSize: 11,
  color: "var(--text-muted)",
  fontFamily: "var(--font-mono), ui-monospace, monospace",
  letterSpacing: "0.04em",
  flexShrink: 0,
};

const tightTitle: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: 17,
  fontWeight: 500,
  lineHeight: 1.3,
  letterSpacing: "-0.01em",
  color: "var(--text-primary)",
  margin: 0,
};

const tightDesc: CSSProperties = {
  fontSize: 13,
  lineHeight: 1.5,
  color: "var(--text-secondary)",
  margin: 0,
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const readTimePillSmall: CSSProperties = {
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: "var(--text-muted)",
  border: "1px solid var(--border-strong)",
  borderRadius: "var(--radius-pill)",
  padding: "3px 8px",
  fontFamily: "var(--font-ibm-plex-sans), sans-serif",
  fontWeight: 600,
  flexShrink: 0,
  alignSelf: "center",
};
