import type { TimelineChapter } from "@/content/types";
import { renderInline } from "@/lib/inline";
import { ChapterFrame } from "../ChapterFrame";
import { TimelineExplorer } from "./TimelineExplorer";

export function TimelineModule({ c }: { c: TimelineChapter }) {
  const events = [...c.events]
    .sort((a, b) => a.sortYear - b.sortYear)
    .map((e) => ({
      id: e.id,
      date: e.date,
      sortYear: e.sortYear,
      title: e.title,
      kind: e.kind,
      confidence: e.confidence,
      body: renderInline(e.body, `${e.id}-b`),
      caveat: e.caveat ? renderInline(e.caveat, `${e.id}-c`) : null,
      cites: renderInline(`[^${e.sources.join(",")}]`, `${e.id}-s`),
    }));
  return (
    <ChapterFrame chapter={c} intro={c.intro} wide>
      <TimelineExplorer events={events} />
      {c.unknowns && c.unknowns.length > 0 ? (
        <aside className="mt-16 grid gap-6 rounded-[4px] border border-dashed border-rule-strong p-6 md:grid-cols-12 md:p-10">
          <div className="md:col-span-4">
            <p className="kicker text-f-text-accent">What we don’t know</p>
            <p className="display-sm mt-2">Gaps in the record</p>
          </div>
          <ul className="space-y-3 md:col-span-8">
            {c.unknowns.map((u, i) => (
              <li key={i} className="flex gap-3 text-ink-2">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-f-accent" />
                <span>{renderInline(u, `${c.id}-u${i}`)}</span>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </ChapterFrame>
  );
}
