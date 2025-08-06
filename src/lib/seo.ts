// lib/seo.ts
import type { Metadata } from "next";
import { buildMetadata, SEO_CONFIG, SEO_TEXT } from "./seoConfig";

/**
 * Genera metadatos comunes para todas las páginas
 * @deprecated Usar buildMetadata directamente para mejor control y SEO
 */
export function getCommonMetadata(locale: string, overrides?: Metadata): Partial<Metadata> {
  console.warn("getCommonMetadata está deprecado. Usar buildMetadata directamente.");
  
  const meta = buildMetadata({
    locale: locale === "es" ? "es" : "en",
    pathname: "/",
    overrides
  });

  // Extraemos solo los metadatos comunes (sin title específico)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title, alternates, twitter, ...common } = meta;

  return common;
}

/**
 * Construye un título dinámico para las páginas
 * @deprecated Usar buildMetadata con parámetro title para mejor SEO
 */
export function buildTitle(pageTitle?: string): Metadata["title"] {
  console.warn("buildTitle está deprecado. Usar buildMetadata con parámetro title.");
  
  const base = SEO_CONFIG.siteName;
  if (!pageTitle) return { default: base, template: `%s | ${base}` };
  return { default: pageTitle, template: `%s | ${base}` };
}

/**
 * Función helper para generar metadatos de página específica
 * Reemplaza el uso de getCommonMetadata + buildTitle
 */
export function generatePageMetadata(opts: {
  locale: "es" | "en";
  pathname: string;
  pageKey?: keyof typeof SEO_TEXT.es.pages;
  title?: string;
  description?: string;
  keywords?: string;
  noIndex?: boolean;
}): Metadata {
  const { locale, pathname, pageKey, title, description, keywords, noIndex } = opts;
  const t = SEO_TEXT[locale];
  
  // Si hay una página específica configurada, usar sus datos
  const pageData = pageKey ? t.pages[pageKey] : null;
  
  return buildMetadata({
    locale,
    pathname,
    title: title || pageData?.title || t.title.default,
    description: description || pageData?.description || t.description,
    keywords: keywords || pageData?.keywords || t.keywords,
    robots: noIndex ? {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    } : undefined
  });
}
