// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { createMiddlewareSupabaseClient } from "@/shared/supabase/middleware";
import { routing } from "@/shared/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

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

  /* --- 2. Resto del sitio → intl + Supabase --- */
  const intlRes = intlMiddleware(req);
  const res = NextResponse.next({
    request: { headers: intlRes.headers },
    status: intlRes.status
  });

  res.headers.set("x-middleware-next-intl", "processed");
  for (const [k, v] of intlRes.headers) if (!res.headers.has(k)) res.headers.set(k, v);

  const supabase = createMiddlewareSupabaseClient(req, res);
  await supabase.auth.getSession();
  return res;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
