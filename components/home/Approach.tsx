import { MessageSquare, FileSearch, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Discovery & Validation",
    description:
      "We understand your problem, validate the approach, and make sure we're building the right thing.",
  },
  {
    icon: FileSearch,
    step: "02",
    title: "Scope & Planning",
    description:
      "Clear deliverables, timeline, and pricing. You know exactly what you're getting before we start.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Build & Iterate",
    description:
      "Weekly demos, direct communication, rapid progress. You see real progress every week.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch & Support",
    description:
      "Deployment, documentation, and ongoing partnership. We don't disappear after launch.",
  },
];

export default function Approach() {
  return (
    <section className="py-12 lg:py-16 bg-[var(--dd-bg-soft)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-3">
            Our <span className="gradient-text">approach</span>
          </h2>
          <p className="text-[var(--dd-text-muted)] max-w-2xl mx-auto">
            A clear, structured process from first call to long-term partnership.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connector line (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-[2px] bg-gradient-to-r from-[var(--dd-border)] to-transparent" />
              )}

              <div className="p-5 rounded-xl bg-[var(--dd-bg)] border border-[var(--dd-border)] card-hover h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-[var(--dd-accent)]" />
                  </div>
                  <span className="text-[var(--dd-accent)] font-mono font-bold text-sm">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[var(--dd-text-main)] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--dd-text-muted)]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}