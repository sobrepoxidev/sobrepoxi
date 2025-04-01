'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Contenido de texto */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
            <span className="inline-block mb-4 rounded-full bg-teal-100 px-4 py-1 text-sm font-medium text-teal-800">
              Arte con propósito
            </span>
            <h1 className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              Arte hecho <span className="text-teal-700">a mano</span> con historia
            </h1>
            <p className="mb-8 max-w-lg mx-auto lg:mx-0 text-lg text-gray-600">
              Descubre piezas únicas creadas por artesanos que transforman materiales simples en obras de arte, mientras transforman sus propias vidas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/productos" className="rounded-md bg-teal-700 px-6 py-3 text-white shadow transition hover:bg-teal-800">
                Explorar productos
              </Link>
              <Link href="/impacto" className="rounded-md border border-gray-300 px-6 py-3 text-gray-700 shadow transition hover:bg-gray-50">
                Conocer nuestro impacto
              </Link>
            </div>
            {/* Trust badges */}
            <div className="mt-10">
              <p className="mb-4 text-sm font-medium text-gray-500">Con el apoyo de:</p>
              <div className="flex justify-center lg:justify-start gap-4">
                {[1, 2, 3].map((i) => (
                  <Image
                    key={i}
                    src="/logohma.png"
                    alt={`Logo apoyo ${i}`}
                    width={100}
                    height={30}
                    className="object-contain opacity-70"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Imagen destacada */}
          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative max-w-md rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/bg-hero.jpeg"
                alt="Artesanía destacada"
                width={600}
                height={600}
                className="h-full w-full object-cover"
                priority
              />

              {/* Testimonial flotante */}
              <div className="absolute top-4 left-4 max-w-xs bg-white bg-opacity-80 backdrop-blur-sm rounded-xl p-4 shadow-lg hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                  <div>
                    <p className="font-medium text-gray-800">María T.</p>
                    <p className="text-xs text-gray-600">Artesana desde 2020</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-700 italic">
                  "El arte me dio un nuevo propósito y una forma de expresión."
                </p>
              </div>

              {/* Producto destacado flotante */}
              <div className="absolute bottom-4 right-4 max-w-xs bg-white bg-opacity-80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <h3 className="text-sm font-semibold text-gray-800">Juego de té artesanal</h3>
                <p className="text-xs text-gray-600">Hecho con maderas sostenibles</p>
                <p className="mt-2 text-teal-700 font-bold">$120.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="mt-12 flex justify-center">
          <button
            className="animate-bounce rounded-full border border-gray-300 p-3 text-gray-400 hover:bg-gray-50"
            aria-label="Scroll abajo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
