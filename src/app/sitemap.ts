import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export const runtime = "edge";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host =
    (await headers()).get("x-forwarded-host") ??
    (await headers()).get("host") ??
    "";

  const now = new Date();

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

  return entries;
}