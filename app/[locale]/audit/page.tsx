import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import DsCard, { DsCardPeak, DsCardPaper, DsCardMedium, DsCardFinal } from "@/components/shared/DsCard";
import TabLabel from "@/components/shared/TabLabel";
import RichText from "@/components/shared/RichText";
import { Link } from "@/i18n/navigation";
import type { CSSProperties } from "react";

type Props = {
  params: Promise<{ locale: string }>;
};

const stripeLink = process.env.NEXT_PUBLIC_STRIPE_AUDIT_LINK || "#";

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "audit.page" });
  const title = t("metadata.title");
  const description = t("metadata.description");
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website" as const,
      url: `https://www.deralis.digital/${locale}/audit`,
      images: [{ url: "https://www.deralis.digital/og-image.png", width: 1200, height: 630, alt: "Deralis Digital" }],
    },
  };
}

export default async function AuditPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AuditHero />
      <RecognitionCard />
      <DeliverableCard />
      <ExamplePeak />
      <NotForAndGuaranteeCard />
      <ProcessCard />
      <AuditFinalCTA />
    </>
  );
}

/* ========== Card 1: Hero (warm) ========== */
function AuditHero() {
  const t = useTranslations("audit.page.hero");

  return (
    <DsCard>
      <div className="grid-audit-hero">
        <div>
          <p style={eyebrow}>{t("eyebrow")}</p>
          <h1 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.02, letterSpacing: "-0.02em", marginBottom: 26, maxWidth: "12ch" }} className="hero-h1-responsive">
            {t("h1")}
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.5, color: "var(--text-secondary)", marginBottom: 32, maxWidth: "36ch" }}>
            <RichText html={t.raw("sub")} />
          </p>

          {/* Offer block */}
          <div style={{ background: "var(--card-peak)", color: "var(--text-on-peak)", padding: "22px 26px", marginBottom: 32, maxWidth: 420, position: "relative", borderRadius: 10, boxShadow: "0 20px 44px rgba(26, 29, 27, 0.2)", transition: "background-color 450ms ease, color 450ms ease" }}>
            <TabLabel variant="default" style={{ left: 22, top: -10 }}>
              {t("offer.tab")}
            </TabLabel>
            {(["line1", "line2", "line3", "line4"] as const).map((key) => (
              <p key={key} style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-on-peak-muted)" }}>
                <RichText html={t.raw(`offer.${key}`)} />
              </p>
            ))}
          </div>

          <a href={stripeLink} style={ctaPrimary}>{t("cta")}</a>
          <span style={metaStyle}>{t("meta")}</span>
        </div>

        {/* PDF Stack */}
        <div style={{ position: "relative", height: 380 }} className="pdf-stack-responsive">
          <div style={{ ...pdfPage, top: 36, left: 62, transform: "rotate(5deg)", opacity: 0.55, boxShadow: "0 14px 34px rgba(0,0,0,0.18)" }}>
            <PdfContent title="Ordre d'exécution" section="04 · Priorisation" />
          </div>
          <div style={{ ...pdfPage, top: 18, left: 40, transform: "rotate(2deg)", opacity: 0.82, boxShadow: "0 18px 40px rgba(0,0,0,0.22)" }}>
            <PdfContent title="Ce qui casse" section="02 · Diagnostic" />
          </div>
          <div style={{ ...pdfPage, top: 0, left: 18, boxShadow: "var(--page-shadow)" }}>
            <PdfContent title="Quoi construire, dans quel ordre, et ce qu'il ne faut pas construire." section="01 · Situation" section2="02 · Ce qui casse" />
          </div>
        </div>
      </div>
    </DsCard>
  );
}

function PdfContent({ title, section, section2 }: { title: string; section: string; section2?: string }) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8, textTransform: "uppercase", letterSpacing: "0.12em", color: "#6B6458", paddingBottom: 10, borderBottom: "1px solid rgba(20,17,13,0.08)", marginBottom: 14, fontWeight: 700 }}>
        <span>Dossier de décision</span><span>Exemple</span>
      </div>
      <div style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: 14, lineHeight: 1.14, fontWeight: 500, color: "#14110D", marginBottom: 14, letterSpacing: "-0.01em" }}>{title}</div>
      <div style={{ fontSize: 8, textTransform: "uppercase", letterSpacing: "0.12em", color: "#1B3A5C", fontWeight: 700, marginBottom: 5 }}>{section}</div>
      <div style={{ height: 3, background: "rgba(20,17,13,0.12)", marginBottom: 4, borderRadius: 1, width: "90%" }} />
      <div style={{ height: 3, background: "rgba(20,17,13,0.12)", marginBottom: 4, borderRadius: 1, width: "80%" }} />
      <div style={{ height: 3, background: "rgba(20,17,13,0.12)", marginBottom: 4, borderRadius: 1, width: "60%" }} />
      {section2 && (
        <>
          <div style={{ fontSize: 8, textTransform: "uppercase", letterSpacing: "0.12em", color: "#1B3A5C", fontWeight: 700, marginTop: 10, marginBottom: 5 }}>{section2}</div>
          <div style={{ height: 3, background: "rgba(20,17,13,0.12)", marginBottom: 4, borderRadius: 1, width: "80%" }} />
          <div style={{ height: 3, background: "rgba(20,17,13,0.12)", marginBottom: 4, borderRadius: 1, width: "70%" }} />
        </>
      )}
    </>
  );
}

