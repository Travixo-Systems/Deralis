"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Menu, X, ArrowRight, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navKeys = ["home", "services", "projects", "about", "contact"] as const;

const navHrefs: Record<typeof navKeys[number], string> = {
  home: "/",
  services: "/services",
  projects: "/projects",
  about: "/about",
  contact: "/contact",
};

export default function Header() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setLangMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--dd-bg)]/90 backdrop-blur-md border-b border-[var(--dd-border)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--dd-grad-from)] to-[var(--dd-grad-to)] flex items-center justify-center font-bold text-[var(--dd-bg)] text-lg">
              D
            </div>
            <span className="font-semibold text-lg text-[var(--dd-text-main)] group-hover:text-[var(--dd-accent)] transition-colors">
              Deralis Digital
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navKeys.map((key) => (
              <Link
                key={key}
                href={navHrefs[key]}
                className="text-[var(--dd-text-muted)] hover:text-[var(--dd-text-main)] transition-colors text-sm font-medium"
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
          </div>

          {/* Right side: Language Switcher + CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[var(--dd-text-muted)] hover:text-[var(--dd-text-main)] hover:bg-[var(--dd-bg-soft)] transition-colors text-sm"
                aria-label="Change language"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase font-medium">{locale}</span>
              </button>

              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 bg-[var(--dd-bg-card)] border border-[var(--dd-border)] rounded-lg shadow-lg overflow-hidden min-w-[120px]"
                  >
                    <button
                      onClick={() => switchLocale("fr")}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-[var(--dd-bg-soft)] transition-colors flex items-center gap-2 ${
                        locale === "fr" ? "text-[var(--dd-accent)]" : "text-[var(--dd-text-muted)]"
                      }`}
                    >
                      <span>🇫🇷</span>
                      <span>Français</span>
                    </button>
                    <button
                      onClick={() => switchLocale("en")}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-[var(--dd-bg-soft)] transition-colors flex items-center gap-2 ${
                        locale === "en" ? "text-[var(--dd-accent)]" : "text-[var(--dd-text-muted)]"
                      }`}
                    >
                      <span>🇬🇧</span>
                      <span>English</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="btn-primary text-sm"
            >
              {t("actions.bookCall")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[var(--dd-text-main)]"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 border-t border-[var(--dd-border)]">
                {navKeys.map((key) => (
                  <Link
                    key={key}
                    href={navHrefs[key]}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 px-4 text-[var(--dd-text-muted)] hover:text-[var(--dd-text-main)] hover:bg-[var(--dd-bg-soft)] rounded-lg transition-colors"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                ))}

                {/* Mobile Language Switcher */}
                <div className="px-4 pt-4 border-t border-[var(--dd-border)]">
                  <p className="text-xs text-[var(--dd-text-dim)] mb-2 uppercase tracking-wider">
                    Language
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        switchLocale("fr");
                        setIsOpen(false);
                      }}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        locale === "fr"
                          ? "bg-[var(--dd-accent)]/10 text-[var(--dd-accent)] border border-[var(--dd-accent)]"
                          : "bg-[var(--dd-bg-soft)] text-[var(--dd-text-muted)] border border-[var(--dd-border)]"
                      }`}
                    >
                      🇫🇷 FR
                    </button>
                    <button
                      onClick={() => {
                        switchLocale("en");
                        setIsOpen(false);
                      }}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        locale === "en"
                          ? "bg-[var(--dd-accent)]/10 text-[var(--dd-accent)] border border-[var(--dd-accent)]"
                          : "bg-[var(--dd-bg-soft)] text-[var(--dd-text-muted)] border border-[var(--dd-border)]"
                      }`}
                    >
                      🇬🇧 EN
                    </button>
                  </div>
                </div>

                <div className="pt-4 px-4">
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary w-full text-center"
                  >
                    {t("actions.bookCall")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
