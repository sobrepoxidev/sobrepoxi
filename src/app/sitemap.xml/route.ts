import { createClient } from '@supabase/supabase-js';
import slugify from 'slugify';

export const runtime = 'edge';          // sigue siendo Edge
export const revalidate = 0;            // sin caché

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function url(host: string, path = '') {
  return `https://${host}${path}`;
}

export async function GET() {
  /* ─── Host ─────────────────────────────── */
  const host =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'sobrepoxi.com';

  /* ─── Datos de productos ───────────────── */
  const { data: products = [] } = await supabase
    .from('products')
    .select('name')
    .eq('is_active', true);

  /* ─── Entradas base ────────────────────── */
  const staticPaths = [
    '', '/about', '/products', '/shipping', '/contact',
    '/privacy-policies', '/conditions-service', '/qr', '/account',
    '/feria-artesanias', '/feria-artesanias-terminos',
    '/epoxy-floors', '/search',
  ];

  const locales = ['es', 'en'] as const;
  const nowISO  = new Date().toISOString();

  /* ─── Construir XML ────────────────────── */
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
  xml += 'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  const push = (loc: string, lastmod = nowISO, priority = '0.6') => {
    xml += '  <url>\n';
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += '  </url>\n';
  };

  // ① páginas estáticas
  for (const path of staticPaths) {
    for (const lang of locales) {
      push(url(host, `/${lang}${path}`));
    }
  }

  // ② productos dinámicos
if(products){
    for (const { name } of products) {
        if (!name) continue;
        const slug = encodeURIComponent(
          slugify(name, { lower: true, strict: true })
        );
        for (const lang of locales) {
          push(url(host, `/${lang}/product/${slug}`), nowISO, '0.8');
        }
      }
}

  xml += '</urlset>';

  /* ─── Respuesta ────────────────────────── */
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' }, // sin charset
  });
}
