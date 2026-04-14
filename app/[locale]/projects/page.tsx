import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import Image from "next/image";
import DsCard, { DsCardPeak, DsCardFinal } from "@/components/shared/DsCard";
import RichText from "@/components/shared/RichText";
import { Link } from "@/i18n/navigation";
import type { CSSProperties } from "react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects.page.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: `https://www.deralis.digital/${locale}/projects`,
      images: [{ url: "https://www.deralis.digital/og-image.png", width: 1200, height: 630, alt: "Deralis Digital" }],
    },
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ProjectsHero />
      <TraviXOCaseStudy />
      <ProjectsClimax />
      <GovPortalCaseStudy />
      <ConceptsCard />
      <ProjectsFinalCTA />
    </>
  );
}

function ProjectsHero() {
  const t = useTranslations("projects.page.hero");
  const tActions = useTranslations("common.actions");
  return (
    <DsCard>
      <p style={eyebrow}>{t("eyebrow")}</p>
      <h1 style={h1Style} className="hero-h1-responsive">
        <RichText html={t.raw("title")} />
      </h1>
      <div style={subStack}>
        <p style={{ ...sub, color: "var(--text-primary)", fontWeight: 500 }}>{t("sub1")}</p>
        <p style={sub}>{t("sub2")}</p>
      </div>
      <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
        <Link href="/audit" style={ctaPrimary}>{tActions("discoverAudit")}</Link>
        <a href="#travixo" style={ctaSecondary}>{t("ctaSecondary")}</a>
      </div>
    </DsCard>
  );
}

function TraviXOCaseStudy() {
  const t = useTranslations("projects.page.travixo");
  const tScreenshots = useTranslations("projectDetail.travixo.screenshots");
  return (
    <DsCard id="travixo">
      <div className="grid-hero">
        <div>
          <p style={eyebrow}>{t("label")}</p>
          <h2 style={h2Style}>TraviXO Systems</h2>
          <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text-muted)", marginBottom: 24 }}>{t("context")}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
            <p style={sub}>{t("prose1")}</p>
            <p style={sub}>{t("prose2")}</p>
            <p style={sub}>{t("prose3")}</p>
            <p style={sub}>{t("prose4")}</p>
          </div>
          <Link href="/projects/travixo" style={ctaSecondary}>{t("linkLabel")} →</Link>
        </div>
        <div style={{ background: "var(--card-paper)", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-internal)", overflow: "hidden", boxShadow: "var(--tile-shadow)" }}>
          <Image
            src="/projects/travixo/travixo-dashboard.png"
            alt={tScreenshots("dashboard.alt")}
            width={1191}
            height={982}
            priority
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>
    </DsCard>
  );
}

function ProjectsClimax() {
  const t = useTranslations("common.auditCta");
  return (
    <DsCardPeak>
      <div className="grid-climax">
        <div>
          <p style={{ ...eyebrow, color: "var(--text-on-peak-dim)", marginBottom: 22 }}>{t("eyebrow")}</p>
          <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "clamp(38px, 4.6vw, 52px)", fontWeight: 500, lineHeight: 1.04, letterSpacing: "-0.02em", color: "var(--text-on-peak)", marginBottom: 28 }}>
            <RichText html={t.raw("headline")} />
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-on-peak-muted)", marginBottom: 14, maxWidth: "42ch" }}>{t("body1")}</p>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-on-peak-muted)", marginBottom: 32, maxWidth: "42ch" }}>{t("body2")}</p>
          <Link href="/audit" style={ctaPeak}>{t("ctaLabel")}</Link>
          <span style={{ display: "block", marginTop: 14, fontSize: 12, color: "var(--text-on-peak-dim)", fontStyle: "italic" }}>{t("ctaMeta")}</span>
        </div>
      </div>
    </DsCardPeak>
  );
}

function GovPortalCaseStudy() {
  const t = useTranslations("projects.page.govPortal");
  return (
    <DsCard>
      <div className="grid-hero">
        <div>
          <p style={eyebrow}>{t("label")}</p>
          <h2 style={h2Style}>{t("title")}</h2>
          <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text-muted)", marginBottom: 24 }}>{t("context")}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
            <p style={sub}>{t("prose1")}</p>
            <p style={sub}>{t("prose2")}</p>
          </div>
          <a href={t("url")} target="_blank" rel="noopener noreferrer" style={ctaSecondary}>{t("viewBuildLabel")} →</a>
        </div>
        <div style={{ background: "var(--card-paper)", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-internal)", overflow: "hidden", boxShadow: "var(--tile-shadow)" }}>
          <Image
            src="/projects/gov-portal/gov-portal.png"
            alt={t("screenshot.alt")}
            width={1534}
            height={730}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>
    </DsCard>
  );
}

