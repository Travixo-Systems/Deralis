import { Rocket, Building2, RefreshCw } from "lucide-react";

const audiences = [
  {
    icon: Rocket,
    title: "Startups & Founders",
    description:
      "You have an idea but need technical expertise to validate and build it. We help you ship fast without cutting corners.",
    points: ["Idea validation", "MVP development", "Technical guidance"],
  },
  {
    icon: Building2,
    title: "Small Businesses",
    description:
      "You're ready to digitalize operations, automate workflows, or replace outdated tools with real systems.",
    points: ["Process digitalization", "Custom dashboards", "Workflow automation"],
  },
  {
    icon: RefreshCw,
    title: "Teams Needing Modernization",
    description:
      "You have legacy systems or inherited codebases that need to be rebuilt, migrated, or properly maintained.",
    points: ["Legacy migration", "Codebase takeover", "Technical debt cleanup"],
  },
];

export default function WhoWeWorkWith() {
  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-3">
            Who we <span className="gradient-text">work with</span>
          </h2>
          <p className="text-[var(--dd-text-muted)] max-w-2xl mx-auto">
            We partner with businesses that need real systems, not just websites.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="gradient-border p-6"
            >
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center mb-4">
                <audience.icon className="w-5 h-5 text-[var(--dd-accent)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--dd-text-main)] mb-2">
                {audience.title}
              </h3>
              <p className="text-sm text-[var(--dd-text-muted)] mb-4">
                {audience.description}
              </p>
              <ul className="space-y-1">
                {audience.points.map((point) => (
                  <li
                    key={point}
                    className="text-xs text-[var(--dd-text-dim)] flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--dd-accent)]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}