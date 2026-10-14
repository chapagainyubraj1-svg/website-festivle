/**
 * Search normalisation shared by server (index build) and client (queries).
 *
 * Nepali words are romanised in many ways (Dashain/Dasain, Laxmi/Lakshmi,
 * Teej/Tij, Chhath/Chath, Lhosar/Losar). We fold common variants to a canonical
 * skeleton so any spelling finds the article; Fuse.js then adds typo tolerance.
 */

export interface SearchEntry {
  id: string;
  type: "festival" | "roadmap" | "community" | "region" | "collection" | "term" | "story";
  title: string;
  ne?: string;
  href?: string;
  dek: string;
  keywords: string[];
  /** Normalised skeletons of title + keywords. */
  norm: string[];
  months?: string[];
  communities?: string[];
  regions?: string[];
  types?: string[];
  traditions?: string[];
  season?: string;
}

export function foldLatin(input: string): string {
  let s = input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ");
  s = s
    .replace(/x/g, "ks")
    .replace(/chh/g, "ch")
    .replace(/sh/g, "s")
    .replace(/w/g, "v")
    .replace(/ee/g, "i")
    .replace(/oo/g, "u")
    .replace(/aa/g, "a")
    .replace(/ph/g, "f")
    .replace(/lh/g, "l")
    .replace(/th/g, "t")
    .replace(/dh/g, "d")
    .replace(/bh/g, "b")
    .replace(/kh/g, "k")
    .replace(/gh/g, "g")
    .replace(/y(?=[^aeiou]|$)/g, "i")
    .replace(/(.)\1+/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return s;
}

export function foldDevanagari(input: string): string {
  return input
    .normalize("NFC")
    .replace(/[\u200C\u200D]/g, "")
    .replace(/\u0901/g, "\u0902") // chandrabindu → anusvara
    .replace(/\u093C/g, "") // nukta
    .replace(/\u094D(?=\s|$)/g, "") // trailing halant
    .replace(/[।॥]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeQuery(q: string): string {
  const hasDeva = /[\u0900-\u097F]/.test(q);
  return hasDeva ? foldDevanagari(q) : foldLatin(q);
}

export function skeletons(...texts: (string | undefined)[]): string[] {
  const out = new Set<string>();
  for (const t of texts) {
    if (!t) continue;
    const n = normalizeQuery(t);
    if (n) {
      out.add(n);
      out.add(n.replace(/\s+/g, ""));
    }
  }
  return [...out];
}

export const fuseOptions = {
  includeScore: true,
  ignoreLocation: true,
  threshold: 0.34,
  minMatchCharLength: 2,
  keys: [
    { name: "title", weight: 3 },
    { name: "ne", weight: 2.5 },
    { name: "norm", weight: 2.5 },
    { name: "keywords", weight: 1.6 },
    { name: "dek", weight: 0.6 },
  ],
};
