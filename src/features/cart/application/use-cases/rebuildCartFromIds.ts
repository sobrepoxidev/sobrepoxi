import { createBrowserSupabaseClient } from '@/shared/supabase/client';
import { logger } from '@/shared/observability/logger';
import type { Product } from '../types';
import type { CartItem } from '../types';
import type { EncodedCartItem } from '../encode';

export async function rebuildCartFromIds(items: EncodedCartItem[]): Promise<CartItem[]> {
  const productIds = [...new Set(items.map((item) => item.id))];
  if (productIds.length === 0) return [];

  const supabase = createBrowserSupabaseClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .in('id', productIds);

  if (error) {
    logger.error('[cart.rebuildCartFromIds]', { error });
    return [];
  }

  if (!products?.length) {
    logger.warn('[cart.rebuildCartFromIds] no products found');
    return [];
  }

  return items.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.id);
    if (!product) return [];

    return [{ product: product as Product, quantity: item.qty }];
  });
}

