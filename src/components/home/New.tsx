'use client';
import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import GridSection from "@/components/cards/GridSection";
import { Carousel } from "@/components/home/Banner";
import { BannerTemplate } from "@/components/home/Banner";
import CarrucelSection from '@/components/cards/CarrucelSection';
// Removed unused Link import
import { BadgeCheck, Handshake, Sprout } from 'lucide-react';
import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types-db";

type Category = Database['categories'];

export const metadata = {
  // Meta por defecto del Home (Banner 1)
  title: 'Artesanías únicas hechas a mano | Handmade Art',
  description:
    'Compra artesanías auténticas elaboradas por personas privadas de libertad en Costa Rica. Impacto social, sostenibilidad y alta calidad en cada pieza.',
  keywords: [
    'artesanías hechas a mano',
    'productos artesanales Costa Rica',
    'impacto social',
    'proyectos de reinserción',
    'handmade art'
  ],
  alternates: {
    canonical: 'https://handmadeart.cr/'
  },
  openGraph: {
    title: 'Artesanías únicas hechas a mano | Handmade Art',
    description:
      'Descubre piezas artesanales irrepetibles y apoya la reinserción social de personas privadas de libertad.',
    url: 'https://handmadeart.cr/',
    siteName: 'Handmade Art',
    locale: 'es_CR',
    type: 'website',
    images: [
      {
        url: 'https://handmadeart.cr/og/impact.webp',
        width: 1200,
        height: 630,
        alt: 'Hombre exhibiendo espejo tallado y molinillo artesanal'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artesanías únicas hechas a mano | Handmade Art',
    description:
      'Apoya la reinserción social comprando artesanías únicas creadas en Costa Rica.',
    images: ['https://handmadeart.cr/og/impact.webp']
  }
};

export default function NewHome() {
  const locale = useLocale();
  const t = useTranslations('home');
  // Keeping categories for its setter which is used in fetchCategories
  const [, setCategories] = useState<Category[]>([]);
  const chorreadorCategoryId = 1;
  const [, setShowLoginBanner] = useState<boolean>(true);
  // Removed unused newsletter state variables

  // Verificar si el usuario ha iniciado sesión
  useEffect(() => {


    // Comprobar si el usuario ha ocultado el banner anteriormente
    const hideLoginBanner = localStorage.getItem('hideLoginBanner');
    if (hideLoginBanner === 'true') {
      setShowLoginBanner(false);
    }


    // Suscribirse a cambios en la sesión
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (session) => {

        if (session) {
          localStorage.setItem('hideLoginBanner', 'true');
          setShowLoginBanner(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch categories to get correct IDs
  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (data) {
        setCategories(data);
        
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="w-full relative z-0 h-full bg-gradient-to-b from-[#b3d5c3] via-white to-white">


      <Carousel>
        {/* Banner 1: Envío a Costa Rica (ahora primero) */}
        <BannerTemplate linkHref="/shipping">
          <div className="relative h-full flex flex-col md:flex-row justify-center items-center md:gap-10 px-4 md:px-24 py-4 md:py-6">
            <div className="max-w-full text-center md:text-left mt-0.5 md:mt-0 ">
              <h2 className="text-xl xs:text-2xl sm:text-4xl font-bold tracking-wider text-gray-800">
                <span className="mr-1">{t('banner1.title')}</span>
              </h2>
              <div className="flex flex-col">
                <div>
                  <p className="text-lg sm:text-lg font-light tracking-wider text-gray-800">
                    <span className="font-bold text-[#B55327]">{t('banner1.subtitle')}</span>
                  </p>
                  <p className="text-gray-600 text-[0.65rem] lg:text-xs mt-1 lg:mt-2">
                    {t('banner1.note')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center md:gap-8  px-2 md:px-4 h-auto ">
              <div className="relative h-[60px] w-[60px] md:h-[130px] md:w-[130px]">
                <Image
                  src="/home/mapa-cr.webp"
                  alt={t('banner1.mapAlt')}
                  fill
                  sizes="(max-width: 768px) 60px, 130px"
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              <div className="relative h-[80px] w-[80px] md:h-[180px] md:w-[180px]">
                <Image
                  src="/home/avion-correos.webp"
                  alt={t('banner1.planeAlt')}
                  fill
                  sizes="(max-width: 768px) 80px, 180px"
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              <div className="relative h-[80px] w-[80px] md:h-[180px] md:w-[180px]">
                <Image
                  src="/home/paquet-correos.webp"
                  alt={t('banner1.packageAlt')}
                  fill
                  sizes="(max-width: 768px) 80px, 180px"
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </div>
          </div>
        </BannerTemplate>

        {/* Banner 2: Artesanías (segundo lugar) */}
        <BannerTemplate linkHref="/impact">
          <Image
            src="/home/hombre-haciendo-dispensador-en-forma-de-molinillo.webp"
            alt={t('banner2.craftsman1Alt')}
            width={190}
            height={0}
            className="absolute top-14 left-0 lg:left-6 2xl:left-60 hidden sm:block rounded-lg max-lg:w-[125px]"
          />
          <Image
            src="/home/hombre-exhibiendo-espejo-tallado-en-madera.webp"
            alt={t('banner2.craftsman2Alt')}
            width={184}
            height={0}
            className="absolute top-12 right-2 lg:right-16 2xl:right-70 hidden sm:block rounded-lg max-lg:w-[125px]"
          />

          <div className="absolute bg-gradient-to-r from-[#f7c28c] via-[#f4a261] to-[#f7c28c] top-0 left-0 right-0 h-full flex flex-col items-center lg:justify-center ">
            <div className="text-center z-20 mt-2 lg:mt-4 px-4">
              <h1 className=" text-2xl lg:text-4xl text-gray-800 font-bold lg:mb-2 hidden sm:block">
                {t('banner2.title')}
              </h1>
              <h1 className=" text-2xl lg:text-4xl text-gray-800 font-bold lg:mb-2 sm:hidden">
                {t('banner2.titleMobile')}
              </h1>

              <p className="text-gray-800 text-sm mx-auto max-w-xl">
                {t('banner2.subtitle')}
              </p>

              <div className="flex justify-center space-x-4 md:space-x-12 mt-2 lg:mt-5">
                <div className="flex flex-col items-center">
                  <div className="bg-[#f7c28c] p-2 rounded-full mb-1">
                    <Handshake className="text-[#b55327]" />
                  </div>
                  <span className="text-gray-800 font-medium text-xs hidden sm:block">{t('banner2.impact')}</span>
                  <span className="text-gray-800 font-medium text-[0.65rem] lg:text-xs sm:hidden">{t('banner2.impactMobile')}</span>
                  <span className="text-[0.65rem] text-gray-800 hidden sm:block">{t('banner2.impactDesc')}</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="bg-[#f7c28c] p-2 rounded-full mb-1">
                    <Sprout className="text-[#b55327]" />
                  </div>
                  <span className="text-gray-800 font-medium text-[0.65rem] lg:text-xs">{t('banner2.sustainability')}</span>
                  <span className="text-[0.65rem]  text-gray-800 hidden sm:block">{t('banner2.sustainabilityDesc')}</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="bg-[#f7c28c] p-2 rounded-full mb-1">
                    <BadgeCheck className="text-[#b55327]" />
                  </div>
                  <span className="text-gray-800 font-medium text-[0.65rem] lg:text-xs">{t('banner2.quality')}</span>
                  <span className="text-[0.65rem] text-gray-800 hidden sm:block">{t('banner2.qualityDesc')}</span>
                </div>
              </div>
            </div>
          </div>
        </BannerTemplate>

        {/* Banner 3: Personalizado completamente diferente */}
        <BannerTemplate
          linkHref={chorreadorCategoryId ? `/products?category=${chorreadorCategoryId}` : '/products'}
          bgColor="bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="h-full flex flex-col items-center justify-center text-white text-center px-4">
            <h2 className="text-md lg:text-2xl font-light">{t('banner3.preTitle')}</h2>
            <h1 className="text-3xl lg:text-4xl font-bold my-0.5 lg:my-4">{t('banner3.title')}</h1>
            <p className="text-sm lg:text-xl">{t('banner3.subtitle')}</p>

            <button className="mt-2 lg:mt-6 bg-white text-purple-600 px-6 lg:px-8 py-2 rounded-full font-bold hover:bg-opacity-90 transition-all">
              {t('banner3.button')}
            </button>
          </div>
        </BannerTemplate>
      </Carousel>


      <GridSection indexStart={0} indexEnd={6} />
 
      
      <CarrucelSection title={locale === 'es' ? 'Regalos con significado' : 'Gifts with meaning'} startIndex={0} endIndex={10} />
      <GridSection indexStart={6} indexEnd={12} mobileActive={false} />
      <CarrucelSection title={locale === 'es' ? 'Detalles artesanales' : 'Artistic details'} startIndex={10} endIndex={20} mobileInvertList={true} />



    </div>
  )
}