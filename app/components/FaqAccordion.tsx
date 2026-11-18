type FaqAnswerGroup = {
  heading: string;
  lines: readonly string[];
};

export type FaqQuestion = {
  id: string;
  question: string;
  answer: string | readonly (string | FaqAnswerGroup)[];
};

type FaqAccordionProps = {
  questions: readonly FaqQuestion[];
  name: string;
  idPrefix?: string;
  initiallyOpenId?: string;
  answerSize?: "default" | "large";
  questionStyle?: "heading" | "body";
};

export default function FaqAccordion({
  questions,
  name,
  idPrefix = "faq",
  initiallyOpenId,
  answerSize = "default",
  questionStyle = "heading",
}: FaqAccordionProps) {
  return questions.map((item) => {
    const questionId = `${idPrefix}-${item.id}-question`;
    const answerId = `${idPrefix}-${item.id}-answer`;
    const paragraphs = typeof item.answer === "string" ? [item.answer] : item.answer;

    return (
      <details key={item.id} name={name} open={item.id === initiallyOpenId} className="group">
        <summary
          id={questionId}
          aria-controls={answerId}
          className={`flex cursor-pointer list-none items-start justify-between gap-5 rounded-md px-2.5 py-[15px] ${questionStyle === "body" ? "font-sans text-lg leading-8 font-semibold tracking-[0.3px] text-[#545454]" : "font-heading text-lg leading-8 font-normal tracking-[0.3px] text-[#2b2b2b]"} group-open:text-[#0e92ba] tablet:text-xl [&::-webkit-details-marker]:hidden`}
        >
          <span>{item.question}</span>
          <svg className="mt-1.5 size-5 shrink-0 fill-current" viewBox="0 0 448 512" aria-hidden="true">
            {/* Original plus/minus paths from the saved MuseCool accordion. */}
            <path className="group-open:hidden" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            <path className="hidden group-open:block" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </summary>
        <div
          id={answerId}
          role="region"
          aria-labelledby={questionId}
          className={`px-2.5 pt-1 pb-4 ${answerSize === "large" ? "space-y-7 text-base leading-[26px] tablet:text-lg" : "text-base leading-[26px]"} tracking-[0.3px] text-[#525252]`}
        >
          {paragraphs.map((paragraph) => typeof paragraph === "string" ? (
              <p key={paragraph} className={paragraph.includes("\n") ? "whitespace-pre-line" : undefined}>
                {paragraph}
              </p>
            ) : (
              <div key={paragraph.heading}>
                <p className="font-bold">{paragraph.heading}</p>
                <ul className="list-none p-0">
                  {paragraph.lines.map((line) => <li key={line}>{line}</li>)}
                </ul>
              </div>
            ))}
        </div>
      </details>
    );
  });
}
