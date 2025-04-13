// src/components/products/PaginationControls.tsx
'use client'; // Necesita Link y hooks del lado del cliente

import Link from 'next/link';
import { useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  searchParams: { [key: string]: string | string[] | undefined }; // Recibe los params del servidor
}

export default function PaginationControls({
  currentPage,
  totalPages,
}: PaginationControlsProps) {
    const searchParams = useSearchParams();
    console.log("searchParams PaginationControls:", searchParams);
  // Función para crear la URL de una página específica,
  // manteniendo los parámetros existentes (como 'category')
  const createPageURL = (pageNumber: number) => {
    // Clona los parámetros actuales que recibimos del servidor

    const params = new URLSearchParams(searchParams); // Puede necesitar casteo
    // Establece el nuevo número de página
    params.set('page', pageNumber.toString());
    // Elimina 'id' si existe, ya que probablemente no queramos que persista entre páginas
    params.delete('id');
    // Devuelve la cadena de query string (ej: "?category=drippers&page=2")
    return `?${params.toString()}`;
  };

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  // Determina si los botones deben estar activos
  const showPrev = currentPage > 1;
  const showNext = currentPage < totalPages;

  return (
    <div className="flex justify-center items-center space-x-4 mt-8 mb-4">
      {/* Botón Anterior */}
      <Link
        href={showPrev ? createPageURL(prevPage) : '#'} // Enlace '#' si está deshabilitado
        passHref
        legacyBehavior // Útil para envolver elementos que no son <a> o para control fino
      >
        <a
          className={`px-4 py-2 border rounded transition-colors duration-200 ${
            !showPrev
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none' // Estilos y deshabilita eventos
              : 'bg-teal-600 text-white hover:bg-teal-700' // Estilos activos
          }`}
          aria-disabled={!showPrev} // Accesibilidad
          // onClick={(e) => !showPrev && e.preventDefault()} // Alternativa a pointer-events-none
        >
          Anterior
        </a>
      </Link>

      {/* Indicador de Página */}
      <span className="text-gray-700 font-medium">
        Página {currentPage} de {totalPages}
      </span>

      {/* Botón Siguiente */}
      <Link
        href={showNext ? createPageURL(nextPage) : '#'}
        passHref
        legacyBehavior
      >
         <a
          className={`px-4 py-2 border rounded transition-colors duration-200 ${
            !showNext
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
              : 'bg-teal-600 text-white hover:bg-teal-700'
          }`}
          aria-disabled={!showNext}
          // onClick={(e) => !showNext && e.preventDefault()}
        >
          Siguiente
        </a>
      </Link>
    </div>
  );
}