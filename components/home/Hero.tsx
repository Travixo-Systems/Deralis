"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Database, Code2, Layers, Server } from "lucide-react";
import { motion } from "framer-motion";

const techStack = [
  "Next.js 15",
  "TypeScript",
  "Supabase",
  "PostgreSQL",
  "Prisma",
];

export default function Hero() {
  const t = useTranslations("home.hero");
  const tActions = useTranslations("common.actions");

  const features = [
    { icon: Code2, text: t("features.tech") },
    { icon: Database, text: t("features.database") },
    { icon: Layers, text: t("features.capabilities") },
  ];

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
                {t("badge")}
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
                  {t("title")}
                </span>
                <br />
                <span className="gradient-text">{t("titleHighlight")}</span>
              </h1>
            </div>

            {/* Description - tighter spacing */}
            <p className="text-lg text-[var(--dd-text-muted)] mb-5 max-w-xl leading-relaxed">
              {t("description")}
              {" "}{t("subDescription")}
            </p>

            {/* Feature bullets */}
            <div className="space-y-2 mb-5">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
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
                {tActions("buildYourSystem")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/projects" className="btn-secondary">
                {tActions("seePlatforms")}
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
                  <p className="text-3xl font-bold gradient-text mb-1">{t("stats.platforms.value")}</p>
                  <p className="text-sm text-[var(--dd-text-muted)]">
                    {t("stats.platforms.label")}
                  </p>
                  <p className="text-xs text-[var(--dd-text-dim)] mt-0.5">
                    {t("stats.platforms.sublabel")}
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-text mb-1">{t("stats.delivery.value")}</p>
                  <p className="text-sm text-[var(--dd-text-muted)]">
                    {t("stats.delivery.label")}
                  </p>
                  <p className="text-xs text-[var(--dd-text-dim)] mt-0.5">
                    {t("stats.delivery.sublabel")}
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-text mb-1">{t("stats.response.value")}</p>
                  <p className="text-sm text-[var(--dd-text-muted)]">
                    {t("stats.response.label")}
                  </p>
                  <p className="text-xs text-[var(--dd-text-dim)] mt-0.5">
                    {t("stats.response.sublabel")}
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-text mb-1">{t("stats.bilingual.value")}</p>
                  <p className="text-sm text-[var(--dd-text-muted)]">
                    {t("stats.bilingual.label")}
                  </p>
                  <p className="text-xs text-[var(--dd-text-dim)] mt-0.5">
                    {t("stats.bilingual.sublabel")}
                  </p>
                </div>
              </div>
            </div>

            {/* Screenshot */}
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

              {/* Screenshot */}
              <div className="aspect-video relative">
                <Image
                  src="/projects/travixo-dashboard.png"
                  alt="TraviXO Dashboard - Asset management system"
                  fill
                  className="object-cover object-top"
                />
              </div>
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
