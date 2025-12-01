"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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

const serviceKeys = ["consulting", "development", "ai", "support", "other"] as const;
const budgetKeys = ["under2k", "2k5k", "5k10k", "10k25k", "over25k", "notSure"] as const;

type ContactFormProps = {
  prefilledService?: string;
};

export default function ContactForm({ prefilledService = "" }: ContactFormProps) {
  const t = useTranslations("contact");
  const tActions = useTranslations("common.actions");

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

  const expectItems = [
    { icon: MessageSquare, key: "0" },
    { icon: Calendar, key: "1" },
    { icon: CheckCircle2, key: "2" },
  ];

  const quickAnswerKeys = ["notSure", "startups", "timeline"] as const;

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 lg:pt-28 lg:pb-10 bg-mesh">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--dd-text-main)] mb-4">
              {t("hero.title")}{" "}
              <span className="gradient-text">{t("hero.titleHighlight")}</span>
            </h1>
            <p className="text-lg text-[var(--dd-text-muted)] leading-relaxed">
              {t("hero.description")}
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
                    {t("success.title")}
                  </h2>
                  <p className="text-[var(--dd-text-muted)] mb-6">
                    {t("success.description")}
                  </p>
                  <Link href="/" className="btn-secondary">
                    {tActions("backToHome")}
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
                        {t("form.name.label")} <span className="text-red-500">{t("form.required")}</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-[var(--dd-text-main)] placeholder-[var(--dd-text-dim)] focus:outline-none focus:border-[var(--dd-accent)] transition-colors"
                        placeholder={t("form.name.placeholder")}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[var(--dd-text-main)] mb-2"
                      >
                        {t("form.email.label")} <span className="text-red-500">{t("form.required")}</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-[var(--dd-text-main)] placeholder-[var(--dd-text-dim)] focus:outline-none focus:border-[var(--dd-accent)] transition-colors"
                        placeholder={t("form.email.placeholder")}
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-[var(--dd-text-main)] mb-2"
                    >
                      {t("form.company.label")} <span className="text-[var(--dd-text-dim)]">{t("form.company.optional")}</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-[var(--dd-text-main)] placeholder-[var(--dd-text-dim)] focus:outline-none focus:border-[var(--dd-accent)] transition-colors"
                      placeholder={t("form.company.placeholder")}
                    />
                  </div>

                  {/* Service & Budget Row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-[var(--dd-text-main)] mb-2"
                      >
                        {t("form.service.label")}
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formState.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-[var(--dd-text-main)] focus:outline-none focus:border-[var(--dd-accent)] transition-colors"
                      >
                        <option value="">{t("form.service.placeholder")}</option>
                        {serviceKeys.map((key) => (
                          <option key={key} value={key}>
                            {t(`form.service.options.${key}`)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-sm font-medium text-[var(--dd-text-main)] mb-2"
                      >
                        {t("form.budget.label")}
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formState.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-[var(--dd-text-main)] focus:outline-none focus:border-[var(--dd-accent)] transition-colors"
                      >
                        <option value="">{t("form.budget.placeholder")}</option>
                        {budgetKeys.map((key) => (
                          <option key={key} value={key}>
                            {t(`form.budget.options.${key}`)}
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
                      {t("form.message.label")} <span className="text-red-500">{t("form.required")}</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] text-[var(--dd-text-main)] placeholder-[var(--dd-text-dim)] focus:outline-none focus:border-[var(--dd-accent)] transition-colors resize-none"
                      placeholder={t("form.message.placeholder")}
                    />
                  </div>

                  {/* Error Message */}
                  {status === "error" && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {t("form.error")}
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
                        {tActions("sending")}
                      </>
                    ) : (
                      <>
                        {tActions("sendMessage")}
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
                  {t("sidebar.contactInfo.title")}
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
                    <span>{t("sidebar.contactInfo.location")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--dd-text-muted)]">
                    <Clock className="w-5 h-5 text-[var(--dd-accent)]" />
                    <span>{t("sidebar.contactInfo.response")}</span>
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="p-6 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)]">
                <h3 className="text-lg font-semibold text-[var(--dd-text-main)] mb-4">
                  {t("sidebar.whatToExpect.title")}
                </h3>
                <div className="space-y-3">
                  {expectItems.map((item, index) => (
                    <div key={item.key} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-[var(--dd-accent)]" />
                      <span className="text-sm text-[var(--dd-text-muted)]">
                        {t(`sidebar.whatToExpect.items.${index}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Questions */}
              <div className="p-6 rounded-xl bg-[var(--dd-bg-soft)] border border-[var(--dd-border)]">
                <h3 className="text-base font-semibold text-[var(--dd-text-main)] mb-3">
                  {t("sidebar.quickAnswers.title")}
                </h3>
                <div className="space-y-3 text-sm">
                  {quickAnswerKeys.map((key) => (
                    <div key={key}>
                      <p className="text-[var(--dd-text-main)] font-medium">
                        {t(`sidebar.quickAnswers.items.${key}.question`)}
                      </p>
                      <p className="text-[var(--dd-text-muted)]">
                        {t(`sidebar.quickAnswers.items.${key}.answer`)}
                      </p>
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
                {t("cta.preferEmail")}
              </p>
              <p className="text-sm text-[var(--dd-text-muted)]">
                {t("cta.reachOut")}{" "}
                <a
                  href="mailto:contact@deralis.digital"
                  className="text-[var(--dd-accent)] hover:underline"
                >
                  contact@deralis.digital
                </a>
              </p>
            </div>
            <Link href="/projects" className="btn-secondary">
              {tActions("viewOurWork")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
