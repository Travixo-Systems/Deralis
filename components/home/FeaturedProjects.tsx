"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

// Placeholder projects - replace with real data
const projects = [
  {
    id: "travixo",
    title: "TraviXO Systems",
    type: "SaaS Web Application",
    description:
      "Modern solution for equipment tracking and VGP compliance. Full SaaS platform with dashboard, QR automation, and reporting.",
    stack: ["Next.js", "Supabase", "Prisma", "TypeScript"],
    image: "/projects/travixo.png",
    liveUrl: "https://travixosystems.com",
    featured: true,
  },
  {
    id: "project-2",
    title: "Project Two",
    type: "Dashboard Application",
    description:
      "Internal dashboard for data visualization and team management with real-time updates.",
    stack: ["React", "Node.js", "PostgreSQL"],
    image: "/projects/placeholder.png",
    liveUrl: "#",
  },
  {
    id: "project-3",
    title: "Project Three",
    type: "Landing Page",
    description:
      "High-converting landing page with modern animations and optimized performance.",
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    image: "/projects/placeholder.png",
    liveUrl: "#",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function FeaturedProjects() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--dd-bg-soft)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-4">
            Featured Projects
          </h2>
          <p className="text-[var(--dd-text-muted)] max-w-2xl mx-auto">
            Real work delivered by Deralis Digital. Modern, fast, and production-ready.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`group relative rounded-xl overflow-hidden bg-[var(--dd-bg)] border border-[var(--dd-border)] card-hover ${
                project.featured ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Image placeholder */}
              <div className="aspect-video bg-[var(--dd-bg-card)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--dd-grad-from)]/20 to-[var(--dd-grad-to)]/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-bold text-[var(--dd-border)]">
                    {project.title.charAt(0)}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[var(--dd-bg)]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-[var(--dd-accent)] flex items-center justify-center text-[var(--dd-bg)] hover:scale-110 transition-transform"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-[var(--dd-grad-from)] to-[var(--dd-grad-to)] text-[var(--dd-bg)] text-xs font-semibold">
                    Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-xs text-[var(--dd-accent)] font-medium uppercase tracking-wider">
                  {project.type}
                </span>
                <h3 className="text-xl font-semibold text-[var(--dd-text-main)] mt-2 mb-3">
                  {project.title}
                </h3>
                <p className="text-[var(--dd-text-muted)] text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded text-xs bg-[var(--dd-bg-soft)] border border-[var(--dd-border)] text-[var(--dd-text-dim)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/projects" className="btn-primary">
            View all projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
