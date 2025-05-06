"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types-db";

// Type definitions with fixes for TypeScript errors
type Category = Database['categories'] & { image_url?: string }; // Add image_url property
type Product = Database['products'];

interface CardData {
  title: string;
  content: React.ReactNode;
  link: string;
}

const GridSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name');
        
        if (categoriesError) {
          throw new Error(`Error fetching categories: ${categoriesError.message}`);
        }
        
        // Fetch popular products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(16);
          
        if (productsError) {
          throw new Error(`Error fetching products: ${productsError.message}`);
        }
        
        // Set state
        setCategories(categoriesData);
        setTopProducts(productsData);
      } catch (err) {
        console.error('Error in fetchData:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Agrupar productos por categoría para mostrar múltiples productos por categoría
  const productsByCategory: Record<number, Product[]> = {};
  topProducts.forEach((product: Product) => {
    if (product.category_id) {
      if (!productsByCategory[product.category_id]) {
        productsByCategory[product.category_id] = [];
      }
      productsByCategory[product.category_id].push(product);
    }
  });

  // Para pantallas grandes (desktop/tablet) - Mostrar múltiples productos por categoría como Amazon
  const desktopCards = categories.slice(0, 8).map(category => {
    const categoryProducts = productsByCategory[category.id] || [];
    const displayProducts = categoryProducts.slice(0, 4); // Mostrar hasta 4 productos por categoría
    
    return {
      title: category.name || 'Categoría',
      link: `/products?category=${category.id}`,
      content: (
        <div className="p-3">
          {displayProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                {displayProducts.map((product: Product, idx: number) => (
                  <Link key={idx} href={`/product/${product.id}`} className="block group">
                    <div className="flex flex-col items-center bg-gray-50 rounded p-2 hover:shadow-sm transition-shadow">
                      <div className="h-[70px] flex items-center justify-center mb-1">
                        <Image
                          src={product.media && product.media.length > 0 ? 
                            (typeof product.media[0]["url"] === 'string' ? product.media[0]["url"] : '/placeholder.jpg') : 
                            '/placeholder.jpg'}
                          alt={product.name || "Producto"}
                          width={60}
                          height={60}
                          className="object-contain max-h-full group-hover:scale-105 transition-transform"
                          unoptimized
                        />
                      </div>
                      <span className="text-[10px] text-center line-clamp-1 font-medium text-gray-800">
                        {product.name}
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
                  src={typeof category.image_url === 'string' ? category.image_url : '/placeholder.jpg'} 
                  alt={category.name || 'Categoría'} 
                  width={180}
                  height={180}
                  className="max-h-full object-contain transition-transform hover:scale-105"
                  unoptimized
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

  // Para pantallas móviles - diseño específico con productos reales
  const mobileCards: CardData[] = [
    {
      title: 'Regalos con significado',
      content: (
        <div className="grid grid-cols-2 w-full gap-3 h-full">
          {topProducts.slice(0, 4).map((product: Product, idx: number) => (
            <div key={idx} className="bg-gray-50 rounded-md flex flex-col items-center justify-between p-2 h-full">
              <Link href={`/product/${product.id}`} className="block w-full text-center">
                <div className="h-24 flex items-center justify-center mb-2">
                  <Image
                    src={product.media && product.media.length > 0 ? 
                      (typeof product.media[0] === 'string' ? product.media[0] : '/placeholder.jpg') : 
                      '/placeholder.jpg'}
                    alt={product.name || "Producto"}
                    width={90}
                    height={90}
                    className="object-contain max-h-full transition-transform hover:scale-105"
                    unoptimized
                  />
                </div>
                <div className="text-center">
                  <span className="text-xs font-medium text-gray-800 line-clamp-2">
                    {product.name}
                  </span>
                  {product.price && (
                    <span className="text-xs font-bold text-teal-700 mt-1 block">
                      ₡{product.price.toLocaleString()}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      ),
      link: '/products',
    },
    {
      title: 'Envíos a toda Costa Rica',
      content: (
        <div className="p-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Opción 1: Envío estándar */}
            <Link href="/shipping" className="block group">
              <div className="flex flex-col items-center bg-[#d7eee8] rounded p-2 hover:shadow-sm transition-shadow">
                <div className="h-[70px] flex items-center justify-center mb-1">
                  <Image
                    src="/home/avion-correos.webp?v=2"
                    alt="Envío estándar"
                    width={60}
                    height={60}
                    className="object-contain max-h-full group-hover:scale-105 transition-transform"
                    unoptimized
                  />
                </div>
                <span className="text-[10px] text-center line-clamp-1 font-medium text-gray-800">
                  Envío estándar
                </span>
                <span className="text-[10px] font-bold text-teal-700 mt-0.5">
                  Desde ₡2,500
                </span>
              </div>
            </Link>
            
            {/* Opción 2: Envío express */}
            <Link href="/shipping?type=express" className="block group">
              <div className="flex flex-col items-center bg-[#d7eee8] rounded p-2 hover:shadow-sm transition-shadow">
                <div className="h-[70px] flex items-center justify-center mb-1">
                  <Image
                    src="/home/avion-correos.webp?v=2"
                    alt="Envío express"
                    width={60}
                    height={60}
                    className="object-contain max-h-full group-hover:scale-105 transition-transform"
                    unoptimized
                  />
                </div>
                <span className="text-[10px] text-center line-clamp-1 font-medium text-gray-800">
                  Envío express
                </span>
                <span className="text-[10px] font-bold text-teal-700 mt-0.5">
                  Desde ₡4,500
                </span>
              </div>
            </Link>
            
            {/* Opción 3: Recogida en tienda */}
            <Link href="/shipping?type=pickup" className="block group">
              <div className="flex flex-col items-center bg-[#d7eee8] rounded p-2 hover:shadow-sm transition-shadow">
                <div className="h-[70px] flex items-center justify-center mb-1">
                  <Image
                    src="/home/avion-correos.webp?v=2"
                    alt="Recogida en tienda"
                    width={60}
                    height={60}
                    className="object-contain max-h-full group-hover:scale-105 transition-transform"
                    unoptimized
                  />
                </div>
                <span className="text-[10px] text-center line-clamp-1 font-medium text-gray-800">
                  Recogida en tienda
                </span>
                <span className="text-[10px] font-bold text-teal-700 mt-0.5">
                  Gratis
                </span>
              </div>
            </Link>
            
            {/* Opción 4: Envío internacional */}
            <Link href="/shipping?type=international" className="block group">
              <div className="flex flex-col items-center bg-[#d7eee8] rounded p-2 hover:shadow-sm transition-shadow">
                <div className="h-[70px] flex items-center justify-center mb-1">
                  <Image
                    src="/home/avion-correos.webp?v=2"
                    alt="Envío internacional"
                    width={60}
                    height={60}
                    className="object-contain max-h-full group-hover:scale-105 transition-transform"
                    unoptimized
                  />
                </div>
                <span className="text-[10px] text-center line-clamp-1 font-medium text-gray-800">
                  Envío internacional
                </span>
                <span className="text-[10px] font-bold text-teal-700 mt-0.5">
                  Consultar
                </span>
              </div>
            </Link>
          </div>
          
          <div className="mt-3 text-xs text-teal-600 hover:underline text-center">
            <Link href="/shipping" className="inline-flex items-center">
              <span>Ver todas las opciones de envío</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      ),
      link: '/shipping',
    },
    {
      title: 'Artesanías destacadas',
      content: (
        <div className="grid grid-cols-2 w-full gap-3 h-full">
          {topProducts.slice(4, 8).map((product: Product, idx: number) => (
            <div key={idx} className="bg-gray-50 rounded-md flex flex-col items-center justify-between p-2 h-full">
              <Link href={`/product/${product.id}`} className="block w-full text-center">
                <div className="h-24 flex items-center justify-center mb-2">
                  <Image
                    src={product.media && product.media.length > 0 ? 
                      (typeof product.media[0] === 'string' ? product.media[0] : '/placeholder.jpg') : 
                      '/placeholder.jpg'}
                    alt={product.name || "Producto"}
                    width={90}
                    height={90}
                    className="object-contain max-h-full transition-transform hover:scale-105"
                    unoptimized
                  />
                </div>
                <div className="text-center">
                  <span className="text-xs font-medium text-gray-800 line-clamp-2">
                    {product.name}
                  </span>
                  {product.price && (
                    <span className="text-xs font-bold text-teal-700 mt-1 block">
                      ₡{product.price.toLocaleString()}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      ),
      link: '/products',
    }
  ];

  if (loading) {
    return (
      <>
        {/* Skeleton para desktop */}
        <div className="max-lg:hidden grid grid-cols-4 gap-5 mt-4 mb-4 mx-4 pb-6">
          {[...Array(8)].map((_, i) => (
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
        <p>Error al cargar categorías</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Categorías populares</h2>
      
      {/* Versión de escritorio - Muestra categorías en grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 max-lg:hidden">
        {desktopCards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
      
      {/* Versión móvil - Muestra diseño específico para móviles */}
      <div className="grid grid-cols-1 gap-4 mb-8 lg:hidden">
        {mobileCards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default GridSection;
