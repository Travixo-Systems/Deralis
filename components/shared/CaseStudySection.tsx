import { cn } from "@/lib/cn";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

type CaseStudyClosing =
  | { type: "link"; href: string; label: string; external?: boolean }
  | { type: "note"; text: string; link?: { href: string; label: string } };

type CaseStudySectionProps = {
  id?: string;
  label: string;
  title: string;
  context: string;
  prose: string[];
  closing: CaseStudyClosing;
  screenshotAlt: string;
  screenshotSrc?: string;
  screenshotWidth?: number;
  screenshotHeight?: number;
  screenshotPriority?: boolean;
  alignStart?: boolean;
};

export default function CaseStudySection({
  id,
  label,
  title,
  context,
  prose,
  closing,
  screenshotAlt,
  screenshotSrc,
  screenshotWidth,
  screenshotHeight,
  screenshotPriority = false,
  alignStart = false,
}: CaseStudySectionProps) {
  return (
    <section
      id={id}
      className="border-t border-border-default py-[52px] pb-[44px] max-md:py-[42px] max-md:pb-[34px]"
    >
      <div
        className={cn(
          "mx-auto max-w-[1240px] px-6 md:px-12 grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-[72px] max-md:gap-8",
          alignStart ? "items-start" : "items-center"
        )}
      >
        {/* Content */}
        <div>
          <p className="text-[14px] text-ink-label font-semibold tracking-[0.03em] mb-[18px]">
            {label}
          </p>
          <h2 className="text-[40px] font-medium text-ink leading-[1.1] tracking-[-0.02em] mb-5 max-md:text-[28px]">
            {title}
          </h2>
          <p className="text-[14px] font-medium text-ink-2 tracking-[0.01em] mb-6">
            {context}
          </p>
          <div className="max-w-[520px]">
            {prose.map((p, i) => (
              <p
                key={i}
                className={cn(
                  "text-[18px] leading-[1.65] text-ink-2 max-md:text-base",
                  i < prose.length - 1 ? "mb-4" : "mb-7"
                )}
              >
                {p}
              </p>
            ))}
          </div>
          {closing.type === "link" ? (
            closing.external ? (
              <a
                href={closing.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[15px] font-medium text-ink no-underline border-b border-ink pb-[3px] hover:text-accent hover:border-accent transition-colors"
              >
                {closing.label}
                <span aria-hidden="true">→</span>
              </a>
            ) : (
              <Link
                href={closing.href}
                className="inline-flex items-center gap-2 text-[15px] font-medium text-ink no-underline border-b border-ink pb-[3px] hover:text-accent hover:border-accent transition-colors"
              >
                {closing.label}
                <span aria-hidden="true">→</span>
              </Link>
            )
          ) : (
            <div>
              <p className="text-[13px] text-ink-3 leading-[1.6]">
                {closing.text}
              </p>
              {closing.link && (
                <a
                  href={closing.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[15px] font-medium text-ink no-underline border-b border-ink pb-[3px] hover:text-accent hover:border-accent transition-colors mt-4"
                >
                  {closing.link.label}
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          )}
        </div>

        {screenshotSrc ? (
          <div className="bg-white border border-border-warm rounded-[10px] overflow-hidden casestudy-shadow">
            <Image
              src={screenshotSrc}
              alt={screenshotAlt}
              width={screenshotWidth || 800}
              height={screenshotHeight || 500}
              priority={screenshotPriority}
              className="w-full h-auto"
            />
          </div>
        ) : (
          <div className="bg-white border border-border-warm rounded-[10px] overflow-hidden aspect-[16/10] casestudy-shadow flex items-center justify-center">
            <p className="text-[13px] text-ink-3">{screenshotAlt}</p>
          </div>
        )}
      </div>
    </section>
  );
}
