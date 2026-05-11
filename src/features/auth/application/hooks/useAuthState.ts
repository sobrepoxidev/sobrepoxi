'use client'

import { useState, useEffect, useCallback } from 'react'
import { createBrowserSupabaseClient } from '@/shared/supabase/client'
import type { AuthState } from '../distribute'

export function useAuthState() {
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    loading: true,
  })

  const supabase = createBrowserSupabaseClient()

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
        loading: false,
      }))
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
      }))
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return state
}

export function useAuthActions() {
  const supabase = createBrowserSupabaseClient()

  const signInWithPassword = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error ? { message: error.message } : null }
  }, [supabase])

  const signUpWithEmail = useCallback(async (
    email: string,
    password: string,
    options?: {
      name?: string
      phone?: string
      receivePromotions?: boolean
      returnUrl?: string
    }
  ) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: options?.name,
          phone: options?.phone,
          receive_promotions: options?.receivePromotions,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback?returnUrl=${encodeURIComponent(options?.returnUrl || '/')}`,
      },
    })
    return { error: error ? { message: error.message } : null }
  }, [supabase])

  const signInWithOAuth = useCallback(async (provider: 'google', returnUrl?: string) => {
    const redirectTo = `${window.location.origin}/auth/callback${returnUrl && returnUrl !== '/' ? `?next=${encodeURIComponent(returnUrl)}` : ''}`
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    })
    if (error) return { error: { message: error.message } }
    if (data?.url) window.location.href = data.url
    return { error: null }
  }, [supabase])

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    return { error: error ? { message: error.message } : null }
  }, [supabase])

  return {
    signInWithPassword,
    signUpWithEmail,
    signInWithOAuth,
    signOut,
  }
}