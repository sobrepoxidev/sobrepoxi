import type { MetadataRoute } from "next";

// /account es privada asi como admin

export default async function robots(): Promise<MetadataRoute.Robots> {

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private areas. Cart, checkout, login and similar stay crawlable on
      // purpose: they carry a noindex meta that Google can only see if it can
      // fetch the page (a disallow would keep already-known URLs indexed).
      disallow: ["/api/", "/auth", "/*/auth", "/account", "/*/account", "/admin", "/*/admin"],
    },
    // Declaramos *ambos* sitemaps para reforzar la relación entre dominios
    sitemap: [
      `https://sobrepoxi.com/sitemap.xml`,
    ],
  };
}