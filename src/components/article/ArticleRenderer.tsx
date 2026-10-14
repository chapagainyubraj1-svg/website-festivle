import type { CSSProperties } from "react";
import type { Chapter, Festival } from "@/content/types";
import { festivalCitations, getFestival } from "@/lib/content";
import { ArticleHero } from "./ArticleHero";
import { ArticleShell } from "./ArticleShell";
import { CitationProvider } from "./ArticleContext";
import { ChapterNav } from "./ChapterNav";
import { SourcesChapter } from "./SourcesChapter";
import { MeaningModule } from "./modules/MeaningModule";
import { DaysModule } from "./modules/DaysModule";
import { ExplainerModule } from "./modules/ExplainerModule";
import { TimelineModule } from "./modules/TimelineModule";
import { LegendModule } from "./modules/LegendModule";
import { DecodeModule } from "./modules/DecodeModule";
import { RitualsModule } from "./modules/RitualsModule";
import { MaterialModule } from "./modules/MaterialModule";
import { VariationsModule } from "./modules/VariationsModule";
import { MapModule } from "./modules/MapModule";
import { SymbolsModule } from "./modules/SymbolsModule";
import { FactsModule } from "./modules/FactsModule";
import { ContemporaryModule } from "./modules/ContemporaryModule";
import { MediaModule } from "./modules/MediaModule";
import { QuizModule } from "./modules/QuizModule";
import { CycleModule } from "./modules/CycleModule";
import { InterludeModule } from "./modules/InterludeModule";

/**
 * The storytelling engine. Each festival is a composition of chapters; each
 * chapter names the module that best suits its content. Order, tone and choice
 * of modules are editorial decisions made per festival.
 */
function renderChapter(c: Chapter, f: Festival) {
  switch (c.kind) {
    case "meaning":
      return <MeaningModule key={c.id} c={c} festivalName={f.name} />;
    case "days":
      return <DaysModule key={c.id} c={c} />;
    case "explainer":
      return <ExplainerModule key={c.id} c={c} />;
    case "timeline":
      return <TimelineModule key={c.id} c={c} />;
    case "legend":
      return <LegendModule key={c.id} c={c} />;
    case "decode":
      return <DecodeModule key={c.id} c={c} />;
    case "rituals":
      return <RitualsModule key={c.id} c={c} />;
    case "material":
      return <MaterialModule key={c.id} c={c} />;
    case "variations":
      return <VariationsModule key={c.id} c={c} />;
    case "map":
      return <MapModule key={c.id} c={c} />;
    case "symbols":
      return <SymbolsModule key={c.id} c={c} />;
    case "facts":
      return <FactsModule key={c.id} c={c} />;
    case "contemporary":
      return <ContemporaryModule key={c.id} c={c} />;
    case "media":
      return <MediaModule key={c.id} c={c} />;
    case "quiz":
      return <QuizModule key={c.id} c={c} />;
    case "cycle":
      return <CycleModule key={c.id} c={c} />;
    case "interlude":
      return <InterludeModule key={c.id} c={c} />;
  }
}

export function ArticleRenderer({ f }: { f: Festival }) {
  const { order, sources } = festivalCitations(f);
  const related = f.related.map((s) => getFestival(s)).filter((x): x is Festival => !!x);
  const style = {
    "--f-bg": f.palette.bg,
    "--f-ink": f.palette.ink,
    "--f-accent": f.palette.accent,
    "--f-accent-2": f.palette.accent2,
    "--f-deep": f.palette.deep,
    "--f-soft": f.palette.soft,
    "--f-text-accent": f.palette.textAccent,
  } as CSSProperties;
  const navChapters = f.chapters.filter((c) => c.kind !== "interlude");
  const navItems = [...navChapters.map((c) => ({ id: c.id, label: c.title, kicker: c.kicker })), { id: "sources", label: "Sources & method", kicker: "Research" }];
  return (
    <ArticleShell style={style} slug={f.slug}>
      <CitationProvider order={order} sources={sources}>
        <ArticleHero f={f} chapters={navItems.map((n) => ({ id: n.id, title: n.label, kicker: n.kicker }))} />
        <ChapterNav items={navItems} title={f.name} />
        {f.chapters.map((c) => renderChapter(c, f))}
        <SourcesChapter f={f} order={order} sources={sources} related={related} />
      </CitationProvider>
    </ArticleShell>
  );
}
