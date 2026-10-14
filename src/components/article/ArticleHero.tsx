import Link from "next/link";
import type { Festival } from "@/content/types";
import { FestivalScene } from "@/components/art/Art";
import { communityName, regionName } from "@/lib/content";
import { formatDate } from "./SourceLine";
import { Parallax } from "./Parallax";
import { ReadingModeToggle } from "./ArticleShell";
import { SaveButton, ShareButton } from "./SaveShare";

const levelLabel: Record<Festival["status"]["level"], string> = {
  draft: "Draft",
  researched: "Researched",
  "expert-reviewed": "Expert reviewed",
  "community-reviewed": "Community reviewed",
};

export function ArticleHero({ f, chapters }: { f: Festival; chapters: { id: string; title: string; kicker?: string }[] }) {
  return (
    <header className="relative overflow-hidden bg-f-bg text-f-ink">
      <div className="relative h-[56vh] min-h-[360px] sm:h-[70vh] lg:h-[80vh]">
        <Parallax className="absolute inset-0">
          <div role="img" aria-label={f.heroAlt} className="h-full w-full">
            <FestivalScene art={f.art} className="h-full w-full" idPrefix={`hero-${f.slug}`} />
          </div>
        </Parallax>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--f-bg)] via-[color-mix(in_oklab,var(--f-bg)_45%,transparent)] to-transparent" />
        <nav aria-label="Breadcrumb" className="absolute left-0 right-0 top-0 mx-auto max-w-[1400px] px-4 pt-5 sm:px-6 lg:px-10">
          <ol className="label inline-flex flex-wrap items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 text-white/90 backdrop-blur-sm">
            <li>
              <Link href="/" className="no-underline hover:underline">
                Atlas
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/festivals" className="no-underline hover:underline">
                Encyclopedia
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{f.name}</li>
          </ol>
        </nav>
        <p className="absolute right-4 top-6 hidden rounded-full bg-black/35 px-3 py-1 font-sans text-[0.68rem] text-white/85 backdrop-blur-sm sm:block sm:right-6 lg:right-10">Original illustration · interpretive, not documentary</p>
      </div>

      <div className="relative mx-auto -mt-10 max-w-[1400px] px-4 pb-14 sm:-mt-32 sm:px-6 lg:-mt-44 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="kicker text-[var(--f-accent-2)]">
              {f.tier === "flagship" ? "Flagship story" : "Feature story"} · {f.gregorian} · {f.duration}
            </p>
            <h1 className="display-xl mt-4 text-balance">
              {f.name}
              <span lang="ne" className="deva-display mt-2 block text-[0.62em] leading-[1.15] text-[var(--f-accent-2)]">
                {f.ne}
              </span>
            </h1>
            <p className="display-md mt-6 max-w-3xl italic text-balance opacity-95">{f.headline}</p>
            <p className="mt-5 max-w-2xl text-[1.15rem] leading-relaxed opacity-85">{f.dek}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={`#${chapters[0]?.id}`} className="label rounded-full bg-[var(--f-accent)] px-5 py-2.5 font-semibold text-white no-underline shadow-lg hover:brightness-110">
                Begin the story ↓
              </a>
              <ReadingModeToggle />
              <SaveButton slug={f.slug} name={f.name} />
              <ShareButton title={`${f.name} — Nepal Festival Atlas`} />
            </div>
          </div>
          <aside className="lg:col-span-4 lg:pt-16">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/20 pt-5 text-[0.95rem] lg:grid-cols-1">
              <div>
                <dt className="kicker text-[0.62rem] opacity-70">Season</dt>
                <dd className="mt-1">
                  {f.months.join(" – ")} <span className="opacity-70">({f.gregorian})</span>
                </dd>
              </div>
              {f.lunar ? (
                <div>
                  <dt className="kicker text-[0.62rem] opacity-70">Lunar timing</dt>
                  <dd className="mt-1">{f.lunar}</dd>
                </div>
              ) : null}
              <div>
                <dt className="kicker text-[0.62rem] opacity-70">Communities</dt>
                <dd className="mt-1">
                  {f.communities.map((c, i) => (
                    <span key={c}>
                      {i ? ", " : ""}
                      <Link href={`/communities/${c}`} className="underline decoration-white/30 underline-offset-2 hover:decoration-white">
                        {communityName(c)}
                      </Link>
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="kicker text-[0.62rem] opacity-70">Where</dt>
                <dd className="mt-1">
                  {f.regions.map((r, i) => (
                    <span key={r}>
                      {i ? ", " : ""}
                      <Link href={`/regions/${r}`} className="underline decoration-white/30 underline-offset-2 hover:decoration-white">
                        {regionName(r)}
                      </Link>
                    </span>
                  ))}
                </dd>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <dt className="kicker text-[0.62rem] opacity-70">Research status</dt>
                <dd className="mt-1">
                  <a href="#sources" className="inline-flex items-center gap-2 underline decoration-white/30 underline-offset-2 hover:decoration-white">
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--f-accent-2)]" />
                    {levelLabel[f.status.level]} · verified {formatDate(f.status.lastVerified)}
                  </a>
                  <span className="mt-1 block text-[0.85rem] opacity-70">{f.status.reviewers.length ? "Reviewed" : "Not yet community-reviewed"}</span>
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        <nav aria-label="In this story" className="mt-14 border-t border-white/15 pt-6">
          <p className="kicker text-[0.62rem] opacity-70">In this story</p>
          <ol className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-5">
            {chapters.map((c, i) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="group flex gap-2 py-1 text-[0.92rem] no-underline opacity-85 hover:opacity-100">
                  <span className="font-sans text-[0.72rem] font-semibold opacity-60">{String(i + 1).padStart(2, "0")}</span>
                  <span className="group-hover:underline">{c.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </header>
  );
}
