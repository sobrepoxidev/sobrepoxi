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

type tParams = Promise<{ id: string, locale: string }>;
export async function generateMetadata({
  params
}: {
  params: tParams;
}): Promise<Metadata> {
  const { locale, id } = await params;

  // Fetch product data from Supabase
  const supabase = await createClient();
  const { data: product } = await supabase
    .from('products')
    .select('id, name, name_es, name_en, media')
    .eq('name', id)
    .single();

  if (!product) { 
    return buildMetadata({
      locale: locale === "es" ? "es" : "en",
      pathname: `/products`,
      title: locale === "es" ? "Productos" : "Products"
    });
  }

  // Get localized name based on locale
  const productName = locale === 'es' 
    ? (product.name_es || product.name)
    : (product.name_en || product.name);
    
  // Get the first media item if available
  const firstMedia = Array.isArray(product.media) && product.media.length > 0 
    ? product.media[0]
    : null;

  return buildMetadata({
    locale: locale === "es" ? "es" : "en",
    pathname: `/product/${product.name}`,
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
                "name": locale === "es" ? "Muebles de Lujo" : "Luxury Furniture",
                "description": locale === "es" 
                  ? "Piezas únicas de mobiliario artesanal en madera y resina epóxica."
                  : "Unique handcrafted furniture in wood and epoxy resin.",
                "url": "https://sobrepoxi.com/luxury-furniture"
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@type": "Product",
                "name": locale === "es" ? "Pisos Epóxicos de Lujo y Diseño" : "Luxury & Designer Epoxy Floors",
                "description": locale === "es"
                  ? "Pisos epóxicos de lujo y diseño para residencias, oficinas y espacios comerciales."
                  : "Luxury and designer epoxy floors for residences, offices, and commercial spaces.",
                "url": "https://sobrepoxi.com/luxury-design-flooring"
              }
            },
            {
              "@type": "ListItem",
              "position": 3,
              "item": {
                "@type": "Product",
                "name": locale === "es" ? "Pisos Epóxicos Industriales" : "Industrial Epoxy Flooring",
                "description": locale === "es"
                  ? "Soluciones de pisos epóxicos industriales duraderos para fábricas y almacenes."
                  : "Durable industrial epoxy flooring solutions for factories and warehouses.",
                "url": "https://sobrepoxi.com/industrial-epoxy-flooring"
              }
            },
            {
              "@type": "ListItem",
              "position": 4,
              "item": {
                "@type": "Product",
                "name": locale === "es" ? "Pisos Epóxicos de Lujo y Diseño" : "Luxury & Designer Epoxy Floors",
                "description": locale === "es"
                  ? "Pisos epóxicos de lujo y diseño para residencias y espacios comerciales."
                  : "Luxury and designer epoxy floors for residences and commercial spaces.",
                "url": "https://sobrepoxi.com/luxury-design-flooring"
              }
            }
          ]
        })}
      </Script>
    </>
  );
}