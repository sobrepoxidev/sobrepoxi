/* --------------------------------------------------------------------------
 *  Guide Detail Page · SobrePoxi — Individual SEO guide article
 *  Targets long-tail informational keywords about epoxy resin
 * ----------------------------------------------------------------------- */

import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seoConfig";
import {
  getGuideBySlug,
  getAllGuideSlugs,
  getRelatedGuides,
} from "@/lib/guidesContent";
import Script from "next/script";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/structuredData";
import { SEO_CONFIG } from "@/lib/seoConfig";
import {
  Clock,
  Calendar,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  BookOpen,
  MessageCircle,
} from "lucide-react";

type tParams = Promise<{ locale: "es" | "en"; slug: string }>;

/* ──────────── Static params for ISR ──────────── */
export async function generateStaticParams() {
  return getAllGuideSlugs().map(({ slug, locale }) => ({ slug, locale }));
}

/* ──────────── SEO metadata ──────────── */
export async function generateMetadata({
  params,
}: {
  params: tParams;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const foundGuide = getGuideBySlug(slug, locale);
  if (!foundGuide) return {};

  return buildMetadata({
    locale,
    pathname: `/${locale}/guias/${slug}`,
    title: foundGuide.metaTitle,
    description: foundGuide.metaDescription,
    keywords: foundGuide.keywords,
  });
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                                          */
/* ══════════════════════════════════════════════════════════════════════════ */
export default async function GuideDetailPage({
  params,
}: {
  params: tParams;
}) {
  const { locale, slug } = await params;
  const guide = getGuideBySlug(slug, locale);

  if (!guide) {
    notFound();
    return null; // unreachable, but satisfies TS
  }

  const relatedGuides = getRelatedGuides(guide);

  const t = {
    breadcrumbHome: locale === "es" ? "Inicio" : "Home",
    breadcrumbGuides: locale === "es" ? "Guías" : "Guides",
    readingTime: locale === "es" ? "de lectura" : "read",
    published: locale === "es" ? "Publicado" : "Published",
    updated: locale === "es" ? "Actualizado" : "Updated",
    faqTitle:
      locale === "es"
        ? "Preguntas frecuentes"
        : "Frequently asked questions",
    relatedTitle:
      locale === "es" ? "Guías relacionadas" : "Related guides",
    readMore: locale === "es" ? "Leer guía" : "Read guide",
    backToGuides:
      locale === "es" ? "Volver a guías" : "Back to guides",
    tableOfContents:
      locale === "es" ? "Contenido" : "Contents",
  };

  /* ── Structured Data ── */
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t.breadcrumbHome, url: `/${locale}` },
    { name: t.breadcrumbGuides, url: `/${locale}/guias` },
    { name: guide.title, url: `/${locale}/guias/${slug}` },
  ]);

  const faqSchema =
    guide.faqs.length > 0
      ? generateFAQSchema(
          guide.faqs.map((f) => ({
            question: f.question,
            answer: f.answer,
          }))
        )
      : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: guide.publishedDate,
    dateModified: guide.updatedDate,
    author: {
      "@type": "Organization",
      name: "SobrePoxi",
      url: "https://sobrepoxi.com",
    },
    publisher: {
      "@type": "Organization",
      name: "SobrePoxi",
      url: "https://sobrepoxi.com",
      logo: {
        "@type": "ImageObject",
        url: "https://sobrepoxi.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SEO_CONFIG.siteUrl}/${locale}/guias/${slug}`,
    },
    articleSection: guide.category,
    inLanguage: locale === "es" ? "es-CR" : "en-US",
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString(locale === "es" ? "es-CR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Structured data scripts */}
      <Script
        id="guide-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="guide-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <Script
          id="guide-faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="min-h-screen bg-[#121212]">
        {/* ─── Hero ─── */}
        <section className="relative py-12 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#121212]" />
          <div className="relative mx-auto max-w-4xl px-4">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-2 text-sm text-gray-400"
            >
              <Link
                href={`/${locale}`}
                className="hover:text-white transition-colors"
              >
                {t.breadcrumbHome}
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link
                href={`/${locale}/guias`}
                className="hover:text-white transition-colors"
              >
                {t.breadcrumbGuides}
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-gray-500 truncate max-w-[200px]">
                {guide.title}
              </span>
            </nav>

            {/* Category badge */}
            <span className="inline-block text-xs font-medium text-amber-400 bg-amber-400/10 rounded-full px-2.5 py-0.5 mb-4">
              {guide.category}
            </span>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {guide.heroTitle}
            </h1>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl">
              {guide.heroSubtitle}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {guide.readingTime} {t.readingTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {t.updated}: {formatDate(guide.updatedDate)}
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                {guide.sections.length}{" "}
                {locale === "es" ? "secciones" : "sections"} •{" "}
                {guide.faqs.length} FAQ
              </span>
            </div>
          </div>
        </section>

        {/* ─── Content Layout ─── */}
        <div className="mx-auto max-w-6xl px-4 pb-16 lg:flex lg:gap-10">
          {/* Sidebar — Table of Contents (desktop) */}
          <aside className="hidden lg:block lg:w-64 shrink-0">
            <div className="sticky top-24 rounded-xl border border-gray-800 bg-[#1a1a1a] p-4">
              <h2 className="text-sm font-semibold text-white mb-3">
                {t.tableOfContents}
              </h2>
              <nav className="space-y-2">
                {guide.sections.map((section, i) => (
                  <a
                    key={i}
                    href={`#section-${i}`}
                    className="block text-sm text-gray-400 hover:text-amber-400 transition-colors leading-snug"
                  >
                    {section.heading}
                  </a>
                ))}
                {guide.faqs.length > 0 && (
                  <a
                    href="#faq"
                    className="block text-sm text-gray-400 hover:text-amber-400 transition-colors leading-snug"
                  >
                    {t.faqTitle}
                  </a>
                )}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <article className="min-w-0 flex-1">
            {/* Sections */}
            {guide.sections.map((section, i) => (
              <section
                key={i}
                id={`section-${i}`}
                className="mb-10 scroll-mt-24"
              >
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                  {section.heading}
                </h2>
                <div
                  className="prose prose-invert prose-amber max-w-none
                    prose-p:text-gray-300 prose-p:leading-relaxed
                    prose-li:text-gray-300
                    prose-strong:text-white
                    prose-h3:text-lg prose-h3:font-semibold prose-h3:text-white prose-h3:mt-6 prose-h3:mb-2
                    prose-ul:space-y-1 prose-ol:space-y-1
                    prose-table:border-gray-700 prose-th:bg-gray-800 prose-th:text-white prose-th:px-3 prose-th:py-2
                    prose-td:border-gray-700 prose-td:px-3 prose-td:py-2 prose-td:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </section>
            ))}

            {/* ─── FAQ Section ─── */}
            {guide.faqs.length > 0 && (
              <section id="faq" className="mb-12 scroll-mt-24">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-amber-400" />
                  {t.faqTitle}
                </h2>
                <div className="space-y-4">
                  {guide.faqs.map((faq, i) => (
                    <details
                      key={i}
                      className="group rounded-lg border border-gray-800 bg-[#1a1a1a] overflow-hidden"
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-white font-medium hover:bg-gray-800/50 transition-colors">
                        <span>{faq.question}</span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-90" />
                      </summary>
                      <div className="px-5 pb-4 text-gray-300 text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* ─── CTA Box ─── */}
            <div className="rounded-xl border border-amber-600/30 bg-gradient-to-r from-[#1f1a10] to-[#1a1a1a] p-6 md:p-8 mb-12">
              <h3 className="text-xl font-bold text-white mb-2">
                {guide.ctaText}
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                {locale === "es"
                  ? "Nuestros expertos te asesoran sin compromiso"
                  : "Our experts advise you with no obligation"}
              </p>
              <Link
                href={`/${locale}${guide.ctaLink}`}
                className="inline-flex items-center gap-2 rounded-lg bg-gold-gradient px-5 py-2.5 font-semibold text-black hover:opacity-90 transition-opacity text-sm"
              >
                {locale === "es" ? "Contactar ahora" : "Contact now"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* ─── Related Guides ─── */}
            {relatedGuides.length > 0 && (
              <section className="mb-12">
                <h2 className="text-xl font-bold text-white mb-4">
                  {t.relatedTitle}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedGuides.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/${locale}/guias/${related.slug}`}
                      className="group rounded-lg border border-gray-800 bg-[#1a1a1a] p-4 hover:border-amber-600/50 transition-colors"
                    >
                      <span className="text-xs text-amber-400 mb-1 block">
                        {related.category}
                      </span>
                      <h3 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors mb-2 line-clamp-2">
                        {related.title}
                      </h3>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {related.readingTime}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Back link */}
            <Link
              href={`/${locale}/guias`}
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-amber-400 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {t.backToGuides}
            </Link>
          </article>
        </div>
      </main>
    </>
  );
}
