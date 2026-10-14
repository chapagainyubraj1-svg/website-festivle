import type { MediaChapter } from "@/content/types";
import { renderInline } from "@/lib/inline";
import { Art } from "@/components/art/Art";
import { ChapterFrame } from "../ChapterFrame";
import { Gallery } from "./Gallery";

export function MediaModule({ c, explainerVisual }: { c: MediaChapter; explainerVisual?: React.ReactNode }) {
  const items = c.items.map((m, i) => ({
    id: m.id,
    alt: m.alt,
    art: <Art k={m.art ?? ""} idPrefix={`media-${m.id}`} />,
    caption: renderInline(m.caption, `${m.id}-cap`),
    credit: m.credit,
    license: m.license,
    nature: m.nature,
    wide: i === 0,
  }));
  return (
    <ChapterFrame chapter={c} intro={c.intro} wide>
      <Gallery items={items} />
      {c.explainer ? (
        <div className="mt-16 grid gap-8 rounded-[4px] border border-rule p-6 sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="kicker text-f-text-accent">Animated explainer</p>
            <p className="display-sm mt-2">{c.explainer.title}</p>
            <p className="mt-3 leading-relaxed text-ink-2">
              {renderInline(c.explainer.caption, `${c.id}-ex-cap`)}
              {renderInline(`[^${c.explainer.sources.join(",")}]`, `${c.id}-ex-s`)}
            </p>
            <a href={`#${c.explainer.id === "jamara-anim" ? "jamara" : c.explainer.id}`} className="label mt-4 inline-block underline underline-offset-4">
              Open the interactive version
            </a>
          </div>
          <details className="lg:col-span-7">
            <summary className="label cursor-pointer text-ink-2">Read the transcript</summary>
            <p className="mt-3 leading-relaxed text-ink-2">{renderInline(c.explainer.transcript, `${c.id}-ex-t`)}</p>
          </details>
          {explainerVisual}
        </div>
      ) : null}
      {c.wishlist && c.wishlist.length > 0 ? (
        <div className="mt-16">
          <p className="kicker text-f-text-accent">Media we are seeking</p>
          <p className="mt-2 max-w-2xl text-ink-2">
            We publish photographs and recordings only when their creator, licence and consent are documented. These are the gaps we want to fill — with the communities concerned.
          </p>
          <ul className="mt-6 divide-y divide-rule border-y border-rule">
            {c.wishlist.map((w, i) => (
              <li key={i} className="grid gap-2 py-4 md:grid-cols-12 md:gap-6">
                <p className="display-sm text-[1.02rem] md:col-span-4">{w.subject}</p>
                <p className="text-[0.95rem] text-ink-2 md:col-span-5">{renderInline(w.why, `${c.id}-w${i}`)}</p>
                <p className="label text-ink-3 md:col-span-3">{w.suggestedSources}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </ChapterFrame>
  );
}
