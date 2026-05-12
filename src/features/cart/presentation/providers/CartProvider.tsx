'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import {
  CartContext,
  encodeCartToBase64,
  decodeCartFromBase64,
  type CartItem,
  type Product,
} from '../state/CartContext';
import { createBrowserSupabaseClient } from '@/shared/supabase/client';

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const firstRender = useRef(true);

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

  useEffect(() => {
    const encoded = searchParams.get('cart');
    if (!encoded) return;

    const parsed = decodeCartFromBase64(encoded);
    if (parsed.length === 0) return;

    if (cart.length > 0) return;

    console.log("Reconstrucción del carrito requerida:", parsed);

    const fetchProductsAndRebuildCart = async () => {
      setIsLoading(true);
      try {
        const supabase = createBrowserSupabaseClient();
        const productIds = parsed.map(item => item.id);

        const { data: products, error } = await supabase
          .from('products')
          .select('*')
          .in('id', productIds);

        if (error) {
          console.error('Error fetching products:', error);
          return;
        }

        if (!products || products.length === 0) {
          console.warn('No products found for the IDs in cart');
          return;
        }

        const newCartItems: CartItem[] = [];

        parsed.forEach(parsedItem => {
          const product = products.find(p => p.id === parsedItem.id);
          if (product) {
            newCartItems.push({
              product: product as Product,
              quantity: parsedItem.qty
            });
          }
        });

        setCart(newCartItems);
      } catch (err) {
        console.error('Error rebuilding cart from URL:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductsAndRebuildCart();
  }, []);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.quantity * (item.product.dolar_price || 0)), 0);

  const syncCartWithDB = async (userId?: string) => {
    if (!userId) return;
    setIsLoading(true);
    try {
      console.log('Syncing cart with DB for user:', userId);
    } catch (error) {
      console.error('Error syncing cart with DB:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalItems,
      subtotal,
      isLoading,
      syncCartWithDB
    }}>
      {children}
    </CartContext.Provider>
  );
}