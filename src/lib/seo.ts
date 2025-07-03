// lib/seo.ts
import type { Metadata } from "next";
import { buildMetadata } from "./seoConfig";

/** COMPAT: devuelve solo la parte "común" (descr., keywords, OG...). */
export function getCommonMetadata(locale: string, overrides?: Metadata): Partial<Metadata> {
  const meta = buildMetadata({
    locale: locale === "es" ? "es" : "en",
    pathname: "/"
  });

  const {
    title: _title,
    alternates: _alternates,
    twitter: _twitter,
    ...common
  } = meta;

  /* marcar variables como “usadas” */
  void _title;
  void _alternates;
  void _twitter;

  return {
    ...common,
    ...overrides
  };
}

/** COMPAT: versión antigua de buildTitle. */
export function buildTitle(pageTitle?: string): Metadata["title"] {
  const base = "SobrePoxi";
  if (!pageTitle) return { default: base, template: `%s | ${base}` };
  return { default: pageTitle, template: `%s | ${base}` };

}
