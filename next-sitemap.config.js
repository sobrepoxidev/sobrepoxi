// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    // Dominio que quieres que salga en las URLs generadas ↓↓↓
    siteUrl: "https://artehechoamano.com",
    generateRobotsTxt: true,
  
    // Mapas alternativos por idioma/domino
    alternateRefs: [
      { href: "https://artehechoamano.com", hreflang: "es-cr" },
      { href: "https://handmadeart.store", hreflang: "en-us" }
    ],
  
    robotsTxtOptions: {
      // Incluye ambos sitemaps para que uno mismo robots.txt sirva a los dos dominios
      additionalSitemaps: [
        "https://artehechoamano.com/sitemap.xml",
        "https://handmadeart.store/sitemap.xml"
      ]
    }
  };
  