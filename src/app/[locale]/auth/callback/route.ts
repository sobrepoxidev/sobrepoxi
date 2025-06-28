import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  
  // Get the host from the request headers
  const host = request.headers.get('host')
  const protocol = request.headers.get('x-forwarded-proto') || 'https'
  
  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Build the redirect URL with the protocol from the request
      let redirectUrl: string
      
      if (process.env.NODE_ENV === 'development') {
        // In development, use the request origin
        redirectUrl = `${origin}${next}`
      } else {
        // In production, use the protocol from the request and the host from headers
        redirectUrl = `${protocol}://${host}${next}`
      }
      
      // Ensure we don't have double slashes in the URL
      redirectUrl = redirectUrl.replace(/([^:]\/)\/+/g, '$1')
      
      return NextResponse.redirect(redirectUrl)
    } else {
      console.error('Error exchanging code for session:', error)
    }
  }

  // If we get here, there was an error
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}