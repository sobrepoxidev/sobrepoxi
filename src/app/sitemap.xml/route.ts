// src/app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'edge';

// helper: consulta tu base de datos y trae todos los IDs
async function fetchProductIds(locale: 'es' | 'en') {
  // Ejemplo Supabase: devuelve [{ id: 42, updatedAt: '2025-06-25' }, ...]
  const res = await fetch(
    `https://artehechoamano.com/api/products?fields=id,updatedAt`
  );
  return (await res.json()) as { id: number; updatedAt: string }[];
}

export async function GET(request: Request) {
  // 1. Dominios → idioma
  const host =
    request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? '';
  const locale: 'es' | 'en' = host.includes('artehechoamano') ? 'es' : 'en';
  const altLocale: 'es' | 'en' = locale === 'es' ? 'en' : 'es';

  // 2. Productos con IDs reales
  const products = await fetchProductIds(locale);

  // 3. Entradas estáticas
  const staticPaths = [
    '', '/about', '/products', '/shipping', '/contact',
    '/privacy-policies', '/conditions-service', '/qr',
    '/account', '/feria-artesanias', '/feria-artesanias-terminos',
    '/impact', '/search',
  ];

  // 4. Compose XML
  const urls: string[] = [];

  // 4a) Páginas estáticas
  for (const path of staticPaths) {
    const full = `/${locale}${path}`;
    const alt  = `/${altLocale}${path}`;
    urls.push(`
  <url>
    <loc>https://${host}${full}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="${locale === 'es' ? 'es-cr' : 'en-us'}"
      href="https://${host}${full}" />
    <xhtml:link rel="alternate" hreflang="${altLocale === 'es' ? 'es-cr' : 'en-us'}"
      href="https://${altLocale === 'es' ? 'artehechoamano.com' : 'handmadeart.store'}${alt}" />
  </url>`);
  }

  // 4b) Productos dinámicos
  for (const p of products) {
    const path = `/${locale}/product/${p.id}`;
    const alt  = `/${altLocale}/product/${p.id}`;
    urls.push(`
  <url>
    <loc>https://${host}${path}</loc>
    <lastmod>${new Date(p.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="${locale === 'es' ? 'es-cr' : 'en-us'}"
      href="https://${host}${path}" />
    <xhtml:link rel="alternate" hreflang="${altLocale === 'es' ? 'es-cr' : 'en-us'}"
      href="https://${altLocale === 'es' ? 'artehechoamano.com' : 'handmadeart.store'}${alt}" />
  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
