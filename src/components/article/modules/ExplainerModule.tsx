import type { ExplainerChapter } from "@/content/types";
import { renderInline } from "@/lib/inline";
import { ChapterFrame } from "../ChapterFrame";
import { StepExplainer } from "./StepExplainer";

export function ExplainerModule({ c }: { c: ExplainerChapter }) {
  const steps = c.steps.map((s, i) => ({ label: s.label, body: renderInline(s.body, `${c.id}-st${i}`) }));
  return (
    <ChapterFrame chapter={c} intro={c.intro}>
      <StepExplainer kind={c.explainer} steps={steps} title={c.title} />
      <p className="label mx-auto mt-8 max-w-3xl border-t border-rule pt-4 text-ink-3">
        <span className="font-semibold text-ink-2">About this animation: </span>
        {renderInline(c.accuracyNote, `${c.id}-acc`)}
      </p>
    </ChapterFrame>
  );
}
