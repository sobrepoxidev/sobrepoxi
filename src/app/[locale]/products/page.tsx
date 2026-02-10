import { Suspense } from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { buildMetadata } from "@/lib/seoConfig";
import Loading from "@/components/products/LoadingGallery";
import ProductsPageContent from "@/components/products/ProductsPageContent";
import { createClient } from "@/utils/supabase/server";

/**
 * Página de productos que muestra todos los productos disponibles.
 * La implementación principal ha sido movida al componente ProductsPageContent.
 */

type tParams = Promise<{ id: string; locale: string }>;
type tSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: tParams;
  searchParams: tSearchParams;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const query = await searchParams;

  // Fetch product data from Supabase (for individual product pages)
  const supabase = await createClient();
  const { data: product } = await supabase
    .from('products')
    .select('id, name, name_es, name_en, media')
    .eq('name', id)
    .single();

  if (!product) {
    // Products listing page — build canonical that includes category/tag params
    const canonicalParams = new URLSearchParams();
    if (query.category) canonicalParams.set('category', String(query.category));
    if (query.tag) canonicalParams.set('tag', String(query.tag));
    const qs = canonicalParams.toString();
    const canonicalPath = `/${locale}/products${qs ? `?${qs}` : ''}`;

    // Dynamic title based on active filters
    let title = locale === "es" ? "Productos | Pisos Epóxicos y Muebles de Resina" : "Products | Epoxy Floors & Resin Furniture";
    if (query.category) {
      // Resolve category name for SEO title
      const { data: cat } = await supabase
        .from('categories')
        .select('name_es, name_en')
        .eq('id', Number(query.category))
        .single();
      if (cat) {
        const catName = locale === 'es' ? cat.name_es : cat.name_en;
        title = locale === "es" ? `${catName} | Productos SobrePoxi` : `${catName} | SobrePoxi Products`;
      }
    }

    return buildMetadata({
      locale: locale === "es" ? "es" : "en",
      pathname: canonicalPath,
      title,
      description: locale === "es"
        ? "Explora nuestra colección artesanal de pisos epóxicos, mesas river table, escritorios y piezas únicas en resina epóxica. Envío en Costa Rica."
        : "Explore our artisan collection of epoxy floors, river tables, desks and unique epoxy resin pieces. Shipping in Costa Rica.",
      keywords: locale === "es"
        ? "productos resina epóxica, mesas river table, pisos epóxicos, muebles resina, sobrepoxi productos"
        : "epoxy resin products, river tables, epoxy floors, resin furniture, sobrepoxi products",
    });
  }

  const productName = locale === 'es'
    ? (product.name_es || product.name)
    : (product.name_en || product.name);

  const firstMedia = Array.isArray(product.media) && product.media.length > 0
    ? product.media[0]
    : null;

  return buildMetadata({
    locale: locale === "es" ? "es" : "en",
    pathname: `/${locale}/product/${product.name}`,
    title: productName || (locale === "es" ? "Producto" : "Product"),
    image: firstMedia && {
      url: firstMedia.url,
      width: 800,
      height: 800,
      alt: productName || ''
    }
  });
}

export default async function ProductsPage({ params }: { params: tParams }) {
  const { locale } = await params;
  
  return (
    <>
      <Suspense fallback={<Loading />}>
        <ProductsPageContent />
      </Suspense>
      
      {/* Schema.org markup for Products page */}
      <Script id="ld-products" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@type": "Product",
                "name": locale === "es" ? "Muebles de Lujo en Resina y Madera" : "Luxury Resin & Wood Furniture",
                "description": locale === "es"
                  ? "Piezas únicas de mobiliario artesanal en madera y resina epóxica."
                  : "Unique handcrafted furniture in wood and epoxy resin.",
                "url": `https://sobrepoxi.com/${locale}/luxury-furniture`
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@type": "Product",
                "name": locale === "es" ? "Pisos Epóxicos Residenciales y Comerciales" : "Residential & Commercial Epoxy Floors",
                "description": locale === "es"
                  ? "Pisos epóxicos de lujo y diseño para residencias, oficinas y espacios comerciales."
                  : "Luxury and designer epoxy floors for residences, offices, and commercial spaces.",
                "url": `https://sobrepoxi.com/${locale}/epoxy-floors`
              }
            },
            {
              "@type": "ListItem",
              "position": 3,
              "item": {
                "@type": "Product",
                "name": locale === "es" ? "Pisos Epóxicos Industriales" : "Industrial Epoxy Flooring",
                "description": locale === "es"
                  ? "Pisos epóxicos industriales de alta resistencia para fábricas, bodegas y plantas alimenticias."
                  : "High-resistance industrial epoxy floors for factories, warehouses and food plants.",
                "url": `https://sobrepoxi.com/${locale}/industrial-epoxy-flooring`
              }
            }
          ]
        })}
      </Script>
    </>
  );
}