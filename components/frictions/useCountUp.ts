"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 600;

/** Ease-out cubic: fast start, settled landing. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Counts from zero to `target` over roughly 600ms.
 *
 * Returns the final value immediately under reduced motion or when disabled,
 * and always settles exactly on `target` rather than on an interpolated
 * approximation, so the figure a reader ends up looking at is the computed one.
 */
export function useCountUp(target: number, enabled = true): number {
  // Progress rather than a value, so the animated and settled cases cannot
  // disagree about the final number: 1 always means exactly `target`.
  const [progress, setProgress] = useState(1);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!enabled || target === 0 || prefersReducedMotion()) return;

    let start: number | null = null;

    // The zero point is set inside the first frame rather than in the effect
    // body: a synchronous set here would cascade an extra render before the
    // browser ever paints.
    const tick = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start;

      if (elapsed >= DURATION_MS) {
        setProgress(1);
        return;
      }

      setProgress(easeOut(elapsed / DURATION_MS));
      frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);

    // Backstop. Background tabs and throttled environments can starve
    // requestAnimationFrame, which would otherwise leave the figure parked
    // short of the real number. The count is decoration; the value is not.
    const settle = setTimeout(() => setProgress(1), DURATION_MS + 120);

    return () => {
      if (frame.current !== undefined) cancelAnimationFrame(frame.current);
      clearTimeout(settle);
      setProgress(1);
    };
  }, [target, enabled]);

  return progress >= 1 ? target : target * progress;
}