/* ========== Card 2: Recognition (warm) ========== */
function RecognitionCard() {
  const t = useTranslations("audit.page.recognition");
  const symptoms: string[] = t.raw("symptoms");

  return (
    <DsCard>
      <h2 style={sectionH2}>{t("h2")}</h2>
      <p style={introP}>{t("intro1")}</p>
      <p style={{ ...introP, marginBottom: 0 }}>{t("intro2")}</p>

      <blockquote className="pull-quote" style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.025em", margin: "72px 0", paddingLeft: 40, borderLeft: "4px solid var(--accent)", maxWidth: "18ch", transition: "color 450ms ease, border-color 450ms ease" }}>
        {t("pullquote")}
      </blockquote>

      <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)", marginBottom: 28, fontWeight: 600 }}>{t("symptomsLabel")}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
        {symptoms.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 22, padding: "26px 30px", background: "var(--card-paper)", border: "1px solid var(--border-soft)", borderLeft: "3px solid var(--accent)", borderRadius: "var(--radius-internal)", fontSize: 16, lineHeight: 1.55, transition: "background-color 450ms ease, border-color 450ms ease, transform 150ms ease" }}>
            <span style={{ flexShrink: 0, fontFamily: "var(--font-fraunces), serif", fontSize: 16, color: "var(--accent)", fontWeight: 600, paddingTop: 2, minWidth: 24, letterSpacing: "0.04em" }}>{String(i + 1).padStart(2, "0")}</span>
            <span>{s}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 48, maxWidth: "58ch" }}>
        <p style={introP}>{t("closing1")}</p>
        <p style={introP}>{t("closing2")}</p>
        <p style={{ ...introP, marginBottom: 32 }}>{t("closing3")}</p>
        <a href={stripeLink} style={ctaPrimary}>{t("cta")}</a>
      </div>
    </DsCard>
  );
}

/* ========== Card 3: Deliverable (paper) ========== */
function DeliverableCard() {
  const t = useTranslations("audit.page.deliverable");
  const items: string[] = t.raw("items");
  const guarantees: string[] = t.raw("guarantees");

  return (
    <DsCardPaper>
      <TabLabel variant="on-peak" style={{ left: 56 }}>{t("tab")}</TabLabel>

      <h3 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "var(--fs-doc-title)", fontWeight: 500, lineHeight: 1.08, letterSpacing: "-0.015em", marginBottom: 16 }}>{t("h3")}</h3>
      <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 18, lineHeight: 1.5 }}>{t("negations")}</p>
      <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--text-secondary)", marginBottom: 40, maxWidth: "56ch" }}>{t("lede")}</p>

      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", fontWeight: 700, marginBottom: 22, paddingBottom: 14, borderBottom: "1px solid var(--border-soft)", transition: "color 450ms ease, border-color 450ms ease" }}>
        {t("bodyLabel")}
      </div>

      <ul style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36, listStyle: "none", padding: 0, maxWidth: 680 }}>
        {items.map((item, i) => (
          <li key={i} style={{ fontSize: 15, lineHeight: 1.55, paddingLeft: 20, borderLeft: "2px solid var(--accent)", transition: "color 450ms ease, border-color 450ms ease" }}>
            <RichText html={item} />
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 36, paddingTop: 22, borderTop: "1px solid var(--border-soft)", fontSize: 13, lineHeight: 1.6, color: "var(--text-muted)", transition: "color 450ms ease, border-color 450ms ease" }}>
        <span style={{ color: "var(--text-primary)", fontWeight: 500, marginRight: 6, transition: "color 450ms ease" }}>{t("ownerLine")}</span>
        {t("ownerDetail")}
        <div style={{ display: "flex", gap: 22, marginTop: 14, flexWrap: "wrap" }}>
          {guarantees.map((g) => (
            <span key={g} style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, color: "var(--text-primary)", transition: "color 450ms ease" }}>{g}</span>
          ))}
        </div>
      </div>
    </DsCardPaper>
  );
}

