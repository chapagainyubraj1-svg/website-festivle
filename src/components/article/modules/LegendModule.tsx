import type { LegendChapter } from "@/content/types";
import { renderInline } from "@/lib/inline";
import { Art } from "@/components/art/Art";
import { ChapterFrame } from "../ChapterFrame";
import { KindBadge } from "../KindBadge";
import { Storybook } from "./Storybook";

export function LegendModule({ c }: { c: LegendChapter }) {
  return (
    <ChapterFrame chapter={c} intro={c.intro} wide>
      {c.narratives.map((n) => (
        <div key={n.id} className="mt-4">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4 border-b border-rule pb-4">
            <h3 className="display-md">{n.title}</h3>
            <div className="text-right">
              <KindBadge kind={n.kind} className="text-f-text-accent" />
              <p className="label mt-1 max-w-md text-ink-3">
                {renderInline(n.sourceText, `${n.id}-src`)}
                {renderInline(`[^${n.sources.join(",")}]`, `${n.id}-cite`)}
              </p>
            </div>
          </div>
          <Storybook
            label={n.title}
            scenes={n.scenes.map((s, i) => ({
              title: s.title,
              alt: s.alt,
              art: <Art k={s.art} />,
              body: renderInline(s.body, `${n.id}-s${i}`),
            }))}
          />
        </div>
      ))}
      {c.variations && c.variations.length > 0 ? (
        <div className="mt-16 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="kicker text-f-text-accent">Other tellings</p>
          </div>
          <ul className="space-y-4 md:col-span-8">
            {c.variations.map((v, i) => (
              <li key={i} className="border-l-2 border-rule-strong pl-4 text-ink-2">
                {renderInline(v, `${c.id}-v${i}`)}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <p className="label mt-10 text-ink-3">Illustrations: original interpretive artwork. The deities are represented as light and emblem rather than figures.</p>
    </ChapterFrame>
  );
}
