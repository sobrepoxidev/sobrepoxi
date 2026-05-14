import { createServerSupabaseClient } from '@/shared/supabase/server';
import { logger } from '@/shared/observability/logger';
import type { Database } from '@/shared/types/database';

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
    logger.error('[updateProductAdmin]', { error });
    return { success: false, error: 'Unable to update product' };
  }

  return { success: true };
}
