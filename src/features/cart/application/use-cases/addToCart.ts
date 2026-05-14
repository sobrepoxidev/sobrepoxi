import type { Database } from '@/shared/types/database';

type Product = Database['products'];

export async function addToCartUseCase(
  product: Product,
  quantity: number = 1
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('[addToCartUseCase] Adding product:', product.id, 'quantity:', quantity);
    return { success: true };
  } catch (error) {
    console.error('[addToCartUseCase] Error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}