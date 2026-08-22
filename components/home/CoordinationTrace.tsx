"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Segment endpoints in viewBox units, matching the paths in the figure. */
const SEGMENTS = [
  { from: 128, to: 232, index: 1 },
  { from: 308, to: 412, index: 2 },
  { from: 488, to: 592, index: 3 },
];

/** Diamond centres, and the segment that has to complete before each fills. */
const NODES = [
  { x: 90, after: null },
  { x: 270, after: 1 },
  { x: 450, after: 2 },
  { x: 630, after: 3 },
];

const VIEWBOX_WIDTH = 720;
const DOT_PARKED = -100;
/** How close, in viewBox units, the marker gets before a diamond absorbs it. */
const ABSORB_RADIUS = 30;

/**
 * Lets the pointer draw the figure.
 *
 * The request marker follows the cursor along the row, the line behind it
 * fills with accent colour, and each diamond fills once the segment leading
 * into it is complete. Leaving the figure returns it to its resting state.
 *
 * Written against the DOM rather than through React state: this runs on every
 * pointer move, and re-rendering an SVG at that rate would be wasteful. The
 * drawing itself stays a server component; only this behaviour is client side.
 */
export default function CoordinationTrace({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const svg = host.querySelector("svg");
    if (!svg) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // No media query gate here on purpose. Gating on any-pointer: fine meant a
    // tablet reported as touch capable never bound the trace at all, so a
    // tablet driven by a mouse or a trackpad got hollow diamonds, grey lines
    // and no cursor following, while the same hardware on a desktop viewport
    // got the full effect. Whether a pointer can trace is a property of the
    // pointer, not of the device, so it is decided per event below: a mouse or
    // a pen traces, a finger scrolls.
    //
    // The traced class, which switches the scroll driven fill off, is only
    // applied once a real cursor actually arrives, so a touch only visitor
    // keeps the scroll animation untouched.

    const dot = svg.querySelector<SVGPathElement>(".dot");
    const fills = SEGMENTS.map((s) =>
      svg.querySelector<SVGPathElement>(`.link-fill-${s.index}`)
    );
    const shapes = NODES.map((n) =>
      svg.querySelector<SVGPathElement>(`.coord-node-${n.x} .node, .coord-node-${n.x} .stall-node`)
    );

    const setSegment = (el: SVGPathElement | null, ratio: number) => {
      if (!el) return;
      const length = el.getTotalLength();
      el.style.strokeDasharray = `${length}`;
      el.style.strokeDashoffset = `${length * (1 - ratio)}`;
    };

    const paint = (viewX: number) => {
      SEGMENTS.forEach((seg, i) => {
        const span = seg.to - seg.from;
        const ratio = Math.min(1, Math.max(0, (viewX - seg.from) / span));
        setSegment(fills[i], ratio);
      });

      // The nearest diamond the marker is currently inside, if any.
      let absorbing: number | null = null;
      NODES.forEach((node, i) => {
        const el = shapes[i];
        if (!el) return;
        const reached = viewX >= node.x - 4;
        el.classList.toggle("is-traced", reached);
        if (Math.abs(viewX - node.x) <= ABSORB_RADIUS) absorbing = i;
      });

      shapes.forEach((el, i) => el?.classList.toggle("is-absorbing", absorbing === i));

      if (dot) {
        const clamped = Math.min(VIEWBOX_WIDTH, Math.max(0, viewX));
        // Snap to the centre while being absorbed, so the marker disappears
        // into the diamond rather than passing across it.
        const x = absorbing === null ? clamped : NODES[absorbing].x;
        dot.style.transform = `translate(${x}px, 66px)`;
        dot.classList.toggle("is-absorbed", absorbing !== null);
      }
    };

    const reset = () => {
      SEGMENTS.forEach((_, i) => setSegment(fills[i], 0));
      shapes.forEach((el) => {
        el?.classList.remove("is-traced");
        el?.classList.remove("is-absorbing");
      });
      if (dot) {
        dot.classList.remove("is-absorbed");
        dot.style.transform = `translate(${DOT_PARKED}px, 66px)`;
      }
    };

    const onMove = (event: PointerEvent) => {
      // A touch drag is the reader scrolling the page, not tracing the figure.
      if (event.pointerType === "touch") return;
      const rect = svg.getBoundingClientRect();
      if (rect.width === 0) return;
      arm();
      paint(((event.clientX - rect.left) / rect.width) * VIEWBOX_WIDTH);
    };

    // Applied on first cursor contact rather than on mount, so a device that
    // only ever receives touch keeps its scroll driven animation.
    let armed = false;
    const arm = () => {
      if (armed) return;
      armed = true;
      host.classList.add("is-traced-host");
      reset();
    };

    const onLeave = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      reset();
    };

    svg.addEventListener("pointermove", onMove);
    svg.addEventListener("pointerleave", onLeave);
    return () => {
      svg.removeEventListener("pointermove", onMove);
      svg.removeEventListener("pointerleave", onLeave);
      host.classList.remove("is-traced-host");
    };
  }, []);

  return (
    <div ref={ref} className="coord-trace">
      {children}
    </div>
  );
}
