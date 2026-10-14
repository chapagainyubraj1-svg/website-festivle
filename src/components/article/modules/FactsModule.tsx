import type { FactsChapter } from "@/content/types";
import { renderInline } from "@/lib/inline";
import { ChapterFrame } from "../ChapterFrame";
import { KindBadge } from "../KindBadge";
import { FactDeck } from "./FactDeck";

export function FactsModule({ c }: { c: FactsChapter }) {
  const facts = c.facts.map((f) => ({
    id: f.id,
    title: f.title,
    figure: f.figure,
    treatment: f.treatment ?? "word",
    body: (
      <>
        {renderInline(f.body, `${f.id}-b`)}
        {renderInline(`[^${f.sources.join(",")}]`, `${f.id}-s`)}
      </>
    ),
    badge: <KindBadge kind={f.kind} compact />,
  }));
  return (
    <ChapterFrame chapter={c} wide>
      <FactDeck facts={facts} />
    </ChapterFrame>
  );
}
