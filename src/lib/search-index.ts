import { getCollections, getCommunities, getFestivals, getRegions, getRoadmap } from "./content";
import { glossaryList } from "@/content/glossary";
import { stories } from "@/content/stories";
import { plain } from "./inline";
import { skeletons, type SearchEntry } from "./search";

/** Builds the full search index (server only). Served statically at /search-index.json. */
export function buildSearchIndex(): SearchEntry[] {
  const out: SearchEntry[] = [];
  for (const f of getFestivals()) {
    out.push({
      id: `festival:${f.slug}`,
      type: "festival",
      title: f.name,
      ne: f.ne,
      href: `/festivals/${f.slug}`,
      dek: f.dek,
      keywords: [...f.altNames, f.romanized ?? "", f.gregorian, ...f.months],
      norm: skeletons(f.name, f.ne, ...f.altNames),
      months: f.months,
      communities: f.communities,
      regions: f.regions,
      types: f.types,
      traditions: f.traditions,
      season: f.season,
    });
  }
  for (const r of getRoadmap()) {
    out.push({
      id: `roadmap:${r.slug}`,
      type: "roadmap",
      title: r.name,
      ne: r.ne,
      href: `/research#${r.slug}`,
      dek: r.note,
      keywords: [...r.months],
      norm: skeletons(r.name, r.ne),
      months: r.months,
      communities: r.communities,
      regions: r.regions,
    });
  }
  for (const c of getCommunities()) {
    out.push({ id: `community:${c.slug}`, type: "community", title: c.name, ne: c.nameNe, href: `/communities/${c.slug}`, dek: c.dek, keywords: [], norm: skeletons(c.name, c.nameNe) });
  }
  for (const r of getRegions()) {
    out.push({ id: `region:${r.slug}`, type: "region", title: r.name, ne: r.nameNe, href: `/regions/${r.slug}`, dek: r.dek, keywords: [], norm: skeletons(r.name, r.nameNe) });
  }
  for (const c of getCollections()) {
    out.push({ id: `collection:${c.slug}`, type: "collection", title: c.title, href: `/collections/${c.slug}`, dek: c.dek, keywords: [], norm: skeletons(c.title) });
  }
  for (const s of stories) {
    out.push({ id: `story:${s.slug}`, type: "story", title: s.title, href: `/stories/${s.slug}`, dek: s.dek, keywords: s.keywords, norm: skeletons(s.title, ...s.keywords) });
  }
  for (const t of glossaryList) {
    out.push({
      id: `term:${t.id}`,
      type: "term",
      title: t.term,
      ne: t.ne,
      href: `/glossary#${t.id}`,
      dek: plain(t.definition),
      keywords: [t.romanized ?? ""],
      norm: skeletons(t.term, t.ne, t.romanized),
    });
  }
  return out;
}
