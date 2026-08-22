"use client";

import { useSyncExternalStore } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ESTIMATE_STORAGE_KEY } from "@/components/frictions/FrictionCalculator";
import { formatEuros, formatRate } from "@/lib/coordination-cost";
import type { CSSProperties } from "react";

type Estimate = { annualCapacityCost: number; frictionRate: number; calculatedAt: string };

const bannerStyle: CSSProperties = {
  background: "var(--card-paper)",
  borderLeft: "3px solid var(--accent)",
  borderRadius: "var(--radius-internal)",
  padding: "22px 24px",
  marginBottom: 28,
};

const eyebrowStyle: CSSProperties = {
  fontSize: "var(--fs-eyebrow)",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--text-muted)",
  fontWeight: 600,
  marginBottom: 10,
};

const bodyStyle: CSSProperties = {
  fontSize: 15,
  lineHeight: 1.6,
  color: "var(--text-secondary)",
  maxWidth: "68ch",
};

const linkStyle: CSSProperties = {
  display: "inline-block",
  marginTop: 12,
  fontSize: 13,
  color: "var(--text-muted)",
  textDecoration: "underline",
  textUnderlineOffset: 3,
};

/**
 * sessionStorage is not reactive and is unavailable during SSR, so the value is
 * read through useSyncExternalStore with a null server snapshot. getSnapshot
 * must return a referentially stable value or React re-renders forever, hence
 * the cache: JSON.parse would hand back a new object on every call.
 */
let cachedRaw: string | null = null;
let cachedValue: Estimate | null = null;

function parseEstimate(raw: string | null): Estimate | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Estimate;
    const valid =
      typeof parsed?.annualCapacityCost === "number" &&
      Number.isFinite(parsed.annualCapacityCost) &&
      typeof parsed?.frictionRate === "number" &&
      Number.isFinite(parsed.frictionRate);
    return valid ? parsed : null;
  } catch {
    return null;
  }
}

function getSnapshot(): Estimate | null {
  let raw: string | null = null;
  try {
    raw = sessionStorage.getItem(ESTIMATE_STORAGE_KEY);
  } catch {
    // Private browsing or blocked storage: no banner, no error.
    return null;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedValue = parseEstimate(raw);
  }
  return cachedValue;
}

/** sessionStorage does not change within a tab while this is mounted. */
function subscribe(): () => void {
  return () => {};
}

/**
 * Shows the visitor the figure they produced on the calculator, if they made one.
 *
 * Read from sessionStorage rather than a query parameter on purpose: a URL
 * carrying salary or headcount would land in browser history, referrer headers,
 * server logs and any shared link. Renders nothing when there is no estimate,
 * which is also what happens when storage is unavailable.
 */
export default function EstimateBanner() {
  const t = useTranslations("diagnostic.page.estimateBanner");
  const locale = useLocale();
  const estimate = useSyncExternalStore(subscribe, getSnapshot, () => null);

  if (!estimate) return null;

  const amount = formatEuros(estimate.annualCapacityCost, locale);
  const rate = formatRate(estimate.frictionRate, locale);

  return (
    <aside style={bannerStyle} data-clarity-mask="true">
      <p style={eyebrowStyle}>{t("eyebrow")}</p>
      <p style={bodyStyle}>{t("body", { amount, rate })}</p>
      <Link href="/frictions-operationnelles" style={linkStyle}>
        {t("recalculate")}
      </Link>
    </aside>
  );
}
