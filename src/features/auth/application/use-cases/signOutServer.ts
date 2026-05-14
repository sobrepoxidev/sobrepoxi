import { createServerSupabaseClient } from '@/shared/supabase/server';

export async function signOutServer() {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signOut();

  return { error: error ? { message: error.message } : null };
}
