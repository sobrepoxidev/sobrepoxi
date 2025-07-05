// src/app/sitemap.ts
import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import slugify from 'slugify'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const runtime = 'edge'

/**
 * Fetch active product names from Supabase using REST to keep bundle small.
 */
async function fetchActiveProductSlugs(): Promise<string[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return []

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/products?select=name&is_active=eq.true`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      // Revalidate at runtime every 30 min to keep sitemap fresh.
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
  const hostHeaders = headers()
  const host =
    hostHeaders.get('x-forwarded-host') ?? hostHeaders.get('host') ?? 'sobrepoxi.com'
  const now = new Date()

  const staticBases = [
    '',            // /
    'about',
    'products',
    'contact',
    'privacy-policies',
    'conditions-service',
    'qr',
    'account',
    'feria-artesanias',
    'feria-artesanias-terminos',
    'epoxy-floors',
    'luxury-furniture',
    'search'
  ]

  const staticEntries: MetadataRoute.Sitemap = staticBases.map((base) => ({
    url: `https://${host}/es${base ? `/${base}` : ''}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    alternates: {
      languages: {
        'en-us': `https://${host}/en${base ? `/${base}` : ''}`,
      },
    },
  }))

  // Dynamic product URLs
  const productSlugs = await fetchActiveProductSlugs()
  const productEntries: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `https://${host}/es/product/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    alternates: {
      languages: {
        'en-us': `https://${host}/en/product/${slug}`,
      },
    },
  }))

  return [...staticEntries, ...productEntries]
}