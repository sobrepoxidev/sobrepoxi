import type { MetadataRoute } from "next";

// /account es privada asi como admin

export default async function robots(): Promise<MetadataRoute.Robots> {

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/account", "/admin", "/auth", "/api"] },
    // Declaramos *ambos* sitemaps para reforzar la relación entre dominios
    sitemap: [
      `https://sobrepoxi.com/sitemap.xml`,
    ],
  };
}