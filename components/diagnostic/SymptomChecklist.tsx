"use client";

import { useState } from "react";

type Props = {
  symptoms: string[];
  hint: string;
  /** Responses keyed by how many symptoms are ticked, index 0 unused. */
  counts: [string, string, string];
};

/**
 * The recognition symptoms, as something a reader marks rather than reads.
 *
 * Someone who ticks three of these has effectively diagnosed themselves, and
 * the paid CTA sits directly underneath. The list is a checklist rather than a
 * numbered sequence: these are signs that may or may not apply, not ordered
 * steps, so numbering them invited a question about why one outranks another.
 */
export default function SymptomChecklist({ symptoms, hint, counts }: Props) {
  const [ticked, setTicked] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setTicked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const n = ticked.size;
  const response = n === 0 ? hint : counts[Math.min(n, 3) - 1];

  return (
    <div>
      <ul className="symptom-grid" data-cascade>
        {symptoms.map((s, i) => {
          const on = ticked.has(i);
          return (
            <li key={i} className={`symptom ${on ? "is-ticked" : ""}`}>
              <button
                type="button"
                className="symptom-button"
                aria-pressed={on}
                onClick={() => toggle(i)}
              >
                <span className="symptom-mark" aria-hidden="true" />
                <span className="symptom-text">{s}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* aria-live so the response is announced as the count changes, rather
          than silently updating for anyone not watching the text. */}
      <p className="symptom-response" aria-live="polite">
        {response}
      </p>
    </div>
  );
}
