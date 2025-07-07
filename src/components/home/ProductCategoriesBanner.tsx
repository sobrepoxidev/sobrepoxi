// src/components/home/ProductCategoriesBanner.tsx
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

interface ProductCategoriesBannerProps {
  locale: string;
}

export default async function ProductCategoriesBanner({ locale }: ProductCategoriesBannerProps) {
  
  return (
    <section className="py-3 sm:py-10 bg-[#121212]">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-8 gold-gradient-bright">
          {locale === 'es' ? 'Conoce sobre nuestros productos y servicios' : 'Discover our products and services'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Epoxy Floors Card */}
          <Link 
            href="/epoxy-floors" 
            className="group relative overflow-hidden rounded-xl bg-[#1a1a1a] hover:bg-[#222] transition-all duration-300 hover:shadow-lg hover:shadow-[#b68b44]/20"
          >
            <div className="relative h-48 sm:h-64 w-full">
              <Image
                src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/hero_banner-rqcdjol5sTo1NLeMVxeHmdlTqWikoQ.webp"
                alt={locale === 'es' ? 'Pisos Epóxicos' : 'Epoxy Floors'}
                fill
                className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                sizes="(max-width: 768px) 150vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {locale === 'es' ? 'Pisos Epóxicos' : 'Epoxy Floors'}
                </h3>
                <p className="text-sm sm:text-base text-gray-300">
                  {locale === 'es' 
                    ? 'Transforma tus espacios con nuestros pisos de lujo' 
                    : 'Transform your spaces with our luxury flooring'}
                </p>
              </div>
            </div>
          </Link>

          {/* Luxury Furniture Card */}
          <Link 
            href="/luxury-furniture" 
            className="group relative overflow-hidden rounded-xl bg-[#1a1a1a] hover:bg-[#222] transition-all duration-300 hover:shadow-lg hover:shadow-[#b68b44]/20"
          >
            <div className="relative h-48 sm:h-64 w-full">
              <Image
                src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/hero_banner2-UU5JSGUliJzY8K0pdtxeg0AeGpHaUq.webp"
                alt={locale === 'es' ? 'Muebles de Lujo' : 'Luxury Furniture'}
                fill
                className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                sizes="(max-width: 768px) 150vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {locale === 'es' ? 'Muebles de Lujo' : 'Luxury Furniture'}
                </h3>
                <p className="text-sm sm:text-base text-gray-300">
                  {locale === 'es'
                    ? 'Piezas únicas hechas a mano con materiales premium'
                    : 'Unique handcrafted pieces with premium materials'}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}