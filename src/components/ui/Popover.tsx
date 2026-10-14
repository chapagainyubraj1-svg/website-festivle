"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * Accessible disclosure popover.
 * - Trigger is a real <button> with aria-expanded/aria-controls.
 * - Panel is a labelled dialog-like region rendered in a portal and positioned
 *   next to the trigger; focus moves into it and returns on close.
 * - Closes on Escape, outside click, or scroll-out.
 */
export function Popover({
  trigger,
  triggerClassName,
  triggerLabel,
  children,
  width = 340,
  title,
}: {
  trigger: ReactNode;
  triggerClassName?: string;
  triggerLabel?: string;
  children: ReactNode;
  width?: number;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; placement: "below" | "above" } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const titleId = `${id}-title`;

  const place = useCallback(() => {
    const b = btnRef.current?.getBoundingClientRect();
    if (!b) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const w = Math.min(width, vw - 24);
    let left = b.left + b.width / 2 - w / 2;
    left = Math.max(12, Math.min(left, vw - w - 12));
    const panelH = panelRef.current?.offsetHeight ?? 220;
    const below = b.bottom + 10 + panelH < vh || b.top < panelH + 20;
    const top = below ? b.bottom + 10 + window.scrollY : b.top - 10 - panelH + window.scrollY;
    setPos({ top, left: left + window.scrollX, placement: below ? "below" : "above" });
  }, [width]);

  useLayoutEffect(() => {
    if (!open) return;
    place();
    // second pass once the panel has measured height
    const r = requestAnimationFrame(place);
    return () => cancelAnimationFrame(r);
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !btnRef.current?.contains(t)) setOpen(false);
    };
    const onResize = () => place();
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open, place]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className={triggerClassName}
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        aria-label={triggerLabel}
        onClick={() => setOpen((o) => !o)}
      >
        {trigger}
      </button>
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={panelRef}
            id={id}
            role="dialog"
            aria-labelledby={titleId}
            tabIndex={-1}
            onBlur={(e) => {
              const next = e.relatedTarget as Node | null;
              if (next && !panelRef.current?.contains(next) && next !== btnRef.current) setOpen(false);
            }}
            style={{
              position: "absolute",
              top: pos?.top ?? -9999,
              left: pos?.left ?? -9999,
              width: Math.min(width, typeof window !== "undefined" ? window.innerWidth - 24 : width),
              zIndex: 60,
            }}
            className="rounded-[3px] border border-rule-strong bg-paper-raised p-4 text-left text-ink shadow-[0_18px_50px_-20px_rgba(20,12,5,0.45)] outline-none"
          >
            <span id={titleId} className="sr-only">
              {title}
            </span>
            {children}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                btnRef.current?.focus();
              }}
              className="label mt-3 text-ink-3 underline underline-offset-2 hover:text-ink"
            >
              Close
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
