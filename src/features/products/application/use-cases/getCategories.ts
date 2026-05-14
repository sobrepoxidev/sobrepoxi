import { createServerSupabaseClient } from '@/shared/supabase/server';
import type { Database } from '@/shared/types/database';

type Category = Database['categories'];

export async function getCategories(): Promise<Category[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('[getCategories]', error);
    return [];
  }

  return data ?? [];
}