/* --------------------------------------------------------------------------
 *  Guides Index Page · SobrePoxi — SEO content hub
 *  Captures informational search traffic about epoxy resin topics
 * ----------------------------------------------------------------------- */

import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seoConfig";
import { getGuides, getGuideCategories } from "@/lib/guidesContent";
import Script from "next/script";
import { generateBreadcrumbSchema } from "@/lib/structuredData";
import { BookOpen, Clock, ArrowRight, ChevronRight } from "lucide-react";

type tParams = Promise<{ locale: "es" | "en" }>;

/* ──────────── SEO metadata ──────────── */
export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    locale,
    pathname: `/${locale}/guias`,
    title: locale === "es"
      ? "Guías sobre Resina Epóxica | Pisos, Muebles, Diseño y Más | SobrePoxi"
      : "Epoxy Resin Guides | Flooring, Furniture, Design & More | SobrePoxi",
    description: locale === "es"
      ? "Guías completas sobre resina epóxica: pisos para cocheras, interiores modernos, tipos de resina, mantenimiento, diseños tendencia y más. Aprende de los expertos en Costa Rica."
      : "Complete guides on epoxy resin: garage floors, modern interiors, resin types, maintenance, trending designs and more. Learn from the experts in Costa Rica.",
    keywords: locale === "es"
      ? "guías resina epóxica, pisos epóxicos guía, tipos resina epóxica, diseños pisos epóxicos, muebles resina epóxica, mantenimiento epóxico, blog resina epóxica Costa Rica"
      : "epoxy resin guides, epoxy flooring guide, types of epoxy resin, epoxy floor designs, epoxy resin furniture, epoxy maintenance, epoxy resin blog Costa Rica"
  });
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                                          */
/* ══════════════════════════════════════════════════════════════════════════ */
export default async function GuidesIndexPage({ params }: { params: tParams }) {
  const { locale } = await params;
  const guides = getGuides(locale);
  const categories = getGuideCategories(locale);

  const t = {
    pageTitle: locale === "es" ? "Guías y Recursos" : "Guides & Resources",
    pageSubtitle: locale === "es"
      ? "Todo lo que necesitas saber sobre resina epóxica, pisos y muebles"
      : "Everything you need to know about epoxy resin, flooring and furniture",
    allCategories: locale === "es" ? "Todas" : "All",
    readMore: locale === "es" ? "Leer guía completa" : "Read full guide",
    readingTime: locale === "es" ? "de lectura" : "read",
    ctaTitle: locale === "es"
      ? "¿Listo para tu proyecto de resina epóxica?"
      : "Ready for your epoxy resin project?",
    ctaSubtitle: locale === "es"
      ? "Nuestros expertos te asesoran sin compromiso. Contáctanos y recibe una cotización personalizada."
      : "Our experts advise you with no obligation. Contact us for a personalized quote.",
    ctaButton: locale === "es" ? "Solicitar cotización gratuita" : "Request free quote",
    breadcrumbHome: locale === "es" ? "Inicio" : "Home",
    breadcrumbGuides: locale === "es" ? "Guías" : "Guides",
  };

  /* Structured data */
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t.breadcrumbHome, url: `/${locale}` },
    { name: t.breadcrumbGuides, url: `/${locale}/guias` },
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.pageTitle,
    description: locale === "es"
      ? "Colección de guías educativas sobre resina epóxica, pisos epóxicos y muebles de resina."
      : "Collection of educational guides about epoxy resin, epoxy flooring and resin furniture.",
    url: `https://sobrepoxi.com/${locale}/guias`,
    publisher: {
      "@type": "Organization",
      name: "SobrePoxi",
      url: "https://sobrepoxi.com"
    }
  };

  return (
    <>
      <Script
        id="guides-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="guides-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <main className="min-h-screen bg-[#121212]">
        {/* ─── Hero Section ─── */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#121212]" />
          <div className="relative mx-auto max-w-6xl px-4 text-center">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-2 text-sm text-gray-400">
              <Link href={`/${locale}`} className="hover:text-white transition-colors">
                {t.breadcrumbHome}
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white">{t.breadcrumbGuides}</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-sm text-amber-400 mb-6">
              <BookOpen className="h-4 w-4" />
              <span>{locale === "es" ? "Centro de Conocimiento" : "Knowledge Center"}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {t.pageTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              {t.pageSubtitle}
            </p>
          </div>
        </section>

        {/* ─── Category Filter ─── */}
        <section className="mx-auto max-w-6xl px-4 mt-2 mb-10">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <span
                key={cat.slug}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:border-amber-500 hover:text-amber-400 transition-colors"
              >
                {cat.name}
                <span className="text-xs text-gray-500">({cat.count})</span>
              </span>
            ))}
          </div>
        </section>

        {/* ─── Guides Grid ─── */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <article
                key={guide.slug}
                className="group flex flex-col rounded-xl border border-gray-800 bg-[#1a1a1a] overflow-hidden hover:border-amber-600/50 transition-colors"
              >
                <div className="flex-1 p-6">
                  {/* Category badge */}
                  <span className="inline-block text-xs font-medium text-amber-400 bg-amber-400/10 rounded-full px-2.5 py-0.5 mb-3">
                    {guide.category}
                  </span>

                  <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    <Link href={`/${locale}/guias/${guide.slug}`} className="hover:underline">
                      {guide.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                    {guide.metaDescription}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {guide.readingTime} {t.readingTime}
                    </span>
                    <span>•</span>
                    <span>{guide.faqs.length} FAQ</span>
                  </div>
                </div>

                {/* Read more link */}
                <div className="border-t border-gray-800 px-6 py-3">
                  <Link
                    href={`/${locale}/guias/${guide.slug}`}
                    className="flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    {t.readMore}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─── CTA Section ─── */}
        <section className="bg-gradient-to-r from-[#1a1a1a] via-[#1f1a10] to-[#1a1a1a] py-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t.ctaTitle}
            </h2>
            <p className="text-gray-300 mb-8">
              {t.ctaSubtitle}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 rounded-lg bg-gold-gradient px-6 py-3 font-semibold text-black hover:opacity-90 transition-opacity"
            >
              {t.ctaButton}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
