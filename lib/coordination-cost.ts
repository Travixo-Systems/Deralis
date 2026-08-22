/**
 * Estimates the paid salary capacity absorbed by operational friction.
 *
 * METHOD. This is a capacity-cost calculation in the shape of Time-Driven
 * Activity-Based Costing (Kaplan & Anderson): the cost of supplying a capacity,
 * multiplied by the share of that capacity a given activity consumes.
 *
 * It is NOT an ISEOR diagnostic. ISEOR's socio-economic method is a
 * participative qualitative, quantitative and financial intervention across
 * several dysfunction families. The categories of friction this page asks
 * about are informed by that body of work; the arithmetic here is not it, and
 * the page must never claim otherwise.
 *
 * DELIBERATELY CONSERVATIVE. Strict TDABC divides by *practical* capacity,
 * roughly 80 to 85 percent of theoretical, because nobody is productive for
 * 100 percent of contracted hours. Dividing by contractual hours instead makes
 * the resulting rate smaller than a rigorous TDABC treatment would produce.
 * The estimate therefore understates rather than inflates.
 *
 * WHAT THE OUTPUT IS NOT: an accounting loss, a cash outflow, or a guaranteed
 * saving. It values the share of employer cost matching the time declared.
 */

export type CoordinationCostInput = {
  /** People who actually perform these tasks. Never total headcount. */
  affectedPeople: number;
  /** Gross annual salary plus employer contributions, per person. */
  annualEmployerCost: number;
  /** Friction hours per person per week. Never a team total. */
  frictionHoursPerWeek: number;
  /** Contractual weekly hours. */
  weeklyWorkingHours: number;
};

export type CoordinationCostResult = {
  /** Share of paid capacity absorbed, 0 to 1. */
  frictionRate: number;
  /** Annual salary capacity mobilised, in euros. */
  annualCapacityCost: number;
};

/** Above this, the visitor has probably entered a team total rather than a per-person figure. */
export const FRICTION_HOURS_WARNING_THRESHOLD = 10;

export function calculateCoordinationCost({
  affectedPeople,
  annualEmployerCost,
  frictionHoursPerWeek,
  weeklyWorkingHours,
}: CoordinationCostInput): CoordinationCostResult | null {
  const finite = [affectedPeople, annualEmployerCost, frictionHoursPerWeek, weeklyWorkingHours];
  if (finite.some((n) => !Number.isFinite(n))) return null;

  if (
    affectedPeople <= 0 ||
    annualEmployerCost <= 0 ||
    frictionHoursPerWeek < 0 ||
    weeklyWorkingHours <= 0 ||
    frictionHoursPerWeek > weeklyWorkingHours
  ) {
    return null;
  }

  const frictionRate = frictionHoursPerWeek / weeklyWorkingHours;
  const annualCapacityCost = affectedPeople * annualEmployerCost * frictionRate;

  return { frictionRate, annualCapacityCost };
}

/**
 * The published worked example. One definition, so the homepage, the diagnostic
 * page and the blog CTA cannot state three different figures, and so the copy
 * cannot drift from the formula above: the euro amount shown to a reader is
 * computed by calculateCoordinationCost, never typed into a message file.
 *
 * Deliberately modest. A reader who recognises himself in a larger number is
 * not helped by being shown a larger one first.
 */
export const WORKED_EXAMPLE: CoordinationCostInput = {
  affectedPeople: 10,
  annualEmployerCost: 45000,
  frictionHoursPerWeek: 2,
  weeklyWorkingHours: 35,
};

function tag(locale: string): string {
  return locale === "fr" ? "fr-FR" : "en-GB";
}

/** Whole euros. Shared so the calculator, the estimate banner and the worked
 *  example all render money the same way. */
export function formatEuros(value: number, locale: string): string {
  return new Intl.NumberFormat(tag(locale), {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

/** One decimal place, matching the rate the calculator reports. */
export function formatRate(value: number, locale: string): string {
  return new Intl.NumberFormat(tag(locale), {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}
