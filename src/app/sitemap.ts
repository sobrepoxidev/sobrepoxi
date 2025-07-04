/* src/app/sitemap.ts */
import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabaseClient";
import slugify from "slugify";

export const runtime  = "edge";
export const dynamic  = "force-dynamic";     // <- explícito
export const revalidate = 1800;              // 30 min (opcional)

/* ───────────────────────── Config base ───────────────────────── */
const locales = [
  { prefix: "es", tag: "es-cr" },
  { prefix: "en", tag: "en-us" },
] as const;

const staticBases = [
  "",                // home
  "about",
  "products",
  "shipping",
  "contact",
  "privacy-policies",
  "conditions-service",
  "qr",
  "account",
  "feria-artesanias",
  "feria-artesanias-terminos",
  "epoxy-floors",
  "search",
];

/* ────────────────────────── Helper make() ────────────────────── */
function make(
  host: string,
  base: string,               // ← sin prefijo, sin barra inicial
  isProduct = false
): MetadataRoute.Sitemap[number][] {

  const lastmod = new Date();
  return locales.map(({ prefix, tag }) => {
    const url = `https://${host}/${prefix}/${base}`;
    return {
      url,
      lastModified: lastmod,
      changeFrequency: isProduct ? "weekly" : "monthly",
      priority: isProduct ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map(({ prefix: p2, tag: t2 }) => [
            t2,
            `https://${host}/${p2}/${base}`,
          ])
        ),
      },
    };
  });
}

/* ────────────────────────── Main fn ──────────────────────────── */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = process.env.NEXT_PUBLIC_SITE_URL ?? "sobrepoxi.com";

  const entries: MetadataRoute.Sitemap = [];

  /* 1) rutas estáticas */
  for (const base of staticBases) {
    entries.push(...make(host, base));
  }

  /* 2) productos activos */
  type Row = { name: string | null };
  const { data: products } = await supabase
    .from("products")
    .select("name")
    .eq("is_active", true) as { data: Row[] | null };

  if (products) {
    for (const { name } of products) {
      if (!name) continue;
      const slug = slugify(name, { lower: true, strict: true });
      entries.push(...make(host, `product/${slug}`, true));
    }
  }

  return entries;
}