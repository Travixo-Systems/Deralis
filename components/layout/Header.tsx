"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Menu, X, ArrowRight, Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image"

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
  const langMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setLangMenuOpen(false);
  }, [pathname]);

  // Close language dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setLangMenuOpen(false);
    setIsOpen(false);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? "bg-[var(--dd-bg)]/95 backdrop-blur-md border-b border-[var(--dd-border)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group z-10">
              <Image src="/logo-mark.png" alt="Deralis Digital" width={40} height={40} />
              <span className="font-semibold text-base sm:text-lg text-[var(--dd-text-main)] group-hover:text-[var(--dd-accent)] transition-colors">
                Deralis Digital
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navKeys.map((key) => (
                <Link
                  key={key}
                  href={navHrefs[key]}
                  className={`text-sm font-medium transition-colors ${
                    pathname === navHrefs[key]
                      ? "text-[var(--dd-accent)]"
                      : "text-[var(--dd-text-muted)] hover:text-[var(--dd-text-main)]"
                  }`}
                >
                  {t(`nav.${key}`)}
                </Link>
              ))}
            </div>

            {/* Right side: Language Switcher + CTA (Desktop) */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language Switcher */}
              <div className="relative" ref={langMenuRef}>
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-[var(--dd-text-muted)] hover:text-[var(--dd-text-main)] hover:bg-[var(--dd-bg-soft)] transition-colors text-sm"
                  aria-label={t("actions.changeLanguage")}
                >
                  <Globe className="w-4 h-4" />
                  <span className="uppercase font-medium">{locale}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${langMenuOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {langMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 bg-[var(--dd-bg-card)] border border-[var(--dd-border)] rounded-lg shadow-lg overflow-hidden min-w-[140px]"
                    >
                      <button
                        onClick={() => switchLocale("fr")}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--dd-bg-soft)] transition-colors flex items-center gap-3 ${
                          locale === "fr" ? "text-[var(--dd-accent)] bg-[var(--dd-accent)]/5" : "text-[var(--dd-text-muted)]"
                        }`}
                      >
                        <span>🇫🇷</span>
                        <span>Français</span>
                      </button>
                      <button
                        onClick={() => switchLocale("en")}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--dd-bg-soft)] transition-colors flex items-center gap-3 ${
                          locale === "en" ? "text-[var(--dd-accent)] bg-[var(--dd-accent)]/5" : "text-[var(--dd-text-muted)]"
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

            {/* Mobile/Tablet Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 -mr-2 text-[var(--dd-text-main)] z-10"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile/Tablet Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={closeMenu}
            />

            {/* Menu Panel */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[var(--dd-bg)] z-50 lg:hidden overflow-y-auto"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 border-b border-[var(--dd-border)]">
                <span className="font-semibold text-[var(--dd-text-main)]">Menu</span>
                <button
                  onClick={closeMenu}
                  className="p-2 -mr-2 text-[var(--dd-text-main)]"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="p-4 sm:p-6">
                {/* Navigation Links */}
                <nav className="space-y-1">
                  {navKeys.map((key) => (
                    <Link
                      key={key}
                      href={navHrefs[key]}
                      onClick={closeMenu}
                      className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                        pathname === navHrefs[key]
                          ? "text-[var(--dd-accent)] bg-[var(--dd-accent)]/10"
                          : "text-[var(--dd-text-muted)] hover:text-[var(--dd-text-main)] hover:bg-[var(--dd-bg-soft)]"
                      }`}
                    >
                      {t(`nav.${key}`)}
                    </Link>
                  ))}
                </nav>

                {/* Language Switcher */}
                <div className="mt-6 pt-6 border-t border-[var(--dd-border)]">
                  <p className="text-xs text-[var(--dd-text-dim)] mb-3 uppercase tracking-wider font-medium">
                    {t("actions.language")}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => switchLocale("fr")}
                      className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        locale === "fr"
                          ? "bg-[var(--dd-accent)]/10 text-[var(--dd-accent)] border-2 border-[var(--dd-accent)]"
                          : "bg-[var(--dd-bg-soft)] text-[var(--dd-text-muted)] border-2 border-transparent hover:border-[var(--dd-border)]"
                      }`}
                    >
                      <span>🇫🇷</span>
                      <span>Français</span>
                    </button>
                    <button
                      onClick={() => switchLocale("en")}
                      className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        locale === "en"
                          ? "bg-[var(--dd-accent)]/10 text-[var(--dd-accent)] border-2 border-[var(--dd-accent)]"
                          : "bg-[var(--dd-bg-soft)] text-[var(--dd-text-muted)] border-2 border-transparent hover:border-[var(--dd-border)]"
                      }`}
                    >
                      <span>🇬🇧</span>
                      <span>English</span>
                    </button>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-6 pt-6 border-t border-[var(--dd-border)]">
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="btn-primary w-full justify-center text-base"
                  >
                    {t("actions.bookCall")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Quick Contact */}
                <div className="mt-6 pt-6 border-t border-[var(--dd-border)]">
                  <p className="text-xs text-[var(--dd-text-dim)] mb-2">
                    {t("footer.contact")}
                  </p>
                  <a
                    href="mailto:contact@deralis.digital"
                    className="text-sm text-[var(--dd-accent)] hover:underline"
                  >
                    contact@deralis.digital
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
