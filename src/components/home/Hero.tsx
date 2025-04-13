'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  ShoppingCartIcon,

} from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden  h-full md:h-[84vh] ">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Contenido de texto */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
            <span className="inline-block mb-4 max-md:items-center max-md:justify-center md:w-2/3  rounded-full bg-teal-100 px-4 py-1 text-sm font-medium text-teal-700">
              Arte con propósito
            </span>
            <h1 className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              Arte hecho <span className="text-teal-700">a mano</span> en Hand Made Art
            </h1>
            <p className="mb-8 max-w-lg mx-auto lg:mx-0 text-lg text-gray-600">
              Descubre piezas únicas creadas por artesanos que transforman materiales simples en obras de arte, mientras transforman sus propias vidas.
            </p>
            <div className="flex flex-col items-center justify-center sm:flex-row gap-4 ">
              <Link href="/products" className="rounded-md bg-teal-600 px-6 py-3 text-white shadow transition hover:bg-teal-700 flex items-center justify-center gap-1">
                <ShoppingBag className="h-5 w-5" /> Explorar productos
              </Link>

              <Link href="/about" className="rounded-md border bg-white border-teal-200 hover:bg-teal-50  px-6 py-3 text-teal-700 shadow transition ">
               Sobre nosotros
              </Link>
            </div>
            {/* Trust badges */}
            <div className="mt-10">
              <p className="mb-4 text-sm font-medium text-gray-500">Con el apoyo de:</p>
              <div className="flex justify-center lg:justify-start gap-1 md:gap-4 mx-1">
                {["mainlogo.png", "mainlogonav1.png", "final3.png"].map((i) => (
                  <Image
                    key={i}
                    src={`/${i}`}
                    alt={`Logo apoyo: ${i}`}
                    width={75}
                    height={0}
                    className="object-contain opacity-70"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Imagen destacada */}
          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start ">
            <div className="relative max-w-full w-full rounded-2xl overflow-hidden shadow-sm bg-gray-50 border border-gray-300">
              <Image
                src="/product1.png"
                alt="Artesanía destacada"
                width={1500}
                height={0}
                className="h-full w-full object-cover"
                priority
              />



              {/* Producto destacado flotante */}
              <div className="absolute flex bottom-2 top-auto md:top-2 md:bottom-auto right-2 max-w-xs bg-gray-50 bg-opacity-80 backdrop-blur-sm rounded-xl p-1 shadow-lg">
                <div className="mr-1">
                  <h3 className="text-sm font-semibold text-gray-800">Juego artesanal dragón</h3>
                  <p className="text-xs text-gray-600">Hecho con maderas sostenibles</p>
                </div>
                {/* <p className="mt-0.5 text-teal-700 font-bold">$120.00</p> */}
                <div className="flex justify-center">
                  <Link href="/productos" className="inline-flex items-center gap-1 rounded-md bg-teal-500 px-2 py-1 text-sm text-teal-900 shadow transition hover:bg-teal-800">
                    <ShoppingCartIcon className="h-4 w-4" /> $120
                  </Link>
                </div>
              </div>
              {/* Testimonial flotante */}
              <div className="absolute bottom-2 left-2 max-w-xl bg-gray-50 bg-opacity-80 backdrop-blur-sm rounded-xl p-1 shadow-lg hidden md:block">
                
                <p className="mt-1 text-sm text-gray-700 italic ">
                  &ldquo;El arte me dio un nuevo propósito y una forma de expresión.&rdquo;
                </p>
                <p className="text-xs font-bold mt-1 text-teal-700">— MCB, Artesano desde 2020</p>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="relative mb-14 z-auto">
          <div className="absolute inset-0 flex items-center justify-center my-8">
            <button
              className="animate-bounce rounded-full border border-gray-300 p-1 text-gray-400 hover:bg-gray-50 z-auto"
              aria-label="Scroll abajo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 z-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
