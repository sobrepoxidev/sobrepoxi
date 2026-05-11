import { createServerSupabaseClient } from '@/shared/supabase/server';
import type { Database } from '@/types-db';

type Product = Database['products'];

export async function updateProductAdmin(
  productId: number,
  updates: Partial<Product>
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createServerSupabaseClient();
  
  const { error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', productId);

  if (error) {
    console.error('[updateProductAdmin]', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
