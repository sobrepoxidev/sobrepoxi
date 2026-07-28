/* --------------------------------------------------------------------------
 *  CityEpoxyPage · SobrePoxi — Página de servicio local SEO dinámica
 *
 *  Componente reutilizable que renderiza cualquier ciudad desde su config
 *  en cityEpoxyData.ts. Cada ciudad genera contenido ÚNICO (clima, casos
 *  de uso, FAQ propias) — no es doorway page.
 *
 *  Usa <script type="application/ld+json"> nativo (no next/script) para
 *  que los schemas queden en el HTML SSR que lee Googlebot.
 * ----------------------------------------------------------------------- */

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/seoConfig";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/shared/seo/structuredData";
import { CITY_CONFIGS, getCityConfig, type CityEpoxyConfig } from "@/features/content";
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

/* ──────────── Helper: galería por tipo ──────────── */
function getGalleryImages(focus: CityEpoxyConfig["galleryFocus"]) {
  const coastal = [
    {
      src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/beige-gold-epoxy-floor/1.webp",
      alt: "Piso epóxico beige gold para casa de playa resistente a salinidad",
    },
    {
      src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/black-sparkle-epoxy-floor/img2.webp",
      alt: "Piso epólico negro sparkle metálico de alto rendimiento UV",
    },
    {
      src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/black-mirror-floor/mesa_sombra.webp",
      alt: "Piso epóxico espejo negro premium para villa costera",
    },
  ];
  const residential = [
    {
      src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/black-mirror-floor/mesa_sombra.webp",
      alt: "Piso epóxico negro espejo de alto brillo residencial",
    },
    {
      src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/beige-gold-epoxy-floor/1.webp",
      alt: "Piso epóxico beige gold elegante para hogar",
    },
    {
      src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/black-sparkle-epoxy-floor/img2.webp",
      alt: "Piso epólico metálico sparkle para sala moderna",
    },
  ];
  const commercial = [
    {
      src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/black-mirror-floor/mesa_sombra.webp",
      alt: "Piso epóxico comercial negro espejo alto tráfico",
    },
    {
      src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/beige-gold-epoxy-floor/1.webp",
      alt: "Piso epólico beige gold para local comercial premium",
    },
    {
      src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/black-sparkle-epoxy-floor/img2.webp",
      alt: "Piso epóxico industrial antideslizante metálico",
    },
  ];
  const industrial = [
    {
      src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/black-sparkle-epoxy-floor/img2.webp",
      alt: "Piso epóxico industrial antideslizante para bodega",
    },
    {
      src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/black-mirror-floor/mesa_sombra.webp",
      alt: "Piso epólico industrial fácil limpieza para nave",
    },
    {
      src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/beige-gold-epoxy-floor/1.webp",
      alt: "Piso epóxico industrial tricapa para montacargas",
    },
  ];
  return { coastal, residential, commercial, industrial }[focus];
}

/* ──────────── Metadata generator ──────────── */
export async function generateCityMetadata(
  slug: string,
  params: tParams
): Promise<Metadata> {
  const { locale } = await params;
  const city = getCityConfig(slug);
  if (!city) return {};

  return buildMetadata({
    locale,
    pathname: `/${locale}/pisos-epoxicos-${slug}`,
    title: city.metaTitle[locale === "es" ? "es" : "en"],
    description: city.metaDescription[locale === "es" ? "es" : "en"],
    keywords: city.keywords[locale === "es" ? "es" : "en"],
  });
}

