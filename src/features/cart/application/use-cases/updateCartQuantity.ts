import { logger } from '@/shared/observability/logger';

export async function updateCartQuantityUseCase(
  productId: number,
  quantity: number
): Promise<{ success: boolean; error?: string }> {
  try {
    logger.info('[updateCartQuantityUseCase] Updating product', { productId, quantity });
    return { success: true };
  } catch (error) {
    logger.error('[updateCartQuantityUseCase] Error', { error });
    return { success: false, error: 'Unable to update cart quantity' };
  }
}
