"use client";

import { useEffect } from "react";

const CALENDLY_URL = "https://calendly.com/deralisdigital/30min";

interface CalendlyButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function CalendlyButton({ children, className, onClick }: CalendlyButtonProps) {
  useEffect(() => {
    // Load Calendly widget CSS once
    if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    // Load Calendly widget JS once
    if (!document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const openCalendly = () => {
    onClick?.();
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).Calendly) {
      (window as unknown as Record<string, { initPopupWidget: (opts: { url: string }) => void }>).Calendly.initPopupWidget({
        url: CALENDLY_URL,
      });
    }
  };

  return (
    <button type="button" className={className} onClick={openCalendly}>
      {children}
    </button>
  );
}
