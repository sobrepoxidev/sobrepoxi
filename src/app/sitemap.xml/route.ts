import { supabase } from '@/lib/supabaseClient';
import { headers } from 'next/headers';

export const dynamic = 'force-static'; // generado en build
export const revalidate = 1800; // 30 min

export async function GET() {
  // Host según cabecera o env
  const host =
    (await headers()).get('x-forwarded-host') ??
    (await headers()).get('host') ??
    process.env.NEXT_PUBLIC_SITE_URL ?? 'sobrepoxi.com';

  const now = new Date();

  /* ---------------- Productos activos ---------------- */
  type ProductRow = { name: string | null };
  const { data: products, error } = (await supabase
    .from('products')
    .select('name')
    .eq('is_active', true)) as { data: ProductRow[] | null; error: unknown };

  if (error) console.error('Error fetching products for sitemap:', error);

  /* ---------------- Locales y rutas ---------------- */
  const locales = [
    { prefix: 'es', tag: 'es-cr' },
    { prefix: 'en', tag: 'en-us' },
  ];

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
    '/impact',
    '/search',
  ];

  const makeEntry = (
    prefix: string,
    path: string,
    isProduct = false,
  ) => ({
    loc: `https://${host}/${prefix}${path}`,
    lastmod: now.toISOString(),
    changefreq: isProduct ? 'weekly' : 'monthly',
    priority: isProduct ? '0.8' : '0.6',
  });

  const entries: Array<ReturnType<typeof makeEntry>> = [];

  // estáticas
  for (const path of staticPaths) {
    for (const { prefix } of locales) entries.push(makeEntry(prefix, path));
  }

  // dinámicas
  if (products) {
    for (const { name } of products) {
      if (!name) continue;
      for (const { prefix } of locales) {
        entries.push(makeEntry(prefix, `/product/${name}`, true));
      }
    }
  }

  /* ---------------- Construir XML ---------------- */
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
    .map(
      (e) => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
    )
    .join('\n')}\n</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
