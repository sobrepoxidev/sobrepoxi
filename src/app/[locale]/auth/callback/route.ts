import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') || '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Use the next parameter if it exists, otherwise use the origin
      if (next.startsWith('/')) {
        // If next is a path, prepend the origin
        return NextResponse.redirect(`${origin}${next}`)
      } else if (next.startsWith('http')) {
        // If next is a full URL, use it directly
        return NextResponse.redirect(next)
      }
      // Default to home if next is invalid
      return NextResponse.redirect(origin)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}