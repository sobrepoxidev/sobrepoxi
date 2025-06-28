'use client';

import { useEffect } from 'react';
import { addProductToHistory } from '@/lib/viewedHistory';

interface ViewedHistoryTrackerProps {
  product: {
    id: number;
    name_es: string;
    name_en: string;
    colon_price: number | null;
    dolar_price: number | null;
    category: string | null;
    media?: Array<{ url: string, type: string }> | null;
  };
}

/**
 * Componente que se encarga de registrar las visualizaciones de productos
 * en el historial. Debe incluirse en las páginas de detalles de producto.
 */
export default function ViewedHistoryTracker({ product }: ViewedHistoryTrackerProps) {
  useEffect(() => {
    // Solo registrar si el producto tiene un ID válido
    if (product && product.id) {
      addProductToHistory(product);
    }
  }, [product]);

  // Este componente no renderiza nada visible
  return null;
}
