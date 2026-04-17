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
  const tActions = useTranslations("common.actions");
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
      <div style={{ padding: "32px 0" }}>
        <h3 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: 26, fontWeight: 500, color: "var(--text-primary)", marginBottom: 14, letterSpacing: "-0.01em" }}>
          {tCommon("success.title")}
        </h3>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--text-secondary)" }}>
          {tCommon("success.description")}
        </p>
      </div>
    );
  }

  const fieldStyle = (name: string): React.CSSProperties => ({
    display: "block",
    width: "100%",
    fontSize: 16,
    lineHeight: 1.6,
    color: "var(--text-primary)",
    background: "var(--card-paper)",
    border: `1px solid ${fieldErrors[name] ? "var(--color-error)" : "var(--border-strong)"}`,
    borderRadius: "var(--radius-button)",
    padding: "14px 16px",
    fontFamily: "inherit",
    transition: "border-color 300ms ease, background-color 450ms ease, color 450ms ease",
  });

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-primary)",
    letterSpacing: "0.01em", marginBottom: 8,
  };
  const reqStyle: React.CSSProperties = {
    color: "var(--accent)", marginLeft: 4, fontWeight: 500,
  };
  const optStyle: React.CSSProperties = {
    color: "var(--text-muted)", fontWeight: 400, marginLeft: 6,
  };
  const errStyle: React.CSSProperties = {
    fontSize: 13, color: "var(--color-error)", marginTop: 6,
    display: "flex", alignItems: "center", gap: 6, fontWeight: 500,
  };
  const errIconStyle: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: 16, height: 16, borderRadius: "50%",
    background: "var(--color-error)", color: "#FFFFFF",
    fontSize: 11, fontWeight: 700, lineHeight: 1,
    flexShrink: 0,
  };
  const fieldBlock: React.CSSProperties = { marginBottom: 24 };

  function ErrorLine({ id, children }: { id: string; children: React.ReactNode }) {
    return (
      <p id={id} style={errStyle}>
        <span aria-hidden="true" style={errIconStyle}>!</span>
        <span>{children}</span>
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot */}
      <div style={{ display: "none" }} aria-hidden="true">
        <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
      </div>

      {formError && (
        <p
          role="alert"
          style={{
            fontSize: 15, color: "var(--color-error)", marginBottom: 24,
            display: "flex", alignItems: "center", gap: 8, fontWeight: 500,
          }}
        >
          <span aria-hidden="true" style={{ ...errIconStyle, width: 20, height: 20, fontSize: 13 }}>!</span>
          <span>{formError}</span>
        </p>
      )}

      <div style={fieldBlock}>
        <label htmlFor="name" style={labelStyle}>
          {tCommon("form.name.label")}
          <span style={reqStyle}>{tCommon("form.required")}</span>
        </label>
        <input
          type="text" id="name" name="name" autoComplete="name" required
          style={fieldStyle("name")}
          aria-invalid={!!fieldErrors.name}
          aria-describedby={fieldErrors.name ? "name-err" : undefined}
        />
        {fieldErrors.name && <ErrorLine id="name-err">{tErrors("required")}</ErrorLine>}
      </div>

      <div style={fieldBlock}>
        <label htmlFor="email" style={labelStyle}>
          {tCommon("form.email.label")}
          <span style={reqStyle}>{tCommon("form.required")}</span>
        </label>
        <input
          type="email" id="email" name="email" autoComplete="email" required
          style={fieldStyle("email")}
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? "email-err" : undefined}
        />
        {fieldErrors.email && (
          <ErrorLine id="email-err">
            {fieldErrors.email === "invalid" ? tErrors("email") : tErrors("required")}
          </ErrorLine>
        )}
      </div>

      <div style={fieldBlock}>
        <label htmlFor="company" style={labelStyle}>
          {tCommon("form.company.label")}
          <span style={optStyle}>{tCommon("form.company.optional")}</span>
        </label>
        <input type="text" id="company" name="company" autoComplete="organization" style={fieldStyle("company")} />
      </div>

      <div style={fieldBlock}>
        <label htmlFor="website" style={labelStyle}>
          {t("websiteLabel")}
          <span style={optStyle}>{tCommon("form.company.optional")}</span>
        </label>
        <input type="url" id="website" name="website" autoComplete="url" placeholder="https://" style={fieldStyle("website")} />
      </div>

      <div style={fieldBlock}>
        <label htmlFor="message" style={labelStyle}>
          {t("messageLabel")}
          <span style={reqStyle}>{tCommon("form.required")}</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={20}
          rows={6}
          style={{ ...fieldStyle("message"), minHeight: 160, resize: "vertical" }}
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? "message-err" : undefined}
        />
        {fieldErrors.message && (
          <ErrorLine id="message-err">
            {fieldErrors.message === "tooShort" ? tErrors("minLength") : tErrors("required")}
          </ErrorLine>
        )}
      </div>

      <div style={{ marginTop: 28 }}>
        <button
          type="submit"
          disabled={state === "submitting"}
          style={{
            width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center",
            gap: 10, padding: "16px 28px", background: "var(--text-primary)", color: "var(--canvas)",
            fontSize: 15, fontWeight: 500, border: "none", borderRadius: "var(--radius-button)",
            cursor: state === "submitting" ? "not-allowed" : "pointer",
            opacity: state === "submitting" ? 0.6 : 1,
            fontFamily: "inherit",
            transition: "background-color 300ms ease, color 300ms ease",
          }}
        >
          {state === "submitting" ? tActions("sending") : t("submitButton")}
          {state !== "submitting" && <span aria-hidden="true">→</span>}
        </button>
      </div>
    </form>
  );
}
