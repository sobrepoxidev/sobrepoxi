// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { supabase } from '@/lib/supabaseClient';
import slugify from 'slugify';           // npm i slugify – 0 deps, ≤4 kB

export const runtime = 'edge';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /* ────────────────────────────────────────────────────────────── ░ Host ░ */
  const host =
    (await headers()).get('x-forwarded-host') ??
    (await headers()).get('host') ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    'sobrepoxi.com';

  const now = new Date();

  /* ──────────────────────────────────────────── ░ Configuración base ░ */
  const locales = [
    { prefix: 'es', tag: 'es-cr' },
    { prefix: 'en', tag: 'en-us' },
  ] as const;

  const staticPaths = [
    '', // home
    '/about',
    '/products',
    '/shipping',
    '/contact',
    '/privacy-policies',
    '/conditions-service',
    '/qr',
    '/account',
    '/feria-artesanias',
    '/feria-artesanias-terminos',
    '/epoxy-floors',
    '/search',
  ];

  /* ──────────────────────────────────────────────── ░ Productos ░ */
  type ProductRow = { name: string | null };

  const { data: products, error } = await supabase
    .from('products')
    .select('name')
    .eq('is_active', true) as {
      data: ProductRow[] | null;
      error: unknown;
    };

  if (error) console.error('Sitemap | error fetching products:', error);

  /* ─────────────────────────────────────────────── ░ Helper ░ */
  const make = (
    prefix: (typeof locales)[number]['prefix'],
    path: string,
    isProduct = false,
  ): MetadataRoute.Sitemap[number] => ({
    url: `https://${host}/${prefix}${path}`,
    lastModified: now,
    changeFrequency: isProduct ? 'weekly' : 'monthly',
    priority: isProduct ? 0.8 : 0.6,
    alternates: {
      languages: locales.reduce<Record<string, string>>((acc, l) => {
        acc[l.tag] = `https://${host}/${l.prefix}${path}`;
        return acc;
      }, {}),
    },
  });

  /* ────────────────────────────────────── ░ Generar entradas ░ */
  const entries: MetadataRoute.Sitemap = [];

  // 1) Rutas estáticas para cada locale
  for (const path of staticPaths) {
    for (const { prefix } of locales) entries.push(make(prefix, path));
  }

  // 2) Rutas dinámicas de productos activos
  if (products) {
    for (const { name } of products) {
      if (!name) continue;

      const slug = encodeURIComponent(
        slugify(name, { lower: true, strict: true }),
      ); // ej. “Mesa Río XL 2×1 m” → mesa-rio-xl-2x1m

      for (const { prefix } of locales)
        entries.push(make(prefix, `/product/${slug}`, true));
    }
  }

  return entries;
}
