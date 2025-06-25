import { Suspense } from "react";
import type { Metadata } from "next";
import { getCommonMetadata, buildTitle } from "@/lib/seo";
import Loading from "@/components/products/LoadingGallery";
import ProductsPageContent from "@/components/products/ProductsPageContent";

/**
 * Página de productos que muestra todos los productos disponibles.
 * La implementación principal ha sido movida al componente ProductsPageContent.
 */
type tParams = Promise<{ id: string, locale: string }>;
export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: buildTitle(locale === "es" ? "Todos los productos" : "All products"),
    ...getCommonMetadata(locale),
  };
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsPageContent />
    </Suspense>
  );
}