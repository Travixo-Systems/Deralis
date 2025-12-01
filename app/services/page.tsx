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
  Target
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, digital transformation, AI integration, and workflow automation services. From strategy to deployment, we build modern digital systems that scale.",
  openGraph: {
    title: "Services | Deralis Digital",
    description:
      "Web development, digital transformation, AI integration, and workflow automation services.",
  },
};

const services = [
  {
    id: "consulting",
    icon: Lightbulb,
    title: "Strategic Consulting & Business Validation",
    description:
      "Before building anything, we validate your idea, analyze the market, and create a roadmap that makes sense.",
    features: [
      "Business idea validation",
      "Market & competition analysis",
      "Technical feasibility assessment",
      "Project roadmap & timeline",
      "Budget estimation",
    ],
    whoFor: "Founders with an idea who need clarity before investing in development.",
    cta: "Get a strategy session",
    ctaSubject: "consulting",
  },
  {
    id: "development",
    icon: Code2,
    title: "Web & Application Development",
    description:
      "High-performance websites and custom web applications built with modern technologies. Clean code, scalable architecture.",
    features: [
      "Corporate & marketing websites",
      "SaaS applications",
      "Admin dashboards & portals",
      "E-commerce solutions",
      "API development & integration",
    ],
    whoFor: "Businesses that need reliable, fast, and maintainable digital products.",
    cta: "Start your project",
    ctaSubject: "development",
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI Tools & Custom GPT Integration",
    description:
      "Integrate AI into your workflows. Custom GPT assistants, chatbots, and intelligent automation tailored to your business.",
    features: [
      "Custom GPT assistants",
      "AI-powered chatbots",
      "Document processing automation",
      "Smart search & recommendations",
      "LLM integration in existing apps",
    ],
    whoFor: "Companies looking to leverage AI for efficiency and competitive advantage.",
    cta: "Explore AI solutions",
    ctaSubject: "ai",
  },
  {
    id: "automation",
    icon: Settings,
    title: "Support & Workflow Automation",
    description:
      "Streamline operations with automated workflows, integrations, and ongoing technical support.",
    features: [
      "Workflow automation (Zapier, Make, n8n)",
      "Third-party integrations",
      "Database setup & migration",
      "Ongoing maintenance & support",
      "Performance monitoring",
    ],
    whoFor: "Teams drowning in repetitive tasks who want systems that work for them.",
    cta: "Automate your workflow",
    ctaSubject: "automation",
  },
];

const stats = [
  { icon: Users, value: "50+", label: "Projects delivered" },
  { icon: Clock, value: "24h", label: "Response time" },
  { icon: Target, value: "100%", label: "Client satisfaction" },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-mesh">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--dd-text-main)] mb-6">
              Services that{" "}
              <span className="gradient-text">drive results</span>
            </h1>
            <p className="text-lg text-[var(--dd-text-muted)] mb-8 leading-relaxed">
              From validation to deployment and beyond. We cover the full cycle
              of digital product development with a focus on clarity, speed,
              and long-term scalability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Book a discovery call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/projects" className="btn-secondary">
                View our work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 border-y border-[var(--dd-border)] bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="w-5 h-5 text-[var(--dd-accent)]" />
                  <span className="text-2xl font-bold text-[var(--dd-text-main)]">
                    {stat.value}
                  </span>
                </div>
                <p className="text-sm text-[var(--dd-text-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-16 lg:space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-[var(--dd-accent)]" />
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--dd-text-main)] mb-4">
                    {service.title}
                  </h2>
                  <p className="text-[var(--dd-text-muted)] mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[var(--dd-accent)] mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--dd-text-muted)]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

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
                  className={`gradient-border p-8 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <h3 className="text-lg font-semibold text-[var(--dd-text-main)] mb-3">
                    Who is this for?
                  </h3>
                  <p className="text-[var(--dd-text-muted)] mb-6">
                    {service.whoFor}
                  </p>
                  <div className="pt-6 border-t border-[var(--dd-border)]">
                    <p className="text-sm text-[var(--dd-text-dim)] mb-2">
                      Typical timeline
                    </p>
                    <p className="text-[var(--dd-text-main)] font-medium">
                      {service.id === "consulting" && "1-2 weeks"}
                      {service.id === "development" && "4-12 weeks"}
                      {service.id === "ai" && "2-6 weeks"}
                      {service.id === "automation" && "1-4 weeks"}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-[var(--dd-border)] mt-6">
                    <p className="text-sm text-[var(--dd-text-dim)] mb-2">
                      Investment
                    </p>
                    <p className="text-[var(--dd-text-main)] font-medium">
                      {service.id === "consulting" && "From €500"}
                      {service.id === "development" && "From €3,000"}
                      {service.id === "ai" && "From €1,500"}
                      {service.id === "automation" && "From €800"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-4">
            Not sure which service you need?
          </h2>
          <p className="text-[var(--dd-text-muted)] max-w-2xl mx-auto mb-8">
            Book a free 30-minute discovery call. We&apos;ll discuss your project,
            challenges, and goals — then recommend the best path forward.
          </p>
          <Link href="/contact" className="btn-primary">
            Book a free call
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[var(--dd-text-main)] mb-12 text-center">
            Common questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "How much does a typical project cost?",
                a: "It depends on scope and complexity. A simple website starts around €1,500, while a full SaaS application can range from €5,000 to €20,000+. We provide detailed quotes after understanding your needs.",
              },
              {
                q: "Do you work with clients outside of France?",
                a: "Yes. We work remotely with clients across Europe and beyond. Communication happens via video calls, email, and your preferred project management tools.",
              },
              {
                q: "Can you take over an existing project?",
                a: "Absolutely. We regularly inherit codebases from other developers. We'll audit the current state, identify issues, and propose a plan to move forward.",
              },
              {
                q: "What technologies do you specialize in?",
                a: "Our core stack is Next.js, TypeScript, Tailwind CSS, and Supabase. We also work with React, Node.js, PostgreSQL, and various AI/LLM APIs.",
              },
              {
                q: "Do you offer ongoing support after launch?",
                a: "Yes. We offer maintenance packages that include bug fixes, updates, monitoring, and small feature additions. Most clients choose ongoing support.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="p-6 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)]"
              >
                <h3 className="text-lg font-semibold text-[var(--dd-text-main)] mb-2">
                  {faq.q}
                </h3>
                <p className="text-[var(--dd-text-muted)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 border-t border-[var(--dd-border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[var(--dd-text-muted)] mb-4">
            Ready to start your project?
          </p>
          <Link href="/contact" className="btn-primary">
            Get in touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}