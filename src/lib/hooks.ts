"use client";

import { useCallback, useSyncExternalStore } from "react";

const EVENT = "nfa-storage";

function subscribeStorage(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * A per-viewer preference stored in localStorage. Falls back gracefully when
 * storage is unavailable (private windows, blocked site data).
 */
export function useStoredValue(key: string, fallback: string): [string, (v: string | null) => void] {
  const value = useSyncExternalStore(
    subscribeStorage,
    () => read(key) ?? fallback,
    () => fallback,
  );
  const set = useCallback(
    (v: string | null) => {
      try {
        if (v === null) localStorage.removeItem(key);
        else localStorage.setItem(key, v);
      } catch {
        /* storage unavailable: preference applies to this view only */
      }
      window.dispatchEvent(new Event(EVENT));
    },
    [key],
  );
  return [value, set];
}

function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    mq.removeEventListener("change", cb);
    window.removeEventListener(EVENT, cb);
  };
}

/** True when the OS asks for reduced motion or the reader turned motion off here. */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches || read("nfa-motion") === "reduced",
    () => false,
  );
}
