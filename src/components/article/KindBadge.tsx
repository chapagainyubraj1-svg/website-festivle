import type { Confidence, KnowledgeKind } from "@/content/types";

export const kindMeta: Record<KnowledgeKind, { label: string; short: string; description: string }> = {
  historical: { label: "Documented history", short: "History", description: "Supported by dated records, inscriptions or contemporary documents." },
  scriptural: { label: "Religious narrative", short: "Scripture", description: "A story from a religious text; meaningful to believers, not a historical record." },
  oral: { label: "Oral tradition", short: "Oral tradition", description: "Passed down by word of mouth or local custom; not documented in written records we have found." },
  community: { label: "Community interpretation", short: "Community view", description: "An explanation offered by practitioners or community members." },
  scholarly: { label: "Scholarly analysis", short: "Scholarship", description: "An argument or finding from published research." },
  contemporary: { label: "Contemporary practice", short: "Practice today", description: "How the festival is observed now, as reported." },
  contested: { label: "Sources disagree", short: "Contested", description: "Sources conflict, or a single source has not been corroborated." },
};

function Glyph({ kind }: { kind: KnowledgeKind }) {
  const common = { width: 10, height: 10, viewBox: "0 0 10 10", "aria-hidden": true as const };
  switch (kind) {
    case "historical":
      return (
        <svg {...common}>
          <rect x="1" y="1" width="8" height="8" fill="currentColor" />
        </svg>
      );
    case "scriptural":
      return (
        <svg {...common}>
          <path d="M5 0.5 L9.5 5 L5 9.5 L0.5 5 Z" fill="currentColor" />
        </svg>
      );
    case "oral":
      return (
        <svg {...common}>
          <circle cx="5" cy="5" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "community":
      return (
        <svg {...common}>
          <circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M5 1 A4 4 0 0 1 5 9 Z" fill="currentColor" />
        </svg>
      );
    case "scholarly":
      return (
        <svg {...common}>
          <path d="M5 1 L9.2 9 H0.8 Z" fill="currentColor" />
        </svg>
      );
    case "contemporary":
      return (
        <svg {...common}>
          <circle cx="5" cy="5" r="4" fill="currentColor" />
        </svg>
      );
    case "contested":
      return (
        <svg {...common}>
          <path d="M5 0.8 L9.2 5 L5 9.2 L0.8 5 Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
  }
}

export function KindBadge({ kind, compact = false, className = "" }: { kind: KnowledgeKind; compact?: boolean; className?: string }) {
  const m = kindMeta[kind];
  return (
    <span className={`inline-flex items-center gap-1.5 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.1em] ${className}`} title={m.description}>
      <Glyph kind={kind} />
      {compact ? m.short : m.label}
    </span>
  );
}

export function ConfidenceMeter({ level }: { level: Confidence }) {
  const n = level === "high" ? 3 : level === "medium" ? 2 : 1;
  return (
    <span className="inline-flex items-center gap-1.5 font-sans text-[0.72rem] text-ink-3" title={`Confidence: ${level}`}>
      <span className="flex gap-0.5" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <span key={i} className={`h-2.5 w-1.5 rounded-[1px] ${i <= n ? "bg-current" : "bg-rule"}`} />
        ))}
      </span>
      <span>Confidence: {level}</span>
    </span>
  );
}

export function KindLegend({ kinds }: { kinds?: KnowledgeKind[] }) {
  const list = kinds ?? (Object.keys(kindMeta) as KnowledgeKind[]);
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2">
      {list.map((k) => (
        <li key={k} className="text-ink-2">
          <KindBadge kind={k} compact />
        </li>
      ))}
    </ul>
  );
}
