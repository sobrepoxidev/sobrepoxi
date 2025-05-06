"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { Database } from '@/types-db';

type Product = Database['products'];
type Category = Database['categories'];

type CarrucelSectionProps = {
  title?: string;
  subtitle?: string;
  shippingOnly?: boolean;
};

const CarrucelSection: React.FC<CarrucelSectionProps> = ({ 
  title = "Productos destacados", 
  subtitle = "Navega con las flechas",
  shippingOnly = false
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Función para manejar el scroll y actualizar los estados
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  // Funciones de navegación
  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = isMobile ? scrollRef.current.clientWidth * 0.93 : 300;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = isMobile ? scrollRef.current.clientWidth * 0.93 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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
        let query = supabase
          .from('products')
          .select('*')
          .eq('is_active', true);
          
        try {
          // Primero intentamos con is_featured
          const { data: featuredData, error: featuredError } = await query
            .eq('is_featured', true)
            .limit(16);
          
          if (featuredData && featuredData.length > 0) {
            // Si hay productos destacados, los usamos
            setProducts(featuredData);
          } else {
            // Si no hay productos destacados, cargamos los más recientes
            const { data: recentData, error: recentError } = await query
              .limit(16);
              
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
            .limit(16);
            
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

  // Función para calcular el precio final
  const calculateFinalPrice = (product: Product) => {
    const regularPrice = Number(product.price || 0);
    const discountPercentage = product.discount_percentage || 0;
    
    if (discountPercentage > 0) {
      // Calcular precio con descuento
      return regularPrice * (1 - discountPercentage / 100);
    }
    
    return regularPrice;
  };

  // Función para generar un grupo de tarjetas de productos para desktop
  const generateProductGroup = (products: Product[], startIndex: number, endIndex: number) => {
    return products.slice(startIndex, endIndex).map((product) => {
      const finalPrice = calculateFinalPrice(product);
      const imageUrl = product.media && product.media.length > 0 
        ? product.media[0].url 
        : '/placeholder-image.png';
      
      return (
        <div key={product.id} className="min-w-[180px] mx-2 flex-shrink-0">
          <Link href={`/product/${product.id}`} className="block text-center">
            <div className="bg-white border border-gray-100 rounded-lg p-3 h-full hover:shadow-md transition-shadow">
              <div className="h-32 flex items-center justify-center mb-2">
                <Image
                  src={imageUrl}
                  alt={product.name || 'Producto'}
                  width={100}
                  height={100}
                  className="object-contain max-h-full"
                  unoptimized
                />
              </div>
              <h3 className="text-sm font-medium line-clamp-2 h-10">{product.name}</h3>
              <span className="text-xs font-bold text-teal-700 mt-1 block">
                ₡{finalPrice.toLocaleString()}
              </span>
            </div>
          </Link>
        </div>
      );
    });
  };
  
  // Función para generar el primer grupo de productos (Regalos con significado)
  const generateDesktopFirstGroup = () => {
    return generateProductGroup(products, 0, 4);
  };
  
  // Función para generar el segundo grupo de productos (Chorreadores)
  const generateDesktopSecondGroup = () => {
    return generateProductGroup(products, 4, 8);
  };

  // Función para generar las tarjetas para mobile
  const generateMobileProductCards = () => {
    // Dividir productos en grupos de 4 para mostrar 2x2 en cada tarjeta
    const productGroup1 = products.slice(0, 4);
    const productGroup2 = products.slice(4, 8);
    
    return [
      // Primera tarjeta - Regalos con significado
      <div key="mobile-products-1" className="min-w-[92%] flex-none snap-center mx-1 rounded-lg overflow-hidden shadow-sm bg-indigo-400">
        <h3 className="text-lg font-bold p-2 pl-4 text-white">
          Regalos con significado
        </h3>
        <div className="bg-white p-2">
          <div className="grid grid-cols-2 gap-2">
            {productGroup1.map((product) => {
              const imageUrl = product.media && product.media.length > 0 
                ? product.media[0].url 
                : '/placeholder-image.png';
              return (
                <div key={product.id} className="bg-gray-50 rounded-sm p-2">
                  <Link href={`/product/${product.id}`} className="block text-center">
                    <div className="h-24 flex items-center justify-center mb-1">
                      <Image
                        src={imageUrl}
                        alt={product.name || 'Producto'}
                        width={70}
                        height={70}
                        className="object-contain max-h-full"
                        unoptimized
                      />
                    </div>
                    <span className="text-xs font-medium text-center block line-clamp-1">
                      {product.name}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>,
      
      // Segunda tarjeta - Envíos a toda Costa Rica (siempre estática)
      <div key="mobile-shipping" className="min-w-[92%] flex-none snap-center mx-1 rounded-lg overflow-hidden shadow-sm bg-teal-400">
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
      </div>,
      
      // Tercera tarjeta - Chorreadores con estilo
      <div key="mobile-products-2" className="min-w-[92%] flex-none snap-center mx-1 rounded-lg overflow-hidden shadow-sm bg-indigo-400">
        <h3 className="text-lg font-bold p-2 pl-4 text-white">
          Chorreadores con estilo
        </h3>
        <div className="bg-white p-2">
          <div className="grid grid-cols-2 gap-2">
            {productGroup2.map((product) => {
              const imageUrl = product.media && product.media.length > 0 
                ? product.media[0].url 
                : '/placeholder-image.png';
              return (
                <div key={product.id} className="bg-gray-50 rounded-sm p-2">
                  <Link href={`/product/${product.id}`} className="block text-center">
                    <div className="h-24 flex items-center justify-center mb-1">
                      <Image
                        src={imageUrl}
                        alt={product.name || 'Producto'}
                        width={70}
                        height={70}
                        className="object-contain max-h-full"
                        unoptimized
                      />
                    </div>
                    <span className="text-xs font-medium text-center block line-clamp-1">
                      {product.name}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
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

  // Renderizado principal
  return (
    <>
      {/* Vista mobile */}
      <section className="py-6 bg-white md:hidden ">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <div className="flex space-x-2">
              <button
                onClick={scrollLeft}
                className={`p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-all ${
                  !canScrollLeft && 'opacity-50 cursor-not-allowed'
                }`}
                disabled={!canScrollLeft}
                aria-label="Anterior"
              >
                <ChevronLeftIcon size={20} />
              </button>
              <button
                onClick={scrollRight}
                className={`p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-all ${
                  !canScrollRight && 'opacity-50 cursor-not-allowed'
                }`}
                disabled={!canScrollRight}
                aria-label="Siguiente"
              >
                <ChevronRightIcon size={20} />
              </button>
            </div>
          </div>

          <div 
            ref={scrollRef} 
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={handleScroll}
          >
            {/* Vista Mobile - Estilo Carousel con peek */}
            <div className="flex">
              {generateMobileProductCards()}
            </div>
          </div>
        </div>
      </section>

      {/* Vista desktop - Primera banda: Regalos con significado */}
      <section className="py-6 bg-white hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Regalos con significado</h2>
            <div className="flex space-x-2">
              <button
                onClick={scrollLeft}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-all"
                aria-label="Anterior"
              >
                <ChevronLeftIcon size={20} />
              </button>
              <button
                onClick={scrollRight}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-all"
                aria-label="Siguiente"
              >
                <ChevronRightIcon size={20} />
              </button>
            </div>
          </div>

          <div className="flex overflow-x-auto scrollbar-hide pb-4">
            {generateDesktopFirstGroup()}
          </div>
        </div>
      </section>

      {/* Vista desktop - Segunda banda: Chorreadores con estilo */}
      <section className="py-6 bg-white hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Chorreadores con estilo</h2>
            <div className="flex space-x-2">
              <button
                onClick={scrollLeft}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-all"
                aria-label="Anterior"
              >
                <ChevronLeftIcon size={20} />
              </button>
              <button
                onClick={scrollRight}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-all"
                aria-label="Siguiente"
              >
                <ChevronRightIcon size={20} />
              </button>
            </div>
          </div>

          <div className="flex overflow-x-auto scrollbar-hide pb-4">
            {generateDesktopSecondGroup()}
          </div>
        </div>
      </section>
    </>
  );
};

export default CarrucelSection;
