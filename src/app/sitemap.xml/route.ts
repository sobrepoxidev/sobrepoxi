// app/sitemap.xml/route.ts



export const runtime = "nodejs";
export const dynamic = 'force-dynamic';

async function buildSitemap() {
  const now = new Date().toISOString();

  // Rutas estáticas
  const staticBases = [
    "", "about", "products", "contact",
    "privacy-policies", "conditions-service", "qr",
    "account", "feria-artesanias", "feria-artesanias-terminos",
    "epoxy-floors", "luxury-furniture", "search",
  ];

  // Generar URLs estáticas
  const staticUrls: string[] = [];
  for (const base of staticBases) {
    const path = base === "" ? "" : `/${base}`;
    staticUrls.push(
      `<url>
<loc>https://sobrepoxi.com/es${path}</loc>

<lastmod>${now}</lastmod>
<changefreq>monthly</changefreq>
<priority>0.6</priority>
</url>`
    );
  }

  // Construir XML completo
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticUrls.join('\n')}
</urlset>`;
}

export async function GET() {
  try {
    const xml = await buildSitemap();
    
    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "text/xml",
        "Cache-Control": "public, max-age=1800, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
}

export async function HEAD() {
  return new Response(null, {
    status: 200,
    headers: {
      "Content-Type": "text/xml",
      "Cache-Control": "public, max-age=1800, stale-while-revalidate=3600",
    },
  });
}