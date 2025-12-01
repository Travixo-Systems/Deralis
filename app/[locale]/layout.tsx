import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
  LocalBusinessJsonLd,
} from "@/components/seo/JsonLd";
import { Manrope, Inter } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const titles = {
    fr: {
      default: "Deralis Digital – Systèmes web modernes & Transformation digitale",
      template: "%s | Deralis Digital",
    },
    en: {
      default: "Deralis Digital – Modern Web Development & Digital Transformation",
      template: "%s | Deralis Digital",
    },
  };

  const descriptions = {
    fr: "Nous créons des plateformes web performantes, des applications sur mesure, des automatisations et des outils IA qui aident les entreprises à se moderniser et à évoluer efficacement.",
    en: "We build high-performance websites, custom web applications, workflow automations and AI-powered tools that help businesses modernize and scale efficiently.",
  };

  const localeKey = locale as keyof typeof titles;

  return {
    title: titles[localeKey] || titles.fr,
    description: descriptions[localeKey] || descriptions.fr,
    keywords: locale === "fr"
      ? [
          "développement web",
          "agence web France",
          "transformation digitale",
          "automatisation IA",
          "applications web sur mesure",
          "développeur Next.js",
          "développeur Supabase",
          "développement SaaS",
        ]
      : [
          "web development agency",
          "digital transformation",
          "AI workflow automation",
          "custom web applications",
          "Next.js developer",
          "Supabase developer",
          "SaaS development",
          "web agency France",
        ],
    authors: [{ name: "Deralis Digital" }],
    creator: "Deralis Digital",
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: locale === "fr" ? "https://www.deralis.digital" : `https://www.deralis.digital/${locale}`,
      siteName: "Deralis Digital",
      title: titles[localeKey]?.default || titles.fr.default,
      description: descriptions[localeKey] || descriptions.fr,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Deralis Digital",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[localeKey]?.default || titles.fr.default,
      description: descriptions[localeKey] || descriptions.fr,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: locale === "fr" ? "https://www.deralis.digital" : `https://www.deralis.digital/${locale}`,
      languages: {
        "fr": "https://www.deralis.digital",
        "en": "https://www.deralis.digital/en",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Provide all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${manrope.variable} ${inter.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="canonical"
          href={locale === "fr" ? "https://www.deralis.digital" : `https://www.deralis.digital/${locale}`}
        />
        <link rel="alternate" hrefLang="fr" href="https://www.deralis.digital" />
        <link rel="alternate" hrefLang="en" href="https://www.deralis.digital/en" />
        <link rel="alternate" hrefLang="x-default" href="https://www.deralis.digital" />
      </head>
      <body className="min-h-screen bg-[var(--dd-bg)] text-[var(--dd-text-main)] antialiased">
        <NextIntlClientProvider messages={messages}>
          <OrganizationJsonLd />
          <WebSiteJsonLd />
          <LocalBusinessJsonLd />
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
