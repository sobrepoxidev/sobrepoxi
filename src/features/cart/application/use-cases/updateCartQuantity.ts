export async function updateCartQuantityUseCase(
  productId: number,
  quantity: number
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('[updateCartQuantityUseCase] Updating product:', productId, 'quantity:', quantity);
    return { success: true };
  } catch (error) {
    console.error('[updateCartQuantityUseCase] Error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}