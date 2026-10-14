import type { Source } from "@/content/types";

const kindLabel: Record<Source["kind"], string> = {
  book: "Book",
  journal: "Journal article",
  chapter: "Book chapter",
  news: "Journalism",
  institution: "Institution",
  official: "Official record",
  reference: "Reference work",
  community: "Community source",
  web: "Web resource",
};

const methodLabel: Record<Source["verification"]["method"], string> = {
  bibliographic: "Bibliographic record checked",
  "search-summary": "Located; summary checked",
  "full-text": "Full text reviewed",
};

export function formatAuthors(a?: string[]) {
  if (!a || a.length === 0) return "";
  if (a.length <= 2) return a.join(" and ");
  return `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}`;
}

export function SourceLine({ source, number, compact }: { source: Source; number?: number; compact?: boolean }) {
  const authors = formatAuthors(source.authors);
  return (
    <span className="block">
      {number ? <span className="mr-1.5 font-sans text-[0.8em] font-semibold text-f-text-accent">{number}.</span> : null}
      {authors ? <span>{authors}, </span> : null}
      {source.url ? (
        <a href={source.url} target="_blank" rel="noopener noreferrer" className="italic underline decoration-rule-strong underline-offset-2 hover:decoration-current">
          {source.title}
        </a>
      ) : (
        <span className="italic">{source.title}</span>
      )}
      {source.publisher ? <span>. {source.publisher}</span> : null}
      {source.date ? <span>, {source.date}</span> : null}
      {source.details ? <span>, {source.details}</span> : null}
      <span>.</span>
      <span className="mt-1 block font-sans text-[0.75rem] leading-snug text-ink-3">
        {kindLabel[source.kind]} · {methodLabel[source.verification.method]} {formatDate(source.verification.checkedOn)}
        {!compact && source.supports ? <span className="block text-ink-2">Used for: {source.supports}</span> : null}
        {compact && source.supports ? <span className="block text-ink-2">{source.supports}</span> : null}
      </span>
    </span>
  );
}

export function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}
