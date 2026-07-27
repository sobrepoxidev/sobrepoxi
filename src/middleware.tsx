// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { createMiddlewareSupabaseClient } from "@/shared/supabase/middleware";
import { routing } from "@/shared/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

// Rutas que ya existen indexadas sin locale y deben apuntar al locale por
// defecto (/es) de forma PERMANENTE (308). Sustituye los 307 temporales que
// generaba next-intl con localeDetection, que Google no trataba como
// permanentes. Añade aquí cualquier slug legacy indexado sin prefijo.
const PERMANENT_LOCALELESS_REDIRECTS: Record<string, string> = {
  '/products': '/es/products',
  '/luxury-furniture': '/es/luxury-furniture',
  '/epoxy-floors': '/es/epoxy-floors',
  '/industrial-epoxy-flooring': '/es/industrial-epoxy-flooring',
  '/about': '/es/about',
  '/contact': '/es/contact',
  '/guias': '/es/guias',
  '/search': '/es/search',
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = req.headers.get("host") || "";

  /* --- 0. www → non-www redirect (301) --- */
  if (host.startsWith("www.")) {
    const url = req.nextUrl.clone();
    url.host = host.replace(/^www\./, "");
    url.protocol = "https";
    return NextResponse.redirect(url, 301);
  }

  /* --- 1. Si es /auth → omite intl, sólo Supabase --- */
  if (pathname.startsWith("/auth")) {
    const res = NextResponse.next();
    const supabase = createMiddlewareSupabaseClient(req, res);
    await supabase.auth.getSession();
    return res;
  }

  /* --- 1b. Redirects permanentes (308) para rutas sin locale indexadas --- */
  if (PERMANENT_LOCALELESS_REDIRECTS[pathname]) {
    const target = new URL(PERMANENT_LOCALELESS_REDIRECTS[pathname], req.url);
    target.search = req.nextUrl.search; // preserva query string
    return NextResponse.redirect(target, 308);
  }

  /* --- 2. Resto del sitio → intl + Supabase --- */
  const intlRes = intlMiddleware(req);
  const res = NextResponse.next({
    request: { headers: intlRes.headers },
    status: intlRes.status
  });

  res.headers.set("x-middleware-next-intl", "processed");
  for (const [k, v] of intlRes.headers) if (!res.headers.has(k)) res.headers.set(k, v);

  // Forzar redirecciones next-intl como PERMANENTES (308) en lugar de 307.
  // Google transfiere PageRank e indexación con 308, no con 307.
  if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
    const location = res.headers.get("location")!;
    const target = new URL(location, req.url);
    target.search = req.nextUrl.search;
    return NextResponse.redirect(target, 308);
  }

  const supabase = createMiddlewareSupabaseClient(req, res);
  await supabase.auth.getSession();
  return res;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
