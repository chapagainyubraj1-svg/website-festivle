import type { ComponentType } from "react";

type SceneProps = { className?: string; idPrefix?: string };

/** Festival opening scenes other than Dashain register here. */
export const sceneRegistry: Record<string, ComponentType<SceneProps>> = {};
