"use client";

import type { ReactNode } from "react";
import { Popover } from "@/components/ui/Popover";
import type { GlossaryTerm } from "@/content/types";

/** Inline glossary term with an expandable definition. */
export function TermRef({ term, children }: { term: GlossaryTerm; children: ReactNode }) {
  return (
    <Popover title={`Definition: ${term.term}`} trigger={children} triggerClassName="term-btn" triggerLabel={`${term.term}: show definition`}>
      <p className="display-sm">
        {term.term}
        {term.ne ? (
          <span lang="ne" className="ml-2 font-deva text-[0.95em] text-ink-2">
            {term.ne}
          </span>
        ) : null}
      </p>
      {term.romanized ? <p className="label mt-0.5 text-ink-3">{term.romanized}</p> : null}
      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{stripMarkup(term.definition)}</p>
      <a href={`/glossary#${term.id}`} className="label mt-2 inline-block text-ink-2 underline underline-offset-2">
        Open in the glossary
      </a>
    </Popover>
  );
}

function stripMarkup(s: string) {
  return s
    .replace(/\[\^[^\]]+\]/g, "")
    .replace(/\[\[([a-z0-9-]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([a-z0-9-]+)\]\]/g, "$1")
    .replace(/\*\*?(.+?)\*\*?/g, "$1");
}
