"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, ArrowRight, Loader2 } from "lucide-react";

const projectTypes = [
  "New website",
  "Web application",
  "SaaS / Dashboard",
  "AI integration",
  "Consultation",
  "Other",
];

export default function FinalCTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In production, you would send to your API route here
    // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section className="py-24 lg:py-32 bg-[var(--dd-bg)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gradient-to-t from-[var(--dd-grad-from)]/10 to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-6">
              Ready to talk?
            </h2>
            <p className="text-[var(--dd-text-muted)] text-lg mb-8 leading-relaxed">
              Let&apos;s discuss your project. Book a free discovery call or send us a
              message, and we&apos;ll get back to you within 24 hours.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <a
                href="mailto:contact@deralis.digital"
                className="flex items-center gap-4 p-4 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)] hover:border-[var(--dd-accent)]/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--dd-grad-from)]/10 to-[var(--dd-grad-to)]/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[var(--dd-accent)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--dd-text-dim)]">Email us</p>
                  <p className="text-[var(--dd-text-main)] font-medium group-hover:text-[var(--dd-accent)] transition-colors">
                    contact@deralis.digital
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--dd-text-dim)] ml-auto group-hover:text-[var(--dd-accent)] group-hover:translate-x-1 transition-all" />
              </a>

              <a
                href="tel:+33600000000"
                className="flex items-center gap-4 p-4 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)] hover:border-[var(--dd-accent)]/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--dd-grad-from)]/10 to-[var(--dd-grad-to)]/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[var(--dd-accent)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--dd-text-dim)]">Call us</p>
                  <p className="text-[var(--dd-text-main)] font-medium group-hover:text-[var(--dd-accent)] transition-colors">
                    +33 6 00 00 00 00
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--dd-text-dim)] ml-auto group-hover:text-[var(--dd-accent)] group-hover:translate-x-1 transition-all" />
              </a>
            </div>

            {/* Response time */}
            <div className="flex items-center gap-2 text-sm text-[var(--dd-text-dim)]">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Usually responds within 24 hours
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="gradient-border p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Send className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--dd-text-main)] mb-2">
                    Message sent!
                  </h3>
                  <p className="text-[var(--dd-text-muted)]">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[var(--dd-text-main)] mb-2"
                    >
                      Your name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[var(--dd-text-main)] mb-2"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-sm font-medium text-[var(--dd-text-main)] mb-2"
                    >
                      Project type
                    </label>
                    <select
                      id="projectType"
                      required
                      value={formData.projectType}
                      onChange={(e) =>
                        setFormData({ ...formData, projectType: e.target.value })
                      }
                    >
                      <option value="" disabled>
                        Select a project type
                      </option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[var(--dd-text-main)] mb-2"
                    >
                      Tell us about your project
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder="Describe your project, goals, and timeline..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send my request
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
