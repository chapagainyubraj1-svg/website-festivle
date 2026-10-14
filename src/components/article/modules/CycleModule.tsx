import type { CycleChapter } from "@/content/types";
import { renderInline } from "@/lib/inline";
import { ChapterFrame } from "../ChapterFrame";
import { CycleRing } from "./CycleRing";

export function CycleModule({ c }: { c: CycleChapter }) {
  return (
    <ChapterFrame chapter={c} intro={c.intro} wide>
      <CycleRing
        ring={c.ring.map((r, i) => ({ label: r.label, ne: r.ne, note: r.note ? renderInline(r.note, `${c.id}-r${i}`) : null }))}
        comparison={c.comparison}
      />
      {c.note ? (
        <p className="label mx-auto mt-10 max-w-3xl text-center text-ink-3">
          {renderInline(c.note, `${c.id}-note`)}
          {renderInline(`[^${c.sources.join(",")}]`, `${c.id}-src`)}
        </p>
      ) : null}
    </ChapterFrame>
  );
}
