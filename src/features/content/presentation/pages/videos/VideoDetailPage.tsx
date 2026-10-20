/* --------------------------------------------------------------------------
 *  Video Detail Page · SobrePoxi — Individual video watch page (Google Videos)
 * ----------------------------------------------------------------------- */

import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildWhatsAppUrl } from '@/shared/contact/whatsapp';
import { buildMetadata, SEO_CONFIG } from "@/shared/seo/seoConfig";
import {
  getVideoEntry,
  getVideos,
  getVideoFileUrls,
  buildVideoObjectJsonLd,
  getGuideBySlug,
  VIDEO_DURATION_ISO,
  VIDEO_UPLOAD_DATE,
} from "@/features/content";
import { JsonLd } from "@/shared/seo/JsonLd";
import { generateBreadcrumbSchema } from "@/shared/seo/structuredData";
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
  const params: Array<{ locale: "es" | "en"; slug: string }> = [];
  for (const locale of ["es", "en"] as const) {
    for (const { slug } of getVideos(locale)) {
      params.push({ locale, slug });
    }
  }
  return params;
}

/* ──────────── Force 404 for unknown slugs ──────────── */
export const dynamicParams = false;

/* ──────────── SEO metadata ──────────── */
export async function generateMetadata({
  params,
}: {
  params: tParams;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const entry = getVideoEntry(slug, locale);
  if (!entry) {
    return {
      title: "Página no encontrada | SobrePoxi",
      robots: { index: false, follow: false },
      alternates: {
        canonical: `https://sobrepoxi.com/${locale}/videos/${slug}`,
      },
    };
  }

  const { content } = entry;
  const { contentUrl, thumbnailUrl } = getVideoFileUrls(slug);
  const canonical = `${SEO_CONFIG.siteUrl}/${locale}/videos/${slug}`;

  const base = buildMetadata({
    locale,
    pathname: `/${locale}/videos/${slug}`,
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: content.keywords,
  });

  return {
    ...base,
    openGraph: {
      type: "video.other",
      url: canonical,
      siteName: "SobrePoxi Costa Rica",
      locale: locale === "es" ? "es_CR" : "en_US",
      title: content.metaTitle,
      description: content.metaDescription,
      images: [
        {
          url: thumbnailUrl,
          width: 1080,
          height: 1920,
          alt: content.title,
        },
      ],
      videos: [
        {
          url: contentUrl,
          width: 1080,
          height: 1920,
          type: "video/mp4",
        },
      ],
    },
  };
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                                          */
/* ══════════════════════════════════════════════════════════════════════════ */
export default async function VideoDetailPage({
  params,
}: {
  params: tParams;
}) {
  const { locale, slug } = await params;
  const entry = getVideoEntry(slug, locale);

  if (!entry) {
    notFound();
    return null; // unreachable, but satisfies TS
  }

  const { content } = entry;
  const { contentUrl, thumbnailUrl } = getVideoFileUrls(slug);
  const pageUrl = `${SEO_CONFIG.siteUrl}/${locale}/videos/${slug}`;
  const relatedGuide = getGuideBySlug(slug, locale);

  const t = {
    breadcrumbHome: locale === "es" ? "Inicio" : "Home",
    breadcrumbVideos: locale === "es" ? "Videos" : "Videos",
    backToVideos:
      locale === "es" ? "Volver a videos" : "Back to videos",
    relatedGuideTitle:
      locale === "es" ? "Guía relacionada" : "Related guide",
    readGuide: locale === "es" ? "Leer la guía completa" : "Read the full guide",
    ctaButton: locale === "es" ? "Escribir por WhatsApp" : "Message on WhatsApp",
    published: locale === "es" ? "Publicado" : "Published",
  };

  /* ── Structured Data ── */
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t.breadcrumbHome, url: `/${locale}` },
    { name: t.breadcrumbVideos, url: `/${locale}/videos` },
    { name: content.title, url: `/${locale}/videos/${slug}` },
  ]);

  const videoSchema = buildVideoObjectJsonLd({
    locale,
    pageUrl,
    video: {
      slug,
      title: content.title,
      description: content.description,
      durationISO: VIDEO_DURATION_ISO,
      uploadDate: VIDEO_UPLOAD_DATE,
    },
  });

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
      <JsonLd
        id="video-breadcrumb-schema"
        data={breadcrumbSchema}
      />
      <JsonLd
        id="video-object-schema"
        data={videoSchema}
      />

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
                href={`/${locale}/videos`}
                className="hover:text-white transition-colors"
              >
                {t.breadcrumbVideos}
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-gray-500 truncate max-w-[200px]">
                {content.title}
              </span>
            </nav>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {content.title}
            </h1>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl">
              {content.description}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                0:30
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {t.published}: {formatDate(VIDEO_UPLOAD_DATE)}
              </span>
            </div>
          </div>
        </section>

        {/* ─── Content ─── */}
        <div className="mx-auto max-w-4xl px-4 pb-16">
          {/* Video player — vertical responsivo */}
          <div className="mx-auto mb-10 w-full max-w-[420px]">
            <video
              controls
              playsInline
              preload="metadata"
              poster={thumbnailUrl}
              className="aspect-[9/16] w-full rounded-xl border border-gray-800 bg-black"
            >
              <source
                src={contentUrl}
                type="video/mp4"
              />
            </video>
          </div>

          {/* Transcript */}
          <article className="mb-12 space-y-4">
            {content.transcript.map((paragraph, i) => (
              <p key={i} className="text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </article>

          {/* ─── Related guide ─── */}
          {relatedGuide && (
            <section className="mb-12 rounded-xl border border-gray-800 bg-[#1a1a1a] p-6">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-amber-400" />
                {t.relatedGuideTitle}
              </h2>
              <p className="text-sm text-amber-400 mb-1">{relatedGuide.category}</p>
              <h3 className="text-white font-semibold mb-2">
                {relatedGuide.title}
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                {relatedGuide.metaDescription}
              </p>
              <Link
                href={`/${locale}/guias/${relatedGuide.slug}`}
                className="inline-flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300 transition-colors"
              >
                {t.readGuide}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </section>
          )}

          {/* ─── WhatsApp CTA (mismo patrón que las guías) ─── */}
          <div className="rounded-xl border border-amber-600/30 bg-gradient-to-r from-[#1f1a10] to-[#1a1a1a] p-6 md:p-8 mb-12">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-amber-400" />
              {content.title}
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              {locale === "es"
                ? "Nuestros expertos te asesoran sin compromiso"
                : "Our experts advise you with no obligation"}
            </p>
            <Link
              href={buildWhatsAppUrl(content.whatsappMessage, `video-${slug}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gold-gradient px-5 py-2.5 font-semibold text-black hover:opacity-90 transition-opacity text-sm"
            >
              {t.ctaButton}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Back link */}
          <Link
            href={`/${locale}/videos`}
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t.backToVideos}
          </Link>
        </div>
      </main>
    </>
  );
}
