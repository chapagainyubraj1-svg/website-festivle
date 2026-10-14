"use client";

import { useEffect, useState } from "react";

export interface NavItem {
  id: string;
  label: string;
  kicker?: string;
}

/** Sticky chapter rail (desktop) and chapter sheet (mobile) with reading progress. */
export function ChapterNav({ items, title }: { items: NavItem[]; title: string }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const onScroll = () => {
      const article = document.querySelector("article[data-festival]") as HTMLElement | null;
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setProgress(Math.max(0, Math.min(1, -rect.top / Math.max(total, 1))));
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  const current = items.find((i) => i.id === active);

  return (
    <>
      {/* progress bar */}
      <div aria-hidden="true" className="fixed left-0 right-0 top-16 z-30 h-[3px] bg-transparent">
        <div className="h-full origin-left bg-f-accent transition-transform duration-150" style={{ transform: `scaleX(${progress})` }} />
      </div>

      {/* desktop rail */}
      <nav
        aria-label="Chapters"
        className={`no-print fixed left-5 top-28 z-20 hidden w-52 transition-opacity duration-500 2xl:block ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <p className="kicker mb-3 text-ink-3">{title}</p>
        <ol className="space-y-1 border-l border-rule">
          {items.map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={active === i.id ? "location" : undefined}
                className={`-ml-px block border-l-2 py-1 pl-3 text-[0.84rem] leading-snug no-underline transition-colors ${active === i.id ? "border-f-accent text-ink" : "border-transparent text-ink-3 hover:text-ink"}`}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* mobile / tablet chapter button */}
      <div className={`no-print fixed bottom-4 left-1/2 z-30 -translate-x-1/2 transition-all duration-300 2xl:hidden ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="chapter-sheet"
          className="label flex max-w-[86vw] items-center gap-2 rounded-full border border-rule-strong bg-paper-raised px-4 py-2.5 text-ink shadow-[0_12px_30px_-14px_rgba(0,0,0,0.5)]"
        >
          <span className="kicker text-[0.62rem] text-ink-3">Chapter</span>
          <span className="truncate">{current?.label ?? "Contents"}</span>
          <span aria-hidden="true">▴</span>
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 2xl:hidden" role="dialog" aria-modal="true" aria-label="Chapters" id="chapter-sheet">
          <button type="button" aria-label="Close chapters" className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[75vh] overflow-y-auto rounded-t-[10px] bg-paper-raised p-5 pb-8">
            <div className="mb-3 flex items-center justify-between">
              <p className="kicker text-ink-3">{title}</p>
              <button type="button" onClick={() => setOpen(false)} className="label underline" autoFocus>
                Close
              </button>
            </div>
            <ol className="divide-y divide-rule">
              {items.map((i) => (
                <li key={i.id}>
                  <a href={`#${i.id}`} onClick={() => setOpen(false)} className={`flex gap-3 py-3 no-underline ${active === i.id ? "text-ink" : "text-ink-2"}`}>
                    <span className="kicker w-16 shrink-0 pt-1 text-[0.62rem] text-ink-3">{i.kicker}</span>
                    <span className="display-sm text-[1.05rem]">{i.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </>
  );
}
