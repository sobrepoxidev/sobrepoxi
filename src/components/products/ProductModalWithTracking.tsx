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
      <ViewedHistoryTracker product={{
        id: product.id,
        name_es: product.name_es || '',
        name_en: product.name_en || '',
        colon_price: product.colon_price,
        dolar_price: product.dolar_price,
        category: product.category || null,
        media: product.media || null
      }} />
      
      {/* Componente original del modal */}
      <ProductCardModal
        product={product}
        activeExpandButton={activeExpandButton}
        fullscreenMode={fullscreenMode}
      />
    </>
  );
}
