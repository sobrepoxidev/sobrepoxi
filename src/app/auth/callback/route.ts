import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createRouteHandlerClient }
  from "@supabase/auth-helpers-nextjs";        // 👈 helper correcto

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  // 1.  Si no hay code ► a /login
  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=code_missing`);
  }

  // 2.  Crear cliente ligado a las cookies de la respuesta
  const supabase = createRouteHandlerClient({ cookies });

  // 3.  Intercambiar el code y ESCRIBIR cookies HttpOnly
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    console.error("OAuth error:", error.message);
    return NextResponse.redirect(`${origin}/login?error=oauth`);
  }

  // 4.  Redirigir al destino final
  return NextResponse.redirect(`${origin}${next}`);
}

