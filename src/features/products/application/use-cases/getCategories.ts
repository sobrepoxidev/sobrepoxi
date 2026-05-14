import { createServerSupabaseClient } from '@/shared/supabase/server';
import { logger } from '@/shared/observability/logger';
import type { Database } from '@/shared/types/database';

type Category = Database['categories'];

export async function getCategories(): Promise<Category[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    logger.error('[getCategories]', { error });
    return [];
  }

  return data ?? [];
}
