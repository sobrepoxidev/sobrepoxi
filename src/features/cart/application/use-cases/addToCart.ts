import type { Database } from '@/shared/types/database';
import { logger } from '@/shared/observability/logger';

type Product = Database['products'];

export async function addToCartUseCase(
  product: Product,
  quantity: number = 1
): Promise<{ success: boolean; error?: string }> {
  try {
    logger.info('[addToCartUseCase] Adding product', { productId: product.id, quantity });
    return { success: true };
  } catch (error) {
    logger.error('[addToCartUseCase] Error', { error });
    return { success: false, error: 'Unable to add product to cart' };
  }
}
