// src/app/not-found.tsx
//
// 404 raíz (para URLs que no matchean ningún locale ni ruta).
// Server Component para que Next.js emita HTTP 404 real.

import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="es">
      <body className="min-h-screen flex items-center justify-center bg-[#121212]">
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-7xl font-bold text-amber-500 mb-4">404</h1>
          <p className="text-xl md:text-2xl text-white mb-2">Página no encontrada</p>
          <Link
            href="/es"
            className="inline-block mt-6 px-6 py-2.5 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </body>
    </html>
  );
}
