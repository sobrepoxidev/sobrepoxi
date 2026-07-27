// src/app/sitemap.ts
//
// Sitemap SEO-friendly:
// - Cada versión de idioma (/es y /en) tiene su PROPIA entrada <loc>.
// - Cada entrada incluye hreflang completo: self-reference + otra locale +
//   x-default apuntando siempre a /es (consistente en todo el sitio).
// - No incluye variantes de guías cruzadas de locale (ej: /en/guias/<slug-es>)
//   que generaban Soft 404.
import type { MetadataRoute } from 'next'
import slugify from 'slugify'
import { getAllGuideSlugs } from '@/features/content'

const SITE = 'https://sobrepoxi.com'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

async function fetchActiveProductSlugs(): Promise<string[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return []

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/products?select=name&is_active=eq.true`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      next: { revalidate: 1800 },
    }
  )

  if (!res.ok) return []
  const rows: { name: string | null }[] = await res.json()
  return rows
    .map(({ name }) => (name ? slugify(name, { lower: true, strict: true }) : null))
    .filter(Boolean) as string[]
}

// Genera hreflang completo y consistente para un path base (sin locale).
// x-default siempre → /es (Google exige consistencia en todo el sitio).
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  /* ─────────── Páginas estáticas (una entrada por locale) ─────────── */
  const staticBases = [
    { base: '', priority: 1.0, freq: 'weekly' as const },
    { base: 'about', priority: 0.6, freq: 'monthly' as const },
    { base: 'products', priority: 0.9, freq: 'weekly' as const },
    { base: 'contact', priority: 0.7, freq: 'monthly' as const },
    { base: 'privacy-policies', priority: 0.3, freq: 'yearly' as const },
    { base: 'conditions-service', priority: 0.3, freq: 'yearly' as const },
    { base: 'luxury-furniture', priority: 0.8, freq: 'monthly' as const },
    { base: 'epoxy-floors', priority: 0.8, freq: 'monthly' as const },
    { base: 'industrial-epoxy-flooring', priority: 0.8, freq: 'monthly' as const },
  ]

  const staticEntries: MetadataRoute.Sitemap = []
  for (const { base, priority, freq } of staticBases) {
    const suffix = base ? `/${base}` : ''
    // Entrada /es
    staticEntries.push({
      url: `${SITE}/es${suffix}`,
      lastModified: now,
      changeFrequency: freq,
      priority,
      alternates: hreflangs(base),
    })
    // Entrada /en (propia, no solo alternate)
    staticEntries.push({
      url: `${SITE}/en${suffix}`,
      lastModified: now,
      changeFrequency: freq,
      priority,
      alternates: hreflangs(base),
    })
  }

  /* ─────────── Productos (una entrada por locale) ─────────── */
  const productSlugs = await fetchActiveProductSlugs()
  const productEntries: MetadataRoute.Sitemap = []
  for (const slug of productSlugs) {
    const base = `product/${slug}`
    const suffix = `/${base}`
    productEntries.push({
      url: `${SITE}/es${suffix}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: hreflangs(base),
    })
    productEntries.push({
      url: `${SITE}/en${suffix}`,
      lastModified: now,
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
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: hreflangs('guias'),
    })
  }

  // Una entrada por guía EXISTENTE en su locale. Evita generar /en/guias/<slug-es>
  // que no existen y generaban Soft 404.
  for (const { slug, locale } of getAllGuideSlugs()) {
    guideEntries.push({
      url: `${SITE}/${locale}/guias/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: hreflangs(`guias/${slug}`),
    })
  }

  return [...staticEntries, ...productEntries, ...guideEntries]
}
