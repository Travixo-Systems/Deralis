"use client";

import { Link } from "@/i18n/navigation";
import type { Ref } from "react";

type NavLink = {
  href: string;
  key: string;
  label: string;
};

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  links: ReadonlyArray<NavLink>;
  ctaHref: string;
  ctaLabel: string;
  ctaIsExternal: boolean;
  ref?: Ref<HTMLDivElement>;
};

export default function MobileMenu({
  open,
  onClose,
  links,
  ctaHref,
  ctaLabel,
  ctaIsExternal,
  ref,
}: MobileMenuProps) {
  if (!open) return null;

  return (
    <div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      className="lg:hidden absolute top-[58px] right-[14px] w-[58%] sm:top-[64px] sm:right-[22px] sm:w-[42%] bg-[#FBF8EF] rounded-[10px] overflow-hidden pt-2 shadow-[0_10px_30px_-12px_rgba(20,17,13,0.12)] z-50"
    >
      <ul className="list-none">
        {links.map((link) => (
          <li key={link.key}>
            <Link
              href={link.href}
              onClick={onClose}
              className="block text-[15px] text-ink no-underline py-[11px] px-[18px] hover:bg-[rgba(20,17,13,0.03)] transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="px-[14px] pt-[10px] pb-[14px]">
        {ctaIsExternal ? (
          <a
            href={ctaHref}
            onClick={onClose}
            className="block w-full text-center bg-ink text-bg text-[13px] font-medium py-[11px] rounded-lg no-underline"
          >
            {ctaLabel}
          </a>
        ) : (
          <Link
            href={ctaHref}
            onClick={onClose}
            className="block w-full text-center bg-ink text-bg text-[13px] font-medium py-[11px] rounded-lg no-underline"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
