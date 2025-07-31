/* --------------------------------------------------------------------------
 *  LuxuryDesignFlooringPage · SobrePoxi ― server component (Next 15 / app router)
 *  ------------------------------------------------------------------------
 *  – Luxury design flooring landing page with bilingual SEO-optimized copy
 *  – Mobile-first, dark theme with gold accents from globals.css
 *  – Reuses SEO helpers and respects type-safety
 * ----------------------------------------------------------------------- */

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { buildTitle, getCommonMetadata } from "@/lib/seo";
import Script from "next/script";

// Keep this typed promise for consistency with other routes
export type tParams = Promise<{ id: string; locale: "es" | "en" }>;

/* ------------  SEO metadata  ------------ */
export async function generateMetadata(
  { params }: { params: tParams }
): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === "es" ? "Pisos Epóxicos de Lujo y Diseño" : "Luxury & Designer Epoxy Floors";
  const description = locale === "es"
    ? "Pisos epóxicos de lujo y diseño para residencias, oficinas y espacios comerciales en Costa Rica. Acabados personalizados con efectos de mármol, metálicos y más."
    : "Luxury and designer epoxy floors for residences, offices, and commercial spaces in Costa Rica. Custom finishes with marble effects, metallic finishes, and more.";

  return {
    title: buildTitle(title),
    description,
    keywords: [
      "luxury epoxy floors", "pisos epóxicos de lujo", "designer flooring", "pisos de diseño",
      "marble effect epoxy", "metallic epoxy", "custom flooring", "pisos personalizados", "Costa Rica"
    ],
    ...getCommonMetadata(locale),
  };
}

