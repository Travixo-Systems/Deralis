"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const t = useTranslations("common");

  const navigationLinks = [
    { href: "/", key: "home" },
    { href: "/services", key: "services" },
    { href: "/projects", key: "projects" },
    { href: "/about", key: "about" },
    { href: "/contact", key: "contact" },
  ];

  const serviceLinks = [
    { href: "/services#consulting", key: "consulting" },
    { href: "/services#development", key: "development" },
    { href: "/services#ai", key: "ai" },
    { href: "/services#automation", key: "automation" },
  ];

  const serviceLabels = {
    consulting: t("nav.services") === "Services" ? "Strategic Consulting" : "Conseil stratégique",
    development: t("nav.services") === "Services" ? "Web Development" : "Développement web",
    ai: t("nav.services") === "Services" ? "AI Integration" : "Intégration IA",
    automation: t("nav.services") === "Services" ? "Automation" : "Automatisation",
  };

  const legalLinks = [
    { href: "/privacy", label: t("legal.privacy") },
    { href: "/terms", label: t("legal.terms") },
    { href: "/legal", label: t("legal.legalNotice") },
  ];

  return (
    <footer className="bg-[var(--dd-bg-soft)] border-t border-[var(--dd-border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--dd-grad-from)] to-[var(--dd-grad-to)] flex items-center justify-center font-bold text-[var(--dd-bg)] text-lg">
                D
              </div>
              <span className="font-semibold text-lg text-[var(--dd-text-main)]">
                Deralis Digital
              </span>
            </Link>
            <p className="text-[var(--dd-text-muted)] text-sm mb-6 leading-relaxed">
              {t("footer.tagline")}
              <br />
              {t("footer.subtagline")}
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/deralis"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] flex items-center justify-center text-[var(--dd-text-muted)] hover:text-[var(--dd-accent)] hover:border-[var(--dd-accent)] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/deralis"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] flex items-center justify-center text-[var(--dd-text-muted)] hover:text-[var(--dd-accent)] hover:border-[var(--dd-accent)] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/deralisdigital"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] flex items-center justify-center text-[var(--dd-text-muted)] hover:text-[var(--dd-accent)] hover:border-[var(--dd-accent)] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="font-semibold text-[var(--dd-text-main)] mb-4 text-base">
              {t("footer.navigation")}
            </h2>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--dd-text-muted)] hover:text-[var(--dd-text-main)] text-sm transition-colors"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="font-semibold text-[var(--dd-text-main)] mb-4 text-base">
              {t("footer.services")}
            </h2>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--dd-text-muted)] hover:text-[var(--dd-text-main)] text-sm transition-colors"
                  >
                    {serviceLabels[link.key as keyof typeof serviceLabels]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-semibold text-[var(--dd-text-main)] mb-4 text-base">
              {t("footer.contact")}
            </h2>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:contact@deralis.digital"
                  className="flex items-center gap-3 text-[var(--dd-text-muted)] hover:text-[var(--dd-text-main)] text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 text-[var(--dd-accent)]" />
                  contact@deralis.digital
                </a>
              </li>
              <li>
                <a
                  href="tel:+33600000000"
                  className="flex items-center gap-3 text-[var(--dd-text-muted)] hover:text-[var(--dd-text-main)] text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-[var(--dd-accent)]" />
                  +33 6 00 00 00 00
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-[var(--dd-text-muted)] text-sm">
                  <MapPin className="w-4 h-4 text-[var(--dd-accent)] mt-0.5" />
                  <span>{t("footer.locationShort")}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[var(--dd-border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--dd-text-dim)] text-sm">
            © {new Date().getFullYear()} Deralis Digital. {t("footer.rights")}
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--dd-text-dim)] hover:text-[var(--dd-text-muted)] text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
