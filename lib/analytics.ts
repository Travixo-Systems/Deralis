"use client";

// Lightweight analytics event tracking utility
// Supports GA4 (gtag) and custom event logging

type EventParams = Record<string, string | number | boolean>;

export function trackEvent(eventName: string, params?: EventParams) {
  // GA4 / gtag
  if (typeof window !== "undefined" && "gtag" in window) {
    const w = window as Window & { gtag: (...args: unknown[]) => void };
    w.gtag("event", eventName, params);
  }

  // Console logging in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${eventName}`, params);
  }
}

// Pre-defined conversion events
export const analytics = {
  // Lead capture events
  contactFormSubmit: (service?: string, budget?: string) =>
    trackEvent("generate_lead", {
      method: "contact_form",
      service: service || "not_specified",
      budget: budget || "not_specified",
    }),

  newsletterSignup: (source: string) =>
    trackEvent("generate_lead", {
      method: "newsletter",
      source,
    }),

  // Engagement events
  ctaClick: (ctaName: string, location: string) =>
    trackEvent("cta_click", {
      cta_name: ctaName,
      location,
    }),

  exitIntentShown: () =>
    trackEvent("exit_intent_shown"),

  exitIntentConverted: () =>
    trackEvent("exit_intent_converted"),

  roiCalculatorUsed: (projectType: string, estimatedValue: number) =>
    trackEvent("roi_calculator_used", {
      project_type: projectType,
      estimated_value: estimatedValue,
    }),

  // Page engagement
  scrollDepth: (depth: number) =>
    trackEvent("scroll_depth", { depth_percent: depth }),

  timeOnPage: (seconds: number) =>
    trackEvent("time_on_page", { seconds }),
};
