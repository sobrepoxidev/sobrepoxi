'use client';

import { ProductCardModal } from './ProductModal';
import ViewedHistoryTracker from './ViewedHistoryTracker';
import { Database } from '@/types-db';

type Product = Omit<Database['products'], 'name_es' | 'name_en'> & { 
  name_es: string;
  name_en: string;
  category: string | null;
};

/**
 * Envuelve ProductCardModal añadiendo la funcionalidad de rastreo 
 * de historial de productos vistos.
 */
export function ProductCardModalWithTracking({
  product,
  activeExpandButton,
  fullscreenMode = false
}: {
  product: Product,
  activeExpandButton: boolean,
  fullscreenMode?: boolean
}) {
  return (
    <>
      {/* Componente invisible que rastrea la visualización del producto */}
      <ViewedHistoryTracker product={product} />
      
      {/* Componente original del modal */}
      <ProductCardModal
        product={product}
        activeExpandButton={activeExpandButton}
        fullscreenMode={fullscreenMode}
      />
    </>
  );
}
