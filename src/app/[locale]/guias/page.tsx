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
import { BookOpen, ArrowRight, ChevronRight } from "lucide-react";
import GuidesGrid from "./GuidesGrid";

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

  const gridTranslations = {
    all: locale === "es" ? "Todas" : "All",
    readMore: locale === "es" ? "Leer guía completa" : "Read full guide",
    readingTime: locale === "es" ? "de lectura" : "read",
    noResults: locale === "es" ? "No hay guías en esta categoría" : "No guides in this category",
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

  // Serialize guides to plain objects for the client component
  const guideCards = guides.map((g) => ({
    slug: g.slug,
    title: g.title,
    metaDescription: g.metaDescription,
    readingTime: g.readingTime,
    category: g.category,
    categorySlug: g.categorySlug,
    faqCount: g.faqs.length,
  }));

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
        <section className="relative py-16 md:py-24">
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

        {/* ─── Filterable Grid (Client Component) ─── */}
        <GuidesGrid
          guides={guideCards}
          categories={categories}
          locale={locale}
          translations={gridTranslations}
        />

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
