// src/components/products/AutoOpenModal.tsx
'use client';

import { useEffect } from 'react';
import { Database } from '@/types-db';

// Tipado del producto desde tu definición de Supabase
type Product = Database['products'];

interface Props {
  product: Product;
  idCardOpen?: string | string[];
}

// Evento custom para abrir el modal
interface OpenGalleryModalEventDetail {
  product: Product;
}

export function AutoOpenModal({ product }: Props) {
  useEffect(() => {
    const event = new CustomEvent<OpenGalleryModalEventDetail>('openGalleryModal', {
      detail: { product },
    });

    window.dispatchEvent(event);
  }, [product]); // aseguramos que se despache solo si `product` cambia (aunque en este caso es una vez al montar)

  return null; // componente invisible, solo dispara efectos
}
