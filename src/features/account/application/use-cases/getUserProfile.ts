import { createServerSupabaseClient } from '@/shared/supabase/server'
import { logger } from '@/shared/observability/logger'
import type { UserProfile } from '../distribute'
import type { User } from '@supabase/supabase-js'

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    logger.error('[getUserProfile]', { error })
    return null
  }

  return data
}

export async function createUserProfile(user: User): Promise<UserProfile | null> {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('user_profiles')
    .insert({
      id: user.id,
      full_name: user.user_metadata?.full_name || null,
      shipping_address: null,
    })
    .select()
    .single()

  if (error) {
    logger.error('[createUserProfile]', { error })
    return null
  }

  return data
}

export async function updateUserFullName(
  userId: string,
  fullName: string
): Promise<void> {
  const supabase = await createServerSupabaseClient()

  const { error: profileError } = await supabase
    .from('user_profiles')
    .update({ full_name: fullName })
    .eq('id', userId)

  if (profileError) throw profileError

  const { error: authError } = await supabase.auth.updateUser({
    data: { full_name: fullName },
  })

  if (authError) throw authError
}
