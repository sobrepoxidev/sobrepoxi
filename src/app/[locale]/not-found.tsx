// src/app/[locale]/not-found.tsx
//
// Server Component (sin 'use client'). Next.js solo emite HTTP 404 real
// cuando not-found.tsx es un Server Component. Una versión 'use client'
// sirve status 200 con contenido "404" visual → Google lo marca como
// Soft 404 y degrada el sitio. (Fix SEO.)

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-7xl font-bold gold-gradient mb-4">404</h1>
        <p className="text-xl md:text-2xl gold-gradient-bright mb-2">
          Página no encontrada
        </p>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          La página que buscas no existe o fue movida.
        </p>
        <Link
          href="/es"
          className="inline-block px-6 py-2.5 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
