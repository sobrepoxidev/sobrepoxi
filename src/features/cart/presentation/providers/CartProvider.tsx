'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { CartContext, type CartItem, type Product } from '../state/CartContext';
import { encodeCartToBase64, decodeCartFromBase64 } from '../../application/encode';
import { rebuildCartFromIds } from '../../application/use-cases/rebuildCartFromIds';
import { syncCartWithDB as syncCartWithDBUseCase } from '../../application/use-cases/syncCartWithDB';
import { logger } from '@/shared/observability/logger';

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
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      return existing
        ? prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prev) => prev.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
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

    const fetchProductsAndRebuildCart = async () => {
      setIsLoading(true);
      try {
        const newCartItems = await rebuildCartFromIds(parsed);
        setCart(newCartItems);
      } catch (error) {
        logger.error('[CartProvider] rebuild from URL failed', { error });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductsAndRebuildCart();
  }, []);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.quantity * (item.product.dolar_price || 0), 0);

  const syncCartWithDB = async (userId?: string) => {
    if (!userId) return;
    setIsLoading(true);
    try {
      await syncCartWithDBUseCase(userId, cart);
    } catch (error) {
      logger.error('[CartProvider] sync failed', { error });
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
      syncCartWithDB,
    }}>
      {children}
    </CartContext.Provider>
  );
}
