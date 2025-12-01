"use client";

import Link from "next/link";
import { ArrowRight, Code2, Sparkles, Workflow } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Code2, text: "Modern web development" },
  { icon: Workflow, text: "Digitalization & workflow setup" },
  { icon: Sparkles, text: "AI tools & automation" },
];

const buildItems = [
  "Modern websites",
  "Clean, scalable web apps",
  "AI copilots + automation",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-mesh">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(34, 211, 238, 0.12) 0%, transparent 70%)",
            top: "10%",
            left: "-10%",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%)",
            bottom: "10%",
            right: "-5%",
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--dd-text-muted) 1px, transparent 1px),
            linear-gradient(90deg, var(--dd-text-muted) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--dd-bg-card)] border border-[var(--dd-border)] mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--dd-accent)] animate-pulse" />
              <span className="text-sm text-[var(--dd-text-muted)]">
                Build. Modernize. Digitize.
              </span>
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="text-[var(--dd-text-main)]">
                Modern Web Development
              </span>
              <br />
              <span className="gradient-text">&amp; Digital Transformation</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-[var(--dd-text-muted)] mb-8 max-w-xl leading-relaxed">
              We help entrepreneurs and small businesses transition into clean,
              modern digital systems—with websites, web applications, and smart
              automations designed for real day-to-day work.
            </p>

            {/* Feature bullets */}
            <div className="flex flex-wrap gap-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2 text-[var(--dd-text-muted)]"
                >
                  <feature.icon className="w-4 h-4 text-[var(--dd-accent)]" />
                  <span className="text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/contact" className="btn-primary">
                Book a discovery call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/services" className="btn-secondary">
                View our services
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="gradient-border p-8 glow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-auto text-[var(--dd-text-dim)] text-sm font-mono">
                  deralis.digital
                </span>
              </div>

              <h3 className="text-xl font-semibold text-[var(--dd-text-main)] mb-6">
                What we build
              </h3>

              <div className="space-y-4">
                {buildItems.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-[var(--dd-bg-soft)] border border-[var(--dd-border)]"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center">
                      <span className="gradient-text font-bold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-[var(--dd-text-main)] font-medium">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Tech stack pills */}
              <div className="mt-6 pt-6 border-t border-[var(--dd-border)]">
                <p className="text-[var(--dd-text-dim)] text-xs mb-3">
                  Built with
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "TypeScript", "Supabase", "Tailwind"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs bg-[var(--dd-bg)] border border-[var(--dd-border)] text-[var(--dd-text-muted)]"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-gradient-to-r from-[var(--dd-grad-from)]/5 to-[var(--dd-grad-to)]/5 blur-3xl" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-[var(--dd-border)] flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-[var(--dd-accent)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
