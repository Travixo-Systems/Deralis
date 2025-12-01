"use client";

import { motion } from "framer-motion";
import { User, Building2, Rocket } from "lucide-react";

const audiences = [
  {
    icon: User,
    title: "Solo founders & independents",
    description:
      "Need a professional digital setup from day one. We help you launch with clean systems that scale with your growth.",
  },
  {
    icon: Building2,
    title: "Small businesses & agencies",
    description:
      "Need a reliable tech partner that understands business. We translate your needs into efficient digital solutions.",
  },
  {
    icon: Rocket,
    title: "SaaS & product founders",
    description:
      "Need MVPs and V1s that scale, not prototypes that break. We build production-ready applications from the start.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function WhoWeWorkWith() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--dd-bg-soft)]">
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
            Who We Work With
          </h2>
          <p className="text-[var(--dd-text-muted)] max-w-2xl mx-auto">
            We partner with businesses at different stages, all sharing one goal: building something that works.
          </p>
        </motion.div>

        {/* Audience Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              variants={itemVariants}
              className="relative group"
            >
              <div className="h-full p-8 rounded-xl bg-[var(--dd-bg)] border border-[var(--dd-border)] card-hover">
                {/* Number */}
                <span className="absolute top-6 right-6 text-6xl font-bold text-[var(--dd-border)] select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--dd-grad-from)]/10 to-[var(--dd-grad-to)]/10 border border-[var(--dd-border)] flex items-center justify-center mb-6 group-hover:border-[var(--dd-accent)]/30 transition-colors">
                  <audience.icon className="w-8 h-8 text-[var(--dd-accent)]" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-[var(--dd-text-main)] mb-3">
                  {audience.title}
                </h3>
                <p className="text-[var(--dd-text-muted)] leading-relaxed">
                  {audience.description}
                </p>
              </div>

              {/* Decorative gradient */}
              <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
