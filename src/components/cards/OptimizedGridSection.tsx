'use client';

import React, { useMemo } from "react";
import Card from "./Card";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useProductsContext } from "@/context/ProductsContext";
import CarrucelSectionA from "./CarrucelSectionA";
import { useLocale } from "next-intl";
import { formatUSD } from "@/lib/formatCurrency";
import { ChevronRight } from "lucide-react";


interface GridSectionProps {
  // Props simplificados
  mobileActive?: boolean;
  /** Identificador único para este componente, usado para la distribución de productos */
  sectionId?: string;
}

const OptimizedGridSection: React.FC<GridSectionProps> = ({
  mobileActive = true,
}) => {
  const locale = useLocale();
  const { categories, sectionProducts, loading, error } = useProductsContext();

  // Definimos internamente qué categorías mostrar (0-6 por defecto)
  const indexStart = 0;
  const indexEnd = 6;

  // Usamos useMemo para evitar cálculos repetidos en cada renderizado
  const desktopCards = useMemo(() => {
    return categories.slice(indexStart, indexEnd).map(category => {
      const categoryProducts = sectionProducts.gridByCategory[category.id] || [];
      const displayProducts = categoryProducts.slice(0, 4); // Mostrar hasta 4 productos por categoría

      return {
        title: locale === 'es' ? category.name_es : category.name_en || category.name,
        link: `/products?category=${category.name}`,
        content: (
          <div className="p-3">
            {displayProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-3 ">
                  {displayProducts.map((product, idx) => (
                    <Link key={`${product.id}-${idx}`} href={`/product/${product.name}`} target="_self" className="block group">
                      <div className="flex flex-col items-center bg-[#121212] p-2 hover:shadow-sm transition-shadow">
                        <div className="h-44 flex items-center justify-center mb-1 overflow-hidden">
                          <Image
                            src={product.media && product.media.length > 0 ?
                              (typeof product.media[0]["url"] === 'string' ? product.media[0]["url"] : locale === 'es' ? 'https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/placeholder_es-knQ3ZPLukUBoZ1S4t6C9Ad4sJrI4tb.webp' : 'https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/image_en-ovvACAz2v6p2aXrceAdO2AH7a89puh.webp') :
                              locale === 'es' ? 'https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/placeholder_es-knQ3ZPLukUBoZ1S4t6C9Ad4sJrI4tb.webp' : 'https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/image_en-ovvACAz2v6p2aXrceAdO2AH7a89puh.webp'}
                            alt={(locale === 'es' ? product.name_es : product.name_en) || product.name || "Producto"}
                            width={200}
                            height={200}
                            style={{ objectFit: 'contain', maxHeight: '100%' }}
                            className="group-hover:scale-105 transition-transform"
                            priority // Solo priorizar las primeras imágenes
                        
                          />
                        </div>
                        <span className="text-[10px] text-center line-clamp-1 font-medium text-gray-200">
                          {locale === 'es' ? product.name_es : product.name_en}
                        </span>
                        {product.dolar_price && product.dolar_price > 0 ? (
                          <span className="text-[10px] font-bold text-teal-700 mt-0.5">
                            {formatUSD(product.dolar_price)}
                          </span>
                        ) : (
                          <div className="flex items-center justify-center">
                            <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const msg = encodeURIComponent(
                                locale === 'es'
                                  ? `Hola, estoy interesado en el producto: ${product?.name_es} (${window.location.href})`
                                  : `Hello, I am interested in the product: ${product?.name_en} (${window.location.href})`
                              );
                              window.open(`https://wa.me/+50684237555?text=${msg}`, '_blank', 'noopener');
                            }}
                            className="inline-flex items-center justify-center text-xs font-medium text-teal-600 hover:text-teal-500 border-b border-current pb-0"
                          >
                            {locale === 'es' ? 'Consultar precio' : 'Check price'}
                            <svg className="w-2.5 h-2.5 ml-1 inline-block" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                            </svg>
                          </button>
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 text-xs text-[#121212] hover:underline text-center">
                  <Link href={`/products?category=${category.name}`} target="_self" className="inline-flex items-center">
                    <span>{locale === 'es' ? 'Ver todo en ' + category.name_es : 'View all in ' + category.name_en}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center h-48 overflow-hidden">
                  <Image
                    src={locale === 'es' ? 'https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/placeholder_es-knQ3ZPLukUBoZ1S4t6C9Ad4sJrI4tb.webp' : 'https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/image_en-ovvACAz2v6p2aXrceAdO2AH7a89puh.webp'}
                    alt={category.name || 'Categoría'}
                    width={200}
                    height={200}
                    style={{ objectFit: 'contain', maxHeight: '100%' }}
                    className="transition-transform hover:scale-105"
                   
                  />
                </div>
                <div className="mt-3 text-xs text-teal-600 hover:underline text-center">
                  <Link href={`/products?category=${category.name}`} target="_self" className="inline-flex items-center">
                    <span>{locale === 'es' ? 'Ver todo en ' + category.name_es : 'View all in ' + category.name_en}</span>
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
  }, [categories, sectionProducts, indexStart, indexEnd, locale]);



  if (loading) {
    return (
      <>
        {/* Skeleton para desktop */}
        <div className="max-lg:hidden grid grid-cols-3 gap-5 mt-4 mb-4 mx-4 pb-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-100 animate-pulse h-64 rounded-lg"></div>
          ))}
        </div>

        {/* Skeleton para móvil */}
        <div className="lg:hidden grid grid-rows-3 gap-4 mt-4 mb-4 mx-4 pb-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 animate-pulse h-64 rounded-lg"></div>
          ))}
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        <p>{locale === 'es' ? 'Error al cargar categorías' : 'Error loading categories'}</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Versión de escritorio - Muestra categorías en grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 px-4 gap-4 pb-4 max-lg:hidden">
        {desktopCards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>

      {/* Versión móvil - Carrusel con 3 categorías principales + resto abajo */}
      {mobileActive && (
        <div className="lg:hidden">
          <CarrucelSectionA
            items={
              // Ordenamos las categorías dando prioridad a Paintings y Napkin Holders
              [...categories.slice(indexStart, indexEnd)]
                .sort((a, b) => {
                  const aName = (a.name || '').toLowerCase();
                  const bName = (b.name || '').toLowerCase();
                  const isPrioritizedA = aName.includes('painting') || aName.includes('napkin holder');
                  const isPrioritizedB = bName.includes('painting') || bName.includes('napkin holder');
                  if (isPrioritizedA && !isPrioritizedB) return -1;
                  if (!isPrioritizedA && isPrioritizedB) return 1;
                  const aProducts = (sectionProducts.gridByCategory[a.id] || []).length;
                  const bProducts = (sectionProducts.gridByCategory[b.id] || []).length;
                  if (aProducts >= 4 && bProducts < 4) return -1;
                  if (aProducts < 4 && bProducts >= 4) return 1;
                  return bProducts - aProducts;
                })
                .slice(0, 3) // Solo 3 en el carrusel
                .map((category) => {
                  const categoryProducts = sectionProducts.gridByCategory[category.id] || [];
                  const cardColor = 'bg-gold-gradient';

                  return {
                    textColor: 'text-black',
                    title: `${locale === 'es' ? category.name_es : category.name_en || category.name}`,
                    content: (
                      <div className="grid grid-cols-2 gap-2 w-full h-full px-1 pt-4">
                        {categoryProducts.slice(0, 4).map((product, idx) => (
                          <Link key={idx} href={`/product/${product.name}`} className="block text-center">
                            <div className="h-44 flex items-center justify-center bg-[#303030] rounded-lg shadow-sm">
                              <Image
                                src={product.media && product.media.length > 0 ? product.media[0].url : 'https://r5457gldorgj6mug.public.blob.vercel-storage.com/public/placeholder-Td0lfdJbjHebhgL5vOIH3UC8U6qIIB.webp'}
                                alt={product.name || ''}
                                width={100}
                                height={100}
                                style={{ objectFit: 'contain', maxHeight: '100%' }}
                                className="p-0.5"
                                priority
                              />
                            </div>
                          </Link>
                        ))}
                      </div>
                    ),
                    link: `/products?category=${category.name}`,
                    className: `${cardColor} rounded-xl px-3 pt-2 pb-3 shadow-sm`
                  };
                })
            }
          />

          {/* Categorías restantes en formato compacto */}
          <MobileRemainingCategories
            categories={categories}
            sectionProducts={sectionProducts}
            indexStart={indexStart}
            indexEnd={indexEnd}
            locale={locale}
          />
        </div>
      )}
    </div>
  );
};

/* ---------------------------------------------------------------------------
 * Categorías restantes – presentación compacta debajo del carrusel (mobile)
 * ------------------------------------------------------------------------ */
function MobileRemainingCategories({
  categories,
  sectionProducts,
  indexStart,
  indexEnd,
  locale,
}: {
  categories: ReturnType<typeof useProductsContext>['categories'];
  sectionProducts: ReturnType<typeof useProductsContext>['sectionProducts'];
  indexStart: number;
  indexEnd: number;
  locale: string;
}) {
  // Misma lógica de sorting que el carrusel para obtener las 3 restantes
  const sorted = [...categories.slice(indexStart, indexEnd)].sort((a, b) => {
    const aName = (a.name || '').toLowerCase();
    const bName = (b.name || '').toLowerCase();
    const isPrioritizedA = aName.includes('painting') || aName.includes('napkin holder');
    const isPrioritizedB = bName.includes('painting') || bName.includes('napkin holder');
    if (isPrioritizedA && !isPrioritizedB) return -1;
    if (!isPrioritizedA && isPrioritizedB) return 1;
    const aProducts = (sectionProducts.gridByCategory[a.id] || []).length;
    const bProducts = (sectionProducts.gridByCategory[b.id] || []).length;
    if (aProducts >= 4 && bProducts < 4) return -1;
    if (aProducts < 4 && bProducts >= 4) return 1;
    return bProducts - aProducts;
  });

  const remaining = sorted.slice(3); // Las 3 que no están en el carrusel

  if (remaining.length === 0) return null;

  return (
    <div className="px-4 pt-4 pb-2 space-y-3">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
        {locale === 'es' ? 'Más categorías' : 'More categories'}
      </h3>
      <div className="grid grid-cols-1 gap-2.5">
        {remaining.map((category) => {
          const categoryProducts = sectionProducts.gridByCategory[category.id] || [];
          const previews = categoryProducts.slice(0, 3);
          const categoryName = locale === 'es' ? category.name_es : (category.name_en || category.name);
          const productCount = categoryProducts.length;

          return (
            <Link
              key={category.id}
              href={`/products?category=${category.name}`}
              className="flex items-center gap-3 bg-[#1a1a1a] border border-gray-800 rounded-xl p-3 hover:border-amber-600/40 transition-all group"
            >
              {/* Thumbnails de productos */}
              <div className="flex -space-x-2 shrink-0">
                {previews.length > 0 ? (
                  previews.map((product, idx) => (
                    <div
                      key={idx}
                      className="w-12 h-12 rounded-lg bg-[#252525] border-2 border-[#1a1a1a] overflow-hidden flex items-center justify-center"
                    >
                      <Image
                        src={product.media && product.media.length > 0 ? product.media[0].url : 'https://r5457gldorgj6mug.public.blob.vercel-storage.com/public/placeholder-Td0lfdJbjHebhgL5vOIH3UC8U6qIIB.webp'}
                        alt={product.name || ''}
                        width={40}
                        height={40}
                        style={{ objectFit: 'contain' }}
                        className="p-0.5"
                      />
                    </div>
                  ))
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-[#252525] border-2 border-[#1a1a1a] flex items-center justify-center">
                    <span className="text-gray-600 text-xs">—</span>
                  </div>
                )}
              </div>

              {/* Info de la categoría */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate group-hover:text-amber-400 transition-colors">
                  {categoryName}
                </p>
                <p className="text-xs text-gray-500">
                  {productCount} {locale === 'es' ? 'productos' : 'products'}
                </p>
              </div>

              {/* Flecha */}
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-amber-400 transition-colors shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default OptimizedGridSection;
