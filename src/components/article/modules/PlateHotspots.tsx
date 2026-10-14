"use client";

import { useId, useState, type ReactNode } from "react";

/** An annotated illustration: numbered hotspots with a synced, readable list. */
export function PlateHotspots({ title, alt, art, hotspots }: { title: string; alt: string; art: ReactNode; hotspots: { x: number; y: number; label: string; body: ReactNode }[] }) {
  const [sel, setSel] = useState(0);
  const id = useId();
  return (
    <figure className="grid items-center gap-10 lg:grid-cols-12" aria-labelledby={`${id}-t`}>
      <div className="relative mx-auto aspect-square w-full max-w-[560px] lg:col-span-7">
        <div role="img" aria-label={alt} className="h-full w-full overflow-hidden rounded-full">
          {art}
        </div>
        {hotspots.map((h, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSel(i)}
            aria-pressed={sel === i}
            aria-controls={`${id}-d`}
            aria-label={`${i + 1}: ${h.label}`}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            className={`absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 font-sans text-sm font-bold shadow-lg transition-transform ${
              sel === i ? "scale-110 border-white bg-f-accent text-white" : "border-white bg-ink/85 text-paper hover:scale-105"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="lg:col-span-5">
        <p className="kicker text-f-text-accent">Annotated</p>
        <p id={`${id}-t`} className="display-md mt-2">
          {title}
        </p>
        <ol className="mt-6 space-y-1">
          {hotspots.map((h, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => setSel(i)}
                aria-pressed={sel === i}
                className={`flex w-full items-baseline gap-3 rounded-[3px] px-3 py-2 text-left ${sel === i ? "bg-paper-raised" : "hover:bg-paper-raised/60"}`}
              >
                <span className={`font-sans text-sm font-bold ${sel === i ? "text-f-text-accent" : "text-ink-3"}`}>{i + 1}</span>
                <span className="display-sm text-[1.05rem]">{h.label}</span>
              </button>
              {sel === i ? (
                <div id={`${id}-d`} className="px-3 pb-3 pl-9 leading-relaxed text-ink-2" aria-live="polite">
                  {h.body}
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
