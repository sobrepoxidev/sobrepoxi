import { defineRouting } from 'next-intl/routing';

// Configuración SEO-friendly del routing i18n.
//
// - localeDetection: false  → evita redirecciones 307 basadas en Accept-Language,
//   que Google interpreta como temporales y NO transfieren PageRank. Las
//   redirecciones de locale ahora son 308 (permanentes), deterministas y
//   cacheables. (Fix SEO: "Página con redirección" en Search Console.)
// - localePrefix: 'always'  → todas las rutas llevan prefijo /es o /en, sin
//   ambigüedad para Google sobre qué versión indexar.
export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localeDetection: false,
  localePrefix: 'always',
  domains: [
    {
      domain: 'sobrepoxi.com',
      defaultLocale: 'es',
      locales: ['es', 'en']
    },
  ]
});