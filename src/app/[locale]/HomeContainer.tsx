import HomePageData from './HomePageData';
import Link from "next/link";
import ScrollToTopButton from "@/components/ScrollToTopButton";

/**
 * Componente contenedor para la página de inicio
 * Implementa Suspense para mejorar la carga progresiva
 */
export default function HomeContainer({locale}: {locale: string}) {
  return (
    <div className="bg-[#121212] " role="main">
      <main className="max-w-screen-2xl mx-auto bg-[#121212]">
        
          <HomePageData locale={locale} />
 
        
        {/* Botones flotantes agrupados */}
        <div className="fixed bottom-10 right-8 z-50 flex flex-col items-end gap-2">
          <Link 
            href="/contact"
            className="bg-gold-gradient text-black font-bold px-2 py-1 rounded-full shadow-lg hover:bg-gray-950 transition hidden md:block animate-fade-in"
            aria-label="Contacto SobrePoxi"
            tabIndex={0}
          >
            {locale === 'es' ? '¿Necesitas ayuda?' : 'Need help?'}
          </Link>
          
          <ScrollToTopButton />
        </div>
      </main>
    </div>
  );
}

