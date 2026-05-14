'use client'
import { createContext, useContext } from 'react'
import type { Session, User } from '@supabase/supabase-js'

interface AuthStateContextValue {
  session: Session | null
  user: User | null
  loading: boolean
}

export const AuthStateContext = createContext<AuthStateContextValue | undefined>(undefined)

export function useAuthStateContext() {
  const context = useContext(AuthStateContext)
  if (!context) {
    throw new Error('useAuthStateContext must be used within a provider')
  }
  return context
}