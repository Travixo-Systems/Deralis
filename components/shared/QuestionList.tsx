type QuestionItemData = {
  question: string;
  answer: string;
};

type QuestionListProps = {
  items: QuestionItemData[];
};

export default function QuestionList({ items }: QuestionListProps) {
  return (
    <div className="max-w-[820px]">
      {items.map((item, i) => (
        <div
          key={i}
          className={`py-6 border-t border-border-default max-md:py-5 ${
            i === items.length - 1 ? "border-b border-border-default" : ""
          }`}
        >
          <h3 className="text-[20px] font-medium text-ink leading-[1.35] mb-3 max-md:text-[18px]">
            {item.question}
          </h3>
          <p className="text-base leading-[1.65] text-ink-2 max-w-[720px] max-md:text-[15px]">
            {item.answer}
          </p>
        </div>
      ))}
    </div>
  );
}
