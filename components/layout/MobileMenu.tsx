"use client";

import { Link } from "@/i18n/navigation";
import LanguageToggle from "./LanguageToggle";
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
  ref?: Ref<HTMLDivElement>;
};

export default function MobileMenu({
  open,
  onClose,
  links,
  ref,
}: MobileMenuProps) {
  if (!open) return null;

  return (
    <div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        top: 70,
        right: 14,
        width: "60%",
        maxWidth: 280,
        background: "var(--card-main)",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        padding: "8px 0",
        boxShadow: "var(--card-shadow)",
        zIndex: 100,
        transition: "background-color 450ms ease",
      }}
    >
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {links.map((link) => (
          <li key={link.key}>
            <Link
              href={link.href}
              onClick={onClose}
              style={{
                display: "block",
                fontSize: 15,
                color: "var(--text-primary)",
                textDecoration: "none",
                padding: "11px 18px",
                transition: "background-color 150ms ease",
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div style={{ padding: "10px 14px 14px", borderTop: "1px solid var(--border-soft)" }}>
        <LanguageToggle />
      </div>
    </div>
  );
}
