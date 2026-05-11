'use client';

import { useCart as useCartContext, type CartItem, type Product } from '@/features/cart';

export type { CartItem, Product };

export interface UseCartReturn {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isLoading: boolean;
  syncCartWithDB: (userId?: string) => Promise<void>;
}

export function useCart(): UseCartReturn {
  return useCartContext();
}