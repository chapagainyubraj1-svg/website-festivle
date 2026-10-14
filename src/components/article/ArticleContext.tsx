"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Source } from "@/content/types";

interface CitationState {
  order: string[];
  sources: Record<string, Source>;
}

const CitationContext = createContext<CitationState>({ order: [], sources: {} });

export function CitationProvider({ order, sources, children }: CitationState & { children: ReactNode }) {
  return <CitationContext.Provider value={{ order, sources }}>{children}</CitationContext.Provider>;
}

export function useCitations() {
  return useContext(CitationContext);
}
