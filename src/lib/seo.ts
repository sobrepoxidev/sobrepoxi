import type { Metadata } from "next";

/**
 * Returns common SEO metadata per locale with sensible defaults.
 * Specific pages can extend/override the returned object.
 */
export function getCommonMetadata(locale: string): Partial<Metadata> {
  const texts = {
    es: {
      description:
        "Descubre piezas de arte hechas a mano, únicas y auténticas, creadas con pasión en Costa Rica. Cada creación cuenta una historia.",
      keywords:
        "arte hecho a mano, arte artesanal, esculturas, pinturas originales, decoración artesanal, arte contemporáneo, piezas únicas, feria artesanías, empresas de inserción sociolaboral",
    },
    en: {
      description:
        "Discover unique handmade art pieces crafted with passion in Costa Rica. Each creation tells a story.",
      keywords:
        "handmade art, artisan crafts, original paintings, sculptures, contemporary art, unique art pieces, crafts fair, socio-labour insertion enterprises",
    },
  } as const;

  const t = texts[locale as "es" | "en"] ?? texts.es;

  return {
    metadataBase: new URL("https://artehechoamano.com"),
    icons: { icon: "/favicon.ico" },
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: "HandMade Art",
      description: t.description,
      url: "https://artehechoamano.com",
      siteName: "HandMade Art",
      images: [
        {
          url: "https://artehechoamano.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "HandMade Art – Creaciones artesanales únicas de Costa Rica",
        },
      ],
      locale,
      type: "website",
    },
  };
}

export function buildTitle(pageTitle: string | undefined, locale: string): Metadata["title"] {
  const base = "HandMade Art";
  if (!pageTitle) return { default: base, template: `%s | ${base}` };
  return {
    default: pageTitle,
    template: `%s | ${base}`,
  };
}
