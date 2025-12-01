"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How much does a project cost?",
    answer:
      "Project costs vary based on scope and complexity. A simple landing page might start around €1,500, while a full SaaS application can range from €8,000 to €25,000+. We provide detailed quotes after our discovery call, where we understand your specific needs and define the project scope together.",
  },
  {
    question: "Do you only work in France?",
    answer:
      "No, we work with clients worldwide. While we're based in France and many of our clients are French businesses, we regularly work with international clients across Europe and beyond. All communication can be in English or French.",
  },
  {
    question: "Can you take over an existing project?",
    answer:
      "Yes, we can take over existing projects. We start with a code audit to assess the current state, identify technical debt, and create a roadmap for improvements. Whether it's fixing bugs, adding features, or refactoring the entire codebase, we can help.",
  },
  {
    question: "Do you do strategy or just development?",
    answer:
      "We do both. In fact, we believe good development starts with good strategy. Before writing code, we help you validate your idea, analyze your market, and design the right solution. This approach saves time and money in the long run.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 lg:py-32 bg-[var(--dd-bg-soft)]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[var(--dd-text-muted)]">
            Quick answers to common questions about working with us.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl bg-[var(--dd-bg)] border border-[var(--dd-border)] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-[var(--dd-text-main)] pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-[var(--dd-text-muted)]" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-[var(--dd-text-muted)] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-[var(--dd-text-muted)] mb-4">
            Have another question?
          </p>
          <a
            href="/contact"
            className="text-[var(--dd-accent)] font-medium hover:underline"
          >
            Get in touch →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
