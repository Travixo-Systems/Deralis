type ConceptItem = {
  num: string;
  title: string;
  description: string;
  linkHref: string;
  linkLabel: string;
};

type ConceptItemsProps = {
  items: ConceptItem[];
};

export default function ConceptItems({ items }: ConceptItemsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-2">
      {items.map((item) => (
        <div
          key={item.num}
          className="pt-6 border-t border-border-warm flex flex-col max-md:pt-5"
        >
          <p className="text-[13px] text-ink-3 font-medium tracking-[0.04em] mb-3">
            {item.num}
          </p>
          <h3 className="text-[20px] font-medium text-ink leading-[1.25] mb-3">
            {item.title}
          </h3>
          <p className="text-[15px] leading-[1.6] text-ink-2 mb-[18px]">
            {item.description}
          </p>
          <a
            href={item.linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink no-underline border-b border-border-warm pb-[3px] self-start mt-auto hover:text-accent hover:border-accent transition-colors"
          >
            {item.linkLabel}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      ))}
    </div>
  );
}
