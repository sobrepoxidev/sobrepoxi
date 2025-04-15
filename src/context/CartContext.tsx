'use client';

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
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

// Helpers
function encodeCartToBase64(cart: CartItem[]): string {
  const minimalCart = cart.map(item => ({ id: item.product.id, qty: item.quantity }));
  return btoa(JSON.stringify(minimalCart));
}

function decodeCartFromBase64(encoded: string): { id: number; qty: number }[] {
  try {
    return JSON.parse(atob(encoded));
  } catch (error) {
    console.error("Error decoding cart:", error);
    return [];
  }
}
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  // 🔄 Control para evitar el sync en el primer render
  const firstRender = useRef(true);

  // 🧠 Efecto: sincronizar carrito con URL solo cuando el carrito cambie
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    if (cart.length > 0) {
      params.set('cart', encodeCartToBase64(cart));
    } else {
      params.delete('cart');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [cart, pathname, router, searchParams]);

  // 🎁 Funciones del carrito
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      return existing
        ? prev.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart(prev => prev.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // 🚀 Al montar: reconstruir carrito desde URL (solo los IDs y cantidades)
  useEffect(() => {
    const encoded = searchParams.get('cart');
    if (!encoded) return;

    const parsed = decodeCartFromBase64(encoded);
    if (parsed.length === 0) return;

    // Aquí deberías hacer un fetch a Supabase para obtener los productos por ID
    // Por ahora solo logueamos lo detectado
    console.log("Reconstrucción del carrito requerida:", parsed);
    // setCart(...) ← con productos reales después del fetch
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
