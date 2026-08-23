import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import StickyCTA from "@/components/layout/StickyCTA";
import ThemeToggle from "@/components/layout/ThemeToggle";
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
  LocalBusinessJsonLd,
} from "@/components/seo/JsonLd";
import ClarityScript from "@/components/analytics/ClarityScript";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  Playfair_Display,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
} from "next/font/google";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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

  /* Feeds the default meta description, og:description and twitter:description.
     Pages that set their own description override the first but not the other
     two, so this string is what surfaced as twitter:description site-wide. Kept
     inside a 150 character budget so the offer is not the part that gets cut. */
  const descriptions = {
    fr: "Réduisez le temps perdu à chercher l’information, suivre l’avancement et relancer. Diagnostic opérationnel Deralis en deux jours.",
    en: "Reduce time lost searching for information, checking progress and following up. Two-day operational diagnostic from Deralis Digital.",
  };

  const localeKey = locale as keyof typeof titles;

  return {
    title: titles[localeKey] || titles.en,
    description: descriptions[localeKey] || descriptions.en,
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
      url:
        locale === "en"
          ? "https://www.deralis.digital"
          : `https://www.deralis.digital/${locale}`,
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
      canonical:
        locale === "en"
          ? "https://www.deralis.digital"
          : `https://www.deralis.digital/${locale}`,
      languages: {
        en: "https://www.deralis.digital",
        fr: "https://www.deralis.digital/fr",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${playfairDisplay.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
      /* The blocking script below sets data-theme before hydration to avoid a
         flash of the wrong theme. That intentional pre-hydration mutation is
         what React reported as an attribute mismatch. */
      suppressHydrationWarning
    >
      <head>
        <meta
          name="google-site-verification"
          content="O8l12K3_FkQbmJyZf8aa5_nlD7mgLLWhY63oficzeI4"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="canonical"
          href={
            locale === "en"
              ? "https://www.deralis.digital"
              : `https://www.deralis.digital/${locale}`
          }
        />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://www.deralis.digital"
        />
        <link
          rel="alternate"
          hrefLang="fr"
          href="https://www.deralis.digital/fr"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.deralis.digital"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('deralis-theme');document.documentElement.setAttribute('data-theme',t==='dark'||t==='light'?t:'light')}catch(e){document.documentElement.setAttribute('data-theme','light')}})()`,
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <OrganizationJsonLd />
          <WebSiteJsonLd />
          <LocalBusinessJsonLd />
          <SiteNav />
          <div style={{ position: "relative" }}>
  <div className="theme-toggle-desktop-overlay">
    <ThemeToggle />
  </div>

  <div className="theme-toggle-mobile-overlay">
    <ThemeToggle mobileEdgeMode />
  </div>

  <main id="main-content">{children}</main>
</div>
          <StickyCTA />
          <SiteFooter />
          <ClarityScript />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
