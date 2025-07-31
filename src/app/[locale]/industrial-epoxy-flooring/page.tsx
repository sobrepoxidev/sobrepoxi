/* --------------------------------------------------------------------------
 *  IndustrialEpoxyFlooringPage · SobrePoxi ― server component (Next 15 / app router)
 *  ------------------------------------------------------------------------
 *  – Industrial epoxy flooring landing page with bilingual SEO-optimized copy
 *  – Mobile-first, dark theme with gold accents from globals.css
 *  – Reuses SEO helpers and respects type-safety
 * ----------------------------------------------------------------------- */

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { buildTitle, getCommonMetadata } from "@/lib/seo";
import Script from "next/script";

// Keep this typed promise for consistency with other routes
export type tParams = Promise<{ id: string; locale: "es" | "en" }>;

/* ------------  SEO metadata  ------------ */
export async function generateMetadata(
  { params }: { params: tParams }
): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === "es" ? "Pisos Epóxicos Industriales y de Alto Rendimiento" : "Industrial & High-Performance Epoxy Flooring";
  const description = locale === "es"
    ? "Soluciones de pisos epóxicos industriales duraderos para fábricas, almacenes e instalaciones de grado alimenticio en Costa Rica. Resistentes a químicos y alto tráfico."
    : "Durable industrial epoxy flooring solutions for factories, warehouses, and food-grade facilities in Costa Rica. Chemical-resistant and high-traffic ready.";

  return {
    title: buildTitle(title),
    description,
    keywords: [
      "industrial epoxy floors", "pisos epóxicos industriales", "high-performance flooring", "pisos de alto rendimiento",
      "chemical resistant floors", "food-grade epoxy", "warehouse flooring", "factory floors", "Costa Rica"
    ],
    ...getCommonMetadata(locale),
  };
}

