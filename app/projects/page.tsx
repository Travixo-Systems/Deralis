import { Metadata } from "next";
import Link from "next/link";
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

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Real platforms built by Deralis Digital — SaaS applications, dashboards, and web systems powered by Next.js, Supabase, and PostgreSQL.",
  openGraph: {
    title: "Projects | Deralis Digital",
    description:
      "Explore our portfolio of web applications, SaaS platforms, and digital products.",
  },
};

const projects = [
  {
    id: "travixo-systems",
    icon: Building2,
    title: "TraviXO Systems",
    type: "B2B SaaS Web Application",
    year: "2024–2025",
    status: "Live",
    description:
      "QR-based asset tracking and VGP compliance automation for equipment-rental companies. Full multi-tenant SaaS platform with dashboard, asset registry, inspection scheduler, and compliance logging.",
    stack: [
      "Next.js 15",
      "Supabase",
      "Prisma",
      "PostgreSQL",
      "TypeScript",
    ],
    features: [
      "Multi-tenant architecture",
      "QR code asset tracking",
      "Inspection scheduling",
      "Compliance log & reporting",
      "Role-based access control",
    ],
    liveUrl: "https://travixosystems.com",
    appUrl: "https://app.travixosystems.com",
    screenshot: "/projects/travixo-dashboard.png",
    featured: true,
  },
  {
    id: "travixo-web",
    icon: Globe,
    title: "TraviXO Web",
    type: "Marketing Website",
    year: "2024–2025",
    status: "Live",
    description:
      "Public marketing site for TraviXO Systems. SEO-optimized, multilingual landing pages showcasing features, pricing, and product benefits.",
    stack: [
      "Next.js 15",
      "Tailwind CSS",
      "next-intl",
      "Framer Motion",
    ],
    features: [
      "SEO optimization",
      "Multilingual (FR/EN)",
      "Responsive design",
      "Conversion-focused CTAs",
    ],
    liveUrl: "https://travixosystems.com",
    featured: false,
  },
  {
    id: "deralis-digital",
    icon: Briefcase,
    title: "Deralis Digital",
    type: "Agency Website",
    year: "2024–2025",
    status: "In Development",
    description:
      "Corporate website for Deralis Digital agency. Lead generation optimized with service showcase, project portfolio, and contact system.",
    stack: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    features: [
      "Lead generation optimized",
      "Service showcase",
      "Project portfolio",
      "Contact form",
    ],
    liveUrl: null,
    featured: false,
  },
  {
    id: "ecoridepool",
    icon: Car,
    title: "EcoRidePool",
    type: "Carpooling Web Application",
    year: "2024",
    status: "MVP Complete",
    description:
      "Carpooling platform connecting drivers and passengers. Full trip management system with route planning, bookings, and messaging.",
    stack: [
      "PHP (Slim)",
      "MySQL",
      "MongoDB",
      "Bootstrap",
    ],
    features: [
      "User authentication",
      "Trip creation & search",
      "Booking management",
      "In-app messaging",
    ],
    liveUrl: null,
    featured: false,
  },
  {
    id: "arcadia-zoo",
    icon: PawPrint,
    title: "Arcadia Zoo",
    type: "Educational CRUD Application",
    year: "2024",
    status: "Completed",
    description:
      "Zoo management system for tracking animals, species, habitats, and staff. Full CRUD operations and database design.",
    stack: [
      "PHP (OOP)",
      "MySQL",
      "HTML/CSS",
    ],
    features: [
      "Full CRUD operations",
      "Database schema design",
      "User authentication",
      "Admin dashboard",
    ],
    liveUrl: null,
    featured: false,
  },
];

const stats = [
  { value: "5+", label: "Platforms delivered" },
  { value: "2024", label: "Founded" },
  { value: "100%", label: "Completion rate" },
];

export default function ProjectsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 lg:pt-28 lg:pb-10 bg-mesh">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--dd-text-main)] mb-4">
              Our{" "}
              <span className="gradient-text">work</span>
            </h1>
            <p className="text-lg text-[var(--dd-text-muted)] leading-relaxed">
              Real platforms we&apos;ve built. SaaS applications, dashboards, 
              and web systems — modern, scalable, and production-ready.
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
      {projects
        .filter((p) => p.featured)
        .map((project) => (
          <section key={project.id} className="py-8 lg:py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[var(--dd-grad-from)] to-[var(--dd-grad-to)] text-[var(--dd-bg)] text-xs font-semibold">
                  Featured Project
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
                      <project.icon className="w-6 h-6 text-[var(--dd-accent)]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[var(--dd-text-main)]">
                        {project.title}
                      </h2>
                      <p className="text-sm text-[var(--dd-text-muted)]">{project.type}</p>
                    </div>
                  </div>

                  <p className="text-[var(--dd-text-muted)] mb-5 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="mb-5">
                    <h3 className="text-sm font-semibold text-[var(--dd-text-main)] mb-2">
                      Key Features
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {project.features.map((feature) => (
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
                    {project.stack.map((tech) => (
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
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        Visit website
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.appUrl && (
                      <a
                        href={project.appUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                      >
                        Open app
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

      {/* Fleet Screenshot Section */}
      <section className="py-8 lg:py-10 bg-[var(--dd-bg-soft)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-center text-sm text-[var(--dd-text-dim)] mb-4">
            Equipment fleet management with real-time status tracking
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
            More Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {projects
              .filter((p) => !p.featured)
              .map((project) => (
                <div
                  key={project.id}
                  className="p-5 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)] card-hover"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center flex-shrink-0">
                      <project.icon className="w-5 h-5 text-[var(--dd-accent)]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--dd-text-main)]">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[var(--dd-text-muted)]">
                        {project.type}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--dd-text-muted)] mb-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.stack.slice(0, 4).map((tech) => (
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
                        className={`w-2 h-2 rounded-full ${
                          project.status === "Live"
                            ? "bg-green-500"
                            : project.status === "In Development"
                            ? "bg-cyan-500"
                            : project.status === "MVP Complete"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                        }`}
                      />
                      <span className="text-xs text-[var(--dd-text-muted)]">
                        {project.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[var(--dd-text-dim)]">
                        {project.year}
                      </span>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
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
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 lg:py-12 bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--dd-text-main)] mb-3">
            Have a project in mind?
          </h2>
          <p className="text-[var(--dd-text-muted)] max-w-xl mx-auto mb-6">
            Whether it&apos;s a SaaS platform, a dashboard, or a web application 
            — we&apos;re ready to bring your vision to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Build your system
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/services" className="btn-secondary">
              View services
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
                Want to see more details?
              </p>
              <p className="text-sm text-[var(--dd-text-muted)]">
                We&apos;re happy to walk you through any project.
              </p>
            </div>
            <Link href="/contact" className="btn-primary">
              Speak to an engineer
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}