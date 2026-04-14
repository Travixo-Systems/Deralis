import { useTranslations } from "next-intl";
import DsCard from "@/components/shared/DsCard";
import { Link } from "@/i18n/navigation";
import type { CSSProperties } from "react";

export default function StagesCard() {
  const t = useTranslations("methode.stages");
  const tActions = useTranslations("common.actions");

  return (
    <DsCard>
      <p style={introP}>{t("intro")}</p>

      <ol style={stageList}>
        <Stage num={t("stage1.num")} title={t("stage1.title")} desc={t("stage1.desc")} metadata={t("stage1.metadata")} cta={t("stage1.cta")} ctaHref="/audit" />
        <FlowConnectorVertical />
        <Stage num={t("stage2.num")} title={t("stage2.title")} desc={t("stage2.desc")} />
        <FlowConnectorVertical />
        <Stage num={t("stage3.num")} title={t("stage3.title")} desc={t("stage3.desc")} isLast />
      </ol>

      {/* Secondary link — left-aligned with content, ~24px gap from last stage */}
      <div style={{ marginTop: 24, paddingLeft: 45 }}>
        <Link href="/projects" style={projectsLink}>
          {tActions("viewOurWork")} →
        </Link>
      </div>
    </DsCard>
  );
}

function Stage({ num, title, desc, metadata, cta, ctaHref, isLast }: {
  num: string; title: string; desc: string; metadata?: string; cta?: string; ctaHref?: string; isLast?: boolean;
}) {
  return (
    <li style={{ ...stageItem, position: "relative" }}>
      <div style={dotWrap}>
        <span style={dot} />
      </div>
      <div style={{ paddingLeft: 28, maxWidth: "62ch" }}>
        <span style={stageNum}>{num}</span>
        <h3 style={stageTitle}>{title}</h3>
        <p style={stageDesc}>{desc}</p>
        {metadata && <p style={stageMeta}>{metadata}</p>}
        {cta && ctaHref && (
          <Link href={ctaHref} style={stageCta}>{cta}</Link>
        )}
      </div>
    </li>
  );
}

function FlowConnectorVertical() {
  return (
    <li aria-hidden="true" style={{ display: "flex", paddingLeft: 7, height: 36 }}>
      <span style={{ width: 1.5, height: "100%", background: "var(--border-strong)", transition: "background-color 450ms ease" }} />
    </li>
  );
}

const introP: CSSProperties = {
  fontSize: 18, lineHeight: 1.55, color: "var(--text-secondary)",
  marginBottom: 48, maxWidth: "58ch",
};
const stageList: CSSProperties = {
  listStyle: "none", margin: 0, padding: 0,
  display: "flex", flexDirection: "column", maxWidth: 820,
};
const stageItem: CSSProperties = {
  display: "flex", alignItems: "flex-start",
};
const dotWrap: CSSProperties = {
  width: 17, height: 17, display: "flex", alignItems: "center", justifyContent: "center",
  position: "relative", zIndex: 2, flexShrink: 0, paddingTop: 8,
};
const dot: CSSProperties = {
  width: 17, height: 17, borderRadius: "50%", background: "var(--card-main)",
  border: "2px solid var(--accent)", transition: "background-color 450ms ease, border-color 450ms ease",
};
const stageNum: CSSProperties = {
  display: "block", fontSize: 12, fontWeight: 700, color: "var(--text-muted)",
  letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8,
};
const stageTitle: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: 28, fontWeight: 500,
  color: "var(--text-primary)", letterSpacing: "-0.015em", marginBottom: 12, lineHeight: 1.15,
};
const stageDesc: CSSProperties = {
  fontSize: 16, lineHeight: 1.6, color: "var(--text-secondary)", marginBottom: 16,
};
const stageMeta: CSSProperties = {
  fontSize: 13, color: "var(--text-muted)", fontStyle: "italic", marginBottom: 20,
};
const stageCta: CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 6, padding: "14px 24px",
  background: "var(--text-primary)", color: "var(--canvas)", fontSize: 13, fontWeight: 500,
  borderRadius: "var(--radius-button)", textDecoration: "none",
};
const projectsLink: CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 6,
  color: "var(--text-primary)", fontSize: 14, fontWeight: 500, textDecoration: "none",
  transition: "color 300ms ease",
};
