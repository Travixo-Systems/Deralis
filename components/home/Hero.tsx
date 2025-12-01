"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Database, Code2, Layers, Server } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Code2, text: "Next.js, React, TypeScript" },
  { icon: Database, text: "PostgreSQL, Supabase, Prisma" },
  { icon: Layers, text: "Dashboards, SaaS, automation, APIs" },
];

const techStack = [
  "Next.js 15",
  "TypeScript",
  "Supabase",
  "PostgreSQL",
  "Prisma",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-mesh">
      {/* Ambient gradient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 60%)",
            top: "-20%",
            left: "-10%",
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 60%)",
            bottom: "-10%",
            right: "-5%",
          }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--dd-text-muted) 1px, transparent 1px),
            linear-gradient(90deg, var(--dd-text-muted) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--dd-bg-card)] border border-[var(--dd-border)] mb-4"
            >
              <Server className="w-4 h-4 text-[var(--dd-accent)]" />
              <span className="text-sm text-[var(--dd-text-muted)]">
                Full-stack engineering, not templates.
              </span>
            </motion.div>

            {/* Heading with glow effect */}
            <div className="relative mb-4">
              {/* Glow behind headline */}
              <div 
                className="absolute -inset-x-4 -inset-y-2 opacity-60 blur-2xl pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(34, 211, 238, 0.15) 0%, transparent 70%)",
                }}
              />
              <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-[var(--dd-text-main)]">
                  Modern Web Systems
                </span>
                <br />
                <span className="gradient-text">Not Just Websites.</span>
              </h1>
            </div>

            {/* Description - tighter spacing */}
            <p className="text-lg text-[var(--dd-text-muted)] mb-5 max-w-xl leading-relaxed">
              We build real web platforms—Next.js applications powered by SQL
              databases, Supabase, secure authentication, and automation workflows.
              We deliver software, not pages. Systems, not templates.
            </p>

            {/* Feature bullets */}
            <div className="space-y-2 mb-5">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 text-[var(--dd-text-muted)]"
                >
                  <feature.icon className="w-4 h-4 text-[var(--dd-accent)] flex-shrink-0" />
                  <span className="text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/contact" className="btn-primary">
                Build your system
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/projects" className="btn-secondary">
                See our platforms
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats + Screenshot */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Stats Card */}
            <div className="gradient-border p-5 mb-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-3xl font-bold gradient-text mb-1">5+</p>
                  <p className="text-sm text-[var(--dd-text-muted)]">
                    Platforms shipped
                  </p>
                  <p className="text-xs text-[var(--dd-text-dim)] mt-0.5">
                    Next.js / SQL / Supabase
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-text mb-1">100%</p>
                  <p className="text-sm text-[var(--dd-text-muted)]">
                    Delivery rate
                  </p>
                  <p className="text-xs text-[var(--dd-text-dim)] mt-0.5">
                    Shipped, tested, deployed
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-text mb-1">24h</p>
                  <p className="text-sm text-[var(--dd-text-muted)]">
                    Response time
                  </p>
                  <p className="text-xs text-[var(--dd-text-dim)] mt-0.5">
                    Real engineering support
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-text mb-1">EN/FR</p>
                  <p className="text-sm text-[var(--dd-text-muted)]">
                    Fully bilingual
                  </p>
                  <p className="text-xs text-[var(--dd-text-dim)] mt-0.5">
                    Europe & remote
                  </p>
                </div>
              </div>
            </div>

            {/* Screenshot with skeleton placeholder */}
            <div className="relative rounded-xl overflow-hidden border border-[var(--dd-border)] bg-[var(--dd-bg-card)]">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--dd-border)] bg-[var(--dd-bg-soft)]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="ml-3 text-xs text-[var(--dd-text-dim)] font-mono">
                  app.travixosystems.com
                </span>
              </div>
              
              {/* Skeleton UI placeholder */}
              <div className="aspect-video bg-[var(--dd-bg)] p-4">
                {/* Skeleton header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--dd-bg-soft)] animate-pulse" />
                    <div className="w-24 h-4 rounded bg-[var(--dd-bg-soft)] animate-pulse" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-16 h-6 rounded bg-[var(--dd-bg-soft)] animate-pulse" />
                    <div className="w-16 h-6 rounded bg-[var(--dd-accent)]/20 animate-pulse" />
                  </div>
                </div>
                
                {/* Skeleton stats row */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="p-3 rounded-lg bg-[var(--dd-bg-soft)]">
                      <div className="w-8 h-5 rounded bg-[var(--dd-bg-card)] animate-pulse mb-2" />
                      <div className="w-12 h-3 rounded bg-[var(--dd-bg-card)] animate-pulse" />
                    </div>
                  ))}
                </div>
                
                {/* Skeleton table */}
                <div className="rounded-lg border border-[var(--dd-border)] overflow-hidden">
                  <div className="flex gap-4 p-2 bg-[var(--dd-bg-soft)] border-b border-[var(--dd-border)]">
                    <div className="w-20 h-3 rounded bg-[var(--dd-bg-card)] animate-pulse" />
                    <div className="w-16 h-3 rounded bg-[var(--dd-bg-card)] animate-pulse" />
                    <div className="w-24 h-3 rounded bg-[var(--dd-bg-card)] animate-pulse" />
                    <div className="w-14 h-3 rounded bg-[var(--dd-bg-card)] animate-pulse" />
                  </div>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex gap-4 p-2 border-b border-[var(--dd-border)] last:border-0">
                      <div className="w-20 h-3 rounded bg-[var(--dd-bg-soft)] animate-pulse" />
                      <div className="w-16 h-3 rounded bg-[var(--dd-bg-soft)] animate-pulse" />
                      <div className="w-24 h-3 rounded bg-[var(--dd-bg-soft)] animate-pulse" />
                      <div className="w-14 h-3 rounded bg-[var(--dd-accent)]/10 animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* When you have the screenshot, replace skeleton with:
              <div className="aspect-video relative">
                <Image
                  src="/projects/travixo-dashboard.png"
                  alt="TraviXO Dashboard - Asset management system"
                  fill
                  className="object-cover"
                />
              </div>
              */}
            </div>

            {/* Tech stack pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-[var(--dd-text-muted)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Decorative glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-gradient-to-r from-[var(--dd-grad-from)]/5 to-[var(--dd-grad-to)]/5 blur-3xl" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
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