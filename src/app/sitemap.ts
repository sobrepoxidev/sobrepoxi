// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import slugify from 'slugify';

export const runtime  = 'edge';
export const dynamic  = 'force-dynamic'; // ⬅ fuerza renderizado por petición
export const revalidate = 0;             // ⬅ desactiva Full-Route & Data Cache

// 1️⃣  Instancia de Supabase aislada
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const hdr  = await headers();
  const host = hdr.get('x-forwarded-host') ??
               hdr.get('host') ??
               process.env.NEXT_PUBLIC_SITE_URL ??
               'sobrepoxi.com';

  const now  = new Date();

  /* ─── Config ─────────────────────────────────────────────────── */
  const locales = [
    { prefix: 'es', tag: 'es-cr' },
    { prefix: 'en', tag: 'en-us' },
  ] as const;

  const staticPaths = [
    '', '/about', '/products', '/shipping', '/contact',
    '/privacy-policies', '/conditions-service', '/qr', '/account',
    '/feria-artesanias', '/feria-artesanias-terminos',
    '/epoxy-floors', '/search',
  ];

  /* ─── Productos activos ──────────────────────────────────────── */
  const { data: products } = await supabase
    .from('products')
    .select('name')
    .eq('is_active', true)
    .throwOnError(); // lanza si hay error (Edge lo loguea)

  /* ─── Helper ─────────────────────────────────────────────────── */
  const make = (
    path: string,
    isProduct = false,
  ): MetadataRoute.Sitemap[number] => ({
    url: `https://${host}${path}`,
    lastModified: now,
    changeFrequency: isProduct ? 'weekly' : 'monthly',
    priority: isProduct ? 0.8 : 0.6,
    alternates: {
      languages: locales.reduce<Record<string, string>>((acc, l) => {
        acc[l.tag] = `https://${host}${path.replace(/^\/[a-z]{2}\//, `/${l.prefix}/`)}`;
        return acc;
      }, {}),
    },
  });

  /* ─── Generar entries ────────────────────────────────────────── */
  const entries: MetadataRoute.Sitemap = [];

  // 1) Rutas estáticas
  for (const path of staticPaths) {
    for (const { prefix } of locales) {
      const full = `/${prefix}${path ? path : ''}`;
      entries.push(make(full));
    }
  }

  // 2) Productos dinámicos
  for (const row of products ?? []) {
    if (!row.name) continue;
    const slug = encodeURIComponent(
      slugify(row.name, { lower: true, strict: true }),
    );
    for (const { prefix } of locales) {
      entries.push(make(`/${prefix}/product/${slug}`, true));
    }
  }

  return entries;
}
