import type { DecodeChapter } from "@/content/types";
import { renderInline } from "@/lib/inline";
import { ChapterFrame } from "../ChapterFrame";
import { VerseDecoder } from "./VerseDecoder";

export function DecodeModule({ c }: { c: DecodeChapter }) {
  const lines = c.text.lines.map((l, li) => ({
    original: l.original,
    translit: l.translit,
    parts: l.parts.map((p, pi) => ({
      span: p.span,
      gloss: renderInline(p.gloss, `${c.id}-${li}-${pi}-g`),
      note: p.note ? renderInline(p.note, `${c.id}-${li}-${pi}-n`) : null,
    })),
  }));
  return (
    <ChapterFrame chapter={c} intro={c.intro} wide>
      <VerseDecoder language={c.text.language} lines={lines} />
      <p className="mx-auto mt-10 max-w-3xl text-[0.98rem] leading-relaxed text-ink-2">{renderInline(c.note, `${c.id}-note`)}</p>
    </ChapterFrame>
  );
}
