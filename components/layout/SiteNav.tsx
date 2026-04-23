"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MobileMenu from "./MobileMenu";
import type { CSSProperties } from "react";

const navItems = [
  { href: "/methode", key: "methode" },
  { href: "/projects", key: "projects" },
  { href: "/blog", key: "blog" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export default function SiteNav() {
  const t = useTranslations("common.nav");
  const tActions = useTranslations("common.actions");
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onMouseDown(e: MouseEvent) {
      const target = e.target as Node;
      if (menuRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [open]);

  const mobileLinks = navItems.map(({ href, key }) => ({
    href,
    key,
    label: t(key),
  }));

  function switchLocale(nextLocale: "fr" | "en") {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <header style={headerStyle}>
      <div style={innerStyle}>
        {/* Logo + wordmark */}
        <Link href="/" style={logoLink}>
          <Image
            src="/logo-mark.png"
            alt=""
            width={22}
            height={22}
            priority
            style={{ width: 22, height: 22, borderRadius: 4, display: "block" }}
          />
          <span style={wordmark}>Deralis Digital</span>
        </Link>

        {/* Right cluster: nav + locale + audit pill */}
        <div style={rightCluster} className="nav-cluster-desktop">
          <nav style={navLinks}>
            {navItems.map(({ href, key }) => {
              const active = isActive(href);
              return (
                <Link
                  key={key}
                  href={href}
                  style={{
                    ...navLink,
                    color: active ? "var(--text-primary)" : "var(--text-secondary)",
                    borderBottom: active ? "2px solid var(--accent)" : "2px solid transparent",
                  }}
                >
                  {t(key)}
                </Link>
              );
            })}
          </nav>

          {/* Locale switcher */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button
              onClick={() => switchLocale("fr")}
              style={{ ...localeBtn, color: locale === "fr" ? "var(--text-primary)" : "var(--text-muted)" }}
              aria-label="Français"
              aria-pressed={locale === "fr"}
            >
              FR
            </button>
            <span style={{ color: "var(--text-muted)", fontSize: 12 }} aria-hidden="true">/</span>
            <button
              onClick={() => switchLocale("en")}
              style={{ ...localeBtn, color: locale === "en" ? "var(--text-primary)" : "var(--text-muted)" }}
              aria-label="English"
              aria-pressed={locale === "en"}
            >
              EN
            </button>
          </div>

          {/* Audit pill */}
          <Link href="/audit" style={auditPill} className="audit-pill">
            {tActions("discoverAudit")}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="nav-hamburger-mobile"
          style={hamburgerStyle}
        >
          <span
            style={{
              position: "absolute", left: 12, width: 20, height: 1.5, top: 18,
              background: "var(--text-primary)",
              transition: "transform 200ms ease, background-color 450ms ease",
              transform: open ? "translateY(3px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              position: "absolute", left: 12, width: 20, height: 1.5, top: 24,
              background: "var(--text-primary)",
              transition: "transform 200ms ease, background-color 450ms ease",
              transform: open ? "translateY(-3px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      <MobileMenu
        ref={menuRef}
        open={open}
        onClose={() => setOpen(false)}
        links={mobileLinks}
      />
    </header>
  );
}

const headerStyle: CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 100,
  background: "var(--card-main)",
  borderBottom: "1px solid var(--border-soft)",
  padding: "22px 0",
  transition: "background-color 450ms ease, border-color 450ms ease",
};

const innerStyle: CSSProperties = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "0 28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const logoLink: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  padding: "12px 16px",
  margin: "-12px -16px",
  textDecoration: "none",
  borderRadius: 6,
};

const wordmark: CSSProperties = {
  fontFamily: "var(--font-ibm-plex-sans), sans-serif",
  fontSize: 15,
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: "var(--text-primary)",
  transition: "color 450ms ease",
};

const rightCluster: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 32,
};

const navLinks: CSSProperties = {
  display: "flex",
  gap: 28,
  alignItems: "center",
};

const navLink: CSSProperties = {
  fontFamily: "var(--font-ibm-plex-sans), sans-serif",
  fontSize: 14,
  fontWeight: 500,
  letterSpacing: "0.01em",
  textDecoration: "none",
  paddingBottom: 4,
  transition: "color 200ms ease, border-color 200ms ease",
};

const localeBtn: CSSProperties = {
  fontFamily: "var(--font-ibm-plex-sans), sans-serif",
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "14px 10px",
  margin: "-14px -4px",
  transition: "color 200ms ease",
};

const auditPill: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "10px 20px",
  background: "transparent",
  color: "var(--text-primary)",
  border: "1px solid var(--text-primary)",
  borderRadius: 100,
  fontFamily: "var(--font-ibm-plex-sans), sans-serif",
  fontSize: 13,
  fontWeight: 500,
  textDecoration: "none",
  transition: "background-color 200ms ease, color 200ms ease, border-color 450ms ease",
};

const hamburgerStyle: CSSProperties = {
  position: "relative",
  width: 44,
  height: 44,
  flexShrink: 0,
  margin: "-12px",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
};
