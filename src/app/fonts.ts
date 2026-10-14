import { Fraunces, Mukta, Noto_Serif_Devanagari, Source_Serif_4, Tiro_Devanagari_Hindi } from "next/font/google";

/**
 * Typography system
 * - Fraunces: expressive editorial display face for Latin headlines.
 * - Source Serif 4: long-form reading face.
 * - Noto Serif Devanagari: Nepali body text, with full conjunct support.
 * - Tiro Devanagari Hindi: calligraphic display face for Nepali titles.
 * - Mukta: UI labels and captions; covers both Latin and Devanagari.
 */
export const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  variable: "--font-fraunces",
  display: "swap",
});

export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

export const notoDeva = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto-deva",
  display: "swap",
});

export const tiroDeva = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  weight: "400",
  variable: "--font-tiro-deva",
  display: "swap",
});

export const mukta = Mukta({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mukta",
  display: "swap",
});

export const fontVariables = [fraunces, sourceSerif, notoDeva, tiroDeva, mukta].map((f) => f.variable).join(" ");
