"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Calculator, TrendingUp } from "lucide-react";
import { analytics } from "@/lib/analytics";

type ProjectType = "saas" | "dashboard" | "automation" | "mvp";

const ROI_MULTIPLIERS: Record<ProjectType, { low: number; high: number; timelineLow: number; timelineHigh: number }> = {
  saas: { low: 3, high: 8, timelineLow: 8, timelineHigh: 12 },
  dashboard: { low: 2, high: 5, timelineLow: 4, timelineHigh: 8 },
  automation: { low: 4, high: 10, timelineLow: 2, timelineHigh: 6 },
  mvp: { low: 2, high: 6, timelineLow: 4, timelineHigh: 8 },
};

export default function ROICalculator() {
  const t = useTranslations("home.roiCalculator");
  const tActions = useTranslations("common.actions");
  const [projectType, setProjectType] = useState<ProjectType>("saas");
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(5000);
  const [showResults, setShowResults] = useState(false);

  const multiplier = ROI_MULTIPLIERS[projectType];
  const yearlyRevenue = monthlyRevenue * 12;
  const roiLow = yearlyRevenue * multiplier.low;
  const roiHigh = yearlyRevenue * multiplier.high;

  const handleCalculate = () => {
    setShowResults(true);
    analytics.roiCalculatorUsed(projectType, roiLow);
  };

  const projectTypes: { value: ProjectType; key: string }[] = [
    { value: "saas", key: "types.saas" },
    { value: "dashboard", key: "types.dashboard" },
    { value: "automation", key: "types.automation" },
    { value: "mvp", key: "types.mvp" },
  ];

  const revenueOptions = [2000, 5000, 10000, 20000, 50000];

  return (
    <section className="py-12 lg:py-16 bg-[var(--dd-bg)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[var(--dd-grad-from)] to-[var(--dd-grad-to)] flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-6 h-6 text-[var(--dd-bg)]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--dd-text-main)] mb-3">
              {t("title")}{" "}
              <span className="gradient-text">{t("titleHighlight")}</span>
            </h2>
            <p className="text-[var(--dd-text-muted)]">
              {t("description")}
            </p>
          </div>

          {/* Calculator */}
          <div className="gradient-border p-6 sm:p-8">
            <div className="space-y-6">
              {/* Project type */}
              <div>
                <label className="block text-sm font-medium text-[var(--dd-text-main)] mb-2">
                  {t("projectTypeLabel")}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {projectTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => { setProjectType(type.value); setShowResults(false); }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        projectType === type.value
                          ? "bg-gradient-to-r from-[var(--dd-grad-from)] to-[var(--dd-grad-to)] text-[var(--dd-bg)]"
                          : "bg-[var(--dd-bg)] border border-[var(--dd-border)] text-[var(--dd-text-muted)] hover:border-[var(--dd-accent)]"
                      }`}
                    >
                      {t(type.key)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Revenue */}
              <div>
                <label className="block text-sm font-medium text-[var(--dd-text-main)] mb-2">
                  {t("revenueLabel")}
                </label>
                <div className="flex flex-wrap gap-2">
                  {revenueOptions.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => { setMonthlyRevenue(amount); setShowResults(false); }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        monthlyRevenue === amount
                          ? "bg-gradient-to-r from-[var(--dd-grad-from)] to-[var(--dd-grad-to)] text-[var(--dd-bg)]"
                          : "bg-[var(--dd-bg)] border border-[var(--dd-border)] text-[var(--dd-text-muted)] hover:border-[var(--dd-accent)]"
                      }`}
                    >
                      €{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculate button */}
              {!showResults && (
                <button onClick={handleCalculate} className="btn-primary w-full justify-center">
                  {t("calculate")}
                  <TrendingUp className="w-4 h-4" />
                </button>
              )}

              {/* Results */}
              {showResults && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[var(--dd-bg)] border border-[var(--dd-border)]">
                      <p className="text-xs text-[var(--dd-text-dim)] mb-1">{t("timeline")}</p>
                      <p className="text-lg font-bold gradient-text">
                        {multiplier.timelineLow} to {multiplier.timelineHigh} {t("weeks")}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-[var(--dd-bg)] border border-[var(--dd-border)]">
                      <p className="text-xs text-[var(--dd-text-dim)] mb-1">{t("roiMultiplier")}</p>
                      <p className="text-lg font-bold gradient-text">
                        {multiplier.low}x to {multiplier.high}x
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-[var(--dd-grad-from)]/10 to-[var(--dd-grad-to)]/10 border border-[var(--dd-accent)]/30">
                    <p className="text-sm text-[var(--dd-text-muted)] mb-1">{t("projectedValue")}</p>
                    <p className="text-2xl font-bold text-[var(--dd-text-main)]">
                      €{roiLow.toLocaleString()} to €{roiHigh.toLocaleString()}
                      <span className="text-sm font-normal text-[var(--dd-text-dim)] ml-2">{t("perYear")}</span>
                    </p>
                  </div>

                  <Link href="/contact" className="btn-primary w-full justify-center">
                    {tActions("bookCall")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <p className="text-xs text-[var(--dd-text-dim)] text-center">
                    {t("disclaimer")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
