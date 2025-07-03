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

  // Fetch active product slugs
  type ProductRow = { name: string | null };
  const { data: products, error } = (await supabase
    .from("products")
    .select("name")
    .eq("is_active", true)) as { data: ProductRow[] | null; error: unknown };

  if (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  const locales = [
    { prefix: "es", tag: "es-cr" },
    { prefix: "en", tag: "en-us" },
  ];

  const staticPaths = [
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

  const makeEntry = (
    prefix: string,
    path: string,
    isProduct = false,
  ): MetadataRoute.Sitemap[number] => ({
    url: `https://${host}/${prefix}${path}`,
    lastModified: now,
    changeFrequency: isProduct ? "weekly" : "monthly",
    priority: isProduct ? 0.8 : 0.6,
    alternates: {
      languages: Object.fromEntries(
        locales.map((loc) => [loc.tag, `https://${host}/${loc.prefix}${path}`]),
      ),
    },
  });

  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const path of staticPaths) {
    for (const { prefix } of locales) {
      entries.push(makeEntry(prefix, path));
    }
  }

  // Dynamic product pages
  if (products) {
    for (const { name } of products) {
      if (!name) continue;
      for (const { prefix } of locales) {
        entries.push(makeEntry(prefix, `/product/${name}`, true));
      }
    }
  }

  return entries;
}
