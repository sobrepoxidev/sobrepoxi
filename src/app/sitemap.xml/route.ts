// app/sitemap.xml/route.ts
import { supabase } from "@/lib/supabaseClient";
import slugify from "slugify";

export const runtime = "edge";
export const revalidate = 1800; // 30 min

async function buildSitemap(): Promise<string> {
  const host = process.env.NEXT_PUBLIC_SITE_URL ?? "sobrepoxi.com";
  const now = new Date().toISOString();

  // Rutas estáticas
  const staticBases = [
    "", "about", "products", "shipping", "contact",
    "privacy-policies", "conditions-service", "qr",
    "account", "feria-artesanias", "feria-artesanias-terminos",
    "epoxy-floors", "search",
  ];

  // Generar URLs estáticas
  const staticUrls: string[] = [];
  for (const base of staticBases) {
    const path = base === "" ? "" : `/${base}`;
    staticUrls.push(
      `<url>
<loc>https://sobrepoxi.com/es${path}</loc>
<xhtml:link rel="alternate" hreflang="es-cr" href="https://sobrepoxi.com/es${path}" />
<xhtml:link rel="alternate" hreflang="en-us" href="https://sobrepoxi.com/en${path}" />
<lastmod>${now}</lastmod>
<changefreq>monthly</changefreq>
<priority>0.6</priority>
</url>`
    );
  }

  // Obtener productos
  const productUrls: string[] = [];
  try {
    type Row = { name: string | null };
    const { data } = await supabase
      .from("products")
      .select("name")
      .eq("is_active", true) as { data: Row[] | null };

    if (data) {
      for (const { name } of data) {
        if (!name) continue;
        const slug = slugify(name, { lower: true, strict: true });
        productUrls.push(
          `<url>
<loc>https://sobrepoxi.com/es/product/${slug}</loc>
<xhtml:link rel="alternate" hreflang="es-cr" href="https://sobrepoxi.com/es/product/${slug}" />
<xhtml:link rel="alternate" hreflang="en-us" href="https://sobrepoxi.com/en/product/${slug}" />
<lastmod>${now}</lastmod>
<changefreq>weekly</changefreq>
<priority>0.8</priority>
</url>`
        );
      }
    }
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  // Construir XML completo
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticUrls.join('\n')}
${productUrls.join('\n')}
</urlset>`;
}

export async function GET() {
  try {
    const xml = await buildSitemap();
    
    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
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
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=1800, stale-while-revalidate=3600",
    },
  });
}