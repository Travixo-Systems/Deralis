"use client";

import { useEffect, useRef, useState } from "react";
import { useCountUp } from "@/components/frictions/useCountUp";

type CountUpOnViewProps = {
  /** The number to land on. */
  value: number;
  /** Rendered around the counted figure, for example a currency symbol. */
  format?: (n: number) => string;
  className?: string;
};

/**
 * Counts a figure up the first time it scrolls into view.
 *
 * The settled value is what assistive tech reads, and it is also what renders
 * on the server, so the real number is present with or without JavaScript.
 */
export default function CountUpOnView({
  value,
  format = (n) => String(Math.round(n)),
  className,
}: CountUpOnViewProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const current = useCountUp(value, started);

  useEffect(() => {
    const el = ref.current;
    if (!el || started) return;
    if (!("IntersectionObserver" in window)) {
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStarted(true);
        observer.disconnect();
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{format(current)}</span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
}
