'use client';

import React from 'react';
import { ProductsProvider as ProductsContextProvider } from '@/context/ProductsContext';
import type { Product, Category } from '@/lib/hooks/useProducts';

/**
 * Proveedor global para datos de productos
 * Encapsula la lógica de datos para compartirla entre componentes
 * Acepta datos iniciales pre-cargados desde el servidor
 */
interface ProductsProviderProps {
  children: React.ReactNode;
  initialCategories?: Category[];
  initialProducts?: Product[];
}

export function ProductsProvider({ 
  children,
  initialCategories = [],
  initialProducts = []
}: ProductsProviderProps) {
  return (
    <ProductsContextProvider 
      initialCategories={initialCategories}
      initialProducts={initialProducts}
    >
      {children}
    </ProductsContextProvider>
  );
}
