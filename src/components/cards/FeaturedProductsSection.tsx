'use client';

import React, { useMemo } from 'react';
import { useProductsContext } from '@/context/ProductsContext';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedProductsSectionProps {
  /** Número máximo de productos a mostrar */
  maxProducts?: number;
}

/**
 * Componente para mostrar productos destacados en un formato más visual y amplio
 * - Ocupa más espacio vertical que otros componentes
 * - Muestra productos en un grid 2x2 en móvil y 3x2 en desktop
 * - Prioriza productos que no se muestran en otros componentes
 */
const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  maxProducts = 6
}) => {
  const locale = useLocale();
  const { products, categories, productsByCategory = {} } = useProductsContext();
  
  // Título según el idioma
  const title = useMemo(() => {
    return locale === 'es' ? 'Productos Destacados' : 'Featured Products';
  }, [locale]);

  // Selección inteligente de productos para evitar duplicados con otros componentes
  const featuredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    console.log(`FeaturedProductsSection: Buscando ${maxProducts} productos para mostrar`);
    console.log(`FeaturedProductsSection: Total de productos disponibles: ${products.length}`);
    
    
    // Obtenemos los productos que ya se muestran en el OptimizedGridSection
    // para evitar duplicarlos
    const productsInMainGrid: Record<string, boolean> = {};
    
    // Recorremos las categorías para obtener los productos ya mostrados
    Object.entries(productsByCategory || {}).forEach(([, categoryProducts]) => {
      // Aseguramos que categoryProducts sea un array antes de usar slice
      if (Array.isArray(categoryProducts)) {
        categoryProducts.slice(0, 4).forEach((product) => {
          if (product && product.id) productsInMainGrid[product.id] = true;
        });
      }
    });
    
    // Evitar específicamente productos de "Kitchen Sets" que aparecen duplicados
    const kitchenCategoryIds = categories
      .filter(cat => cat.name?.toLowerCase().includes('kitchen'))
      .map(cat => cat.id);
    
    console.log(`FeaturedProductsSection: Categorías de cocina a evitar: ${kitchenCategoryIds.join(', ')}`);
    
    // ESTRATEGIA 1: Intentar obtener productos destacados que no estén ya mostrados en otros componentes
    let selectedProducts = products.filter(product => 
      product.is_featured && 
      product.media && 
      product.media.length > 0 &&
      !productsInMainGrid[product.id] && // No mostrar productos que ya están en el grid principal
      // Evitar específicamente productos de "Kitchen Sets"
      !(product.category_id && kitchenCategoryIds.includes(product.category_id))
    );
    
    console.log(`FeaturedProductsSection: Productos destacados encontrados: ${selectedProducts.length}`);

    // ESTRATEGIA 2: Si no hay suficientes productos destacados, buscamos productos adicionales
    if (selectedProducts.length < maxProducts) {
      // Filtrar por productos que no estén ya seleccionados y que no estén en el grid principal
      const additionalProducts = products
        .filter(p => 
          p.media && 
          p.media.length > 0 && 
          !selectedProducts.some(sp => sp.id === p.id) &&
          !productsInMainGrid[p.id] &&
          // Evitar específicamente productos de "Kitchen Sets"
          !(p.category_id && kitchenCategoryIds.includes(p.category_id))
        )
        // Priorizar productos con precios más altos
        .sort((a, b) => {
          const priceA = a.price || 0;
          const priceB = b.price || 0;
          return priceB - priceA;
        })
        .slice(0, maxProducts - selectedProducts.length);

      console.log(`FeaturedProductsSection: Productos adicionales encontrados: ${additionalProducts.length}`);
      selectedProducts = [...selectedProducts, ...additionalProducts];
    }
    
    // ESTRATEGIA 3: Si aún no tenemos suficientes productos, incluir algunos de Kitchen Sets
    if (selectedProducts.length < maxProducts) {
      console.log(`FeaturedProductsSection: Aún faltan productos, intentando incluir algunos de Kitchen Sets`);
      
      const kitchenProducts = products.filter(p => 
        p.media && 
        p.media.length > 0 && 
        !selectedProducts.some(sp => sp.id === p.id) &&
        !productsInMainGrid[p.id] &&
        p.category_id && kitchenCategoryIds.includes(p.category_id)
      )
      .sort((a, b) => {
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        return priceB - priceA;
      })
      .slice(0, maxProducts - selectedProducts.length);
      
      console.log(`FeaturedProductsSection: Productos de cocina añadidos: ${kitchenProducts.length}`);
      selectedProducts = [...selectedProducts, ...kitchenProducts];
    }
    
    // ESTRATEGIA 4: Si todavía no tenemos suficientes, incluir cualquier producto con imagen
    if (selectedProducts.length < maxProducts) {
      console.log(`FeaturedProductsSection: Último intento, buscando cualquier producto con imagen`);
      
      const anyProducts = products.filter(p => 
        p.media && 
        p.media.length > 0 && 
        !selectedProducts.some(sp => sp.id === p.id)
      )
      .slice(0, maxProducts - selectedProducts.length);
      
      console.log(`FeaturedProductsSection: Productos adicionales finales: ${anyProducts.length}`);
      selectedProducts = [...selectedProducts, ...anyProducts];
    }
    
    // Limitamos al número máximo especificado
    const finalProducts = selectedProducts.slice(0, maxProducts);
    console.log(`FeaturedProductsSection: Total de productos seleccionados: ${finalProducts.length}`);
    
    return finalProducts;
  }, [categories, products, maxProducts]);

  return (
    <section className="my-8 ">
      <div className="w-full px-4  mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 border-l-4 border-teal-500 pl-3">
            {title}
          </h2>
          <Link href="/products" className="text-teal-600 hover:text-teal-700 text-sm px-1 font-medium flex items-center">
            {locale === 'es' ? 'Ver todos' : 'View all'}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {featuredProducts.map((product, index) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col">
                  {/* Sección superior con imagen - más grande que en otros componentes */}
                  <div className="relative bg-gray-50 aspect-square">
                    <Image 
                      src={product.media && product.media.length > 0 ? product.media[0].url : '/placeholder.jpg'}
                      alt={(locale === 'es' ? product.name_es : product.name_en) || product.name || "Producto"}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      priority={index < 2}
                    />
                    
                    {/* Insignia de destacado si corresponde */}
                    {product.is_featured && (
                      <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded-md">
                        {locale === 'es' ? 'Destacado' : 'Featured'}
                      </div>
                    )}
                    
                    {/* Precio flotante */}
                    {product.price && (
                      <div className="absolute bottom-2 right-2 bg-teal-500 text-white text-sm font-bold px-3 py-1 rounded-md">
                        ₡{product.price.toLocaleString()}
                      </div>
                    )}
                  </div>
                  
                  {/* Información del producto */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-gray-800 font-medium text-md mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
                      {locale === 'es' ? product.name_es : product.name_en || product.name}
                    </h3>
                    
                    {/* Categoría */}
                    {product.category_id && (
                      <div className="mt-auto">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {categories.find(c => c.id === product.category_id)?.name || ''}
                        </span>
                      </div>
                    )}
                    
                    {/* Botón de ver detalles */}
                    <div className="mt-3 text-teal-600 text-sm font-medium flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      {locale === 'es' ? 'Ver detalles' : 'View details'}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full text-center py-10 text-gray-500 bg-gray-50 rounded-lg">
            {locale === 'es' ? 'No hay productos destacados disponibles.' : 'No featured products available.'}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
