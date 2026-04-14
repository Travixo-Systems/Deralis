import type { CSSProperties } from "react";

type PullQuoteProps = {
  html: string;
  style?: CSSProperties;
};

export default function PullQuote({ html, style }: PullQuoteProps) {
  return (
    <blockquote
      className="pull-quote"
      style={{
        fontFamily: "var(--font-fraunces), Georgia, serif",
        fontSize: "clamp(40px, 5vw, 56px)",
        fontWeight: 400,
        lineHeight: 1.08,
        letterSpacing: "-0.025em",
        margin: "68px 0 72px",
        paddingLeft: 40,
        borderLeft: "4px solid var(--accent)",
        maxWidth: "20ch",
        transition: "color 450ms ease, border-color 450ms ease",
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
