import HomePageData from './HomePageData';
import Script from "next/script";

/**
 * Componente contenedor para la página de inicio
 */
export default function HomeContainer({locale}: {locale: string}) {
  return (
    <div className="bg-[#121212]" role="main">
      <main className="bg-[#121212]">
        <HomePageData locale={locale} />
      </main>

      {/* Schema.org markup for Website */}
      <Script id="ld-website" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "SobrePoxi",
          "url": "https://sobrepoxi.com",
          "description": locale === "es"
            ? "Especialistas en pisos epóxicos y muebles de lujo en Costa Rica. Diseños únicos y acabados de alta calidad."
            : "Specialists in epoxy floors and luxury furniture in Costa Rica. Unique designs and high-quality finishes.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://sobrepoxi.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          },
          "sameAs": [
            "https://www.facebook.com/sobrepoxi",
            "https://www.instagram.com/sobrepoxi",
            "https://www.tiktok.com/@sobrepoxi",
            "https://www.youtube.com/@sobrepoxi"
          ]
        })}
      </Script>
    </div>
  );
}
