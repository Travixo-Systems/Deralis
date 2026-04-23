import type { CSSProperties, ReactNode } from "react";

type TabLabelProps = {
  children: ReactNode;
  variant?: "default" | "on-peak" | "status-ok" | "accent";
  heroSize?: boolean;
  style?: CSSProperties;
};

export default function TabLabel({ children, variant = "default", heroSize = false, style }: TabLabelProps) {
  const base: CSSProperties = {
    position: "absolute",
    top: -11,
    left: 32,
    padding: "3px 14px",
    fontFamily: "var(--font-ibm-plex-sans), sans-serif",
    fontSize: heroSize ? 11 : 10,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    borderRadius: "var(--radius-pill)",
    zIndex: 10,
    transition: "background-color 450ms ease, color 450ms ease, border-color 450ms ease",
  };

  const variants: Record<string, CSSProperties> = {
    default: {
      background: "var(--card-main)",
      color: "var(--text-muted)",
      border: "1px solid var(--border-strong)",
    },
    "on-peak": {
      background: "var(--canvas)",
      color: "var(--text-muted)",
      border: "1px solid var(--border-strong)",
    },
    "status-ok": {
      background: "var(--status-ok)",
      color: "var(--text-on-status)",
      border: "none",
    },
    accent: {
      background: "var(--accent)",
      color: "var(--card-paper)",
      border: "none",
    },
  };

  return (
    <span style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </span>
  );
}
