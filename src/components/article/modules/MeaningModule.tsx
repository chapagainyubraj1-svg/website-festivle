import type { MeaningChapter } from "@/content/types";
import { renderInline } from "@/lib/inline";
import { ChapterFrame } from "../ChapterFrame";
import { KindBadge } from "../KindBadge";
import { Constellation } from "./Constellation";

export function MeaningModule({ c, festivalName }: { c: MeaningChapter; festivalName: string }) {
  return (
    <ChapterFrame chapter={c}>
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <p data-reveal className="display-md text-balance text-ink">
            {renderInline(c.lead, `${c.id}-lead`)}
          </p>
          <div className="mode-full prose-atlas dropcap mt-10 text-[1.08rem] leading-[1.75]">
            {c.body.map((p, i) => (
              <p key={i}>{renderInline(p, `${c.id}-b${i}`)}</p>
            ))}
          </div>
        </div>
        {c.concepts ? (
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <Constellation center={festivalName} concepts={c.concepts.map((k) => ({ term: k.term, ne: k.ne, note: k.note }))} />
            </div>
          </div>
        ) : null}
      </div>

      {c.perspectives ? (
        <div className="mt-20">
          <p className="kicker text-ink-3">Four ways of seeing it</p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-[3px] border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {c.perspectives.map((p, i) => (
              <div key={i} data-reveal className="flex flex-col bg-paper p-6" style={{ transitionDelay: `${i * 80}ms` }}>
                <KindBadge kind={p.kind} className="text-f-text-accent" />
                <h3 className="display-sm mt-3">{p.label}</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-2">
                  {renderInline(p.body, `${c.id}-pp${i}`)}
                  {renderInline(`[^${p.sources.join(",")}]`, `${c.id}-pps${i}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {c.quote ? (
        <figure className="mx-auto mt-20 max-w-3xl text-center">
          <blockquote className="display-md italic">“{renderInline(c.quote.text, `${c.id}-q`)}”</blockquote>
          <figcaption className="label mt-4 text-ink-3">{renderInline(c.quote.attribution, `${c.id}-qa`)}</figcaption>
        </figure>
      ) : null}
    </ChapterFrame>
  );
}
