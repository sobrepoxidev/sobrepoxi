import React from 'react'
import Image from 'next/image'
import GridSection from "@/components/cards/GridSection";
import { Carousel } from "@/components/home/Banner";
import { BannerTemplate } from "@/components/home/Banner";
import CarrucelSection from '@/components/cards/CarrucelSection';
import Link from 'next/link';
import { BadgeCheck, Handshake, Sprout } from 'lucide-react';
//import { supabase } from "@/lib/supabaseClient";
//import { Database } from "@/types-db";
//type Product = Database['products'];

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

  return (
    <div className=" max-w-[1500px] mx-auto relative z-0 h-full bg-gradient-to-b from-[#d7eee8] via-white to-white">
      <Carousel>
        {/* Banner 1: Artesanías (tu banner original) */}
        <BannerTemplate linkHref="/impact">
          <Image
            src="/home/hombre-haciendo-dispensador-en-forma-de-molinillo.webp"
            alt="Hombre haciendo dispensador en forma de molinillo"
            width={190}
            height={0}
            className="absolute top-14 left-0 lg:left-6 2xl:left-60 hidden sm:block rounded-lg max-lg:w-[125px]"
          />
          <Image
            src="/home/hombre-exhibiendo-espejo-tallado-en-madera.webp"
            alt="Hombre exhibiendo espejo tallado en madera"
            width={184}
            height={0}
            className="absolute top-12 right-2 lg:right-16 2xl:right-70 hidden sm:block rounded-lg max-lg:w-[125px]"
          />

          <div className="absolute bg-gradient-to-b from-teal-100 to-emerald-100 top-0 left-0 right-0 h-full flex flex-col items-center lg:justify-center ">
            <div className="text-center z-20 mt-2 lg:mt-4 px-4">
              <h1 className=" text-2xl lg:text-4xl font-bold lg:mb-2 hidden sm:block">
                Artesanías únicas hechas a mano
              </h1>
              <h1 className=" text-2xl lg:text-4xl font-bold lg:mb-2 sm:hidden">
                Artesanías hechas a mano
              </h1>

              <p className="text-gray-800 text-sm mx-auto max-w-xl">
                Por privados de libertad que impactan positivamente
              </p>

              <div className="flex justify-center space-x-4 md:space-x-12 mt-2 lg:mt-5">
                <div className="flex flex-col items-center">
                  <div className="bg-[#b2f0dd] p-2 rounded-full mb-1">
                    <Handshake className="text-[#14866e]" />
                  </div>
                  <span className="text-gray-800 font-medium text-xs hidden sm:block">Impacto Social</span>
                  <span className="text-gray-800 font-medium text-[0.65rem] lg:text-xs sm:hidden">Impacto</span>
                  <span className="text-[0.65rem] text-gray-800 hidden sm:block">Apoyando la reinserción</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="bg-[#b2f0dd] p-2 rounded-full mb-1">
                    <Sprout className="text-[#14866e]" />
                  </div>
                  <span className="text-gray-800 font-medium text-[0.65rem] lg:text-xs">Sostenibilidad</span>
                  <span className="text-[0.65rem]  text-gray-800 hidden sm:block">Materiales ecológicos</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="bg-[#A7E8D4] p-2 rounded-full mb-1">
                    <BadgeCheck className="text-[#14866e]" />
                  </div>
                  <span className="text-gray-800 font-medium text-[0.65rem] lg:text-xs">Calidad</span>
                  <span className="text-[0.65rem] text-gray-800 hidden sm:block">Detalles artesanales</span>
                </div>
              </div>
            </div>
          </div>
        </BannerTemplate>

        {/* Banner 2: Envío internacional (estilo Amazon) */}
        <BannerTemplate linkHref="/shipping">
          <div className="relative h-full flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 px-4 md:px-24">
            <div className="max-w-full text-center md:text-left -mt-4 md:mt-0">
              <h1 className="text-gray-800 text-2xl lg:text-4xl font-bold max-lg:mt-2 lg:mb-2">
                Envíos a todo Costa Rica
              </h1>
              <p className="text-gray-700 text-sm lg:text-xl">
                con tarifas desde ₡1.950
              </p>
              <p className="text-gray-600 text-[0.65rem] lg:text-xs mt-1 lg:mt-4">
                *Costo variable dependiendo del peso. Pulsa aquí para más información.
              </p>
            </div>

            <div className="flex items-center gap-2 md:gap-8 max-lg: -mt-5">
              <Image
                src="/home/mapa-cr.webp"
                alt="Mapa de Costa Rica"
                width={200}
                height={0}
                className="max-lg:w-[60px]"
              />
              <Image
                src="/home/avion-correos.webp"
                alt="Avión de correos"
                width={200}
                height={0}
                className="max-lg:w-[80px]"
              />

              <Image
                src="/home/paquet-correos.webp"
                alt="Paquete de correos"
                width={200}
                height={0}
                className="max-lg:w-[80px]"
              />
            </div>
          </div>
        </BannerTemplate>

        {/* Banner 3: Personalizado completamente diferente */}
        <BannerTemplate linkHref="/hom?category=drippers" bgColor="bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="h-full flex flex-col items-center justify-center text-white text-center px-4">
            <h2 className="text-md lg:text-2xl font-light">Descubre nuestra</h2>
            <h1 className="text-3xl lg:text-4xl font-bold my-0.5 lg:my-4">NUEVA COLECCIÓN</h1>
            <p className="text-sm lg:text-xl">Chorreadores únicos hechos a mano</p>

            <button className="mt-2 lg:mt-6 bg-white text-purple-600 px-6 lg:px-8 py-2 rounded-full font-bold hover:bg-opacity-90 transition-all">
              Ver ahora
            </button>
          </div>
        </BannerTemplate>
      </Carousel>

      {/* Resto del contenido de la página */}
      <GridSection />
      <CarrucelSection
        items={[
          {
            title: 'Regalos con significado',
            className: 'bg-indigo-400',
            start: true,
            content: (
              <div className="grid grid-cols-2 w-full p-1 gap-1 h-full">
                {/* Product 1 */}
                <div className="bg-gray-50 rounded-sm flex flex-col items-center justify-between pt-4 h-full">
                  <Link href="/?id=42" className="block">
                    <Image
                      src="/home/1.webp?v=2"
                      alt="Chorreador artesanal 1"
                      width={150}
                      height={0}
                      className="object-cover pt-4"
                    />
                  </Link>
                  <div className="flex flex-col items-end justify-end">
                    <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                      Piñas decorativas
                    </span>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="bg-gray-50 rounded-sm flex flex-col items-center justify-between pt-4 h-full">
                  <Link href="/?id=41" className="block">
                    <Image
                      src="/home/2.webp?v=2"
                      alt="Chorreador artesanal 2"
                      width={85}
                      height={0}
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-col items-end justify-end">
                    <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                      Jarra y vasos en madera
                    </span>
                  </div>
                </div>

                {/* Product 3 */}
                <div className="bg-gray-50 rounded-sm flex flex-col items-center justify-between pt-4 h-full">
                  <Link href="/?id=43" className="block">
                    <Image
                      src="/home/3.webp?v=2"
                      alt="Chorreador artesanal 3"
                      width={85}
                      height={0}
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-col items-end justify-end">
                    <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                      Dispensador
                    </span>
                  </div>
                </div>

                {/* Product 4 */}
                <div className="bg-gray-50 rounded-sm flex flex-col items-center justify-between pt-4 h-full">
                  <Link href="/?id=15" className="block">
                    <Image
                      src="/home/chorreadores-bgt-15-1.webp?v=2"
                      alt="Chorreador artesanal 4"
                      width={85}
                      height={0}
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-col items-end justify-end">
                    <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                    Par de tucanes
                    </span>
                  </div>
                </div>
              </div>
            ),
            link: '/link1',

          },
          {
            title: 'Envíos a toda Costa Rica',
            className: 'bg-teal-400',
            content: (
              <div className="grid  grid-cols-1 w-full p-1 gap-1 h-full">
                <div className="rounded-sm flex flex-col items-center justify-center  bg-[#d7eee8] ">
            <Link href="/shipping" className="block">
              <Image
                src="/home/avion-correos.webp?v=2"
                alt="Chorreador artesanal 4"
                width={200}
                height={200}
                className="object-contain"
              />
            </Link>
            <p className="text-gray-600 text-[0.65rem] mt-1 lg:mt-4">
              *Pulsa aquí para más información.
            </p>
          </div>
              </div>
            ),
            link: '/link1'
          },
          {
            title: 'Chorreadores con estilo',
            className: 'bg-indigo-400',
            content: (
              <div className="grid  grid-cols-2 w-full p-1 gap-1 h-full">
                {/* Product 1 */}
                <div className="bg-gray-50 rounded-sm flex flex-col items-center justify-between pt-4 h-full">
                  <Link href="/?id=5" className="block">
                    <Image
                      src="/home/chorreadores-1-2-bg-1.webp?v=2"
                      alt="Chorreador artesanal 1"
                      width={85}
                      height={0}
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-col items-end justify-end">
                    <span className="  text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                    Rana de árbol
                    </span>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="bg-gray-50 rounded-sm flex flex-col items-center justify-between pt-4 h-full">
                  <Link href="/?id=7" className="block">
                    <Image
                      src="/home/chorreadores-13-bg-1.webp?v=2"
                      alt="Chorreador artesanal 2"
                      width={85}
                      height={0}
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-col items-end justify-end">
                    <span className="  text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                      Aqua tiburón
                    </span>
                  </div>
                </div>

                {/* Product 3 */}
                <div className="bg-gray-50 rounded-sm flex flex-col items-center justify-between pt-4 h-full">
                  <Link href="/?id=13" className="block">
                    <Image
                      src="/home/chorreadores-19-bg-1.webp?v=2"
                      alt="Chorreador artesanal 3"
                      width={85}
                      height={0}
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-col items-end justify-end">
                    <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                      Colibrí morada
                    </span>
                  </div>
                </div>

                {/* Product 4 */}
                <div className="bg-gray-50 rounded-sm flex flex-col items-center justify-between pt-4 h-full">
                  <Link href="/?id=15" className="block">
                    <Image
                      src="/home/chorreadores-bgt-15-1.webp?v=2"
                      alt="Chorreador artesanal 4"
                      width={85}
                      height={0}
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-col items-end justify-end">
                    <span className=" text-black text-[8px] font-medium p-0.5 inline-block rounded-t mt-1">
                    Par de tucanes
                    </span>
                  </div>
                </div>
              </div>
            ),
            link: '/link1',
            end: true,
          },
          // ... more items
        ]}
      />
      <div className="flex flex-col mt-1 h-full   rounded-md p-4  max-w-full">
        <h3 className="text-sm font-semibold text-black mb-3">
          Inicie sesión y acelere su compra
        </h3>
        <Link
          href="/login"
          className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium py-2 px-4 rounded-full text-center"
        >
          Iniciar sesión
        </Link>
        <Link href="/register" className="mt-3 text-blue-600 text-sm hover:underline text-left">
          Crear cuenta
        </Link>
      </div>
      

    </div>
  )
}