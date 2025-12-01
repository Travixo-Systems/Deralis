import Link from "next/link";
import { ArrowRight, ExternalLink, Database, Code2, Globe } from "lucide-react";

const projects = [
  {
    icon: Database,
    title: "TraviXO Systems",
    type: "B2B SaaS Platform",
    description:
      "QR-based asset tracking and VGP compliance automation. Multi-tenant architecture with dashboards, inspection scheduling, and compliance logging.",
    stack: ["Next.js 15", "Supabase", "PostgreSQL", "Prisma"],
    liveUrl: "https://travixosystems.com",
    appUrl: "https://app.travixosystems.com",
    featured: true,
  },
  {
    icon: Globe,
    title: "TraviXO Web",
    type: "Marketing Website",
    description:
      "SEO-optimized, multilingual marketing site. Conversion-focused design driving signups to the SaaS platform.",
    stack: ["Next.js 15", "Tailwind", "next-intl"],
    liveUrl: "https://travixosystems.com",
  },
  {
    icon: Code2,
    title: "More Projects",
    type: "Various",
    description:
      "PHP applications, CRUD systems, and more. See our full portfolio for details on all projects delivered.",
    stack: ["PHP", "MySQL", "MongoDB"],
    href: "/projects",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-3">
            Featured <span className="gradient-text">platforms</span>
          </h2>
          <p className="text-[var(--dd-text-muted)] max-w-2xl mx-auto">
            Real systems we&apos;ve built — dashboards, databases, automation.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`p-5 rounded-xl border flex flex-col ${
                project.featured
                  ? "gradient-border"
                  : "bg-[var(--dd-bg-card)] border-[var(--dd-border)]"
              }`}
            >
              {project.featured && (
                <span className="text-xs text-[var(--dd-accent)] font-medium mb-3">
                  Featured
                </span>
              )}
              
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20 flex items-center justify-center flex-shrink-0">
                  <project.icon className="w-5 h-5 text-[var(--dd-accent)]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--dd-text-main)]">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[var(--dd-text-dim)]">{project.type}</p>
                </div>
              </div>

              <p className="text-sm text-[var(--dd-text-muted)] mb-4 flex-grow">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.stack.map((tech) => (
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
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--dd-accent)] text-sm font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Visit site
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {project.appUrl && (
                  <a
                    href={project.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--dd-text-muted)] text-sm hover:text-[var(--dd-text-main)] inline-flex items-center gap-1"
                  >
                    Open app
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {project.href && (
                  <Link
                    href={project.href}
                    className="text-[var(--dd-accent)] text-sm font-medium hover:underline inline-flex items-center gap-1"
                  >
                    View all
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/projects" className="btn-secondary">
            See all platforms
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}