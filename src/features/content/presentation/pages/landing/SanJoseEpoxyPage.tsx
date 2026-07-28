/* --------------------------------------------------------------------------
 *  SanJoseEpoxyPage · SobrePoxi — Página de servicio local SEO
 *
 *  Página geo-optimizada para "pisos epoxicos San José Costa Rica".
 *  Contenido 100% verificable: taller físico en Vásquez de Coronado,
 *  consideraciones climáticas reales del Valle Central, schema LocalBusiness
 *  con geo-coordenadas. No es doorway page: contenido único sobre la zona.
 * ----------------------------------------------------------------------- */

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/seoConfig";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/shared/seo/structuredData";
import {
  ChevronRight,
  ArrowRight,
  Star,
  Shield,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  Sun,
  Droplets,
  Thermometer,
} from "lucide-react";

export type tParams = Promise<{ locale: "es" | "en" }>;

/* ──────────── SEO metadata ──────────── */
export async function generateMetadata({
  params,
}: {
  params: tParams;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    locale: locale === "es" ? "es" : "en",
    pathname: `/${locale}/pisos-epoxicos-san-jose`,
    title:
      locale === "es"
        ? "Pisos Epóxicos en San José, Costa Rica | Instalación Local | SobrePoxi"
        : "Epoxy Floors in San José, Costa Rica | Local Installation | SobrePoxi",
    description:
      locale === "es"
        ? "Pisos epóxicos profesionales en San José y Vásquez de Coronado. Taller local, visita técnica gratis en GAM, consideraciones climáticas del Valle Central. Cotización sin costo."
        : "Professional epoxy floors in San José and Vásquez de Coronado. Local workshop, free technical visit in the Greater Metropolitan Area, climate considerations for the Central Valley. Free quote.",
    keywords:
      locale === "es"
        ? "pisos epoxicos San José, piso epoxico Vásquez de Coronado, resina epoxica San José Costa Rica, piso garaje San José, instalador epoxico GAM, pisos epoxicos Coronado"
        : "epoxy floors San José Costa Rica, epoxy flooring Vásquez de Coronado, epoxy resin San José, garage floor San José, epoxy installer GAM, epoxy floors Coronado",
  });
}

