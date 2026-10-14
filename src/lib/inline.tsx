import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { glossary, inlineLabel } from "@/content/glossary";
import { CiteRef } from "@/components/article/CiteRef";
import { TermRef } from "@/components/article/TermRef";
import type { Rich } from "@/content/types";

/**
 * Lightweight inline markup → React.
 * Supported: **bold**, *italic*, [[term]], [[term|label]], [^src,src], [label](/path)
 * Runs of Devanagari are wrapped in <span lang="ne"> so assistive technology
 * switches voice and the Devanagari font stack applies.
 */

const TOKEN =
  /(\*\*(?<bold>.+?)\*\*)|(\*(?<em>[^*\s][^*]*?)\*)|(\[\[(?<term>[a-z0-9-]+)(?:\|(?<termLabel>[^\]]+))?\]\])|(\[\^(?<cite>[a-z0-9,\- ]+)\])|(\[(?<linkLabel>[^\]]+)\]\((?<href>\/[^)\s]*)\))/g;

const DEVANAGARI_RUN = /([\u0900-\u097F][\u0900-\u097F\u200C\u200D\s।॥'’\-–]*[\u0900-\u097F।॥]|[\u0900-\u097F])/g;

export function withLang(text: string, keyBase = "t"): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(DEVANAGARI_RUN)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push(text.slice(last, idx));
    out.push(
      <span lang="ne" key={`${keyBase}-ne-${i++}`}>
        {m[0]}
      </span>,
    );
    last = idx + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function renderInline(text: Rich, keyBase = "i"): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let n = 0;
  for (const m of text.matchAll(TOKEN)) {
    const idx = m.index ?? 0;
    if (idx > last) nodes.push(...withLang(text.slice(last, idx), `${keyBase}-${n}`));
    const g = m.groups ?? {};
    const key = `${keyBase}-${n++}`;
    if (g.bold) {
      nodes.push(<strong key={key}>{renderInline(g.bold, key)}</strong>);
    } else if (g.em) {
      nodes.push(<em key={key}>{renderInline(g.em, key)}</em>);
    } else if (g.term) {
      const term = glossary[g.term];
      const label = g.termLabel ?? (term ? inlineLabel(term) : g.term);
      nodes.push(
        term ? (
          <TermRef key={key} term={term}>
            {label}
          </TermRef>
        ) : (
          <Fragment key={key}>{label}</Fragment>
        ),
      );
    } else if (g.cite) {
      const ids = g.cite
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      nodes.push(<CiteRef key={key} ids={ids} />);
    } else if (g.linkLabel && g.href) {
      nodes.push(
        <Link key={key} href={g.href}>
          {renderInline(g.linkLabel, key)}
        </Link>,
      );
    }
    last = idx + m[0].length;
  }
  if (last < text.length) nodes.push(...withLang(text.slice(last), `${keyBase}-end`));
  return nodes;
}

export function Inline({ text }: { text: Rich }) {
  return <>{renderInline(text)}</>;
}

export function Paras({ items, className }: { items: Rich[]; className?: string }) {
  return (
    <div className={`prose-atlas ${className ?? ""}`}>
      {items.map((p, i) => (
        <p key={i}>{renderInline(p, `p${i}`)}</p>
      ))}
    </div>
  );
}

/** Strip markup to plain text (for meta descriptions, alt text, JSON-LD, search). */
export function plain(text: Rich): string {
  return text
    .replace(/\[\^[^\]]+\]/g, "")
    .replace(/\[\[([a-z0-9-]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([a-z0-9-]+)\]\]/g, (_, id: string) => (glossary[id] ? inlineLabel(glossary[id]) : id))
    .replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, "$1")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/** Collect citation ids in order of first appearance. */
export function collectCites(texts: Iterable<string>): string[] {
  const seen = new Set<string>();
  const order: string[] = [];
  for (const t of texts) {
    for (const m of t.matchAll(/\[\^([a-z0-9,\- ]+)\]/g)) {
      for (const id of m[1].split(",").map((s) => s.trim())) {
        if (id && !seen.has(id)) {
          seen.add(id);
          order.push(id);
        }
      }
    }
  }
  return order;
}

export function collectTerms(texts: Iterable<string>): string[] {
  const seen = new Set<string>();
  for (const t of texts) for (const m of t.matchAll(/\[\[([a-z0-9-]+)/g)) seen.add(m[1]);
  return [...seen];
}
