import type { InterludeChapter } from "@/content/types";
import { renderInline } from "@/lib/inline";

/** A typographic pause between chapters. */
export function InterludeModule({ c }: { c: InterludeChapter }) {
  return (
    <section id={c.id} aria-label={c.title} className={`tone-${c.tone ?? "deep"} py-24 sm:py-32`}>
      <figure className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        {c.ne ? (
          <p lang="ne" className="deva-display text-3xl text-f-text-accent sm:text-4xl">
            {c.ne}
          </p>
        ) : null}
        <blockquote className="display-lg mt-6 text-balance">{renderInline(c.text, `${c.id}-t`)}</blockquote>
        {c.attribution ? <figcaption className="label mt-6 text-ink-3">{renderInline(c.attribution, `${c.id}-a`)}</figcaption> : null}
      </figure>
    </section>
  );
}
