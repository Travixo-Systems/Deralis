import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-[720px] mb-10", className)}>
      <p className="text-[14px] text-ink-label font-semibold tracking-[0.03em] mb-4">
        {eyebrow}
      </p>
      <h2
        className="section-title text-[40px] font-medium text-ink leading-[1.1] tracking-[-0.02em] mb-4 max-md:text-[28px]"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {intro && (
        <p className="text-[18px] text-ink-2 leading-[1.6] max-w-[620px] max-md:text-base">
          {intro}
        </p>
      )}
    </div>
  );
}
