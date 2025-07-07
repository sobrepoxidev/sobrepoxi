// lib/seoConfig.ts
import type { Metadata } from "next";

/* -------------------------------------------------------------------------
 * Textos SEO por locale
 * ---------------------------------------------------------------------- */
/* src/lib/seoConfig.ts */
export const SEO_TEXT = {
  es: {
    title: {
      // 60-65 caracteres máx. · keyword principal al inicio
      default : "Muebles con resina epóxica y pisos epóxicos en Costa Rica",
      template: "%s"
    },
    description:
      "Diseñamos muebles artesanales con resina epóxica y creamos pisos epóxicos de lujo para residencias y negocios de toda Costa Rica.",
    keywords:
      "muebles de resina epóxica, pisos epóxicos Costa Rica, pisos epóxicos de lujo, mesas río de resina, madera y resina, arte en resina, mantenimiento de pisos epóxicos, empresas de resina epóxica"
  },  

  en: {
    title: {
      default : "Luxury epoxy resin furniture & epoxy floors in Costa Rica",
      template: "%s"
    },
    description:
      "We craft luxury furniture with epoxy resin and install premium epoxy floors for homes and businesses across Costa Rica.",
    keywords:
      "luxury epoxy resin furniture, epoxy floors Costa Rica, premium epoxy flooring, epoxy river tables, wood and resin furniture, resin art projects, epoxy floor maintenance, epoxy resin companies"
  },  
} as const;


/**
 * Construye metadatos completos para Next 13/14 App Router.
 * @param pathname Ruta absoluta (para canonical) – usa request.url o un slug simple.
 * @param title    Título específico (opcional).
 * @param image    Imagen OG/Twitter específica (opcional).
 */
export function buildMetadata(opts: {
  overrides?: Metadata;
  locale: "es" | "en";
  pathname: string;
  title?: string;
  image?: { url: string; width?: number; height?: number; alt?: string };
}): Metadata {
  const { locale, pathname, title, image, overrides } = opts;
  const t = SEO_TEXT[locale];

  /* --------------------------------------------------------------------- */
  /* Título con plantilla dinámica                                         */
  /* --------------------------------------------------------------------- */
  const baseTitle =
    title && title !== t.title.default
      ? { default: title, template: t.title.template }
      : t.title;

  /* --------------------------------------------------------------------- */
  /* Imagen OG por defecto                                                 */
  /* --------------------------------------------------------------------- */
  const ogImage = image ?? {
    url: "https://sobrepoxi.com/og-image.jpg",
    width: 1200,
    height: 630,
    alt:
      locale === "es"
        ? "SobrePoxi | Muebles con resina y pisos epóxicos de lujo"
        : "SobrePoxi | Luxury resin furniture and epoxy floors"
  };

  /* --------------------------------------------------------------------- */
  /* Metadatos finales                                                     */
  /* --------------------------------------------------------------------- */
  return {
    ...overrides,
    title: baseTitle,
    description: t.description,
    keywords: t.keywords,
    alternates: {
      canonical: pathname,
      languages: {
        "es-CR": "/es",
        "en-US": "/en"
      }
    },
    openGraph: {
      title: baseTitle.default,
      description: t.description,
      url: `https://sobrepoxi.com${pathname}`,
      siteName: "SobrePoxi",
      images: [ogImage],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: baseTitle.default,
      description: t.description,
      images: [ogImage.url]
    }
  };
}
