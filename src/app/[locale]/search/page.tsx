import SearchResultsPage from "@/components/search/SearchResultsPage";
import type { Metadata } from "next";
import Script from "next/script";
import { buildMetadata } from "@/lib/seoConfig";

type tParams = Promise<{ locale: string, q: string }>;

export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale: locale === "es" ? "es" : "en",
    pathname: `/${locale}/search`,
    title: locale === "es" ? "Resultados de búsqueda | SobrePoxi" : "Search results | SobrePoxi",
    description: locale === "es"
      ? "Encuentra productos y servicios de SobrePoxi: muebles con resina epóxica, pisos epóxicos industriales y artísticos en Costa Rica."
      : "Find SobrePoxi products and services: epoxy resin furniture, industrial and artistic epoxy floors in Costa Rica.",
    keywords: locale === "es"
      ? "búsqueda sobrepoxi, productos muebles resina, pisos epóxicos costa rica, catálogo servicios"
      : "search sobrepoxi, resin furniture products, epoxy floors costa rica, services catalog",
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    }
  });
}

export default async function SearchPage({ params }: { params: tParams }) {
    const { locale, q='' } = await params;
  
    
    return (
      <div className="bg-[#121212]">
        <SearchResultsPage locale={locale} />
        
        {/* Schema.org markup for Search Results Page */}
        <Script id="ld-search" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SearchResultsPage",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": [],
              "numberOfItems": 0
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "SobrePoxi",
                  "item": "https://sobrepoxi.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": locale === "es" ? "Búsqueda" : "Search",
                  "item": "https://sobrepoxi.com/search"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": `${locale === "es" ? "Resultados para" : "Results for"}: ${q}`,
                  "item": `https://sobrepoxi.com/search?q=${encodeURIComponent(q)}`
                }
              ]
            }
          })}
        </Script>
      </div>
    );
}
