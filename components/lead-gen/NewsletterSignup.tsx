"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { analytics } from "@/lib/analytics";

interface NewsletterSignupProps {
  source?: string;
}

export default function NewsletterSignup({ source = "footer" }: NewsletterSignupProps) {
  const t = useTranslations("leadGen.newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "newsletter" }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        analytics.newsletterSignup(source);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-green-400 text-sm">
        <CheckCircle2 className="w-4 h-4" />
        <span>{t("success")}</span>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-[var(--dd-text-muted)] mb-3">
        {t("description")}
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("placeholder")}
          required
          className="flex-1 !py-2 !px-3 text-sm"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary !py-2 !px-3 text-sm whitespace-nowrap"
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </form>
      {status === "error" && (
        <p className="text-red-400 text-xs mt-1">{t("error")}</p>
      )}
    </div>
  );
}
