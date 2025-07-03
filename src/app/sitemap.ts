import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { supabase } from "@/lib/supabaseClient";

export const runtime = "edge";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host =
    (await headers()).get("x-forwarded-host") ??
    (await headers()).get("host") ??
    "";

  const now = new Date();

  // Obtiene los slugs de productos activos desde la BD para agregarlos al sitemap
  type ProductRow = { name: string | null };
  const { data: products, error } = await supabase
    .from("products")
    .select("name")
    .eq("is_active", true) as { data: ProductRow[] | null, error: any };

  if (error) {
    console.error("Error fetching products for sitemap:", error.message);
  }

  const locales = [
    { prefix: "es", tag: "es-cr" },
    { prefix: "en", tag: "en-us" },
  ];

  const paths = [
    "", // home
    "/about",
    "/products",
    "/shipping",
    "/contact",
    "/privacy-policies",
    "/conditions-service",
    "/qr",
    "/account",
    "/feria-artesanias",
    "/feria-artesanias-terminos",
    "/impact",
    "/search",
  ];

  const make = (prefix: string, path: string, isProduct = false): MetadataRoute.Sitemap[number] => ({
    url: `https://${host}/${prefix}${path}`,
    lastModified: now,
    changeFrequency: isProduct ? "weekly" : "monthly",
    priority: isProduct ? 0.8 : 0.6,
    alternates: {
      languages: Object.fromEntries(
        locales.map(loc => [
          loc.tag,
          `https://${host}/${loc.prefix}${path}`,
        ])
      ),
    },
  });

  const entries: MetadataRoute.Sitemap = [];

  for (const path of paths) {
    for (const { prefix } of locales) {
      entries.push(make(prefix, path));
    }
  }

    // Agregamos cada producto activo al sitemap con mayor prioridad y frecuencia
  if (products) {
    for (const prod of products) {
      if (!prod.name) continue;
      const slug = prod.name; // `name` ya es el slug según el esquema
      for (const { prefix } of locales) {
        entries.push(make(prefix, `/product/${slug}`, true));
      }
    }
  }

  return entries;
}