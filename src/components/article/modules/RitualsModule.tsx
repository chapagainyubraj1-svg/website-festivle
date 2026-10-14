import type { RitualsChapter } from "@/content/types";
import { renderInline } from "@/lib/inline";
import { Art } from "@/components/art/Art";
import { ChapterFrame } from "../ChapterFrame";

const fields: [keyof RitualsChapter["rituals"][number], string][] = [
  ["who", "Who takes part"],
  ["when", "When"],
  ["where", "Where"],
  ["meaning", "What participants say it means"],
  ["evidence", "What the evidence shows"],
  ["variation", "How it varies"],
];

/** Rituals as a numbered sequence. Details use native disclosure so they work without JavaScript. */
export function RitualsModule({ c }: { c: RitualsChapter }) {
  return (
    <ChapterFrame chapter={c} intro={c.intro} wide>
      <ol className="relative">
        {c.rituals.map((r, i) => (
          <li key={r.id} data-reveal className="grid gap-6 border-t border-rule py-10 md:grid-cols-12 md:gap-10">
            <div className="flex items-start gap-5 md:col-span-4">
              <span className="display-lg w-14 shrink-0 leading-none text-f-text-accent">{String(i + 1).padStart(2, "0")}</span>
              {r.art ? (
                <div className="h-28 w-28 shrink-0 sm:h-36 sm:w-36">
                  <Art k={r.art} />
                </div>
              ) : null}
            </div>
            <div className="md:col-span-8">
              <h3 className="display-md">
                {r.name}
                {r.ne ? (
                  <span lang="ne" className="deva-display ml-3 block text-[0.7em] text-ink-2 sm:inline">
                    {r.ne}
                  </span>
                ) : null}
              </h3>
              <p className="mt-4 max-w-2xl text-[1.1rem] leading-relaxed">
                {renderInline(r.what, `${r.id}-what`)}
                {renderInline(`[^${r.sources.join(",")}]`, `${r.id}-cite`)}
              </p>
              {r.objects && r.objects.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Objects and offerings">
                  {r.objects.map((o) => (
                    <li key={o} className="label rounded-full bg-f-accent/10 px-3 py-1 text-ink-2">
                      {o}
                    </li>
                  ))}
                </ul>
              ) : null}
              <details className="mode-full group mt-5 max-w-2xl">
                <summary className="label inline-flex cursor-pointer list-none items-center gap-2 text-ink-2 hover:text-ink">
                  <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-90">
                    ▸
                  </span>
                  Who, when, where — and what it means
                </summary>
                <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {fields.map(([k, label]) =>
                    r[k] ? (
                      <div key={k}>
                        <dt className="kicker text-[0.64rem] text-ink-3">{label}</dt>
                        <dd className="mt-1 text-[0.97rem] leading-relaxed text-ink-2">{renderInline(r[k] as string, `${r.id}-${k}`)}</dd>
                      </div>
                    ) : null,
                  )}
                </dl>
              </details>
            </div>
          </li>
        ))}
      </ol>
      {c.caution ? <p className="label mt-6 border-t border-rule pt-4 text-ink-3">{renderInline(c.caution, `${c.id}-caution`)}</p> : null}
    </ChapterFrame>
  );
}
