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
