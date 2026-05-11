'use client'

import React from 'react'
import { Session, SupabaseClient } from '@supabase/supabase-js'

const Context = React.createContext<{
  supabase: SupabaseClient
  session: Session | null
} | undefined>(undefined)

export default function SupabaseProvider({
  children,
  session,
  supabase,
}: {
  children: React.ReactNode
  session: Session | null
  supabase: SupabaseClient
}) {
  return (
    <Context.Provider value={{ supabase, session }}>
      {children}
    </Context.Provider>
  )
}

export function useSupabase() {
  const context = React.useContext(Context)
  if (!context) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  }
  return context
}