/* ====================================================================== */
/*  MAIN COMPONENT                                                        */
/* ====================================================================== */
export default async function LuxuryDesignFlooringPage(
  { params }: { params: tParams }
) {
  const { locale } = await params;

  /* ----------------------------- Copy --------------------------------- */
  const t = {
    heroTag: locale === "es" ? "Pisos Epóxicos de Lujo" : "Luxury Epoxy Floors",
    heroTitle: locale === "es"
      ? "Elegancia y diseño sin límites"
      : "Elegance and design without limits",
    heroSub: locale === "es"
      ? "Transforme sus espacios con pisos epóxicos de lujo personalizados en Costa Rica."
      : "Transform your spaces with custom luxury epoxy floors in Costa Rica.",
    ctaVisit: locale === "es" ? "Solicitar consulta de diseño" : "Request Design Consultation",
    
    // Gallery Section
    galleryTitle: locale === "es" ? "Galería de inspiración" : "Inspiration Gallery",
    gallerySub: locale === "es"
      ? "Descubra las posibilidades ilimitadas de nuestros pisos epóxicos de lujo."
      : "Discover the unlimited possibilities of our luxury epoxy floors.",
    
    // For Architects Section
    architectsTitle: locale === "es" ? "Para Arquitectos y Diseñadores" : "For Architects & Designers",
    architectsContent: locale === "es"
      ? "Colaboramos estrechamente con profesionales del diseño para crear soluciones de pisos que complementen perfectamente su visión creativa. Nuestro equipo técnico trabaja con usted desde la conceptualización hasta la instalación, asegurando que cada detalle cumpla con sus especificaciones exactas."
      : "We collaborate closely with design professionals to create flooring solutions that perfectly complement your creative vision. Our technical team works with you from conceptualization to installation, ensuring every detail meets your exact specifications.",
    architectsPoints: locale === "es" ? [
      "Muestras personalizadas para presentaciones a clientes",
      "Soporte técnico durante todo el proyecto",
      "Capacidad de igualar colores específicos",
      "Soluciones a medida para proyectos únicos"
    ] : [
      "Custom samples for client presentations",
      "Technical support throughout the project",
      "Ability to match specific colors",
      "Tailored solutions for unique projects"
    ],
    
    // Benefits Section
    benefitsTitle: locale === "es" ? "Beneficios estéticos" : "Aesthetic Benefits",
    benefits: locale === "es" ? [
      ["Acabado sin juntas", "Superficie continua y elegante sin líneas divisorias que interrumpan el diseño."],
      ["Efectos de mármol", "Patrones fluidos que emulan la belleza natural del mármol con infinitas variaciones."],
      ["Personalización de color", "Posibilidad de igualar cualquier tono para complementar su esquema de diseño."],
      ["Acabados metálicos", "Superficies con profundidad visual y reflejos que cambian con la luz."],
      ["Durabilidad superior", "Belleza que perdura, resistente a manchas, rayones y desgaste diario."],
      ["Mantenimiento sencillo", "Fácil de limpiar y mantener, sin necesidad de tratamientos especiales."],
    ] : [
      ["Seamless finish", "Continuous, elegant surface with no dividing lines to interrupt the design."],
      ["Marble effects", "Fluid patterns that emulate the natural beauty of marble with endless variations."],
      ["Color matching", "Ability to match any shade to complement your design scheme."],
      ["Metallic finishes", "Surfaces with visual depth and reflections that change with the light."],
      ["Superior durability", "Beauty that lasts, resistant to stains, scratches, and daily wear."],
      ["Simple maintenance", "Easy to clean and maintain, with no need for special treatments."],
    ],
    
    // Testimonials Section
    testimonialsTitle: locale === "es" ? "Lo que dicen nuestros clientes" : "What Our Clients Say",
    testimonials: locale === "es" ? [
      {
        quote: "Sobrepoxi transformó nuestra casa con un piso que se convirtió en el punto focal de todo el diseño. El acabado metalizado superó nuestras expectativas.",
        author: "María Fernández",
        role: "Propietaria de residencia en Santa Ana"
      },
      {
        quote: "Como arquitecto, valoro proveedores que entienden la visión del diseño. El equipo de Sobrepoxi no solo entendió nuestro concepto, sino que lo elevó con su experiencia técnica.",
        author: "Carlos Jiménez",
        role: "Arquitecto, Studio Design CR"
      }
    ] : [
      {
        quote: "Sobrepoxi transformed our home with a floor that became the focal point of the entire design. The metallic finish exceeded our expectations.",
        author: "Maria Fernandez",
        role: "Homeowner in Santa Ana"
      },
      {
        quote: "As an architect, I value vendors who understand design vision. The Sobrepoxi team not only understood our concept but elevated it with their technical expertise.",
        author: "Carlos Jimenez",
        role: "Architect, Studio Design CR"
      }
    ],
  } as const;

  /* ------------------------------------------------------------------- */
  return (
    <main className="min-h-screen bg-[#121212] text-white">
      {/* Schema.org markup for Luxury Design Flooring Service */}
      <Script id="luxury-service-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": locale === "es" ? "Pisos Epóxicos de Lujo y Diseño" : "Luxury & Designer Epoxy Flooring",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Sobrepoxi",
            "url": "https://sobrepoxi.com"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Costa Rica"
          },
          "description": locale === "es" 
            ? "Pisos epóxicos de lujo y diseño para residencias, oficinas y espacios comerciales en Costa Rica."
            : "Luxury and designer epoxy floors for residences, offices, and commercial spaces in Costa Rica.",
          "offers": {
            "@type": "Offer",
            "areaServed": "Costa Rica"
          }
        })}
      </Script>

      {/* ╭──────────────────────── Hero ───────────────────────────────╮ */}
      <section className="relative overflow-hidden pb-12 pt-2 sm:pt-28">
        {/* Background image */}
        <Image
          src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/luxury-floor.webp"
          alt="Luxury epoxy floor with marble effect in a residence in Costa Rica"
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
          <span className="inline-block px-4 py-1 bg-[#1e1e1e] text-gray-300 rounded-full text-sm mb-4">
            {locale === "es" ? "Diseño Exclusivo" : "Exclusive Design"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold gold-gradient-bright mb-4">
            {t.heroTag}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            {t.heroTitle}. {t.heroSub}
          </p>
          <Link
            href="/contact"
            className="bg-gold-gradient-90 hover:bg-gold-gradient-bright text-black font-semibold px-6 py-3 rounded-md shadow transition"
          >
            {t.ctaVisit}
          </Link>
        </div>
      </section>

      {/* ╭────────────────── Gallery ────────────────────╮ */}
      <section className="py-16 bg-[#181818]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold gold-gradient-bright text-center mb-4">
            {t.galleryTitle}
          </h2>
          <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            {t.gallerySub}
          </p>
          
          {/* Masonry grid gallery */}
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {[
    "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/black-mirror-floor/mesa_sombra.webp",
    "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/black-mirror-floor/5.webp",
    "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/pisob/pisob1.webp",
    "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/pisob/pisob2.webp",
    "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/pisog/pisog1.webp",
    "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/pisog/pisog2.webp",
    "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/pisog/pisog3.webp",
    "https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/lujo1.webp"
  ].map((src, index) => (
    <div
      key={index}
      className="relative w-full aspect-[3/4] rounded-lg overflow-hidden"
    >
      <Image
        src={src}
        alt={`Proyecto epóxico ${index + 1}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>
  ))}
</div>

          
          {/* Featured Projects */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold gold-gradient-bright text-center mb-8">
              {locale === "es" ? "Proyectos Destacados" : "Featured Projects"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-md">
  <div className="aspect-video bg-[#252525] rounded-lg overflow-hidden mb-4 relative">
    <Image
      src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/luxury-floor.webp"
      alt={locale === "es" ? "Piso de lujo en Santa Ana" : "Luxury floor in Santa Ana"}
      fill
      className="object-cover"
      priority
    />
  </div>
  <h4 className="text-lg font-semibold gold-gradient-bright mb-2">
    {locale === "es" ? "Residencia en Santa Ana" : "Residence in Santa Ana"}
  </h4>
  <p className="text-gray-300 text-sm">
    {locale === "es"
      ? "Piso con efecto mármol Calacatta gris, 100 m²."
      : "Grey Calacatta marble effect floor, 100 m²."}
  </p>
</div>

              <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-md">
                <div className="aspect-video bg-[#252525] rounded-lg overflow-hidden mb-4">
                  <div className="h-full w-full bg-gradient-to-br from-[#d4af37]/20 to-[#b8860b]/20 flex items-center justify-center">
                    <span className="text-sm text-gray-400">{locale === "es" ? "Imagen próximamente" : "Image coming soon"}</span>
                  </div>
                </div>
                <h4 className="text-lg font-semibold gold-gradient-bright mb-2">
                  {locale === "es" ? "Lobby de oficina en Sabana" : "Office lobby in Sabana"}
                </h4>
                <p className="text-gray-300 text-sm">
                  {locale === "es" ? "Acabado metálico titanio, 80 m²." : "Titanium metallic finish, 80 m²."}
                </p>
              </div>
              <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-md">
                <div className="aspect-video bg-[#252525] rounded-lg overflow-hidden mb-4">
                  <div className="h-full w-full bg-gradient-to-br from-[#d4af37]/30 to-[#b8860b]/30 flex items-center justify-center">
                    <span className="text-sm text-gray-400">{locale === "es" ? "Imagen próximamente" : "Image coming soon"}</span>
                  </div>
                </div>
                <h4 className="text-lg font-semibold gold-gradient-bright mb-2">
                  {locale === "es" ? "Boutique en Escazú" : "Boutique in Escazú"}
                </h4>
                <p className="text-gray-300 text-sm">
                  {locale === "es" ? "Piso epóxico con efecto dorado, 65 m²." : "Epoxy floor with gold effect, 65 m²."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ╭────────────────── For Architects & Designers ────────────────────╮ */}
      <section className="py-16 bg-[#121212]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold gold-gradient-bright mb-6">
                {t.architectsTitle}
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {t.architectsContent}
              </p>
              <ul className="space-y-2">
                {t.architectsPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-gold-500 mr-2">✓</span>
                    <span className="text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 bg-[#1e1e1e] rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-[4/3] bg-gradient-to-br from-[#d4af37]/20 to-[#b8860b]/20 flex items-center justify-center p-8">
                <div className="text-center">
                  <h3 className="text-xl font-semibold gold-gradient-bright mb-2">
                    {locale === "es" ? "Colaboración creativa" : "Creative Collaboration"}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {locale === "es" 
                      ? "Trabajamos con su visión para crear pisos que sean verdaderas obras de arte."
                      : "We work with your vision to create floors that are true works of art."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ╭────────────────── Benefits ────────────────────╮ */}
      <section className="py-16 bg-[#181818]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold gold-gradient-bright text-center mb-12">
            {t.benefitsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.benefits.map(([title, text], idx) => (
              <div key={idx} className="bg-[#1e1e1e] p-6 rounded-lg shadow-sm h-full">
                <h3 className="text-xl font-semibold mb-2 gold-gradient-bright">{title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╭────────────────── Testimonials ────────────────────╮ */}
      <section className="py-16 bg-[#121212]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold gold-gradient-bright text-center mb-12">
            {t.testimonialsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-[#1e1e1e] p-6 rounded-lg shadow-md">
                <div className="mb-4 text-gold-500">
                  <svg className="w-8 h-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-300 italic mb-4">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold gold-gradient-bright">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╭────────────────────────── CTA ────────────────────────────────╮ */}
      <section className="py-16 text-center bg-[#181818]">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wide gold-gradient-bright mb-6">
          {locale === "es" ? "¿Listo para transformar su espacio?" : "Ready to transform your space?"}
        </h2>
        <Link
          href="/contact"
          className="bg-gold-gradient-bright hover:bg-gold-gradient-95 text-black font-semibold px-8 py-4 rounded-md shadow-lg transition inline-block"
        >
          {t.ctaVisit}
        </Link>
      </section>
      <Script id="ld-luxury-service" type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Luxury & Designer Epoxy Flooring",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Sobrepoxi"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Costa Rica"
        },
        "description": locale === "es" 
          ? "Pisos epóxicos de lujo y diseño para residencias, oficinas y espacios comerciales en Costa Rica. Acabados personalizados con efectos de mármol, metálicos y más."
          : "Luxury and designer epoxy floors for residences, offices, and commercial spaces in Costa Rica. Custom finishes with marble effects, metallic finishes, and more.",
        "offers": {
          "@type": "Offer",
          "areaServed": "Costa Rica"
        },
        "category": ["Luxury Flooring", "Designer Epoxy", "Custom Floors", "Residential Flooring"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Luxury Epoxy Flooring Options",
          "itemListElement": [
            {
              "@type": "OfferCatalog",
              "name": "Marble Effect Epoxy"
            },
            {
              "@type": "OfferCatalog",
              "name": "Metallic Epoxy Finishes"
            },
            {
              "@type": "OfferCatalog",
              "name": "Custom Color Blends"
            }
          ]
        }
      })}
    </Script>
    </main>

  
    
  );
}