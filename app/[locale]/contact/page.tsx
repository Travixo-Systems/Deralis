import { setRequestLocale, getTranslations } from "next-intl/server";
import DsCard, { DsCardFinal } from "@/components/shared/DsCard";
import ContactForm from "@/components/contact/ContactForm";
import type { CSSProperties } from "react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.page" });
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      type: "website" as const,
      url: `https://www.deralis.digital/${locale}/contact`,
      images: [{ url: "https://www.deralis.digital/og-image.png", width: 1200, height: 630, alt: "Deralis Digital" }],
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContactHero />
      <FormCard />
      <ContactFinal />
    </>
  );
}

async function ContactHero() {
  const t = await getTranslations("contact.page.hero");
  return (
    <DsCard>
      <p style={eyebrow}>{t("eyebrow")}</p>
      <h1 style={h1Style} className="hero-h1-responsive">{t("title")}</h1>
      <p style={sub}>{t("sub")}</p>
    </DsCard>
  );
}

async function FormCard() {
  return (
    <DsCard>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <ContactForm />
      </div>
    </DsCard>
  );
}

async function ContactFinal() {
  const t = await getTranslations("contact.page.final");
  return (
    <DsCardFinal>
      <h2 style={h2}>{t("h2")}</h2>
      <p style={metaRow}>
        <a href={`mailto:${t("email")}`} style={emailLink}>{t("email")}</a>
        <span style={dot}>·</span>
        <span>{t("location")}</span>
        <span style={dot}>·</span>
        <span>{t("languages")}</span>
      </p>
    </DsCardFinal>
  );
}

const eyebrow: CSSProperties = {
  fontSize: "var(--fs-eyebrow)", textTransform: "uppercase", letterSpacing: "0.14em",
  color: "var(--text-muted)", marginBottom: 26, fontWeight: 600,
};
const h1Style: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "var(--fs-h1)",
  fontWeight: 500, lineHeight: 1.02, letterSpacing: "-0.02em", marginBottom: 26, maxWidth: "16ch",
};
const sub: CSSProperties = {
  fontSize: 18, lineHeight: 1.55, color: "var(--text-secondary)", maxWidth: "52ch",
};
const h2: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "clamp(28px, 3.5vw, 36px)",
  fontWeight: 500, lineHeight: 1.15, margin: "0 auto 18px",
  letterSpacing: "-0.015em", maxWidth: "24ch",
};
const metaRow: CSSProperties = {
  fontSize: 13, color: "var(--text-muted)", display: "flex", justifyContent: "center",
  alignItems: "center", gap: 14, flexWrap: "wrap",
};
const emailLink: CSSProperties = {
  color: "var(--text-primary)", textDecoration: "none", borderBottom: "1px solid var(--border-strong)",
  paddingBottom: 1, fontWeight: 500,
};
const dot: CSSProperties = {
  color: "var(--border-strong)",
};
