//1import Image from "next/image";
//import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
//import ValueProposition from "@/components/home/ValueProposition";
//import Testimonials from "@/components/home/Testimonials";
//import PopularCategories from "@/components/home/PopularCategories";
import CallToAction from "@/components/home/CallToAction";
import NewHome from "@/components/home/New";
import { GalleryModal } from "@/components/products/ClientComponents";
import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types-db";
type Product = Database['products'];
type searchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface PageProps {
  searchParams: searchParams;
}
export default async function Home({ searchParams }: PageProps) {
  let initialProductForModal: Product | null = null; // Variable para el producto inicial
 
  const idCardOpen = (await searchParams)['id'];
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
    <div>
      <main>

        <NewHome  />
        <FeaturedProducts />
        {/* <ValueProposition /> */}
        {/* <Testimonials /> */}
        {/* <PopularCategories /> */}
        <CallToAction />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
         
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          
          Go to nextjs.org →
        </a> */}
      </footer>
      <GalleryModal initialProduct={initialProductForModal as Product} />
    </div>
  );
}
