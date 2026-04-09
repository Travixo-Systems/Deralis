import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://deralis.digital";

  const pages = [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/services", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/projects", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/blog", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/blog/why-profitable-businesses-run-on-manual-work", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/blog/web-system-not-just-a-website", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/blog/saas-vs-custom-build", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/blog/roi-workflow-automation-small-business", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/blog/why-nextjs-production-apps", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/blog/ai-business-operations-honest-guide", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/projects/travixo", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/audit", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/legal", changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  return pages.flatMap((page) => [
    {
      url: `${baseUrl}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          en: `${baseUrl}${page.path}`,
          fr: `${baseUrl}/fr${page.path}`,
        },
      },
    },
    {
      url: `${baseUrl}/fr${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          en: `${baseUrl}${page.path}`,
          fr: `${baseUrl}/fr${page.path}`,
        },
      },
    },
  ]);
}
