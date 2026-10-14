"use client";

import { useId, useState, type ReactNode } from "react";

export function SymbolExplorer({ items }: { items: { id: string; name: string; ne?: string; art: ReactNode; detail: ReactNode }[] }) {
  const [sel, setSel] = useState(0);
  const id = useId();
  const n = items.length;
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div role="tablist" aria-label="Symbols" aria-orientation="horizontal" className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:col-span-12">
        {items.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            id={`${id}-t-${i}`}
            aria-selected={sel === i}
            aria-controls={`${id}-p`}
            tabIndex={sel === i ? 0 : -1}
            onClick={() => setSel(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                const next = (i + (e.key === "ArrowRight" ? 1 : -1) + n) % n;
                setSel(next);
                document.getElementById(`${id}-t-${next}`)?.focus();
              }
            }}
            className={`group flex flex-col items-center rounded-[4px] border p-3 transition-colors ${sel === i ? "border-f-accent bg-paper-raised" : "border-transparent hover:border-rule-strong"}`}
          >
            <span className={`block aspect-square w-full max-w-[120px] transition-transform ${sel === i ? "scale-105" : "opacity-80 group-hover:opacity-100"}`}>{s.art}</span>
            <span className="display-sm mt-2 text-center text-[0.98rem]">{s.name}</span>
            {s.ne ? (
              <span lang="ne" className="font-deva text-[0.8rem] text-ink-3">
                {s.ne}
              </span>
            ) : null}
          </button>
        ))}
      </div>
      <div id={`${id}-p`} role="tabpanel" aria-labelledby={`${id}-t-${sel}`} className="lg:col-span-8 lg:col-start-3">
        <div className="grid items-start gap-8 rounded-[4px] border border-rule bg-paper-raised p-6 sm:grid-cols-[180px_1fr] sm:p-10">
          <div className="mx-auto aspect-square w-40 sm:w-full">{items[sel].art}</div>
          <div>
            <p className="display-md">
              {items[sel].name}
              {items[sel].ne ? (
                <span lang="ne" className="deva-display ml-3 text-[0.75em] text-ink-2">
                  {items[sel].ne}
                </span>
              ) : null}
            </p>
            <div className="mt-4">{items[sel].detail}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
