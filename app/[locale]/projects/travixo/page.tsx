import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import Image from "next/image";
import DsCard, { DsCardPeak } from "@/components/shared/DsCard";
import RichText from "@/components/shared/RichText";
import { Link } from "@/i18n/navigation";
import type { CSSProperties } from "react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projectDetail.travixo.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "article",
      url: `https://www.deralis.digital/${locale}/projects/travixo`,
      images: [{ url: "https://www.deralis.digital/og-image.png", width: 1200, height: 630, alt: "Deralis Digital" }],
    },
  };
}

export default async function TraviXoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <TraviXoHeroWithScreenshot />
      <WhatItIsCard />
      <WhatIBuiltCard />
      <InsideCard />
      <TechAndLinksCard />
      <TraviXoClimax />
    </>
  );
}

/* ========== Card 1: Hero + Lead Screenshot combined ========== */
function TraviXoHeroWithScreenshot() {
  const t = useTranslations("projectDetail.travixo");
  const tLabels = useTranslations("projectDetail.labels");
  const tScreenshots = useTranslations("projectDetail.travixo.screenshots");

  const metaCells = [
    { label: tLabels("category"), value: t("meta.category") },
    { label: tLabels("role"), value: t("meta.role") },
    { label: tLabels("status"), value: t("meta.status") },
    { label: tLabels("started"), value: t("meta.started"), muted: true },
  ];

  return (
    <DsCard>
      <p style={eyebrow}>{t("eyebrow")}</p>
      <h1 style={h1Style} className="hero-h1-responsive">
        <RichText html={t.raw("title")} />
      </h1>
      <p style={standfirst}>{t("standfirst")}</p>

      {/* Internal meta grid (anchor #1) */}
      <div className="grid-process" style={{ paddingTop: 28, marginTop: 28, marginBottom: 40, borderTop: "2px solid var(--border-strong)" }}>
        {metaCells.map((cell) => (
          <div key={cell.label}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{cell.label}</p>
            <p style={{ fontSize: 14, lineHeight: 1.4, color: "var(--text-primary)", fontWeight: cell.muted ? 400 : 500 }}>{cell.value}</p>
          </div>
        ))}
      </div>

      {/* Lead screenshot (visual anchor) */}
      <div style={{ background: "var(--card-paper)", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-internal)", overflow: "hidden", boxShadow: "var(--tile-shadow)" }}>
        <Image
          src="/projects/travixo/travixo-dashboard.png"
          alt={tScreenshots("lead.alt")}
          width={1191}
          height={982}
          priority
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    </DsCard>
  );
}

/* ========== Card 2: What It Is ========== */
function WhatItIsCard() {
  const t = useTranslations("projectDetail.travixo.whatItIs");
  const tLabels = useTranslations("projectDetail.labels");
  return (
    <DsCard>
      <p style={eyebrow}>{tLabels("whatItIs")}</p>
      <h2 style={h2Style}>{t("title")}</h2>
      <div style={{ maxWidth: "58ch", display: "flex", flexDirection: "column", gap: 20 }}>
        <p style={bodyP}>{t("p1")}</p>
        <p style={bodyP}>{t("p2")}</p>
        <p style={bodyP}>{t("p3")}</p>
        <p style={{ ...bodyP, color: "var(--text-primary)", fontWeight: 500 }}>
          <RichText html={t.raw("p4")} />
        </p>
      </div>
    </DsCard>
  );
}

/* ========== Card 3: What I Built (5 items) ========== */
function WhatIBuiltCard() {
  const t = useTranslations("projectDetail.travixo.whatIBuilt");
  const tLabels = useTranslations("projectDetail.labels");
  const items = ["1", "2", "3", "4", "5"] as const;
  return (
    <DsCard>
      <p style={eyebrow}>{tLabels("whatIBuilt")}</p>
      <h2 style={h2Style}>{t("title")}</h2>
      <div style={{ maxWidth: 820, marginTop: 20 }}>
        {items.map((num, i) => (
          <div key={num} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 24, padding: "28px 0", borderTop: "1px solid var(--border-soft)", borderBottom: i === items.length - 1 ? "1px solid var(--border-soft)" : undefined, alignItems: "start" }}>
            <span style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 18, fontWeight: 600, color: "var(--accent)", paddingTop: 2 }}>0{num}</span>
            <div>
              <h3 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 20, fontWeight: 500, color: "var(--text-primary)", marginBottom: 10, letterSpacing: "-0.01em" }}>{t(`items.${num}.title`)}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--text-secondary)", maxWidth: "58ch" }}>{t(`items.${num}.body`)}</p>
            </div>
          </div>
        ))}
      </div>
    </DsCard>
  );
}

