"use client";

import { useId, useState, type ReactNode } from "react";
import { MAP_H, MAP_W, project, provinces } from "@/lib/geo-data";

export interface MapPlaceView {
  id: string;
  name: string;
  ne?: string;
  lat: number;
  lon: number;
  area?: boolean;
  body: ReactNode;
  badge?: ReactNode;
}

/**
 * Interactive map of Nepal's provinces with sourced places. Every marker is a
 * real button; the same places are listed beside the map for keyboard and
 * screen-reader users, and on small screens.
 */
export function NepalMap({ places, emphasis = [], compact = false }: { places: MapPlaceView[]; emphasis?: string[]; compact?: boolean }) {
  const [sel, setSel] = useState<string>(places[0]?.id ?? "");
  const id = useId();
  const selected = places.find((p) => p.id === sel);
  return (
    <figure className={`grid gap-8 ${compact ? "" : "lg:grid-cols-12"}`} aria-labelledby={`${id}-cap`}>
      <div className={compact ? "" : "lg:col-span-8"}>
        <div className="relative w-full" style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}>
          <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <pattern id={`${id}-hatch`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
                <line x1="0" y1="0" x2="0" y2="6" stroke="var(--f-accent)" strokeWidth="1.2" opacity="0.35" />
              </pattern>
            </defs>
            <g>
              {provinces.map((p) => (
                <path key={p.slug} d={p.d} fill="var(--paper-deep)" stroke="var(--paper)" strokeWidth={6} strokeLinejoin="round" />
              ))}
              {provinces.map((p) => (
                <path
                  key={`${p.slug}-f`}
                  d={p.d}
                  fill={emphasis.includes(p.slug) ? `url(#${id}-hatch)` : "transparent"}
                  stroke="var(--rule-strong)"
                  strokeWidth={1}
                  strokeLinejoin="round"
                />
              ))}
              {provinces.map((p) => (
                <text key={`${p.slug}-l`} x={p.label[0]} y={p.label[1]} textAnchor="middle" className="fill-[var(--ink-3)]" style={{ font: "600 11px var(--font-mukta), sans-serif", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  {p.name}
                </text>
              ))}
            </g>
          </svg>
          {places.map((p) => {
            const [x, y] = project(p.lon, p.lat);
            const active = sel === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSel(p.id)}
                aria-pressed={active}
                aria-label={`${p.name}${p.area ? " (approximate area)" : ""}`}
                style={{ left: `${(x / MAP_W) * 100}%`, top: `${(y / MAP_H) * 100}%` }}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
              >
                {p.area ? (
                  <span className={`block h-14 w-14 rounded-full border-2 border-dashed transition-colors sm:h-20 sm:w-20 ${active ? "border-f-accent bg-f-accent/20" : "border-ink-3/60 bg-ink/5 group-hover:border-f-accent"}`} />
                ) : (
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    {active ? <span className="absolute inset-0 animate-ping rounded-full bg-f-accent/40" /> : null}
                    <span className={`relative h-3.5 w-3.5 rounded-full border-2 border-white shadow ${active ? "bg-f-accent" : "bg-ink group-hover:bg-f-accent"}`} />
                  </span>
                )}
                <span className={`pointer-events-none absolute left-1/2 top-full mt-1 hidden -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-0.5 font-sans text-[0.7rem] text-paper sm:block ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`}>
                  {p.name}
                </span>
              </button>
            );
          })}
        </div>
        <figcaption id={`${id}-cap`} className="label mt-3 text-ink-3">
          Markers are approximate; dashed circles mark areas rather than points. Province boundaries from geoJSON-Nepal (Saugat Acharya, MIT licence), simplified.
        </figcaption>
      </div>
      <div className={compact ? "" : "lg:col-span-4"}>
        {selected ? (
          <div className="rounded-[4px] border border-rule bg-paper-raised p-6" aria-live="polite">
            {selected.badge}
            <p className="display-md mt-2">{selected.name}</p>
            {selected.ne ? (
              <p lang="ne" className="font-deva text-ink-2">
                {selected.ne}
              </p>
            ) : null}
            <p className="mt-3 leading-relaxed text-ink-2">{selected.body}</p>
          </div>
        ) : null}
        <ul className="mt-4 divide-y divide-rule border-y border-rule" aria-label="Places on the map">
          {places.map((p) => (
            <li key={p.id}>
              <button type="button" onClick={() => setSel(p.id)} aria-pressed={sel === p.id} className={`flex w-full items-center justify-between py-2.5 text-left ${sel === p.id ? "text-ink" : "text-ink-2 hover:text-ink"}`}>
                <span className="display-sm text-[1rem]">{p.name}</span>
                <span aria-hidden="true" className={sel === p.id ? "text-f-text-accent" : "text-ink-3"}>
                  ●
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
