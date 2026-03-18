"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { X, ArrowRight, Clock, Shield, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { analytics } from "@/lib/analytics";

const STORAGE_KEY = "dd_exit_intent_dismissed";

export default function ExitIntentPopup() {
  const t = useTranslations("leadGen.exitIntent");
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 5) {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (dismissed) return;

      setIsVisible(true);
      analytics.exitIntentShown();
    }
  }, []);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) return;

    // Only add on desktop (mouse-based)
    const timeout = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000); // Wait 5s before activating

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  const handleCTAClick = () => {
    analytics.exitIntentConverted();
    localStorage.setItem(STORAGE_KEY, "true");
  };

  const benefits = [
    { icon: Clock, key: "benefit1" },
    { icon: Shield, key: "benefit2" },
    { icon: MessageSquare, key: "benefit3" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md z-50"
          >
            <div className="relative bg-[var(--dd-bg-card)] border border-[var(--dd-border-bright)] rounded-2xl p-6 sm:p-8 shadow-2xl">
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 text-[var(--dd-text-dim)] hover:text-[var(--dd-text-main)] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute -z-10 inset-0 rounded-2xl bg-gradient-to-r from-[var(--dd-grad-from)]/10 to-[var(--dd-grad-to)]/10 blur-xl" />

              <h3 className="text-xl sm:text-2xl font-bold text-[var(--dd-text-main)] mb-2">
                {t("title")}
              </h3>
              <p className="text-[var(--dd-text-muted)] text-sm mb-6">
                {t("description")}
              </p>

              <div className="space-y-3 mb-6">
                {benefits.map((benefit) => (
                  <div key={benefit.key} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--dd-bg)] border border-[var(--dd-border)] flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-4 h-4 text-[var(--dd-accent)]" />
                    </div>
                    <span className="text-sm text-[var(--dd-text-muted)]">
                      {t(benefit.key)}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                onClick={handleCTAClick}
                className="btn-primary w-full justify-center"
              >
                {t("cta")}
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={handleDismiss}
                className="w-full text-center text-sm text-[var(--dd-text-dim)] hover:text-[var(--dd-text-muted)] mt-3 transition-colors"
              >
                {t("dismiss")}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
