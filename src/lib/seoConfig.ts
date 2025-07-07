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
      default:  "Pisos epóxicos y muebles de lujo · SobrePoxi",
      template: "%s · SobrePoxi Costa Rica"
    },
    description:
      "Diseñamos e instalamos muebles de madera con resina y pisos epóxicos artísticos para proyectos residenciales y contract en Costa Rica y EE. UU. Servicio llave en mano.",
    keywords:
      "pisos epóxicos Costa Rica, muebles de resina de lujo, empresas de pisos epóxicos, mantenimiento de pisos epóxicos, proyectos en resina, mesa río, madera y resina, arte en resina"
  },

  en: {
    title: {
      default:  "Luxury Finishing floors & Resin Furniture · SobrePoxi",
      template: "%s · SobrePoxi USA"
    },
    description:
      "We craft luxury epoxy river tables and artistic floors for residential and commercial projects in Costa Rica and the USA. Turn-key B2B service, worldwide shipping.",
    keywords:
      "epoxy flooring Costa Rica, luxury resin furniture, epoxy floor contractors, decorative epoxy floors, epoxy river table, bespoke resin projects, wood and resin, epoxy art"
  }
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
        ? "SobrePoxi – Creaciones en resina epóxica"
        : "SobrePoxi – Luxury Finishing Creations"
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
