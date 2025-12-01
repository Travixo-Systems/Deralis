import { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowRight, 
  Lightbulb,
  Code2, 
  Bot, 
  Settings,
  CheckCircle2,
  Users,
  Clock,
  Target,
  X,
  Server
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services — Full-Stack Web Development",
  description:
    "Full-stack web development with Next.js, SQL databases, Supabase, and automation workflows. Real platforms, not templates. Systems, not pages.",
  keywords: [
    "full-stack web development",
    "next.js agency",
    "database-backed applications",
    "custom SaaS development",
    "react typescript engineering",
    "supabase developer",
    "development",
  ],
  openGraph: {
    title: "Services | Deralis Digital — Full-Stack Development",
    description:
      "Real web systems built with modern and proven technologies. Full-stack development with databases, APIs, and scalable architecture.",
  },
};

const services = [
  {
    id: "consulting",
    icon: Lightbulb,
    title: "Strategic Consulting & Business Validation",
    subtitle: "Clarity before code.",
    description:
      "Before building anything, we validate your idea, analyze the market, and create a roadmap that makes sense. No wasted budget on features nobody needs.",
    features: [
      "Business idea validation",
      "Market & competition analysis",
      "Technical feasibility assessment",
      "Project roadmap & timeline",
      "Budget estimation & phasing",
    ],
    whoFor: "Founders with an idea who need clarity before investing in development.",
    cta: "Get a strategy session",
    ctaSubject: "consulting",
    timeline: "1-2 weeks",
    investment: "From €500",
  },
  {
    id: "development",
    icon: Code2,
    title: "Full-Stack Web Development",
    subtitle: "Systems, not pages.",
    description:
      "We build real digital platforms with frontend, backend, and database layers. Next.js applications powered by SQL, authentication, and automation workflows.",
    features: [
      "Next.js, React, TypeScript",
      "SQL databases (PostgreSQL, MySQL) & NoSQL (MongoDB)",
      "API integrations (REST, Webhooks, OAuth)",
      "Authentication & permission systems",
      "Dashboards, portals, internal tools",
      "Scalable architecture (Prisma, Supabase)",
    ],
    whoFor: "Businesses that need real software, not a brochure website.",
    note: "If it's only HTML/CSS, it's not our work.",
    cta: "Build your platform",
    ctaSubject: "development",
    timeline: "4-12 weeks",
    investment: "From €3,000",
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI Tools & Custom GPT Integration",
    subtitle: "AI connected to your data.",
    description:
      "We build AI copilots that actually understand your business—connected to your database, trained on your data, integrated into your workflows.",
    features: [
      "Custom GPT assistants",
      "AI copilots connected to your database",
      "Internal assistants trained on your data",
      "Automation between tools (Make, Zapier, custom)",
      "Report generation & content automation",
      "Intelligent task routing",
    ],
    whoFor: "Teams ready to leverage AI for real productivity gains, not gimmicks.",
    cta: "Explore AI solutions",
    ctaSubject: "ai",
    timeline: "2-6 weeks",
    investment: "From €1,500",
  },
  {
    id: "automation",
    icon: Settings,
    title: "Support & Workflow Automation",
    subtitle: "We don't disappear after launch.",
    description:
      "Continuous updates, monitoring, and improvements. Your technical partner for the long run, not a one-time vendor.",
    features: [
      "Workflow automation (Zapier, Make, n8n)",
      "Third-party integrations",
      "Database setup & migration",
      "Ongoing maintenance & support",
      "Performance monitoring & optimization",
      "On-call technical support",
    ],
    whoFor: "Businesses that want a reliable tech partner, not a disappearing freelancer.",
    cta: "Get ongoing support",
    ctaSubject: "automation",
    timeline: "Ongoing",
    investment: "From €500/month",
  },
];

const stats = [
  { icon: Users, value: "5+", label: "Platforms shipped", sublabel: "Next.js / SQL / Supabase" },
  { icon: Clock, value: "24h", label: "Response time", sublabel: "Real engineering support" },
  { icon: Target, value: "100%", label: "Delivery rate", sublabel: "Shipped & deployed" },
];

