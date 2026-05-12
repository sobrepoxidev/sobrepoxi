'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { createBrowserSupabaseClient } from '@/shared/supabase/client'
import type { Session, User, SupabaseClient } from '@supabase/supabase-js'

interface AuthContextValue {
  session: Session | null
  user: User | null
  loading: boolean
  supabase: SupabaseClient
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  // Lazy init: client se crea una sola vez por instancia del provider.
  // Pasar el cliente como dep de useEffect cuando se recrea por render dispara
  // re-suscripciones constantes y, junto con un consumer que cause re-render,
  // amplifica loops. Ver Principio III (No BIG components) en constitution.md.
  const [supabase] = useState<SupabaseClient>(() => createBrowserSupabaseClient())

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    }

    initAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <AuthContext.Provider value={{ session, user, loading, supabase }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function useSupabase() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useSupabase must be used within AuthProvider')
  }
  return { supabase: context.supabase, session: context.session }
}