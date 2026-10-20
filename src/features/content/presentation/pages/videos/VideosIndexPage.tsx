/* --------------------------------------------------------------------------
 *  Videos Index Page · SobrePoxi — Educational video hub (Google Videos)
 * ----------------------------------------------------------------------- */

import { buildWhatsAppUrl } from '@/shared/contact/whatsapp';
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/seoConfig";
import { getVideos, getVideoFileUrls } from "@/features/content";
import { JsonLd } from "@/shared/seo/JsonLd";
import { generateBreadcrumbSchema } from "@/shared/seo/structuredData";
import { Play, Clock, ArrowRight, ChevronRight, Clapperboard } from "lucide-react";

type tParams = Promise<{ locale: "es" | "en" }>;

/* ──────────── SEO metadata ──────────── */
export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    locale,
    pathname: `/${locale}/videos`,
    title: locale === "es"
      ? "Videos: aprenda sobre resina"
      : "Videos: learn about resin",
    description: locale === "es"
      ? "Videos educativos sobre mesas río y resina epóxica: qué son, cómo nacen, cómo escoger la suya y qué podemos fabricar. SobrePoxi Costa Rica."
      : "Educational videos about river tables and epoxy resin: what they are, how they are made, how to choose yours and what we can build. SobrePoxi Costa Rica.",
    keywords: locale === "es"
      ? "videos mesa río, videos resina epóxica, aprender resina epóxica, videos SobrePoxi"
      : "river table videos, epoxy resin videos, learn epoxy resin, SobrePoxi videos"
  });
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                                          */
/* ══════════════════════════════════════════════════════════════════════════ */
export default async function VideosIndexPage({ params }: { params: tParams }) {
  const { locale } = await params;
  const videos = getVideos(locale);

  const t = {
    pageTitle: locale === "es" ? "Videos: aprenda sobre resina" : "Videos: learn about resin",
    pageSubtitle: locale === "es"
      ? "Seis videos cortos para entender las mesas río y la resina epóxica"
      : "Six short videos to understand river tables and epoxy resin",
    breadcrumbHome: locale === "es" ? "Inicio" : "Home",
    breadcrumbVideos: locale === "es" ? "Videos" : "Videos",
    watchVideo: locale === "es" ? "Ver video" : "Watch video",
    ctaTitle: locale === "es"
      ? "¿Le gustó lo que vio? Hablemos de su proyecto"
      : "Liked what you saw? Let's talk about your project",
    ctaSubtitle: locale === "es"
      ? "Escríbanos por WhatsApp y le ayudamos a darle forma a su idea."
      : "Message us on WhatsApp and we will help you shape your idea.",
    ctaButton: locale === "es" ? "Escribir por WhatsApp" : "Message on WhatsApp",
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t.breadcrumbHome, url: `/${locale}` },
    { name: t.breadcrumbVideos, url: `/${locale}/videos` },
  ]);

  const cards = videos.map((v) => ({
    slug: v.slug,
    title: v.content.title,
    description: v.content.description,
    ...getVideoFileUrls(v.slug),
  }));

  return (
    <>
      <JsonLd
        id="videos-breadcrumb-schema"
        data={breadcrumbSchema}
      />

      <main className="min-h-screen bg-[#121212]">
        {/* ─── Hero Section ─── */}
        <section className="relative py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#121212]" />
          <div className="relative mx-auto max-w-6xl px-4 text-center">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-2 text-sm text-gray-400">
              <Link href={`/${locale}`} className="hover:text-white transition-colors">
                {t.breadcrumbHome}
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white">{t.breadcrumbVideos}</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-sm text-amber-400 mb-6">
              <Clapperboard className="h-4 w-4" />
              <span>{locale === "es" ? "Aprenda en video" : "Learn on video"}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {t.pageTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              {t.pageSubtitle}
            </p>
          </div>
        </section>

        {/* ─── Video Grid ─── */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((video) => (
              <article
                key={video.slug}
                className="group flex flex-col rounded-xl border border-gray-800 bg-[#1a1a1a] overflow-hidden hover:border-amber-600/50 transition-colors"
              >
                <Link
                  href={`/${locale}/videos/${video.slug}`}
                  className="relative block aspect-[9/16] max-h-[420px] w-full overflow-hidden bg-black"
                  aria-label={`${t.watchVideo}: ${video.title}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/10">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/90 text-black">
                      <Play className="h-6 w-6 fill-current" />
                    </span>
                  </span>
                  <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
                    <Clock className="h-3 w-3" />
                    0:30
                  </span>
                </Link>

                <div className="flex-1 p-5">
                  <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    <Link href={`/${locale}/videos/${video.slug}`}>
                      {video.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-gray-400 line-clamp-3">
                    {video.description}
                  </p>
                </div>

                <div className="border-t border-gray-800 px-5 py-3">
                  <Link
                    href={`/${locale}/videos/${video.slug}`}
                    className="flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    {t.watchVideo}
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
              href={buildWhatsAppUrl(locale === "es" ? "Hola SobrePoxi, vi sus videos y quiero más información" : "Hello SobrePoxi, I watched your videos and I would like more information", "videos")}
              target="_blank"
              rel="noopener noreferrer"
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
