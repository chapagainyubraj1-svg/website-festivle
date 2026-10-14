"use client";

import Fuse from "fuse.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { fuseOptions, normalizeQuery, type SearchEntry } from "@/lib/search";

const typeLabel: Record<SearchEntry["type"], string> = {
  festival: "Festival",
  roadmap: "In research",
  community: "People",
  region: "Region",
  collection: "Journey",
  term: "Glossary",
  story: "Story",
};

let cache: SearchEntry[] | null = null;

export async function loadIndex(): Promise<SearchEntry[]> {
  if (cache) return cache;
  const res = await fetch("/search-index.json");
  cache = (await res.json()) as SearchEntry[];
  return cache;
}

export function useSearch(entries: SearchEntry[] | null, query: string) {
  const fuse = useMemo(() => (entries ? new Fuse(entries, fuseOptions) : null), [entries]);
  return useMemo(() => {
    if (!fuse || query.trim().length < 2) return [];
    const q = query.trim();
    const n = normalizeQuery(q);
    const seen = new Map<string, { item: SearchEntry; score: number }>();
    for (const term of [q, n]) {
      for (const r of fuse.search(term, { limit: 20 })) {
        const prev = seen.get(r.item.id);
        const score = r.score ?? 1;
        if (!prev || score < prev.score) seen.set(r.item.id, { item: r.item, score });
      }
    }
    const typeRank: Record<string, number> = { festival: 0, collection: 1, community: 2, region: 2, story: 2, roadmap: 3, term: 4 };
    return [...seen.values()]
      .sort((a, b) => a.score - b.score || typeRank[a.item.type] - typeRank[b.item.type])
      .slice(0, 12)
      .map((x) => x.item);
  }, [fuse, query]);
}

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [entries, setEntries] = useState<SearchEntry[] | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState(false);
  const router = useRouter();
  const listId = useId();
  const results = useSearch(entries, query);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      requestAnimationFrame(() => inputRef.current?.focus());
      loadIndex()
        .then(setEntries)
        .catch(() => setFailed(true));
    } else if (!open && d.open) d.close();
  }, [open]);

  const go = (e: SearchEntry) => {
    if (!e.href) return;
    onClose();
    setQuery("");
    router.push(e.href);
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-label="Search the Atlas"
      className="m-0 mx-auto mt-[8vh] w-[min(680px,calc(100vw-24px))] max-w-none rounded-[4px] border border-rule-strong bg-paper-raised p-0 text-ink shadow-[0_30px_80px_-30px_rgba(10,6,2,0.6)] backdrop:bg-[rgba(20,14,8,0.45)] backdrop:backdrop-blur-[2px]"
    >
      <div className="flex items-center gap-3 border-b border-rule px-4 py-3">
        <svg viewBox="0 0 20 20" className="h-5 w-5 text-ink-3" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === "Enter" && results[active]) {
              e.preventDefault();
              go(results[active]);
            }
          }}
          placeholder="Search festivals, places, terms — in English or नेपाली"
          aria-label="Search"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls={listId}
          aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
          autoComplete="off"
          className="w-full bg-transparent py-1.5 font-serif text-lg outline-none placeholder:text-ink-3"
        />
        <button type="button" onClick={onClose} className="label rounded border border-rule px-2 py-0.5 text-ink-3 hover:text-ink">
          Esc
        </button>
      </div>
      <div className="max-h-[60vh] overflow-y-auto">
        {failed && <p className="p-4 text-ink-2">Search could not load. Browse the <Link href="/festivals" onClick={onClose}>encyclopedia</Link> instead.</p>}
        {query.trim().length < 2 ? (
          <div className="p-5">
            <p className="kicker text-ink-3">Try</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["दशैँ", "Dasain", "Laxmi", "Chath", "Losar", "Kumari", "jamara", "Tharu"].map((s) => (
                <button key={s} type="button" onClick={() => {
                    setQuery(s);
                    setActive(0);
                  }} className="label rounded-full border border-rule px-3 py-1 hover:border-rule-strong">
                  <span lang={/[ऀ-ॿ]/.test(s) ? "ne" : undefined}>{s}</span>
                </button>
              ))}
            </div>
            <p className="label mt-4 text-ink-3">Spellings are forgiving: Dashain, Dasain and दशैँ all find the same article.</p>
          </div>
        ) : results.length === 0 && entries ? (
          <p className="p-5 text-ink-2">
            Nothing found for “{query}”. The Atlas is growing — see the <Link href="/research" onClick={onClose}>research roadmap</Link>.
          </p>
        ) : (
          <ul id={listId} role="listbox" aria-label="Results" className="py-2">
            {results.map((r, i) => (
              <li
                key={r.id}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r)}
                className={`flex cursor-pointer items-baseline gap-3 px-4 py-2.5 ${i === active ? "bg-paper-deep" : ""}`}
              >
                <span className="kicker w-20 shrink-0 text-[0.62rem] text-ink-3">{typeLabel[r.type]}</span>
                <span className="min-w-0">
                  <span className="display-sm text-[1.08rem]">{r.title}</span>
                  {r.ne ? (
                    <span lang="ne" className="ml-2 font-deva text-[0.95rem] text-ink-2">
                      {r.ne}
                    </span>
                  ) : null}
                  <span className="mt-0.5 block truncate text-[0.88rem] text-ink-3">{r.dek}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </dialog>
  );
}
