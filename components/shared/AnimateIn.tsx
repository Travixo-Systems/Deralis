"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type AnimateInProps = {
  children: ReactNode;
  className?: string;
  /** Stagger index for cascading arrivals (0-based). */
  stagger?: number;
  /** How many items are in the staggered group, used to cap the cascade. */
  staggerCount?: number;
  variant?: "fade-up" | "fade";
  /** Element to render. Use "li", "article" and friends inside lists or grids. */
  as?: ElementType;
  rootMargin?: string;
  style?: CSSProperties;
};

/** Total time the last item in a group may wait. Beyond this a cascade stops
    reading as sequence and starts reading as lag. */
const MAX_STAGGER_WINDOW_MS = 200;
const STEP_MS = 60;

function staggerDelay(index: number, count?: number): number {
  if (index <= 0) return 0;
  const lastIndex = Math.max(1, (count ?? index + 1) - 1);
  const step = Math.min(STEP_MS, MAX_STAGGER_WINDOW_MS / lastIndex);
  return Math.round(index * step);
}

/** useLayoutEffect warns during SSR. The hide is a browser-only concern, so
    fall back to a no-op on the server. */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Scroll reveal wrapper.
 *
 * Renders visible, so content is readable whenever the JS never arrives,
 * errors, or the observer never fires. There is no hidden server state to
 * recover from and no noscript override to maintain.
 *
 * The hidden state is applied imperatively in a layout effect rather than
 * through render state: React would otherwise paint the visible render before
 * the hiding re-render committed, which is the flash this is meant to avoid.
 *
 * Children are passed through untouched, so a server component wrapped here
 * stays a server component. Only this wrapper ships to the client.
 */
export default function AnimateIn({
  children,
  className = "",
  stagger = 0,
  staggerCount,
  variant = "fade-up",
  as: Tag = "div",
  rootMargin = "-60px",
  style,
}: AnimateInProps) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Already in view on load: leave it visible rather than hiding it only to
    // fade it straight back in. Keeps above-the-fold content still.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    const hidden = variant === "fade-up" ? "translateY(8px)" : "";
    el.style.opacity = "0";
    if (hidden) el.style.transform = hidden;

    const reveal = () => {
      el.style.opacity = "1";
      if (hidden) el.style.transform = "translateY(0)";
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        reveal();
        observer.disconnect();
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      reveal();
    };
  }, [rootMargin, variant]);

  const ease = "cubic-bezier(0.23, 1, 0.32, 1)";

  return (
    <Tag
      ref={ref}
      className={`animate-in-wrap ${className}`.trim()}
      style={{
        opacity: 1,
        transition: `opacity 400ms ${ease}, transform 400ms ${ease}`,
        transitionDelay: `${staggerDelay(stagger, staggerCount)}ms`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
