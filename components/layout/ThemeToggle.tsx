"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type Props = {
  className?: string;
  style?: CSSProperties;
  mobileEdgeMode?: boolean;
};

export default function ThemeToggle({
  className,
  style,
  mobileEdgeMode = false,
}: Props) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("deralis-theme");
    const initial =
      stored === "dark" || stored === "light" ? stored : "light";

    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
    setMounted(true);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("deralis-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  if (!mounted) return null;

  const targetLabel =
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  const icon = theme === "dark" ? "☀" : "☾";

  if (mobileEdgeMode) {
    return (
      <button
        onClick={toggle}
        aria-label={targetLabel}
        className={className}
        style={{
          width: 72,
          height: 44,
          padding: 0,
          background: "var(--card-main)",
          border: "1px solid var(--border-strong)",
          borderRadius: "999px 0 0 999px",
          color: "var(--text-primary)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: 18,
          boxShadow: "var(--card-shadow)",
          transition:
            "background-color 450ms ease, color 450ms ease, border-color 450ms ease, transform 150ms ease",
          ...style,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            fontSize: 18,
            lineHeight: 1,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 16,
          }}
        >
          {icon}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={targetLabel}
      className={className}
      style={{
        padding: "10px 18px 10px 14px",
        background: "var(--card-main)",
        border: "1px solid var(--border-strong)",
        borderRadius: 100,
        color: "var(--text-primary)",
        fontFamily: "var(--font-ibm-plex-sans), sans-serif",
        fontSize: 12,
        fontWeight: 500,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 10,
        boxShadow: "var(--card-shadow)",
        transition:
          "background-color 450ms ease, color 450ms ease, border-color 450ms ease, transform 150ms ease",
        ...style,
      }}
    >
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "var(--text-primary)",
          position: "relative",
          overflow: "hidden",
          transition: "background-color 450ms ease",
          display: "inline-block",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: -1,
            right: -1,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--card-main)",
            transition: "background-color 450ms ease",
          }}
        />
      </span>
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}