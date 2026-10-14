/**
 * Nepal Festival Atlas — content model
 *
 * Content is authored as typed data so that it can be validated
 * (scripts/validate-content.ts), rendered statically, and exported to the
 * production PostgreSQL/Supabase schema (supabase/migrations, scripts/generate-seed.ts).
 *
 * Inline markup used inside `Rich` strings (parsed by src/lib/inline.tsx):
 *   **bold**   *italic*   [[term-id]]  [[term-id|shown text]]
 *   [^source-id]  [^id-a,id-b]       (citations → numbered, linked to the sources chapter)
 *   [label](/internal/path)          (internal links only)
 */

export type Rich = string;

/* ---------------------------------------------------------------- */
/* Evidence & research                                               */
/* ---------------------------------------------------------------- */

/** What kind of knowledge a statement represents. Displayed as a label wherever it matters. */
export type KnowledgeKind =
  | "historical" // documented evidence: inscriptions, chronicles, dated records
  | "scriptural" // religious or scriptural narrative
  | "oral" // oral tradition, legend, folk explanation
  | "community" // interpretation offered by practitioners or community voices
  | "scholarly" // scholarly analysis or hypothesis
  | "contemporary" // present-day practice as reported
  | "contested"; // sources disagree

export type Confidence = "high" | "medium" | "low";

export type SourceKind =
  | "book"
  | "journal"
  | "chapter"
  | "news"
  | "institution"
  | "official"
  | "reference"
  | "community"
  | "web";

export interface Source {
  id: string;
  kind: SourceKind;
  title: string;
  authors?: string[];
  /** Publisher, outlet, journal or institution. */
  publisher?: string;
  /** Year or ISO date of publication, as precise as known. */
  date?: string;
  /** e.g. "vol. 53, no. 2, pp. 259–305" */
  details?: string;
  url?: string;
  language?: "en" | "ne" | "fr" | "new" | "other";
  /** How this source was checked during the current research pass. */
  verification: {
    method: "bibliographic" | "search-summary" | "full-text";
    checkedOn: string; // ISO date
    note?: string;
  };
  /** What this source is used to support. Shown in the evidence panel. */
  supports?: string;
}

export interface ReviewStatus {
  /**
   * draft — written, not yet fact-checked end to end
   * researched — each major claim mapped to at least one located source
   * expert-reviewed — reviewed by a named subject specialist
   * community-reviewed — reviewed by named members of the communities represented
   */
  level: "draft" | "researched" | "expert-reviewed" | "community-reviewed";
  lastVerified: string; // ISO date
  reviewers: { name: string; role: string }[];
  limitations: Rich[];
  /** Topics still needing research or review before the article can be considered mature. */
  openQuestions?: Rich[];
}

/* ---------------------------------------------------------------- */
/* Taxonomy                                                          */
/* ---------------------------------------------------------------- */

export type NepaliMonth =
  | "Baisakh"
  | "Jestha"
  | "Asar"
  | "Shrawan"
  | "Bhadra"
  | "Asoj"
  | "Kartik"
  | "Mangsir"
  | "Poush"
  | "Magh"
  | "Falgun"
  | "Chaitra";

export type Season = "spring" | "summer-monsoon" | "autumn" | "winter";

export type FestivalType =
  | "harvest"
  | "new-year"
  | "light"
  | "procession"
  | "family"
  | "fasting"
  | "ancestors"
  | "agricultural"
  | "pilgrimage"
  | "masked-dance"
  | "renewal";

export interface Community {
  slug: string;
  name: string;
  nameNe: string;
  /** Short description for listings. */
  dek: string;
  intro: Rich[];
  sources: string[];
  regions: string[];
  traditions: string[];
}

export interface Region {
  slug: string;
  name: string;
  nameNe: string;
  dek: string;
  intro: Rich[];
  sources: string[];
}

export interface Tradition {
  slug: string;
  name: string;
  nameNe: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  ne?: string;
  romanized?: string;
  definition: Rich;
  /** Festivals where the term appears. */
  festivals?: string[];
  sources?: string[];
}

/* ---------------------------------------------------------------- */
/* Media                                                             */
/* ---------------------------------------------------------------- */

export type ArtKey =
  | "dashain"
  | "tihar"
  | "indra-jatra"
  | "chhath"
  | "holi"
  | "buddha-jayanti"
  | "teej"
  | "lhosar"
  | "maghi"
  | "bisket-jatra"
  | "sakela"
  | "gai-jatra"
  | "home";

export interface MediaItem {
  id: string;
  kind: "illustration" | "photograph" | "video" | "audio" | "map" | "document";
  /** Component key for built-in original artwork. */
  art?: string;
  src?: string;
  alt: string;
  caption: Rich;
  credit: string;
  license: string;
  /** Is the item documentary evidence, or a conceptual/interpretive work? */
  nature: "documentary" | "conceptual" | "archival";
  sourceUrl?: string;
  transcript?: Rich;
}

