"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import LanguageToggle from "./LanguageToggle";

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

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <nav className="border-b border-border-default py-[22px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12 flex items-center justify-between gap-4 md:gap-10">
        <Link
          href="/"
          className="flex items-center gap-3 text-ink font-medium text-base tracking-[-0.01em] no-underline"
        >
          <Image
            src="/logo-mark.png"
            alt="Deralis Digital"
            width={32}
            height={32}
            priority
            className="w-8 h-8"
          />
          Deralis Digital
        </Link>

        <ul className="hidden md:flex gap-8 list-none">
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
          {pathname === "/audit" ? (
            <a
              href={process.env.NEXT_PUBLIC_STRIPE_AUDIT_LINK || "#"}
              className="text-[13px] font-medium px-[18px] py-[10px] border border-ink rounded-lg text-ink no-underline hover:bg-ink hover:text-bg transition-colors"
            >
              {tCta("startAuditShort")}
            </a>
          ) : (
            <Link
              href="/audit"
              className="text-[13px] font-medium px-[18px] py-[10px] border border-ink rounded-lg text-ink no-underline hover:bg-ink hover:text-bg transition-colors"
            >
              {tCta("discoverAuditShort")}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
