// This is a server component
import ProductDetail from '@/components/products/ProductDetail';

// The server component handles params extraction
export default function ProductPage({ params }: { params: { id: string, locale: string } }) {
  return <ProductDetail id={params.id} locale={params.locale} />;
}
