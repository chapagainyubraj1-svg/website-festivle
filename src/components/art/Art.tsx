import type { ArtKey } from "@/content/types";
import { spotRegistry } from "./spots";
import { DashainScene } from "./scenes/DashainScene";
import { sceneRegistry } from "./scenes";

/** Festival opening scenes. */
export function FestivalScene({ art, className, idPrefix }: { art: ArtKey | string; className?: string; idPrefix?: string }) {
  if (art === "dashain") return <DashainScene className={className} idPrefix={idPrefix} />;
  const Scene = sceneRegistry[art];
  if (Scene) return <Scene className={className} idPrefix={idPrefix} />;
  return <DashainScene className={className} idPrefix={idPrefix} />;
}

/** Any artwork by key: scenes or spot illustrations. */
export function Art({ k, className = "h-full w-full", idPrefix }: { k: string; className?: string; idPrefix?: string }) {
  const Spot = spotRegistry[k];
  if (Spot) {
    return (
      <div className={className}>
        <Spot />
      </div>
    );
  }
  return <FestivalScene art={k} className={className} idPrefix={idPrefix ?? `art-${k}`} />;
}

export function hasArt(k?: string) {
  return !!k && (k in spotRegistry || k in sceneRegistry || k === "dashain");
}
