import { useLocale } from "next-intl";
import type { CSSProperties } from "react";
import { Link } from "@/i18n/navigation";
import DsCard from "@/components/shared/DsCard";
import {
  formatBlogDate,
  formatReadTimeCompact,
  getNonFeaturedPosts,
  truncateWords,
  type BlogPost,
  type Locale,
} from "@/lib/blog";

const EXCERPT_WORDS = 18;

export default function PostListCard() {
  const locale = useLocale() as Locale;
  const posts = getNonFeaturedPosts(locale);
  const isOddCount = posts.length % 2 === 1;

  return (
    <DsCard>
      <div className="post-grid">
        {posts.map((post, i) => {
          const isLastOrphan = isOddCount && i === posts.length - 1;
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`dpc${isLastOrphan ? " dpc-wide" : ""}`}
            >
              <PostCardContent post={post} locale={locale} />
            </Link>
          );
        })}
      </div>
    </DsCard>
  );
}

function PostCardContent({ post, locale }: { post: BlogPost; locale: Locale }) {
  return (
    <>
      <div className="dpc-header" style={header}>
        <span style={date}>{formatBlogDate(post.date, locale)}</span>
        <div style={pillRow}>
          <span style={categoryPill}>{post.categoryLabel}</span>
          <span style={readTimePill}>{formatReadTimeCompact(post.readTime)}</span>
        </div>
      </div>
      <h3 className="dpc-title" style={title}>{post.title}</h3>
      <p className="dpc-excerpt" style={excerpt}>{truncateWords(post.excerpt, EXCERPT_WORDS)}</p>
    </>
  );
}

const header: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 12,
};

const date: CSSProperties = {
  fontSize: 11,
  fontFamily: "var(--font-mono), ui-monospace, monospace",
  color: "var(--text-muted)",
  letterSpacing: "0.04em",
  flexShrink: 0,
};

const pillRow: CSSProperties = {
  display: "flex",
  gap: 6,
  flexShrink: 0,
};

const categoryPill: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: 10,
  fontWeight: 600,
  color: "var(--accent)",
  background: "var(--category-pill-bg)",
  padding: "3px 9px",
  borderRadius: 2,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

const readTimePill: CSSProperties = {
  fontFamily: "var(--font-mono), ui-monospace, monospace",
  fontSize: 9,
  fontWeight: 600,
  color: "var(--text-muted)",
  border: "1px solid var(--border-strong)",
  padding: "3px 8px",
  borderRadius: 2,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};

const title: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontWeight: 500,
  letterSpacing: "-0.015em",
  color: "var(--text-primary)",
};

const excerpt: CSSProperties = {
  fontFamily: "var(--font-ibm-plex-sans), sans-serif",
  fontSize: 13,
  lineHeight: 1.55,
  color: "var(--text-secondary)",
  margin: 0,
};
