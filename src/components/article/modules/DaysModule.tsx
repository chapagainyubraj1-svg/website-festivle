import type { DaysChapter } from "@/content/types";
import { renderInline } from "@/lib/inline";
import { Art } from "@/components/art/Art";
import { ChapterFrame } from "../ChapterFrame";
import { DayJourney } from "./DayJourney";

/** Festival-day sequence. Content for every day is server-rendered; the client adds the interactive track. */
export function DaysModule({ c }: { c: DaysChapter }) {
  const panels = c.days.map((d) => ({
    id: d.id,
    dayLabel: d.dayLabel,
    name: d.name,
    ne: d.ne,
    lunar: d.lunar,
    content: (
      <div key={d.id} className="grid gap-8 md:grid-cols-12">
        {d.art ? (
          <div className="md:col-span-4">
            <div className="mx-auto aspect-square w-full max-w-[260px]">
              <Art k={d.art} />
            </div>
          </div>
        ) : null}
        <div className={d.art ? "md:col-span-8" : "md:col-span-12"}>
          <p className="kicker text-f-text-accent">
            {d.dayLabel}
            {d.lunar ? <span className="ml-2 font-normal normal-case tracking-normal text-ink-3">· {d.lunar}</span> : null}
          </p>
          <h3 className="display-md mt-2">
            {d.name}
            {d.ne ? (
              <span lang="ne" className="deva-display ml-3 text-[0.8em] text-ink-2">
                {d.ne}
              </span>
            ) : null}
          </h3>
          <p className="mt-4 text-[1.15rem] leading-relaxed">{renderInline(d.summary, `${d.id}-s`)}</p>
          <div className="mode-full prose-atlas mt-5 text-ink-2">
            {d.detail.map((p, i) => (
              <p key={i}>{renderInline(p, `${d.id}-d${i}`)}</p>
            ))}
          </div>
        </div>
      </div>
    ),
  }));
  return (
    <ChapterFrame chapter={c} intro={c.intro} wide>
      <DayJourney panels={panels} />
      {c.note ? <p className="label mx-auto mt-10 max-w-3xl text-center text-ink-3">{renderInline(c.note, `${c.id}-note`)}</p> : null}
    </ChapterFrame>
  );
}
