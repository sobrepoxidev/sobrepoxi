'use client';

import React, { useEffect, useState } from 'react';
import { useSupabase } from '@/app/supabase-provider/provider';
import { useCart } from '@/context/CartContext';
import { GalleryModal } from '@/components/products/ClientComponents';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCartIcon, ShoppingBag, Leaf, HeartHandshake, Award } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ExpandButton } from '@/components/products/ClientComponents';
import { Database } from '@/types-db';
import { useSearchParams, usePathname, useRouter } from "next/navigation";

type Product = Database['products'];
interface OpenGalleryModalEventDetail {
  product: Product;
}

export default function Hero() {
  const { supabase } = useSupabase();
  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    async function fetchFeatured() {
      setLoading(true);
      // Si tienes campo "featured", añade: .eq('featured', true)
      const { data, error } = await supabase
        .from('products')
        .select('id,category,name, media, description, price, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!error && data) setProducts(data as Product[]);

      setLoading(false);
    }
    fetchFeatured();
  }, [supabase]);

  // Inicializa cantidades por producto
  useEffect(() => {
    if (products.length > 0) {
      const q: { [id: number]: number } = {};
      products.forEach((p) => (q[p.id] = 1));
      setQuantities(q);
    }
  }, [products]);

  const handleIncrement = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.min((prev[id] || 1) + 1, 10),
    }));
  };

  const handleDecrement = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, quantities[product.id] || 1);
  };

  const handleClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    params.set("idh", product.id.toString());
    const url = `${pathname}?${params.toString()}`;
    replace(url);

    // Evento custom tipado
    const event = new CustomEvent<OpenGalleryModalEventDetail>(
      "openGalleryModal",
      {
        detail: {
          product: product,
        },
      }
    );

    window.dispatchEvent(event);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/60 to-white">
      {/* Banner superior destacando misión social */}
      <div className="bg-teal-700 text-white py-2 text-center text-sm md:text-base">
        <div className="container mx-auto px-4">
          <p className="font-medium  text-xs lg:text-sm">Cada compra apoya a artesanos privados de libertad en Costa Rica 🇨🇷</p>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 pt-4 pb-4 sm:px-6 lg:px-8 lg:pt-10 lg:pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-8">
          {/* Texto principal */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center text-center lg:text-left">
            <span className="inline-block mb-4 rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-700 self-center lg:self-start">
              Arte con propósito
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-teal-800 mb-4 leading-tight">
              Artesanías únicas hechas a mano
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Descubre piezas originales creadas por artesanos locales, con materiales sostenibles y mucho amor.
            </p>

            {/* Valores del proyecto */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center lg:items-start gap-1">
                <div className="p-2 bg-teal-100 rounded-full">
                  <HeartHandshake className="h-5 w-5 text-teal-700" />
                </div>
                <h3 className="font-semibold text-teal-800">Impacto Social</h3>
                <p className="text-sm text-gray-600">Apoyando la reinserción</p>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <div className="p-2 bg-teal-100 rounded-full">
                  <Leaf className="h-5 w-5 text-teal-700" />
                </div>
                <h3 className="font-semibold text-teal-800">Sostenibilidad</h3>
                <p className="text-sm text-gray-600">Materiales ecológicos</p>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <div className="p-2 bg-teal-100 rounded-full">
                  <Award className="h-5 w-5 text-teal-700" />
                </div>
                <h3 className="font-semibold text-teal-800">Calidad</h3>
                <p className="text-sm text-gray-600">Detalles artesanales</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link 
                href="/products" 
                className="w-full sm:w-auto rounded-lg bg-teal-600 px-6 py-3 text-white shadow transition hover:bg-teal-700 flex items-center justify-center gap-2 font-medium"
              >
                <ShoppingBag className="h-5 w-5" /> Explorar productos
              </Link>

              <Link 
                href="/about" 
                className="w-full sm:w-auto rounded-lg border bg-white/90 border-teal-200 hover:bg-teal-50 px-6 py-3 text-teal-700 shadow transition font-medium"
              >
                Sobre nosotros
              </Link>
            </div>
          </div>

          {/* Carrusel de productos destacados */}
          <div className="relative w-full lg:w-7/12  flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="relative w-full max-w-lg lg:max-w-xl rounded-2xl overflow-hidden shadow-md bg-white border border-gray-200">
              {loading ? (
                <div className="h-96 flex items-center justify-center">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="rounded-lg bg-gray-200 h-48 w-48 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-48"></div>
                  </div>
                </div>
              ) : (
                <Swiper
                  modules={[Autoplay, Navigation, Pagination]}
                  autoplay={{ delay: 4500, disableOnInteraction: false }}
                  navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                  }}
                  pagination={{ 
                    clickable: true,
                    el: '.swiper-pagination-custom',
                    bulletClass: 'inline-block w-2 h-2 rounded-full bg-gray-300 mx-1 transition-all cursor-pointer',
                    bulletActiveClass: 'w-3 h-3 bg-teal-600'
                  }}
                  loop={products.length > 1}
                  className="h-full w-full"
                >
                  {products.map((product) => (
                    <SwiperSlide key={product.id}>
                      <div className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-6 py-8">
                        {/* Imagen */}
                        <div className="relative w-full md:w-56 h-66 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 transition-transform hover:scale-[1.02] cursor-pointer"
                          onClick={(e) => handleClick(e, product)}>
                          <Image
                            src={product.media?.[0]?.url || '/product-placeholder.png'}
                            alt={product.name || ''}
                            fill
                            className="object-cover"
                            loading="lazy"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
                          <div className="absolute top-2 right-2 bg-white/70 backdrop-blur-sm rounded-full p-1">
                            <ExpandButton product={product} />
                          </div>
                        </div>
                        
                        {/* Info y acciones */}
                        <div className="flex-1 flex flex-col items-center md:items-start justify-between w-full">
                          <div className="text-center md:text-left w-full">
                            <div className="bg-teal-50 text-teal-700 text-xs px-2 py-0.5 rounded-full inline-block mb-1">
                              {product.category || 'Artesanía'}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                            <div className="flex justify-center md:justify-start items-center gap-2">
                              <p className="text-teal-700 font-bold text-lg">
                                {product.price ? `₡${product.price}` : 'Consultar'}
                              </p>
                              {/* Etiqueta de "Hecho a mano" */}
                              <span className="bg-amber-50 text-amber-700 text-xs px-2 py-0.5 rounded-full border border-amber-200">
                                Hecho a mano
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-4 w-full">
                            <div className="flex items-center border rounded-lg overflow-hidden shadow-sm bg-white">
                              <button
                                className="px-3 hover:bg-gray-100 text-gray-700 transition-colors duration-200 h-10"
                                aria-label="Disminuir cantidad"
                                onClick={() => handleDecrement(product.id)}
                              >
                                −
                              </button>
                              <div className="flex items-center justify-center w-10 h-10 text-sm font-semibold text-gray-700">
                                {quantities[product.id] || 1}
                              </div>
                              <button
                                className="px-3 hover:bg-gray-100 text-gray-700 transition-colors duration-200 h-10"
                                aria-label="Aumentar cantidad"
                                onClick={() => handleIncrement(product.id)}
                              >
                                +
                              </button>
                            </div>
                            <button
                              className="flex-1 flex gap-2 items-center justify-center rounded-lg py-2.5 px-4 text-white bg-teal-600 hover:bg-teal-700 transition-colors duration-200 text-sm font-medium shadow-sm"
                              onClick={() => handleAddToCart(product)}
                              aria-label="Añadir al carrito"
                            >
                              <ShoppingCartIcon className="h-4 w-4" /> Añadir al carrito
                            </button>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
              
              {/* Navegación personalizada del swiper */}
              <div className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm z-10 cursor-pointer hover:bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-700">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </div>
              <div className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm z-10 cursor-pointer hover:bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-700">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
              
              {/* Paginación personalizada */}
              <div className="swiper-pagination-custom flex justify-center items-center py-3"></div>
            </div>
          </div>
        </div>
        
        {/* Banda informativa sobre impacto social */}
        <div className="mt-12 py-4 px-6 bg-teal-700/10 rounded-xl border border-teal-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-semibold text-teal-700 mb-1">Apoyando la reinserción social</h3>
              <p className="text-gray-700">Cada artesanía es creada por personas privadas de libertad en Costa Rica como parte de su proceso de rehabilitación.</p>
            </div>
            <Link 
              href="/impact" 
              className="whitespace-nowrap px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition shadow-sm text-sm font-medium"
            >
              Conoce nuestro impacto
            </Link>
          </div>
        </div>
      </div>
      
      {/* Modal de producto a pantalla completa */}
      <GalleryModal from="hero" />
    </section>
  );
}