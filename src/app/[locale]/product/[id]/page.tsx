// This is a server component
import ProductDetail from '@/components/products/ProductDetail';

// The server component handles params extraction
type tParams = Promise<{ id: string, locale: string }>;
export default async function ProductPage({ params }: { params: tParams }) {
  const { id, locale } = await params;
  return <ProductDetail id={id} locale={locale} />;
}
