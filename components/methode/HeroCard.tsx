import { useTranslations } from "next-intl";
import DsCard from "@/components/shared/DsCard";
import TabLabel from "@/components/shared/TabLabel";
import RichText from "@/components/shared/RichText";
import { Link } from "@/i18n/navigation";
import type { CSSProperties } from "react";

export default function HeroCard() {
  const t = useTranslations("methode.hero");
  const stageNames: string[] = t.raw("stageNames");

  return (
    <DsCard>
      <div className="grid-hero">
        <div>
          <p style={eyebrow}>{t("eyebrow")}</p>
          <h1 style={h1Style} className="hero-h1-responsive">
            <RichText html={t.raw("h1")} />
          </h1>
          <p style={sub}>{t("sub")}</p>
          <Link href="/audit" style={ctaPrimary}>{t("ctaPrimary")}</Link>
        </div>

        {/* Right: stages pull-out — distinct from homepage AnchorBlock */}
        <aside style={stagesBlock}>
          <TabLabel variant="default" heroSize style={{ left: 32, top: -10 }}>
            {t("anchorTab")}
          </TabLabel>
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 18 }}>
            {stageNames.map((name, i) => (
              <li key={name} style={stageRow}>
                <span style={stageNum}>0{i + 1}</span>
                <span style={stageName}>{name}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </DsCard>
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
  fontSize: 18, lineHeight: 1.5, color: "var(--text-secondary)", marginBottom: 36, maxWidth: "36ch",
};
const ctaPrimary: CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 12, padding: "17px 30px",
  background: "var(--text-primary)", color: "var(--canvas)", fontSize: 14, fontWeight: 500,
  borderRadius: "var(--radius-button)", textDecoration: "none",
};
const stagesBlock: CSSProperties = {
  background: "var(--card-paper)",
  border: "1px solid var(--border-soft)",
  borderLeft: "3px solid var(--accent)",
  borderRadius: "var(--radius-internal)",
  padding: "40px 36px 32px",
  position: "relative",
  transition: "background-color 450ms ease, border-color 450ms ease",
};
const stageRow: CSSProperties = { display: "flex", alignItems: "baseline", gap: 16 };
const stageNum: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: 14, fontWeight: 600,
  color: "var(--accent)", letterSpacing: "0.04em", minWidth: 24,
};
const stageName: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: 22, fontWeight: 500,
  color: "var(--text-primary)", letterSpacing: "-0.01em",
};
