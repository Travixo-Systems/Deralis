"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

const screenshots = [
  {
    id: "dashboard",
    label: "Dashboard",
    src: "/projects/travixo-dashboard.png",
    alt: "TraviXO Dashboard",
  },
  {
    id: "tables",
    label: "Data Tables",
    src: "/projects/travixo-fleet.png",
    alt: "TraviXO Fleet Management",
  },
  {
    id: "qr",
    label: "QR Codes",
    src: "/projects/travixo-qr.png",
    alt: "TraviXO QR Code Generator",
  },
];

export default function ScreenshotGallery() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const openModal = (src: string) => {
    setActiveImage(src);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className="grid md:grid-cols-3 gap-4">
        {screenshots.map((screenshot) => (
          <button
            key={screenshot.id}
            onClick={() => openModal(screenshot.src)}
            className="rounded-xl overflow-hidden border border-[var(--dd-border)] bg-[var(--dd-bg-card)] text-left group cursor-pointer transition-all hover:border-[var(--dd-accent)] hover:shadow-lg hover:shadow-[var(--dd-accent)]/10"
          >
            {/* Browser chrome */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--dd-border)] bg-[var(--dd-bg)]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <div className="w-2 h-2 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs text-[var(--dd-text-dim)] font-mono">
                  {screenshot.label}
                </span>
              </div>
              <ZoomIn className="w-4 h-4 text-[var(--dd-text-dim)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            {/* Screenshot */}
            <div className="relative overflow-hidden">
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                width={800}
                height={600}
                className="w-full h-auto transition-transform group-hover:scale-105"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Image */}
          <div
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeImage}
              alt="Screenshot preview"
              width={1920}
              height={1080}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>

          {/* Click outside hint */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            Click anywhere to close
          </p>
        </div>
      )}
    </>
  );
}