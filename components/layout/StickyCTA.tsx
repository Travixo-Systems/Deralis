"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/** Routes where a persistent prompt would be noise or a duplicate. */
const SUPPRESSED = ["/diagnostic", "/contact", "/legal", "/privacy", "/terms"];

/**
 * A compact prompt that slides in once the hero has scrolled away.
 *
 * Pages here run to six screens or more, so a reader who decides halfway down
 * would otherwise have to scroll back to act. It is dismissible, and a
 * dismissal is remembered for the session so it cannot become nagging.
 */
export default function StickyCTA() {
  const t = useTranslations("common.actions");
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const sentinel = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (dismissed) return;

    // The session flag is read here rather than in a state initialiser: the
    // server cannot see sessionStorage, and seeding state from it would make
    // the first client render disagree with the server output. A dismissal
    // simply means the bar never becomes visible, which avoids writing state
    // synchronously in the effect body.
    let stored = false;
    try {
      stored = sessionStorage.getItem("deralis-cta-dismissed") === "1";
    } catch {
      stored = false;
    }
    if (stored) return;

    // A sentinel that spans the top of the document down to one and a half
    // screens. While any of it is on screen the hero region is still in view;
    // once it has scrolled entirely above, the prompt is worth showing.
    //
    // The sentinel has real height on purpose. A one pixel marker combined
    // with a collapsed rootMargin produces a degenerate root box that never
    // reports a second crossing, so the bar would arm once and never appear.
    const el = document.createElement("div");
    el.style.cssText =
      "position:absolute;top:0;left:0;width:1px;height:140vh;pointer-events:none;visibility:hidden;";
    document.body.appendChild(el);
    sentinel.current = el;

    if (!("IntersectionObserver" in window)) {
      el.remove();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      el.remove();
    };
  }, [dismissed, pathname]);

  if (dismissed) return null;
  if (SUPPRESSED.some((r) => pathname.startsWith(r))) return null;

  return (
    <div className={`sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <Link
        href="/diagnostic"
        className="sticky-cta-link cta-press"
        tabIndex={visible ? 0 : -1}
      >
        {t("discoverDiagnostic")}
      </Link>
      <button
        type="button"
        className="sticky-cta-close"
        aria-label={t("dismiss")}
        tabIndex={visible ? 0 : -1}
        onClick={() => {
          setDismissed(true);
          try {
            sessionStorage.setItem("deralis-cta-dismissed", "1");
          } catch {
            // A blocked storage API is not a reason to keep showing the bar.
          }
        }}
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}