/** A photograph or recording the editors want to license; shown honestly in the media chapter. */
export interface MediaWish {
  subject: string;
  why: Rich;
  suggestedSources: string;
}

/* ---------------------------------------------------------------- */
/* Article modules                                                   */
/* ---------------------------------------------------------------- */

export interface ChapterBase {
  id: string;
  kicker?: string;
  title: string;
  /** Essentials-mode summary bullet points. */
  essentials?: Rich[];
  tone?: "paper" | "deep" | "accent" | "soft" | "night";
}

export interface MeaningChapter extends ChapterBase {
  kind: "meaning";
  lead: Rich;
  body: Rich[];
  /** Ideas shown as a connected constellation. */
  concepts?: { term: string; ne?: string; note: Rich }[];
  /** Interpretive lenses that coexist. */
  perspectives?: { label: string; kind: KnowledgeKind; body: Rich; sources: string[] }[];
  quote?: { text: Rich; ne?: string; attribution: Rich; sources?: string[] };
}

export interface TimelineEvent {
  id: string;
  date: string; // display label: "c. 400–600 CE", "1768"
  sortYear: number;
  title: string;
  body: Rich;
  kind: KnowledgeKind;
  confidence: Confidence;
  sources: string[];
  /** What is known vs not known, shown on expand. */
  caveat?: Rich;
}

export interface TimelineChapter extends ChapterBase {
  kind: "timeline";
  intro: Rich;
  events: TimelineEvent[];
  unknowns?: Rich[];
}

export interface LegendScene {
  title: string;
  art: string; // illustration key
  body: Rich;
  alt: string;
}

export interface LegendChapter extends ChapterBase {
  kind: "legend";
  intro: Rich;
  narratives: {
    id: string;
    title: string;
    kind: KnowledgeKind;
    sourceText: Rich; // where this narrative is recorded
    scenes: LegendScene[];
    sources: string[];
  }[];
  variations?: Rich[];
}

export interface Ritual {
  id: string;
  name: string;
  ne?: string;
  what: Rich;
  who?: Rich;
  when?: Rich;
  where?: Rich;
  objects?: string[];
  meaning?: Rich;
  evidence?: Rich;
  variation?: Rich;
  sources: string[];
  art?: string;
}

export interface RitualsChapter extends ChapterBase {
  kind: "rituals";
  intro: Rich;
  rituals: Ritual[];
  caution?: Rich;
}

export interface FestivalDay {
  id: string;
  dayLabel: string; // "Day 1", "Days 2–6"
  name: string;
  ne?: string;
  summary: Rich;
  detail: Rich[];
  art?: string;
  sources: string[];
  /** Timing note, e.g. "Ashwin Shukla Pratipada" */
  lunar?: string;
}

export interface DaysChapter extends ChapterBase {
  kind: "days";
  intro: Rich;
  days: FestivalDay[];
  note?: Rich;
}

export interface MapPlace {
  id: string;
  name: string;
  ne?: string;
  lat: number;
  lon: number;
  /** Approximate marker for an area rather than a point. */
  area?: boolean;
  body: Rich;
  sources: string[];
  kind?: KnowledgeKind;
}

export interface MapChapter extends ChapterBase {
  kind: "map";
  intro: Rich;
  places: MapPlace[];
  /** Provinces to emphasise (by slug in src/lib/geo). */
  emphasis?: string[];
  diaspora?: { place: string; body: Rich; sources: string[] }[];
}

export interface VariationsChapter extends ChapterBase {
  kind: "variations";
  intro: Rich;
  panels: { community: string; label: string; body: Rich; kind: KnowledgeKind; sources: string[] }[];
  table?: { caption: string; columns: string[]; rows: { label: string; cells: Rich[] }[]; sources: string[] };
}

export interface MaterialItem {
  id: string;
  name: string;
  ne?: string;
  category: "food" | "clothing" | "music" | "dance" | "decoration" | "object" | "art" | "place";
  body: Rich;
  art?: string;
  sources: string[];
}

export interface MaterialChapter extends ChapterBase {
  kind: "material";
  intro: Rich;
  items: MaterialItem[];
  /** Annotated plate: an illustration with numbered hotspots. */
  plate?: {
    art: string;
    title: string;
    alt: string;
    hotspots: { x: number; y: number; label: string; body: Rich; sources: string[] }[];
  };
}

export interface SymbolItem {
  id: string;
  name: string;
  ne?: string;
  art: string;
  context: Rich;
  meanings: { tradition: string; body: Rich; kind: KnowledgeKind }[];
  sources: string[];
}

export interface SymbolsChapter extends ChapterBase {
  kind: "symbols";
  intro: Rich;
  symbols: SymbolItem[];
}

