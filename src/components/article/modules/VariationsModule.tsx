import type { VariationsChapter } from "@/content/types";
import { renderInline } from "@/lib/inline";
import { communityName } from "@/lib/content";
import { communityBySlug } from "@/content/taxonomy";
import { ChapterFrame } from "../ChapterFrame";
import { KindBadge } from "../KindBadge";

const extra: Record<string, string> = { janajati: "Janajati communities", kirat: "Kirat communities", buddhist: "Buddhist households" };

export function VariationsModule({ c }: { c: VariationsChapter }) {
  return (
    <ChapterFrame chapter={c} intro={c.intro} wide>
      <p className="label mb-4 text-ink-3" aria-hidden="true">
        {c.panels.length} perspectives · scroll sideways for more →
      </p>
      <ol className="scroll-snap-x -mx-4 flex gap-5 overflow-x-auto px-4 pb-6 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10" aria-label="Variations side by side" tabIndex={0}>
        {c.panels.map((p, i) => {
          const comm = communityBySlug[p.community];
          return (
            <li key={i} className="flex w-[80vw] shrink-0 flex-col rounded-[4px] border border-rule bg-paper-raised p-6 sm:w-[340px]">
              <p className="kicker text-[0.64rem] text-ink-3">
                {comm ? (
                  <a href={`/communities/${comm.slug}`} className="underline decoration-rule-strong underline-offset-2">
                    {comm.name}
                  </a>
                ) : (
                  extra[p.community] ?? communityName(p.community)
                )}
              </p>
              <h3 className="display-sm mt-2">{p.label}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-ink-2">
                {renderInline(p.body, `${c.id}-p${i}`)}
                {renderInline(`[^${p.sources.join(",")}]`, `${c.id}-ps${i}`)}
              </p>
              <KindBadge kind={p.kind} className="mt-5 text-f-text-accent" />
            </li>
          );
        })}
      </ol>
      {c.table ? (
        <div className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <caption className="display-sm mb-4 text-left">
              {c.table.caption}
              {renderInline(`[^${c.table.sources.join(",")}]`, `${c.id}-tcap`)}
            </caption>
            <thead>
              <tr className="border-b-2 border-ink">
                <th scope="col" className="kicker py-3 pr-6 text-ink-3">
                  <span className="sr-only">Aspect</span>
                </th>
                {c.table.columns.map((col) => (
                  <th key={col} scope="col" className="display-sm py-3 pr-6 text-[1.05rem]">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.table.rows.map((r, ri) => (
                <tr key={ri} className="border-b border-rule align-top">
                  <th scope="row" className="kicker py-4 pr-6 text-[0.66rem] text-ink-3">
                    {r.label}
                  </th>
                  {r.cells.map((cell, ci) => (
                    <td key={ci} className="py-4 pr-6 leading-relaxed text-ink-2">
                      {renderInline(cell, `${c.id}-t${ri}-${ci}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </ChapterFrame>
  );
}
