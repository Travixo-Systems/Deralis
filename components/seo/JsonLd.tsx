export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://deralis.digital/#organization",
    name: "Deralis Digital",
    url: "https://deralis.digital",
    logo: {
      "@type": "ImageObject",
      url: "https://deralis.digital/og-image.png",
      width: 1200,
      height: 630,
    },
    description:
      "I build the operational systems businesses need to operate. SaaS platforms, dashboards, and workflow automation.",
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
    "@id": "https://deralis.digital/#website",
    url: "https://deralis.digital",
    name: "Deralis Digital",
    description:
      "I build the operational systems businesses need to operate. Operational tools, SaaS platforms, and workflow automation.",
    publisher: {
      "@id": "https://deralis.digital/#organization",
    },
    inLanguage: "en-US",
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
    "@id": "https://deralis.digital/#localbusiness",
    name: "Deralis Digital",
    image: "https://deralis.digital/og-image.png",
    url: "https://deralis.digital",
    email: "contact@deralis.digital",
    description:
      "Independent engineering practice building operational systems with Next.js, TypeScript, Supabase, and PostgreSQL.",
    address: {
      "@type": "PostalAddress",
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
      "Systems Audit",
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
    "@id": "https://deralis.digital/services#service",
    serviceType: "Web Development Services",
    provider: {
      "@id": "https://deralis.digital/#organization",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Custom Systems Engineering",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Systems Audit",
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
