'use client';

import { FullscreenModal } from './ClientComponents';
import ViewedHistoryTracker from './ViewedHistoryTracker';
import { Database } from '@/types-db';

type Product = Database['products'];

/**
 * Envuelve FullscreenModal añadiendo la funcionalidad de rastreo 
 * de historial de productos vistos.
 */
export function FullscreenModalWithTracking({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  return (
    <>
      {/* Componente invisible que rastrea la visualización del producto */}
      <ViewedHistoryTracker product={product} />
      
      {/* Componente original del modal */}
      <FullscreenModal
        product={product}
        onClose={onClose}
      />
    </>
  );
}
