import fs from "fs";
import path from "path";

export type Locale = "en" | "fr";

export type BlogPostBase = {
  slug: string;
  date: string;
  readTime: string;
  featured: boolean;
  category: string;
  categoryKey: string;
};

export type BlogPost = BlogPostBase & {
  title: string;
  excerpt: string;
  categoryLabel: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const MESSAGES_DIR = path.join(process.cwd(), "messages");
const READ_TIME_RE = /^\d+\s*min\s*read$/i;
const REQUIRED = ["title", "slug", "date", "description", "category", "readTime"] as const;

function parseFrontmatter(raw: string, file: string): Record<string, string> {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error(`Blog post ${file}: missing frontmatter block`);
  const fm: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      fm[key] = val;
    }
  }
  return fm;
}

type RawPost = BlogPostBase & { fallbackTitle: string; fallbackExcerpt: string };

let baseCache: RawPost[] | null = null;

function getRawPosts(): RawPost[] {
  if (baseCache) return baseCache;
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map<RawPost>((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const fm = parseFrontmatter(raw, file);
    for (const k of REQUIRED) {
      if (!fm[k]) throw new Error(`Blog post ${file}: missing required frontmatter "${k}"`);
    }
    if (!READ_TIME_RE.test(fm.readTime)) {
      throw new Error(`Blog post ${file}: readTime "${fm.readTime}" must match "N min read"`);
    }
    return {
      slug: fm.slug,
      date: fm.date,
      readTime: fm.readTime,
      featured: fm.featured === "true",
      category: fm.category,
      categoryKey: fm.category.toLowerCase(),
      fallbackTitle: fm.title,
      fallbackExcerpt: fm.description,
    };
  });
  baseCache = posts;
  return posts;
}

const messagesCache = new Map<Locale, Record<string, unknown>>();

function loadMessages(locale: Locale): Record<string, unknown> {
  const cached = messagesCache.get(locale);
  if (cached) return cached;
  const raw = fs.readFileSync(path.join(MESSAGES_DIR, `${locale}.json`), "utf-8");
  const parsed = JSON.parse(raw);
  messagesCache.set(locale, parsed);
  return parsed;
}

function readBlogBranch(locale: Locale) {
  const j = loadMessages(locale) as {
    blog?: {
      posts?: Record<string, { title?: string; excerpt?: string }>;
      categories?: Record<string, string>;
    };
  };
  return {
    posts: j.blog?.posts ?? {},
    categories: j.blog?.categories ?? {},
  };
}

export function getPosts(locale: Locale): BlogPost[] {
  const raw = getRawPosts();
  const { posts, categories } = readBlogBranch(locale);
  return raw.map((p) => {
    const localized = posts[p.slug];
    let title = localized?.title;
    let excerpt = localized?.excerpt;
    if (!title) {
      console.warn(`[blog] missing blog.posts.${p.slug}.title for locale "${locale}"; falling back to frontmatter`);
      title = p.fallbackTitle;
    }
    if (!excerpt) {
      console.warn(`[blog] missing blog.posts.${p.slug}.excerpt for locale "${locale}"; falling back to frontmatter description`);
      excerpt = p.fallbackExcerpt;
    }
    let categoryLabel = categories[p.categoryKey];
    if (!categoryLabel) {
      console.warn(`[blog] missing blog.categories.${p.categoryKey} for locale "${locale}"; falling back to raw "${p.category}"`);
      categoryLabel = p.category;
    }
    return {
      slug: p.slug,
      date: p.date,
      readTime: p.readTime,
      featured: p.featured,
      category: p.category,
      categoryKey: p.categoryKey,
      title,
      excerpt,
      categoryLabel,
    };
  });
}

export function getFeaturedPost(locale: Locale): BlogPost {
  const featured = getPosts(locale).filter((p) => p.featured);
  if (featured.length !== 1) {
    throw new Error(`Expected exactly 1 featured blog post, found ${featured.length}`);
  }
  return featured[0];
}

export function getNonFeaturedPosts(locale: Locale): BlogPost[] {
  return getPosts(locale).filter((p) => !p.featured);
}

export function getTopicCounts(locale: Locale): { categoryKey: string; categoryLabel: string; count: number }[] {
  const counts = new Map<string, { categoryLabel: string; count: number }>();
  for (const p of getPosts(locale)) {
    const prev = counts.get(p.categoryKey);
    counts.set(p.categoryKey, {
      categoryLabel: p.categoryLabel,
      count: (prev?.count ?? 0) + 1,
    });
  }
  return Array.from(counts.entries()).map(([categoryKey, v]) => ({
    categoryKey,
    categoryLabel: v.categoryLabel,
    count: v.count,
  }));
}

export function formatBlogDate(iso: string, locale: Locale): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(dt);
}

export function formatReadTime(readTime: string, locale: Locale): string {
  if (locale !== "fr") return readTime;
  const m = readTime.match(/^(\d+)/);
  const n = m ? m[1] : readTime;
  return `${n} min de lecture`;
}

export function formatReadTimeCompact(readTime: string): string {
  const m = readTime.match(/^(\d+)/);
  return m ? `${m[1]} min` : readTime;
}

export function truncateWords(text: string, maxWords: number): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "…";
}
