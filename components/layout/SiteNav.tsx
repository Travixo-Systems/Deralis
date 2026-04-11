"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LanguageToggle from "./LanguageToggle";
import MobileMenu from "./MobileMenu";

const navItems = [
  { href: "/services", key: "services" },
  { href: "/projects", key: "projects" },
  { href: "/blog", key: "blog" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export default function SiteNav() {
  const t = useTranslations("common.nav");
  const tCta = useTranslations("common.actions");
  const pathname = usePathname();

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

  const isAuditPage = pathname === "/audit";
  const ctaHref = isAuditPage
    ? process.env.NEXT_PUBLIC_STRIPE_AUDIT_LINK || "#"
    : "/audit";
  const ctaLabel = isAuditPage
    ? tCta("startAuditShort")
    : tCta("discoverAuditShort");

  const mobileLinks = navItems.map(({ href, key }) => ({
    href,
    key,
    label: t(key),
  }));

  return (
    <nav className="relative border-b border-border-default py-[22px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12 flex items-center justify-between gap-4 lg:gap-10">
        <Link
          href="/"
          className="flex items-center gap-3 text-ink font-medium text-base tracking-[-0.01em] no-underline"
        >
          <Image
            src="/logo-mark.png"
            alt="Deralis Digital"
            width={36}
            height={36}
            priority
            className="w-9 h-9"
          />
          Deralis Digital
        </Link>

        <ul className="hidden lg:flex gap-8 list-none">
          {navItems.map(({ href, key }) => (
            <li key={key}>
              <Link
                href={href}
                className={`text-sm no-underline transition-colors ${
                  isActive(href)
                    ? "text-ink font-medium"
                    : "text-ink-2 hover:text-ink"
                }`}
              >
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <LanguageToggle />

          <div className="hidden lg:block">
            {isAuditPage ? (
              <a
                href={ctaHref}
                className="text-[13px] font-medium px-[18px] py-[10px] border border-ink rounded-lg text-ink no-underline hover:bg-ink hover:text-bg transition-colors"
              >
                {ctaLabel}
              </a>
            ) : (
              <Link
                href={ctaHref}
                className="text-[13px] font-medium px-[18px] py-[10px] border border-ink rounded-lg text-ink no-underline hover:bg-ink hover:text-bg transition-colors"
              >
                {ctaLabel}
              </Link>
            )}
          </div>

          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="lg:hidden relative w-[18px] sm:w-[22px] h-[14px] flex-shrink-0"
          >
            <span
              className={`absolute left-0 w-full h-[1.5px] bg-ink transition-all duration-200 ${
                open ? "top-[6px] rotate-45" : "top-[3px]"
              }`}
            />
            <span
              className={`absolute left-0 w-full h-[1.5px] bg-ink transition-all duration-200 ${
                open ? "top-[6px] -rotate-45" : "top-[9px]"
              }`}
            />
          </button>
        </div>
      </div>

      <MobileMenu
        ref={menuRef}
        open={open}
        onClose={() => setOpen(false)}
        links={mobileLinks}
        ctaHref={ctaHref}
        ctaLabel={ctaLabel}
        ctaIsExternal={isAuditPage}
      />
    </nav>
  );
}
