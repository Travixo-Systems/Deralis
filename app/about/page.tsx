import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Heart,
  Database,
  Code2,
  Terminal,
  CheckCircle2,
  Lightbulb,
  Server
} from "lucide-react";

export const metadata: Metadata = {
  title: "About — Full-Stack Development Agency",
  description:
    "Deralis Digital builds real web platforms with Next.js, SQL databases, Supabase, and automation workflows. Full-stack engineering, not templates.",
  openGraph: {
    title: "About | Deralis Digital",
    description:
      "Full-stack engineering, not templates. We build systems, not landing pages.",
  },
};

const values = [
  {
    icon: Lightbulb,
    title: "Clarity before code",
    description:
      "We validate your idea and challenge assumptions before writing a single line. No wasted budget on features nobody needs.",
  },
  {
    icon: Database,
    title: "Systems over pages",
    description:
      "A website without a backend is not a tool. We build real systems with databases, authentication, and business logic.",
  },
  {
    icon: Zap,
    title: "Speed matters",
    description:
      "Fast iteration, quick responses, rapid deployment. We respect your time and move with purpose.",
  },
  {
    icon: Shield,
    title: "Built to scale",
    description:
      "Clean code, proper architecture, real databases. We build systems that grow with your business.",
  },
];

const stack = [
  { name: "Next.js 15", category: "Framework" },
  { name: "React", category: "UI Library" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Supabase", category: "Backend" },
  { name: "PostgreSQL", category: "SQL Database" },
  { name: "MySQL", category: "SQL Database" },
  { name: "MongoDB", category: "NoSQL Database" },
  { name: "Prisma", category: "ORM" },
  { name: "Node.js", category: "Runtime" },
  { name: "Vercel", category: "Hosting" },
];

const standards = [
  "Custom code only — real engineering, not templates",
  "Real databases — PostgreSQL, MySQL, MongoDB",
  "Full-stack delivery — frontend, backend, and APIs",
  "Direct communication — no middlemen, no account managers",
  "Long-term support — we don't disappear after launch",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 lg:pt-28 lg:pb-10 bg-mesh">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--dd-bg-card)] border border-[var(--dd-border)] mb-4">
                <Server className="w-4 h-4 text-[var(--dd-accent)]" />
                <span className="text-sm text-[var(--dd-text-muted)]">
                  Full-stack engineering, not templates.
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--dd-text-main)] mb-4">
                We build{" "}
                <span className="gradient-text">systems</span>,
                <br />not landing pages
              </h1>
              <p className="text-lg text-[var(--dd-text-muted)] mb-6 leading-relaxed">
                Deralis Digital builds real web platforms—Next.js applications 
                powered by SQL databases, Supabase, secure authentication, and 
                automation workflows. We deliver software, not pages.
              </p>
              <Link href="/contact" className="btn-primary">
                Build your system
                <ArrowRight className="w-4 h-4" />
              </Link>
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
                    Europe & remote
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Screenshots Section */}
      <section className="py-8 lg:py-10 border-y border-[var(--dd-border)] bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-sm text-[var(--dd-text-dim)] mb-6">
            Real systems we've built — dashboards, databases, automation
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            {/* Screenshot 1 - Dashboard */}
            <div className="rounded-xl overflow-hidden border border-[var(--dd-border)] bg-[var(--dd-bg-card)]">
              <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--dd-border)] bg-[var(--dd-bg)]">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <div className="w-2 h-2 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs text-[var(--dd-text-dim)] font-mono">Dashboard</span>
              </div>
              <div className="aspect-video bg-gradient-to-br from-[var(--dd-bg)] to-[var(--dd-bg-soft)] flex items-center justify-center">
                {/* Replace with real screenshot */}
                <div className="text-center p-4">
                  <Database className="w-8 h-8 text-[var(--dd-accent)] mx-auto mb-2 opacity-40" />
                  <p className="text-xs text-[var(--dd-text-dim)]">TraviXO Dashboard</p>
                </div>
              </div>
            </div>

            {/* Screenshot 2 - Asset Table */}
            <div className="rounded-xl overflow-hidden border border-[var(--dd-border)] bg-[var(--dd-bg-card)]">
              <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--dd-border)] bg-[var(--dd-bg)]">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <div className="w-2 h-2 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs text-[var(--dd-text-dim)] font-mono">Data Tables</span>
              </div>
              <div className="aspect-video bg-gradient-to-br from-[var(--dd-bg)] to-[var(--dd-bg-soft)] flex items-center justify-center">
                {/* Replace with real screenshot */}
                <div className="text-center p-4">
                  <Code2 className="w-8 h-8 text-[var(--dd-accent)] mx-auto mb-2 opacity-40" />
                  <p className="text-xs text-[var(--dd-text-dim)]">Asset Management</p>
                </div>
              </div>
            </div>

            {/* Screenshot 3 - Auth/Workflow */}
            <div className="rounded-xl overflow-hidden border border-[var(--dd-border)] bg-[var(--dd-bg-card)]">
              <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--dd-border)] bg-[var(--dd-bg)]">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <div className="w-2 h-2 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs text-[var(--dd-text-dim)] font-mono">Workflows</span>
              </div>
              <div className="aspect-video bg-gradient-to-br from-[var(--dd-bg)] to-[var(--dd-bg-soft)] flex items-center justify-center">
                {/* Replace with real screenshot */}
                <div className="text-center p-4">
                  <Zap className="w-8 h-8 text-[var(--dd-accent)] mx-auto mb-2 opacity-40" />
                  <p className="text-xs text-[var(--dd-text-dim)]">QR & Compliance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story Section - Credibility focused */}
      <section className="py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-[var(--dd-accent)]" />
              </div>
              <h2 className="text-xl font-bold text-[var(--dd-text-main)]">
                Why we build differently
              </h2>
            </div>
            
            <div className="space-y-3 text-[var(--dd-text-muted)] leading-relaxed">
              <p>
                Deralis Digital was founded by a developer who started coding with 
                C++, Arduino, and Python—years before it became a career. The goal 
                was always to build real systems, not decorate templates.
              </p>
              <p>
                Five years in enterprise IT followed—Dassault Systèmes, Clear Channel, 
                Scaleway. Managing servers, debugging infrastructure, understanding how 
                real businesses run on real systems. That experience shapes everything 
                we build today.
              </p>
              <p className="text-[var(--dd-text-main)] font-medium">
                We&apos;ve seen enough spreadsheet chaos and broken tools. That&apos;s why 
                every project starts with validation—making sure we build the right 
                thing, the right way, from day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Standards + Process Grid */}
      <section className="py-8 lg:py-10 bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Standards */}
            <div>
              <h2 className="text-2xl font-bold text-[var(--dd-text-main)] mb-4">
                Our standards
              </h2>
              <p className="text-[var(--dd-text-muted)] mb-6 leading-relaxed">
                Every project follows the same principles. No exceptions, no shortcuts.
              </p>
              <div className="space-y-3">
                {standards.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--dd-accent)] mt-0.5 flex-shrink-0" />
                    <span className="text-[var(--dd-text-muted)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Card */}
            <div className="gradient-border p-6">
              <h3 className="text-lg font-semibold text-[var(--dd-text-main)] mb-4">
                How we work
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: "01",
                    title: "Discovery & validation",
                    desc: "Understand your problem, validate the approach.",
                  },
                  {
                    step: "02",
                    title: "Scope & quote",
                    desc: "Clear deliverables, timeline, pricing. No surprises.",
                  },
                  {
                    step: "03",
                    title: "Build & iterate",
                    desc: "Weekly demos, direct communication, rapid progress.",
                  },
                  {
                    step: "04",
                    title: "Launch & support",
                    desc: "Deployment, documentation, ongoing partnership.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <span className="text-[var(--dd-accent)] font-mono font-bold text-sm">
                      {item.step}
                    </span>
                    <div>
                      <p className="font-medium text-[var(--dd-text-main)] text-sm">
                        {item.title}
                      </p>
                      <p className="text-xs text-[var(--dd-text-muted)]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--dd-text-main)] mb-6 text-center">
            What drives us
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-5 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)] card-hover"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center mb-3">
                  <value.icon className="w-5 h-5 text-[var(--dd-accent)]" />
                </div>
                <h3 className="text-base font-semibold text-[var(--dd-text-main)] mb-1">
                  {value.title}
                </h3>
                <p className="text-[var(--dd-text-muted)] text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-8 lg:py-10 bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--dd-text-main)] mb-2 text-center">
            Technologies we work with
          </h2>
          <p className="text-sm text-[var(--dd-text-dim)] text-center mb-6">
            From modern frameworks to battle-tested databases
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {stack.map((tech) => (
              <div
                key={tech.name}
                className="px-4 py-3 rounded-lg bg-[var(--dd-bg)] border border-[var(--dd-border)] hover:border-[var(--dd-accent)] transition-colors"
              >
                <p className="font-medium text-[var(--dd-text-main)] text-sm">
                  {tech.name}
                </p>
                <p className="text-xs text-[var(--dd-text-dim)]">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--dd-text-main)] mb-3">
            Ready to build something real?
          </h2>
          <p className="text-[var(--dd-text-muted)] max-w-xl mx-auto mb-6">
            Free consultation, no pressure. Let&apos;s talk about your project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Speak to an engineer
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