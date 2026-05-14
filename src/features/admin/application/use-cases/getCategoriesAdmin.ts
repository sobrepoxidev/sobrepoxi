import { createServerSupabaseClient } from '@/shared/supabase/server';
import { logger } from '@/shared/observability/logger';
import type { Database } from '@/shared/types/database';

type Category = Database['categories'];

export async function getCategoriesAdmin(): Promise<Category[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name_es', { ascending: true });

  if (error) {
    logger.error('[getCategoriesAdmin]', { error });
    return [];
  }

  return data || [];
}
