import type { Database } from '@/shared/types/database';

export type Product = Database['products'];

export type CartItem = {
  product: Product;
  quantity: number;
  id?: number;
};

export interface CartContextProps {
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