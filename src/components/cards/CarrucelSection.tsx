"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { Database } from '@/types-db';
import './carousel.css'; // Importamos los estilos para el scrollbar fino

type Product = Database['products'];
type Category = Database['categories'];

type CarrucelSectionProps = {
  title?: string;
  subtitle?: string;
  shippingOnly?: boolean;
  startIndex?: number;
  endIndex?: number;
  mobileInvertList?: boolean;
};

const CarrucelSection: React.FC<CarrucelSectionProps> = ({ 
  title = "Regalos con significado", 
  // subtitle is defined in props but not used
  shippingOnly = false,
  startIndex = 0,
  endIndex = 8,
  mobileInvertList = false
}) => {
  // Referencias para cada sección de carrusel
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const firstGroupScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  // Categories state is initialized but not used in rendering
  const [, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  // Error state is initialized but not used in rendering
  const [, setError] = useState<string | null>(null);
  
  // Estado para controlar cada carrusel por separado
  const [firstGroupCanScrollLeft, setFirstGroupCanScrollLeft] = useState(false);
  const [firstGroupCanScrollRight, setFirstGroupCanScrollRight] = useState(true);



  // Funciones para manejar el scroll y actualizar los estados para cada carrusel
  const handleMobileScroll = () => {
    if (mobileScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = mobileScrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };
  
  const handleFirstGroupScroll = () => {
    if (firstGroupScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = firstGroupScrollRef.current;
      setFirstGroupCanScrollLeft(scrollLeft > 5);
      setFirstGroupCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  // Funciones de navegación para cada carrusel
  const scrollMobileLeft = () => {
    if (mobileScrollRef.current) {
      const scrollAmount = mobileScrollRef.current.clientWidth * 0.9;
      mobileScrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollMobileRight = () => {
    if (mobileScrollRef.current) {
      const scrollAmount = mobileScrollRef.current.clientWidth * 0.9;
      mobileScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  const scrollFirstGroupLeft = () => {
    if (firstGroupScrollRef.current) {
      firstGroupScrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollFirstGroupRight = () => {
    if (firstGroupScrollRef.current) {
      firstGroupScrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };


  // Cargar datos de Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Cargar categorías
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*');

        if (categoriesError) {
          throw new Error(`Error al cargar categorías: ${categoriesError.message}`);
        }
        
        if (categoriesData) {
          setCategories(categoriesData);
        }
        
        // Cargar productos destacados o recientes
        const query = supabase
          .from('products')
          .select('*')
          .eq('is_active', true);
          
        try {
          // Primero intentamos con is_featured
          const { data: featuredData } = await query
            .eq('is_featured', true)
            .limit(20);
          // Removed unused featuredError variable
          
          if (featuredData && featuredData.length > 0) {
            // Si hay productos destacados, los usamos
            setProducts(featuredData);
          } else {
            // Si no hay productos destacados, cargamos los más recientes
            const { data: recentData, error: recentError } = await query
              .limit(20);
              
            if (recentError) {
              throw recentError;
            }
            
            if (recentData) {
              setProducts(recentData);
            }
          }
        } catch (e) {
          console.log('Error al cargar productos destacados, usando recientes', e);
          // Si hay algún error, intentamos cargar productos recientes
          const { data: fallbackData, error: fallbackError } = await query
            .limit(20);
            
          if (fallbackError) {
            throw fallbackError;
          }
          
          if (fallbackData) {
            setProducts(fallbackData);
          }
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



  // Función para generar un grupo de tarjetas de productos para desktop al estilo Amazon
  const generateProductGroup = (products: Product[], startIndex: number, endIndex: number) => {
    return products.slice(startIndex, endIndex).map((product) => {
      const imageUrl = product.media && product.media.length > 0 
        ? product.media[0].url 
        : '/placeholder-image.png';
      
      return (
        <div key={product.id} className="min-w-[180px] mx-2 flex-shrink-0">
          <Link href={`/product/${product.id}`} className="block">
            <div className="bg-white h-full relative">
              <div className="h-40 flex items-center justify-center">
                <Image
                  src={imageUrl}
                  alt={product.name || 'Producto'}
                  width={150}
                  height={150}
                  className="object-contain max-h-full"
                  unoptimized
                />
              </div>
              {/* No product name or price shown, just like Amazon's carousel */}
            </div>
          </Link>
        </div>
      );
    });
  };
  
  // Función para generar el primer grupo de productos (Regalos con significado)
  const generateDesktopGroup = (startIndex: number, endIndex: number) => {
    return generateProductGroup(products, startIndex, endIndex);
  };
  
  // Función para generar las tarjetas para mobile en formato grid 2x2
  const generateMobileGridCards = () => {
    // Dividimos los productos en dos grupos
    const firstGroup = products.slice(0, 4); // Primeros 4 productos para "Para tu Hogar"
    const secondGroup = products.slice(4, 8); // Siguientes 4 productos para "Lugares Exóticos"
    
    // Si mobileInvertList es true, invertimos el orden de los elementos
    const orderedItems = mobileInvertList ? 
      [secondGroup, firstGroup] : 
      [firstGroup, secondGroup];
    
    return [
      // Primera banda
      <div key="first-section" className="max-w-[90vw] flex-none mx-1 snap-start">
        <div className="grid grid-cols-2 gap-1">
          {orderedItems[0].map((product) => {
            const imageUrl = product.media && product.media.length > 0 
              ? product.media[0].url 
              : '/placeholder-image.png';
            
            return (
              <Link key={product.id} href={`/product/${product.id}`} className="block">
                <div className="bg-gray-200 rounded-lg shadow-sm">
                  <div className="h-[120px] flex items-center justify-center p-2">
                    <Image
                      src={imageUrl}
                      alt={product.name || 'Producto'}
                      width={100}
                      height={100}
                      className="object-contain max-h-full"
                      unoptimized
                    />
                  </div>
                  <p className="text-xs truncate px-2 pb-1">{product.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>,
      
      // Segunda banda
      <div key="second-section" className="max-w-[90vw] flex-none mx-1 snap-start">
        <div className="grid grid-cols-2 gap-2">
          {orderedItems[1].map((product) => {
            const imageUrl = product.media && product.media.length > 0 
              ? product.media[0].url 
              : '/placeholder-image.png';
            
            return (
              <Link key={product.id} href={`/product/${product.id}`} className="block">
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="h-[120px] flex items-center justify-center p-2">
                    <Image
                      src={imageUrl}
                      alt={product.name || 'Producto'}
                      width={100}
                      height={100}
                      className="object-contain max-h-full"
                      unoptimized
                    />
                  </div>
                  <p className="text-xs truncate px-2 pb-1">{product.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    ];
  };

  // Si solo queremos mostrar la sección de envíos
  if (shippingOnly) {
    return (
      <div className="min-w-[92%] flex-none snap-center mx-1 rounded-lg overflow-hidden shadow-sm bg-teal-400">
        <h3 className="text-lg font-bold p-2 pl-4 text-white">
          Envíos a toda Costa Rica
        </h3>
        <div className="bg-white p-2">
          <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-sm">
            <Link href="/shipping" className="block text-center">
              <Image
                src="/home/avion-correos.webp?v=2"
                alt="Servicio de envío"
                width={150}
                height={150}
                className="object-contain mb-2"
                unoptimized
              />
              <p className="text-gray-600 text-xs mt-2">
                *Pulsa aquí para más información
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Renderizado de carga
  if (loading && !products.length) {
    return (
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between mb-4">
            <div className="bg-gray-200 h-7 w-48 rounded animate-pulse"></div>
            <div className="flex space-x-2">
              <div className="bg-gray-200 h-8 w-8 rounded-full animate-pulse"></div>
              <div className="bg-gray-200 h-8 w-8 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="flex space-x-4 overflow-x-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="min-w-[180px] w-[180px] flex-none bg-white rounded-lg shadow-sm p-4">
                <div className="animate-pulse">
                  <div className="bg-gray-200 h-32 w-full rounded mb-3"></div>
                  <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-3 w-1/2 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Renderizado principal - Estilo Amazon
  return (
    <>
      {/* Vista mobile */}
      <section className="py-4 bg-white md:hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold">{title}</h2>
            <Link href="/products" className="text-sm text-teal-600 hover:underline hover:text-teal-700">Ver más</Link>
          </div>

          <div className="relative carousel-wrapper">
            {/* Botones de navegación dentro del carrusel */}
            <button
              onClick={scrollMobileLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-r-full shadow-md p-2"
              aria-label="Anterior"
              style={{ display: canScrollLeft ? 'block' : 'none' }}
            >
              <ChevronLeftIcon size={20} />
            </button>

            <div 
              ref={mobileScrollRef} 
              className="flex overflow-x-auto snap-x snap-mandatory carousel-scroll pb-1"
              onScroll={handleMobileScroll}
            >
              {/* Vista Mobile - Grid 2x2 con dos bandas */}
              <div className="flex">
                {generateMobileGridCards()}
              </div>
            </div>

            {canScrollRight && (
              <button
                onClick={scrollMobileRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-l-full shadow-md p-2"
                aria-label="Siguiente"
              >
                <ChevronRightIcon size={20} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Vista desktop - Primera banda: Regalos con significado */}
      <section className="py-4 bg-white hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">{title}</h2>
            <Link href="/products" className="text-sm text-teal-600 hover:underline hover:text-teal-700">Ver más</Link>
          </div>

          <div className="relative carousel-wrapper">
            {/* Botones de navegación dentro del carrusel */}
            {firstGroupCanScrollLeft && (
              <button
                onClick={scrollFirstGroupLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-r-full shadow-md p-3"
                aria-label="Anterior"
              >
                <ChevronLeftIcon size={24} />
              </button>
            )}

            <div 
              ref={firstGroupScrollRef}
              className="flex overflow-x-auto carousel-scroll py-4 px-8"
              onScroll={handleFirstGroupScroll}
            >
              {generateDesktopGroup(startIndex, endIndex)}
            </div>

            {firstGroupCanScrollRight && (
              <button
                onClick={scrollFirstGroupRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-l-full shadow-md p-3"
                aria-label="Siguiente"
              >
                <ChevronRightIcon size={24} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Vista desktop - Segunda banda: Chorreadores con estilo */}
      
    </>
  );
};

export default CarrucelSection;
