"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Mail, 
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

type ContactFormProps = {
  prefilledService?: string;
};

export default function ContactForm({ prefilledService = "" }: ContactFormProps) {
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

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setStatus("success");
        setFormState({
          name: "",
          email: "",
          company: "",
          service: "",
          budget: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 lg:pt-28 lg:pb-10 bg-mesh">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--dd-text-main)] mb-4">
              Let&apos;s build{" "}
              <span className="gradient-text">something real</span>
            </h1>
            <p className="text-lg text-[var(--dd-text-muted)] leading-relaxed">
              Have a project in mind? Tell us about it. We reply within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              {status === "success" ? (
                <div className="gradient-border p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--dd-text-main)] mb-2">
                    Message sent!
                  </h2>
                  <p className="text-[var(--dd-text-muted)] mb-6">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <Link href="/" className="btn-secondary">
                    Back to home
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Email Row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-[var(--dd-text-main)] mb-2"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-[var(--dd-text-main)] placeholder-[var(--dd-text-dim)] focus:outline-none focus:border-[var(--dd-accent)] transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[var(--dd-text-main)] mb-2"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-[var(--dd-text-main)] placeholder-[var(--dd-text-dim)] focus:outline-none focus:border-[var(--dd-accent)] transition-colors"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-[var(--dd-text-main)] mb-2"
                    >
                      Company <span className="text-[var(--dd-text-dim)]">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-[var(--dd-text-main)] placeholder-[var(--dd-text-dim)] focus:outline-none focus:border-[var(--dd-accent)] transition-colors"
                      placeholder="Your company name"
                    />
                  </div>

                  {/* Service & Budget Row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-[var(--dd-text-main)] mb-2"
                      >
                        Service interested in
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formState.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-[var(--dd-text-main)] focus:outline-none focus:border-[var(--dd-accent)] transition-colors"
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-sm font-medium text-[var(--dd-text-main)] mb-2"
                      >
                        Budget range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formState.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-[var(--dd-text-main)] focus:outline-none focus:border-[var(--dd-accent)] transition-colors"
                      >
                        <option value="">Select a range</option>
                        {budgets.map((b) => (
                          <option key={b.value} value={b.value}>
                            {b.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[var(--dd-text-main)] mb-2"
                    >
                      Tell us about your project <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-[var(--dd-text-main)] placeholder-[var(--dd-text-dim)] focus:outline-none focus:border-[var(--dd-accent)] transition-colors resize-none"
                      placeholder="Describe your project, goals, and timeline..."
                    />
                  </div>

                  {/* Error Message */}
                  {status === "error" && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      Something went wrong. Please try again or email us directly.
                    </div>
                  )}

                  {/* Submit Button */}
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
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info Card */}
              <div className="gradient-border p-6">
                <h3 className="text-lg font-semibold text-[var(--dd-text-main)] mb-4">
                  Contact Info
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
                    <span>Based in France — Working Worldwide</span>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--dd-text-muted)]">
                    <Clock className="w-5 h-5 text-[var(--dd-accent)]" />
                    <span>Response within 24h</span>
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="p-6 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)]">
                <h3 className="text-lg font-semibold text-[var(--dd-text-main)] mb-4">
                  What to expect
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: MessageSquare, text: "We reply within 24 hours" },
                    { icon: Calendar, text: "Free 30-minute discovery call" },
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

              {/* Quick Questions */}
              <div className="p-6 rounded-xl bg-[var(--dd-bg-soft)] border border-[var(--dd-border)]">
                <h3 className="text-base font-semibold text-[var(--dd-text-main)] mb-3">
                  Quick answers
                </h3>
                <div className="space-y-3 text-sm">
                  {[
                    {
                      q: "What if I'm not sure what I need?",
                      a: "That's fine. We'll help you figure it out during our call.",
                    },
                    {
                      q: "Do you work with startups?",
                      a: "Yes. We offer consulting to help validate ideas before committing to development.",
                    },
                    {
                      q: "What's your typical timeline?",
                      a: "Most projects take 4–12 weeks depending on scope.",
                    },
                  ].map((item) => (
                    <div key={item.q}>
                      <p className="text-[var(--dd-text-main)] font-medium">
                        {item.q}
                      </p>
                      <p className="text-[var(--dd-text-muted)]">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 lg:py-10 bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-[var(--dd-text-main)] font-semibold">
                Prefer email?
              </p>
              <p className="text-sm text-[var(--dd-text-muted)]">
                Reach out directly at{" "}
                <a
                  href="mailto:contact@deralis.digital"
                  className="text-[var(--dd-accent)] hover:underline"
                >
                  contact@deralis.digital
                </a>
              </p>
            </div>
            <Link href="/projects" className="btn-secondary">
              View our work
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}