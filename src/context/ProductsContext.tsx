'use client';

import React, { createContext, useContext } from 'react';
import { useProducts, ProductsData, Product, Category } from '@/lib/hooks/useProducts';

// Crear el contexto
const ProductsContext = createContext<ProductsData | undefined>(undefined);

// Props para el proveedor
interface ProductsProviderProps {
  children: React.ReactNode;
  
  initialCategories?: Category[];
  initialProducts?: Product[];
}

// Proveedor del contexto que utiliza nuestro hook
export function ProductsProvider({ 
  children, 
  initialCategories = [],
  initialProducts = []
}: ProductsProviderProps) {
  const productsData = useProducts(initialCategories, initialProducts);

  return (
    <ProductsContext.Provider value={productsData}>
      {children}
    </ProductsContext.Provider>
  );
}

// Hook para consumir el contexto
export function useProductsContext(): ProductsData {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProductsContext debe ser usado dentro de un ProductsProvider');
  }
  return context;
}
