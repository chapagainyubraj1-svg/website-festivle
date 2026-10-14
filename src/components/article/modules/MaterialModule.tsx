import type { MaterialChapter } from "@/content/types";
import { renderInline } from "@/lib/inline";
import { Art } from "@/components/art/Art";
import { ChapterFrame } from "../ChapterFrame";
import { PlateHotspots } from "./PlateHotspots";

const catLabel: Record<string, string> = {
  food: "Food",
  clothing: "Clothing",
  music: "Music",
  dance: "Dance",
  decoration: "Decoration",
  object: "Object",
  art: "Art",
  place: "Place",
};

export function MaterialModule({ c }: { c: MaterialChapter }) {
  return (
    <ChapterFrame chapter={c} intro={c.intro} wide>
      {c.plate ? (
        <PlateHotspots
          title={c.plate.title}
          alt={c.plate.alt}
          art={<Art k={c.plate.art} />}
          hotspots={c.plate.hotspots.map((h, i) => ({
            x: h.x,
            y: h.y,
            label: h.label,
            body: (
              <>
                {renderInline(h.body, `${c.id}-h${i}`)}
                {renderInline(`[^${h.sources.join(",")}]`, `${c.id}-hs${i}`)}
              </>
            ),
          }))}
        />
      ) : null}

      <ul className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {c.items.map((it, i) => (
          <li key={it.id} data-reveal className={`${i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:self-center" : ""}`}>
            <article className={`${i === 0 ? "grid gap-6 lg:grid-cols-2" : ""}`}>
              {it.art ? (
                <div className={`${i === 0 ? "aspect-square" : "aspect-[4/3]"} overflow-hidden rounded-[4px] bg-f-soft/60`}>
                  <div className="mx-auto h-full max-w-[320px]">
                    <Art k={it.art} />
                  </div>
                </div>
              ) : null}
              <div className={i === 0 ? "self-center" : "mt-4"}>
                <p className="kicker text-[0.64rem] text-ink-3">{catLabel[it.category]}</p>
                <h3 className={`${i === 0 ? "display-md" : "display-sm"} mt-1`}>
                  {it.name}
                  {it.ne ? (
                    <span lang="ne" className="ml-2 font-deva text-[0.75em] text-ink-2">
                      {it.ne}
                    </span>
                  ) : null}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-2">{renderInline(it.body, `${it.id}-b`)}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </ChapterFrame>
  );
}
