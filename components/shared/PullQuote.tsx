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
        // Capped below the h1 at 52px. At 56px this aside was the largest
        // text on the site, outranking the page title and every section
        // heading, which is what made it read as out of place.
        fontSize: "clamp(30px, 3.4vw, 42px)",
        fontWeight: 400,
        lineHeight: 1.12,
        letterSpacing: "-0.02em",
        margin: "34px 0 36px",
        paddingLeft: 40,
        borderLeft: "4px solid var(--accent)",
        maxWidth: "26ch",
        transition: "color 450ms ease, border-color 450ms ease",
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
