import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import ThemeToggle from "@/components/layout/ThemeToggle";
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
  LocalBusinessJsonLd,
} from "@/components/seo/JsonLd";
import ClarityScript from "@/components/analytics/ClarityScript";
import { Analytics } from "@vercel/analytics/next";
import { Playfair_Display, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
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
      default: "Deralis Digital",
      template: "%s · Deralis Digital",
    },
    en: {
      default: "Deralis Digital",
      template: "%s · Deralis Digital",
    },
  };

  const descriptions = {
    fr: "Cabinet d'ingénierie des systèmes indépendant. Je construis les systèmes opérationnels pour les entreprises dont les outils ont dépassé la façon dont l'information circule entre eux.",
    en: "Independent systems engineering practice. I build the operational systems that fix businesses whose tools have outgrown the way information moves between them.",
  };

  const localeKey = locale as keyof typeof titles;

  return {
    title: titles[localeKey] || titles.en,
    description: descriptions[localeKey] || descriptions.en,
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
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: locale === "en" ? "https://www.deralis.digital" : `https://www.deralis.digital/${locale}`,
      siteName: "Deralis Digital",
      title: titles[localeKey]?.default || titles.en.default,
      description: descriptions[localeKey] || descriptions.en,
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
      title: titles[localeKey]?.default || titles.en.default,
      description: descriptions[localeKey] || descriptions.en,
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
      canonical: locale === "en" ? "https://www.deralis.digital" : `https://www.deralis.digital/${locale}`,
      languages: {
        "en": "https://www.deralis.digital",
        "fr": "https://www.deralis.digital/fr",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${playfairDisplay.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <head>
        <meta name="google-site-verification" content="O8l12K3_FkQbmJyZf8aa5_nlD7mgLLWhY63oficzeI4" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="canonical"
          href={locale === "en" ? "https://www.deralis.digital" : `https://www.deralis.digital/${locale}`}
        />
        <link rel="alternate" hrefLang="en" href="https://www.deralis.digital" />
        <link rel="alternate" hrefLang="fr" href="https://www.deralis.digital/fr" />
        <link rel="alternate" hrefLang="x-default" href="https://www.deralis.digital" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('deralis-theme');if(t){document.documentElement.setAttribute('data-theme',t)}else if(window.matchMedia('(prefers-color-scheme:dark)').matches){document.documentElement.setAttribute('data-theme','dark')}}catch(e){}})()` }} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-link">Skip to content</a>
          <OrganizationJsonLd />
          <WebSiteJsonLd />
          <LocalBusinessJsonLd />
          <SiteNav />
          <div style={{ position: "relative" }}>
            <div
              className="theme-toggle-wrap"
              style={{
                position: "sticky",
                top: 96,
                zIndex: 50,
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: 28,
                marginBottom: -48,
                pointerEvents: "none",
              }}
            >
              <ThemeToggle style={{ pointerEvents: "auto" }} />
            </div>
            <main id="main-content">{children}</main>
          </div>
          <SiteFooter />
          <ClarityScript />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
