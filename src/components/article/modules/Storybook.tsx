"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Illustrated narrative panels in a horizontal, snap-scrolling sequence.
 * Works without JavaScript (native scroll); buttons and keys add guidance.
 */
export function Storybook({ scenes, label }: { scenes: { title: string; alt: string; art: ReactNode; body: ReactNode }[]; label: string }) {
  const track = useRef<HTMLOListElement>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth : el.clientWidth;
      setIdx(Math.round(el.scrollLeft / Math.max(w, 1)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const n = Math.max(0, Math.min(scenes.length - 1, i));
    const child = el.children[n] as HTMLElement | undefined;
    if (child) el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ol
        ref={track}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(idx + 1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(idx - 1);
          }
        }}
        className="scroll-snap-x -mx-4 flex gap-6 overflow-x-auto px-4 pb-4 outline-none sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10"
        aria-label="Scenes"
      >
        {scenes.map((s, i) => (
          <li key={i} aria-roledescription="slide" aria-label={`Scene ${i + 1} of ${scenes.length}: ${s.title}`} className="w-[86vw] shrink-0 sm:w-[70vw] lg:w-[58vw] xl:w-[820px]">
            <figure>
              <div role="img" aria-label={s.alt} className="aspect-[8/5] overflow-hidden rounded-[4px] bg-black/20">
                {s.art}
              </div>
              <figcaption className="mt-5 grid gap-3 sm:grid-cols-[5.5rem_1fr]">
                <span className="display-lg leading-none text-f-text-accent" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="display-sm block">{s.title}</span>
                  <span className="mt-2 block max-w-xl leading-relaxed text-ink-2">{s.body}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex items-center gap-4">
        <button type="button" onClick={() => go(idx - 1)} disabled={idx === 0} className="label rounded-full border border-rule-strong px-4 py-2 disabled:opacity-30" aria-label="Previous scene">
          ←
        </button>
        <button type="button" onClick={() => go(idx + 1)} disabled={idx >= scenes.length - 1} className="label rounded-full border border-rule-strong px-4 py-2 disabled:opacity-30" aria-label="Next scene">
          →
        </button>
        <div className="flex gap-1.5" aria-hidden="true">
          {scenes.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-f-accent" : "w-3 bg-rule-strong"}`} />
          ))}
        </div>
        <span className="label text-ink-3" aria-live="polite">
          Scene {idx + 1} of {scenes.length}
        </span>
      </div>
    </div>
  );
}
