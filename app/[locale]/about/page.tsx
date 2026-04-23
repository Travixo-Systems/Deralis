import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import DsCard, { DsCardPeak } from "@/components/shared/DsCard";
import RichText from "@/components/shared/RichText";
import { Link } from "@/i18n/navigation";
import type { CSSProperties } from "react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.page.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: `https://www.deralis.digital/${locale}/about`,
      images: [{ url: "https://www.deralis.digital/og-image.png", width: 1200, height: 630, alt: "Deralis Digital" }],
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <BackgroundCard />
      <PrinciplesCard />
      <BuildingCard />
      <AboutClimax />
    </>
  );
}

/* ========== Card 1: Hero ========== */
function AboutHero() {
  const t = useTranslations("about.page.hero");
  return (
    <DsCard>
      <p style={eyebrow}>{t("eyebrow")}</p>
      <h1 style={h1Style} className="hero-h1-responsive">
        <RichText html={t.raw("title")} />
      </h1>
      <div style={subStack}>
        <p style={{ ...sub, color: "var(--text-primary)", fontWeight: 500 }}>{t("sub1")}</p>
        <p style={sub}>{t("sub2")}</p>
        <p style={sub}>{t("sub3")}</p>
        <p style={sub}>{t("sub4")}</p>
      </div>
      <Link href="#principles" style={ctaSecondary}>{t("ctaSecondary")}</Link>
    </DsCard>
  );
}

/* ========== Card 2: Background (with internal anchor block) ========== */
function BackgroundCard() {
  const t = useTranslations("about.page.background");
  return (
    <DsCard>
      <div className="grid-hero">
        <div>
          <p style={eyebrow}>{t("eyebrow")}</p>
          <h2 style={h2Style}><RichText html={t.raw("title")} /></h2>
          <p style={{ ...introP, maxWidth: "52ch" }}>{t("intro")}</p>
          <p style={{ ...introP, maxWidth: "52ch", marginTop: 24 }}>
            <RichText html={t.raw("closing")} />
          </p>
        </div>

        {/* Internal anchor block: roles */}
        <aside style={anchorBlock}>
          <div style={{ paddingLeft: 14, borderLeft: "2px solid var(--accent)", marginBottom: 20 }}>
            <span style={{ display: "block", fontSize: 14, fontWeight: 600, color: "var(--text-on-peak)", marginBottom: 4 }}>
              {t("role1.title")}
            </span>
            <span style={{ display: "block", fontSize: 12, lineHeight: 1.55, color: "var(--text-on-peak-muted)" }}>
              {t("role1.company")}
            </span>
          </div>
          <div style={{ paddingLeft: 14, borderLeft: "2px solid var(--accent)" }}>
            <span style={{ display: "block", fontSize: 14, fontWeight: 600, color: "var(--text-on-peak)", marginBottom: 4 }}>
              {t("role2.title")}
            </span>
            <span style={{ display: "block", fontSize: 12, lineHeight: 1.55, color: "var(--text-on-peak-muted)" }}>
              {t("role2.company")}
            </span>
          </div>
        </aside>
      </div>
    </DsCard>
  );
}

/* ========== Card 3: Principles ========== */
function PrinciplesCard() {
  const t = useTranslations("about.page.principles");
  const items = [
    { num: "01", key: "p1" },
    { num: "02", key: "p2" },
    { num: "03", key: "p3" },
  ] as const;

  return (
    <DsCard id="principles">
      <p style={eyebrow}>{t("eyebrow")}</p>
      <h2 style={h2Style}><RichText html={t.raw("title")} /></h2>
      <p style={{ ...introP, marginBottom: 56, maxWidth: "58ch" }}>{t("intro")}</p>

      <div className="grid-process" style={{ columnGap: 32 }}>
        {items.map(({ num, key }) => (
          <div key={key} style={{ paddingTop: 20, borderTop: "1px solid var(--border-soft)" }}>
            <span style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 28, fontWeight: 500, color: "var(--accent)", display: "block", marginBottom: 8 }}>{num}</span>
            <h3 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 20, fontWeight: 500, color: "var(--text-primary)", marginBottom: 10, letterSpacing: "-0.01em" }}>{t(`${key}.title`)}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-secondary)" }}>{t(`${key}.body`)}</p>
          </div>
        ))}
      </div>
    </DsCard>
  );
}

/* ========== Card 4: Building (2-col) ========== */
function BuildingCard() {
  const t = useTranslations("about.page.building");
  return (
    <DsCard>
      <p style={eyebrow}>{t("eyebrow")}</p>
      <h2 style={h2Style}><RichText html={t.raw("title")} /></h2>
      <p style={{ ...introP, marginBottom: 48, maxWidth: "58ch" }}>{t("intro")}</p>

      <div className="grid-2col-wide">
        <div style={internalCard}>
          <h3 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 22, fontWeight: 500, color: "var(--text-primary)", marginBottom: 14 }}>{t("card1.title")}</h3>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--text-secondary)" }}>{t("card1.body")}</p>
        </div>
        <div style={internalCard}>
          <h3 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 22, fontWeight: 500, color: "var(--text-primary)", marginBottom: 14 }}>{t("card2.title")}</h3>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--text-secondary)" }}>{t("card2.body")}</p>
        </div>
      </div>
    </DsCard>
  );
}

/* ========== Card 5: Climax (dark peak) ========== */
function AboutClimax() {
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

/* ========== Shared styles ========== */
const eyebrow: CSSProperties = {
  fontSize: "var(--fs-eyebrow)", textTransform: "uppercase", letterSpacing: "0.14em",
  color: "var(--text-muted)", marginBottom: 26, fontWeight: 600,
};
const h1Style: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "var(--fs-h1)",
  fontWeight: 500, lineHeight: 1.02, letterSpacing: "-0.02em", marginBottom: 36, maxWidth: "20ch",
};
const h2Style: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "var(--fs-h2)",
  fontWeight: 500, lineHeight: 1.08, letterSpacing: "-0.015em", marginBottom: 20, maxWidth: "22ch",
};
const subStack: CSSProperties = { display: "flex", flexDirection: "column", gap: 14, marginBottom: 32, maxWidth: "52ch" };
const sub: CSSProperties = { fontSize: 18, lineHeight: 1.55, color: "var(--text-secondary)" };
const introP: CSSProperties = { fontSize: 17, lineHeight: 1.55, color: "var(--text-secondary)", marginBottom: 12 };
const ctaSecondary: CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 6, padding: "16px 4px",
  color: "var(--text-primary)", fontSize: 14, fontWeight: 500, textDecoration: "none",
};
const anchorBlock: CSSProperties = {
  background: "var(--card-peak)", color: "var(--text-on-peak)", padding: "40px 36px",
  position: "relative", borderRadius: 12, boxShadow: "var(--hero-peak-shadow)",
};
const internalCard: CSSProperties = {
  background: "var(--card-paper)", border: "1px solid var(--border-soft)",
  borderLeft: "3px solid var(--accent)", borderRadius: "var(--radius-internal)", padding: "32px 28px",
};
const ctaPeak: CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 12, padding: "18px 32px",
  background: "var(--text-on-peak)", color: "var(--card-peak)", fontSize: 14, fontWeight: 600,
  border: "none", borderRadius: "var(--radius-button)", cursor: "pointer", textDecoration: "none",
};
