"use client";
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { Database } from '@/types-db';

type Product = Database['products'];
type Category = Database['categories'];

interface CarrucelSectionProps {
  title?: string;
  subtitle?: string;
}

const CarrucelSection: React.FC<CarrucelSectionProps> = ({ 
  title = "Productos destacados", 
  subtitle = "Navega con las flechas" 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para manejar el scroll y actualizar los estados
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  // Función para desplazar el carrusel
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    const newScrollPosition = direction === 'left'
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
  };

  // Función para obtener el nombre de la categoría
  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  };

  // Efecto para cargar los datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*');

        if (categoriesError) {
          throw new Error(`Error al cargar categorías: ${categoriesError.message}`);
        }
        
        if (categoriesData) {
          setCategories(categoriesData);
        }
        
        // Fetch featured products - Usar is_featured si existe en la tabla
        let query = supabase
          .from('products')
          .select(`
            id,
            name,
            price,
            discount_percentage,
            media,
            category_id
          `)
          .order('created_at', { ascending: false });
        
        // Intentar filtrar por productos destacados si existe la columna
        let productsData;
        let productsError;
        
        try {
          // Primero intentamos con is_featured
          const { data: featuredData, error: featuredError } = await query.eq('is_featured', true).limit(16);
          
          if (featuredData && featuredData.length > 0) {
            // Si encontramos productos destacados, usamos esos
            productsData = featuredData;
            productsError = featuredError;
          } else {
            // Si no hay productos destacados, usamos los más recientes
            const recentResult = await query.limit(16);
            productsData = recentResult.data;
            productsError = recentResult.error;
          }
        } catch (e) {
          console.log('No existe columna is_featured, usando productos recientes');
          // Si falla la consulta con is_featured, usamos los más recientes
          const recentResult = await query.limit(16);
          productsData = recentResult.data;
          productsError = recentResult.error;
        }

        if (productsError) {
          throw new Error(`Error al cargar productos: ${productsError.message}`);
        }

        if (productsData) {
          setProducts(productsData);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error en fetchData:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Función para generar las tarjetas de productos
  const generateProductCards = () => {
    return products.map((product) => {
      // Calcular precio con descuento si existe
      const finalPrice = product.discount_percentage 
        ? Math.round(product.price * (1 - product.discount_percentage / 100)) 
        : product.price;
      
      // Obtener la primera imagen del producto
      const firstImage = product.media && product.media.length > 0 
        ? product.media[0] 
        : '/placeholder.jpg';

      return (
        <div key={product.id} className="min-w-[180px] w-[180px] flex-none snap-start mx-2">
          <div className="bg-white rounded-lg overflow-hidden h-full shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 flex flex-col h-full">
              <Link href={`/product/${product.id}`} className="group">
                <div className="relative w-full h-[180px] mb-3 flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded">
                    <Image 
                      src={firstImage}
                      alt={product.name || 'Producto'}
                      width={150}
                      height={150}
                      className="object-contain max-h-[150px] group-hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
                <h3 className="text-sm font-medium line-clamp-2 mb-1 group-hover:text-teal-600 transition-colors">
                  {product.name}
                </h3>
              </Link>
              
              <div className="mt-auto pt-2">
                {product.discount_percentage ? (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 line-through text-xs">₡{product.price.toLocaleString()}</span>
                    <span className="bg-red-100 text-red-700 text-xs px-1 rounded">
                      {Math.round(product.discount_percentage)}% OFF
                    </span>
                  </div>
                ) : null}
                
                <div className="font-semibold mt-1 text-md">₡{finalPrice.toLocaleString()}</div>
                
                {/* Categoría del producto */}
                {product.category_id && (
                  <div className="mt-1.5 text-xs text-gray-500">
                    {getCategoryName(product.category_id)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  // Renderizado de carga
  if (loading && !products.length) {
    return (
      <div className="mb-8 py-2">
        <div className="px-4 mb-4">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-8 w-48 mb-4 rounded"></div>
            <div className="bg-gray-200 h-4 w-32 rounded"></div>
          </div>
        </div>
        
        <div className="flex space-x-4 px-4 overflow-x-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="min-w-[180px] w-[180px] flex-none bg-white rounded-lg shadow-sm p-4">
              <div className="animate-pulse">
                <div className="bg-gray-200 h-[180px] w-full rounded mb-3"></div>
                <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 w-1/2 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 w-1/4 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Renderizado de error
  if (error) {
    return (
      <div className="mb-8 py-2 px-4">
        <div className="bg-red-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 mb-2">{title}</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // Renderizado sin productos
  if (!products || products.length === 0) {
    return (
      <div className="mb-8 py-2">
        <h2 className="text-xl font-bold px-4 mb-4">{title}</h2>
        <div className="bg-gray-50 p-8 rounded-lg mx-4 text-center">
          <p className="text-gray-500">No hay productos destacados disponibles</p>
        </div>
      </div>
    );
  }

  // Renderizado principal
  return (
    <div className="mb-8 py-2">
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-1 rounded-full ${canScrollLeft ? 'bg-teal-500 text-white hover:bg-teal-600' : 'bg-gray-200 text-gray-400'} transition-colors`}
            aria-label="Desplazar a la izquierda"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-1 rounded-full ${canScrollRight ? 'bg-teal-500 text-white hover:bg-teal-600' : 'bg-gray-200 text-gray-400'} transition-colors`}
            aria-label="Desplazar a la derecha"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="relative">
        {/* Degradado izquierdo */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        )}
        
        {/* Carrusel de productos */}
        <div 
          ref={scrollRef} 
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 px-4" 
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {generateProductCards()}
        </div>
        
        {/* Degradado derecho */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        )}
      </div>
      
      {/* Ver todos los productos */}
      <div className="text-center mt-6 mb-4">
        <Link 
          href="/products" 
          className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium transition-colors border-b border-transparent hover:border-teal-800 pb-0.5"
        >
          <span>Ver todos los productos</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CarrucelSection;
