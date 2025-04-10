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
import { useState } from 'react';

import { Database } from "@/types-db";

import { useCart } from "@/context/CartContext";

type Product = Database['products'];


export function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    console.log("Adding to cart:", product, quantity);
    addToCart(product, quantity);
  };

  const { media = [], name, description } = product;

  return (
    <div className="bg-[#EFE9DB] rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full border border-gray-300">
      {/* Carrusel: delegamos a un Client Component */}
      <MediaCarousel media={media || []} productName={name || ""} />
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
                onClick={handleDecrement}
              >
                −
              </button>
              <div className="flex items-center justify-center w-12 h-8 text-base font-semibold text-gray-700">
                {quantity}
              </div>
              <button
                className="px-3 py-2  hover:bg-[#E0D5BF] text-gray-700 transition-colors duration-200 h-10"
                aria-label="Aumentar cantidad"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
          </div>

          {/* Precio y botón de agregar al carrito Mejorado */}
          <div className="flex flex-col  items-center justify-between ">
            
            <button
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-6 py-3 text-teal-900 font-medium shadow-lg transition-all hover:bg-teal-700 active:scale-95 active:shadow-none"
              onClick={handleAddToCart}
            >
              <ShoppingCartIcon className="w-5 h-5" /> ₡{product.price ? product.price.toFixed(2) : 'Price not available'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
