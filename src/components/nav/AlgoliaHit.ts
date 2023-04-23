import { h } from "preact";
import type { ReactNode } from "preact";
import htm from "htm";

import type {
  InternalDocSearchHit,
  StoredDocSearchHit,
} from "@docsearch/react/types";

interface HitProps {
  hit: InternalDocSearchHit | StoredDocSearchHit;
  children: ReactNode;
}

// Initialize htm with Preact
const html = htm.bind(h);

export function Hit({ hit, children }: HitProps) {
  return html`<a href=${hit.url} target="_blank">${children}</a>`;
}
