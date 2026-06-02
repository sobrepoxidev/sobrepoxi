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
import Script                    from "next/script";
import type { Metadata }         from "next";
import { buildMetadata } from "@/shared/seo/seoConfig";

type ParamsPromise = Promise<{ locale: "es" | "en" }>;

/* ------------  SEO metadata  ------------ */
export async function generateMetadata(
  { params }: { params: ParamsPromise }
): Promise<Metadata> {

  const { locale } = await params;

  return buildMetadata({
    locale: locale === "es" ? "es" : "en",
    pathname: `/${locale}/about`,
    title: locale === "es"
      ? "Acerca de SobrePoxi | Muebles con resina epóxica y pisos epóxicos"
      : "About SobrePoxi | Epoxy resin furniture and epoxy floors",
    description: locale === "es"
      ? "Conoce la historia de SobrePoxi, empresa líder en Costa Rica en muebles con resina epóxica y pisos epóxicos industriales. Calidad, innovación y diseño personalizado."
      : "Learn about SobrePoxi's story, leading company in Costa Rica for epoxy resin furniture and industrial epoxy floors. Quality, innovation and custom design.",
    keywords: locale === "es"
      ? "sobre sobrepoxi, historia empresa, muebles resina epóxica costa rica, pisos epóxicos industriales, calidad garantizada"
      : "about sobrepoxi, company history, epoxy resin furniture costa rica, industrial epoxy floors, guaranteed quality"
  });
}

