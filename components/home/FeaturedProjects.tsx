"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ExternalLink, Landmark, Server, LayoutDashboard, ShoppingCart } from "lucide-react";

interface ProjectConfig {
  stack: string[];
  liveUrl?: string;
  href?: string;
}

const projectKeys = ["govPortal", "travixo", "more"] as const;

const projectIcons = {
  govPortal: Landmark,
  travixo: Server,
  more: LayoutDashboard,
};

const projectConfig: Record<(typeof projectKeys)[number], ProjectConfig> = {
  govPortal: {
    stack: ["Next.js", "TypeScript", "Supabase"],
  },
  travixo: {
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    liveUrl: "https://app.travixosystems.com",
  },
  more: {
    stack: ["Various"],
    href: "/projects",
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
                className="p-5 rounded-xl border flex flex-col bg-[var(--dd-bg-card)] border-[var(--dd-border)]"
              >

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
                  {config.liveUrl && (
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
                  {config.href && (
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
