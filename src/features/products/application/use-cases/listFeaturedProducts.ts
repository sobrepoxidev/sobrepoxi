import { createServerSupabaseClient } from '@/shared/supabase/server';
import { logger } from '@/shared/observability/logger';
import type { Database } from '@/shared/types/database';

type Product = Database['products'];

export async function listFeaturedProducts(limit = 9): Promise<Product[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    logger.error('[listFeaturedProducts]', { error });
    return [];
  }

  return data ?? [];
}
