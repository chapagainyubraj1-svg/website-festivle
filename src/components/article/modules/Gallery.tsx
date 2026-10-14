"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Item {
  id: string;
  alt: string;
  art: ReactNode;
  caption: ReactNode;
  credit: string;
  license: string;
  nature: "documentary" | "conceptual" | "archival";
  wide?: boolean;
}

const natureLabel = { documentary: "Documentary photograph", conceptual: "Original illustration — interpretive", archival: "Archival document" };

/** Gallery with an accessible lightbox (<dialog>), captions and credits. */
export function Gallery({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <li key={it.id} className={it.wide ? "sm:col-span-2 lg:row-span-2" : ""}>
            <figure>
              <button type="button" onClick={() => setOpen(i)} className="group block w-full overflow-hidden rounded-[4px] bg-black/20 text-left" aria-label={`Enlarge: ${it.alt}`}>
                <div className={`${it.wide ? "aspect-[16/10]" : "aspect-[4/3]"} transition-transform duration-700 group-hover:scale-[1.02]`}>{it.art}</div>
              </button>
              <figcaption className="mt-3">
                <span className="block leading-snug">{it.caption}</span>
                <span className="label mt-1 block text-ink-3">
                  {natureLabel[it.nature]} · {it.credit}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <dialog
        ref={ref}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === ref.current) setOpen(null);
        }}
        aria-label="Image viewer"
        className="m-auto max-h-[94vh] w-[min(1200px,96vw)] max-w-none bg-transparent p-0 text-[#f4eee2] backdrop:bg-black/85"
      >
        {open !== null ? (
          <figure>
            <div className="aspect-[16/10] overflow-hidden rounded-[4px]">{items[open].art}</div>
            <figcaption className="mt-4 flex flex-wrap items-start justify-between gap-4">
              <span className="max-w-3xl">
                <span className="block">{items[open].caption}</span>
                <span className="mt-1 block font-sans text-sm opacity-75">
                  {natureLabel[items[open].nature]} · {items[open].credit} · {items[open].license}
                </span>
              </span>
              <span className="flex gap-2">
                <button type="button" className="rounded-full border border-white/40 px-3 py-1 font-sans text-sm" onClick={() => setOpen((open - 1 + items.length) % items.length)} aria-label="Previous image">
                  ←
                </button>
                <button type="button" className="rounded-full border border-white/40 px-3 py-1 font-sans text-sm" onClick={() => setOpen((open + 1) % items.length)} aria-label="Next image">
                  →
                </button>
                <button type="button" className="rounded-full bg-white px-3 py-1 font-sans text-sm text-black" onClick={() => setOpen(null)} autoFocus>
                  Close
                </button>
              </span>
            </figcaption>
          </figure>
        ) : null}
      </dialog>
    </>
  );
}
