import { Metadata } from "next";
import Link from "next/link";
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
    "A selection of real projects built by Deralis Digital — from SaaS platforms to web applications, using modern technologies like Next.js, Supabase, and more.",
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
      "UploadThing",
      "Tailwind CSS",
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
      "Public marketing site for TraviXO Systems. SEO-optimized, multilingual landing pages showcasing features, pricing, and product benefits. Drives conversions to the SaaS platform.",
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
      "Legal pages (Privacy, Terms)",
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
      "Corporate website for Deralis Digital agency. Futuristic blue gradient branding, showcasing services, projects, and case studies. Built to generate leads and establish brand presence.",
    stack: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Resend",
    ],
    features: [
      "Lead generation optimized",
      "Service showcase",
      "Project portfolio",
      "Contact form with Resend",
      "SEO & performance focused",
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
      "Carpooling platform connecting drivers and passengers. Full trip management system with route planning, bookings, payments, and real-time messaging.",
    stack: [
      "PHP (Slim)",
      "MySQL",
      "MongoDB",
      "Bootstrap",
      "JavaScript",
    ],
    features: [
      "User authentication",
      "Trip creation & search",
      "Booking management",
      "In-app messaging",
      "Admin panel",
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
      "Zoo management system for tracking animals, species, habitats, and staff. Built as a training project demonstrating full CRUD operations and database design.",
    stack: [
      "PHP (OOP)",
      "MySQL",
      "HTML/CSS",
      "JavaScript",
    ],
    features: [
      "Full CRUD operations",
      "Database schema design",
      "User authentication",
      "Responsive interface",
      "Admin dashboard",
    ],
    liveUrl: null,
    featured: false,
  },
];

const stats = [
  { value: "5+", label: "Projects delivered" },
  { value: "2024", label: "Founded" },
  { value: "100%", label: "Completion rate" },
];

export default function ProjectsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-mesh">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--dd-text-main)] mb-6">
              Our{" "}
              <span className="gradient-text">work</span>
            </h1>
            <p className="text-lg text-[var(--dd-text-muted)] mb-8 leading-relaxed">
              A selection of real projects built by Deralis Digital. From SaaS
              platforms to marketing sites — modern, scalable, and production-ready.
            </p>
            <Link href="/contact" className="btn-primary">
              Start your project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 border-y border-[var(--dd-border)] bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8">
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
          <section key={project.id} className="py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[var(--dd-grad-from)] to-[var(--dd-grad-to)] text-[var(--dd-bg)] text-sm font-semibold">
                  Featured Project
                </span>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Content */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center">
                      <project.icon className="w-7 h-7 text-[var(--dd-accent)]" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-[var(--dd-text-main)]">
                        {project.title}
                      </h2>
                      <p className="text-[var(--dd-text-muted)]">{project.type}</p>
                    </div>
                  </div>

                  <p className="text-[var(--dd-text-muted)] mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-[var(--dd-text-main)] mb-3">
                      Key Features
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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

                {/* Info Card */}
                <div className="gradient-border p-8">
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-[var(--dd-text-dim)] mb-2">Status</p>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-[var(--dd-text-main)] font-medium">
                          {project.status}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-[var(--dd-text-dim)] mb-2">Year</p>
                      <p className="text-[var(--dd-text-main)] font-medium">
                        {project.year}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-[var(--dd-text-dim)] mb-3">
                        Tech Stack
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full text-sm bg-[var(--dd-bg)] border border-[var(--dd-border)] text-[var(--dd-text-muted)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-[var(--dd-border)]">
                      <p className="text-sm text-[var(--dd-text-muted)]">
                        Want something similar?
                      </p>
                      <Link
                        href="/contact?service=development"
                        className="text-[var(--dd-accent)] hover:underline text-sm font-medium inline-flex items-center gap-1 mt-1"
                      >
                        Let&apos;s talk
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

      {/* Other Projects */}
      <section className="py-20 lg:py-28 bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--dd-text-main)] mb-12">
            More Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {projects
              .filter((p) => !p.featured)
              .map((project) => (
                <div
                  key={project.id}
                  className="p-6 rounded-xl bg-[var(--dd-bg)] border border-[var(--dd-border)] card-hover"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center flex-shrink-0">
                      <project.icon className="w-6 h-6 text-[var(--dd-accent)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--dd-text-main)]">
                        {project.title}
                      </h3>
                      <p className="text-sm text-[var(--dd-text-muted)]">
                        {project.type}
                      </p>
                    </div>
                  </div>

                  <p className="text-[var(--dd-text-muted)] text-sm mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded text-xs bg-[var(--dd-bg-soft)] border border-[var(--dd-border)] text-[var(--dd-text-dim)]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="px-2 py-1 rounded text-xs text-[var(--dd-text-dim)]">
                        +{project.stack.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[var(--dd-border)]">
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
                      <span className="text-sm text-[var(--dd-text-muted)]">
                        {project.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[var(--dd-text-dim)]">
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
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-4">
            Have a project in mind?
          </h2>
          <p className="text-[var(--dd-text-muted)] max-w-2xl mx-auto mb-8">
            Whether it&apos;s a SaaS platform, a web application, or a marketing
            website — we&apos;re ready to bring your vision to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Start your project
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/services" className="btn-secondary">
              View services
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 border-t border-[var(--dd-border)] bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[var(--dd-text-main)] font-semibold mb-1">
                Want to see more details?
              </p>
              <p className="text-[var(--dd-text-muted)]">
                We&apos;re happy to walk you through any project in depth.
              </p>
            </div>
            <Link href="/contact" className="btn-primary">
              Book a call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}