"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Elements to light in turn, as a selector within this wrapper. */
  stepSelector: string;
  /** Class applied to the element currently being demonstrated. */
  activeClass?: string;
  /** How long each step stays lit. */
  holdMs?: number;
  /** Gap between one step going out and the next coming on. */
  gapMs?: number;
  /** Pause before the sequence starts, after the section arrives. */
  startDelayMs?: number;
  /** Fraction of the block that must be visible before it plays. */
  threshold?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Plays a hover state by itself, once, when the block reaches the screen.
 *
 * Some of what this site explains is only visible if you point at it, which
 * leaves the explanation to visitors with a mouse and to nobody on a phone.
 * This walks the same states automatically so the sequence is shown rather
 * than waiting to be discovered, then clears, leaving the block in its normal
 * resting state for anyone who then wants to explore it themselves.
 */
export default function AutoDemo({
  children,
  stepSelector,
  activeClass = "is-auto-active",
  holdMs = 900,
  gapMs = 160,
  startDelayMs = 400,
  threshold = 0.4,
  className,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const steps = [...host.querySelectorAll<HTMLElement>(stepSelector)];
    if (!steps.length) return;

    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    const run = async () => {
      await wait(startDelayMs);
      for (const step of steps) {
        if (cancelled) return;
        step.classList.add(activeClass);
        await wait(holdMs);
        if (cancelled) return;
        step.classList.remove(activeClass);
        await wait(gapMs);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { threshold }
    );
    observer.observe(host);

    return () => {
      cancelled = true;
      observer.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
      steps.forEach((s) => s.classList.remove(activeClass));
    };
  }, [stepSelector, activeClass, holdMs, gapMs, startDelayMs, threshold]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
