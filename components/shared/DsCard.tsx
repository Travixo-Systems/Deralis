import type { CSSProperties, ReactNode } from "react";

type DsCardProps = {
  children: ReactNode;
  as?: "section" | "div" | "aside";
  className?: string;
  style?: CSSProperties;
  id?: string;
};

const baseStyle: CSSProperties = {
  maxWidth: 1100,
  margin: "0 auto 22px",
  padding: "var(--pad-card-large)",
  background: "var(--card-main)",
  borderRadius: "var(--radius-card)",
  boxShadow: "var(--card-shadow)",
  color: "var(--text-primary)",
  position: "relative",
  transition: "background-color 450ms ease, color 450ms ease, box-shadow 450ms ease",
};

export default function DsCard({ children, as: Tag = "section", className, style, id }: DsCardProps) {
  return (
    <Tag className={`ds-card ${className || ""}`} style={{ ...baseStyle, ...style }} id={id}>
      {children}
    </Tag>
  );
}

export function DsCardPeak({ children, as: Tag = "section", className, style, id }: DsCardProps) {
  return (
    <Tag
      className={`ds-card-peak ${className || ""}`}
      style={{
        ...baseStyle,
        padding: "var(--pad-card-peak)",
        background: "var(--card-peak)",
        color: "var(--text-on-peak)",
        boxShadow: "var(--peak-shadow)",
        ...style,
      }}
      id={id}
    >
      {children}
    </Tag>
  );
}

export function DsCardPaper({ children, as: Tag = "section", className, style, id }: DsCardProps) {
  return (
    <Tag
      className={`ds-card-paper ${className || ""}`}
      style={{
        ...baseStyle,
        background: "var(--card-paper)",
        boxShadow: "var(--paper-shadow)",
        ...style,
      }}
      id={id}
    >
      {children}
    </Tag>
  );
}

export function DsCardMedium({ children, as: Tag = "section", className, style, id }: DsCardProps) {
  return (
    <Tag
      className={`ds-card ${className || ""}`}
      style={{
        ...baseStyle,
        padding: "var(--pad-card-medium)",
        ...style,
      }}
      id={id}
    >
      {children}
    </Tag>
  );
}

export function DsCardFinal({ children, as: Tag = "section", className, style, id }: DsCardProps) {
  return (
    <Tag
      className={`ds-card ${className || ""}`}
      style={{
        ...baseStyle,
        padding: "var(--pad-card-final)",
        textAlign: "center",
        ...style,
      }}
      id={id}
    >
      {children}
    </Tag>
  );
}
