// ----------------------------------------
// src/components/gallery/ProductCard.tsx
// ----------------------------------------
"use client";
// NOTA: No usamos 'use client' aquí. Esto se ejecuta en el servidor.

// Importamos SOLO el MediaCarousel (Client Component) para el carrusel de Swiper
import { MediaCarousel } from "./ClientComponents";
import {
  ShoppingCartIcon,

} from 'lucide-react';

// Tipos de datos
export interface Product {
  id: number;
  name: string;
  description: string;
  // "media" viene desde la BD y lo usaremos en el carrusel
  media?: {
    type: "image" | "video";
    url: string;
    caption?: string;
  }[];
  price: number;
}

// WhatsApp integration
// function getWhatsAppLink(productName: string) {
//   // Cambia a tu número real
//   const phoneNumber = "50685850000";
//   const text = encodeURIComponent(
//     `¡Hola! Estoy interesado en obtener más información del producto: ${productName}`
//   );
//   return `https://wa.me/${phoneNumber}?text=${text}`;
// }

// Server Component que renderiza la tarjeta
export function ProductCard({ product }: { product: Product }) {
  const { media = [], name, description } = product;

  return (
    <div className="bg-[#EFE9DB] rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full border border-gray-300">
      {/* Carrusel: delegamos a un Client Component */}
      <MediaCarousel media={media} productName={name} />
      <div className="flex flex-row justify-center font-thin border-t border-gray-300 mb-1 mt-2  mx-4"/>

      

      {/* Product info */}
      <div className=" flex flex-col flex-grow">
        <div>
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 ">
            {name}
          </h2>
          <p className="text-sm text-gray-600 ">
            {description}
          </p>
        </div>

        <div className="flex-grow"></div>

        {/* Selector de cantidad y Precio/Carrito mejorados */}
        <div className="mt-auto p-2 flex flex-col gap-2">
          {/* Selector de Cantidad Mejorado */}
          <div className="flex flex-col items-center justify-between">
            {/* <span className="text-sm font-medium text-gray-700">Cantidad</span> */}
            <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
              <button
                className="px-3  hover:bg-[#E0D5BF] text-gray-700 transition-colors duration-200 h-10"
                aria-label="Disminuir cantidad"
              >
                −
              </button>
              <div className="flex items-center justify-center w-12 h-8 text-base font-semibold text-gray-700">
                1
              </div>
              <button
                className="px-3 py-2  hover:bg-[#E0D5BF] text-gray-700 transition-colors duration-200 h-10"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
          </div>

          {/* Precio y botón de agregar al carrito Mejorado */}
          <div className="flex flex-col  items-center justify-between ">
            <span className="text-2xl font-bold text-teal-800">

            </span>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-6 py-3 text-teal-900 font-medium shadow-lg transition-all hover:bg-teal-700 active:scale-95 active:shadow-none"
            >
              <ShoppingCartIcon className="w-5 h-5" /> ${product.price.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
