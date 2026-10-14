import type { Rich } from "./types";

export interface Story {
  slug: string;
  title: string;
  dek: string;
  keywords: string[];
  sections: { heading: string; body: Rich[] }[];
  sources: string[];
}

export const stories: Story[] = [];
