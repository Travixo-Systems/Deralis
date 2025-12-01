import { Metadata } from "next";
import Link from "next/link";
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

export const metadata: Metadata = {
  title: "About — Independent Engineering Practice",
  description:
    "Deralis Digital is an independent engineering practice building real web platforms — SaaS applications, dashboards, automation workflows, and SQL-powered databases.",
  openGraph: {
    title: "About | Deralis Digital",
    description:
      "Independent engineering practice building real web systems. No WordPress. No templates. Only real software.",
  },
};

const whatWeBuild = [
  {
    icon: Layers,
    title: "SaaS Platforms",
    description: "Multi-tenant, subscription-ready, scalable applications.",
  },
  {
    icon: Server,
    title: "Admin Dashboards",
    description: "Data-driven tools with secure authentication and role-based access.",
  },
  {
    icon: Database,
    title: "Database Systems",
    description: "PostgreSQL / Supabase architectures, migrations, and schema design.",
  },
  {
    icon: Workflow,
    title: "Automation Workflows",
    description: "Integrations with APIs, webhooks, triggers, and automation tools.",
  },
  {
    icon: Settings,
    title: "API Integrations",
    description: "Custom REST integrations, webhooks, OAuth, third-party systems.",
  },
];

const process = [
  {
    step: "01",
    title: "Technical Discovery",
    description: "Understanding your system, workflows, and constraints.",
  },
  {
    step: "02",
    title: "Architecture Design",
    description: "Database schema, API structure, core flows, security, scalability.",
  },
  {
    step: "03",
    title: "Development",
    description: "Full-stack implementation using Next.js, React, TypeScript, Supabase.",
  },
  {
    step: "04",
    title: "Testing & Deployment",
    description: "Staging, QA, production deployment, environment setup.",
  },
  {
    step: "05",
    title: "Long-term Support",
    description: "Feature updates, monitoring, improvements, and scaling.",
  },
];

const techStack = {
  frontend: ["Next.js 15", "React", "TypeScript", "Tailwind", "shadcn/ui"],
  backend: ["Supabase", "PostgreSQL", "Prisma", "Edge/serverless"],
  systems: ["Authentication", "Multi-tenant logic", "RBAC permissions", "File uploads", "Background tasks"],
  automations: ["API integrations", "Automation workflows", "Custom GPT assistants"],
};

