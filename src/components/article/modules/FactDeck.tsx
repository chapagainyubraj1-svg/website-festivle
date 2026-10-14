"use client";

import { useState, type ReactNode } from "react";

interface F {
  id: string;
  title: string;
  figure?: string;
  treatment: string;
  body: ReactNode;
  badge: ReactNode;
}

/**
 * "Did you know?" — one fact at a time, revealed like turning a card, with a
 * view-all toggle so nothing is locked behind interaction.
 */
export function FactDeck({ facts }: { facts: F[] }) {
  const [i, setI] = useState(0);
  const [all, setAll] = useState(false);
  const [flip, setFlip] = useState(0);
  const f = facts[i];
  const go = (n: number) => {
    setI((n + facts.length) % facts.length);
    setFlip((x) => x + 1);
  };
  const isDeva = (s?: string) => !!s && /[ऀ-ॿ]/.test(s);

  if (all) {
    return (
      <div>
        <button type="button" onClick={() => setAll(false)} className="label mb-8 underline underline-offset-4">
          Back to one at a time
        </button>
        <ol className="grid gap-px overflow-hidden rounded-[4px] border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((x, k) => (
            <li key={x.id} className="flex flex-col bg-[var(--f-bg)] p-6">
              <span className="font-sans text-xs font-bold text-ink-3">{String(k + 1).padStart(2, "0")}</span>
              {x.figure ? (
                <span lang={isDeva(x.figure) ? "ne" : undefined} className={`mt-3 block text-f-text-accent ${isDeva(x.figure) ? "font-deva text-2xl" : "display-md"}`}>
                  {x.figure}
                </span>
              ) : null}
              <p className="display-sm mt-3 text-[1.08rem]">{x.title}</p>
              <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink-2">{x.body}</p>
              <span className="mt-4 text-ink-3">{x.badge}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="display-xl leading-[0.85] text-f-text-accent" aria-hidden="true">
          ?
        </p>
        <p className="mt-4 max-w-xs text-ink-2">Small discoveries from the research — each one traceable to its source.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <button type="button" onClick={() => go(i - 1)} className="label rounded-full border border-rule-strong px-4 py-2" aria-label="Previous fact">
            ←
          </button>
          <button type="button" onClick={() => go(i + 1)} className="label rounded-full bg-f-accent px-5 py-2 font-semibold text-white">
            Another fact
          </button>
          <button type="button" onClick={() => setAll(true)} className="label px-2 py-2 underline underline-offset-4">
            See all {facts.length}
          </button>
        </div>
      </div>
      <div className="lg:col-span-8" aria-live="polite">
        <div key={flip} className="fact-card relative overflow-hidden rounded-[6px] border border-rule bg-paper-raised p-8 sm:p-12" style={{ animation: "fact-in 0.6s cubic-bezier(0.2,0.7,0.2,1)" }}>
          <span className="font-sans text-xs font-bold tracking-[0.2em] text-ink-3">
            {String(i + 1).padStart(2, "0")} / {String(facts.length).padStart(2, "0")}
          </span>
          {f.figure ? (
            <p lang={isDeva(f.figure) ? "ne" : undefined} className={`mt-4 text-f-text-accent ${isDeva(f.figure) ? "font-deva text-5xl leading-tight sm:text-6xl" : "display-xl"}`}>
              {f.figure}
            </p>
          ) : null}
          <p className="display-md mt-4">{f.title}</p>
          <p className="mt-3 max-w-2xl text-[1.08rem] leading-relaxed text-ink-2">{f.body}</p>
          <div className="mt-6 text-ink-3">{f.badge}</div>
        </div>
      </div>
      <style>{`@keyframes fact-in { from { opacity: 0; transform: translateY(14px) rotate(-0.6deg); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}
