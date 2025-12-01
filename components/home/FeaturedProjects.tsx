"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ExternalLink, Database, Code2, Globe } from "lucide-react";

const projectKeys = ["travixo", "travixoWeb", "more"] as const;

const projectIcons = {
  travixo: Database,
  travixoWeb: Globe,
  more: Code2,
};

const projectConfig = {
  travixo: {
    stack: ["Next.js 15", "Supabase", "PostgreSQL", "Prisma"],
    liveUrl: "https://travixosystems.com",
    appUrl: "https://app.travixosystems.com",
    featured: true,
  },
  travixoWeb: {
    stack: ["Next.js 15", "Tailwind", "next-intl"],
    liveUrl: "https://travixosystems.com",
    featured: false,
  },
  more: {
    stack: ["Various"],
    href: "/projects",
    featured: false,
  },
};

export default function FeaturedProjects() {
  const t = useTranslations("home.featured");
  const tActions = useTranslations("common.actions");

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-3">
            {t("title")} <span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
          <p className="text-[var(--dd-text-muted)] max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {projectKeys.map((key) => {
            const Icon = projectIcons[key];
            const config = projectConfig[key];

            return (
              <div
                key={key}
                className={`p-5 rounded-xl border flex flex-col ${
                  config.featured
                    ? "gradient-border"
                    : "bg-[var(--dd-bg-card)] border-[var(--dd-border)]"
                }`}
              >
                {config.featured && (
                  <span className="text-xs text-[var(--dd-accent)] font-medium mb-3">
                    {t("label")}
                  </span>
                )}

                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[var(--dd-accent)]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--dd-text-main)]">
                      {t(`projects.${key}.title`)}
                    </h3>
                    <p className="text-xs text-[var(--dd-text-dim)]">
                      {t(`projects.${key}.type`)}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-[var(--dd-text-muted)] mb-4 flex-grow">
                  {t(`projects.${key}.description`)}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {config.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-xs bg-[var(--dd-bg)] border border-[var(--dd-border)] text-[var(--dd-text-dim)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-3 border-t border-[var(--dd-border)]">
                  {"liveUrl" in config && config.liveUrl && (
                    <a
                      href={config.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--dd-accent)] text-sm font-medium hover:underline inline-flex items-center gap-1"
                    >
                      {t("actions.visitSite")}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {"appUrl" in config && config.appUrl && (
                    <a
                      href={config.appUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--dd-text-muted)] text-sm hover:text-[var(--dd-text-main)] inline-flex items-center gap-1"
                    >
                      {t("actions.openApp")}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {"href" in config && config.href && (
                    <Link
                      href={config.href}
                      className="text-[var(--dd-accent)] text-sm font-medium hover:underline inline-flex items-center gap-1"
                    >
                      {tActions("viewAll")}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/projects" className="btn-secondary">
            {tActions("viewAllPlatforms")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
