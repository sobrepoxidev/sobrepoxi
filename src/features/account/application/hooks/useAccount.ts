'use client'

import { useState, useEffect } from 'react'
import { createBrowserSupabaseClient } from '@/shared/supabase/client'
import type { UserProfile, ShippingAddress } from '../distribute'
import type { User } from '@supabase/supabase-js'

export type { UserProfile }

interface UseAccountOptions {
  user: User
  initialProfile: UserProfile | null
}

export function useAccount({ user, initialProfile }: UseAccountOptions) {
  const [profile, setProfile] = useState<UserProfile | null>(initialProfile)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const createProfileIfNotExists = async () => {
      if (!profile && user) {
        try {
          setLoading(true)
          const supabase = createBrowserSupabaseClient()

          const { data, error: fetchError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          if (fetchError && fetchError.code === 'PGRST116') {
            const { data: newProfile, error: insertError } = await supabase
              .from('user_profiles')
              .insert({
                id: user.id,
                full_name: user.user_metadata?.full_name || null,
                shipping_address: null,
              })
              .select()
              .single()

            if (insertError) throw insertError
            if (isMounted) setProfile(newProfile)
          } else if (fetchError) {
            throw fetchError
          } else {
            if (isMounted) setProfile(data)
          }
        } catch (err) {
          if (isMounted) {
            setError(err instanceof Error ? err.message : 'Error creating profile')
          }
        } finally {
          if (isMounted) setLoading(false)
        }
      }
    }

    createProfileIfNotExists()

    return () => {
      isMounted = false
    }
  }, [user, profile])

  const updateFullName = async (fullName: string): Promise<void> => {
    try {
      setLoading(true)
      const supabase = createBrowserSupabaseClient()

      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({ full_name: fullName })
        .eq('id', user.id)

      if (profileError) throw profileError

      const { error: authError } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      })

      if (authError) throw authError

      setProfile(prev => prev ? { ...prev, full_name: fullName } : null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating name')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateShippingAddress = async (address: ShippingAddress): Promise<void> => {
    try {
      setLoading(true)
      const supabase = createBrowserSupabaseClient()

      const { error } = await supabase
        .from('user_profiles')
        .update({ shipping_address: address })
        .eq('id', user.id)

      if (error) throw error

      setProfile(prev => prev ? { ...prev, shipping_address: address } : null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating address')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    profile,
    loading,
    error,
    updateFullName,
    updateShippingAddress,
  }
}