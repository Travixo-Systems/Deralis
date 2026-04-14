"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type AnimateInProps = {
  children: ReactNode;
  className?: string;
  /** Stagger index for cascading delays (0-based) */
  stagger?: number;
  /** Animation variant */
  variant?: "fade-up" | "fade";
  /** Root margin for IntersectionObserver */
  rootMargin?: string;
};

export default function AnimateIn({
  children,
  className = "",
  stagger = 0,
  variant = "fade-up",
  rootMargin = "-60px",
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  const baseStyle =
    variant === "fade-up"
      ? {
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
          transition: `opacity 0.4s cubic-bezier(0.23, 1, 0.32, 1), transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)`,
          transitionDelay: `${stagger * 60}ms`,
        }
      : {
          opacity: visible ? 1 : 0,
          transition: `opacity 0.4s cubic-bezier(0.23, 1, 0.32, 1)`,
          transitionDelay: `${stagger * 60}ms`,
        };

  return (
    <div ref={ref} className={className} style={baseStyle}>
      {children}
    </div>
  );
}
