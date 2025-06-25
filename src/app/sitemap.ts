// src/app/sitemap.ts  (NO GET aquí)
import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export const runtime = "edge";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host =
    (await headers()).get("x-forwarded-host") ?? (await headers()).get("host") ?? "";

  const locale = host.includes("artehechoamano") ? "es" : "en";

  return [
    {
      url: `https://${host}/${locale}`,
      lastModified: new Date(),
    },
    {
      url: `https://${host}/${locale}/about`,
      lastModified: new Date(),
    },
    {
      url: `https://${host}/${locale}/products`,
      lastModified: new Date(),
    },
    {
      url: `https://${host}/${locale}/product/[id]`,
      lastModified: new Date(),
    },
    {
      url: `https://${host}/${locale}/shipping`,
      lastModified: new Date(),
    },
    {
      url: `https://${host}/${locale}/contact`,
      lastModified: new Date(),
    },
    {
      url: `https://${host}/${locale}/privacy-policies`,
      lastModified: new Date(),
    },
    {
      url: `https://${host}/${locale}/conditions-service`,
      lastModified: new Date(),
    },
  ];
}



// // src/app/sitemap.ts  (Next 15.2)
// import { headers } from "next/headers";
// import { NextResponse } from "next/server";

// export const runtime = "edge";    // se ejecuta por petición

// export async function GET() {
//   const host = (await headers()).get("x-forwarded-host")?.trim().toString() ?? (await headers()).get("host")?.trim().toString()!;
//   const locale = host.includes("artehechoamano") ? "es" : "en";

//   // Lista mínima de URLs; puedes generarla desde tu BDD
//   const urls = [
//     { loc: `https://${host}/${locale}`, lastmod: new Date() },
//     { loc: `https://${host}/${locale}/about`, lastmod: new Date() },
//     { loc: `https://${host}/${locale}/products`, lastmod: new Date() }, 
//     { loc: `https://${host}/${locale}/product/[id]`, lastmod: new Date() },
//     { loc: `https://${host}/${locale}/shipping`, lastmod: new Date() },
//     { loc: `https://${host}/${locale}/contact`, lastmod: new Date() },
//     { loc: `https://${host}/${locale}/privacy-policies`, lastmod: new Date() },
//     { loc: `https://${host}/${locale}/conditions-service`, lastmod: new Date() },
//     // ...
//   ];

//   const xml = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// ${urls
//   .map(
//     u => `<url><loc>${u.loc}</loc><lastmod>${u.lastmod.toISOString()}</lastmod></url>`
//   )
//   .join("")}
// </urlset>`;

//   return new NextResponse(xml, {
//     headers: { "Content-Type": "application/xml" },
//   });
// }