function ConceptsCard() {
  const t = useTranslations("projects.page.concepts");
  const items = ["1", "2", "3", "4"].map((num) => ({
    num: `0${num}`,
    title: t(`items.${num}.title`),
    desc: t(`items.${num}.desc`),
    url: t(`items.${num}.url`),
    linkLabel: t(`items.${num}.linkLabel`),
  }));

  return (
    <DsCard>
      <p style={eyebrow}>{t("eyebrow")}</p>
      <h2 style={h2Style}>{t("title")}</h2>
      <p style={{ ...sub, marginBottom: 48, maxWidth: "58ch" }}>{t("intro")}</p>

      <div className="grid-2col">
        {items.map((item) => (
          <div key={item.num} style={conceptCard}>
            <span style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 16, fontWeight: 600, color: "var(--accent)", display: "block", marginBottom: 12 }}>{item.num}</span>
            <h3 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 20, fontWeight: 500, color: "var(--text-primary)", marginBottom: 10, letterSpacing: "-0.01em" }}>{item.title}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-secondary)", marginBottom: 16 }}>{item.desc}</p>
            <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)", textDecoration: "none", borderBottom: "1px solid var(--border-strong)", paddingBottom: 2 }}>{item.linkLabel} →</a>
          </div>
        ))}
      </div>
    </DsCard>
  );
}

function ProjectsFinalCTA() {
  const t = useTranslations("projects.page.finalCta");
  const tActions = useTranslations("common.actions");
  return (
    <DsCardFinal>
      <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 500, lineHeight: 1.1, margin: "0 auto 22px", letterSpacing: "-0.02em", maxWidth: "22ch" }}>
        <RichText html={t.raw("title")} />
      </h2>
      <p style={{ fontSize: 16, color: "var(--text-secondary)", maxWidth: "52ch", margin: "0 auto 36px", lineHeight: 1.55 }}>{t("body")}</p>
      <div style={{ display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/audit" style={ctaPrimary}>{tActions("discoverAudit")}</Link>
        <a href="mailto:contact@deralis.digital" style={ctaSecondary}>contact@deralis.digital</a>
      </div>
      <p style={{ marginTop: 24, fontSize: 13, color: "var(--text-muted)" }}>{t("note")}</p>
    </DsCardFinal>
  );
}

const eyebrow: CSSProperties = { fontSize: "var(--fs-eyebrow)", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--text-muted)", marginBottom: 20, fontWeight: 600 };
const h1Style: CSSProperties = { fontFamily: "var(--font-fraunces), serif", fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.02, letterSpacing: "-0.02em", marginBottom: 36, maxWidth: "20ch" };
const h2Style: CSSProperties = { fontFamily: "var(--font-fraunces), serif", fontSize: "var(--fs-h2)", fontWeight: 500, lineHeight: 1.08, letterSpacing: "-0.015em", marginBottom: 16, maxWidth: "22ch" };
const subStack: CSSProperties = { display: "flex", flexDirection: "column", gap: 14, marginBottom: 32, maxWidth: "52ch" };
const sub: CSSProperties = { fontSize: 17, lineHeight: 1.55, color: "var(--text-secondary)" };
const ctaPrimary: CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 12, padding: "17px 30px",
  background: "var(--text-primary)", color: "var(--canvas)", fontSize: 14, fontWeight: 500,
  border: "none", borderRadius: "var(--radius-button)", cursor: "pointer", textDecoration: "none",
};
const ctaSecondary: CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 6, padding: "16px 4px",
  color: "var(--text-primary)", fontSize: 14, fontWeight: 500, textDecoration: "none",
};
const ctaPeak: CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 12, padding: "18px 32px",
  background: "var(--text-on-peak)", color: "var(--card-peak)", fontSize: 14, fontWeight: 600,
  border: "none", borderRadius: "var(--radius-button)", cursor: "pointer", textDecoration: "none",
};
const conceptCard: CSSProperties = {
  background: "var(--card-paper)", border: "1px solid var(--border-soft)",
  borderLeft: "3px solid var(--accent)", borderRadius: "var(--radius-internal)", padding: "28px 24px",
};
