import Link from "next/link";
import { ArrowRight, Lightbulb, Code2, Bot, Settings } from "lucide-react";

const services = [
  {
    icon: Lightbulb,
    title: "Strategic Consulting & Business Validation",
    description:
      "Idea validation, market analysis, competition research, and clear roadmaps before you invest in development.",
    features: ["Idea validation", "Market / competition", "Roadmaps"],
    href: "/services#consulting",
  },
  {
    icon: Code2,
    title: "Full-Stack Web Development",
    description:
      "Next.js applications with SQL databases, authentication, dashboards, and scalable architecture. Systems, not pages.",
    features: ["Next.js / React", "SQL databases", "APIs & auth"],
    href: "/services#development",
  },
  {
    icon: Bot,
    title: "AI Tools & Custom GPT Integration",
    description:
      "AI copilots connected to your database, trained on your data, integrated into your workflows.",
    features: ["Custom GPTs", "Database-connected AI", "Automation"],
    href: "/services#ai",
  },
  {
    icon: Settings,
    title: "Support & Workflow Automation",
    description:
      "Ongoing maintenance, workflow automation, and technical support. We don't disappear after launch.",
    features: ["Workflow automation", "Integrations", "Ongoing support"],
    href: "/services#automation",
  },
];

export default function Services() {
  return (
    <section className="py-12 lg:py-16 bg-[var(--dd-bg-soft)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-3">
            What we <span className="gradient-text">build</span>
          </h2>
          <p className="text-[var(--dd-text-muted)] max-w-2xl mx-auto">
            From validation to deployment. Full-stack engineering with real
            databases, APIs, and long-term support.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-5 rounded-xl bg-[var(--dd-bg)] border border-[var(--dd-border)] card-hover flex flex-col"
            >
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center mb-4">
                <service.icon className="w-5 h-5 text-[var(--dd-accent)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--dd-text-main)] mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-[var(--dd-text-muted)] mb-4 flex-grow">
                {service.description}
              </p>
              <ul className="space-y-1 mb-4">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-xs text-[var(--dd-text-dim)] flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--dd-accent)]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={service.href}
                className="text-[var(--dd-accent)] text-sm font-medium hover:underline inline-flex items-center gap-1"
              >
                Learn more
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/services" className="btn-secondary">
            View all services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}