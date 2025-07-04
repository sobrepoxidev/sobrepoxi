// app/sitemap.ts
import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabaseClient";
import slugify from "slugify";

export const runtime = "edge";
export const revalidate = 1800; // 30 min

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = process.env.NEXT_PUBLIC_SITE_URL ?? "sobrepoxi.com";
  const now = new Date();

  // Locales y rutas estáticas
  const locales = ["es", "en"] as const;
  const staticBases = [
    "", "about", "products", "shipping", "contact",
    "privacy-policies", "conditions-service", "qr",
    "account", "feria-artesanias", "feria-artesanias-terminos",
    "epoxy-floors", "search",
  ];

  // Helper para crear URLs con alternates
  const makeUrl = (path: string, isProduct = false): MetadataRoute.Sitemap[number] => ({
    url: `https://${host}/es${path}`,
    lastModified: now,
    changeFrequency: isProduct ? "weekly" : "monthly",
    priority: isProduct ? 0.8 : 0.6,
    alternates: {
      languages: {
        "es-cr": `https://${host}/es${path}`,
        "en-us": `https://${host}/en${path}`,
      },
    },
  });

  const urls: MetadataRoute.Sitemap = [];

  // Rutas estáticas
  for (const base of staticBases) {
    const path = base === "" ? "" : `/${base}`;
    urls.push(makeUrl(path));
  }

  // Productos dinámicos
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
        urls.push(makeUrl(`/product/${slug}`, true));
      }
    }
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  return urls;
}