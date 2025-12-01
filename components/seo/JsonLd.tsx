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
      "We build high-performance websites, custom web applications, workflow automations and AI-powered tools that help businesses modernize and scale efficiently.",
    email: "deralisdigital@gmail.com",
    foundingDate: "2024",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "deralisdigital@gmail.com",
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
      "Modern web development and digital transformation services. We build high-performance websites, custom web applications, and AI-powered tools.",
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
    email: "deralisdigital@gmail.com",
    description:
      "Full-stack web development agency specializing in Next.js, TypeScript, Supabase, and AI workflow automation.",
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
      "Web Development",
      "Custom Web Applications",
      "SaaS Development",
      "AI Workflow Automation",
      "Digital Transformation",
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
      name: "Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Strategic Consulting",
            description:
              "Architecture planning, tech stack selection, and roadmap development for your project.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full-Stack Development",
            description:
              "Complete web application development with Next.js, TypeScript, and Supabase.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Tools & Custom GPT",
            description:
              "Custom AI integrations and GPT-powered tools for business automation.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Support & Automation",
            description:
              "Ongoing maintenance, workflow automation, and technical support.",
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
