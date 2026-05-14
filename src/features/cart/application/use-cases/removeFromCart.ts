import { logger } from '@/shared/observability/logger';

export async function removeFromCartUseCase(
  productId: number
): Promise<{ success: boolean; error?: string }> {
  try {
    logger.info('[removeFromCartUseCase] Removing product', { productId });
    return { success: true };
  } catch (error) {
    logger.error('[removeFromCartUseCase] Error', { error });
    return { success: false, error: 'Unable to remove product from cart' };
  }
}