const whyChoose = [
  "Work directly with a senior engineer",
  "Full-stack delivery: frontend, backend, database",
  "Modern stack with long-term maintainability",
  "Professional codebases, not templates",
  "Clear communication and fast iteration",
  "Engineering depth + business understanding",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 lg:pt-28 lg:pb-10 bg-mesh">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-sm text-[var(--dd-accent)] font-medium mb-3 whitespace-nowrap">Independent engineering practice</p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--dd-text-main)] mb-4">
                About{" "}
                <span className="gradient-text">Deralis Digital</span>
              </h1>
              <p className="text-lg text-[var(--dd-text-muted)] mb-4 leading-relaxed">
                We build real web systems — platforms, dashboards, automation.
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
              Deralis Digital is an independent engineering practice focused on building 
              real web platforms — not simple websites. We design and develop systems: 
              SaaS applications, dashboards, automation workflows, and SQL-powered databases 
              using modern technologies such as Next.js, React, TypeScript, Supabase, and Prisma.
            </p>
            <p>
              Our approach is engineering-first, built around clarity, performance, and 
              long-term reliability. No WordPress. No templates. No drag-and-drop. Only real software.
            </p>
          </div>

          <div className="mt-6">
            <Link href="/contact" className="btn-primary">
              Work with us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-8 lg:py-12 bg-[var(--dd-bg-soft)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--dd-text-main)] mb-4">
            Our philosophy
          </h2>
          <p className="text-lg text-[var(--dd-text-muted)] mb-6">
            Modern businesses don&apos;t need pages — they need systems.
          </p>
          
          <p className="text-[var(--dd-text-muted)] mb-4">Systems that:</p>
          <ul className="space-y-2 mb-6">
            {[
              "Store and structure data reliably",
              "Automate repetitive work",
              "Integrate with existing tools and APIs",
              "Scale without breaking",
              "Deliver real operational value",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-[var(--dd-text-muted)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--dd-accent)] flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <p className="text-[var(--dd-text-main)] font-medium">
            We build platforms that replace spreadsheets, manual processes, and outdated 
            workflows with modern, stable, maintainable architecture.
          </p>
        </div>
      </section>

      {/* What We Build Section */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--dd-text-main)] mb-3">
              What we build
            </h2>
            <p className="text-[var(--dd-text-muted)]">
              We specialize in full-stack platform development.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whatWeBuild.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)] card-hover"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-[var(--dd-accent)]" />
                </div>
                <h3 className="text-base font-semibold text-[var(--dd-text-main)] mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--dd-text-muted)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm text-[var(--dd-text-dim)] mt-6 max-w-4xl">
            Each platform we build is designed around clean engineering, not templates or pre-made components.
          </p>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-8 lg:py-12 bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--dd-text-main)] mb-3">
              How we work
            </h2>
            <p className="text-[var(--dd-text-muted)]">
              Clients work directly with the engineer behind Deralis Digital — without 
              layers, outsourcing, or miscommunication. The process is simple and technical:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {process.map((item) => (
              <div
                key={item.step}
                className="p-5 rounded-xl bg-[var(--dd-bg)] border border-[var(--dd-border)]"
              >
                <span className="text-[var(--dd-accent)] font-mono font-bold text-sm">
                  {item.step}
                </span>
                <h3 className="text-base font-semibold text-[var(--dd-text-main)] mt-2 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--dd-text-muted)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm text-[var(--dd-text-dim)] mt-6 max-w-4xl">
            This workflow ensures stable delivery and reduces time-to-production.
          </p>
        </div>
      </section>

      {/* Technology Expertise Section */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--dd-text-main)] mb-3">
              Technology expertise
            </h2>
            <p className="text-[var(--dd-text-muted)]">
              We use a modern, unified stack to keep development fast, predictable, and scalable.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Frontend */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--dd-text-main)] mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[var(--dd-accent)]" />
                Frontend
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
                Backend
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
                Systems
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
                Automations & AI
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
              Real systems we&apos;ve built
            </h2>
            <p className="text-[var(--dd-text-muted)]">
              Dashboards, workflows, and database systems used in production environments.
            </p>
          </div>
          
          {/* Screenshot Gallery with Modal */}
          <ScreenshotGallery />

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-[var(--dd-text-muted)]">
              These systems include multi-tenant logic, role-based access, SQL databases, and automation workflows.
            </p>
            <p className="text-sm text-[var(--dd-text-muted)]">
              All platforms shown here are built with real databases, real logic, and real engineering — not templates.
            </p>
            <p className="text-sm text-[var(--dd-text-dim)]">
              This demonstrates our focus: systems, not pages.
            </p>
          </div>
        </div>
      </section>

      {/* Principle */}
      <section className="py-6 border-y border-[var(--dd-border)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[var(--dd-text-dim)] text-sm uppercase tracking-wider mb-1">Principle</p>
          <p className="text-xl font-semibold text-[var(--dd-text-main)]">
            Engineering first. Everything else second.
          </p>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-8 lg:py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--dd-text-main)] mb-6">
            Why businesses choose Deralis Digital
          </h2>

          <div className="grid sm:grid-cols-2 gap-3">
            {whyChoose.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--dd-accent)] flex-shrink-0" />
                <span className="text-[var(--dd-text-muted)]">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-[var(--dd-text-main)] font-medium mt-8">
            Deralis Digital is built for founders, teams, and businesses that need 
            real engineering, not web decoration.
          </p>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-8 lg:py-10 bg-[var(--dd-bg-soft)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-5 h-5 text-[var(--dd-accent)]" />
            <h2 className="text-xl font-bold text-[var(--dd-text-main)]">
              Where we operate
            </h2>
          </div>
          <p className="text-[var(--dd-text-muted)]">
            Based in France — Working with clients worldwide.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--dd-text-main)] mb-3">
            Ready to build something real?
          </h2>
          <p className="text-[var(--dd-text-muted)] max-w-xl mx-auto mb-6">
            Free consultation, no pressure. Let&apos;s talk about your project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Start a conversation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/projects" className="btn-secondary">
              See our platforms
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
                Have a question?
              </p>
              <p className="text-sm text-[var(--dd-text-muted)]">
                Reach out at{" "}
                <a
                  href="mailto:contact@deralis.digital"
                  className="text-[var(--dd-accent)] hover:underline"
                >
                  contact@deralis.digital
                </a>
              </p>
            </div>
            <Link href="/contact" className="btn-primary">
              Get in touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}