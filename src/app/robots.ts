import type { MetadataRoute } from "next";

export const runtime = "nodejs";

export default async function robots(): Promise<MetadataRoute.Robots> {

  return {
    rules: { userAgent: "*", allow: "/" },
    // Declaramos *ambos* sitemaps para reforzar la relación entre dominios
    sitemap: [
      `https://sobrepoxi.com/sitemap.xml`,
    ],
  };
}