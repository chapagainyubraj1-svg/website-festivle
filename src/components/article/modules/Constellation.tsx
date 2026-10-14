"use client";

import { useId, useState } from "react";

/** A small concept map: ideas orbiting the festival, each with a note. */
export function Constellation({ center, concepts }: { center: string; concepts: { term: string; ne?: string; note: string }[] }) {
  const [sel, setSel] = useState(0);
  const id = useId();
  const n = concepts.length;
  const pos = concepts.map((_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: 50 + Math.cos(a) * 36, y: 50 + Math.sin(a) * 36 };
  });
  const strip = (s: string) => s.replace(/\[\^[^\]]+\]/g, "").replace(/\[\[([a-z0-9-]+)\|?([^\]]*)\]\]/g, (_, a, b) => b || a).replace(/\*/g, "");
  return (
    <figure aria-labelledby={`${id}-cap`}>
      <div className="relative mx-auto aspect-square w-full max-w-[420px]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx={50} cy={50} r={36} fill="none" stroke="var(--rule-strong)" strokeWidth={0.25} strokeDasharray="0.6 1.2" />
          {pos.map((p, i) => (
            <line key={i} x1={50} y1={50} x2={p.x} y2={p.y} stroke={i === sel ? "var(--f-accent)" : "var(--rule-strong)"} strokeWidth={i === sel ? 0.5 : 0.25} />
          ))}
          <circle cx={50} cy={50} r={13} fill="var(--f-accent)" opacity={0.12} />
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="display-sm block text-[1.15rem]">{center}</span>
        </div>
        <div role="tablist" aria-label="Key ideas">
          {concepts.map((k, i) => (
            <button
              key={k.term}
              role="tab"
              aria-selected={i === sel}
              aria-controls={`${id}-panel`}
              id={`${id}-tab-${i}`}
              tabIndex={i === sel ? 0 : -1}
              onClick={() => setSel(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                  e.preventDefault();
                  const next = (i + 1) % n;
                  setSel(next);
                  document.getElementById(`${id}-tab-${next}`)?.focus();
                } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                  e.preventDefault();
                  const prev = (i - 1 + n) % n;
                  setSel(prev);
                  document.getElementById(`${id}-tab-${prev}`)?.focus();
                }
              }}
              style={{ left: `${pos[i].x}%`, top: `${pos[i].y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1.5 text-center transition-all ${
                i === sel ? "border-f-accent bg-f-accent text-white shadow-lg" : "border-rule-strong bg-paper-raised hover:border-f-accent"
              }`}
            >
              {k.ne ? (
                <span lang="ne" className="block font-deva text-[0.95rem] leading-tight">
                  {k.ne}
                </span>
              ) : null}
              <span className="block font-sans text-[0.72rem] font-semibold uppercase tracking-[0.08em]">{k.term}</span>
            </button>
          ))}
        </div>
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${sel}`} className="mx-auto mt-4 max-w-[420px] min-h-[3.5rem] border-t border-rule pt-3 text-center text-ink-2" aria-live="polite">
        {strip(concepts[sel].note)}
      </div>
      <figcaption id={`${id}-cap`} className="sr-only">
        Key ideas connected to {center}. Select an idea to read a short note.
      </figcaption>
    </figure>
  );
}
