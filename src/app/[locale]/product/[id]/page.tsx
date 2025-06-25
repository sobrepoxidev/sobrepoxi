import type { Metadata } from "next";
import { getCommonMetadata, buildTitle } from "@/lib/seo";
// Server component
import ProductDetail from '@/components/products/ProductDetail';

// The server component handles params extraction
type tParams = Promise<{ id: string, locale: string }>;
export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { locale } = await params;
  // Try to derive product name via query param or fallback
  const genericTitle = locale === "es" ? "Producto" : "Product";
  return {
    title: buildTitle(genericTitle),
    ...getCommonMetadata(locale),
  };
}

export default async function ProductPage({ params }: { params: tParams }) {
  const { id, locale } = await params;
  return <ProductDetail id={id} locale={locale} />;
}
