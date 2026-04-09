type MetaRow = {
  label: string;
  value: string;
  bold?: boolean;
};

type ServiceBlockProps = {
  num: string;
  name: string;
  meta: MetaRow[];
  prose: string[];
  /** Indices of prose paragraphs that contain HTML (e.g. <strong>) and need dangerouslySetInnerHTML */
  richProseIndices?: number[];
  id?: string;
};

export default function ServiceBlock({
  num,
  name,
  meta,
  prose,
  richProseIndices = [],
  id,
}: ServiceBlockProps) {
  const richSet = new Set(richProseIndices);

  return (
    <article
      id={id}
      className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-7 md:gap-16 py-12 md:py-12 border-t border-border-warm items-start"
    >
      {/* Left: metadata */}
      <div className="md:pr-4">
        <p className="text-[13px] text-ink-3 font-medium tracking-[0.04em] mb-3.5">
          {num}
        </p>
        <h3 className="text-[32px] leading-[1.12] font-medium tracking-[-0.02em] text-ink mb-6 max-md:text-[26px]">
          {name}
        </h3>
        <div className="mt-6 border-t border-border-default pt-5">
          {meta.map((row, i) => (
            <div
              key={i}
              className={`flex flex-col gap-1 py-3 ${
                i < meta.length - 1
                  ? "border-b border-border-default"
                  : ""
              } ${i === 0 ? "pt-0" : ""} ${
                i === meta.length - 1 ? "pb-0" : ""
              }`}
            >
              <span className="text-[12px] text-ink-label tracking-[0.04em] font-semibold uppercase">
                {row.label}
              </span>
              <span
                className={`text-[15px] leading-[1.5] text-ink ${
                  row.bold ? "font-medium" : "font-normal"
                }`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: prose */}
      <div>
        {prose.map((p, i) => {
          const cls = `text-[18px] leading-[1.65] text-ink-2 max-md:text-base ${
            i < prose.length - 1 ? "mb-5" : ""
          }`;
          return richSet.has(i) ? (
            <p
              key={i}
              className={cls}
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ) : (
            <p key={i} className={cls}>
              {p}
            </p>
          );
        })}
      </div>
    </article>
  );
}
