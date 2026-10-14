import Link from "next/link";
import type { Festival, Source } from "@/content/types";
import { renderInline } from "@/lib/inline";
import { site } from "@/lib/site";
import { SourceLine, formatDate } from "./SourceLine";
import { KindLegend } from "./KindBadge";

const levelText: Record<Festival["status"]["level"], { label: string; text: string }> = {
  draft: { label: "Draft", text: "Written but not yet fully fact-checked." },
  researched: { label: "Researched", text: "Each major claim is mapped to at least one located source. Not yet reviewed by subject experts or community members." },
  "expert-reviewed": { label: "Expert reviewed", text: "Reviewed by a named subject specialist." },
  "community-reviewed": { label: "Community reviewed", text: "Reviewed by named members of the communities represented." },
};

export function SourcesChapter({ f, order, sources, related }: { f: Festival; order: string[]; sources: Record<string, Source>; related: Festival[] }) {
  const further = (f.furtherReading ?? []).filter((id) => sources[id] && !order.includes(id));
  const lvl = levelText[f.status.level];
  const correction = site.correctionsUrl(`Correction: ${f.name}`, `Article: ${site.url}/festivals/${f.slug}\n\nWhat should change:\n\nEvidence or source:\n\nYour connection to this tradition (optional):\n`);
  return (
    <section id="sources" aria-labelledby="sources-title" className="tone-paper scroll-mt-20 border-t border-rule py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 md:grid-cols-12">
          <p className="kicker text-f-text-accent md:col-span-4">Sources &amp; method</p>
          <h2 id="sources-title" className="display-lg md:col-span-8">
            How we know what we know
          </h2>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <aside className="md:col-span-4">
            <div className="rounded-[4px] border border-rule bg-paper-raised p-6">
              <p className="kicker text-ink-3">Review status</p>
              <p className="display-sm mt-2">{lvl.label}</p>
              <p className="mt-2 text-[0.95rem] text-ink-2">{lvl.text}</p>
              <dl className="mt-5 space-y-3 text-[0.92rem]">
                <div>
                  <dt className="kicker text-[0.62rem] text-ink-3">Last verified</dt>
                  <dd>{formatDate(f.status.lastVerified)}</dd>
                </div>
                <div>
                  <dt className="kicker text-[0.62rem] text-ink-3">Reviewers</dt>
                  <dd>{f.status.reviewers.length ? f.status.reviewers.map((r) => `${r.name} (${r.role})`).join("; ") : "None yet — we are seeking reviewers from the communities concerned."}</dd>
                </div>
                <div>
                  <dt className="kicker text-[0.62rem] text-ink-3">Sources cited</dt>
                  <dd>{order.length}</dd>
                </div>
              </dl>
              <a href={correction} target="_blank" rel="noopener noreferrer" className="label mt-6 inline-flex rounded-full bg-ink px-4 py-2 font-semibold text-paper no-underline">
                Suggest a correction
              </a>
              <p className="label mt-3 text-ink-3">Opens a public GitHub issue so every correction is traceable.</p>
            </div>
            <div className="mt-8">
              <p className="kicker mb-3 text-ink-3">How claims are labelled</p>
              <KindLegend />
              <Link href="/about" className="label mt-4 inline-block underline underline-offset-4">
                Read the editorial method
              </Link>
            </div>
          </aside>

          <div className="md:col-span-8">
            <h3 className="display-sm">References</h3>
            <ol className="mt-4 space-y-4">
              {order.map((id, i) => (
                <li key={id} id={`src-${id}`} className="text-[0.97rem] leading-relaxed">
                  <SourceLine source={sources[id]} number={i + 1} />
                </li>
              ))}
            </ol>
            {further.length ? (
              <>
                <h3 className="display-sm mt-12">Further reading</h3>
                <ul className="mt-4 space-y-4">
                  {further.map((id) => (
                    <li key={id} className="text-[0.97rem] leading-relaxed">
                      <SourceLine source={sources[id]} />
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <h3 className="display-sm mt-12">Limitations</h3>
            <ul className="mt-4 space-y-3">
              {f.status.limitations.map((l, i) => (
                <li key={i} className="flex gap-3 text-ink-2">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-f-accent" />
                  <span>{renderInline(l, `lim-${i}`)}</span>
                </li>
              ))}
            </ul>
            {f.status.openQuestions?.length ? (
              <>
                <h3 className="display-sm mt-12">Open research questions</h3>
                <ul className="mt-4 space-y-3">
                  {f.status.openQuestions.map((q, i) => (
                    <li key={i} className="flex gap-3 text-ink-2">
                      <span aria-hidden="true" className="mt-1 font-sans text-sm text-f-text-accent">
                        ?
                      </span>
                      <span>{renderInline(q, `oq-${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>

        {related.length ? (
          <nav aria-label="Related festivals" className="mt-20 border-t border-rule pt-10">
            <p className="kicker text-ink-3">Continue exploring</p>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/festivals/${r.slug}`} className="group block no-underline">
                    <span className="block h-1.5 w-12 transition-all group-hover:w-20" style={{ background: r.palette.accent }} />
                    <span className="display-sm mt-3 block group-hover:underline">{r.name}</span>
                    <span lang="ne" className="font-deva text-ink-3">
                      {r.ne}
                    </span>
                    <span className="mt-1 block text-[0.92rem] text-ink-2">{r.dek}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </section>
  );
}
