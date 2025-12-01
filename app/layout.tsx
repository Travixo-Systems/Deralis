import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://deralis.digital"),
  title: {
    default: "Deralis Digital – Modern Web Development & Digital Transformation",
    template: "%s | Deralis Digital",
  },
  description:
    "We build high-performance websites, custom web applications, workflow automations and AI-powered tools that help businesses modernize and scale efficiently.",
  keywords: [
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
    locale: "en_US",
    url: "https://deralis.digital",
    siteName: "Deralis Digital",
    title: "Deralis Digital – Modern Web Development & Digital Transformation",
    description:
      "We build high-performance websites, custom web applications, workflow automations and AI-powered tools that help businesses modernize and scale efficiently.",
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
    title: "Deralis Digital – Modern Web Development & Digital Transformation",
    description:
      "We build high-performance websites, custom web applications, workflow automations and AI-powered tools.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-[var(--dd-bg)] text-[var(--dd-text-main)] antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
