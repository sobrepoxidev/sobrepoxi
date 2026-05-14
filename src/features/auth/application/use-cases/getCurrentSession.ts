import { createServerSupabaseClient } from '@/shared/supabase/server';

export async function getCurrentSession() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}
