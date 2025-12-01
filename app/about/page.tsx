import { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowRight, 
  Target, 
  Zap, 
  Shield, 
  Users,
  Code2,
  Rocket,
  Heart
} from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Deralis Digital is a web development agency focused on helping entrepreneurs and small businesses transition into clean, modern digital systems.",
  openGraph: {
    title: "About | Deralis Digital",
    description:
      "Learn about our mission, values, and approach to building modern digital products.",
  },
};

const values = [
  {
    icon: Target,
    title: "Clarity first",
    description:
      "We cut through complexity. Every project starts with clear goals, honest assessments, and realistic timelines.",
  },
  {
    icon: Zap,
    title: "Speed matters",
    description:
      "Fast iteration, quick responses, rapid deployment. We respect your time and move with purpose.",
  },
  {
    icon: Shield,
    title: "Built to last",
    description:
      "Clean code, scalable architecture, proper documentation. We build systems that grow with you.",
  },
  {
    icon: Heart,
    title: "Partnership mindset",
    description:
      "We're not just vendors. We invest in understanding your business and become part of your team.",
  },
];

const stack = [
  { name: "Next.js", category: "Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Supabase", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Vercel", category: "Hosting" },
  { name: "Framer Motion", category: "Animation" },
  { name: "OpenAI / Claude", category: "AI" },
];

const timeline = [
  {
    year: "2024",
    title: "Deralis Digital founded",
    description:
      "Started with a clear mission: help businesses modernize without the enterprise complexity.",
  },
  {
    year: "2024",
    title: "TraviXO Systems launched",
    description:
      "Our flagship SaaS product for equipment tracking and VGP compliance went live.",
  },
  {
    year: "2025",
    title: "Expanding services",
    description:
      "Added AI integration and workflow automation to our core offerings.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-mesh">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--dd-text-main)] mb-6">
                We build digital systems that{" "}
                <span className="gradient-text">actually work</span>
              </h1>
              <p className="text-lg text-[var(--dd-text-muted)] mb-8 leading-relaxed">
                Deralis Digital is a web development agency focused on helping
                entrepreneurs and small businesses transition into clean, modern
                digital systems — without the bloat, without the jargon, without
                the endless meetings.
              </p>
              <Link href="/contact" className="btn-primary">
                Work with us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats Card */}
            <div className="gradient-border p-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-4xl font-bold gradient-text mb-2">50+</p>
                  <p className="text-[var(--dd-text-muted)]">Projects delivered</p>
                </div>
                <div>
                  <p className="text-4xl font-bold gradient-text mb-2">100%</p>
                  <p className="text-[var(--dd-text-muted)]">Client satisfaction</p>
                </div>
                <div>
                  <p className="text-4xl font-bold gradient-text mb-2">24h</p>
                  <p className="text-[var(--dd-text-muted)]">Response time</p>
                </div>
                <div>
                  <p className="text-4xl font-bold gradient-text mb-2">5+</p>
                  <p className="text-[var(--dd-text-muted)]">Years experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-28 bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-6">
              Our mission
            </h2>
            <p className="text-xl text-[var(--dd-text-muted)] leading-relaxed">
              To democratize access to high-quality web development. Every business
              deserves modern, fast, reliable digital tools — not just those with
              enterprise budgets. We bring agency-level expertise at founder-friendly
              prices.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-4">
              What we stand for
            </h2>
            <p className="text-[var(--dd-text-muted)] max-w-2xl mx-auto">
              Our values guide every decision, every line of code, every client
              interaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)] card-hover"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-[var(--dd-accent)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--dd-text-main)] mb-2">
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

      {/* Approach Section */}
      <section className="py-20 lg:py-28 bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-6">
                How we work
              </h2>
              <p className="text-[var(--dd-text-muted)] mb-6 leading-relaxed">
                We don&apos;t believe in black-box development. You&apos;ll always know
                what&apos;s happening, why decisions are made, and what comes next.
              </p>
              <div className="space-y-4">
                {[
                  "Direct communication — no account managers in between",
                  "Weekly progress updates with demos",
                  "Full access to code repository from day one",
                  "Clear documentation for everything we build",
                  "Post-launch support included in every project",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Rocket className="w-5 h-5 text-[var(--dd-accent)] mt-0.5 flex-shrink-0" />
                    <span className="text-[var(--dd-text-muted)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className="relative pl-8 border-l-2 border-[var(--dd-border)]"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-br from-[var(--dd-grad-from)] to-[var(--dd-grad-to)]" />
                  <span className="text-sm text-[var(--dd-accent)] font-medium">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-semibold text-[var(--dd-text-main)] mt-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[var(--dd-text-muted)] text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-4">
              Our tech stack
            </h2>
            <p className="text-[var(--dd-text-muted)] max-w-2xl mx-auto">
              We use modern, battle-tested technologies that scale with your business.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {stack.map((tech) => (
              <div
                key={tech.name}
                className="px-6 py-4 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)] hover:border-[var(--dd-accent)] transition-colors"
              >
                <p className="font-semibold text-[var(--dd-text-main)]">
                  {tech.name}
                </p>
                <p className="text-xs text-[var(--dd-text-dim)]">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Users className="w-6 h-6 text-[var(--dd-accent)]" />
            <span className="text-[var(--dd-text-muted)]">
              Let&apos;s build something great together
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-4">
            Ready to modernize your business?
          </h2>
          <p className="text-[var(--dd-text-muted)] max-w-2xl mx-auto mb-8">
            Whether you have a clear project in mind or just want to explore
            possibilities, we&apos;re here to help. Book a free discovery call
            and let&apos;s talk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Book a discovery call
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/projects" className="btn-secondary">
              See our work
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 border-t border-[var(--dd-border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[var(--dd-text-main)] font-semibold mb-1">
                Have a question?
              </p>
              <p className="text-[var(--dd-text-muted)]">
                Reach out directly at{" "}
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