/* ════════════════════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                                            */
/* ════════════════════════════════════════════════════════════════════════════ */
export async function CityEpoxyPage({
  slug,
  params,
}: {
  slug: string;
  params: tParams;
}) {
  const { locale } = await params;
  const city = getCityConfig(slug);

  if (!city) {
    return null;
  }

  const isEs = locale === "es";
  const gallery = getGalleryImages(city.galleryFocus);
  const faqs = city.faqs[isEs ? "es" : "en"];
  const considerations = city.climateConsiderations[isEs ? "es" : "en"];
  const useCases = city.useCases[isEs ? "es" : "en"];

  const heroTitle = city.heroTitle[isEs ? "es" : "en"];
  const heroSubtitle = city.heroSubtitle[isEs ? "es" : "en"];

  /* ── Schema: LocalBusiness + FAQ + Breadcrumb ── */
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "SobrePoxi",
    description:
      isEs
        ? `Instalación profesional de pisos epóxicos en ${city.cityName}, ${city.province}, Costa Rica. Sistemas adaptados al clima ${city.climateSignature.toLowerCase()}.`
        : `Professional epoxy floor installation in ${city.cityName}, ${city.province}, Costa Rica. Systems adapted to ${city.climateSignature.toLowerCase()} climate.`,
    url: `https://sobrepoxi.com/${locale}/pisos-epoxicos-${city.slug}`,
    telephone: "+50685850000",
    email: "info@sobrepoxi.com",
    image: "https://sobrepoxi.com/og-image.webp",
    priceRange: "$$-$$$",
    areaServed: city.coverageAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.geo.latitude,
      longitude: city.geo.longitude,
    },
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isEs ? "Inicio" : "Home", url: "/es" },
    { name: isEs ? "Pisos Epóxicos" : "Epoxy Floors", url: "/es/epoxy-floors" },
    { name: city.cityName, url: `/es/pisos-epoxicos-${city.slug}` },
  ]);

  const faqSchema = generateFAQSchema(faqs);

  const t = isEs
    ? {
        zoneTitle: `Por qué elegir un instalador que conoce ${city.cityName}`,
        galleryTitle: `Diseños populares en ${city.cityName}`,
        gallerySub: `Sistemas recomendados para ${city.cityName} según sus características.`,
        coverageTitle: "Cobertura en la zona",
        coverageSub:
          "Visita técnica gratuita en estas áreas. Para zonas remotas coordinamos viáticos.",
        useCasesTitle: `Proyectos ideales en ${city.cityName}`,
        climateTitle: `Pisos epóxicos y el clima de ${city.cityName}`,
        faqTitle: "Preguntas frecuentes",
        ctaTitle: `¿Listo para tu piso epóxico en ${city.cityName}?`,
        ctaSub:
          "Agenda tu visita técnica gratuita. Evaluamos tu concreto y te damos un presupuesto honesto sin compromiso.",
        btnQuote: `Cotizar gratis en ${city.cityName}`,
        btnCall: "Llamar ahora",
        climateData: "Datos climáticos",
        altitude: "Altitud",
        temp: "Temperatura",
        climate: "Clima",
      }
    : {
        zoneTitle: `Why choose an installer who knows ${city.cityName}`,
        galleryTitle: `Popular designs in ${city.cityName}`,
        gallerySub: `Systems recommended for ${city.cityName} based on its characteristics.`,
        coverageTitle: "Coverage in the area",
        coverageSub:
          "Free technical visit in these areas. For remote zones we coordinate travel expenses.",
        useCasesTitle: `Ideal projects in ${city.cityName}`,
        climateTitle: `Epoxy floors and ${city.cityName}'s climate`,
        faqTitle: "Frequently asked questions",
        ctaTitle: `Ready for your epoxy floor in ${city.cityName}?`,
        ctaSub:
          "Schedule your free technical visit. We evaluate your concrete and give you an honest quote with no obligation.",
        btnQuote: `Free quote in ${city.cityName}`,
        btnCall: "Call now",
        climateData: "Climate data",
        altitude: "Altitude",
        temp: "Temperature",
        climate: "Climate",
      };

  const waMsg = isEs
    ? `Hola%20SobrePoxi,%20quiero%20cotizar%20piso%20epoxico%20en%20${encodeURIComponent(
        city.cityName
      )}`
    : `Hello%20SobrePoxi,%20I%20want%20a%20quote%20for%20epoxy%20floor%20in%20${encodeURIComponent(
        city.cityName
      )}`;

  return (
    <>
      {/* Structured data — <script> nativo para SSR (Googlebot lo lee) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-[#121212] text-gray-100">
        {/* ─── HERO ─── */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#121212]" />
          <div className="relative mx-auto max-w-5xl px-4">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-400"
            >
              <Link href="/es" className="hover:text-white transition-colors">
                {isEs ? "Inicio" : "Home"}
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/es/epoxy-floors" className="hover:text-white transition-colors">
                {isEs ? "Pisos Epóxicos" : "Epoxy Floors"}
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-gray-500">{city.cityName}</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400 mb-4">
              <MapPin className="h-3 w-3" />
              {city.cityName}, {city.province}, Costa Rica
            </span>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">{heroSubtitle}</p>

            {/* Datos climáticos reales */}
            <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-400">
              <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
                <Thermometer className="h-4 w-4 text-amber-400" />
                {t.temp}: {city.tempRange.min}-{city.tempRange.max}°C
              </span>
              <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
                <MapPin className="h-4 w-4 text-amber-400" />
                {t.altitude}: {city.altitude} m
              </span>
              <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
                <Sun className="h-4 w-4 text-amber-400" />
                {t.climate}: {city.climateSignature}
              </span>
            </div>

            {/* Trust */}
            <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-amber-400" />
                {isEs ? "500+ proyectos en CR" : "500+ projects in CR"}
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-amber-400" />
                {isEs ? "Garantía escrita" : "Written warranty"}
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/50685850000?text=${waMsg}`}
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
                <Thermometer className="h-8 w-8 text-amber-400 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {isEs ? "Clima específico" : "Specific climate"}
                </h3>
                <p className="text-sm text-gray-400">
                  {isEs
                    ? `${city.cityName} tiene un clima ${city.climateSignature.toLowerCase()} único que requiere adaptaciones técnicas reales. No es lo mismo instalar epóxico aquí que en otra zona.`
                    : `${city.cityName} has a unique ${city.climateSignature.toLowerCase()} climate that requires real technical adaptations. Installing epoxy here isn't the same as in another zone.`}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#121212] p-6">
                <Clock className="h-8 w-8 text-amber-400 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {isEs ? "Sistemas adaptados" : "Adapted systems"}
                </h3>
                <p className="text-sm text-gray-400">
                  {isEs
                    ? `Seleccionamos formulaciones específicas según la temperatura (${city.tempRange.min}-${city.tempRange.max}°C) y humedad de ${city.cityName}.`
                    : `We select specific formulations based on ${city.cityName}'s temperature (${city.tempRange.min}-${city.tempRange.max}°C) and humidity.`}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#121212] p-6">
                <MapPin className="h-8 w-8 text-amber-400 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {isEs ? "Conocemos la zona" : "We know the area"}
                </h3>
                <p className="text-sm text-gray-400">
                  {isEs
                    ? `Cubrimos ${city.coverageAreas.length} zonas de ${city.cityName}. Sabemos qué sectores tienen qué tipos de construcción y retos.`
                    : `We cover ${city.coverageAreas.length} areas of ${city.cityName}. We know which sectors have what building types and challenges.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CONSIDERACIONES CLIMÁTICAS REALES ─── */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">{t.climateTitle}</h2>
            <div className="space-y-6">
              {considerations.map((c, i) => {
                const Icon =
                  c.heading.toLowerCase().includes("sal") || c.heading.toLowerCase().includes("humedad") || c.heading.toLowerCase().includes("rain") || c.heading.toLowerCase().includes("salt") || c.heading.toLowerCase().includes("moisture") || c.heading.toLowerCase().includes("mist") || c.heading.toLowerCase().includes("brum")
                    ? Droplets
                    : c.heading.toLowerCase().includes("calor") || c.heading.toLowerCase().includes("sol") || c.heading.toLowerCase().includes("uv") || c.heading.toLowerCase().includes("sun") || c.heading.toLowerCase().includes("heat") || c.heading.toLowerCase().includes("airport") || c.heading.toLowerCase().includes("aeropuerto")
                    ? Sun
                    : Thermometer;
                return (
                  <div key={i} className="rounded-xl border border-white/10 bg-[#1a1a1a] p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <Icon className="h-6 w-6 text-amber-400 mt-0.5 shrink-0" />
                      <h3 className="text-lg font-semibold text-white">{c.heading}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-300">{c.content}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── CASOS DE USO ─── */}
        <section className="py-16 bg-[#1a1a1a]">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              {t.useCasesTitle}
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {useCases.map((useCase, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-white/10 bg-[#121212] px-4 py-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-300">{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── GALERÍA ─── */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
              {t.galleryTitle}
            </h2>
            <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">{t.gallerySub}</p>
            <div className="grid gap-4 md:grid-cols-3">
              {gallery.map((img, i) => (
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
          </div>
        </section>

        {/* ─── COBERTURA ─── */}
        <section className="py-16 bg-[#1a1a1a]">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
              {t.coverageTitle}
            </h2>
            <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">{t.coverageSub}</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {city.coverageAreas.map((area, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#121212] px-3 py-2 text-sm text-gray-300"
                >
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                  <span className="text-xs leading-tight">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              {t.faqTitle}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-lg border border-white/10 bg-[#1a1a1a] overflow-hidden"
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

        {/* ─── OTRAS CIUDADES ─── */}
        <section className="py-12 bg-[#1a1a1a]">
          <div className="mx-auto max-w-4xl px-4">
            <p className="text-center text-sm text-gray-500 mb-4">
              {isEs ? "También instalamos en otras zonas:" : "We also install in other areas:"}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {CITY_CONFIGS.filter((c) => c.slug !== city.slug).map((c) => (
                <Link
                  key={c.slug}
                  href={`/es/pisos-epoxicos-${c.slug}`}
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#121212] px-3 py-1.5 text-xs text-gray-400 hover:text-amber-400 hover:border-amber-500/30 transition-colors"
                >
                  {c.cityName}
                </Link>
              ))}
              <Link
                href="/es/pisos-epoxicos-san-jose"
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#121212] px-3 py-1.5 text-xs text-gray-400 hover:text-amber-400 hover:border-amber-500/30 transition-colors"
              >
                San José
              </Link>
            </div>
          </div>
        </section>

        {/* ─── CTA FINAL ─── */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4">
            <div className="rounded-2xl border border-amber-600/30 bg-gradient-to-br from-[#1f1a10] to-[#1a1a1a] p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{t.ctaTitle}</h2>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">{t.ctaSub}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={`https://wa.me/50685850000?text=${waMsg}`}
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
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
