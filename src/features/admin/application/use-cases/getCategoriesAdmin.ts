import { createServerSupabaseClient } from '@/shared/supabase/server';
import type { Database } from '@/types-db';

type Category = Database['categories'];

export async function getCategoriesAdmin(): Promise<Category[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name_es', { ascending: true });

  if (error) {
    console.error('[getCategoriesAdmin]', error);
    return [];
  }

  return data || [];
}
