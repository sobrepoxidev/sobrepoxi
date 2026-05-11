import { createBrowserSupabaseClient } from '@/shared/supabase/client'
import type { AuthCredentials, AuthResult } from '../distribute'

export async function signIn(
  credentials: AuthCredentials
): Promise<AuthResult> {
  const supabase = createBrowserSupabaseClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  })

  return { error: error ? { message: error.message } : null }
}

export async function signUp(
  credentials: AuthCredentials & {
    name?: string
    phone?: string
    receivePromotions?: boolean
    returnUrl?: string
  }
): Promise<AuthResult> {
  const supabase = createBrowserSupabaseClient()

  const { error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        name: credentials.name,
        phone: credentials.phone,
        receive_promotions: credentials.receivePromotions,
      },
      emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback?returnUrl=${encodeURIComponent(credentials.returnUrl || '/')}`,
    },
  })

  return { error: error ? { message: error.message } : null }
}

export async function signOut(): Promise<AuthResult> {
  const supabase = createBrowserSupabaseClient()

  const { error } = await supabase.auth.signOut()

  return { error: error ? { message: error.message } : null }
}

export async function getSession() {
  const supabase = createBrowserSupabaseClient()

  const { data: { session }, error } = await supabase.auth.getSession()

  return { session, error: error ? { message: error.message } : null }
}

export async function getUser() {
  const supabase = createBrowserSupabaseClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  return { user, error: error ? { message: error.message } : null }
}