"use client";

import { useEffect, useState } from "react";

type Theme = "system" | "light" | "dark";

function readTheme(): Theme {
  try {
    const t = localStorage.getItem("nfa-theme");
    return t === "light" || t === "dark" ? t : "system";
  } catch {
    return "system";
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  useEffect(() => setTheme(readTheme()), []);

  const cycle = () => {
    const next: Theme = theme === "system" ? "dark" : theme === "dark" ? "light" : "system";
    setTheme(next);
    try {
      if (next === "system") localStorage.removeItem("nfa-theme");
      else localStorage.setItem("nfa-theme", next);
    } catch {
      /* storage unavailable: preference applies to this page view only */
    }
    if (next === "system") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", next);
  };

  const label = theme === "system" ? "Theme: system" : theme === "dark" ? "Theme: dark" : "Theme: light";
  return (
    <button type="button" onClick={cycle} className="rounded-full p-2 text-ink-2 hover:bg-paper-deep hover:text-ink" aria-label={`${label}. Change theme`} title={label}>
      <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" aria-hidden="true">
        {theme === "dark" ? (
          <path d="M14.5 12.8A6.5 6.5 0 0 1 7.2 5.5a6.5 6.5 0 1 0 7.3 7.3Z" fill="currentColor" />
        ) : theme === "light" ? (
          <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="10" cy="10" r="3.4" fill="currentColor" />
            <path d="M10 2.2v2M10 15.8v2M2.2 10h2M15.8 10h2M4.5 4.5l1.4 1.4M14.1 14.1l1.4 1.4M4.5 15.5l1.4-1.4M14.1 5.9l1.4-1.4" />
          </g>
        ) : (
          <g>
            <circle cx="10" cy="10" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 3.4a6.6 6.6 0 0 1 0 13.2Z" fill="currentColor" />
          </g>
        )}
      </svg>
    </button>
  );
}

export function MotionToggle() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    try {
      setReduced(localStorage.getItem("nfa-motion") === "reduced");
    } catch {
      /* ignore */
    }
  }, []);
  const toggle = () => {
    const next = !reduced;
    setReduced(next);
    try {
      if (next) localStorage.setItem("nfa-motion", "reduced");
      else localStorage.removeItem("nfa-motion");
    } catch {
      /* ignore */
    }
    if (next) document.documentElement.setAttribute("data-motion", "reduced");
    else document.documentElement.removeAttribute("data-motion");
  };
  return (
    <button type="button" onClick={toggle} aria-pressed={reduced} className="label underline decoration-rule-strong underline-offset-4 hover:decoration-current">
      {reduced ? "Motion reduced — restore animation" : "Reduce motion"}
    </button>
  );
}
