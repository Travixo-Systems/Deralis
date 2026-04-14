import type { ReactNode } from "react";

/**
 * Parses a limited set of HTML tags from translation strings into React elements.
 * Supports: <em>, <strong>, <br/>, <span class="hero-sep">, <span class="accent">
 *
 * This replaces dangerouslySetInnerHTML for i18n strings, providing:
 * - Proper React element rendering (screen reader compatible)
 * - No XSS risk from raw HTML injection
 * - Type-safe output
 */
export default function RichText({ html }: { html: string }) {
  return <>{parseRichText(html)}</>;
}

export function parseRichText(html: string): ReactNode[] {
  const result: ReactNode[] = [];
  // Match supported tags: <em>...</em>, <strong>...</strong>, <br/>, <span class="...">...</span>
  const tagRegex =
    /<em>(.*?)<\/em>|<strong>(.*?)<\/strong>|<br\s*\/?>|<span\s+class="([^"]*)">(.*?)<\/span>/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = tagRegex.exec(html)) !== null) {
    // Push text before this match
    if (match.index > lastIndex) {
      result.push(html.slice(lastIndex, match.index));
    }

    if (match[1] !== undefined) {
      // <em>content</em>
      result.push(<em key={key++}>{match[1]}</em>);
    } else if (match[2] !== undefined) {
      // <strong>content</strong>
      result.push(
        <strong key={key++} className="font-medium">
          {match[2]}
        </strong>
      );
    } else if (match[0].startsWith("<br")) {
      // <br/> or <br />
      result.push(<br key={key++} />);
    } else if (match[3] !== undefined && match[4] !== undefined) {
      // <span class="className">content</span>
      result.push(
        <span key={key++} className={match[3]}>
          {match[4]}
        </span>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Push remaining text
  if (lastIndex < html.length) {
    result.push(html.slice(lastIndex));
  }

  return result;
}
