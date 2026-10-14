import type { MapChapter } from "@/content/types";
import { renderInline } from "@/lib/inline";
import { ChapterFrame } from "../ChapterFrame";
import { KindBadge } from "../KindBadge";
import { NepalMap } from "@/components/map/NepalMap";

export function MapModule({ c }: { c: MapChapter }) {
  const places = c.places.map((p) => ({
    id: p.id,
    name: p.name,
    ne: p.ne,
    lat: p.lat,
    lon: p.lon,
    area: p.area,
    body: (
      <>
        {renderInline(p.body, `${p.id}-b`)}
        {renderInline(`[^${p.sources.join(",")}]`, `${p.id}-s`)}
      </>
    ),
    badge: p.kind ? <KindBadge kind={p.kind} className="text-f-text-accent" /> : null,
  }));
  return (
    <ChapterFrame chapter={c} intro={c.intro} wide>
      <NepalMap places={places} emphasis={c.emphasis} />
      {c.diaspora && c.diaspora.length > 0 ? (
        <div className="mt-16">
          <p className="kicker text-f-text-accent">Beyond Nepal</p>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-[4px] border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {c.diaspora.map((d, i) => (
              <li key={i} className="bg-paper p-5">
                <p className="display-sm text-[1.05rem]">{d.place}</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">
                  {renderInline(d.body, `${c.id}-d${i}`)}
                  {renderInline(`[^${d.sources.join(",")}]`, `${c.id}-ds${i}`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </ChapterFrame>
  );
}
