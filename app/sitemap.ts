import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { routing } from "@/i18n/routing";
import { localeUrl } from "@/i18n/urls";
import { articleExistsInLocale } from "@/lib/blog";

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
 * True when this route exists in the given locale. Advertising an hreflang for
 * a route that falls back to the other language is a mismatch search engines
 * penalise, so the alternate is only emitted when it is real. Non-blog routes
 * are fully translated through the message catalogue, so only articles are
 * checked against disk — via the same helper the article pages use, so the
 * sitemap and the pages cannot disagree.
 */
function existsInLocale(routePath: string, locale: string): boolean {
  if (!routePath.startsWith("/blog/")) return true;
  return articleExistsInLocale(routePath.slice("/blog/".length), locale);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Page[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/methode", changeFrequency: "monthly", priority: 0.9 },
    { path: "/diagnostic", changeFrequency: "monthly", priority: 0.9 },
    { path: "/frictions-operationnelles", changeFrequency: "monthly", priority: 0.8 },
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
    // Only advertise a locale whose content actually exists. hreflang pointing
    // at a route that falls back to the other language is a mismatch search
    // engines penalise.
    const locales = routing.locales.filter((l) => existsInLocale(page.path, l));

    const languages: Record<string, string> = {};
    for (const l of locales) languages[l] = localeUrl(l, page.path);
    languages["x-default"] = localeUrl(routing.defaultLocale, page.path);

    return locales.map((l) => ({
      url: localeUrl(l, page.path),
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages },
    }));
  });
}
