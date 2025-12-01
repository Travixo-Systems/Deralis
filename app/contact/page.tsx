"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  MessageSquare,
  Calendar
} from "lucide-react";

const services = [
  { value: "consulting", label: "Strategic Consulting" },
  { value: "development", label: "Full-Stack Development" },
  { value: "ai", label: "AI & Automation" },
  { value: "support", label: "Ongoing Support" },
  { value: "other", label: "Other / Not sure" },
];

const budgets = [
  { value: "< 2k", label: "< €2,000" },
  { value: "2k-5k", label: "€2,000 – €5,000" },
  { value: "5k-10k", label: "€5,000 – €10,000" },
  { value: "10k-25k", label: "€10,000 – €25,000" },
  { value: "> 25k", label: "> €25,000" },
  { value: "not-sure", label: "Not sure yet" },
];

export default function ContactPage() {
  const searchParams = useSearchParams();
  const prefilledService = searchParams.get("service") || "";

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    service: prefilledService,
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // TODO: Replace with actual API call to /api/contact
    // For now, simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate success
    setStatus("success");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (status === "success") {
    return (
      <section className="min-h-screen flex items-center justify-center bg-mesh py-20">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--dd-text-main)] mb-3">
            Message sent!
          </h1>
          <p className="text-[var(--dd-text-muted)] mb-6">
            Thanks for reaching out. We&apos;ll get back to you within 24 hours.
          </p>
          <Link href="/" className="btn-secondary">
            Back to home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 lg:pt-28 lg:pb-10 bg-mesh">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--dd-text-main)] mb-4">
              Let&apos;s <span className="gradient-text">talk</span>
            </h1>
            <p className="text-lg text-[var(--dd-text-muted)] leading-relaxed">
              Have a project in mind? Need technical guidance? Or just want to 
              explore possibilities? We&apos;re here to help. Free consultation, 
              no pressure.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form Column */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[var(--dd-text-main)] mb-1.5"
                    >
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-[var(--dd-text-main)] placeholder:text-[var(--dd-text-dim)] focus:outline-none focus:border-[var(--dd-accent)] transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[var(--dd-text-main)] mb-1.5"
                    >
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-[var(--dd-text-main)] placeholder:text-[var(--dd-text-dim)] focus:outline-none focus:border-[var(--dd-accent)] transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-[var(--dd-text-main)] mb-1.5"
                  >
                    Company <span className="text-[var(--dd-text-dim)]">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-[var(--dd-text-main)] placeholder:text-[var(--dd-text-dim)] focus:outline-none focus:border-[var(--dd-accent)] transition-colors"
                    placeholder="Your company name"
                  />
                </div>

                {/* Service & Budget Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-[var(--dd-text-main)] mb-1.5"
                    >
                      What do you need?
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formState.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-[var(--dd-text-main)] focus:outline-none focus:border-[var(--dd-accent)] transition-colors"
                    >
                      <option value="">Select a service...</option>
                      {services.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-sm font-medium text-[var(--dd-text-main)] mb-1.5"
                    >
                      Budget range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formState.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-[var(--dd-text-main)] focus:outline-none focus:border-[var(--dd-accent)] transition-colors"
                    >
                      <option value="">Select budget...</option>
                      {budgets.map((budget) => (
                        <option key={budget.value} value={budget.value}>
                          {budget.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[var(--dd-text-main)] mb-1.5"
                  >
                    Tell us about your project <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-[var(--dd-text-main)] placeholder:text-[var(--dd-text-dim)] focus:outline-none focus:border-[var(--dd-accent)] transition-colors resize-none"
                    placeholder="Describe your project, goals, and any specific requirements..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {status === "error" && (
                  <p className="text-red-400 text-sm">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </form>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Info Card */}
              <div className="gradient-border p-6">
                <h3 className="text-lg font-semibold text-[var(--dd-text-main)] mb-4">
                  Contact info
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:contact@deralis.digital"
                    className="flex items-center gap-3 text-[var(--dd-text-muted)] hover:text-[var(--dd-text-main)] transition-colors"
                  >
                    <Mail className="w-5 h-5 text-[var(--dd-accent)]" />
                    <span>contact@deralis.digital</span>
                  </a>
                  <div className="flex items-center gap-3 text-[var(--dd-text-muted)]">
                    <MapPin className="w-5 h-5 text-[var(--dd-accent)]" />
                    <span>Based in France - Working Worldwide</span>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--dd-text-muted)]">
                    <Clock className="w-5 h-5 text-[var(--dd-accent)]" />
                    <span>Response within 24h</span>
                  </div>
                </div>
              </div>

              {/* What to Expect Card */}
              <div className="p-6 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)]">
                <h3 className="text-lg font-semibold text-[var(--dd-text-main)] mb-4">
                  What to expect
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: MessageSquare, text: "We reply within 24 hours" },
                    { icon: Calendar, text: "Free 30-min discovery call" },
                    { icon: CheckCircle2, text: "No-obligation quote" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-[var(--dd-accent)]" />
                      <span className="text-sm text-[var(--dd-text-muted)]">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prefer Email */}
              <div className="p-5 rounded-xl bg-[var(--dd-bg-soft)] border border-[var(--dd-border)]">
                <p className="text-sm text-[var(--dd-text-muted)]">
                  Prefer email?{" "}
                  <a
                    href="mailto:contact@deralis.digital"
                    className="text-[var(--dd-accent)] hover:underline"
                  >
                    contact@deralis.digital
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Mini Section */}
      <section className="py-8 lg:py-12 bg-[var(--dd-bg-soft)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[var(--dd-text-main)] mb-6 text-center">
            Quick answers
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "How quickly can you start?",
                a: "Usually within 1-2 weeks, depending on current workload. Urgent projects can be accommodated.",
              },
              {
                q: "Do you work with early-stage startups?",
                a: "Yes. We offer consulting to help validate ideas before committing to development.",
              },
              {
                q: "What's your typical project timeline?",
                a: "Consulting: 1-2 weeks. Web applications: 4-12 weeks. Ongoing support: monthly.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="p-4 rounded-xl bg-[var(--dd-bg)] border border-[var(--dd-border)]"
              >
                <h3 className="font-medium text-[var(--dd-text-main)] mb-1 text-sm">
                  {faq.q}
                </h3>
                <p className="text-sm text-[var(--dd-text-muted)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-8 border-t border-[var(--dd-border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[var(--dd-text-muted)] mb-3">
            Not ready to reach out yet?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/projects" className="btn-secondary">
              See our work
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/services" className="btn-secondary">
              View services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}