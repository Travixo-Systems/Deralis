"use client";

import { useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import DsCard from "@/components/shared/DsCard";
import { trackEvent } from "@/lib/analytics";
import {
  calculateCoordinationCost,
  FRICTION_HOURS_WARNING_THRESHOLD,
} from "@/lib/coordination-cost";
import type { CSSProperties } from "react";

/** Key the diagnostic page reads to show the visitor their own figure in context. */
export const ESTIMATE_STORAGE_KEY = "deralis_coordination_estimate";

const eyebrowStyle: CSSProperties = {
  fontSize: "var(--fs-eyebrow)",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--text-muted)",
  fontWeight: 600,
  marginBottom: 10,
};

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: 15,
  fontWeight: 500,
  color: "var(--text-primary)",
  marginBottom: 6,
};

const helpStyle: CSSProperties = {
  fontSize: 13,
  lineHeight: 1.5,
  color: "var(--text-muted)",
  marginBottom: 10,
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "13px 14px",
  fontSize: 16,
  fontFamily: "inherit",
  color: "var(--text-primary)",
  background: "var(--canvas)",
  border: "1px solid var(--border-strong)",
  borderRadius: "var(--radius-internal)",
};

const fieldStyle: CSSProperties = { marginBottom: 26 };

const warningStyle: CSSProperties = {
  fontSize: 13,
  lineHeight: 1.5,
  color: "var(--text-primary)",
  background: "var(--card-paper)",
  borderLeft: "3px solid var(--accent)",
  padding: "10px 12px",
  marginTop: 10,
};

const amountStyle: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: "clamp(38px, 6vw, 60px)",
  fontWeight: 500,
  lineHeight: 1.05,
  letterSpacing: "-0.02em",
  color: "var(--text-primary)",
};

const rateStyle: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: "clamp(24px, 3.4vw, 32px)",
  fontWeight: 500,
  color: "var(--text-primary)",
  marginTop: 22,
};

const captionStyle: CSSProperties = {
  fontSize: 15,
  lineHeight: 1.5,
  color: "var(--text-secondary)",
  maxWidth: "34ch",
  marginTop: 6,
};

const disclaimerStyle: CSSProperties = {
  fontSize: 13,
  lineHeight: 1.6,
  color: "var(--text-muted)",
  marginTop: 26,
  maxWidth: "62ch",
};

const ctaStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 12,
  padding: "17px 30px",
  background: "var(--text-primary)",
  color: "var(--canvas)",
  fontSize: 14,
  fontWeight: 500,
  borderRadius: "var(--radius-button)",
  textDecoration: "none",
  marginTop: 28,
};

/** Only fields the visitor has actually filled participate; nothing is prefilled that would manufacture a result. */
type Field = "people" | "cost" | "friction";

export default function FrictionCalculator() {
  const t = useTranslations("frictions");
  const locale = useLocale();

  const [people, setPeople] = useState("");
  const [cost, setCost] = useState("");
  const [friction, setFriction] = useState("");
  const [hours, setHours] = useState("35");
  const [started, setStarted] = useState(false);

  const num = (v: string) => (v.trim() === "" ? NaN : Number(v.replace(",", ".")));

  const result = useMemo(
    () =>
      calculateCoordinationCost({
        affectedPeople: num(people),
        annualEmployerCost: num(cost),
        frictionHoursPerWeek: num(friction),
        weeklyWorkingHours: num(hours),
      }),
    [people, cost, friction, hours]
  );

  const allFilled = [people, cost, friction, hours].every((v) => v.trim() !== "");
  const showInvalid = allFilled && result === null;
  const overThreshold = num(friction) > FRICTION_HOURS_WARNING_THRESHOLD;

  // Behaviour only. Never the figures themselves.
  const onFirstInput = () => {
    if (!started) {
      setStarted(true);
      trackEvent("calculator_started");
    }
  };

  const handleCtaClick = () => {
    if (!result) return;
    try {
      sessionStorage.setItem(
        ESTIMATE_STORAGE_KEY,
        JSON.stringify({
          annualCapacityCost: result.annualCapacityCost,
          frictionRate: result.frictionRate,
          calculatedAt: new Date().toISOString(),
        })
      );
    } catch {
      // Private browsing or blocked storage: the diagnostic page simply shows no banner.
    }
    trackEvent("diagnostic_cta_clicked", { from: "friction_calculator" });
  };

  const fmtMoney = (n: number) =>
    new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(n);

  const fmtRate = (n: number) =>
    new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(n);

  const field = (
    key: Field | "hours",
    value: string,
    setValue: (v: string) => void,
    opts: { min?: string; max?: string; step?: string } = {}
  ) => (
    <div style={fieldStyle}>
      <label style={labelStyle} htmlFor={`fc-${key}`}>
        {t(`form.${key}.label`)}
      </label>
      <p style={helpStyle}>{t(`form.${key}.help`)}</p>
      <input
        id={`fc-${key}`}
        style={inputStyle}
        type="number"
        inputMode="decimal"
        value={value}
        min={opts.min}
        max={opts.max}
        step={opts.step}
        // Keep the visitor's figures out of Clarity session replay.
        data-clarity-mask="true"
        onChange={(e) => {
          onFirstInput();
          setValue(e.target.value);
        }}
      />
      {key === "friction" && overThreshold && (
        <p style={warningStyle}>{t("form.friction.warning")}</p>
      )}
    </div>
  );

  return (
    <DsCard>
      <div className="grid-2col-wide">
        <div>
          {field("people", people, setPeople, { min: "1", step: "1" })}
          {field("cost", cost, setCost, { min: "1", step: "100" })}
          {field("friction", friction, setFriction, { min: "0", step: "0.5" })}
          {field("hours", hours, setHours, { min: "1", step: "0.5" })}
          {showInvalid && <p style={warningStyle}>{t("form.invalid")}</p>}
        </div>

        <div data-clarity-mask="true">
          {result && allFilled ? (
            <>
              <p style={eyebrowStyle}>{t("result.eyebrow")}</p>
              <p style={amountStyle}>
                {fmtMoney(result.annualCapacityCost)}{" "}
                <span style={{ fontSize: "0.4em", fontWeight: 400 }}>{t("result.unit")}</span>
              </p>
              <p style={captionStyle}>{t("result.caption")}</p>

              <p style={rateStyle}>{fmtRate(result.frictionRate)}</p>
              <p style={captionStyle}>{t("result.rateCaption")}</p>

              <p style={disclaimerStyle}>{t("result.disclaimer")}</p>

              <Link href="/diagnostic" style={ctaStyle} onClick={handleCtaClick}>
                {t("result.cta")}
              </Link>
              <p style={{ ...disclaimerStyle, marginTop: 14 }}>{t("result.ctaSub")}</p>
            </>
          ) : (
            <p style={{ ...captionStyle, maxWidth: "40ch", marginTop: 0 }}>{t("hero.privacy")}</p>
          )}
        </div>
      </div>
    </DsCard>
  );
}
