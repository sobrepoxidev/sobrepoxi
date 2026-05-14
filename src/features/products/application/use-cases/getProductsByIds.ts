import { createServerSupabaseClient } from '@/shared/supabase/server';
import type { Database } from '@/shared/types/database';

type Product = Database['products'];

export async function getProductsByIds(ids: number[]): Promise<Product[]> {
  if (ids.length === 0) return [];
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('id', ids);

  if (error) {
    console.error('[getProductsByIds]', error);
    return [];
  }

  return data ?? [];
}