'use client';

import React, { useMemo } from "react";
import Card from "./Card";
import Link from "next/link";
import Image from "next/image";
import { useProductsContext } from "@/context/ProductsContext";
import { useLocale } from "next-intl";

/**
 * Componente específico para mostrar la segunda sección de grid
 * A diferencia del OptimizedGridSection original, este componente:
 * - Está configurado específicamente para las categorías 6-12
 * - Siempre tiene mobileActive=false (no muestra carrusel en móvil)
 * - Tiene estilos y comportamiento optimizados para su ubicación específica
 */
const SecondaryGridSection: React.FC = () => {
  const locale = useLocale();
  const { categories, productsByCategory, loading, error } = useProductsContext();
  
  // Constantes específicas para esta sección
  const indexStart = 6;
  const indexEnd = 12;
  
  // Usar useMemo para evitar cálculos repetidos en cada renderizado
  const desktopCards = useMemo(() => {
    return categories.slice(indexStart, indexEnd).map(category => {
      const categoryProducts = productsByCategory[category.id] || [];
      const displayProducts = categoryProducts.slice(0, 4);

      return {
        title: locale === 'es' ? category.name_es : category.name_en || category.name,
        link: `/products?category=${category.id}`,
        content: (
          <div className="p-3">
            {displayProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  {displayProducts.map((product, idx) => (
                    <Link key={`${product.id}-${idx}`} href={`/product/${product.id}`} className="block group">
                      <div className="flex flex-col items-center bg-gray-50 rounded p-2 hover:shadow-sm transition-shadow">
                        <div className="h-44 flex items-center justify-center mb-1">
                          <Image
                            src={product.media && product.media.length > 0 ?
                              (typeof product.media[0]["url"] === 'string' ? product.media[0]["url"] : '/placeholder.jpg') :
                              '/placeholder.jpg'}
                            alt={(locale === 'es' ? product.name_es : product.name_en) || product.name || "Producto"}
                            width={100}
                            height={100}
                            style={{ objectFit: 'contain', maxHeight: '100%' }}
                            className="group-hover:scale-105 transition-transform"
                            priority={idx < 2}
                          />
                        </div>
                        <span className="text-[10px] text-center line-clamp-1 font-medium text-gray-800">
                          {locale === 'es' ? product.name_es : product.name_en}
                        </span>
                        {product.price && (
                          <span className="text-[10px] font-bold text-teal-700 mt-0.5">
                            ₡{product.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 text-xs text-teal-600 hover:underline text-center">
                  <Link href={`/products?category=${category.id}`} className="inline-flex items-center">
                    <span>Ver todo en {category.name}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center h-48">
                  <Image
                    src={'/placeholder.jpg'}
                    alt={category.name || 'Categoría'}
                    width={180}
                    height={180}
                    style={{ objectFit: 'contain', maxHeight: '100%' }}
                    className="transition-transform hover:scale-105"
                  />
                </div>
                <div className="mt-3 text-xs text-teal-600 hover:underline text-center">
                  <Link href={`/products?category=${category.id}`} className="inline-flex items-center">
                    <span>Ver todo en {category.name}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </>
            )}
          </div>
        ),
      };
    });
  }, [categories, productsByCategory, locale]);

  if (loading) {
    return (
      <div className="max-lg:hidden grid grid-cols-3 gap-5 mt-4 mb-4 mx-4 pb-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-100 animate-pulse h-64 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        <p>Error al cargar categorías</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Solo versión de escritorio - No tiene versión móvil */}
      <div className="grid grid-cols-2 md:grid-cols-3 px-4 gap-4 mb-4 mt-4 max-lg:hidden">
        {desktopCards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default SecondaryGridSection;
