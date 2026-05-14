import { createBrowserSupabaseClient } from '@/shared/supabase/client';
import { logger } from '@/shared/observability/logger';
import type { Order } from '../distribute';

export async function getUserOrders(userId: string): Promise<Order[]> {
  const supabase = createBrowserSupabaseClient();

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items:order_items (
        *,
        product:products (*)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    logger.error('[getUserOrders]', { error });
    return [];
  }

  return data || [];
}
