/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // ⚑ 1. Cambia con variable de entorno para cada despliegue
  siteUrl: process.env.SITE_URL || "https://artehechoamano.com",

  generateRobotsTxt: true,
  sitemapSize: 7000,           // tamaño máximo antes de partir en chunks
  changefreq: "monthly",
  priority: 0.6,

  // ⚑ 2. Declarar versiones idioma/domino
  alternateRefs: [
    { href: "https://artehechoamano.com", hreflang: "es-cr" },
    { href: "https://handmadeart.store",  hreflang: "en-us" },
  ],

  // ⚑ 3. Robots.txt con ambos sitemaps
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://artehechoamano.com/sitemap.xml",
      "https://handmadeart.store/sitemap.xml",
    ],
  },

  // ⚑ 4. Evita rutas placeholder y añade productos reales
  async transform(config, path) {
    // ❌ filtra /product/[id]
    if (path.startsWith("/product/[id]")) return null;

    return {
      loc: `${config.siteUrl}${path}`,
      lastmod: new Date().toISOString(),
      changefreq: path.startsWith("/product") ? "weekly" : "monthly",
      priority: path.startsWith("/product") ? 0.8 : 0.6,
    };
  },

  // ⚑ 5. Inyecta dinámicamente TODOS los productos
  async additionalPaths(config) {
    // → Cambia la URL por tu endpoint real o acceso a BD/Supabase
    const products = await fetch(
      "https://artehechoamano.com/api/products?fields=slug,updatedAt"
    ).then((res) => res.json());

    return products.map((p) => ({
      loc: `${config.siteUrl}/${
        config.siteUrl.includes("artehechoamano") ? "es" : "en"
      }/product/${p.slug}`,
      lastmod: new Date(p.updatedAt).toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    }));
  },
};
