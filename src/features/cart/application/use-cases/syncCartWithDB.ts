import { createBrowserSupabaseClient } from '@/shared/supabase/client';
import { logger } from '@/shared/observability/logger';
import type { CartItem } from '../types';

export async function syncCartWithDB(
  userId: string | undefined,
  cart: CartItem[]
): Promise<{ success: boolean; error?: string }> {
  if (!userId) return { success: true };

  const supabase = createBrowserSupabaseClient();
  const { error: deleteError } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId);

  if (deleteError) {
    logger.error('[cart.syncCartWithDB] delete failed', { error: deleteError });
    return { success: false, error: 'Unable to sync cart' };
  }

  if (cart.length === 0) return { success: true };

  const rows = cart.map((item) => ({
    user_id: userId,
    product_id: item.product.id,
    quantity: item.quantity,
  }));

  const { error: insertError } = await supabase.from('cart_items').insert(rows);
  if (insertError) {
    logger.error('[cart.syncCartWithDB] insert failed', { error: insertError });
    return { success: false, error: 'Unable to sync cart' };
  }

  return { success: true };
}
