"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Code2,
  Bot,
  Wrench,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Lightbulb,
    title: "Strategic Consulting & Business Validation",
    description:
      "Idea validation, market analysis, competition research, and clear roadmaps before you invest in development.",
    features: ["Idea validation", "Market / competition", "Roadmaps"],
    href: "/services#consulting",
  },
  {
    icon: Code2,
    title: "Web & Application Development",
    description:
      "High-performance websites and custom applications (SaaS, dashboards, tools) built with modern frameworks.",
    features: ["Next.js, Supabase, TypeScript", "Custom applications", "Scalable architecture"],
    href: "/services#development",
  },
  {
    icon: Bot,
    title: "AI Tools & Custom GPT Integration",
    description:
      "GPT assistants, AI features embedded in your apps, and smart workflows that save hours of manual work.",
    features: ["GPT assistants", "AI features in apps", "Smart workflows"],
    href: "/services#ai",
  },
  {
    icon: Wrench,
    title: "Support & Automation",
    description:
      "Ongoing technical support, tool integrations, and continuous monitoring to keep your systems running smoothly.",
    features: ["Ongoing tech help", "Tool integrations", "Monitoring & optimization"],
    href: "/services#automation",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Services() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--dd-bg)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-4">
            Our Services
          </h2>
          <p className="text-[var(--dd-text-muted)] max-w-2xl mx-auto">
            From validation to development and automation, we cover the full cycle.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative p-8 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)] card-hover"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--dd-grad-from)]/10 to-[var(--dd-grad-to)]/10 border border-[var(--dd-border)] flex items-center justify-center mb-6 group-hover:border-[var(--dd-accent)]/30 transition-colors">
                <service.icon className="w-7 h-7 text-[var(--dd-accent)]" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-[var(--dd-text-main)] mb-3">
                {service.title}
              </h3>
              <p className="text-[var(--dd-text-muted)] mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-[var(--dd-text-dim)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--dd-accent)]" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Link */}
              <Link
                href={service.href}
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--dd-accent)] hover:gap-3 transition-all"
              >
                Learn more
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--dd-grad-from)]/5 to-[var(--dd-grad-to)]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/services" className="btn-secondary">
            View all services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
