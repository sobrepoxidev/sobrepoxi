// src/app/robots.ts  (metadata route, sin GET)
import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export const runtime = "edge"; // opcional

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host =
    (await headers()).get("x-forwarded-host") ?? (await headers()).get("host") ?? "";

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `https://${host}/sitemap.xml`,
  };
}
