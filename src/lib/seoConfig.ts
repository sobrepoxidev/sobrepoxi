// lib/seoConfig.ts
import type { Metadata } from "next";

/* -------------------------------------------------------------------------
 * Textos SEO por locale
 * ---------------------------------------------------------------------- */
const SEO_TEXT = {
  es: {
    title: {
      default: "SobrePoxi | Creaciones en Resina de Lujo",
      template: "%s | SobrePoxi Costa Rica"
    },
    description:
      "SobrePoxi diseña y crea muebles, pisos y proyectos personalizados con resina epóxica y materiales nobles. Piezas únicas, envío internacional y servicio llave en mano.",
    keywords:
      "resina epóxica, muebles de lujo, pisos epóxicos, proyectos personalizados, mesa río, sobrepoxi, madera y resina, arte en resina"
  },
  en: {
    title: {
      default: "SobrePoxi | Luxury Epoxy Creations",
      template: "%s | SobrePoxi USA"
    },
    description:
      "SobrePoxi crafts luxury furniture, artistic epoxy floors and bespoke projects in resin and fine materials. Unique statement pieces shipped worldwide.",
    keywords:
      "epoxy resin, luxury furniture, epoxy floors, bespoke resin projects, river table, SobrePoxi, wood and resin, epoxy art"
  }
} as const;

/* Devuelve 'es-CR' / 'en-US' para <html lang> y og:locale */
export function mapLocale(locale: string) {
  return locale === "es" ? "es-CR" : "en-US";
}

/**
 * Construye metadatos completos para Next 13/14 App Router.
 * @param pathname Ruta absoluta (para canonical) – usa request.url o un slug simple.
 * @param title    Título específico (opcional).
 * @param image    Imagen OG/Twitter específica (opcional).
 */
export function buildMetadata(opts: {
  locale: "es" | "en";
  pathname: string;
  title?: string;
  image?: { url: string; width?: number; height?: number; alt?: string };
}): Metadata {
  const { locale, pathname, title, image } = opts;
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
        ? "SobrePoxi – Creaciones en resina epóxica"
        : "SobrePoxi – Luxury Epoxy Creations"
  };

  /* --------------------------------------------------------------------- */
  /* Metadatos finales                                                     */
  /* --------------------------------------------------------------------- */
  return {
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
      locale: mapLocale(locale),
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
