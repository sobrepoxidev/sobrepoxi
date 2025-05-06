"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types-db";

type Category = Database['categories'];
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
          .limit(8);
          
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

  // Para pantallas grandes (desktop/tablet)
  const desktopCards = categories.slice(0, 8).map(category => ({
    title: category.name,
    link: `/products?category=${category.id}`,
    content: (
      <div className="flex items-center justify-center h-full">
        <img 
          src={category.image_url || '/placeholder.jpg'} 
          alt={category.name} 
          className="max-w-full max-h-full object-contain"
        />
      </div>
    ),
  }));

  // Para pantallas móviles - diseño específico con productos reales
  const mobileCards: CardData[] = [
    {
      title: 'Regalos con significado',
      content: (
        <div className="grid grid-cols-2 w-full p-1 gap-1 h-full">
          {topProducts.slice(0, 4).map((product, idx) => (
            <div key={idx} className="rounded-sm flex flex-col items-center justify-between pt-4 h-full">
              <Link href={`/product/${product.id}`} className="block">
                <Image
                  src={product.media && product.media.length > 0 ? product.media[0] : "/placeholder.jpg"}
                  alt={product.name || "Producto"}
                  width={130}
                  height={130}
                  className="object-contain"
                />
              </Link>
              <div className="flex flex-col items-end justify-end">
                <span className="text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                  {product.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      ),
      link: '/products',
    },
    {
      title: 'Envíos a toda Costa Rica',
      content: (
        <div className="grid grid-cols-1 -full p-1 gap-1 h-full">
          <div className="rounded-sm flex flex-col items-center justify-center m-5 bg-[#d7eee8] aspect-square">
            <Link href="/shipping" className="block">
              <Image
                src="/home/avion-correos.webp?v=2"
                alt="Envíos a toda Costa Rica"
                width={200}
                height={200}
                className="object-contain"
              />
            </Link>
          </div>
        </div>
      ),
      link: '/shipping',
    },
    {
      title: 'Chorreadores que valen la pena',
      content: (
        <div className="grid grid-cols-2 w-full p-1 gap-1 h-full">
          {topProducts.slice(4, 8).map((product, idx) => (
            <div key={idx} className="rounded-sm flex flex-col items-center justify-between pt-4 h-full">
              <Link href={`/product/${product.id}`} className="block">
                <Image
                  src={product.media && product.media.length > 0 ? product.media[0] : "/placeholder.jpg"}
                  alt={product.name || "Producto"}
                  width={85}
                  height={85}
                  className="object-contain"
                />
              </Link>
              <div className="flex flex-col items-end justify-end">
                <span className="text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                  {product.name}
                </span>
              </div>
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
    <>
      {/* Versión de escritorio - Muestra categorías en grid */}
      <div className="grid grid-cols-4 gap-5 mt-4 mb-4 mx-4 pb-6 max-lg:hidden">
        {desktopCards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
      
      {/* Versión móvil - Muestra diseño específico para móviles */}
      <div className="grid grid-rows-3 gap-4 mt-4 mb-4 mx-4 pb-6 lg:hidden">
        {mobileCards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </>
  );
};

export default GridSection;