/* ========== Card 4: Example (dark peak) — PAPER→DARK adjacency intentional ========== */
function ExamplePeak() {
  const t = useTranslations("audit.page.example");
  const locale = useLocale();
  const downloadFilename = locale === "fr" ? "deralis-exemple-audit.pdf" : "deralis-audit-example.pdf";

  return (
    <DsCardPeak>
      <div className="grid-peak-example">
        <div>
          <p style={{ fontSize: "var(--fs-eyebrow)", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--text-on-peak-dim)", marginBottom: 22, fontWeight: 600 }}>{t("eyebrow")}</p>
          <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "clamp(38px, 4.8vw, 52px)", fontWeight: 500, lineHeight: 1.04, letterSpacing: "-0.02em", color: "var(--text-on-peak)", marginBottom: 28, maxWidth: "14ch" }}>
            <RichText html={t.raw("h2")} />
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-on-peak-muted)", marginBottom: 14, maxWidth: "38ch" }}>
            <RichText html={t.raw("body1")} />
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-on-peak-muted)", maxWidth: "38ch" }}>{t("body2")}</p>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--text-on-peak-dim)", margin: "28px 0 26px", fontWeight: 600, padding: "12px 0", borderTop: "1px solid var(--text-on-peak-dim)", borderBottom: "1px solid var(--text-on-peak-dim)", maxWidth: 280 }}>
            {t("pagesMeta")}
          </div>
          <a
            href="/audit-example.pdf"
            download={downloadFilename}
            target="_blank"
            rel="noopener"
            style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "18px 32px", background: "var(--text-on-peak)", color: "var(--card-peak)", fontSize: 14, fontWeight: 600, border: "none", borderRadius: "var(--radius-button)", cursor: "pointer", fontFamily: "inherit", textDecoration: "none", transition: "background-color 450ms ease, color 450ms ease" }}
          >
            {t("cta")}
          </a>
          <span style={{ display: "block", marginTop: 14, fontSize: 12, color: "var(--text-on-peak-dim)", fontStyle: "italic" }}>{t("meta")}</span>
        </div>

        {/* Opened page mock */}
        <div style={{ position: "relative", height: 620 }} className="pdf-stack-responsive">
          <div style={{ position: "absolute", top: 32, left: 56, width: 380, height: 520, background: "#FDFBF4", border: "1px solid rgba(20,17,13,0.22)", transform: "rotate(3deg)", opacity: 0.4, boxShadow: "var(--page-shadow)", borderRadius: 2 }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: 440, height: 600, background: "#FDFBF4", border: "1px solid rgba(20,17,13,0.25)", padding: "40px 44px 32px", boxShadow: "var(--page-shadow)", fontFamily: "var(--font-ibm-plex-sans), sans-serif", color: "#14110D", display: "flex", flexDirection: "column", borderRadius: 2 }} className="opened-page-responsive">
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em", color: "#6B6458", paddingBottom: 14, borderBottom: "1px solid rgba(20,17,13,0.08)", marginBottom: 22, fontWeight: 700 }}>
              <span>Dossier de décision · Exemple</span><span>Deralis Digital</span>
            </div>
            <h3 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: 22, lineHeight: 1.13, fontWeight: 500, color: "#14110D", marginBottom: 8, letterSpacing: "-0.015em" }}>
              Quoi construire, dans quel ordre, et ce qu'il ne faut pas construire.
            </h3>
            <div style={{ fontSize: 10, color: "#6B6458", fontStyle: "italic", marginBottom: 22, lineHeight: 1.5 }}>
              Cas composite anonymisé · PME de services, 34 personnes · Île-de-France
            </div>
            {["01 · Situation", "02 · Ce qui casse", "03 · Premier système à construire"].map((sec) => (
              <div key={sec}>
                <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em", color: "#1B3A5C", fontWeight: 700, marginTop: 16, marginBottom: 8, paddingBottom: 4, borderBottom: "1px solid rgba(27,58,92,0.15)" }}>{sec}</div>
                <div style={{ height: 5, background: "rgba(20,17,13,0.09)", marginBottom: 6, borderRadius: 1, width: "95%" }} />
                <div style={{ height: 5, background: "rgba(20,17,13,0.09)", marginBottom: 6, borderRadius: 1, width: "80%" }} />
                <div style={{ height: 5, background: "rgba(20,17,13,0.09)", marginBottom: 6, borderRadius: 1, width: "90%" }} />
              </div>
            ))}
            <div style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px solid rgba(20,17,13,0.08)", display: "flex", justifyContent: "space-between", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", color: "#6B6458", fontWeight: 700 }}>
              <span>Deralis Digital · exemple anonymisé</span><span>1 / 5</span>
            </div>
          </div>
        </div>
      </div>
    </DsCardPeak>
  );
}

