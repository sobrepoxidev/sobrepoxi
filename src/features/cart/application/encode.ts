import type { CartItem } from './types';
import { logger } from '@/shared/observability/logger';

export interface EncodedCartItem {
  id: number;
  qty: number;
}

export function encodeCartToBase64(cart: CartItem[]): string {
  const minimalCart = cart.map((item) => ({ id: item.product.id, qty: item.quantity }));
  const value = JSON.stringify(minimalCart);

  if (typeof window !== 'undefined') {
    return window.btoa(value);
  }

  return Buffer.from(value, 'utf8').toString('base64');
}

export function decodeCartFromBase64(encoded: string): EncodedCartItem[] {
  try {
    const value =
      typeof window !== 'undefined'
        ? window.atob(encoded)
        : Buffer.from(encoded, 'base64').toString('utf8');

    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => ({ id: Number(item?.id), qty: Number(item?.qty) }))
      .filter((item) => Number.isInteger(item.id) && item.id > 0 && Number.isFinite(item.qty) && item.qty > 0);
  } catch (error) {
    logger.error('[cart.decodeCartFromBase64]', { error });
    return [];
  }
}