/* ====================================================================== */
/*  MAIN COMPONENT                                                        */
/* ====================================================================== */
export default async function IndustrialEpoxyFlooringPage(
  { params }: { params: tParams }
) {
  const { locale } = await params;

  /* ----------------------------- Copy --------------------------------- */
  const t = {
    heroTag: locale === "es" ? "Pisos Epóxicos Industriales" : "Industrial Epoxy Flooring",
    heroTitle: locale === "es"
      ? "Soluciones de alto rendimiento"
      : "High-Performance Solutions",
    heroSub: locale === "es"
      ? "Pisos duraderos y resistentes para entornos industriales exigentes en Costa Rica."
      : "Durable and resistant floors for demanding industrial environments in Costa Rica.",
    ctaVisit: locale === "es" ? "Solicitar evaluación técnica" : "Request Technical Assessment",

    // Industry Applications Section
    industriesTitle: locale === "es" ? "Aplicaciones por Industria" : "Applications by Industry",
    industries: locale === "es" ? [
      ["Alimentaria", "Superficies sanitarias que cumplen con normativas de inocuidad alimentaria."],
      ["Manufactura", "Pisos resistentes a impactos, abrasión y tráfico pesado constante."],
      ["Automotriz", "Resistencia a aceites, combustibles y productos químicos agresivos."],
      ["Almacenes", "Superficies de alto tránsito con señalización de seguridad integrada."],
      ["Farmacéutica", "Ambientes controlados con acabados antimicrobianos disponibles."],
      ["Hospitales", "Pisos higiénicos, fáciles de limpiar y desinfectar."],
    ] : [
      ["Food & Beverage", "Sanitary surfaces that comply with food safety regulations."],
      ["Manufacturing", "Floors resistant to impacts, abrasion, and constant heavy traffic."],
      ["Automotive", "Resistance to oils, fuels, and aggressive chemicals."],
      ["Warehousing", "High-traffic surfaces with integrated safety signage."],
      ["Pharmaceutical", "Controlled environments with antimicrobial finishes available."],
      ["Healthcare", "Hygienic floors, easy to clean and disinfect."],
    ],

    // Technical Specifications Section
    techSpecsTitle: locale === "es" ? "Especificaciones Técnicas" : "Technical Specifications",
    techSpecs: locale === "es" ? [
      ["Resistencia a la compresión", ">50 N/mm²"],
      ["Resistencia química", "Excelente (ácidos, álcalis, solventes)"],
      ["Propiedades antideslizantes", "Personalizable (R9-R13)"],
      ["Grado alimenticio", "Disponible (certificado)"],
      ["Espesor", "2-6 mm según requerimientos"],
      ["Tiempo de curado", "Tráfico ligero: 24h / Completo: 7 días"],
    ] : [
      ["Compressive strength", ">50 N/mm²"],
      ["Chemical resistance", "Excellent (acids, alkalis, solvents)"],
      ["Anti-slip properties", "Customizable (R9-R13)"],
      ["Food-grade", "Available (certified)"],
      ["Thickness", "2-6 mm according to requirements"],
      ["Curing time", "Light traffic: 24h / Full: 7 days"],
    ],

    // Case Studies Section
    caseStudiesTitle: locale === "es" ? "Casos de Estudio" : "Case Studies",
    caseStudiesSubtitle: locale === "es"
      ? "Descubra cómo nuestras soluciones de pisos epóxicos industriales han transformado espacios de trabajo en Costa Rica."
      : "Discover how our industrial epoxy flooring solutions have transformed workspaces in Costa Rica.",
    caseStudyComingSoon: locale === "es" ? "Próximamente" : "Coming Soon",

    // Benefits Section
    benefitsTitle: locale === "es" ? "Beneficios clave" : "Key Benefits",
    benefits: locale === "es" ? [
      ["Durabilidad superior", "Diseñados para soportar condiciones industriales extremas durante años."],
      ["Mantenimiento mínimo", "Fácil de limpiar, resistente a manchas y no requiere encerado."],
      ["Seguridad mejorada", "Opciones antideslizantes y señalización integrada disponibles."],
      ["Instalación rápida", "Minimiza el tiempo de inactividad con sistemas de curado rápido."],
      ["Personalizable", "Colores, acabados y niveles de resistencia adaptados a sus necesidades."],
      ["Cumplimiento normativo", "Satisface requisitos HACCP, OSHA y otras regulaciones industriales."],
    ] : [
      ["Superior durability", "Designed to withstand extreme industrial conditions for years."],
      ["Minimal maintenance", "Easy to clean, stain-resistant, and requires no waxing."],
      ["Enhanced safety", "Anti-slip options and integrated signage available."],
      ["Rapid installation", "Minimizes downtime with quick-curing systems."],
      ["Customizable", "Colors, finishes, and resistance levels tailored to your needs."],
      ["Regulatory compliance", "Meets HACCP, OSHA, and other industrial regulations."],
    ],
  } as const;

  /* ------------------------------------------------------------------- */
  return (
    <main className="min-h-screen bg-[#121212] text-white">
      {/* Schema.org markup is at the bottom of the page */}

      {/* ╭──────────────────────── Hero ───────────────────────────────╮ */}
      <section className="relative overflow-hidden pb-12 pt-2 sm:pt-28">
        {/* Background image */}
        <Image
          src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/industrial-floor.webp"
          alt="Industrial epoxy flooring for warehouses and factories in Costa Rica"
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
          <span className="inline-block px-4 py-1 bg-[#1e1e1e] text-gray-300 rounded-full text-sm mb-4">
            {locale === "es" ? "Alto Rendimiento" : "High Performance"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold gold-gradient-bright mb-4">
            {t.heroTag}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            {t.heroTitle}: {t.heroSub}
          </p>
          <Link
            href="/contact"
            className="bg-gold-gradient-90 hover:bg-gold-gradient-bright text-black font-semibold px-6 py-3 rounded-md shadow transition"
          >
            {t.ctaVisit}
          </Link>
        </div>
      </section>

      {/* ╭────────────────── Industry Applications ────────────────────╮ */}
      <section className="py-16 bg-[#181818]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold gold-gradient-bright text-center mb-12">
            {t.industriesTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.industries.map(([industry, description], idx) => (
              <div key={idx} className="bg-[#1e1e1e] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold gold-gradient-bright mb-3">{industry}</h3>
                <p className="text-gray-300 text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╭────────────────── Technical Specifications ────────────────────╮ */}
      <section className="py-16 bg-[#121212]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold gold-gradient-bright text-center mb-12">
            {t.techSpecsTitle}
          </h2>
          <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-lg">
            <table className="w-full">
              <tbody>
                {t.techSpecs.map(([property, value], idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-[#1e1e1e]' : 'bg-[#252525]'}>
                    <td className="py-4 px-6 font-medium">{property}</td>
                    <td className="py-4 px-6 text-gray-300">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ╭────────────────── Case Studies ────────────────────╮ */}
      <section className="py-16 bg-[#181818]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold gold-gradient-bright text-center mb-4">
            {t.caseStudiesTitle}
          </h2>
          <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            {t.caseStudiesSubtitle}
          </p>

          {/* Real case studies with before/after descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-md">
              <div className="relative w-full h-75"> {/* Ajusta altura como desees */}
                <Image
                  src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/after-before.webp"
                  alt={locale === "es" ? "Antes y después piso epóxico" : "Before and After epoxy floor"}
                  fill
                  className="object-cover"
               
                />
              
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold gold-gradient-bright mb-2">
                  {locale === "es" ? "Planta de Producción Alimentaria en Coyol, Alajuela" : "Food Production Facility in Coyol, Alajuela"}
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  {locale === "es"
                    ? "Instalación de 1,200 m² de piso epóxico grado alimenticio con certificación HACCP para una empresa procesadora de alimentos."
                    : "Installation of 1,200 m² of food-grade epoxy flooring with HACCP certification for a food processing company."}
                </p>
                <p className="text-gray-300 text-sm">
                  {locale === "es"
                    ? "El cliente necesitaba reemplazar un piso deteriorado que no cumplía con los estándares sanitarios. Implementamos un sistema epóxico de grado alimenticio que resistió inspecciones rigurosas y mejoró la seguridad operativa."
                    : "The client needed to replace a deteriorated floor that didn't meet sanitary standards. We implemented a food-grade epoxy system that passed rigorous inspections and improved operational safety."}
                </p>
              </div>
            </div>

            <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-md">
              <div className="relative w-full h-75">
                <Image
                  src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/industrial.webp"
                  alt={locale === "es" ? "Centro logístico industrial" : "Industrial logistics center"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold gold-gradient-bright mb-2">
                  {locale === "es" ? "Centro de Distribución Logística en Zona Franca Metropolitana" : "Logistics Distribution Center in Metropolitan Free Zone"}
                </h3>
                <p className="text-gray-300 text-sm">
                  {locale === "es"
                    ? "Piso de alto tránsito con señalización integrada para optimizar operaciones de almacén."
                    : "High-traffic flooring with integrated signage to optimize warehouse operations."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ╭────────────────── Benefits ────────────────────╮ */}
      <section className="py-16 bg-[#121212]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold gold-gradient-bright text-center mb-12">
            {t.benefitsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.benefits.map(([title, text], idx) => (
              <div key={idx} className="bg-[#1e1e1e] p-6 rounded-lg shadow-sm h-full">
                <h3 className="text-xl font-semibold mb-2 gold-gradient-bright">{title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╭────────────────────────── CTA ────────────────────────────────╮ */}
      <section className="py-16 text-center bg-[#181818]">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wide gold-gradient-bright mb-6">
          {locale === "es" ? "¿Listo para mejorar sus instalaciones?" : "Ready to upgrade your facilities?"}
        </h2>
        <Link
          href="/contact"
          className="bg-gold-gradient-bright hover:bg-gold-gradient-95 text-black font-semibold px-8 py-4 rounded-md shadow-lg transition inline-block"
        >
          {t.ctaVisit}
        </Link>
      </section>
      <Script id="ld-industrial-service" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Industrial Epoxy Flooring",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Sobrepoxi"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Costa Rica"
          },
          "description": locale === "es"
            ? "Soluciones de pisos epóxicos industriales duraderos para fábricas, almacenes e instalaciones de grado alimenticio en Costa Rica. Resistentes a químicos y alto tráfico."
            : "Durable industrial epoxy flooring solutions for factories, warehouses, and food-grade facilities in Costa Rica. Chemical-resistant and high-traffic ready.",
          "offers": {
            "@type": "Offer",
            "areaServed": "Costa Rica"
          },
          "category": ["Industrial Flooring", "High-Performance Epoxy", "Commercial Floors", "Food-Grade Flooring"],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Industrial Epoxy Flooring Solutions",
            "itemListElement": [
              {
                "@type": "OfferCatalog",
                "name": "Chemical-Resistant Epoxy"
              },
              {
                "@type": "OfferCatalog",
                "name": "Food-Grade Epoxy Systems"
              },
              {
                "@type": "OfferCatalog",
                "name": "High-Traffic Industrial Coatings"
              }
            ]
          }
        })}
      </Script>
    </main>



  );
}