/* ========== Card 5: Not-for + Guarantee (warm) ========== */
function NotForAndGuaranteeCard() {
  const tNot = useTranslations("audit.page.notFor");
  const tG = useTranslations("audit.page.guarantee");
  const items: string[] = tNot.raw("items");

  return (
    <DsCard>
      <div className="grid-2col-wide">
        <div>
          <h3 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "var(--fs-h3)", fontWeight: 500, lineHeight: 1.2, marginBottom: 16 }}>{tNot("h3")}</h3>
          <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--text-secondary)", marginBottom: 28 }}>{tNot("intro")}</p>
          {items.map((item, i) => (
            <p key={i} style={{ fontSize: 15, lineHeight: 1.55, paddingLeft: 20, borderLeft: "2px solid var(--accent)", marginBottom: 16, color: "var(--text-secondary)", transition: "border-color 450ms ease" }}>
              {item}
            </p>
          ))}
        </div>
        <div>
          <h3 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "var(--fs-h3)", fontWeight: 500, lineHeight: 1.2, marginBottom: 16 }}>{tG("h3")}</h3>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--text-secondary)", marginBottom: 18 }}>{tG("p1")}</p>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--text-secondary)" }}>{tG("p2")}</p>
        </div>
      </div>
    </DsCard>
  );
}

/* ========== Card 6: Process (warm, medium) ========== */
function ProcessCard() {
  const t = useTranslations("audit.page.process");

  return (
    <DsCardMedium>
      <p style={{ ...introP, marginBottom: 40 }}>{t("intro")}</p>
      <div className="grid-process">
        {([0, 1, 2, 3] as const).map((i) => (
          <div key={i} style={{ paddingTop: 20, borderTop: "1px solid var(--border-soft)" }}>
            <span style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: 28, fontWeight: 500, color: "var(--accent)", display: "block", marginBottom: 8 }}>{t(`steps.${i}.num`)}</span>
            <span style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: 18, fontWeight: 500, display: "block", marginBottom: 8, color: "var(--text-primary)" }}>{t(`steps.${i}.title`)}</span>
            <span style={{ fontSize: 13, lineHeight: 1.55, color: "var(--text-secondary)" }}>{t(`steps.${i}.desc`)}</span>
          </div>
        ))}
      </div>
    </DsCardMedium>
  );
}

/* ========== Card 7: Final CTA (warm, final) ========== */
function AuditFinalCTA() {
  const t = useTranslations("audit.page.finalCta");

  return (
    <DsCardFinal>
      <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "clamp(30px, 4vw, 42px)", fontWeight: 500, lineHeight: 1.1, margin: "0 auto 16px", letterSpacing: "-0.02em", maxWidth: "22ch" }}>
        {t("h2")}
      </h2>
      <p style={{ fontSize: 16, color: "var(--text-secondary)", maxWidth: "52ch", margin: "0 auto 36px", lineHeight: 1.55 }}>
        {t("sub")}
      </p>
      <a href={stripeLink} style={ctaPrimary}>{t("cta")}</a>
      <p style={{ marginTop: 14, fontSize: 12, color: "var(--text-muted)", fontStyle: "italic" }}>{t("meta")}</p>
    </DsCardFinal>
  );
}

/* ========== Shared styles ========== */
const eyebrow: CSSProperties = {
  fontSize: "var(--fs-eyebrow)", textTransform: "uppercase", letterSpacing: "0.14em",
  color: "var(--text-muted)", marginBottom: 24, fontWeight: 600, transition: "color 450ms ease",
};

const sectionH2: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "var(--fs-h2)",
  fontWeight: 500, lineHeight: 1.08, letterSpacing: "-0.015em", marginBottom: 34, maxWidth: "18ch",
};

const introP: CSSProperties = {
  fontSize: 18, lineHeight: 1.55, color: "var(--text-secondary)", marginBottom: 12, maxWidth: "58ch",
  transition: "color 450ms ease",
};

const ctaPrimary: CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 12, padding: "17px 30px",
  background: "var(--text-primary)", color: "var(--canvas)", fontSize: 14, fontWeight: 500,
  border: "none", borderRadius: "var(--radius-button)", cursor: "pointer", fontFamily: "inherit",
  textDecoration: "none", transition: "background-color 450ms ease, color 450ms ease, transform 150ms ease",
};

const metaStyle: CSSProperties = {
  display: "block", marginTop: 14, fontSize: 12, color: "var(--text-muted)", fontStyle: "italic",
};

const pdfPage: CSSProperties = {
  position: "absolute", width: 240, height: 320, background: "#FDFBF4",
  border: "1px solid rgba(20,17,13,0.2)", padding: "18px 22px",
  fontFamily: "var(--font-ibm-plex-sans), sans-serif", color: "#14110D", borderRadius: 2,
};