/* ════════════════════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                                            */
/* ════════════════════════════════════════════════════════════════════════════ */
export default async function SanJoseEpoxyPage({ params }: { params: tParams }) {
  const { locale } = await params;
  const t =
    locale === "es"
      ? {
          hero: "Pisos Epóxicos en San José",
          heroSub:
            "Taller local en Vásquez de Coronado. Visita técnica gratis en todo el Gran Área Metropolitana.",
          btnQuote: "Cotizar gratis en San José",
          btnCall: "Llamar ahora",
          zoneTitle: "Por qué elegir un instalador local en San José",
        }
      : {
          hero: "Epoxy Floors in San José",
          heroSub:
            "Local workshop in Vásquez de Coronado. Free technical visit across the Greater Metropolitan Area.",
          btnQuote: "Free quote in San José",
          btnCall: "Call now",
          zoneTitle: "Why choose a local installer in San José",
        };

  /* ── Schema: LocalBusiness + FAQ + Breadcrumb ── */
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "SobrePoxi",
    description:
      locale === "es"
        ? "Instalación profesional de pisos epóxicos en San José, Costa Rica. Taller en Vásquez de Coronado, visita técnica gratuita en el Gran Área Metropolitana."
        : "Professional epoxy floor installation in San José, Costa Rica. Workshop in Vásquez de Coronado, free technical visit in the Greater Metropolitan Area.",
    url: "https://sobrepoxi.com/es/pisos-epoxicos-san-jose",
    telephone: "+50685850000",
    email: "info@sobrepoxi.com",
    image: "https://sobrepoxi.com/og-image.webp",
    priceRange: "$$-$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Centro Comercial Velasuma, 2da Planta local No. 9, San Isidro Downtown",
      addressLocality: "Vásquez de Coronado",
      addressRegion: "San José",
      postalCode: "11101",
      addressCountry: "CR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 9.9355431,
      longitude: -84.1545449,
    },
    areaServed: [
      { "@type": "City", name: "San José" },
      { "@type": "City", name: "Vásquez de Coronado" },
      { "@type": "City", name: "Escazú" },
      { "@type": "City", name: "Santa Ana" },
      { "@type": "City", name: "Tibás" },
      { "@type": "City", name: "Montes de Oca" },
      { "@type": "City", name: "Curridabat" },
      { "@type": "City", name: "Goicoechea" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: locale === "es" ? "Inicio" : "Home", url: "/es" },
    { name: locale === "es" ? "Pisos Epóxicos" : "Epoxy Floors", url: "/es/epoxy-floors" },
    { name: locale === "es" ? "San José" : "San José", url: "/es/pisos-epoxicos-san-jose" },
  ]);

  const faqs =
    locale === "es"
      ? [
          {
            question: "¿Hacen visitas técnicas gratis en todo San José?",
            answer:
              "Sí. La visita técnica de evaluación es gratuita en todo el cantón central de San José y la Gran Área Metropolitana (Escazú, Santa Ana, Tibás, Montes de Oca, Curridabat, Goicoechea, Vásquez de Coronado). Para zonas fuera de la GAM coordinamos viáticos.",
          },
          {
            question: "¿Cuánto demora la instalación de un piso epóxico en San José?",
            answer:
              "Entre 3 y 5 días hábiles para un sistema residencial completo. El clima del Valle Central (temperatura estable 18-25°C, humedad moderada) favorece un curado óptimo, lo que permite programar proyectos casi todo el año.",
          },
          {
            question: "¿El clima de San José afecta la instalación del piso epóxico?",
            answer:
              "El Valle Central tiene clima templado estable, ideal para epóxico. La única consideración es la temporada de lluvias (mayo-noviembre): el concreto debe estar seco (máximo 4.5% de humedad con medidor) antes de aplicar. Hacemos prueba de humedad obligatoria en cada visita técnica.",
          },
          {
            question: "¿Dónde está ubicado el taller de SobrePoxi en San José?",
            answer:
              "Nuestro taller está en el Centro Comercial Velasuma, local 9, San Isidro de Vásquez de Coronado. Atendemos de lunes a viernes de 8am a 5pm y sábados de 8am a 12md. Podés agendar una visita para ver muestras físicas de pisos y mesas de resina.",
          },
        ]
      : [
          {
            question: "Do you offer free technical visits throughout San José?",
            answer:
              "Yes. The technical evaluation visit is free throughout central San José and the Greater Metropolitan Area (Escazú, Santa Ana, Tibás, Montes de Oca, Curridabat, Goicoechea, Vásquez de Coronado). For areas outside the GAM we coordinate travel expenses.",
          },
          {
            question: "How long does epoxy floor installation take in San José?",
            answer:
              "Between 3 and 5 business days for a complete residential system. The Central Valley climate (stable temperature 18-25°C, moderate humidity) favors optimal curing, allowing us to schedule projects almost year-round.",
          },
          {
            question: "Does San José's climate affect epoxy floor installation?",
            answer:
              "The Central Valley has stable mild weather, ideal for epoxy. The only consideration is the rainy season (May-November): concrete must be dry (maximum 4.5% moisture with meter) before application. We do mandatory moisture testing on every technical visit.",
          },
          {
            question: "Where is the SobrePoxi workshop located in San José?",
            answer:
              "Our workshop is at Centro Comercial Velasuma, local 9, San Isidro de Vásquez de Coronado. Open Monday to Friday 8am-5pm and Saturdays 8am-12pm. You can schedule a visit to see physical samples of floors and resin tables.",
          },
        ];

  const faqSchema = generateFAQSchema(faqs);

  /* ── Galería (imágenes reales de pisos del catálogo) ── */
  const galleryImages = [
    {
      src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/black-mirror-floor/mesa_sombra.webp",
      alt: "Piso epóxico negro espejo instalado en San José Costa Rica",
    },
    {
      src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/black-sparkle-epoxy-floor/img2.webp",
      alt: "Piso epóxico negro sparkle metálico en residencia del Valle Central",
    },
    {
      src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/beige-gold-epoxy-floor/1.webp",
      alt: "Piso epóxico beige gold elegante para hogar en San José",
    },
  ];

  /* ── Zonas que cubrimos en San José (reales, verificables) ── */
  const zonasCobertura =
    locale === "es"
      ? [
          "Cantón Central de San José",
          "Vásquez de Coronado (sede del taller)",
          "Escazú",
          "Santa Ana",
          "Tibás",
          "Montes de Oca (San Pedro)",
          "Curridabat",
          "Goicoechea",
          "Moravia",
          "La Unión",
        ]
      : [
          "Central San José Canton",
          "Vásquez de Coronado (workshop HQ)",
          "Escazú",
          "Santa Ana",
          "Tibás",
          "Montes de Oca (San Pedro)",
          "Curridabat",
          "Goicoechea",
          "Moravia",
          "La Unión",
        ];

  return (
    <>
      {/* Structured data */}
      <Script
        id="sanjose-localbusiness-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="sanjose-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="sanjose-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-[#121212] text-gray-100">
        {/* ─── HERO ─── */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#121212]" />
          <div className="relative mx-auto max-w-5xl px-4">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-400"
            >
              <Link href="/es" className="hover:text-white transition-colors">
                {locale === "es" ? "Inicio" : "Home"}
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/es/epoxy-floors" className="hover:text-white transition-colors">
                {locale === "es" ? "Pisos Epóxicos" : "Epoxy Floors"}
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-gray-500">San José</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400 mb-4">
              <MapPin className="h-3 w-3" />
              {locale === "es" ? "San José, Costa Rica" : "San José, Costa Rica"}
            </span>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {t.hero}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
              {t.heroSub}
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-amber-400" />
                {locale === "es" ? "500+ proyectos en CR" : "500+ projects in CR"}
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-amber-400" />
                {locale === "es" ? "Garantía escrita" : "Written warranty"}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-amber-400" />
                {locale === "es" ? "Taller en Coronado" : "Workshop in Coronado"}
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/50685850000?text=Hola%20SobrePoxi,%20quiero%20cotizar%20piso%20epoxico%20en%20San%20José"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gold-gradient px-6 py-3 font-semibold text-black hover:opacity-90 transition-opacity"
              >
                {t.btnQuote}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="tel:+50685850000"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/5 transition-colors"
              >
                <Phone className="h-4 w-4" />
                {t.btnCall}
              </a>
            </div>
          </div>
        </section>

        {/* ─── POR QUÉ LOCAL ─── */}
        <section className="py-16 bg-[#1a1a1a]">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              {t.zoneTitle}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-[#121212] p-6">
                <Clock className="h-8 w-8 text-amber-400 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {locale === "es" ? "Respuesta rápida" : "Fast response"}
                </h3>
                <p className="text-sm text-gray-400">
                  {locale === "es"
                    ? "Al estar en Vásquez de Coronado, visitamos cualquier punto de San José en 24-48 horas. Sin esperas de semanas como con empresas de afuera."
                    : "Based in Vásquez de Coronado, we visit any point in San José within 24-48 hours. No week-long waits like out-of-area companies."}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#121212] p-6">
                <Thermometer className="h-8 w-8 text-amber-400 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {locale === "es" ? "Conocemos el clima" : "We know the climate"}
                </h3>
                <p className="text-sm text-gray-400">
                  {locale === "es"
                    ? "El Valle Central tiene condiciones únicas: temperaturas estables pero lluvias intensas de mayo a noviembre. Adaptamos el sistema y el curado a cada estación."
                    : "The Central Valley has unique conditions: stable temperatures but heavy rains from May to November. We adapt the system and curing to each season."}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#121212] p-6">
                <MapPin className="h-8 w-8 text-amber-400 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {locale === "es" ? "Visita nuestro taller" : "Visit our workshop"}
                </h3>
                <p className="text-sm text-gray-400">
                  {locale === "es"
                    ? "Centro Comercial Velasuma, Coronado. Vení a ver muestras físicas de pisos y mesas antes de decidir. Sin sorpresas."
                    : "Centro Comercial Velasuma, Coronado. Come see physical samples of floors and tables before deciding. No surprises."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CONSIDERACIONES CLIMÁTICAS DEL VALLE CENTRAL ─── */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              {locale === "es"
                ? "Pisos epóxicos y el clima del Valle Central"
                : "Epoxy floors and the Central Valley climate"}
            </h2>
            <div className="space-y-6 text-gray-300">
              <div className="rounded-xl border border-white/10 bg-[#1a1a1a] p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Sun className="h-6 w-6 text-amber-400 mt-0.5 shrink-0" />
                  <h3 className="text-lg font-semibold text-white">
                    {locale === "es"
                      ? "Temporada seca (diciembre - abril)"
                      : "Dry season (December - April)"}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed">
                  {locale === "es"
                    ? "La época ideal para instalación. Baja humedad ambiental, sol constante y temperaturas entre 20-28°C permiten un curado óptimo del epóxico. Es cuando programamos la mayoría de proyectos grandes sin riesgo de retrasos."
                    : "The ideal time for installation. Low ambient humidity, constant sun and temperatures between 20-28°C allow optimal epoxy curing. This is when we schedule most large projects without risk of delays."}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#1a1a1a] p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Droplets className="h-6 w-6 text-amber-400 mt-0.5 shrink-0" />
                  <h3 className="text-lg font-semibold text-white">
                    {locale === "es"
                      ? "Temporada de lluvias (mayo - noviembre)"
                      : "Rainy season (May - November)"}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed">
                  {locale === "es"
                    ? "Se puede instalar igual, pero con precauciones: el concreto debe medir máximo 4.5% de humedad con medidor profesional antes de aplicar. Hacemos esta prueba obligatoria en cada visita técnica. En zonas de San José con drenaje deficiente o napas altas, podemos recomendar sistemas con barrera de humedad reforzada."
                    : "Installation is still possible, but with precautions: concrete must measure maximum 4.5% moisture with a professional meter before application. We do this mandatory test on every technical visit. In San José areas with poor drainage or high water tables, we can recommend systems with reinforced moisture barriers."}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#1a1a1a] p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Thermometer className="h-6 w-6 text-amber-400 mt-0.5 shrink-0" />
                  <h3 className="text-lg font-semibold text-white">
                    {locale === "es"
                      ? "Ventaja del Valle Central vs zonas costeras"
                      : "Central Valley advantage vs coastal areas"}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed">
                  {locale === "es"
                    ? "A diferencia de Guanacaste o Puntarenas (calor extremo + salinidad), San José tiene clima templado que favorece el curado lento y uniforme del epóxico. Esto se traduce en mayor durabilidad y menos riesgo de ampollamiento por humedad ascendente. Por eso el Valle Central es la zona más segura de Costa Rica para instalar pisos epóxicos."
                    : "Unlike Guanacaste or Puntarenas (extreme heat + salinity), San José has a mild climate that favors slow, uniform epoxy curing. This translates to greater durability and less risk of blistering from rising moisture. That's why the Central Valley is the safest zone in Costa Rica for epoxy floor installation."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── GALERÍA DE PROYECTOS ─── */}
        <section className="py-16 bg-[#1a1a1a]">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
              {locale === "es"
                ? "Diseños populares en San José"
                : "Popular designs in San José"}
            </h2>
            <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
              {locale === "es"
                ? "Los sistemas más solicitados por residencias y comercios del Valle Central."
                : "The most requested systems by residences and businesses in the Central Valley."}
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/es/epoxy-floors"
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-medium"
              >
                {locale === "es" ? "Ver todos los diseños" : "View all designs"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── ZONA DE COBERTURA ─── */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              {locale === "es"
                ? "Cobertura en la Gran Área Metropolitana"
                : "Coverage in the Greater Metropolitan Area"}
            </h2>
            <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
              {locale === "es"
                ? "Visita técnica gratuita en todos estos cantones de San José. Para proyectos fuera de la GAM coordinamos viáticos."
                : "Free technical visit in all these San José cantons. For projects outside the GAM we coordinate travel expenses."}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {zonasCobertura.map((zona, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-300"
                >
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                  <span className="text-xs leading-tight">{zona}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-16 bg-[#1a1a1a]">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              {locale === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-lg border border-white/10 bg-[#121212] overflow-hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-white font-medium hover:bg-white/5 transition-colors">
                    <span>{faq.question}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-5 pb-4 text-gray-300 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA FINAL ─── */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4">
            <div className="rounded-2xl border border-amber-600/30 bg-gradient-to-br from-[#1f1a10] to-[#1a1a1a] p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {locale === "es"
                  ? "¿Listo para tu piso epóxico en San José?"
                  : "Ready for your epoxy floor in San José?"}
              </h2>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                {locale === "es"
                  ? "Agenda tu visita técnica gratuita. Evaluamos tu concreto, medimos humedad y te damos un presupuesto honesto sin compromiso."
                  : "Schedule your free technical visit. We evaluate your concrete, measure moisture and give you an honest quote with no obligation."}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://wa.me/50685850000?text=Hola%20SobrePoxi,%20quiero%20cotizar%20piso%20epoxico%20en%20San%20José"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-gold-gradient px-6 py-3 font-semibold text-black hover:opacity-90 transition-opacity"
                >
                  {t.btnQuote}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="tel:+50685850000"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/5 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +506 8585-0000
                </a>
              </div>
              <p className="text-xs text-gray-500 mt-6">
                <MapPin className="inline h-3 w-3 mr-1" />
                {locale === "es"
                  ? "Taller: Centro Comercial Velasuma, local 9, San Isidro de Vásquez de Coronado, San José"
                  : "Workshop: Centro Comercial Velasuma, local 9, San Isidro de Vásquez de Coronado, San José"}
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
