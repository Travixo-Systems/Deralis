"use client";

import { useMemo, useState } from "react";
import { useCountUp } from "./useCountUp";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import DsCard, { DsCardPaper } from "@/components/shared/DsCard";
import { trackEvent } from "@/lib/analytics";
import {
  calculateCoordinationCost,
  FRICTION_HOURS_WARNING_THRESHOLD,
} from "@/lib/coordination-cost";
import type { CSSProperties } from "react";

/** Key the diagnostic page reads to show the visitor their own figure in context. */
export const ESTIMATE_STORAGE_KEY = "deralis_coordination_estimate";

const sectionTitleStyle: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: 27,
  fontWeight: 500,
  letterSpacing: "-0.01em",
  color: "var(--text-primary)",
  marginBottom: 30,
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
  lineHeight: 1.55,
  color: "var(--text-secondary)",
  marginBottom: 4,
};

const helpMutedStyle: CSSProperties = {
  fontSize: 13,
  lineHeight: 1.55,
  color: "var(--text-muted)",
  marginBottom: 10,
};

const inputStyle: CSSProperties = {
  width: "100%",
  maxWidth: 320,
  padding: "13px 14px",
  paddingRight: 104,
  fontSize: 16,
  fontFamily: "inherit",
  color: "var(--text-primary)",
  background: "var(--canvas)",
  border: "1px solid var(--border-strong)",
  borderRadius: "var(--radius-internal)",
};

/* The unit lives inside the box rather than in the label, so it is still
   there while the field is being filled in. It is not focusable and is
   hidden from screen readers, which get the same information from the
   label and help text. */
const inputWrapStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  maxWidth: 320,
};

const unitStyle: CSSProperties = {
  position: "absolute",
  right: 14,
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: 13,
  color: "var(--text-muted)",
  pointerEvents: "none",
  transition: "color 450ms ease",
};

const fieldStyle: CSSProperties = { marginBottom: 30 };

const noticeStyle: CSSProperties = {
  fontSize: 13,
  lineHeight: 1.55,
  color: "var(--text-primary)",
  background: "var(--card-paper)",
  borderLeft: "3px solid var(--accent)",
  padding: "10px 12px",
  marginTop: 10,
  maxWidth: 320,
};

const buttonStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  padding: "16px 32px",
  background: "var(--text-primary)",
  color: "var(--canvas)",
  fontSize: 14,
  fontWeight: 500,
  border: "none",
  borderRadius: "var(--radius-button)",
  cursor: "pointer",
  fontFamily: "inherit",
};

const secondaryButtonStyle: CSSProperties = {
  display: "inline-block",
  marginTop: 20,
  padding: 0,
  background: "none",
  border: "none",
  fontFamily: "inherit",
  fontSize: 14,
  color: "var(--text-muted)",
  textDecoration: "underline",
  textUnderlineOffset: 3,
  cursor: "pointer",
};

const amountStyle: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: "clamp(40px, 6.5vw, 64px)",
  fontWeight: 500,
  lineHeight: 1.02,
  letterSpacing: "-0.02em",
  color: "var(--text-primary)",
};

const captionStyle: CSSProperties = {
  fontSize: 17,
  lineHeight: 1.5,
  color: "var(--text-secondary)",
  maxWidth: "42ch",
  marginTop: 14,
};

const rateStyle: CSSProperties = {
  fontSize: 15,
  lineHeight: 1.55,
  color: "var(--text-secondary)",
  maxWidth: "48ch",
  marginTop: 10,
};

const disclaimerStyle: CSSProperties = {
  fontSize: 13,
  lineHeight: 1.65,
  color: "var(--text-muted)",
  marginTop: 24,
  maxWidth: "66ch",
};

const nextTitleStyle: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: 25,
  fontWeight: 500,
  color: "var(--text-primary)",
  marginBottom: 14,
};

const nextPStyle: CSSProperties = {
  fontSize: 16,
  lineHeight: 1.6,
  color: "var(--text-secondary)",
  maxWidth: "62ch",
  marginBottom: 14,
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
  marginTop: 10,
};

const ctaMetaStyle: CSSProperties = {
  fontSize: 13,
  color: "var(--text-muted)",
  marginTop: 12,
};

const privacyStyle: CSSProperties = {
  fontSize: 13,
  lineHeight: 1.6,
  color: "var(--text-muted)",
  marginTop: 22,
  maxWidth: "56ch",
};

type FieldKey = "people" | "cost" | "friction" | "hours";

