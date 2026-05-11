import type { CartItem } from './types';

export interface DistributeCartResult {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
}

export function distributeCart(items: CartItem[]): DistributeCartResult {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * (item.product.dolar_price || 0)), 0);

  return {
    items,
    totalItems,
    subtotal,
  };
}

export const accionesCarrito = distributeCart;