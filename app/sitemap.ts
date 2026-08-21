import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const BASE_URL = "https://www.deralis.digital";
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

type Page = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

/**
 * Blog routes are derived from disk rather than hand-listed. A hand-maintained
 * list silently drops every new article, which is the failure mode a content
 * programme hits first.
 */
function blogPages(): Page[] {
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => ({
      path: `/blog/${e.name.replace(/\.md$/, "")}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
    .sort((a, b) => a.path.localeCompare(b.path));
}

/**
 * True when a French version of this route actually exists. Advertising
 * hreflang="fr" for a route that falls back to English body text is a mismatch
 * search engines penalise, so the alternate is only emitted when it is real.
 * Non-blog routes are fully translated through the message catalogue.
 */
function hasFrench(routePath: string): boolean {
  const slug = routePath.startsWith("/blog/") ? routePath.slice("/blog/".length) : null;
  if (!slug) return true;
  return fs.existsSync(path.join(BLOG_DIR, "fr", `${slug}.md`));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Page[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/methode", changeFrequency: "monthly", priority: 0.9 },
    { path: "/diagnostic", changeFrequency: "monthly", priority: 0.9 },
    { path: "/projects", changeFrequency: "weekly", priority: 0.8 },
    { path: "/projects/travixo", changeFrequency: "monthly", priority: 0.7 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    ...blogPages(),
    { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
    { path: "/legal", changeFrequency: "yearly", priority: 0.3 },
  ];

  const lastModified = new Date();

  return pages.flatMap((page) => {
    const fr = hasFrench(page.path);
    const languages: Record<string, string> = {
      en: `${BASE_URL}${page.path}`,
      "x-default": `${BASE_URL}${page.path}`,
    };
    if (fr) languages.fr = `${BASE_URL}/fr${page.path}`;

    const entries: MetadataRoute.Sitemap = [
      {
        url: `${BASE_URL}${page.path}`,
        lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages },
      },
    ];

    if (fr) {
      entries.push({
        url: `${BASE_URL}/fr${page.path}`,
        lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages },
      });
    }

    return entries;
  });
}
