"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Zap,
  Database,
  CheckCircle2,
  Server,
  Layers,
  Shield,
  Code2,
  Workflow,
  Settings,
  Bot,
  MapPin
} from "lucide-react";
import ScreenshotGallery from "@/components/about/ScreenshotGallery";

const whatWeBuildIcons = {
  saas: Layers,
  dashboards: Server,
  databases: Database,
  automation: Workflow,
  api: Settings,
};

const techStack = {
  frontend: ["Next.js 15", "React", "TypeScript", "Tailwind", "shadcn/ui"],
  backend: ["Supabase", "PostgreSQL", "Prisma", "Edge/serverless"],
  systems: ["Authentication", "Multi-tenant logic", "RBAC permissions", "File uploads", "Background tasks"],
  automations: ["API integrations", "Automation workflows", "Custom GPT assistants"],
};

export default function AboutPage() {
  const t = useTranslations("about");
  const tActions = useTranslations("common.actions");

  const whatWeBuildKeys = ["saas", "dashboards", "databases", "automation", "api"] as const;
  const stepKeys = ["step1", "step2", "step3", "step4", "step5"] as const;

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 lg:pt-28 lg:pb-10 bg-mesh">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-sm text-[var(--dd-accent)] font-medium mb-3 whitespace-nowrap">
                {t("hero.badge")}
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--dd-text-main)] mb-4">
                {t("hero.title")}{" "}
                <span className="gradient-text">{t("hero.titleHighlight")}</span>
              </h1>
              <p className="text-lg text-[var(--dd-text-muted)] mb-4 leading-relaxed">
                {t("hero.description")}
              </p>
            </div>

            {/* Stats Card */}
            <div className="gradient-border p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-3xl font-bold gradient-text mb-1">5+</p>
                  <p className="text-sm text-[var(--dd-text-muted)]">Platforms shipped</p>
                  <p className="text-xs text-[var(--dd-text-dim)] mt-1">
                    Next.js / SQL / Supabase
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-text mb-1">100%</p>
                  <p className="text-sm text-[var(--dd-text-muted)]">Delivery rate</p>
                  <p className="text-xs text-[var(--dd-text-dim)] mt-1">
                    Shipped, tested, deployed
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-text mb-1">24h</p>
                  <p className="text-sm text-[var(--dd-text-muted)]">Response time</p>
                  <p className="text-xs text-[var(--dd-text-dim)] mt-1">
                    Real engineering support
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-text mb-1">EN/FR</p>
                  <p className="text-sm text-[var(--dd-text-muted)]">Fully bilingual</p>
                  <p className="text-xs text-[var(--dd-text-dim)] mt-1">
                    France — Worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Intro Section */}
      <section className="py-8 lg:py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-4 text-[var(--dd-text-muted)] leading-relaxed">
            <p className="text-lg">
              {t("intro.paragraph1")}
            </p>
            <p>
              {t("intro.paragraph2")}
            </p>
          </div>

          <div className="mt-6">
            <Link href="/contact" className="btn-primary">
              {tActions("workWithUs")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-8 lg:py-12 bg-[var(--dd-bg-soft)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--dd-text-main)] mb-4">
            {t("philosophy.title")}
          </h2>
          <p className="text-lg text-[var(--dd-text-muted)] mb-6">
            {t("philosophy.subtitle")}
          </p>

          <p className="text-[var(--dd-text-muted)] mb-4">{t("philosophy.systemsTitle")}</p>
          <ul className="space-y-2 mb-6">
            {(t.raw("philosophy.systems") as string[]).map((item: string) => (
              <li key={item} className="flex items-center gap-3 text-[var(--dd-text-muted)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--dd-accent)] flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-[var(--dd-text-main)] font-medium">
            {t("philosophy.conclusion")}
          </p>
        </div>
      </section>

      {/* What We Build Section */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--dd-text-main)] mb-3">
              {t("whatWeBuild.title")}
            </h2>
            <p className="text-[var(--dd-text-muted)]">
              {t("whatWeBuild.description")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whatWeBuildKeys.map((key) => {
              const Icon = whatWeBuildIcons[key];
              return (
                <div
                  key={key}
                  className="p-5 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)] card-hover"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-[var(--dd-accent)]" />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--dd-text-main)] mb-1">
                    {t(`whatWeBuild.items.${key}.title`)}
                  </h3>
                  <p className="text-sm text-[var(--dd-text-muted)]">
                    {t(`whatWeBuild.items.${key}.description`)}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="text-sm text-[var(--dd-text-dim)] mt-6 max-w-4xl">
            {t("whatWeBuild.note")}
          </p>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-8 lg:py-12 bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--dd-text-main)] mb-3">
              {t("howWeWork.title")}
            </h2>
            <p className="text-[var(--dd-text-muted)]">
              {t("howWeWork.description")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {stepKeys.map((key) => (
              <div
                key={key}
                className="p-5 rounded-xl bg-[var(--dd-bg)] border border-[var(--dd-border)]"
              >
                <span className="text-[var(--dd-accent)] font-mono font-bold text-sm">
                  {t(`howWeWork.steps.${key}.number`)}
                </span>
                <h3 className="text-base font-semibold text-[var(--dd-text-main)] mt-2 mb-1">
                  {t(`howWeWork.steps.${key}.title`)}
                </h3>
                <p className="text-sm text-[var(--dd-text-muted)]">
                  {t(`howWeWork.steps.${key}.description`)}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm text-[var(--dd-text-dim)] mt-6 max-w-4xl">
            {t("howWeWork.note")}
          </p>
        </div>
      </section>

      {/* Technology Expertise Section */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--dd-text-main)] mb-3">
              {t("techExpertise.title")}
            </h2>
            <p className="text-[var(--dd-text-muted)]">
              {t("techExpertise.description")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Frontend */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--dd-text-main)] mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[var(--dd-accent)]" />
                {t("techExpertise.categories.frontend")}
              </h3>
              <div className="space-y-2">
                {techStack.frontend.map((tech) => (
                  <div
                    key={tech}
                    className="px-3 py-2 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-sm text-[var(--dd-text-muted)]"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--dd-text-main)] mb-3 flex items-center gap-2">
                <Database className="w-4 h-4 text-[var(--dd-accent)]" />
                {t("techExpertise.categories.backend")}
              </h3>
              <div className="space-y-2">
                {techStack.backend.map((tech) => (
                  <div
                    key={tech}
                    className="px-3 py-2 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-sm text-[var(--dd-text-muted)]"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Systems */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--dd-text-main)] mb-3 flex items-center gap-2">
                <Server className="w-4 h-4 text-[var(--dd-accent)]" />
                {t("techExpertise.categories.systems")}
              </h3>
              <div className="space-y-2">
                {techStack.systems.map((tech) => (
                  <div
                    key={tech}
                    className="px-3 py-2 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-sm text-[var(--dd-text-muted)]"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Automations & AI */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--dd-text-main)] mb-3 flex items-center gap-2">
                <Bot className="w-4 h-4 text-[var(--dd-accent)]" />
                {t("techExpertise.categories.automations")}
              </h3>
              <div className="space-y-2">
                {techStack.automations.map((tech) => (
                  <div
                    key={tech}
                    className="px-3 py-2 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-sm text-[var(--dd-text-muted)]"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-8 lg:py-12 bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--dd-text-main)] mb-3">
              {t("screenshots.title")}
            </h2>
            <p className="text-[var(--dd-text-muted)]">
              {t("screenshots.description")}
            </p>
          </div>

          {/* Screenshot Gallery with Modal */}
          <ScreenshotGallery />

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-[var(--dd-text-muted)]">
              {t("screenshots.notes.note1")}
            </p>
            <p className="text-sm text-[var(--dd-text-muted)]">
              {t("screenshots.notes.note2")}
            </p>
            <p className="text-sm text-[var(--dd-text-dim)]">
              {t("screenshots.notes.note3")}
            </p>
          </div>
        </div>
      </section>

      {/* Principle */}
      <section className="py-6 border-y border-[var(--dd-border)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[var(--dd-text-dim)] text-sm uppercase tracking-wider mb-1">
            {t("principle.label")}
          </p>
          <p className="text-xl font-semibold text-[var(--dd-text-main)]">
            {t("principle.text")}
          </p>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-8 lg:py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--dd-text-main)] mb-6">
            {t("whyChoose.title")}
          </h2>

          <div className="grid sm:grid-cols-2 gap-3">
            {(t.raw("whyChoose.items") as string[]).map((item: string) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--dd-accent)] flex-shrink-0" />
                <span className="text-[var(--dd-text-muted)]">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-[var(--dd-text-main)] font-medium mt-8">
            {t("whyChoose.conclusion")}
          </p>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-8 lg:py-10 bg-[var(--dd-bg-soft)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-5 h-5 text-[var(--dd-accent)]" />
            <h2 className="text-xl font-bold text-[var(--dd-text-main)]">
              {t("location.title")}
            </h2>
          </div>
          <p className="text-[var(--dd-text-muted)]">
            {t("location.description")}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--dd-text-main)] mb-3">
            {t("cta.title")}
          </h2>
          <p className="text-[var(--dd-text-muted)] max-w-xl mx-auto mb-6">
            {t("cta.description")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              {tActions("startConversation")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/projects" className="btn-secondary">
              {tActions("seePlatforms")}
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-8 border-t border-[var(--dd-border)] bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-[var(--dd-text-main)] font-semibold">
                {t("finalCta.title")}
              </p>
              <p className="text-sm text-[var(--dd-text-muted)]">
                {t("finalCta.description")}{" "}
                <a
                  href="mailto:contact@deralis.digital"
                  className="text-[var(--dd-accent)] hover:underline"
                >
                  contact@deralis.digital
                </a>
              </p>
            </div>
            <Link href="/contact" className="btn-primary">
              {tActions("getInTouch")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