const techStack = [
  "Next.js 15",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Supabase",
  "Prisma",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Vercel",
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 lg:pt-28 lg:pb-10 bg-mesh">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--dd-bg-card)] border border-[var(--dd-border)] mb-4">
              <Server className="w-4 h-4 text-[var(--dd-accent)]" />
              <span className="text-sm text-[var(--dd-text-muted)]">
                Full-stack engineering, not templates.
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--dd-text-main)] mb-4">
              Services that{" "}
              <span className="gradient-text">drive results</span>
            </h1>
            <p className="text-lg text-[var(--dd-text-muted)] mb-6 leading-relaxed">
              From validation to deployment and beyond. Next.js applications 
              with SQL databases, authentication, automation workflows, and 
              scalable architecture. We build systems that power your business.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Speak to an engineer
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/projects" className="btn-secondary">
                See our platforms
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-6 border-y border-[var(--dd-border)] bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="w-4 h-4 text-[var(--dd-accent)]" />
                  <span className="text-2xl font-bold text-[var(--dd-text-main)]">
                    {stat.value}
                  </span>
                </div>
                <p className="text-sm text-[var(--dd-text-muted)]">{stat.label}</p>
                <p className="text-xs text-[var(--dd-text-dim)]">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Bar */}
      <section className="py-6 bg-[var(--dd-bg)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-sm text-[var(--dd-text-dim)] mb-4">
            Technologies we work with
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech) => (
              <div
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] hover:border-[var(--dd-accent)] transition-colors"
              >
                <span className="text-[var(--dd-text-muted)] text-sm">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-12 lg:space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-start ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-[var(--dd-accent)]" />
                  </div>
                  
                  <p className="text-sm text-[var(--dd-accent)] font-medium mb-1">
                    {service.subtitle}
                  </p>
                  <h2 className="text-2xl font-bold text-[var(--dd-text-main)] mb-3">
                    {service.title}
                  </h2>
                  <p className="text-[var(--dd-text-muted)] mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--dd-accent)] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-[var(--dd-text-muted)]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {service.note && (
                    <p className="text-sm text-[var(--dd-text-dim)] italic mb-4 pl-3 border-l-2 border-[var(--dd-accent)]">
                      &quot;{service.note}&quot;
                    </p>
                  )}

                  <Link
                    href={`/contact?service=${service.ctaSubject}`}
                    className="btn-primary inline-flex"
                  >
                    {service.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Card */}
                <div
                  className={`gradient-border p-6 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <h3 className="text-base font-semibold text-[var(--dd-text-main)] mb-2">
                    Who is this for?
                  </h3>
                  <p className="text-sm text-[var(--dd-text-muted)] mb-4">
                    {service.whoFor}
                  </p>
                  <div className="pt-4 border-t border-[var(--dd-border)]">
                    <p className="text-xs text-[var(--dd-text-dim)] mb-1">
                      Typical timeline
                    </p>
                    <p className="text-[var(--dd-text-main)] font-medium text-sm">
                      {service.timeline}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[var(--dd-border)] mt-4">
                    <p className="text-xs text-[var(--dd-text-dim)] mb-1">
                      Investment
                    </p>
                    <p className="text-[var(--dd-text-main)] font-medium text-sm">
                      {service.investment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-8 lg:py-10 bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[var(--dd-text-main)] mb-2">
              What makes us different
            </h2>
            <p className="text-sm text-[var(--dd-text-muted)]">
              We focus on real engineering and long-term partnerships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Typical Agency */}
            <div className="p-5 rounded-xl bg-[var(--dd-bg)] border border-[var(--dd-border)]">
              <div className="flex items-center gap-2 mb-3">
                <X className="w-4 h-4 text-red-400" />
                <h3 className="font-semibold text-[var(--dd-text-main)] text-sm">
                  Typical approach
                </h3>
              </div>
              <ul className="space-y-2 text-[var(--dd-text-muted)] text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  Templates and page builders
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  No real database
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  Static pages with contact forms
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  Disappears after delivery
                </li>
              </ul>
            </div>

            {/* Deralis Digital */}
            <div className="p-5 rounded-xl bg-[var(--dd-bg)] border border-[var(--dd-accent)] shadow-lg shadow-[var(--dd-accent)]/10">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-[var(--dd-accent)]" />
                <h3 className="font-semibold text-[var(--dd-text-main)] text-sm">
                  Deralis Digital
                </h3>
              </div>
              <ul className="space-y-2 text-[var(--dd-text-muted)] text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--dd-accent)]" />
                  Custom code (Next.js, React, TypeScript)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--dd-accent)]" />
                  Real databases (PostgreSQL, MySQL, MongoDB)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--dd-accent)]" />
                  Full backend + API integrations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--dd-accent)]" />
                  Long-term technical partnership
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--dd-text-main)] mb-2">
            Not sure which service you need?
          </h2>
          <p className="text-[var(--dd-text-muted)] max-w-xl mx-auto mb-6">
            Book a free 30-minute consultation. We&apos;ll discuss your project
            and recommend the best approach.
          </p>
          <Link href="/contact" className="btn-primary">
            Speak to an engineer
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 lg:py-10 bg-[var(--dd-bg-soft)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--dd-text-main)] mb-6 text-center">
            Common questions
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "How much does a typical project cost?",
                a: "It depends on scope. Consulting starts at €500, while a full SaaS platform can range from €5,000 to €25,000+. We provide detailed quotes after understanding your needs.",
              },
              {
                q: "What technologies do you work with?",
                a: "Our primary stack is Next.js, React, and TypeScript. We also work with PHP, Node.js, and databases including PostgreSQL, MySQL, and MongoDB.",
              },
              {
                q: "Do you work with clients outside of France?",
                a: "Yes. We work remotely across Europe and beyond. Communication via video calls, email, and your preferred tools.",
              },
              {
                q: "Can you take over an existing project?",
                a: "Absolutely. We audit the current state, identify issues, and propose a plan to move forward.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="p-4 rounded-xl bg-[var(--dd-bg)] border border-[var(--dd-border)]"
              >
                <h3 className="font-semibold text-[var(--dd-text-main)] mb-1 text-sm">
                  {faq.q}
                </h3>
                <p className="text-sm text-[var(--dd-text-muted)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-8 border-t border-[var(--dd-border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[var(--dd-text-muted)] mb-3">
            Ready to build something real?
          </p>
          <Link href="/contact" className="btn-primary">
            Build your system
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}