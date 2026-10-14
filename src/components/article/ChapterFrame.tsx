import type { ReactNode } from "react";
import type { ChapterBase } from "@/content/types";
import { renderInline } from "@/lib/inline";

/** Section wrapper for every chapter: anchor, tone, heading and essentials. */
export function ChapterFrame({ chapter, children, wide = false, intro }: { chapter: ChapterBase; children: ReactNode; wide?: boolean; intro?: string }) {
  const tone = chapter.tone ?? "paper";
  return (
    <section id={chapter.id} aria-labelledby={`${chapter.id}-title`} className={`tone-${tone} relative scroll-mt-20 py-20 sm:py-28`}>
      <div className={`mx-auto px-4 sm:px-6 lg:px-10 ${wide ? "max-w-[1400px]" : "max-w-[1200px]"}`}>
        <header data-reveal className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-4">
            {chapter.kicker ? <p className="kicker text-f-text-accent">{chapter.kicker}</p> : null}
          </div>
          <div className="md:col-span-8">
            <h2 id={`${chapter.id}-title`} className="display-lg text-balance">
              {chapter.title}
            </h2>
            {intro ? <p className="mt-5 max-w-2xl text-[1.12rem] leading-relaxed text-ink-2">{renderInline(intro, `${chapter.id}-intro`)}</p> : null}
          </div>
        </header>
        {chapter.essentials && chapter.essentials.length > 0 ? (
          <aside aria-label="Essentials" className="mode-essentials-only mt-8 grid gap-6 md:grid-cols-12">
            <div className="md:col-span-8 md:col-start-5">
              <p className="kicker mb-2 text-ink-3">In brief</p>
              <ul className="space-y-2 border-l-2 border-f-accent pl-4">
                {chapter.essentials.map((e, i) => (
                  <li key={i} className="text-[1.05rem] leading-relaxed">
                    {renderInline(e, `${chapter.id}-ess-${i}`)}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        ) : null}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
