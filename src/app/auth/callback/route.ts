import { NextResponse } from 'next/server'
import { exchangeOAuthCode } from '@/features/auth/application/use-cases/exchangeOAuthCode'

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

  const result = await exchangeOAuthCode({ code, next })
  if (result.error) {
    return NextResponse.redirect(`${origin}/login?error=oauth`)
  }

  return NextResponse.redirect(`${origin}${next}`)
}
