// src/app/robots.txt/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const txt = `
User-agent: *
Allow: /

Sitemap: https://artehechoamano.com/sitemap.xml
Sitemap: https://handmadeart.store/sitemap.xml
`.trim();

  return new NextResponse(txt, { headers: { 'Content-Type': 'text/plain' } });
}
