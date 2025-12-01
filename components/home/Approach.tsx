"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discovery & diagnosis",
    description:
      "We dig into your business, understand your goals, and identify the real problems to solve.",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Solution design",
    description:
      "We map out the architecture, user flows, and technical strategy before touching code.",
  },
  {
    icon: Code,
    number: "03",
    title: "Build & integration",
    description:
      "Clean, modular development with continuous feedback loops. No surprises at the end.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch & iterate",
    description:
      "We deploy, monitor, and refine based on real usage data. Your product keeps improving.",
  },
];

export default function Approach() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--dd-bg)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 -translate-x-1/2 rounded-full bg-[var(--dd-grad-from)]/5 blur-3xl" />
        <div className="absolute top-1/2 right-0 w-96 h-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-[var(--dd-grad-to)]/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-4">
            Our Approach
          </h2>
          <p className="text-[var(--dd-text-muted)] max-w-2xl mx-auto text-lg">
            Before writing a single line of code, we validate your idea and challenge your assumptions.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--dd-border)] to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative"
              >
                <div className="h-full p-6 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)] group card-hover">
                  {/* Step number badge */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--dd-grad-from)] to-[var(--dd-grad-to)] flex items-center justify-center">
                        <step.icon className="w-7 h-7 text-[var(--dd-bg)]" />
                      </div>
                      {/* Pulse effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--dd-grad-from)] to-[var(--dd-grad-to)] animate-ping opacity-20" />
                    </div>
                    <span className="text-4xl font-bold text-[var(--dd-border)] group-hover:text-[var(--dd-accent)]/30 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-[var(--dd-text-main)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[var(--dd-text-muted)] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 -translate-y-1/2 z-10">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-full h-full text-[var(--dd-border)]"
                    >
                      <path
                        d="M9 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
