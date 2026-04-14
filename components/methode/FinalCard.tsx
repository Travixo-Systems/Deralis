import { useTranslations } from "next-intl";
import { DsCardFinal } from "@/components/shared/DsCard";
import { Link } from "@/i18n/navigation";
import type { CSSProperties } from "react";

export default function FinalCard() {
  const t = useTranslations("methode.finalCta");

  return (
    <DsCardFinal>
      <h2 style={h2}>{t("h2")}</h2>
      <p style={sub}>{t("sub")}</p>
      <Link href="/audit" style={ctaPrimary}>{t("cta")}</Link>
    </DsCardFinal>
  );
}

const h2: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "clamp(32px, 4vw, 44px)",
  fontWeight: 500, lineHeight: 1.1, margin: "0 auto 22px",
  letterSpacing: "-0.02em", maxWidth: "22ch",
};
const sub: CSSProperties = {
  fontSize: 16, color: "var(--text-secondary)", maxWidth: "52ch",
  margin: "0 auto 36px", lineHeight: 1.55,
};
const ctaPrimary: CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 12, padding: "17px 30px",
  background: "var(--text-primary)", color: "var(--canvas)", fontSize: 14, fontWeight: 500,
  borderRadius: "var(--radius-button)", textDecoration: "none",
};
