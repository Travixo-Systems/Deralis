import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.deralis.digital";

  return {
    rules: [
      {
        userAgent: ["Googlebot", "Bingbot"],
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // AI search, citation and user-retrieval agents. DELIBERATELY ALLOWED:
      // these are what make the site retrievable by AI answer engines. Never move
      // any of them into the training-crawler rule below.
      //
      // Google-Extended is a control token, not a crawler: it governs whether
      // Gemini may train on and ground against content Googlebot already fetched.
      // Allowed knowingly, trading possible training use for Gemini Apps and
      // Vertex AI grounding eligibility. AI Overviews are unaffected either way,
      // since those follow normal Search indexing and snippet rules under Googlebot.
      {
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
        ],
        allow: "/",
        disallow: ["/api/"],
      },
      // Pure training crawlers, blocked where training is separable from search.
      {
        userAgent: ["GPTBot", "ClaudeBot", "anthropic-ai", "CCBot"],
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
