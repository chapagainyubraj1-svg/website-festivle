"use client";

import { useState, type ReactNode } from "react";

/** A circular sequence with an optional comparison ring (e.g. two calendars). */
export function CycleRing({ ring, comparison }: { ring: { label: string; ne?: string; note: ReactNode | null }[]; comparison?: { label: string; ring: string[] } }) {
  const [sel, setSel] = useState(0);
  const n = ring.length;
  const R = 40;
  const r2 = 27;
  return (
    <div className="grid items-center gap-10 lg:grid-cols-12">
      <div className="relative mx-auto aspect-square w-full max-w-[560px] lg:col-span-7">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx={50} cy={50} r={R} fill="none" stroke="var(--rule-strong)" strokeWidth={0.3} />
          {comparison ? <circle cx={50} cy={50} r={r2} fill="none" stroke="var(--rule)" strokeWidth={0.3} strokeDasharray="0.8 1.2" /> : null}
          {ring.map((_, i) => {
            const a = (i / n) * Math.PI * 2 - Math.PI / 2;
            return <line key={i} x1={50 + Math.cos(a) * (R - 3)} y1={50 + Math.sin(a) * (R - 3)} x2={50 + Math.cos(a) * (R + 3)} y2={50 + Math.sin(a) * (R + 3)} stroke="var(--rule-strong)" strokeWidth={0.3} />;
          })}
          {(() => {
            const a = (sel / n) * Math.PI * 2 - Math.PI / 2;
            return <line x1={50} y1={50} x2={50 + Math.cos(a) * (R - 6)} y2={50 + Math.sin(a) * (R - 6)} stroke="var(--f-accent)" strokeWidth={0.6} />;
          })()}
          <circle cx={50} cy={50} r={2} fill="var(--f-accent)" />
          {comparison
            ? comparison.ring.map((l, i) => {
                const a = (i / n) * Math.PI * 2 - Math.PI / 2;
                return (
                  <text key={i} x={50 + Math.cos(a) * r2} y={50 + Math.sin(a) * r2 + 1} textAnchor="middle" style={{ font: "2.6px var(--font-mukta), sans-serif" }} fill={i === sel ? "var(--ink)" : "var(--ink-3)"}>
                    {l}
                  </text>
                );
              })
            : null}
        </svg>
        {ring.map((item, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          return (
            <button
              key={i}
              type="button"
              aria-pressed={sel === i}
              onClick={() => setSel(i)}
              style={{ left: `${50 + Math.cos(a) * R}%`, top: `${50 + Math.sin(a) * R}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1 text-center font-sans text-[0.72rem] font-semibold transition-colors sm:text-[0.8rem] ${
                sel === i ? "border-f-accent bg-f-accent text-white" : "border-rule-strong bg-paper-raised hover:border-f-accent"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="lg:col-span-5" aria-live="polite">
        <p className="kicker text-ink-3">
          {sel + 1} of {n}
        </p>
        <p className="display-lg mt-2">{ring[sel].label}</p>
        {ring[sel].ne ? (
          <p lang="ne" className="deva-display mt-1 text-2xl text-ink-2">
            {ring[sel].ne}
          </p>
        ) : null}
        {comparison ? (
          <p className="label mt-3 text-ink-3">
            {comparison.label}: <span className="font-semibold text-ink-2">{comparison.ring[sel]}</span>
          </p>
        ) : null}
        {ring[sel].note ? <p className="mt-4 leading-relaxed text-ink-2">{ring[sel].note}</p> : null}
        <div className="mt-6 flex gap-2">
          <button type="button" className="label rounded-full border border-rule-strong px-3 py-1" onClick={() => setSel((sel - 1 + n) % n)}>
            ←
          </button>
          <button type="button" className="label rounded-full border border-rule-strong px-3 py-1" onClick={() => setSel((sel + 1) % n)}>
            →
          </button>
        </div>
      </div>
    </div>
  );
}
