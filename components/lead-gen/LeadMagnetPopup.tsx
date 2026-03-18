"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X, FileCheck, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { analytics } from "@/lib/analytics";

const STORAGE_KEY = "dd_lead_magnet_dismissed";
const SHOW_DELAY_MS = 30000; // 30 seconds

export default function LeadMagnetPopup() {
  const t = useTranslations("leadGen.leadMagnet");
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "lead_magnet" }),
      });

      if (res.ok) {
        setStatus("success");
        analytics.leadMagnetDownload("web_system_audit_checklist", "popup");
        localStorage.setItem(STORAGE_KEY, "true");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg z-50"
          >
            <div className="relative bg-[var(--dd-bg-card)] border border-[var(--dd-border-bright)] rounded-2xl p-6 sm:p-8 shadow-2xl">
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 text-[var(--dd-text-dim)] hover:text-[var(--dd-text-main)] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Glow */}
              <div className="absolute -z-10 inset-0 rounded-2xl bg-gradient-to-r from-[var(--dd-grad-from)]/10 to-[var(--dd-grad-to)]/10 blur-xl" />

              {status === "success" ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--dd-text-main)] mb-2">
                    {t("successTitle")}
                  </h3>
                  <p className="text-[var(--dd-text-muted)] text-sm">
                    {t("successDescription")}
                  </p>
                </div>
              ) : (
                <>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[var(--dd-grad-from)] to-[var(--dd-grad-to)] flex items-center justify-center mb-4">
                    <FileCheck className="w-6 h-6 text-[var(--dd-bg)]" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--dd-text-main)] mb-2">
                    {t("title")}
                  </h3>
                  <p className="text-[var(--dd-text-muted)] text-sm mb-4">
                    {t("description")}
                  </p>

                  {/* Checklist preview */}
                  <div className="space-y-2 mb-6">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--dd-accent)] flex-shrink-0" />
                        <span className="text-sm text-[var(--dd-text-muted)]">
                          {t(`items.${i}`)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("placeholder")}
                      required
                      className="flex-1 text-sm"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-primary whitespace-nowrap text-sm !px-4 !py-2"
                    >
                      {status === "loading" ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          {t("cta")}
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  {status === "error" && (
                    <p className="text-red-400 text-xs mt-2">{t("error")}</p>
                  )}

                  <p className="text-xs text-[var(--dd-text-dim)] mt-3">
                    {t("privacy")}
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
