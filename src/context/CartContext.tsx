'use client';

import { createContext, useContext, useState } from "react";
import { Database } from '@/types-db';

type Product = Database['products'];

type CartItem = {
  product: Product;
  quantity: number;
};

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item);
      } else {
        return [...prev, { product, quantity }];
      }
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart(prev => prev.map(item =>
      item.product.id === productId ? { ...item, quantity } : item));
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);