"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  ArrowRight,
  ExternalLink,
  Building2,
  Car,
  PawPrint,
  Globe,
  Briefcase,
  CheckCircle2
} from "lucide-react";

const projectKeys = ["travixoSystems", "travixoWeb", "deralisDigital", "ecoridepool", "arcadiaZoo"] as const;

const projectIcons = {
  travixoSystems: Building2,
  travixoWeb: Globe,
  deralisDigital: Briefcase,
  ecoridepool: Car,
  arcadiaZoo: PawPrint,
};

const projectConfig = {
  travixoSystems: {
    year: "2024–2025",
    status: "live",
    stack: ["Next.js 15", "Supabase", "Prisma", "PostgreSQL", "TypeScript"],
    liveUrl: "https://travixosystems.com",
    appUrl: "https://app.travixosystems.com",
    screenshot: "/projects/travixo-dashboard.png",
    featured: true,
  },
  travixoWeb: {
    year: "2024–2025",
    status: "live",
    stack: ["Next.js 15", "Tailwind CSS", "next-intl", "Framer Motion"],
    liveUrl: "https://travixosystems.com",
    featured: false,
  },
  deralisDigital: {
    year: "2024–2025",
    status: "inDevelopment",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: null,
    featured: false,
  },
  ecoridepool: {
    year: "2024",
    status: "mvpComplete",
    stack: ["PHP (Slim)", "MySQL", "MongoDB", "Bootstrap"],
    liveUrl: null,
    featured: false,
  },
  arcadiaZoo: {
    year: "2024",
    status: "completed",
    stack: ["PHP (OOP)", "MySQL", "HTML/CSS"],
    liveUrl: null,
    featured: false,
  },
};

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const tActions = useTranslations("common.actions");
  const tStats = useTranslations("common.stats");

  const stats = [
    { value: "5+", label: t("stats.delivered") },
    { value: "2024", label: tStats("founded") },
    { value: "100%", label: tStats("completionRate") },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-500";
      case "inDevelopment":
        return "bg-cyan-500";
      case "mvpComplete":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 lg:pt-28 lg:pb-10 bg-mesh">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--dd-text-main)] mb-4">
              {t("hero.title")}{" "}
              <span className="gradient-text">{t("hero.titleHighlight")}</span>
            </h1>
            <p className="text-lg text-[var(--dd-text-muted)] leading-relaxed">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-5 border-y border-[var(--dd-border)] bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-[var(--dd-text-main)]">
                  {stat.value}
                </p>
                <p className="text-sm text-[var(--dd-text-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      {projectKeys
        .filter((key) => projectConfig[key].featured)
        .map((key) => {
          const Icon = projectIcons[key];
          const config = projectConfig[key];
          const features = t.raw(`items.${key}.features`) as string[];

          return (
            <section key={key} className="py-8 lg:py-12">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[var(--dd-grad-from)] to-[var(--dd-grad-to)] text-[var(--dd-bg)] text-xs font-semibold">
                    {t("featured.badge")}
                  </span>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                  {/* Screenshot */}
                  <div className="rounded-xl overflow-hidden border border-[var(--dd-border)] bg-[var(--dd-bg-card)]">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--dd-border)] bg-[var(--dd-bg)]">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-3 h-3 rounded-full bg-green-500/60" />
                      <span className="ml-3 text-xs text-[var(--dd-text-dim)] font-mono">
                        app.travixosystems.com
                      </span>
                    </div>
                    <div className="aspect-video relative">
                      <Image
                        src="/projects/travixo-dashboard.png"
                        alt="TraviXO Dashboard - Asset management system"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[var(--dd-accent)]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-[var(--dd-text-main)]">
                          {t(`items.${key}.title`)}
                        </h2>
                        <p className="text-sm text-[var(--dd-text-muted)]">
                          {t(`items.${key}.type`)}
                        </p>
                      </div>
                    </div>

                    <p className="text-[var(--dd-text-muted)] mb-5 leading-relaxed">
                      {t(`items.${key}.description`)}
                    </p>

                    {/* Features */}
                    <div className="mb-5">
                      <h3 className="text-sm font-semibold text-[var(--dd-text-main)] mb-2">
                        {t("featured.keyFeatures")}
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {features.map((feature: string) => (
                          <li key={feature} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[var(--dd-accent)] flex-shrink-0" />
                            <span className="text-sm text-[var(--dd-text-muted)]">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {config.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded text-xs bg-[var(--dd-bg-soft)] border border-[var(--dd-border)] text-[var(--dd-text-muted)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3">
                      {config.liveUrl && (
                        <a
                          href={config.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                        >
                          {tActions("visitWebsite")}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {"appUrl" in config && config.appUrl && (
                        <a
                          href={config.appUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary"
                        >
                          {tActions("openApp")}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

      {/* Fleet Screenshot Section */}
      <section className="py-8 lg:py-10 bg-[var(--dd-bg-soft)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-center text-sm text-[var(--dd-text-dim)] mb-4">
            {t("fleetSection.caption")}
          </p>
          <div className="rounded-xl overflow-hidden border border-[var(--dd-border)] bg-[var(--dd-bg-card)]">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--dd-border)] bg-[var(--dd-bg)]">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-3 text-xs text-[var(--dd-text-dim)] font-mono">
                app.travixosystems.com/fleet
              </span>
            </div>
            <div className="aspect-[2/1] relative">
              <Image
                src="/projects/travixo-fleet.png"
                alt="TraviXO Fleet Management - Equipment tracking table"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[var(--dd-text-main)] mb-6">
            {t("moreProjects")}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {projectKeys
              .filter((key) => !projectConfig[key].featured)
              .map((key) => {
                const Icon = projectIcons[key];
                const config = projectConfig[key];
                const features = t.raw(`items.${key}.features`) as string[];

                return (
                  <div
                    key={key}
                    className="p-5 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)] card-hover"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[var(--dd-accent)]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--dd-text-main)]">
                          {t(`items.${key}.title`)}
                        </h3>
                        <p className="text-xs text-[var(--dd-text-muted)]">
                          {t(`items.${key}.type`)}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-[var(--dd-text-muted)] mb-3">
                      {t(`items.${key}.description`)}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {config.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-xs bg-[var(--dd-bg-soft)] border border-[var(--dd-border)] text-[var(--dd-text-dim)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[var(--dd-border)]">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${getStatusColor(config.status)}`}
                        />
                        <span className="text-xs text-[var(--dd-text-muted)]">
                          {t(`status.${config.status}`)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[var(--dd-text-dim)]">
                          {config.year}
                        </span>
                        {config.liveUrl && (
                          <a
                            href={config.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--dd-accent)] hover:text-[var(--dd-text-main)] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 lg:py-12 bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--dd-text-main)] mb-3">
            {t("cta.title")}
          </h2>
          <p className="text-[var(--dd-text-muted)] max-w-xl mx-auto mb-6">
            {t("cta.description")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              {tActions("buildYourSystem")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/services" className="btn-secondary">
              {tActions("viewAllServices")}
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-8 border-t border-[var(--dd-border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-[var(--dd-text-main)] font-semibold">
                {t("finalCta.title")}
              </p>
              <p className="text-sm text-[var(--dd-text-muted)]">
                {t("finalCta.description")}
              </p>
            </div>
            <Link href="/contact" className="btn-primary">
              {tActions("speakToEngineer")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
