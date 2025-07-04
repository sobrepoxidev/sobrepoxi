//ssrc\app\sitemap.xml\route.ts
import { supabase } from '@/lib/supabaseClient';
import { headers } from 'next/headers';
import slugify from "slugify"; //  npm i slugify   ✅ tiny, sin deps

export const dynamic = 'force-static'; // generado en build
export const revalidate = 1800; // 30 min


export function HEAD() {
  return new Response(null, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

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
    '/epoxy-floors',
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
    
      // 1) generamos un slug SEO-friendly
      const slug = slugify(name, { lower: true, strict: true }); // “Mesa Río XL 2×1 m” → "mesa-rio-xl-2x1m"
    
      // 2) escapamos por si acaso quedara algo raro (espacios, #, etc.)
      const encoded = encodeURIComponent(slug);
    
      for (const { prefix } of locales) {
        entries.push(makeEntry(prefix, `/product/${encoded}`, true));
      }
    }
  }

  /* ---------------- Construir XML ---------------- */
  const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
  `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n` +
  `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 ` +
  `                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n` +
  entries
    .map(
      (e) =>
        `  <url>\n` +
        `    <loc>${e.loc}</loc>\n` +
        `    <lastmod>${e.lastmod}</lastmod>\n` +
        `    <changefreq>${e.changefreq}</changefreq>\n` +
        `    <priority>${e.priority}</priority>\n` +
        `  </url>`
    )
    .join("\n") +
  `\n</urlset>`;

return new Response(xml, {
  headers: {
    // Cabeceras recomendadas
   "Content-Type": "application/xml",
    "Cache-Control": "public, max-age=0, must-revalidate",
  },
});
}



