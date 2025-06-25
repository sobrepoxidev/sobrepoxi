// lib/seo.ts
import type { Metadata } from "next";
import { buildMetadata } from "./seoConfig";

/**
 * COMPAT: devuelve solo la parte "común" (descr., keywords, OG...).
 */
export function getCommonMetadata(locale: string): Partial<Metadata> {
  const meta = buildMetadata({
    locale: locale === "es" ? "es" : "en",
    pathname: "/"
  });

  // Prefijo _ ==> ESLint no protesta
  const {
    title: _title,
    alternates: _alternates,
    twitter: _twitter,
    ...common
  } = meta;

  return common;
}

/**
 * COMPAT: versión antigua de buildTitle.
 */
export function buildTitle(pageTitle?: string): Metadata["title"] {
  const base = "HandMade Art";
  if (!pageTitle) return { default: base, template: `%s | ${base}` };
  return { default: pageTitle, template: `%s | ${base}` };
}
