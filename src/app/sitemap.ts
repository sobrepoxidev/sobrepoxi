// src/app/sitemap.ts   (metadata route, NO GET)
import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export const runtime = "edge";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host =
    (await headers()).get("x-forwarded-host") ??
    (await headers()).get("host") ??
    "";

  // Idioma principal según dominio
  const locale = host.includes("artehechoamano") ? "es" : "en";
  const altLocale = locale === "es" ? "en" : "es";
  const now = new Date();

  
  type SitemapEntry = MetadataRoute.Sitemap[number];

  // Helper para crear cada entrada con datos comunes
  const make = (path: string, isProduct = false): SitemapEntry => ({
    url: `https://${host}/${locale}${path}`,
    lastModified: now,
    changeFrequency: isProduct ? "weekly" : "monthly",
    priority: isProduct ? 0.8 : 0.6,
    // 🡇 Etiqueta alterna para el otro dominio/idioma
    alternates: {
      languages: {
        [altLocale === "es" ? "es-cr" : "en-us"]: `https://${
          altLocale === "es" ? "artehechoamano.com" : "handmadeart.store"
        }/${altLocale}${path}`,
      },
    },
  });

  return [
    make(""), // home
    make("/about"),
    make("/products"),
    make("/product/[id]", true), // se mantiene placeholder
    make("/shipping"),
    make("/contact"),
    make("/privacy-policies"),
    make("/conditions-service"),
    make("/qr"),
    make("/account"),
    make("/feria-artesanias"),
    make("/feria-artesanias-terminos"),
    make("/impact"),
    make("/search"),
  ];
}
