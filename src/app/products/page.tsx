import { supabase } from "@/lib/supabaseClient";
import { Suspense } from "react";
import Loading from "@/components/products/LoadingGallery";
import { ProductCard } from "@/components/products/ProductCard";
// Solo importamos GalleryModal: un Client Component para el modal global
import { GalleryModal } from "@/components/products/ClientComponents";

const ServicesPage: React.FC = async () => {

  // Consulta a Supabase
  const { data: products, error } = await supabase
    .from("products")
    .select(`
      id,
      album_title,
      name,
      media,
      description,
      price
    `);

  if (error) {
    console.error("Error obteniendo productos:", error.message);
    return (
      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-10 text-red-500">
        Error al cargar: {error.message}
      </main>
    );
  }

  if (!products || products.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Nuestros Productos</h1>
        <p>No hay productos disponibles en este momento.</p>
      </main>
    );
  }


  return (
    <div
      className="w-full min-h-screen bg-gradient-to-b from-amber-50 to-white
      transition-colors flex flex-col justify-start items-center"
    >
      <section className="w-full max-w-7xl 2 flex flex-col items-center text-center py-1 px-1 md:py-3 sm:px-5 md:px-14 lg:px-5 relative ">
        <h1 className="w-full text-xl sm:text-5xl font-extrabold bg-teal-100 text-teal-800 leading-tight inline-block rounded-full shadow-sm">
         Todos los Productos
        </h1>
        <p className="w-full text-sm sm:text-lg  text-gray-400 mt-2">
            Aquí encontrarás nuestros productos. Expándelos para verlos más detalladamente.
        </p>

        {/* Fallback mientras se cargan datos o client components */}
        <Suspense fallback={<Loading />}>
       
          <GalleryModal />

         
          <div className="w-full max-w-7xl  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5 sm:gap-8 pt-3 ">
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </Suspense>
      </section>
    </div>
  );
}

export default ServicesPage;