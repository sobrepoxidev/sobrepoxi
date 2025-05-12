//1import Image from "next/image";
//import Hero from "@/components/home/Hero";
//import ValueProposition from "@/components/home/ValueProposition";
//import Testimonials from "@/components/home/Testimonials";
import NewHome from "@/components/home/New";
import { GalleryModal } from "@/components/products/ClientComponents";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from "@/types-db";
import React from "react"; // Import React
import Link from "next/link";
import ScrollToTopButton from "@/components/ScrollToTopButton";
type Product = Database['products'];
type searchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface PageProps {
  searchParams: searchParams;
}
export default async function Home({ searchParams}: PageProps) {
  // Usa el cliente server-side de Supabase
  const supabase = createServerComponentClient<Database>({ cookies });
  let initialProductForModal: Product | null = null; // Variable para el producto inicial
 
  // Obtención robusta de parámetros de búsqueda
  const params = typeof searchParams === 'object' && 'then' in searchParams
    ? await searchParams
    : (searchParams as Record<string, string | string[] | undefined>);
  const idCardOpen = params?.['id'];

  if (idCardOpen && typeof idCardOpen === 'string') {
    console.log(`Buscando ID ${idCardOpen} para modal inicial.`);
   
    // 2. Si no está en la página actual, BUSCAR en la BD
    console.log(`Producto ${idCardOpen} no encontrado en página actual. Realizando fetch específico.`);
    const { data: modalProductData, error: modalProductError } = await supabase
      .from("products")
      .select('*') // O los campos necesarios para el modal
      .eq('id', idCardOpen)
      .maybeSingle();
 
    if (modalProductError) {
      console.error("Error buscando el producto específico para el modal:", modalProductError.message);
    } else if (modalProductData) {
      console.log("Producto específico encontrado en la BD:", modalProductData);
      initialProductForModal = modalProductData as Product;
    } else {
      console.log(`Producto con ID ${idCardOpen} no encontrado en la BD.`);
    }
  }

  return (
    <>
      {/* Contenido principal */}
      <div className="min-h-screen w-full overflow-x-hidden bg-amber-400" role="main">
        <NewHome />
        
        {/* Botones flotantes agrupados */}
        <div className="fixed bottom-10 right-8 z-50 flex flex-col items-end gap-2">
          <Link 
            href="/contact"
            className="bg-teal-600 text-white px-2 py-1 rounded-full shadow-lg hover:bg-teal-700 transition hidden md:block animate-fade-in"
            aria-label="Contacto Handmade Art"
            tabIndex={0}
          >
            ¿Necesitas ayuda?
          </Link>
          
          <ScrollToTopButton />
        </div>
      </div>
      
      {/* Modal del producto */}
      <GalleryModal initialProduct={initialProductForModal as Product} />
    </>
  );
}
