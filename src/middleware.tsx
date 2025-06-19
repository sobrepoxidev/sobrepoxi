// src/middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// 1️⃣  Preparamos el middleware de i18n una sola vez
const intlMiddleware = createIntlMiddleware(routing);

// 2️⃣  Nuestro middleware principal
export async function middleware(req: NextRequest) {
  /* ------------------ Layer 1: internacionalización ------------------ */
  // next-intl podría devolver un redirect, un rewrite o NextResponse.next()
  const intlResponse = await intlMiddleware(req);

  /* ------------------ Layer 2: Supabase ------------------------------ */
  // Necesitamos una respuesta mutable para que el helper pueda añadir cookies
  const res = NextResponse.next({
    request: {
      headers: intlResponse.headers
    }
  });

  // Copiamos cualquier encabezado (Location, etc.) que next-intl ya hubiese puesto
  res.headers.set("x-middleware-next-intl", "processed");
  for (const [key, value] of intlResponse.headers) {
    if (!res.headers.has(key)) res.headers.set(key, value);
  }
  if (intlResponse.status !== 200) {
    return NextResponse.next({
      request: req,
      status: intlResponse.status,
      headers: res.headers
    });
  }

  // Creamos cliente Supabase ligado a las cookies de la request/response
  const supabase = createMiddlewareClient({ req, res });

  // Con esta llamada Supabase renueva access-token si el refresh-token aún es válido
  await supabase.auth.getSession();

  /* ------------------ Return final ---------------------------------- */
  return res;
}

/* -------------------------------------------------------------------- */
/* Matcher — combinamos el tuyo con la exclusión típica de Supabase     */
export const config = {
  matcher: [
    // evita APIs, _next, archivos estáticos, etc.
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};
