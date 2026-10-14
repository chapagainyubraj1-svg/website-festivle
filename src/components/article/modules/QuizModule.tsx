import type { QuizChapter } from "@/content/types";
import { renderInline } from "@/lib/inline";
import { ChapterFrame } from "../ChapterFrame";
import { Quiz } from "./Quiz";

export function QuizModule({ c }: { c: QuizChapter }) {
  const qs = c.questions.map((q, i) => ({
    q: q.q,
    options: q.options,
    answer: q.answer,
    explain: (
      <>
        {renderInline(q.explain, `${c.id}-e${i}`)}
        {renderInline(`[^${q.sources.join(",")}]`, `${c.id}-es${i}`)}
      </>
    ),
  }));
  return (
    <ChapterFrame chapter={c}>
      <Quiz questions={qs} />
    </ChapterFrame>
  );
}
