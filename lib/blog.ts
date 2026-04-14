import fs from "fs";
import path from "path";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  description: string;
  featured: boolean;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
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

let cache: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (cache) return cache;
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map<BlogPost>((file) => {
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
      title: fm.title,
      date: fm.date,
      category: fm.category,
      readTime: fm.readTime,
      description: fm.description,
      featured: fm.featured === "true",
    };
  });
  cache = posts;
  return posts;
}

export function getFeaturedPost(): BlogPost {
  const featured = getAllPosts().filter((p) => p.featured);
  if (featured.length !== 1) {
    throw new Error(`Expected exactly 1 featured blog post, found ${featured.length}`);
  }
  return featured[0];
}

export function getNonFeaturedPosts(): BlogPost[] {
  return getAllPosts()
    .filter((p) => !p.featured)
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getTopicCounts(): Map<string, number> {
  const counts = new Map<string, number>();
  for (const p of getAllPosts()) {
    counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  }
  return counts;
}

export function formatBlogDate(iso: string, locale: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(dt);
}

export function formatReadTime(readTime: string, locale: string): string {
  if (locale !== "fr") return readTime;
  const m = readTime.match(/^(\d+)/);
  const n = m ? m[1] : readTime;
  return `${n} min de lecture`;
}