/* ====================================================================== */
/*  MAIN COMPONENT                                                        */
/* ====================================================================== */
export default async function AboutPage({ params }: { params: ParamsPromise }) {

  const { locale } = await params;

  /* ------------------------------------------------------------------- */
  return (
    <>
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
              {locale === "es" ? "Fusionando Arte e Ingeniería" : "Fusing Art and Engineering"}
            </h1>

            <p className="mb-6 text-lg text-gray-300">
              {locale === "es" ? "En SobrePoxi, unimos dos mundos: la precisión de la ingeniería para crear pisos industriales de máxima durabilidad y la sensibilidad del arte para diseñar pisos y muebles de lujo que se convierten en el alma de un espacio. Con sede en Costa Rica, nuestra pasión es transformar materiales en experiencias únicas." : "At SobrePoxi, we unite two worlds: the precision of engineering to create maximum-durability industrial floors, and the sensitivity of art to design luxury floors and furniture that become the soul of a space. Based in Costa Rica, our passion is to transform materials into unique experiences."}
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

      {/* ╭────────────────────── Our 3 Areas of Specialization ─────────────────────╮ */}
      <section className="py-16 bg-[#121212]">
        <SectionTitle>
          {locale === "es" ? "Un Portafolio, Tres Especialidades" : "One Portfolio, Three Specialties"}
        </SectionTitle>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
          {/* Luxury & Design Flooring */}
          <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg">
            <div className="h-48 overflow-hidden">
              <Image 
                src="/home/luxury-floor.webp" 
                alt={locale === "es" ? "Piso epóxico de lujo" : "Luxury epoxy floor"}
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                {locale === "es" ? "Pisos de Lujo y Diseño" : "Luxury & Design Flooring"}
              </h3>
              <p className="text-gray-300 mb-4">
                {locale === "es" ? "Superficies artísticas que definen residencias y espacios comerciales con acabados tipo mármol, metálicos y personalizados." : "Artistic surfaces that define residences and commercial spaces with marble-like, metallic, and custom finishes."}
              </p>
              <Link
                href="/luxury-design-flooring"
                className="inline-block bg-gold-gradient-90 hover:bg-gold-gradient-bright text-black font-medium px-4 py-2 rounded-md transition"
              >
                {locale === "es" ? "Ver Diseños" : "View Designs"}
              </Link>
            </div>
          </div>

          {/* Industrial & Commercial Flooring */}
          <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg">
            <div className="h-48 overflow-hidden">
              <Image 
                src="/home/industrial-floor.webp" 
                alt={locale === "es" ? "Piso epóxico industrial" : "Industrial epoxy floor"}
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                {locale === "es" ? "Pisos Industriales y Comerciales" : "Industrial & Commercial Flooring"}
              </h3>
              <p className="text-gray-300 mb-4">
                {locale === "es" ? "Soluciones de alto rendimiento para almacenes, plantas de grado alimenticio y talleres. Durabilidad, seguridad y cumplimiento normativo." : "High-performance solutions for warehouses, food-grade plants, and workshops. Durability, safety, and compliance."}
              </p>
              <Link
                href="/industrial-epoxy-flooring"
                className="inline-block bg-gold-gradient-90 hover:bg-gold-gradient-bright text-black font-medium px-4 py-2 rounded-md transition"
              >
                {locale === "es" ? "Ver Soluciones Técnicas" : "See Technical Solutions"}
              </Link>
            </div>
          </div>

          {/* Luxury Furniture & Resin */}
          <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg">
            <div className="h-48 overflow-hidden">
              <Image 
                src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/hero-7P2YkpjviaOMNuCSiZzgwWXpIRzcGc.webp" 
                alt={locale === "es" ? "Mesa de río en madera y resina" : "River table in wood and resin"}
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                {locale === "es" ? "Muebles de Lujo y Resina" : "Luxury Furniture & Resin"}
              </h3>
              <p className="text-gray-300 mb-4">
                {locale === "es" ? "Piezas centrales hechas a mano que combinan maderas nobles y resina epóxica para proyectos residenciales y de hospitalidad." : "Handcrafted centerpieces combining noble woods and epoxy resin for residential and hospitality projects."}
              </p>
              <Link
                href="/luxury-furniture"
                className="inline-block bg-gold-gradient-90 hover:bg-gold-gradient-bright text-black font-medium px-4 py-2 rounded-md transition"
              >
                {locale === "es" ? "Descubrir Muebles" : "Discover Furniture"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ╭────────────────────── Feature Highlights ─────────────────────╮ */}
      <section className="py-12 bg-[#121212]">
        <SectionTitle>
          {locale === "es" ? "Nuestro Compromiso con la Calidad" : "Our Commitment to Quality"}
        </SectionTitle>
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
              src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/creaters-jmaVe9NzJWkXM1VpBKoVj9HcgvH8Q7.webp"
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
            className="bg-gold-gradient text-black font-bold px-6 py-3 rounded-md shadow hover:shadow-lg hover:shadow-amber-500/20 transition-all"
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
     <Script id="ld-organization" type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://sobrepoxi.com/#organization",
        "name": "SobrePoxi",
        "url": "https://sobrepoxi.com",
        "logo": "https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/logo_sobrepoxi-bU2or8H7kNX2ViS8sklfTK4Nk7BENo.webp",
        "description": locale === "es" 
          ? "En SobrePoxi, unimos dos mundos: la precisión de la ingeniería para crear pisos industriales de máxima durabilidad y la sensibilidad del arte para diseñar pisos y muebles de lujo que se convierten en el alma de un espacio. Con sede en Costa Rica, nuestra pasión es transformar materiales en experiencias únicas."
          : "At SobrePoxi, we unite two worlds: the precision of engineering to create maximum-durability industrial floors, and the sensitivity of art to design luxury floors and furniture that become the soul of a space. Based in Costa Rica, our passion is to transform materials into unique experiences.",
        "foundingDate": "2018",
        "founders": [
          {
            "@type": "Person",
            "name": "Bryam Mora"
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Centro Comercial Velasuma, 2da. Planta local No. 9, San Isidro Downtown",
          "addressLocality": "Vásquez de Coronado",
          "addressRegion": "San Isidro",
          "postalCode": "11101",
          "addressCountry": "CR"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+50685850000",
          "contactType": "customer service",
          "availableLanguage": ["Spanish", "English"]
        },
        "sameAs": [
          "https://www.facebook.com/share/14EpJLUsXwc/",
          "https://www.instagram.com/sobrepoxi?igsh=MTZzd2ljaXNwbWVzaA==",
          "https://www.tiktok.com/@sobrepoxi3?_t=ZM-8xiKO9MHzEe&_r=1"
        ]
      })}
    </Script>
    </>
  );
}

/* ====================================================================== */
/*  SCHEMA.ORG MARKUP                                                    */
/* ====================================================================== */


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
