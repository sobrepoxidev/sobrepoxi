// src/components/home/ProductCategoriesBanner.tsx
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

interface ProductCategoriesBannerProps {
  locale: string;
}

export default async function ProductCategoriesBanner({ locale }: ProductCategoriesBannerProps) {
  
  return (
    <section className="py-3 sm:py-10 bg-[#121212]">
      <div className=" mx-auto px-2 sm:px-6 lg:px-8">
        <h2 className=" text-2xl sm:text-3xl font-bold mb-3 gold-gradient-bright">
          {locale === 'es' ? 'Nuestras soluciones especializadas' : 'Our specialized solutions'}
        </h2>
        
        {/* Two-column layout for Luxury and Industrial markets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-[1500px] mx-auto mb-8">
          {/* Luxury Design Flooring Card */}
          <Link 
            href="/luxury-design-flooring" 
            className="group relative overflow-hidden rounded-xl bg-[#1a1a1a] hover:bg-[#222] transition-all duration-300 hover:shadow-lg hover:shadow-[#b68b44]/20"
          >
            <div className="relative h-52 sm:h-64 w-full">
              <Image
                src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/luxury-floor.webp"
                alt={locale === 'es' ? 'Pisos Epóxicos de Lujo y Diseño' : 'Luxury & Design Epoxy Flooring'}
                fill
                className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                sizes="(max-width: 768px) 150vw, 100vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-3 w-full">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {locale === 'es' ? 'Pisos de Lujo y Diseño' : 'Luxury & Design Flooring'}
                </h3>
                <p className="text-sm sm:text-base text-gray-300">
                  {locale === 'es' 
                    ? 'Soluciones decorativas para espacios residenciales y comerciales de alto nivel.' 
                    : 'Decorative solutions for high-end residential and commercial spaces.'}
                </p>
                  <span className="text-[0.6rem] sm:text-xs text-gray-300">
                  {locale === 'es' 
                    ? ' *clic para más información' 
                    : ' *click for more information'}
                </span>
              </div>
            </div>
          </Link>

          {/* Industrial Epoxy Flooring Card */}
          <Link 
            href="/industrial-epoxy-flooring" 
            className="group relative overflow-hidden rounded-xl bg-[#1a1a1a] hover:bg-[#222] transition-all duration-300 hover:shadow-lg hover:shadow-[#b68b44]/20"
          >
            <div className="relative h-52 sm:h-64 w-full">
              <Image
                src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/industrial-floor.webp"
                alt={locale === 'es' ? 'Pisos Epóxicos Industriales' : 'Industrial Epoxy Flooring'}
                fill
                className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                sizes="(max-width: 768px) 150vw, 100vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-3 w-full">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {locale === 'es' ? 'Pisos Industriales y de Alto Rendimiento' : 'Industrial & High-Performance Flooring'}
                </h3>
                <p className="text-sm sm:text-base text-gray-300">
                  {locale === 'es'
                    ? 'Soluciones duraderas para entornos industriales, almacenes y plantas de producción.'
                    : 'Durable solutions for industrial environments, warehouses, and production facilities.'}
                </p>
                 <span className="text-[0.6rem] sm:text-xs text-gray-300">
                  {locale === 'es' 
                    ? ' *clic para más información' 
                    : ' *click for more information'}
                </span>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Additional product categories */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-3 max-w-[1500px] mx-auto">
          {/* Luxury Furniture Card */}
          <Link 
            href="/luxury-furniture" 
            className="group relative overflow-hidden rounded-xl bg-[#1a1a1a] hover:bg-[#222] transition-all duration-300 hover:shadow-lg hover:shadow-[#b68b44]/20"
          >
            <div className="relative h-52 sm:h-64 w-full">
              <Image
                src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/hero_banner2-UU5JSGUliJzY8K0pdtxeg0AeGpHaUq.webp"
                alt={locale === 'es' ? 'Muebles de Lujo' : 'Luxury Furniture'}
                fill
                className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                sizes="(max-width: 768px) 150vw, 100vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {locale === 'es' ? 'Muebles de Lujo' : 'Luxury Furniture'}
                </h3>
                <p className="text-sm sm:text-base text-gray-300">
                  {locale === 'es'
                    ? 'Piezas únicas hechas a mano con materiales premium. '
                    : 'Unique handcrafted pieces with premium materials. '}
                </p>
                <span className="text-[0.6rem] sm:text-xs text-gray-300">
                  {locale === 'es' 
                    ? ' *clic para más información' 
                    : ' *click for more information'}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}