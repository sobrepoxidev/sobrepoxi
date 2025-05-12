//1import Image from "next/image";
//import Hero from "@/components/home/Hero";
//import ValueProposition from "@/components/home/ValueProposition";
//import Testimonials from "@/components/home/Testimonials";
import NewHome from "@/components/home/New";
import React from "react"; // Import React
import Link from "next/link";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default async function Home() {
  
  return (
    <div className="bg-gray-50 min-h-screen" role="main">
      <main className="max-w-screen-2xl mx-auto">
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
      </main>
      
    </div>
  );
}
