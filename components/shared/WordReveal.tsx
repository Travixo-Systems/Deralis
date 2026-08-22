import type { ReactNode } from "react";

type WordRevealProps = {
  children: string;
  className?: string;
};

/**
 * Splits text into words that lift out of their own line box on scroll.
 *
 * A server component: the split happens at render time and the motion is
 * entirely CSS, so this ships no JavaScript.
 *
 * The text appears exactly once in the DOM. An earlier version carried a
 * visually hidden duplicate for assistive tech, which made a copied headline
 * arrive twice. Instead the parent heading takes an aria-label with the whole
 * string, and the split spans are hidden from the accessibility tree, so the
 * line is announced once and copied once.
 */
export default function WordReveal({
  children,
  className = "",
}: WordRevealProps): ReactNode {
  const words = children.split(" ");

  return (
    <span className={className} aria-hidden="true">
      {words.map((word, i) => (
        <span className="word-reveal" key={`${word}-${i}`}>
          <span>{word}</span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}
