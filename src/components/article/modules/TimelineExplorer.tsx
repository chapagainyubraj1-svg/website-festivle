"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { Confidence, KnowledgeKind } from "@/content/types";
import { ConfidenceMeter, KindBadge, kindMeta } from "../KindBadge";

interface Ev {
  id: string;
  date: string;
  sortYear: number;
  title: string;
  kind: KnowledgeKind;
  confidence: Confidence;
  body: ReactNode;
  caveat: ReactNode | null;
  cites: ReactNode;
}

/**
 * Vertical, filterable timeline. Large gaps in time are shown as breaks rather
 * than compressed silently, so the reader sees how sparse early evidence is.
 */
export function TimelineExplorer({ events }: { events: Ev[] }) {
  const kinds = useMemo(() => [...new Set(events.map((e) => e.kind))], [events]);
  const [filter, setFilter] = useState<KnowledgeKind | "all">("all");
  const [open, setOpen] = useState<string | null>(null);
  const shown = events.filter((e) => filter === "all" || e.kind === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by kind of evidence">
        <span className="kicker mr-2 text-ink-3">Show</span>
        <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")} className={`label rounded-full border px-3 py-1 ${filter === "all" ? "border-f-accent bg-f-accent text-white" : "border-rule-strong"}`}>
          All
        </button>
        {kinds.map((k) => (
          <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)} className={`rounded-full border px-3 py-1 ${filter === k ? "border-f-accent bg-f-accent text-white" : "border-rule-strong text-ink-2"}`} title={kindMeta[k].description}>
            <KindBadge kind={k} compact />
          </button>
        ))}
      </div>

      <ol className="relative mt-12">
        <span aria-hidden="true" className="absolute bottom-0 left-[7.5rem] top-0 hidden w-px bg-rule-strong sm:block md:left-[11rem]" />
        {shown.map((e, i) => {
          const prev = shown[i - 1];
          const gap = prev ? e.sortYear - prev.sortYear : 0;
          const isOpen = open === e.id;
          return (
            <li key={e.id}>
              {gap > 400 ? (
                <div className="relative my-6 flex items-center gap-4 sm:pl-[8.5rem] md:pl-[12rem]" aria-label={`A gap of about ${Math.round(gap / 100) * 100} years`}>
                  <span className="label text-ink-3">≈ {Math.round(gap / 100) * 100} years</span>
                  <span className="h-px flex-1 border-t border-dashed border-rule-strong" />
                </div>
              ) : null}
              <div className="relative grid gap-2 py-5 sm:grid-cols-[7.5rem_1fr] md:grid-cols-[11rem_1fr]">
                <div className="sm:pr-6 sm:text-right">
                  <p className="display-sm text-[1.05rem] text-f-text-accent">{e.date}</p>
                </div>
                <div className="relative sm:pl-8">
                  <span aria-hidden="true" className="absolute -left-[5px] top-2 hidden h-[11px] w-[11px] rotate-45 border-2 border-f-accent bg-paper sm:block" />
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-ink-3">
                    <KindBadge kind={e.kind} />
                    <ConfidenceMeter level={e.confidence} />
                  </div>
                  <h3 className="display-sm mt-2">{e.title}</h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-ink-2">
                    {e.body}
                    {e.cites}
                  </p>
                  {e.caveat ? (
                    <div className="mt-3">
                      <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : e.id)} className="label text-ink-2 underline decoration-rule-strong underline-offset-4 hover:decoration-current">
                        {isOpen ? "Hide caveat" : "What the evidence does and doesn’t show"}
                      </button>
                      {isOpen ? <p className="mt-2 max-w-2xl border-l-2 border-f-accent pl-4 text-[0.95rem] text-ink-2">{e.caveat}</p> : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
