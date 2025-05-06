import { Suspense } from "react";
import Loading from "@/components/products/LoadingGallery";
import ProductsPageContent from "@/components/products/ProductsPageContent";

/**
 * Página de productos que muestra todos los productos disponibles.
 * La implementación principal ha sido movida al componente ProductsPageContent.
 */
export default function ProductsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsPageContent />
    </Suspense>
  );
}