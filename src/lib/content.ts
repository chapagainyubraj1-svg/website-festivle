/**
 * Data access layer.
 *
 * Pages read content only through these functions. In production the same
 * signatures can be backed by Supabase/PostgreSQL (see supabase/migrations and
 * docs/ARCHITECTURE.md); today they read the typed content modules, which are the
 * source of truth for the seed data.
 */
import { festivals } from "@/content";
import { roadmap } from "@/content/roadmap";
import { collections } from "@/content/collections";
import { communities, regions, communityBySlug, regionBySlug, traditionBySlug } from "@/content/taxonomy";
import { sources } from "@/content/sources";
import { collectCites, collectTerms } from "./inline";
import type { Chapter, Festival, Source } from "@/content/types";

export function getFestivals() {
  return festivals;
}

export function getFestival(slug: string) {
  return festivals.find((f) => f.slug === slug);
}

export function getRoadmap() {
  return roadmap;
}

export function getCollections() {
  return collections;
}

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function getCommunities() {
  return communities;
}

export function getCommunity(slug: string) {
  return communityBySlug[slug];
}

export function getRegions() {
  return regions;
}

export function getRegion(slug: string) {
  return regionBySlug[slug];
}

export function communityName(slug: string) {
  return communityBySlug[slug]?.name ?? prettify(slug);
}

export function regionName(slug: string) {
  return regionBySlug[slug]?.name ?? prettify(slug);
}

export function traditionName(slug: string) {
  return traditionBySlug[slug]?.name ?? prettify(slug);
}

export function prettify(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function festivalsForCommunity(slug: string) {
  return festivals.filter((f) => f.communities.includes(slug));
}

export function festivalsForRegion(slug: string) {
  return festivals.filter((f) => f.regions.includes(slug));
}

/** Every Rich string in a chapter, in reading order (for citation numbering & term extraction). */
export function chapterTexts(c: Chapter): string[] {
  const out: string[] = [];
  const push = (...xs: (string | undefined)[]) => xs.forEach((x) => x && out.push(x));
  push(...(c.essentials ?? []));
  switch (c.kind) {
    case "meaning":
      push(c.lead, ...c.body);
      c.concepts?.forEach((k) => push(k.note));
      c.perspectives?.forEach((p) => push(p.body, ...p.sources.map((s) => `[^${s}]`)));
      if (c.quote) push(c.quote.text, c.quote.attribution);
      break;
    case "timeline":
      push(c.intro);
      c.events.forEach((e) => push(e.body, e.caveat, ...e.sources.map((s) => `[^${s}]`)));
      c.unknowns?.forEach((u) => push(u));
      break;
    case "legend":
      push(c.intro);
      c.narratives.forEach((n) => {
        push(n.sourceText, ...n.sources.map((s) => `[^${s}]`));
        n.scenes.forEach((s) => push(s.body));
      });
      c.variations?.forEach((v) => push(v));
      break;
    case "rituals":
      push(c.intro, c.caution);
      c.rituals.forEach((r) => push(r.what, r.who, r.when, r.where, r.meaning, r.evidence, r.variation, ...r.sources.map((s) => `[^${s}]`)));
      break;
    case "days":
      push(c.intro);
      c.days.forEach((d) => push(d.summary, ...d.detail, ...d.sources.map((s) => `[^${s}]`)));
      push(c.note);
      break;
    case "map":
      push(c.intro);
      c.places.forEach((p) => push(p.body, ...p.sources.map((s) => `[^${s}]`)));
      c.diaspora?.forEach((d) => push(d.body, ...d.sources.map((s) => `[^${s}]`)));
      break;
    case "variations":
      push(c.intro);
      c.panels.forEach((p) => push(p.body, ...p.sources.map((s) => `[^${s}]`)));
      if (c.table) {
        c.table.rows.forEach((r) => push(...r.cells));
        push(...c.table.sources.map((s) => `[^${s}]`));
      }
      break;
    case "material":
      push(c.intro);
      c.plate?.hotspots.forEach((h) => push(h.body, ...h.sources.map((s) => `[^${s}]`)));
      c.items.forEach((i) => push(i.body, ...i.sources.map((s) => `[^${s}]`)));
      break;
    case "symbols":
      push(c.intro);
      c.symbols.forEach((s) => {
        push(s.context);
        s.meanings.forEach((m) => push(m.body));
        push(...s.sources.map((x) => `[^${x}]`));
      });
      break;
    case "facts":
      c.facts.forEach((f) => push(f.body, ...f.sources.map((s) => `[^${s}]`)));
      break;
    case "contemporary":
      push(c.lead);
      c.themes.forEach((t) => push(t.body, ...t.sources.map((s) => `[^${s}]`)));
      if (c.thenNow) push(c.thenNow.then, c.thenNow.now, ...c.thenNow.sources.map((s) => `[^${s}]`));
      break;
    case "media":
      push(c.intro);
      c.items.forEach((i) => push(i.caption));
      if (c.explainer) push(c.explainer.caption, c.explainer.transcript, ...c.explainer.sources.map((s) => `[^${s}]`));
      c.wishlist?.forEach((w) => push(w.why));
      break;
    case "decode":
      push(c.intro);
      c.text.lines.forEach((l) => l.parts.forEach((p) => push(p.gloss, p.note)));
      push(c.note, ...c.sources.map((s) => `[^${s}]`));
      break;
    case "cycle":
      push(c.intro);
      c.ring.forEach((r) => push(r.note));
      push(c.note, ...c.sources.map((s) => `[^${s}]`));
      break;
    case "explainer":
      push(c.intro);
      c.steps.forEach((s) => push(s.body));
      push(c.accuracyNote, ...c.sources.map((s) => `[^${s}]`));
      break;
    case "quiz":
      c.questions.forEach((q) => push(q.explain, ...q.sources.map((s) => `[^${s}]`)));
      break;
    case "interlude":
      push(c.text, c.attribution);
      break;
  }
  return out;
}

export function festivalTexts(f: Festival): string[] {
  return [f.dek, ...f.status.limitations, ...(f.status.openQuestions ?? []), ...f.chapters.flatMap(chapterTexts)];
}

/** Citation order for numbering, plus resolved sources. */
export function festivalCitations(f: Festival): { order: string[]; sources: Record<string, Source> } {
  const order = collectCites(f.chapters.flatMap(chapterTexts));
  const resolved: Record<string, Source> = {};
  for (const id of order) if (sources[id]) resolved[id] = sources[id];
  for (const id of f.furtherReading ?? []) if (sources[id]) resolved[id] = sources[id];
  return { order: order.filter((id) => sources[id]), sources: resolved };
}

export function festivalTerms(f: Festival) {
  return collectTerms(festivalTexts(f));
}
