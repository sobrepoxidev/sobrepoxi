export async function removeFromCartUseCase(
  productId: number
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('[removeFromCartUseCase] Removing product:', productId);
    return { success: true };
  } catch (error) {
    console.error('[removeFromCartUseCase] Error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}