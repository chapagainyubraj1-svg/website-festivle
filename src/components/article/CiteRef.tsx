"use client";

import { Popover } from "@/components/ui/Popover";
import { useCitations } from "./ArticleContext";
import { SourceLine } from "./SourceLine";

/** Superscript citation marker. Opens an "explore the evidence" panel. */
export function CiteRef({ ids }: { ids: string[] }) {
  const { order, sources } = useCitations();
  const known = ids.filter((id) => sources[id]);
  if (known.length === 0) return null;
  const nums = known.map((id) => order.indexOf(id) + 1).filter((n) => n > 0);
  const label = nums.length ? nums.join(",") : "src";
  return (
    <Popover
      title={`Sources ${label}`}
      trigger={<>[{label}]</>}
      triggerClassName="cite-btn"
      triggerLabel={`Source${known.length > 1 ? "s" : ""} ${label}: explore the evidence`}
      width={380}
    >
      <p className="kicker mb-2 text-f-text-accent">Explore the evidence</p>
      <ol className="space-y-3">
        {known.map((id) => (
          <li key={id} className="text-[0.92rem] leading-snug">
            <SourceLine source={sources[id]} number={order.indexOf(id) + 1} compact />
          </li>
        ))}
      </ol>
      <a href="#sources" className="label mt-3 inline-block text-ink-2 underline underline-offset-2">
        All sources for this article
      </a>
    </Popover>
  );
}
