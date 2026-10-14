"use client";

import { useId, useState, type ReactNode } from "react";

interface Panel {
  id: string;
  dayLabel: string;
  name: string;
  ne?: string;
  lunar?: string;
  content: ReactNode;
}

/**
 * Festival days as a journey. Each day's content is rendered exactly once.
 * Wide screens: a track of day markers selects which day is shown.
 * Narrow screens: every day is shown in sequence along a vertical line.
 */
export function DayJourney({ panels }: { panels: Panel[] }) {
  const [sel, setSel] = useState(0);
  const id = useId();
  const go = (i: number) => {
    const next = Math.max(0, Math.min(panels.length - 1, i));
    setSel(next);
  };
  return (
    <div>
      <div className="relative hidden md:block">
        <div aria-hidden="true" className="absolute left-0 right-0 top-[22px] h-px bg-rule-strong" />
        <div aria-hidden="true" className="absolute left-0 top-[21px] h-[3px] bg-f-accent transition-all duration-500" style={{ width: `${(sel / Math.max(panels.length - 1, 1)) * 100}%` }} />
        <ol aria-label="Days of the festival" className="relative grid" style={{ gridTemplateColumns: `repeat(${panels.length}, minmax(0, 1fr))` }}>
          {panels.map((p, i) => (
            <li key={p.id} className="flex justify-center">
              <button
                type="button"
                aria-controls={`${id}-p-${i}`}
                aria-current={sel === i ? "step" : undefined}
                onClick={() => setSel(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    e.preventDefault();
                    go(i + 1);
                    (e.currentTarget.closest("li")?.nextElementSibling?.querySelector("button") as HTMLButtonElement | null)?.focus();
                  } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    go(i - 1);
                    (e.currentTarget.closest("li")?.previousElementSibling?.querySelector("button") as HTMLButtonElement | null)?.focus();
                  }
                }}
                className="group flex flex-col items-center px-1 text-center"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full border-2 font-sans text-[0.8rem] font-semibold transition-all ${
                    sel === i ? "scale-110 border-f-accent bg-f-accent text-white" : i < sel ? "border-f-accent bg-paper-raised text-ink" : "border-rule-strong bg-paper-raised text-ink-2 group-hover:border-f-accent"
                  }`}
                >
                  {p.dayLabel.replace(/^Days? /, "")}
                </span>
                <span className={`mt-3 text-[0.86rem] leading-tight ${sel === i ? "font-semibold text-ink" : "text-ink-2"}`}>{p.name}</span>
                {p.ne ? (
                  <span lang="ne" className="mt-0.5 font-deva text-[0.78rem] text-ink-3">
                    {p.ne}
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <ol className="relative mt-0 space-y-4 md:mt-12 md:space-y-0">
        <span aria-hidden="true" className="absolute bottom-0 left-[9px] top-0 w-px bg-rule-strong md:hidden" />
        {panels.map((p, i) => (
          <li
            key={p.id}
            id={`${id}-p-${i}`}
            aria-label={`${p.dayLabel}: ${p.name}`}
            className={`relative pl-8 md:pl-0 ${sel === i ? "" : "md:hidden"}`}
          >
            <span aria-hidden="true" className="absolute left-0 top-6 h-[19px] w-[19px] rounded-full border-2 border-f-accent bg-paper-raised md:hidden" />
            <div className="rounded-[4px] border border-rule bg-paper-raised/60 p-5 sm:p-8 lg:p-12">
              {p.content}
              <div className="mt-8 hidden justify-between border-t border-rule pt-4 md:flex">
                <button type="button" className="label text-ink-2 hover:text-ink disabled:opacity-30" onClick={() => go(i - 1)} disabled={i === 0}>
                  ← Previous day
                </button>
                <span className="label text-ink-3">
                  {i + 1} of {panels.length}
                </span>
                <button type="button" className="label text-ink-2 hover:text-ink disabled:opacity-30" onClick={() => go(i + 1)} disabled={i === panels.length - 1}>
                  Next day →
                </button>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
