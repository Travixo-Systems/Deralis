"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

// TODO: Reply email template (Resend) should include soft redirect to audit page.
// See PHASE_5_CONTACT_PAGE_NOTES.md section (d).

type FormState = "idle" | "submitting" | "success" | "error";
type FieldErrors = Record<string, string>;

export default function ContactForm() {
  const t = useTranslations("contact.page.form");
  const tErrors = useTranslations("contact.page.form.errors");
  const tCommon = useTranslations("contact");
  const locale = useLocale();

  const [state, setState] = useState<FormState>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");

  function validate(data: FormData): FieldErrors {
    const errors: FieldErrors = {};
    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    if (!name) errors.name = "required";
    if (!email) errors.email = "required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "invalid";
    if (!message) errors.message = "required";
    else if (message.length < 20) errors.message = "tooShort";

    return errors;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors({});
    setFormError("");

    const formData = new FormData(e.currentTarget);

    // Honeypot check
    if (formData.get("website_url")) return;

    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          company: formData.get("company") || "",
          website: formData.get("website") || "",
          message: formData.get("message"),
          locale,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setState("success");
    } catch {
      setState("error");
      setFormError(tCommon("form.error"));
    }
  }

  if (state === "success") {
    return (
      <div className="max-w-[640px] mx-auto py-12">
        <h3 className="text-[22px] font-medium text-ink mb-3">
          {tCommon("success.title")}
        </h3>
        <p className="text-base leading-[1.65] text-ink-2">
          {tCommon("success.description")}
        </p>
      </div>
    );
  }

  const fieldCls = (name: string) =>
    `block w-full text-base leading-[1.6] text-ink bg-bg border rounded-lg px-4 py-3.5 max-md:py-[13px] max-md:px-3.5 placeholder:text-ink-3 hover:border-border-warm focus:outline-none focus:border-accent transition-colors ${
      fieldErrors[name] ? "border-[var(--border-error)]" : "border-border-default"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
      </div>

      {formError && (
        <p className="text-[15px] text-[var(--border-error)] mb-6">{formError}</p>
      )}

      <div className="mb-6">
        <label htmlFor="name" className="block text-[14px] font-semibold text-ink-label tracking-[0.01em] mb-2">
          {tCommon("form.name.label")}
          <span className="text-accent ml-0.5 font-medium">{tCommon("form.required")}</span>
        </label>
        <input type="text" id="name" name="name" autoComplete="name" required className={fieldCls("name")} />
        {fieldErrors.name && <p className="text-[13px] text-ink-2 mt-1.5">{tErrors("required")}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-[14px] font-semibold text-ink-label tracking-[0.01em] mb-2">
          {tCommon("form.email.label")}
          <span className="text-accent ml-0.5 font-medium">{tCommon("form.required")}</span>
        </label>
        <input type="email" id="email" name="email" autoComplete="email" required className={fieldCls("email")} />
        {fieldErrors.email && <p className="text-[13px] text-ink-2 mt-1.5">{fieldErrors.email === "invalid" ? tErrors("email") : tErrors("required")}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="company" className="block text-[14px] font-semibold text-ink-label tracking-[0.01em] mb-2">
          {tCommon("form.company.label")}
          <span className="text-ink-3 font-normal ml-1.5">{tCommon("form.company.optional")}</span>
        </label>
        <input type="text" id="company" name="company" autoComplete="organization" className={fieldCls("company")} />
      </div>

      <div className="mb-6">
        <label htmlFor="website" className="block text-[14px] font-semibold text-ink-label tracking-[0.01em] mb-2">
          {t("websiteLabel")}
          <span className="text-ink-3 font-normal ml-1.5">{tCommon("form.company.optional")}</span>
        </label>
        <input type="url" id="website" name="website" autoComplete="url" placeholder="https://" className={fieldCls("website")} />
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-[14px] font-semibold text-ink-label tracking-[0.01em] mb-2">
          {t("messageLabel")}
          <span className="text-accent ml-0.5 font-medium">{tCommon("form.required")}</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={20}
          rows={6}
          className={`${fieldCls("message")} min-h-[160px] resize-y`}
        />
        {fieldErrors.message && (
          <p className="text-[13px] text-ink-2 mt-1.5">
            {fieldErrors.message === "tooShort" ? tErrors("minLength") : tErrors("required")}
          </p>
        )}
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="w-full justify-center group inline-flex items-center gap-2.5 px-7 py-[18px] bg-ink text-bg text-[15px] font-medium rounded-lg transition-colors hover:bg-accent disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {state === "submitting" ? tCommon("form.sending" as never) : t("submitButton")}
          {state !== "submitting" && (
            <span aria-hidden="true" className="transition-transform duration-[180ms] group-hover:translate-x-[3px]">→</span>
          )}
        </button>
      </div>
    </form>
  );
}
