"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import Link from "next/link";

const features = [
  "Equipment tracking & inventory management",
  "VGP compliance automation (French regulations)",
  "QR code system for quick access",
  "Dashboard with analytics & reporting",
  "Multi-user roles & permissions",
  "Mobile-responsive interface",
];

const techStack = [
  { name: "Next.js 15", category: "Frontend" },
  { name: "Supabase", category: "Backend" },
  { name: "Prisma", category: "ORM" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Vercel", category: "Hosting" },
];

export default function Highlight() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--dd-bg)] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[var(--dd-grad-from)]/5 to-[var(--dd-grad-to)]/5 blur-3xl translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--dd-bg-card)] border border-[var(--dd-border)] mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-[var(--dd-text-muted)]">
                Case Study
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-4">
              A concrete example:{" "}
              <span className="gradient-text">TraviXO Systems</span>
            </h2>

            <p className="text-[var(--dd-text-muted)] text-lg mb-8 leading-relaxed">
              A complete SaaS platform for equipment rental companies, built with
              modern web technologies and aligned with French VGP legal
              requirements. This project showcases the same principles we apply
              for all our clients: clarity, scalability, and real-world utility.
            </p>

            {/* Features list */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 text-[var(--dd-text-muted)]"
                >
                  <Check className="w-5 h-5 text-[var(--dd-accent)] mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://travixosystems.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Visit TraviXO
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link href="/projects/travixo" className="btn-secondary">
                Read case study
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main card */}
            <div className="gradient-border p-1 glow">
              <div className="bg-[var(--dd-bg-card)] rounded-xl overflow-hidden">
                {/* Browser mockup header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[var(--dd-bg)] border-b border-[var(--dd-border)]">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="max-w-xs mx-auto px-4 py-1.5 rounded-md bg-[var(--dd-bg-soft)] border border-[var(--dd-border)] text-xs text-[var(--dd-text-dim)] text-center">
                      travixosystems.com
                    </div>
                  </div>
                </div>

                {/* Screenshot placeholder */}
                <div className="aspect-[16/10] bg-gradient-to-br from-[var(--dd-grad-from)]/10 to-[var(--dd-grad-to)]/10 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--dd-grad-from)] to-[var(--dd-grad-to)] flex items-center justify-center">
                        <span className="text-3xl font-bold text-[var(--dd-bg)]">
                          T
                        </span>
                      </div>
                      <p className="text-[var(--dd-text-dim)] text-sm">
                        Dashboard Preview
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech stack floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -left-6 p-4 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)] shadow-2xl"
            >
              <p className="text-xs text-[var(--dd-text-dim)] mb-3">
                Built with
              </p>
              <div className="flex flex-wrap gap-2 max-w-[200px]">
                {techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech.name}
                    className="px-2 py-1 rounded text-xs bg-[var(--dd-bg)] border border-[var(--dd-border)] text-[var(--dd-text-muted)]"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Decorative element */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full bg-gradient-to-br from-[var(--dd-grad-from)]/5 to-[var(--dd-grad-to)]/5 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
