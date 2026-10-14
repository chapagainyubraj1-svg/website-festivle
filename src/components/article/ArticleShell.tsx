"use client";

import { createContext, useContext, type CSSProperties, type ReactNode } from "react";
import { useStoredValue } from "@/lib/hooks";

type Mode = "story" | "essentials";
const ModeContext = createContext<{ mode: Mode; setMode: (m: Mode) => void }>({ mode: "story", setMode: () => {} });

export function useReadingMode() {
  return useContext(ModeContext);
}

/** Article root: festival palette + reading mode (persisted per viewer). */
export function ArticleShell({ children, style, slug }: { children: ReactNode; style: CSSProperties; slug: string }) {
  const [stored, store] = useStoredValue("nfa-reading-mode", "story");
  const mode: Mode = stored === "essentials" ? "essentials" : "story";
  const setMode = (m: Mode) => store(m);
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <article data-reading-mode={mode} data-festival={slug} style={style} className="relative">
        {children}
      </article>
    </ModeContext.Provider>
  );
}

export function ReadingModeToggle({ className = "" }: { className?: string }) {
  const { mode, setMode } = useReadingMode();
  return (
    <div role="group" aria-label="Reading mode" className={`inline-flex rounded-full border border-current/30 p-0.5 ${className}`}>
      {(["story", "essentials"] as const).map((m) => (
        <button
          key={m}
          type="button"
          aria-pressed={mode === m}
          onClick={() => setMode(m)}
          className={`label rounded-full px-3 py-1 transition-colors ${mode === m ? "bg-current/15 font-semibold" : "opacity-80 hover:opacity-100"}`}
        >
          {m === "story" ? "Full story" : "Essentials"}
        </button>
      ))}
    </div>
  );
}
