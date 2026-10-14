"use client";

import { useEffect, useState } from "react";

const KEY = "nfa-saved";

export function readSaved(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function writeSaved(list: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
    window.dispatchEvent(new Event("nfa-saved-change"));
  } catch {
    /* storage unavailable */
  }
}

/** Bookmark a story in this browser (no account needed). */
export function SaveButton({ slug, name, className = "" }: { slug: string; name: string; className?: string }) {
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const sync = () => setSaved(readSaved().includes(slug));
    sync();
    window.addEventListener("nfa-saved-change", sync);
    return () => window.removeEventListener("nfa-saved-change", sync);
  }, [slug]);
  const toggle = () => {
    const list = readSaved();
    writeSaved(saved ? list.filter((s) => s !== slug) : [...list, slug]);
  };
  return (
    <button type="button" onClick={toggle} aria-pressed={saved} className={`label inline-flex items-center gap-1.5 rounded-full border border-current/30 px-3 py-1.5 hover:border-current/60 ${className}`}>
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="M3.5 1.5h9v13l-4.5-3-4.5 3z" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
      {saved ? "Saved" : "Save"}
      <span className="sr-only"> {name}</span>
    </button>
  );
}

export function ShareButton({ title, className = "" }: { title: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const share = async () => {
    const url = window.location.href.split("#")[0];
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setState("copied");
    } catch (e) {
      if ((e as DOMException)?.name !== "AbortError") setState("failed");
    }
    setTimeout(() => setState("idle"), 2400);
  };
  return (
    <button type="button" onClick={share} className={`label inline-flex items-center gap-1.5 rounded-full border border-current/30 px-3 py-1.5 hover:border-current/60 ${className}`}>
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="M8 1.5v9M4.5 5 8 1.5 11.5 5M2.5 9.5v5h11v-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span aria-live="polite">{state === "copied" ? "Link copied" : state === "failed" ? "Copy failed" : "Share"}</span>
    </button>
  );
}
