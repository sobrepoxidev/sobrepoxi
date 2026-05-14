'use client';

import { createContext, useContext } from 'react';
import type { Database } from '@/shared/types/database';

export type Product = Database['products'];

export type CartItem = {
  product: Product;
  quantity: number;
  id?: number;
};

interface CartContextProps {
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

const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  totalItems: 0,
  subtotal: 0,
  isLoading: false,
  syncCartWithDB: async () => {},
});

export type UseCartReturn = CartContextProps;

export function useCart(): UseCartReturn {
  return useContext(CartContext);
}

export { CartContext };
export type { CartContextProps };
export function encodeCartToBase64(cart: CartItem[]): string {
  const minimalCart = cart.map(item => ({ id: item.product.id, qty: item.quantity }));
  return btoa(JSON.stringify(minimalCart));
}

export function decodeCartFromBase64(encoded: string): { id: number; qty: number }[] {
  try {
    return JSON.parse(atob(encoded));
  } catch (error) {
    console.error("Error decoding cart:", error);
    return [];
  }
}