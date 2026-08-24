import { BASE_URL, localeUrl } from "@/i18n/urls";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Deralis Digital",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
    },
    description:
      "Deralis Digital helps profitable, established businesses reduce time spent searching for information, checking progress and following up. The work starts with a two-day operational diagnostic.",
    email: "contact@deralis.digital",
    foundingDate: "2024",
    sameAs: [
      "https://github.com/theWQLker",
      "https://www.linkedin.com/in/uwaugboaja",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "contact@deralis.digital",
      availableLanguage: ["English", "French"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Deralis Digital",
    description:
      "Deralis Digital helps profitable, established businesses reduce time spent searching for information, checking progress and following up. The work starts with a two-day operational diagnostic.",
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    inLanguage: ["fr-FR", "en-GB"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE_URL}/#localbusiness`,
    name: "Deralis Digital",
    image: `${BASE_URL}/og-image.png`,
    url: BASE_URL,
    email: "contact@deralis.digital",
    description:
      "Independent engineering practice building operational systems with Next.js, TypeScript, Supabase, and PostgreSQL.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "57 rue Léo Lagrange",
      postalCode: "93130",
      addressLocality: "Noisy-le-Sec",
      addressCountry: "FR",
    },
    priceRange: "€€€",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: [
      {
        "@type": "Country",
        name: "France",
      },
      {
        "@type": "Place",
        name: "Worldwide",
      },
    ],
    serviceType: [
      "Custom Systems",
      "Workflow Automation",
      "SaaS Development",
      "Operational Diagnostic",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServicesJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/methode#service`,
    serviceType: "Web Development Services",
    provider: {
      "@id": `${BASE_URL}/#organization`,
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Operational Diagnostic and Custom Systems",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Operational Diagnostic",
            description:
              "Structured mapping of your current operation to define what to build and in what order.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Operational System",
            description:
              "One system that shows where work is, what is blocked, and what needs to happen next.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Extensions",
            description:
              "Automation, integrations, and additional workflows built on top of the working foundation.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ongoing Support",
            description:
              "Maintenance and iteration for clients who want continued support.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Article markup for a single blog post.
 *
 * What this is documented to do: help Google understand the author, headline,
 * dates and image of the page. It is not required for Top Stories, and
 * structured data is not required for Discover, so it should not be justified
 * on either. https://developers.google.com/search/docs/appearance/structured-data/article
 *
 * The author is the named person rather than the organisation, and `sameAs`
 * points at profiles that already exist. The defensible claim for that is
 * identification and disambiguation of the author, not a ranking effect:
 * Google states E-E-A-T is not a ranking factor.
 *
 * `dateModified` falls back to `datePublished`: claiming an article was updated
 * when it was not is a freshness signal that is not real.
 */
export function ArticleJsonLd({
  headline,
  description,
  slug,
  locale,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  slug: string;
  locale: string;
  datePublished: string;
  dateModified?: string;
}) {
  // An article with no date in its frontmatter would emit BlogPosting without
  // datePublished, which is invalid. Better to emit nothing than something wrong.
  if (!datePublished) return null;

  const url = localeUrl(locale, `/blog/${slug}`);
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline,
    description,
    inLanguage: locale === "fr" ? "fr-FR" : "en-GB",
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: "Uwa Ugboaja",
      url: `${BASE_URL}/about`,
      sameAs: [
        "https://github.com/theWQLker",
        "https://www.linkedin.com/in/uwaugboaja",
      ],
    },
    publisher: { "@id": `${BASE_URL}/#organization` },
    image: `${BASE_URL}/og-image.png`,
    isPartOf: { "@id": `${BASE_URL}/#website` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
