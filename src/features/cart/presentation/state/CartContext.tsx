'use client';

import { createContext, useContext } from 'react';
import type { CartContextProps, CartItem, Product } from '../../application/types';

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
export type { CartContextProps, CartItem, Product };
