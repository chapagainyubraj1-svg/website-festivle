import type { SymbolsChapter } from "@/content/types";
import { renderInline } from "@/lib/inline";
import { Art } from "@/components/art/Art";
import { ChapterFrame } from "../ChapterFrame";
import { KindBadge } from "../KindBadge";
import { SymbolExplorer } from "./SymbolExplorer";

export function SymbolsModule({ c }: { c: SymbolsChapter }) {
  const items = c.symbols.map((s) => ({
    id: s.id,
    name: s.name,
    ne: s.ne,
    art: <Art k={s.art} />,
    detail: (
      <div>
        <p className="leading-relaxed text-ink-2">{renderInline(s.context, `${s.id}-ctx`)}</p>
        <ul className="mt-6 space-y-5">
          {s.meanings.map((m, i) => (
            <li key={i} className="border-l-2 border-f-accent pl-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="display-sm text-[1.02rem]">{m.tradition}</span>
                <KindBadge kind={m.kind} compact className="text-ink-3" />
              </div>
              <p className="mt-1 leading-relaxed text-ink-2">{renderInline(m.body, `${s.id}-m${i}`)}</p>
            </li>
          ))}
        </ul>
        <p className="label mt-5 text-ink-3">Sources {renderInline(`[^${s.sources.join(",")}]`, `${s.id}-src`)}</p>
      </div>
    ),
  }));
  return (
    <ChapterFrame chapter={c} intro={c.intro} wide>
      <SymbolExplorer items={items} />
    </ChapterFrame>
  );
}
