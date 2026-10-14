"use client";

import { useState, type ReactNode } from "react";

interface Line {
  original: string;
  translit?: string;
  parts: { span: string; gloss: ReactNode; note: ReactNode | null }[];
}

/** A verse shown phrase by phrase; select a phrase to read its gloss. */
export function VerseDecoder({ lines, language }: { lines: Line[]; language: string }) {
  const [sel, setSel] = useState<[number, number]>([0, 0]);
  const [showTranslit, setShowTranslit] = useState(true);
  const part = lines[sel[0]].parts[sel[1]];
  let count = 0;
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="mb-4 flex items-center justify-between">
          <p className="kicker text-ink-3">{language} · select a phrase</p>
          <button type="button" aria-pressed={showTranslit} onClick={() => setShowTranslit((s) => !s)} className="label text-ink-2 underline decoration-rule-strong underline-offset-4">
            {showTranslit ? "Hide transliteration" : "Show transliteration"}
          </button>
        </div>
        <div className="space-y-6">
          {lines.map((l, li) => (
            <div key={li}>
              <p lang="sa" className="flex flex-wrap gap-x-2 gap-y-2 font-deva text-[1.45rem] leading-[1.9] sm:text-[1.7rem]">
                {l.parts.map((p, pi) => {
                  count++;
                  const active = sel[0] === li && sel[1] === pi;
                  return (
                    <button
                      key={pi}
                      type="button"
                      onClick={() => setSel([li, pi])}
                      aria-pressed={active}
                      aria-label={`Phrase ${count}: ${p.span}`}
                      className={`rounded-[4px] px-1.5 transition-colors ${active ? "bg-f-accent text-white" : "hover:bg-f-accent/15"}`}
                    >
                      <span lang="sa">{p.span}</span>
                    </button>
                  );
                })}
              </p>
              {showTranslit && l.translit ? <p className="mt-1 pl-1.5 font-serif text-[0.98rem] italic text-ink-3">{l.translit}</p> : null}
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-5">
        <div className="sticky top-28 rounded-[4px] border border-rule bg-paper-raised p-6 sm:p-8" aria-live="polite">
          <p lang="sa" className="font-deva text-[1.6rem] text-f-text-accent">
            {part.span}
          </p>
          <p className="display-sm mt-3">{part.gloss}</p>
          {part.note ? <p className="mt-3 leading-relaxed text-ink-2">{part.note}</p> : null}
          <div className="mt-6 flex gap-2">
            <button
              type="button"
              className="label rounded-full border border-rule-strong px-3 py-1"
              onClick={() => {
                const [li, pi] = sel;
                if (pi > 0) setSel([li, pi - 1]);
                else if (li > 0) setSel([li - 1, lines[li - 1].parts.length - 1]);
              }}
            >
              ← Previous
            </button>
            <button
              type="button"
              className="label rounded-full border border-rule-strong px-3 py-1"
              onClick={() => {
                const [li, pi] = sel;
                if (pi < lines[li].parts.length - 1) setSel([li, pi + 1]);
                else if (li < lines.length - 1) setSel([li + 1, 0]);
              }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
