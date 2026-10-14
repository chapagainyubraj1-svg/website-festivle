"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { explainerVisuals } from "./explainers";
import { useReducedMotion } from "@/lib/hooks";

/** Step-driven animated explainer with play/pause, keyboard and reduced-motion support. */
export function StepExplainer({ kind, steps, title }: { kind: string; steps: { label: string; body: ReactNode }[]; title: string }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reduced = useReducedMotion();
  const id = useId();
  const Visual = explainerVisuals[kind];

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setI((x) => {
        if (x >= steps.length - 1) {
          setPlaying(false);
          return x;
        }
        return x + 1;
      });
    }, 2600);
    return () => clearInterval(t);
  }, [playing, steps.length]);

  return (
    <div className="grid items-center gap-10 md:grid-cols-12">
      <figure className="md:col-span-7" aria-labelledby={`${id}-cap`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-paper-raised">
          {Visual ? <Visual step={i} total={steps.length} reduced={reduced} /> : null}
        </div>
        <figcaption id={`${id}-cap`} className="sr-only">
          {title}: step {i + 1} of {steps.length}, {steps[i].label}.
        </figcaption>
      </figure>
      <div className="md:col-span-5">
        <div className="flex items-center gap-2" role="group" aria-label="Explainer controls">
          <button type="button" onClick={() => setI((x) => Math.max(0, x - 1))} disabled={i === 0} className="label rounded-full border border-rule-strong px-3 py-1.5 disabled:opacity-30">
            ← Back
          </button>
          <button
            type="button"
            onClick={() => {
              if (i >= steps.length - 1) setI(0);
              setPlaying((p) => !p);
            }}
            aria-pressed={playing}
            className="label rounded-full bg-f-accent px-4 py-1.5 font-semibold text-white"
          >
            {playing ? "Pause" : i >= steps.length - 1 ? "Replay" : "Play"}
          </button>
          <button type="button" onClick={() => setI((x) => Math.min(steps.length - 1, x + 1))} disabled={i === steps.length - 1} className="label rounded-full border border-rule-strong px-3 py-1.5 disabled:opacity-30">
            Next →
          </button>
        </div>
        <ol className="mt-6 space-y-1" aria-label="Steps">
          {steps.map((s, k) => (
            <li key={k}>
              <div className={`rounded-[3px] border-l-2 px-4 py-3 transition-colors ${k === i ? "border-f-accent bg-paper-raised" : "border-transparent hover:bg-paper-raised/60"}`}>
                <button
                  type="button"
                  onClick={() => {
                    setPlaying(false);
                    setI(k);
                  }}
                  aria-current={k === i ? "step" : undefined}
                  className={`kicker block text-left text-[0.66rem] underline-offset-4 hover:underline ${k === i ? "text-f-text-accent" : "text-ink-3"}`}
                >
                  {s.label}
                </button>
                <p className={`mt-1 text-[0.98rem] leading-relaxed ${k === i ? "text-ink" : "text-ink-3"}`}>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
