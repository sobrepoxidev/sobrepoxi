/* --------------------------------------------------------------------------
 *  EpoxyFloorsPage · SobrePoxi ― server component (Next 15 / app router)
 *  ------------------------------------------------------------------------
 *  – Página de servicio "Epoxy Floors" con copy bilingüe optimizado SEO
 *  – Mobile-first, dark theme con acentos dorados desde globals.css
 *  – Reutiliza helpers de SEO y respeta type-safety
 * ----------------------------------------------------------------------- */

import Image from "next/image";
import Link  from "next/link";
import type { Metadata } from "next";
import { buildTitle, getCommonMetadata } from "@/lib/seo";

// Mantener esta promesa tipada para consistencia con otras rutas
export type tParams = Promise<{ id: string; locale: "es" | "en" }>;

/* ------------  SEO metadata  ------------ */
export async function generateMetadata(
  { params }: { params: tParams }
): Promise<Metadata> {
  const { locale } = await params;

  const title       = locale === "es" ? "Pisos Epóxicos Artísticos" : "Artistic Epoxy Floors";
  const description = locale === "es"
    ? "Instalamos pisos epóxicos de lujo con diseños únicos: efecto mármol, agua, galaxias y más. Servicio llave en mano en Costa Rica y EE. UU."
    : "We install luxury artistic epoxy floors – marble, water, galaxy effects & more. Turn-key service in Costa Rica and the US.";

  return {
    title: buildTitle(title),
    description,
    keywords: [
      "epoxy floors", "pisos epóxicos", "artistic floors", "luxury flooring",
      "SobrePoxi", "Costa Rica", "resin floors"
    ],
    ...getCommonMetadata(locale),
  };
}

/* ====================================================================== */
/*  MAIN COMPONENT                                                        */
/* ====================================================================== */
export default async function EpoxyFloorsPage(
  { params }: { params: tParams }
) {
  const { locale } = await params;

  /* ----------------------------- Copy --------------------------------- */
  const t = {
    heroTag  : locale === "es" ? "Pisos Epóxicos" : "Epoxy Floors",
    heroTitle: locale === "es"
      ? "Arte que se camina"
      : "Walkable Art",
    heroSub  : locale === "es"
      ? "Transformamos superficies ordinarias en obras maestras reflectantes que elevan el valor de tu propiedad."
      : "We turn ordinary surfaces into mirror-like masterpieces that raise your property’s value.",
    ctaVisit  : locale === "es" ? "Solicitar visita técnica" : "Request site visit",
    section1T : locale === "es" ? "Ventajas clave" : "Key Advantages",
    bullets   : locale === "es" ? [
      ["Diseño ilimitado", "Efectos mármol, agua, galaxias o tu propio branding corporativo."],
      ["Durabilidad industrial", "Resina de grado marino con resistencia química y UV."],
      ["Instalación rápida", "Obras en 3-5 días con mínima interrupción de operaciones."],
    ] : [
      ["Unlimited design", "Marble, water, galaxy effects or your own corporate branding."],
      ["Industrial durability", "Marine-grade resin with UV and chemical resistance."],
      ["Fast installation", "3-5-day projects with minimal downtime."],
    ],
    processT  : locale === "es" ? "Proceso sin fricciones" : "Seamless Process",
    steps     : locale === "es" ? [
      ["Diagnóstico", "Visitamos el sitio para medir humedad y nivelación."],
      ["Render 3D", "Visualiza tu piso antes de mezclar la resina."],
      ["Vertido & Sellado", "Aplicamos capas autonivelantes y sellamos con poliuretano."],
    ] : [
      ["Site audit", "We test moisture and leveling on-site."],
      ["3D render", "Preview your floor before mixing resin."],
      ["Pour & seal", "Self-leveling coats finished with PU sealer."],
    ],
  } as const;

  /* ------------------------------------------------------------------- */
  return (
    <main className="min-h-screen bg-[#121212] text-white">
      {/* ╭──────────────────────── Hero ───────────────────────────────╮ */}
      <section className="relative overflow-hidden pb-12 pt-20 sm:pt-28">
        {/* Imagen de fondo */}
        <Image
          src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/floor-hero-W6YfOA.webp"
          alt="Epoxy floor hero"
          fill
          priority
          className="object-cover opacity-20"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
          <span className="inline-block mb-4 rounded-full bg-[#303030]/80 px-4 py-1 text-sm font-medium">
            {t.heroTag}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight gold-gradient-bright mb-4">
            {t.heroTitle}
          </h1>
          <p className="text-lg max-w-xl text-gray-300 mb-8">
            {t.heroSub}
          </p>
          <Link
            href="/contact"
            className="bg-gold-gradient-90 hover:bg-gold-gradient-bright text-black font-semibold px-6 py-3 rounded-md shadow transition"
          >
            {t.ctaVisit}
          </Link>
        </div>
      </section>

      {/* ╭────────────────────── Advantages Grid ────────────────────────╮ */}
      <section className="py-14">
        <h2 className="text-center text-3xl font-bold gold-gradient-bright mb-10">
          {t.section1T}
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {t.bullets.map(([title, text]) => (
            <div key={title} className="bg-[#1e1e1e] p-6 rounded-lg shadow-sm h-full">
              <h3 className="text-xl font-semibold mb-2 gold-gradient-bright">{title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ╭────────────────────── Process Steps ──────────────────────────╮ */}
      <section className="py-16 bg-[#181818]">
        <h2 className="text-center text-3xl font-bold gold-gradient-bright mb-12">
          {t.processT}
        </h2>
        <ol className="max-w-4xl mx-auto space-y-10 px-4">
          {t.steps.map(([title, text], idx) => (
            <li key={idx} className="relative pl-12">
              <span className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gold-gradient-95 text-[#121212] font-bold flex items-center justify-center">
                {idx + 1}
              </span>
              <h3 className="text-lg font-semibold gold-gradient-bright mb-1">
                {title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ╭────────────────────────── CTA ────────────────────────────────╮ */}
      <section className="py-20 text-center bg-[#121212]">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wide gold-gradient-bright mb-6">
          {locale === "es" ? "Listo para pisar arte?" : "Ready to walk on art?"}
        </h2>
        <Link
          href="/contact"
          className="bg-gold-gradient-bright hover:bg-gold-gradient-95 text-black font-semibold px-8 py-4 rounded-md shadow-lg transition inline-block"
        >
          {t.ctaVisit}
        </Link>
      </section>
    </main>
  );
}
