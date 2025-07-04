/* --------------------------------------------------------------------------
 *  AboutPage · SobrePoxi ― server component (Next 15 / app router)
 *  ------------------------------------------------------------------------
 *  – Copy totalmente renovado para la marca SobrePoxi
 *  – Inglés / Español con t() helper
 *  – Enfoque en productos y servicios de calidad inigualable
 *  – Mantiene SSR, Type-safety y SEO helpers
 * ----------------------------------------------------------------------- */

import Link                      from "next/link";
import Image                     from "next/image";
import type { Metadata }         from "next";
import { buildTitle, getCommonMetadata } from "@/lib/seo";

type ParamsPromise = Promise<{ locale: "es" | "en" }>;

/* ------------  SEO metadata  ------------ */
export async function generateMetadata(
  { params }: { params: ParamsPromise }
): Promise<Metadata> {

  const { locale } = await params;

  return {
    title: buildTitle(locale === "es" ? "Sobre SobrePoxi" : "About SobrePoxi"),
    ...getCommonMetadata(locale),
  };
}

/* ====================================================================== */
/*  MAIN COMPONENT                                                        */
/* ====================================================================== */
export default async function AboutPage({ params }: { params: ParamsPromise }) {

  const { locale } = await params;

  /* ------------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-[#121212]">

      {/* ╭──────────────────────── Hero ───────────────────────────────╮ */}
      <section className="relative overflow-hidden py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

          {/* --- Text --- */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <span className="inline-block mb-4 rounded-full bg-[#303030] px-4 py-1 text-sm font-medium text-white">
              {locale === "es" ? "Detalles de calidad" : "Quality details"}
            </span>

            <h1 className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight gold-gradient-bright">
              {locale === "es" ? "Sobre SobrePoxi" : "About SobrePoxi"}
            </h1>

            <p className="mb-6 text-lg text-gray-300">
              {locale === "es" ? "Fusionamos maderas nobles y resina epóxica de grado marino para crear muebles escultóricos y pisos artísticos que transforman espacios residenciales y comerciales." : "We fuse fine woods with marine-grade epoxy resin to craft sculptural furniture and artistic floors that elevate residential and commercial spaces."}
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                href="/products"
                className="bg-gold-gradient-90 hover:bg-gold-gradient-bright text-black font-semibold px-6 py-3 rounded-md shadow transition"
              >
                {locale === "es" ? "Explorar portafolio" : "Explore portfolio"}
              </Link>
              <Link
                href="/contact"
                className="border border-gold-gradient-60 hover:bg-gold-gradient-60 text-white px-6 py-3 rounded-md transition"
              >
                {locale === "es" ? "Solicitar cotización" : "Request a quote"}
              </Link>
            </div>
          </div>

          {/* --- Image --- */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/hero-7P2YkpjviaOMNuCSiZzgwWXpIRzcGc.webp"
              alt={locale === "es" ? "Mesa río SobrePoxi" : "SobrePoxi river table"}
              width={450}
              height={450}
              className="rounded-xl shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* ╭────────────────────── Feature Highlights ─────────────────────╮ */}
      <section className="py-12 bg-[#121212]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">

          {/* Design + Engineering */}
          <Feature
            title={locale === "es" ? "Diseño & Ingeniería" : "Design & Engineering"}
            text={locale === "es" ? "Equipos de diseño paramétrico y CNC aseguran tolerancias milimétricas y piezas irrepetibles." : "Parametric design and CNC machining guarantee millimetric tolerances and one-of-a-kind pieces."}
          />

          {/* Premium Materials */}
          <Feature
            title={locale === "es" ? "Materiales Premium" : "Premium Materials"}
            text={locale === "es" ? "Solo utilizamos resinas certificadas UV y maderas secadas en horno con trazabilidad FSC." : "We use UV-stable certified resins and kiln-dried FSC-traceable woods only."}
          />

          {/* Turn-key Service */}
          <Feature
            title={locale === "es" ? "Servicio llave en mano" : "Turn-key Service"}
            text={locale === "es" ? "Desde el render fotorrealista hasta la instalación final, coordinamos todo el proceso sin fricciones." : "From photorealistic render to final installation, we orchestrate the entire process seamlessly."}
          />
        </div>
      </section>

      {/* ╭────────────────────────── Story ─────────────────────────────╮ */}
      <section className="py-16 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2">
            <Image
              src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/creators-9xn4qjXfTeYY9FA4jgdFxQ71YWIg7z.webp"
              alt={locale === "es" ? "Fundadores de SobrePoxi" : "SobrePoxi founders"}
              width={520}
              height={350}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-4">
              {locale === "es" ? "Nuestra Historia" : "Our Story"}
            </h2>
            <p className="text-white mb-4">
              {locale === "es" ? "Nacimos en Heredia, Costa Rica, combinando la tradición maderera local con química de polímeros avanzada. Hoy exportamos piezas a diversos lugares." : "Born in Heredia, Costa Rica, we merged local woodcraft tradition with advanced polymer chemistry. Today we ship pieces to diverse locations."}
            </p>
            <p className="text-white">
              {locale === "es" ? "Cada proyecto refleja tres pilares: innovación, sostenibilidad y precisión. Así garantizamos un legado estético que trasciende modas." : "Every project reflects three pillars: innovation, sustainability and precision, ensuring an aesthetic legacy that transcends trends."}
            </p>
          </div>
        </div>
      </section>

      {/* ╭──────────────────── Mission · Vision · Values ──────────────────╮ */}
      <section className="py-16 bg-[#121212]">
        <SectionTitle>
          {locale === "es" ? "Misión, Visión y Valores" : "Mission, Vision & Values"}
        </SectionTitle>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
          <Card
            icon="✅"
            title={locale === "es" ? "Misión" : "Mission"}
            text={locale === "es" ? "Transformar espacios con arte funcional en resina y madera, superando los estándares de lujo en Latinoamérica." : "Transform spaces with functional resin-and-wood art, redefining luxury standards across Latin America."}
          />
          <Card
            icon="👁️"
            title={locale === "es" ? "Visión" : "Vision"}
            text={locale === "es" ? "Ser el referente global en soluciones epóxicas de alto diseño, reconocidos por calidad y responsabilidad ambiental." : "Become the global benchmark for high-design epoxy solutions, renowned for quality and environmental stewardship."}
          />
          <Card
            icon="❤️"
            title={locale === "es" ? "Valores" : "Values"}
            text={locale === "es" ? "Innovación · Artesanía · Precisión · Transparencia · Sostenibilidad" : "Innovation · Craftsmanship · Precision · Transparency · Sustainability"}
          />
        </div>
      </section>

      {/* ╭─────────────────────── Our Process ────────────────────────────╮ */}
      <section className="py-16 bg-[#121212]">
        <SectionTitle>{locale === "es" ? "Nuestro Proceso" : "Our Process"}</SectionTitle>

        <Timeline locale={locale} />
      </section>

      {/* ╭────────────────────────── CTA ───────────────────────────────╮ */}
      <section className="py-12 bg-[#121212] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          {locale === "es" ? "Convierte tu visión en realidad" : "Turn your vision into reality"}
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          {locale === "es" ? "Descubre cómo SobrePoxi puede elevar tu proyecto con piezas únicas y pisos que son auténticas obras de arte." : "Discover how SobrePoxi can elevate your project with one-of-a-kind pieces and artful floors."}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/products"
            className="bg-gold-gradient-90 text-black font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"
          >
            {locale === "es" ? "Ver portafolio" : "View portfolio"}
          </Link>
          <Link
            href="/contact"
            className="border border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white/10 transition"
          >
            {locale === "es" ? "Hablemos de tu proyecto" : "Let's talk about your project"}
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ╭─────────────────────────── Helpers ─────────────────────────────╮ */

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-[#121212] rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-white">{text}</p>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mb-12 px-4">
      <h2 className="text-3xl font-bold text-white">{children}</h2>
      <div className="mt-2 h-1 w-36 mx-auto bg-gold-gradient-95" />
    </div>
  );
}

function Card({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="bg-[#121212] p-6 rounded-lg shadow-sm text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-white">{text}</p>
    </div>
  );
}

/* ---------- Simple timeline component ---------- */
function Timeline({ locale }: { locale: "es" | "en" }) {

  const steps = locale === "es"
    ? [
        ["Concepto", "Escuchamos tu idea, medimos el espacio y diseñamos renders a escala."],
        ["Selección de materiales", "Elegimos maderas certificadas y paleta de resinas."],
        ["Fabricación", "Maestros ebanistas y técnicos en epoxi dan vida a la pieza."],
        ["Instalación", "Transportamos e instalamos con garantía de por vida en uniones."],
      ]
    : [
        ["Concept", "We capture your idea, survey the space and design scaled renders."],
        ["Material selection", "We choose certified woods and a bespoke resin palette."],
        ["Fabrication", "Master woodworkers and epoxy technicians bring the piece to life."],
        ["Installation", "We deliver and install on-site with lifetime joint warranty."],
      ];

  return (
    <ol className="max-w-3xl mx-auto space-y-12">
      {steps.map(([title, text], idx) => (
        <li key={idx} className="relative pl-12">
          <span className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gold-gradient-95 text-[#121212] font-bold  flex items-center justify-center">
            {idx + 1}
          </span>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-gray-300 mt-1">{text}</p>
        </li>
      ))}
    </ol>
  );
}
