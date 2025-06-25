// lib/seo.ts  (o el archivo donde antes estaban tus helpers)

import type { Metadata } from "next";
import { buildMetadata } from "./seoConfig";          // <-- función nueva

/**
 * COMPAT: Devuelve sólo la parte "común" (descr., keywords, OG...) 
 * sin canonical ni twitter, para llamadas antiguas.
 */
export function getCommonMetadata(locale: string): Partial<Metadata> {
  // pathname = "/" para no romper estructuras antiguas;
  // si quieres algo más fino pásalo como arg opcional.
  const meta = buildMetadata({
    locale: locale === "es" ? "es" : "en",
    pathname: "/"
  });
  // Devuelvo sólo el subconjunto que las versiones viejas esperaban
  const { title, alternates, twitter, ...common } = meta;
  return common;
}

/**
 * COMPAT: Conserva la vieja firma de buildTitle(pageTitle).
 * Ahora se apoya en SEO_TEXT del nuevo módulo.
 */
export function buildTitle(pageTitle?: string): Metadata["title"] {
  const base = "HandMade Art";
  if (!pageTitle) return { default: base, template: `%s | ${base}` };
  return { default: pageTitle, template: `%s | ${base}` };
}
