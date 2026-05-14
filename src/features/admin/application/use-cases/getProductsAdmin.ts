import { createServerSupabaseClient } from '@/shared/supabase/server';
import type { Database } from '@/shared/types/database';

type Product = Database['products'];

export async function getProductsAdmin(): Promise<Product[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('[getProductsAdmin]', error);
    return [];
  }

  return data || [];
}