/* ========== Card 4: Inside the System (2 screenshots, visual anchor) ========== */
function InsideCard() {
  const t = useTranslations("projectDetail.travixo.inside");
  const tLabels = useTranslations("projectDetail.labels");
  const tScreenshots = useTranslations("projectDetail.travixo.screenshots");
  const shots = [
    { src: "/projects/travixo/travixo-fleet.png", w: 875, h: 935, alt: tScreenshots("equipmentRegister.alt"), cap: t("cap1") },
    { src: "/projects/travixo/travixo-qr.png", w: 971, h: 943, alt: tScreenshots("inspectionWorkflow.alt"), cap: t("cap2") },
  ];
  return (
    <DsCard>
      <p style={eyebrow}>{tLabels("insideTheSystem")}</p>
      <h2 style={h2Style}>{t("title")}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 56, marginTop: 32 }}>
        {shots.map((shot, i) => (
          <div key={i}>
            <div style={{ background: "var(--card-paper)", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-internal)", overflow: "hidden", boxShadow: "var(--tile-shadow)" }}>
              <Image src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.55, marginTop: 16, maxWidth: "58ch" }}>{shot.cap}</p>
          </div>
        ))}
      </div>
    </DsCard>
  );
}

/* ========== Card 5: Tech Stack + Links combined ========== */
function TechAndLinksCard() {
  const tStack = useTranslations("projectDetail.travixo.stack");
  const tLinks = useTranslations("projectDetail.travixo.links");
  const tLabels = useTranslations("projectDetail.labels");
  const layers = ["frontend", "backend", "data", "infrastructure", "tooling"] as const;

  return (
    <DsCard>
      <p style={eyebrow}>{tStack("eyebrow")}</p>
      <h2 style={h2Style}>{tStack("title")}</h2>
      <p style={{ ...bodyP, marginBottom: 32, maxWidth: "58ch" }}>{tStack("intro")}</p>

      <div style={{ maxWidth: 820, marginBottom: 56 }}>
        {layers.map((layer, i) => (
          <div key={layer} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 32, padding: "20px 0", borderTop: "1px solid var(--border-soft)", borderBottom: i === layers.length - 1 ? "1px solid var(--border-soft)" : undefined, alignItems: "baseline" }} className="tech-row-responsive">
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{tStack(`layers.${layer}.label`)}</span>
            <span style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>{tStack(`layers.${layer}.items`)}</span>
          </div>
        ))}
      </div>

      {/* Links */}
      <p style={{ ...eyebrow, marginBottom: 16 }}>{tLabels("whereToFind")}</p>
      <div style={{ maxWidth: 820 }}>
        <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 32, padding: "20px 0", borderTop: "1px solid var(--border-soft)", alignItems: "baseline" }} className="tech-row-responsive">
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{tLinks("liveLabel")}</span>
          <a href="https://app.travixosystems.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 15, color: "var(--text-primary)", textDecoration: "none", borderBottom: "1px solid var(--text-primary)", paddingBottom: 2 }}>{tLinks("liveValue")}</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 32, padding: "20px 0", borderTop: "1px solid var(--border-soft)", borderBottom: "1px solid var(--border-soft)", alignItems: "baseline" }} className="tech-row-responsive">
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{tLinks("repoLabel")}</span>
          <span style={{ fontSize: 15, color: "var(--text-muted)" }}>{tLinks("repoValue")}</span>
        </div>
      </div>
    </DsCard>
  );
}

/* ========== Card 6: AuditCTA climax ========== */
function TraviXoClimax() {
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

const eyebrow: CSSProperties = { fontSize: "var(--fs-eyebrow)", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--text-muted)", marginBottom: 20, fontWeight: 600 };
const h1Style: CSSProperties = { fontFamily: "var(--font-fraunces), serif", fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.02, letterSpacing: "-0.02em", marginBottom: 28, maxWidth: "20ch" };
const h2Style: CSSProperties = { fontFamily: "var(--font-fraunces), serif", fontSize: "var(--fs-h2)", fontWeight: 500, lineHeight: 1.08, letterSpacing: "-0.015em", marginBottom: 20, maxWidth: "22ch" };
const standfirst: CSSProperties = { fontSize: 20, fontWeight: 500, lineHeight: 1.5, color: "var(--text-primary)", maxWidth: "54ch" };
const bodyP: CSSProperties = { fontSize: 17, lineHeight: 1.65, color: "var(--text-secondary)" };
const ctaPeak: CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 12, padding: "18px 32px",
  background: "var(--text-on-peak)", color: "var(--card-peak)", fontSize: 14, fontWeight: 600,
  border: "none", borderRadius: "var(--radius-button)", cursor: "pointer", textDecoration: "none",
};
