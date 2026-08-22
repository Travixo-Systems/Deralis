import { useTranslations, useLocale } from "next-intl";
import type { CSSProperties } from "react";
import {
  WORKED_EXAMPLE,
  calculateCoordinationCost,
  formatEuros,
} from "@/lib/coordination-cost";

/**
 * The economic bridge. Before this existed, every euro figure on the site was a
 * price I charge, so a reader met 1 280 € with nothing to weigh it against and
 * had to convert friction into money in his own head.
 *
 * Both numbers are computed from WORKED_EXAMPLE, never typed into a message
 * file, so the copy cannot drift from lib/coordination-cost.ts.
 *
 * `outputKey` lets a page close the example in its own register while the
 * hypothesis itself stays identical everywhere.
 */
type Props = {
  outputKey?: "output" | "outputDiagnostic";
  style?: CSSProperties;
};

const wrapStyle: CSSProperties = {
  paddingLeft: 18,
  borderLeft: "2px solid var(--accent)",
};

const labelStyle: CSSProperties = {
  fontSize: "var(--fs-eyebrow)",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontWeight: 600,
  color: "var(--text-muted)",
  marginBottom: 10,
  transition: "color 450ms ease",
};

const inputsStyle: CSSProperties = {
  fontFamily: "var(--font-ibm-plex-mono), ui-monospace, monospace",
  fontSize: 13,
  lineHeight: 1.6,
  color: "var(--text-secondary)",
  marginBottom: 8,
  transition: "color 450ms ease",
};

const outputStyle: CSSProperties = {
  fontSize: 16,
  lineHeight: 1.55,
  color: "var(--text-primary)",
  fontWeight: 500,
  margin: 0,
  transition: "color 450ms ease",
};

export default function OrderOfMagnitude({ outputKey = "output", style }: Props) {
  const t = useTranslations("common.orderOfMagnitude");
  const locale = useLocale();

  const result = calculateCoordinationCost(WORKED_EXAMPLE);
  if (!result) return null;

  return (
    <div style={{ ...wrapStyle, ...style }} className="order-of-magnitude">
      <p style={labelStyle}>{t("label")}</p>
      <p style={inputsStyle}>
        {t("inputs", {
          people: WORKED_EXAMPLE.affectedPeople,
          cost: formatEuros(WORKED_EXAMPLE.annualEmployerCost, locale),
          hours: WORKED_EXAMPLE.frictionHoursPerWeek,
        })}
      </p>
      <p style={outputStyle}>
        {t(outputKey, { amount: formatEuros(result.annualCapacityCost, locale) })}
      </p>
    </div>
  );
}
