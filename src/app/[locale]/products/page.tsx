import { supabase } from "@/lib/supabaseClient";
import { Suspense } from "react";
import Loading from "@/components/products/LoadingGallery";
import { ProductCardModal } from "@/components/products/ProductModal";
// Solo importamos GalleryModal: un Client Component para el modal global

import PaginationControls from "@/components/products/PaginationControls";
import { GalleryModal } from "@/components/products/ClientComponents";
import { Database } from "@/types-db";


type tParams = Promise<{ category: string | undefined; id: string | undefined; page: string | undefined }>;

type Product = Database['products'];
const PRODUCTS_PER_PAGE = 12; // Puedes ajustar este valor

export default async function ServicesPage (props: { params: tParams }) {
  const { category, id, page } = await props.params;
  // Parámetros de Paginación (con valores por defecto y conversión a número)
  const currentPage = parseInt(typeof page === 'string' ? page : '1', 10) || 1;

  // --- Cálculo de Rango para Supabase ---
  const from = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const to = from + PRODUCTS_PER_PAGE - 1;

  console.log(`Workspaceing page ${currentPage}, limit ${PRODUCTS_PER_PAGE}, range ${from}-${to}`);

  let initialProductForModal: Product | null = null; // Variable para el producto iniciallet product: Product  = {} as Product;
  
  let query = supabase
  .from("products")
  // Solicita el conteo exacto JUNTO con los datos
  .select(`
    id,
    category,
    name,
    media,
    description,
    price,
    created_at
  `, { count: 'exact' });
  
  if (category && typeof category === 'string') {
    console.log("Filtrando por categoría:", category);
    query = query.eq('category', category);
  }
  
 // Aplicar orden y rango para paginación
 query = query.order('name', { ascending: true }).range(from, to);

 // --- Ejecución de Consulta ---
 const { data: products, error, count: totalCount } = await query;

 console.log(`Supabase returned ${products?.length} products, total count: ${totalCount}`);

 if (id && typeof id === 'string' && products) {
  const productFound = products.find((p) => p.id.toString() === id);
  if (productFound) {
    console.log("Producto encontrado en página actual para modal inicial:", productFound);
    initialProductForModal = productFound;
  } else {
    console.log("Producto con ID", id, "no encontrado en la página actual.");
  }
}



  if (error) {
    console.error("Error obteniendo productos:", error.message);
    return (
      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-10 text-red-500">
        Error al cargar: {error.message}
      </main>
    );
  }

  const totalPages = totalCount ? Math.ceil(totalCount / PRODUCTS_PER_PAGE) : 0;
  console.log(`Total pages calculated: ${totalPages}`);

  if (!totalCount || totalCount === 0) {
    return (
      <main className="w-full max-w-7xl 2 flex flex-col items-center text-center py-1 px-1 md:py-3 sm:px-5 md:px-14 lg:px-5 relative ">
        <h1 className="w-full text-xl sm:text-5xl font-extrabold text-start   text-teal-800 mt-1">Nuestros Productos</h1>
        {
          category? (
            <p className="w-full text-sm sm:text-lg  text-gray-600 mt-2 text-start">
              No hay productos disponibles para esta categoría.
            </p>
          ) : (
            <p className="w-full text-sm sm:text-lg  text-gray-600 mt-2 text-start">
              No hay productos disponibles.
            </p>
          )
        }
      </main>
    );
  }


  return (
    <div
      className="w-full min-h-screen 
      transition-colors flex flex-col justify-start items-center"
    >
      <section className="w-full max-w-7xl 2 flex flex-col items-center text-center py-1 px-1 md:py-3 sm:px-5 md:px-14 lg:px-5 relative ">
        <h1 className="w-full text-xl sm:text-5xl font-extrabold text-start   text-teal-800 mt-1">
         Todos los Productos
        </h1>
        <p className="w-full text-sm sm:text-lg  text-gray-600 mt-2 text-start">
            Aquí encontrarás nuestros productos. Expándelos para verlos más detalladamente.
            {totalPages > 1 && ` (Página ${currentPage} de ${totalPages})`}
        </p>

        {/* Fallback mientras se cargan datos o client components */}
        <Suspense fallback={<Loading />}>
    
        <GalleryModal initialProduct={initialProductForModal} />

         
          {/* Grid de Productos (ahora muestra solo la página actual) */}
          {products && products.length > 0 ? (
             <div className="w-full max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5 sm:gap-8 pt-3 ">
                {products.map((product) => (
                <div key={product.id} className="rounded-lg z-30 shadow-lg overflow-hidden transition-transform duration-300 flex flex-col h-full border border-gray-300 hover:shadow-xl hover:-translate-y-1 ">
                    <ProductCardModal product={product} activeExpandButton={true} />
                </div>
                ))}
            </div>
          ) : (
              // Mensaje si no hay productos EN ESTA PÁGINA (pero sí en total)
              <p className="w-full text-lg text-gray-600 mt-8 text-center">
                  No hay más productos para mostrar en esta página.
              </p>
          )}


          {/* Renderiza los controles de paginación si hay más de una página */}
          {totalPages > 1 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                // Pasamos los searchParams actuales para que los controles
                // puedan preservar filtros como 'category' al cambiar de página
              />
          )}
        </Suspense>
      </section>
    </div>
  );
}