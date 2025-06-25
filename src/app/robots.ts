// src/app/robots.ts
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const host = (await headers()).get("x-forwarded-host")?.trim().toString() ?? (await headers()).get("host")?.trim().toString()!;
  const body = `User-agent: *
Allow: /
Sitemap: https://${host}/sitemap.xml
`;
  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
