import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/shared/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  let next = searchParams.get('next') ?? '/'

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=code_missing`)
  }

  try {
    next = decodeURIComponent(next)
  } catch {
    // use original value
  }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('OAuth error:', error.message)
    return NextResponse.redirect(`${origin}/login?error=oauth`)
  }

  return NextResponse.redirect(`${origin}${next}`)
}