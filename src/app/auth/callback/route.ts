import { NextResponse } from 'next/server'
import { exchangeOAuthCode } from '@/features/auth/application/use-cases/exchangeOAuthCode'
import { getSafeRedirectPath } from '@/shared/utils/safeRedirect'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // Sanitizamos `next` para prevenir open redirect / phishing via redirect
  // (política "Páginas engañosas" de Google Safe Browsing).
  const next = getSafeRedirectPath(searchParams.get('next'), '/')

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=code_missing`)
  }

  const result = await exchangeOAuthCode({ code, next })
  if (result.error) {
    return NextResponse.redirect(`${origin}/login?error=oauth`)
  }

  return NextResponse.redirect(`${origin}${next}`)
}
