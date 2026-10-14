import type { ContemporaryChapter } from "@/content/types";
import { renderInline } from "@/lib/inline";
import { ChapterFrame } from "../ChapterFrame";

export function ContemporaryModule({ c }: { c: ContemporaryChapter }) {
  const [feature, ...rest] = c.themes;
  return (
    <ChapterFrame chapter={c} wide>
      <p data-reveal className="display-md max-w-4xl text-balance">
        {renderInline(c.lead, `${c.id}-lead`)}
      </p>
      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        {feature ? (
          <div data-reveal className="lg:col-span-5">
            {feature.figure ? (
              <div className="border-y-2 border-ink py-6">
                <p className="display-xl text-f-text-accent">{feature.figure.value}</p>
                <p className="label mt-2 text-ink-3">{feature.figure.label}</p>
              </div>
            ) : null}
            <h3 className="display-sm mt-6">{feature.title}</h3>
            <p className="mt-2 leading-relaxed text-ink-2">
              {renderInline(feature.body, `${c.id}-f`)}
              {renderInline(`[^${feature.sources.join(",")}]`, `${c.id}-fs`)}
            </p>
          </div>
        ) : null}
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7">
          {rest.map((t, i) => (
            <div key={i} data-reveal>
              {t.figure ? (
                <p className="display-lg text-f-text-accent">
                  {t.figure.value}
                  <span className="label mt-1 block text-ink-3">{t.figure.label}</span>
                </p>
              ) : (
                <span aria-hidden="true" className="block h-[3px] w-10 bg-f-accent" />
              )}
              <h3 className="display-sm mt-4">{t.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-2">
                {renderInline(t.body, `${c.id}-t${i}`)}
                {renderInline(`[^${t.sources.join(",")}]`, `${c.id}-ts${i}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
      {c.thenNow ? (
        <div className="mt-20 grid overflow-hidden rounded-[4px] border border-rule md:grid-cols-2">
          <div className="bg-paper-deep p-8 sm:p-10">
            <p className="kicker text-ink-3">Then</p>
            <p className="display-sm mt-3 leading-snug">{renderInline(c.thenNow.then, `${c.id}-then`)}</p>
          </div>
          <div className="bg-paper-raised p-8 sm:p-10">
            <p className="kicker text-f-text-accent">Now</p>
            <p className="display-sm mt-3 leading-snug">
              {renderInline(c.thenNow.now, `${c.id}-now`)}
              {renderInline(`[^${c.thenNow.sources.join(",")}]`, `${c.id}-tns`)}
            </p>
          </div>
        </div>
      ) : null}
    </ChapterFrame>
  );
}
