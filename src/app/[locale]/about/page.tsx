'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-16">
            {/* Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
              <span className="inline-block mb-4 rounded-full bg-teal-100 px-4 py-1 text-sm font-medium text-teal-700">
                Nuestra misión
              </span>
              <h1 className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Sobre <span className="text-teal-700">Hand Made Art</span>
              </h1>
              <p className="mb-2 sm:mb-8 text-lg text-gray-600">
                En Hand Made Art nos apasiona promover y preservar las tradiciones artesanales. Nuestro objetivo es brindar un espacio en línea donde los artistas y artesanos privados de libertad puedan mostrar y vender sus creaciones únicas.
              </p>
              <div className="flex flex-col items-center justify-center sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="rounded-md bg-teal-600 px-6 py-3 text-white shadow transition hover:bg-teal-700 flex items-center justify-center gap-1"
                >
                  Explorar productos
                </Link>
              </div>
            </div>

            {/* Suggested image placement */}
            <div className="aspect-[1500/1574]  flex flex-col items-center justify-center sm:mt-7 mb-3">
              <Image
                src="/about/smoke.webp"
                alt="Artesanos trabajando"
                width={350}
                height={0}
                className="object-cover items-center justify-center lg:transform lg:rotate-12"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pt-8 md:pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Tradición y Arte
              </h3>
              <p className="text-gray-600">
                Explora nuestra amplia selección de artesanías hechas a mano en madera, barro, cerámica, tela y muchos otros materiales. Cada pieza es única y refleja la creatividad y habilidad de nuestros talentosos artesanos.
              </p>
              {/* Suggested: Add a small image or icon here */}
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Impacto Social
              </h3>
              <p className="text-gray-600">
                Cada compra que realices en nuestro sitio web apoya directamente a estos talentosos individuos y contribuye a mantener viva la artesanía tradicional.
              </p>
              {/* Suggested: Add a small image or icon here */}
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Calidad y Autenticidad
              </h3>
              <p className="text-gray-600">
                Todas nuestras piezas son creadas con el más alto nivel de artesanía y cuidado, garantizando productos únicos y de calidad.
              </p>
              {/* Suggested: Add a small image or icon here */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}