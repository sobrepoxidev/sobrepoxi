import SearchResultsPage from "@/components/search/SearchResultsPage";
import type { Metadata } from "next";
import Script from "next/script";
import { getCommonMetadata, buildTitle } from "@/lib/seo";

type tParams = Promise<{ locale: string, q: string }>;

export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: buildTitle(locale === "es" ? "Resultados de búsqueda" : "Search results"),
    ...getCommonMetadata(locale),
  };
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