export default function FrictionCalculator() {
  const t = useTranslations("frictions");
  const locale = useLocale();

  const [people, setPeople] = useState("");
  const [cost, setCost] = useState("");
  const [friction, setFriction] = useState("");
  const [hours, setHours] = useState("35");
  const [submitted, setSubmitted] = useState(false);
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
  const overThreshold = num(friction) > FRICTION_HOURS_WARNING_THRESHOLD;
  const showResult = submitted && result !== null;
  const animatedAmount = useCountUp(result?.annualCapacityCost ?? 0, showResult);

  const onFirstInput = () => {
    if (!started) {
      setStarted(true);
      trackEvent("calculator_started");
    }
  };

  const handleCalculate = () => {
    setSubmitted(true);
    if (result) trackEvent("calculator_completed");
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

  const tag = locale === "fr" ? "fr-FR" : "en-GB";
  const fmtMoney = (n: number) =>
    new Intl.NumberFormat(tag, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  const fmtRate = (n: number) =>
    new Intl.NumberFormat(tag, { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n);

  const field = (
    key: FieldKey,
    value: string,
    setValue: (v: string) => void,
    opts: { min?: string; step?: string } = {}
  ) => (
    <div style={fieldStyle}>
      <label style={labelStyle} htmlFor={`fc-${key}`}>
        {t(`form.${key}.label`)}
      </label>
      <p style={helpStyle}>{t(`form.${key}.help`)}</p>
      <p style={helpMutedStyle}>{t(`form.${key}.help2`)}</p>
      <div style={inputWrapStyle}>
        <input
          id={`fc-${key}`}
          style={inputStyle}
          type="number"
          inputMode="decimal"
          value={value}
          min={opts.min}
          step={opts.step}
          // Keeps the visitor's figures out of Clarity session replay. The route is
          // also excluded from Clarity entirely; this is the second layer.
          data-clarity-mask="true"
          onChange={(e) => {
            onFirstInput();
            setValue(e.target.value);
            if (submitted) setSubmitted(false);
          }}
        />
        <span style={unitStyle} aria-hidden="true">{t(`form.${key}.unit`)}</span>
      </div>
      {key === "friction" && overThreshold && <p style={noticeStyle}>{t("form.friction.warning")}</p>}
    </div>
  );

  if (showResult && result) {
    return (
      <>
        <DsCard>
          <p style={{ ...helpMutedStyle, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, marginBottom: 16 }}>
            {t("result.eyebrow")}
          </p>
          <div data-clarity-mask="true">
            <p style={amountStyle}>
              <span aria-hidden="true">{fmtMoney(Math.round(animatedAmount))}</span>
              <span className="sr-only">{fmtMoney(result.annualCapacityCost)}</span>{" "}
              <span style={{ fontSize: "0.36em", fontWeight: 400 }}>{t("result.unit")}</span>
            </p>
            <p style={captionStyle}>{t("result.caption")}</p>
            <p style={rateStyle}>{t("result.rateLine", { rate: fmtRate(result.frictionRate) })}</p>
          </div>
          <p style={disclaimerStyle}>{t("result.disclaimer")}</p>
          <button type="button" style={secondaryButtonStyle} onClick={() => setSubmitted(false)}>
            {t("result.edit")}
          </button>
        </DsCard>

        <DsCardPaper>
          <h2 style={nextTitleStyle}>{t("next.title")}</h2>
          <p style={nextPStyle}>{t("next.p1")}</p>
          <p style={nextPStyle}>{t("next.p2")}</p>
          <Link href="/diagnostic" style={ctaStyle} onClick={handleCtaClick}>
            {t("next.cta")}
          </Link>
          <p style={ctaMetaStyle}>{t("next.ctaMeta")}</p>
        </DsCardPaper>
      </>
    );
  }

  return (
    <DsCard>
      <h2 style={sectionTitleStyle}>{t("form.title")}</h2>
      {field("people", people, setPeople, { min: "1", step: "1" })}
      {field("cost", cost, setCost, { min: "1", step: "100" })}
      {field("friction", friction, setFriction, { min: "0", step: "0.5" })}
      {field("hours", hours, setHours, { min: "1", step: "0.5" })}

      <button type="button" style={buttonStyle} onClick={handleCalculate} disabled={!allFilled}>
        {t("form.submit")}
      </button>
      {submitted && result === null && <p style={noticeStyle}>{t("form.invalid")}</p>}
      <p style={privacyStyle}>{t("form.privacy")}</p>
    </DsCard>
  );
}
