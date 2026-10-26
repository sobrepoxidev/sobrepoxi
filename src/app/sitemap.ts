// src/app/sitemap.ts
//
// Sitemap SEO-friendly:
// - Cada versión de idioma (/es y /en) tiene su PROPIA entrada <loc>.
// - hreflang completo (self + otro locale + x-default) sólo cuando la ruta existe
//   en ambos idiomas. En las guías de pisos el slug cambia según el locale, así
//   que ahí se declaran únicamente los idiomas que existen.
// - No incluye variantes de guías cruzadas de locale (ej: /en/guias/<slug-es>)
//   que generaban Soft 404.
// - lastModified sólo cuando hay una fecha real: la guía o el producto. Antes
//   todas las URLs llevaban la hora de regeneración del sitemap (cada 30 min),
//   que Google aprende a ignorar.
import type { MetadataRoute } from 'next'
import slugify from 'slugify'
import { getAllGuideSlugs, VIDEO_SLUGS, getVideoEntry, getVideoFileUrls } from '@/features/content'

const SITE = 'https://sobrepoxi.com'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

async function fetchActiveProducts(): Promise<{ slug: string; lastModified?: Date }[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return []

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/products?select=name,modified_at&is_active=eq.true`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      next: { revalidate: 1800 },
    }
  )

  if (!res.ok) return []
  const rows: { name: string | null; modified_at: string | null }[] = await res.json()
  return rows
    .filter(({ name }) => Boolean(name))
    .map(({ name, modified_at }) => ({
      slug: slugify(name as string, { lower: true, strict: true }),
      lastModified: modified_at ? new Date(modified_at) : undefined,
    }))
}

// Genera hreflang completo y consistente para un path base (sin locale).
// x-default siempre → /es (Google exige consistencia en todo el sitio).
// Sólo para rutas que existen en ambos idiomas.
function hreflangs(base: string): { languages: Record<string, string> } {
  const suffix = base ? `/${base}` : ''
  return {
    languages: {
      'es-cr': `${SITE}/es${suffix}`,
      'en-us': `${SITE}/en${suffix}`,
      'x-default': `${SITE}/es${suffix}`,
    },
  }
}

// Las guías de pisos tienen slug distinto en cada idioma, así que declarar el par
// cruzado apuntaba a una URL que devuelve "Página no encontrada" y Google
// descartaba el clúster de hreflang completo. Aquí sólo se declaran los idiomas
// en los que el slug existe de verdad.
function guideHreflangs(slug: string, existing: Set<string>): { languages: Record<string, string> } {
  const languages: Record<string, string> = {}
  if (existing.has(`es:${slug}`)) languages['es-cr'] = `${SITE}/es/guias/${slug}`
  if (existing.has(`en:${slug}`)) languages['en-us'] = `${SITE}/en/guias/${slug}`
  languages['x-default'] = languages['es-cr'] ?? languages['en-us']
  return { languages }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /* ─────────── Páginas estáticas (una entrada por locale) ─────────── */
  const staticBases = [
    { base: '', priority: 1.0, freq: 'weekly' as const },
    { base: 'about', priority: 0.6, freq: 'monthly' as const },
    { base: 'products', priority: 0.9, freq: 'weekly' as const },
    { base: 'contact', priority: 0.7, freq: 'monthly' as const },
    { base: 'privacy-policies', priority: 0.3, freq: 'yearly' as const },
    { base: 'conditions-service', priority: 0.3, freq: 'yearly' as const },
    { base: 'luxury-furniture', priority: 0.8, freq: 'monthly' as const },
    { base: 'resina-epoxica-para-pisos', priority: 0.9, freq: 'monthly' as const },
    { base: 'epoxy-floors', priority: 0.8, freq: 'monthly' as const },
    { base: 'industrial-epoxy-flooring', priority: 0.8, freq: 'monthly' as const },
    // Páginas de servicio local (SEO geográfico)
    { base: 'pisos-epoxicos-san-jose', priority: 0.9, freq: 'monthly' as const },
    { base: 'pisos-epoxicos-cartago', priority: 0.8, freq: 'monthly' as const },
    { base: 'pisos-epoxicos-heredia', priority: 0.8, freq: 'monthly' as const },
    { base: 'pisos-epoxicos-alajuela', priority: 0.8, freq: 'monthly' as const },
    { base: 'pisos-epoxicos-guanacaste', priority: 0.8, freq: 'monthly' as const },
  ]

  const staticEntries: MetadataRoute.Sitemap = []
  for (const { base, priority, freq } of staticBases) {
    const suffix = base ? `/${base}` : ''
    // Entrada /es
    staticEntries.push({
      url: `${SITE}/es${suffix}`,
      changeFrequency: freq,
      priority,
      alternates: hreflangs(base),
    })
    // Entrada /en (propia, no solo alternate)
    staticEntries.push({
      url: `${SITE}/en${suffix}`,
      changeFrequency: freq,
      priority,
      alternates: hreflangs(base),
    })
  }

  /* ─────────── Productos (una entrada por locale) ─────────── */
  const products = await fetchActiveProducts()
  const productEntries: MetadataRoute.Sitemap = []
  for (const { slug, lastModified } of products) {
    const base = `product/${slug}`
    const suffix = `/${base}`
    productEntries.push({
      url: `${SITE}/es${suffix}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: hreflangs(base),
    })
    productEntries.push({
      url: `${SITE}/en${suffix}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: hreflangs(base),
    })
  }

  /* ─────────── Guías (solo las que existen en cada locale) ─────────── */
  // Índice de guías, una entrada /es/guias y una /en/guias.
  const guideEntries: MetadataRoute.Sitemap = []
  for (const locale of ['es', 'en'] as const) {
    guideEntries.push({
      url: `${SITE}/${locale}/guias`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: hreflangs('guias'),
    })
  }

  // Una entrada por guía EXISTENTE en su locale. Evita generar /en/guias/<slug-es>
  // que no existen y generaban Soft 404. lastmod sale de la fecha real de
  // actualización de la guía, no de la hora en que se regeneró el sitemap.
  const guideSlugs = getAllGuideSlugs()
  const existingGuides = new Set(guideSlugs.map(({ slug, locale }) => `${locale}:${slug}`))

  for (const { slug, locale, updatedDate } of guideSlugs) {
    guideEntries.push({
      url: `${SITE}/${locale}/guias/${slug}`,
      lastModified: new Date(updatedDate),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: guideHreflangs(slug, existingGuides),
    })
  }

  /* ─────────── Videos (índice + 1 página por video y locale, con extensión video) ─────────── */
  // Los slugs de video son los mismos en ambos locales, así que el hreflang
  // alterno sí existe en el otro idioma (a diferencia de las guías).
  const videoEntries: MetadataRoute.Sitemap = []
  for (const locale of ['es', 'en'] as const) {
    videoEntries.push({
      url: `${SITE}/${locale}/videos`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: hreflangs('videos'),
    })
  }

  for (const slug of VIDEO_SLUGS) {
    const { contentUrl, thumbnailUrl } = getVideoFileUrls(slug)
    for (const locale of ['es', 'en'] as const) {
      const entry = getVideoEntry(slug, locale)
      if (!entry) continue
      videoEntries.push({
        url: `${SITE}/${locale}/videos/${slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: hreflangs(`videos/${slug}`),
        videos: [
          {
            title: entry.content.title,
            thumbnail_loc: thumbnailUrl,
            description: entry.content.description,
            content_loc: contentUrl,
          },
        ],
      })
    }
  }

  return [...staticEntries, ...productEntries, ...guideEntries, ...videoEntries]
}
