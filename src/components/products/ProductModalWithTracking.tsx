'use client';

import { ProductCardModal } from './ProductModal';
import ViewedHistoryTracker from './ViewedHistoryTracker';
import { Database } from '@/types-db';

type Product = Database['products'] & { category: string | null };

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
