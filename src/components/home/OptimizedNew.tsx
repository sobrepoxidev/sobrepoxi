import React from 'react';
import Image from 'next/image';
import { Carousel, BannerTemplate } from "@/components/home/Banner";
import { ProductsProvider } from '@/components/providers/ProductsProvider';
import OptimizedGridSection from '@/components/cards/OptimizedGridSection';
// import FeaturedProductsSection from '../cards/FeaturedProductsSection';
// import GiftsCarouselSection from '@/components/cards/GiftsCarouselSection';
import type { Database } from '@/types-db';
import { Link } from '@/i18n/navigation';
import ProductCategoriesBanner from './ProductCategoriesBanner';
// Tipos para los datos pre-cargados desde el servidor
type Product = Database['products'];
type Category = Database['categories'];

/**
 * Componente principal de la página de inicio optimizado
 * - Utiliza un proveedor centralizado para los datos
 * - Aprovecha los datos pre-cargados desde el servidor
 * - Evita solicitudes duplicadas a Supabase
 * - Optimiza la carga de imágenes
 */
interface OptimizedNewHomeProps {
  initialCategories?: Category[];
  initialProducts?: Product[];
  locale?: string;
}


function OptimizedNewHomeContent({ locale }: { locale?: string }) {
  
  return (
    <div className="max-w-[1500px] mx-auto relative z-0 bg-gradient-to-br from-[#363636] via-[#121212] to-[#363636]
       hover:bg-[length:200%_100%] hover:bg-right
       transition-[background-size,background-position] duration-300">
        
        <Carousel>
          {/* 1️⃣ BANNER PRINCIPAL — Pisos Epóxicos Industriales (Objetivo principal SEO) */}
          <BannerTemplate linkHref="/industrial-epoxy-flooring">
            <div className="relative grid grid-cols-1 md:grid-cols-2 sm:items-center sm:justify-between py-0.5  md:px-30 sm:py-6  h-full ">
              {/* Columna 1 — texto */}
              <div className="max-w-[100%] sm:text-start text-center justify-start md:text-left  px-2">
                <h1 className="text-lg sm:text-3xl font-extrabold tracking-wide gold-gradient-bright drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)] leading-[1.2]">
                  {locale === 'es'
                    ? 'PISOS EPÓXICOS INDUSTRIALES COSTA RICA'
                    : 'INDUSTRIAL EPOXY FLOORING COSTA RICA'}
                </h1>
                <p className="mt-0.5 sm:mt-2 text-start text-[0.60rem] sm:text-base text-white indent-2">
                  {locale === 'es'
                    ? 'Líderes en pisos de alto rendimiento para ambientes industriales exigentes'
                    : 'Leaders in high-performance flooring for demanding industrial environments'}
                </p>
                <p className="mt-0 sm:mt-1 text-start text-[0.65rem] sm:text-sm text-gray-300 indent-2">
                  {locale === 'es'
                    ? 'Habla ahora con nuestro equipo por WhatsApp'
                    : 'Chat with our team on WhatsApp'}
                </p>

                <Link
                  href="https://wa.me/+50685850000?text=Hola%20SobrePoxi%2C%20quiero%20informaci%C3%B3n%20sobre%20un%20proyecto%20a%20medida"
                  target="_blank"
                  className="mt-0.5 sm:mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-1.5 sm:px-4 py-1 sm:py-1.5 shadow-sm sm:shadow-lg transition-all max-sm:text-xs"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                  </svg>
                  {locale === 'es'
                    ? 'WhatsApp 8585-0000'
                    : 'WhatsApp +506 8585-0000'}
                </Link>
              </div>

              {/* Columna 2 — imagen */}
              <div className="relative w-full max-w-[70%] mx-auto aspect-[3/1] overflow-hidden shadow-lg rounded-xs max-sm:hidden">
                <Image
                  src="/home/industrial-floor.webp"
                  alt={locale === 'es' 
                    ? "Piso epóxico industrial de alto rendimiento SobrePoxi Costa Rica" 
                    : "High-performance industrial epoxy floor SobrePoxi Costa Rica"}
                  fill
                  sizes="(max-width: 1024px) 150vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </div>
          </BannerTemplate>

          {/* 2️⃣ BANNER — Pisos Epóxicos de Lujo/Diseño (Comercial integrado) */}
          <BannerTemplate linkHref="/luxury-design-flooring">
            <div className="relative flex flex-col items-center justify-start text-center px-3 sm:px-6 py-0.5 sm:py-6 h-[100%]">
              <h3 className="text-xs sm:text-2xl font-light text-white">
                {locale === 'es' ? 'Pisos Epóxicos de Lujo' : 'Luxury Epoxy Floors'}
              </h3>
              <h2 className="text-[1.03rem] sm:text-3xl font-extrabold tracking-wide gold-gradient-bright drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)] mt-0 py-0 sm:mt-1">
                {locale === 'es' ? 'DISEÑO 3D • COMERCIAL • RESIDENCIAL' : '3D DESIGN • COMMERCIAL • RESIDENTIAL'}
              </h2>
              <p className="mt-0 py-0 text-[0.65rem] sm:text-base text-white max-w-lg">
                {locale === 'es'
                  ? 'Efectos únicos: espejo, mármol, madera, vinilo. Para oficinas, comercios y hogares exclusivos'
                  : 'Unique effects: mirror, marble, wood, vinyl. For offices, retail spaces and exclusive homes'}
              </p>

              <Link href="/luxury-design-flooring" className="mt-2 sm:mt-3 bg-white/90 hover:bg-white text-black text-xs sm:text-sm font-semibold px-2 sm:px-4 py-0.5 sm:py-1.5 rounded-full transition-all">
                {locale === 'es' ? 'Ver galería de diseños' : 'View design gallery'}
              </Link>
            </div>
          </BannerTemplate>

          {/* 3️⃣ BANNER — Muebles de Lujo (Diseños Personalizados) */}
          <BannerTemplate linkHref="/luxury-furniture">
            <div className="relative flex flex-col items-center justify-start text-center px-2 sm:px-6 py-0 sm:py-6">
              <h3 className="text-xs sm:text-xl font-light text-white">
                {locale === 'es' ? 'Muebles de Lujo' : 'Luxury Furniture'}
              </h3>
              <h2 className="text-[1.4rem] sm:text-3xl font-extrabold tracking-wide gold-gradient-bright drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
                {locale === 'es' ? 'DISEÑOS PERSONALIZADOS' : 'CUSTOM DESIGNS'}
              </h2>
              <p className="mt-0.5 text-xs sm:text-base text-white">
                {locale === 'es'
                  ? 'Mesas, barras, escritorios y muebles únicos. Madera + resina a medida'
                  : 'Tables, bars, desks and unique furniture. Custom wood + resin designs'}
              </p>

              <Link href="/luxury-furniture" className="mt-0.5 sm:mt-3 bg-white/90 hover:bg-white text-black text-sm font-semibold px-2 sm:px-4 py-0.5 sm:py-1.5 rounded-full transition-all ">
                {locale === 'es' ? 'Crear tu mueble' : 'Design your furniture'}
              </Link>
            </div>
          </BannerTemplate>
        </Carousel>


        {/* Secciones de productos optimizadas */}
        <OptimizedGridSection />
        <ProductCategoriesBanner locale={locale || 'es'} />

        {/* <GiftsCarouselSection />
     
        <FeaturedProductsSection maxProducts={9} /> */}



        {/* <SecondaryGridSection />
        
        <DetailsCarouselSection /> */}
    </div>
  );
}

export default function OptimizedNewHome({
  initialCategories = [],
  initialProducts = [],
  locale
}: OptimizedNewHomeProps) {
  return (
    <ProductsProvider initialCategories={initialCategories} initialProducts={initialProducts}>
      <OptimizedNewHomeContent locale={locale} />
    </ProductsProvider>
  );
}
