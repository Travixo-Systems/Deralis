"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How much does a typical project cost?",
    answer:
      "Consulting starts at €500. Full platforms typically range from €5,000–€25,000 depending on scope. We provide a detailed quote after understanding your needs.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "Our primary stack is Next.js, React, TypeScript, and PostgreSQL. We also work with Supabase, Prisma, and various APIs. We pick the right tool for the job.",
  },
  {
    question: "How long does a project take?",
    answer:
      "A consulting engagement takes 1-2 weeks. A typical web application takes 4-12 weeks depending on complexity. We provide realistic timelines upfront—no surprises.",
  },
  {
    question: "Do you work with clients outside France?",
    answer:
      "Yes. We work remotely with clients across Europe and beyond. Communication happens via video calls, email, and your preferred project management tools. Fully bilingual in English and French.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes. We offer maintenance packages that include bug fixes, updates, monitoring, and feature additions. Most clients choose ongoing support—we don't disappear after delivery.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-3">
            Common <span className="gradient-text">questions</span>
          </h2>
          <p className="text-[var(--dd-text-muted)]">
            Quick answers to questions you might have.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-[var(--dd-border)] bg-[var(--dd-bg-card)] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--dd-bg-soft)] transition-colors"
              >
                <span className="font-medium text-[var(--dd-text-main)] text-sm">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[var(--dd-text-muted)] transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-[var(--dd-text-muted)] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}