export interface Fact {
  id: string;
  title: string;
  body: Rich;
  kind: KnowledgeKind;
  sources: string[];
  /** Visual treatment hint. */
  treatment?: "number" | "word" | "compare" | "quote" | "map";
  figure?: string; // e.g. "1756", "०", a word
}

export interface FactsChapter extends ChapterBase {
  kind: "facts";
  facts: Fact[];
}

export interface ContemporaryChapter extends ChapterBase {
  kind: "contemporary";
  lead: Rich;
  themes: { title: string; body: Rich; sources: string[]; figure?: { value: string; label: string } }[];
  thenNow?: { then: Rich; now: Rich; sources: string[] };
}

export interface MediaChapter extends ChapterBase {
  kind: "media";
  intro: Rich;
  items: MediaItem[];
  explainer?: { id: string; title: string; caption: Rich; transcript: Rich; sources: string[] };
  wishlist?: MediaWish[];
}

export interface DecodeChapter extends ChapterBase {
  kind: "decode";
  intro: Rich;
  /** A text (verse, song, inscription) annotated phrase by phrase. */
  text: {
    language: string;
    lines: { original: string; translit?: string; parts: { span: string; gloss: Rich; note?: Rich }[] }[];
  };
  note: Rich;
  sources: string[];
}

export interface CycleChapter extends ChapterBase {
  kind: "cycle";
  intro: Rich;
  /** A circular sequence (e.g. animal-year cycle, sun path). */
  ring: { label: string; ne?: string; note?: Rich }[];
  comparison?: { label: string; ring: string[] };
  note?: Rich;
  sources: string[];
}

export interface ExplainerChapter extends ChapterBase {
  kind: "explainer";
  intro: Rich;
  /** Animated, step-driven explainer; the component is chosen by key. */
  explainer: string;
  steps: { label: string; body: Rich }[];
  sources: string[];
  accuracyNote: Rich;
}

export interface QuizChapter extends ChapterBase {
  kind: "quiz";
  questions: { q: string; options: string[]; answer: number; explain: Rich; sources: string[] }[];
}

export interface InterludeChapter extends ChapterBase {
  kind: "interlude";
  text: Rich;
  ne?: string;
  attribution?: Rich;
  art?: string;
}

export type Chapter =
  | MeaningChapter
  | TimelineChapter
  | LegendChapter
  | RitualsChapter
  | DaysChapter
  | MapChapter
  | VariationsChapter
  | MaterialChapter
  | SymbolsChapter
  | FactsChapter
  | ContemporaryChapter
  | MediaChapter
  | DecodeChapter
  | CycleChapter
  | ExplainerChapter
  | QuizChapter
  | InterludeChapter;

export type ChapterKind = Chapter["kind"];

/* ---------------------------------------------------------------- */
/* Festival                                                          */
/* ---------------------------------------------------------------- */

export interface FestivalPalette {
  bg: string;
  ink: string;
  accent: string;
  accent2: string;
  deep: string;
  soft: string;
  /** Accent safe for text on light paper. */
  textAccent: string;
}

export interface Festival {
  slug: string;
  name: string;
  ne: string;
  romanized?: string;
  altNames: string[];
  /** Article depth. */
  tier: "flagship" | "feature";
  headline: string;
  dek: string;
  /** Meta description: unique, ≤ 160 chars. */
  description: string;
  traditions: string[];
  communities: string[];
  regions: string[];
  types: FestivalType[];
  months: NepaliMonth[];
  season: Season;
  gregorian: string;
  lunar?: string;
  duration: string;
  palette: FestivalPalette;
  art: ArtKey;
  /** Opening scene alt text for the cinematic illustration. */
  heroAlt: string;
  status: ReviewStatus;
  chapters: Chapter[];
  related: string[];
  /** Additional sources consulted but not cited inline. */
  furtherReading?: string[];
  /** Greeting presets for the studio. */
  greeting?: { short: string; ne: string; romanized: string };
}

/** Entry on the research roadmap — listed honestly as not yet written. */
export interface RoadmapEntry {
  slug: string;
  name: string;
  ne: string;
  communities: string[];
  regions: string[];
  months: NepaliMonth[];
  note: Rich;
  researchQuestions: string[];
}

export interface Collection {
  slug: string;
  title: string;
  dek: string;
  intro: Rich[];
  /** Ordered stops on the journey with a connecting thread. */
  stops: { festival: string; thread: Rich }[];
  palette: { bg: string; ink: string; accent: string };
}

export interface CalendarEntry {
  festival: string; // festival slug or roadmap slug
  label: string;
  date: string; // ISO date (start)
  end?: string; // ISO date (end, inclusive)
  bs?: string; // Bikram Sambat label as reported
  status: "announced" | "provisional" | "conflicting";
  note?: Rich;
  sources: string[];
}
