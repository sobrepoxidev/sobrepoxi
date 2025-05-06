//1import Image from "next/image";
//import Hero from "@/components/home/Hero";
//import ValueProposition from "@/components/home/ValueProposition";
//import Testimonials from "@/components/home/Testimonials";
//import PopularCategories from "@/components/home/PopularCategories";
import CallToAction from "@/components/home/CallToAction";
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
export default async function Home({ searchParams }: PageProps) {
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
    <div className="bg-gray-50 min-h-screen" role="main">
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner principal */}
        <div className="mb-4">
          <NewHome />
        </div>
        {/* Contenido principal con diseño similar a Amazon */}
        <div className="px-4 pb-8">
         
          {/* Llamada a la acción */}
          <div className="mb-8">
            <CallToAction />
          </div>
        </div>
        {/* Botones flotantes agrupados */}
        <div className="fixed bottom-12 right-8 z-50 flex flex-col items-end gap-2">
          <Link 
            href="/contact"
            className="bg-teal-600 text-white px-2 py-1 rounded-full shadow-lg hover:bg-teal-700 transition hidden md:block animate-fade-in"
            aria-label="Contacto Handmade Art"
            tabIndex={0}
          >
            ¿Necesitas ayuda?
          </Link>
          {/* Botón scroll-to-top flotante (Client Component) */}
          <ScrollToTopButton />
        </div>
      </main>
      
      <footer className="bg-white py-6 border-t border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Handmade Art. Todos los derechos reservados.</p>
          </div>
          <div className="flex gap-6">
            <Link href="/about" className="text-sm text-teal-600 hover:underline">Acerca de</Link>
            <Link href="/impact" className="text-sm text-teal-600 hover:underline">Impacto social</Link>
            <Link href="/contact" className="text-sm text-teal-600 hover:underline">Contacto</Link>
            <a href="https://instagram.com/handmadeart.cr" target="_blank" rel="noopener" aria-label="Instagram Handmade Art" className="text-teal-600 hover:underline">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block align-text-bottom"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75h-9A2.25 2.25 0 003.25 6v12a2.25 2.25 0 002.25 2.25h9A2.25 2.25 0 0018.75 18V6A2.25 2.25 0 0016.5 3.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75h.008v.008h-.008V6.75z" /></svg>
            </a>
          </div>
        </div>
      </footer>
      
      <GalleryModal initialProduct={initialProductForModal as Product} />
    </div>
  );
}
