// src/app/sitemap.ts
import type { MetadataRoute } from 'next'
import slugify from 'slugify'
import { getAllGuideSlugs } from '@/features/content'

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticBases = [
    '',
    'about',
    'products',
    'contact',
    'privacy-policies',
    'conditions-service',
    'luxury-furniture',
    'epoxy-floors',
    'industrial-epoxy-flooring',
  ]

  const staticEntries = staticBases.map(base => ({
    url: `https://sobrepoxi.com/es${base ? `/${base}` : ''}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    alternates: {
      languages: {
        'en-us': `https://sobrepoxi.com/en${base ? `/${base}` : ''}`
      }
    }
  }))

  const productSlugs = await fetchActiveProductSlugs()
  const productEntries: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `https://sobrepoxi.com/es/product/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    alternates: {
      languages: {
        'en-us': `https://sobrepoxi.com/en/product/${slug}`,
      },
    },
  }))

  const guideSlugs = getAllGuideSlugs()
  const guideEntries: MetadataRoute.Sitemap = [
    {
      url: 'https://sobrepoxi.com/es/guias',
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          'en-us': 'https://sobrepoxi.com/en/guias',
        },
      },
    },
    ...guideSlugs.map(({ slug, locale }: { slug: string; locale: string }) => ({
      url: `https://sobrepoxi.com/${locale}/guias/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          ...(locale === 'es'
            ? { 'en-us': `https://sobrepoxi.com/en/guias/${slug}` }
            : { 'es-cr': `https://sobrepoxi.com/es/guias/${slug}` }),
        },
      },
    })),
  ]

  return [...staticEntries, ...productEntries, ...guideEntries]
}