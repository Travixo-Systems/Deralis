import Link from "next/link";
import { ArrowRight, ExternalLink, CheckCircle2, Database } from "lucide-react";

const features = [
  "Multi-tenant SaaS architecture",
  "QR code asset tracking",
  "Inspection scheduling",
  "VGP compliance automation",
  "Role-based access control",
  "Real-time PostgreSQL database",
];

const stack = ["Next.js 15", "Supabase", "PostgreSQL", "Prisma", "TypeScript", "Tailwind"];

export default function Highlight() {
  return (
    <section className="py-12 lg:py-16 bg-[var(--dd-bg-soft)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[var(--dd-grad-from)] to-[var(--dd-grad-to)] text-[var(--dd-bg)] text-xs font-semibold mb-4">
              Case Study
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--dd-text-main)] mb-3">
              TraviXO Systems
            </h2>
            <p className="text-sm text-[var(--dd-text-dim)] mb-4">
              B2B SaaS • Equipment Tracking • VGP Compliance
            </p>
            <p className="text-[var(--dd-text-muted)] mb-6 leading-relaxed">
              A full multi-tenant SaaS platform for equipment rental companies.
              QR-based asset tracking, inspection scheduling, and compliance
              automation—all powered by a real PostgreSQL database.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--dd-accent)] flex-shrink-0" />
                  <span className="text-sm text-[var(--dd-text-muted)]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 rounded text-xs bg-[var(--dd-bg)] border border-[var(--dd-border)] text-[var(--dd-text-muted)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://travixosystems.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Visit website
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link href="/projects" className="btn-secondary">
                See all projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Screenshot placeholder */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden border border-[var(--dd-border)] bg-[var(--dd-bg-card)]">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--dd-border)] bg-[var(--dd-bg)]">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-3 text-xs text-[var(--dd-text-dim)] font-mono">
                  app.travixosystems.com
                </span>
              </div>

              {/* Screenshot area - replace with real image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-[var(--dd-bg)] to-[var(--dd-bg-soft)] flex items-center justify-center">
                <div className="text-center p-8">
                  <Database className="w-16 h-16 text-[var(--dd-accent)] mx-auto mb-4 opacity-40" />
                  <p className="text-[var(--dd-text-dim)]">
                    TraviXO Dashboard
                  </p>
                  <p className="text-xs text-[var(--dd-text-dim)] mt-1">
                    Screenshot coming soon
                  </p>
                </div>
                
                {/* When you have the screenshot:
                <Image
                  src="/projects/travixo-dashboard.png"
                  alt="TraviXO Dashboard"
                  fill
                  className="object-cover"
                />
                */}
              </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-gradient-to-r from-[var(--dd-grad-from)]/5 to-[var(--dd-grad-to)]/5 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}