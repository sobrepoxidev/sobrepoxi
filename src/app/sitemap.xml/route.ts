/* ───────────────────────────────────────────── app/sitemap.xml/route.ts */
import { supabase } from "@/lib/supabaseClient";
import slugify      from "slugify";

export const runtime   = "nodejs";
export const revalidate = 1800;          // 30 min

/* ---------- función que arma el XML ---------- */
async function buildSitemap(): Promise<string> {
  const host = process.env.NEXT_PUBLIC_SITE_URL ?? "sobrepoxi.com";

  const now  = new Date().toISOString();

  /* locales + rutas estáticas (sin barra inicial) */
  const locales = ["es", "en"] as const;
  const staticBases = [
    "", "about", "products", "shipping", "contact",
    "privacy-policies", "conditions-service", "qr",
    "account", "feria-artesanias", "feria-artesanias-terminos",
    "epoxy-floors", "search",
  ];

  type Row = { name: string | null };
  const { data } = await supabase.from("products")
                        .select("name")
                        .eq("is_active", true) as { data: Row[] | null };

  const urls: string[] = [];

  /* estáticas */
  for (const base of staticBases) {
    for (const prefix of locales) {
      urls.push(`https://${host}/${prefix}/${base}`);
    }
  }

  /* productos */
  if (data) {
    for (const { name } of data) {
      if (!name) continue;
      const slug = slugify(name, { lower: true, strict: true });
      for (const prefix of locales) {
        urls.push(`https://${host}/${prefix}/product/${slug}`);
      }
    }
  }

  /* construimos XML */
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url><loc>${u}</loc><lastmod>${now}</lastmod></url>`).join("\n") +
    `\n</urlset>`
  );
}

/* ---------- GET ---------- */
export async function GET() {
  const xml = await buildSitemap();
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

/* ---------- HEAD ---------- */
export function HEAD() {
  return new Response(null, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
