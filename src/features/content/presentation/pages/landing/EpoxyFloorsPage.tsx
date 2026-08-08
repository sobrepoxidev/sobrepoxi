/* --------------------------------------------------------------------------
 *  EpoxyFloorsPage · SobrePoxi — Cinematic rework
 *  Most indexed page on Google — hero asset with dark negative space for the
 *  headline, editorial sections, scroll-linked reveals (CSS only, no JS),
 *  local WebP assets (no remote hero), FAQ/Service/Breadcrumb schema intact.
 * ----------------------------------------------------------------------- */

import Link from "next/link";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { buildMetadata } from "@/shared/seo/seoConfig";
import { JsonLd } from "@/shared/seo/JsonLd";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/shared/seo/structuredData";
import { ChevronRight, ArrowRight, Star, CheckCircle2, Phone } from "lucide-react";

const serifDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  display: "swap",
  variable: "--font-epx-serif",
});

const sansDisplay = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-epx-sans",
});

export type tParams = Promise<{ id: string; locale: "es" | "en" }>;

/* ──────────── SEO metadata ──────────── */
export async function generateMetadata(
  { params }: { params: tParams }
): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    locale: locale === "es" ? "es" : "en",
    pathname: `/${locale}/epoxy-floors`,
    title: locale === "es"
      ? "Pisos Epóxicos en Costa Rica | Diseños Únicos, Metálicos y 3D | SobrePoxi"
      : "Epoxy Floors in Costa Rica | Unique Metallic & 3D Designs | SobrePoxi",
    description: locale === "es"
      ? "Pisos epóxicos de lujo en Costa Rica: efectos metálicos, mármol, 3D y más. Instalación profesional para cocheras, salas, comercios e industria. Cotización gratuita. 15+ años de durabilidad."
      : "Luxury epoxy floors in Costa Rica: metallic, marble, 3D effects and more. Professional installation for garages, living rooms, commercial and industrial. Free quote. 15+ year durability.",
    keywords: locale === "es"
      ? "pisos epóxicos Costa Rica, pisos metálicos, pisos 3D, pisos resina epóxica, instalación pisos epóxicos, pisos decorativos, pisos sin juntas, pisos cochera, pisos industriales, sobrepoxi"
      : "epoxy floors Costa Rica, metallic floors, 3D floors, epoxy resin flooring, epoxy floor installation, decorative floors, seamless floors, garage floors, industrial floors, sobrepoxi"
  });
}

/* ════════════════════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                                            */
/* ════════════════════════════════════════════════════════════════════════════ */
export default async function EpoxyFloorsPage(
  { params }: { params: tParams }
) {
  const { locale } = await params;

  /* ── Gallery images (real projects only) ── */
  const galleryImages = [
    { src: "https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/lujo1.webp", alt: locale === "es" ? "Piso epóxico de lujo negro con vetas doradas instalado en residencia" : "Luxury black epoxy floor with gold veins installed in residence", featured: true },
    { src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/pisog/pisog1.webp", alt: locale === "es" ? "Piso epóxico efecto galaxia de alto brillo" : "High-gloss galaxy effect epoxy floor", featured: false },
    { src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/pisog/pisog2.webp", alt: locale === "es" ? "Piso epóxico negro con destellos para interiores" : "Black sparkle epoxy floor for interiors", featured: false },
    { src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/pisob/pisob1.webp", alt: locale === "es" ? "Piso epóxico metálico efecto mármol blanco y oro" : "White and gold marble effect metallic epoxy floor", featured: false },
    { src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/pisog/pisog3.webp", alt: locale === "es" ? "Piso epóxico de alto tráfico en cochera residencial" : "Heavy-duty epoxy floor in residential garage", featured: false },
  ];

  /* ── Copy ── */
  const t = {
    breadcrumbHome: locale === "es" ? "Inicio" : "Home",
    heroTag: locale === "es" ? "Pisos Epóxicos Profesionales · Costa Rica" : "Professional Epoxy Floors · Costa Rica",
    heroTitle1: locale === "es" ? "El piso que" : "The floor",
    heroTitle2: locale === "es" ? "tu espacio merece" : "your space deserves",
    heroSub: locale === "es"
      ? "Superficies sin juntas, ultra resistentes y con diseños únicos que transforman cocheras, salas, comercios e industrias en toda Costa Rica."
      : "Seamless, ultra-resistant surfaces with unique designs that transform garages, living rooms, commercial and industrial spaces across Costa Rica.",
    heroCta: locale === "es" ? "Cotización gratuita" : "Free quote",
    heroSecondary: locale === "es" ? "Ver proyectos" : "View projects",
    // Stats
    stats: locale === "es"
      ? [["15+", "Años de durabilidad"], ["500+", "m² instalados"], ["100%", "Personalizable"], ["3-5", "Días de instalación"]]
      : [["15+", "Years durability"], ["500+", "sqm installed"], ["100%", "Customizable"], ["3-5", "Days installation"]],
    // What section
    whatTitle: locale === "es" ? "¿Qué es un piso epóxico?" : "What is an epoxy floor?",
    whatContent: locale === "es"
      ? "Un piso epóxico es un recubrimiento de resina termoestable que se aplica sobre concreto, creando una superficie monolítica sin juntas. Es extremadamente resistente a impactos, químicos y abrasión, con una vida útil de 15 a 20 años. Disponible en acabados brillantes como espejo, metálicos con efectos 3D, efecto mármol, escamas decorativas y colores sólidos personalizados."
      : "An epoxy floor is a thermosetting resin coating applied over concrete, creating a monolithic seamless surface. It's extremely resistant to impacts, chemicals and abrasion, with a 15-20 year lifespan. Available in mirror-like glossy finishes, 3D metallic effects, marble effects, decorative flakes and custom solid colors.",
    // Types
    typesTitle: locale === "es" ? "Tipos de pisos epóxicos" : "Types of epoxy floors",
    types: locale === "es" ? [
      { img: "/epoxy/type-metalico.webp", name: "Metálico 3D", desc: "Efectos lava, océano, mármol y galaxia con pigmentos metálicos. Cada piso es único e irrepetible. Ideal para salas, lobbies y espacios premium.", tag: "Más popular" },
      { img: "/epoxy/type-industrial.webp", name: "Industrial de Alto Tráfico", desc: "100% sólidos con cuarzo broadcast. Resiste montacargas, químicos y tráfico pesado 24/7. Para bodegas, fábricas y estacionamientos.", tag: "Máxima resistencia" },
      { img: "/epoxy/type-escamas.webp", name: "Escamas Decorativas", desc: "Escamas de vinilo multicolor sobre resina. Textura antideslizante natural. Perfecto para cocheras, gimnasios y locales comerciales.", tag: "Versátil" },
      { img: "/epoxy/type-autonivelante.webp", name: "Autonivelante Sólido", desc: "Superficie lisa como espejo en color sólido personalizado. Acabado minimalista para oficinas, clínicas y espacios modernos.", tag: "Elegante" },
    ] : [
      { img: "/epoxy/type-metalico.webp", name: "3D Metallic", desc: "Lava, ocean, marble and galaxy effects with metallic pigments. Each floor is unique. Ideal for living rooms, lobbies and premium spaces.", tag: "Most popular" },
      { img: "/epoxy/type-industrial.webp", name: "Industrial Heavy-Duty", desc: "100% solids with quartz broadcast. Withstands forklifts, chemicals and 24/7 heavy traffic. For warehouses, factories and parking.", tag: "Maximum resistance" },
      { img: "/epoxy/type-escamas.webp", name: "Decorative Flakes", desc: "Multi-color vinyl flakes over resin. Natural anti-slip texture. Perfect for garages, gyms and commercial spaces.", tag: "Versatile" },
      { img: "/epoxy/type-autonivelante.webp", name: "Self-Leveling Solid", desc: "Mirror-smooth surface in custom solid color. Minimalist finish for offices, clinics and modern spaces.", tag: "Elegant" },
    ],
    // Architects
    architectsTitle: locale === "es" ? "Para Arquitectos y Diseñadores" : "For Architects & Designers",
    architectsContent: locale === "es"
      ? "Colaboramos estrechamente con profesionales del diseño para crear soluciones de pisos que complementen perfectamente su visión creativa. Nuestro equipo técnico trabaja con usted desde la conceptualización hasta la instalación, asegurando que cada detalle cumpla con sus especificaciones exactas."
      : "We collaborate closely with design professionals to create flooring solutions that perfectly complement your creative vision. Our technical team works with you from conceptualization to installation, ensuring every detail meets your exact specifications.",
    architectsPoints: locale === "es" ? [
      "Muestras personalizadas para presentaciones a clientes",
      "Soporte técnico durante todo el proyecto",
      "Capacidad de igualar colores específicos",
      "Soluciones a medida para proyectos únicos",
    ] : [
      "Custom samples for client presentations",
      "Technical support throughout the project",
      "Ability to match specific colors",
      "Tailored solutions for unique projects",
    ],
    // Benefits
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
    // Gallery
    galleryTitle: locale === "es" ? "Nuestros proyectos" : "Our projects",
    gallerySub: locale === "es"
      ? "Cada piso es una pieza única — estos son algunos de nuestros trabajos reales"
      : "Each floor is a unique piece — these are some of our real projects",
    // Process
    processTitle: locale === "es" ? "Nuestro proceso" : "Our process",
    steps: locale === "es" ? [
      { num: "01", title: "Visita técnica gratuita", desc: "Evaluamos tu espacio: medimos humedad, nivelación y estado del concreto. Te recomendamos el sistema ideal y creamos muestras de color." },
      { num: "02", title: "Preparación profesional", desc: "Esmerilado mecánico con aspiración de polvo, reparación de grietas y perfilado del sustrato. La base del éxito." },
      { num: "03", title: "Aplicación del sistema", desc: "Primer, capa base de resina epóxica y elementos decorativos. Aquí se crea la magia — cada piso metálico es una obra de arte." },
      { num: "04", title: "Sellado y entrega", desc: "Topcoat protector de poliuretano o poliaspártico con resistencia UV. Tráfico peatonal a las 24h, uso completo a los 5 días." },
    ] : [
      { num: "01", title: "Free site visit", desc: "We assess your space: moisture, leveling and concrete condition. We recommend the ideal system and create color samples." },
      { num: "02", title: "Professional preparation", desc: "Mechanical grinding with dust extraction, crack repair and substrate profiling. The foundation of success." },
      { num: "03", title: "System application", desc: "Primer, epoxy base coat and decorative elements. This is where the magic happens — each metallic floor is a work of art." },
      { num: "04", title: "Sealing and delivery", desc: "Protective polyurethane or polyaspartic topcoat with UV resistance. Foot traffic at 24h, full use at 5 days." },
    ],
    // Where
    whereTitle: locale === "es" ? "¿Dónde instalar pisos epóxicos?" : "Where to install epoxy floors?",
    whereItems: locale === "es" ? [
      "Cocheras y garajes", "Salas de estar", "Cocinas", "Baños de lujo",
      "Restaurantes y bares", "Oficinas", "Tiendas y showrooms", "Gimnasios",
      "Bodegas e industrias", "Clínicas y hospitales", "Estacionamientos", "Hoteles y lobbies"
    ] : [
      "Garages", "Living rooms", "Kitchens", "Luxury bathrooms",
      "Restaurants & bars", "Offices", "Stores & showrooms", "Gyms",
      "Warehouses & factories", "Clinics & hospitals", "Parking lots", "Hotels & lobbies"
    ],
    // Testimonials
    testimonialsTitle: locale === "es" ? "Lo que dicen nuestros clientes" : "What our clients say",
    testimonials: locale === "es" ? [
      { name: "Carlos M.", role: "Propietario, Santa Ana", text: "Transformaron mi cochera de concreto manchado a un piso que parece de concesionario. Mis vecinos no lo podían creer. 100% recomendado.", stars: 5 },
      { name: "María L.", role: "Restaurante, Escazú", text: "El piso metálico le dio una identidad única a nuestro restaurante. Los clientes siempre preguntan por el piso. Además se limpia increíblemente fácil.", stars: 5 },
      { name: "Roberto S.", role: "Gerente de planta, Heredia", text: "Instalaron 800m² en nuestra bodega sin parar operaciones. Cero polvo, los montacargas circulan sin problema. La inversión se ha pagado sola.", stars: 5 },
    ] : [
      { name: "Carlos M.", role: "Homeowner, Santa Ana", text: "They transformed my stained concrete garage into a floor that looks like a car dealership. My neighbors couldn't believe it. 100% recommended.", stars: 5 },
      { name: "María L.", role: "Restaurant, Escazú", text: "The metallic floor gave our restaurant a unique identity. Clients always ask about the floor. Plus it cleans incredibly easy.", stars: 5 },
      { name: "Roberto S.", role: "Plant manager, Heredia", text: "They installed 800sqm in our warehouse without stopping operations. Zero dust, forklifts run smoothly. The investment has paid for itself.", stars: 5 },
    ],
    // FAQ
    faqTitle: locale === "es" ? "Preguntas frecuentes" : "Frequently asked questions",
    // CTA
    ctaTitle1: locale === "es" ? "¿Listo para transformar" : "Ready to transform",
    ctaTitle2: locale === "es" ? "tu espacio?" : "your space?",
    ctaSub: locale === "es"
      ? "Agenda una visita técnica gratuita. Evaluamos tu espacio, te mostramos muestras y te damos una cotización sin compromiso."
      : "Schedule a free site visit. We assess your space, show you samples and give you a no-obligation quote.",
    ctaButton: locale === "es" ? "Solicitar cotización gratuita" : "Request free quote",
    ctaPhone: locale === "es" ? "O llámanos:" : "Or call us:",
  };

  const faqs = locale === "es" ? [
    { question: "¿Cuánto cuesta un piso epóxico en Costa Rica?", answer: "El precio depende del sistema elegido, el área, la condición del concreto y la complejidad del diseño. Ofrecemos opciones desde sistemas básicos hasta premium metálicos. Solicita una visita técnica gratuita para recibir una cotización exacta para tu proyecto." },
    { question: "¿Cuánto dura un piso epóxico?", answer: "Un piso epóxico profesionalmente instalado dura entre 15 y 20 años con mantenimiento básico (solo agua y jabón neutro). La clave es la preparación correcta del sustrato y el uso de sistemas de calidad profesional." },
    { question: "¿Se puede aplicar sobre el piso existente sin demoler?", answer: "En la mayoría de casos sí. Se puede aplicar sobre concreto, cerámica y porcelanato existente, previa evaluación técnica. Esto ahorra hasta un 40% comparado con demoler e instalar piso nuevo." },
    { question: "¿El piso epóxico es resbaloso?", answer: "Con el topcoat antideslizante adecuado, no. Siempre incluimos acabados con textura anti-slip para áreas donde hay riesgo de agua o humedad (cocheras, cocinas, baños, industrias)." },
    { question: "¿Cuánto tarda la instalación?", answer: "Un espacio residencial promedio (50-100m²) toma 3-5 días. Se puede caminar a las 24 horas y usar completamente a los 5-7 días. Para negocios, podemos trabajar por secciones para minimizar interrupciones." },
    { question: "¿El epóxico se pone amarillo con el sol?", answer: "No con nuestros sistemas. Usamos topcoats de poliuretano alifático o poliaspártico con estabilizadores UV que previenen el amarillamiento. Es crítico usar el sistema correcto para áreas con exposición solar." },
    { question: "¿Trabajan en todo Costa Rica?", answer: "Sí. Realizamos proyectos en toda la GAM, Guanacaste, Puntarenas, Limón, zona norte y zona sur. Para proyectos fuera de la GAM coordinamos logística especial." },
    { question: "¿Ofrecen garantía?", answer: "Sí. Todos nuestros proyectos incluyen garantía de instalación. Además, realizamos seguimiento post-instalación para asegurar tu completa satisfacción." },
  ] : [
    { question: "How much does an epoxy floor cost in Costa Rica?", answer: "Price depends on the system, area, concrete condition and design complexity. We offer options from basic to premium metallic systems. Request a free site visit for an exact quote." },
    { question: "How long does an epoxy floor last?", answer: "A professionally installed epoxy floor lasts 15-20 years with basic maintenance (water and neutral soap). The key is proper substrate preparation and professional-grade systems." },
    { question: "Can it be applied over existing flooring?", answer: "In most cases yes. We can apply over concrete, tile and porcelain, after technical evaluation. This saves up to 40% compared to demolishing and installing new flooring." },
    { question: "Is epoxy flooring slippery?", answer: "With proper anti-slip topcoat, no. We always include anti-slip finishes for areas with water or moisture risk." },
    { question: "How long does installation take?", answer: "Average residential space (50-100sqm) takes 3-5 days. Foot traffic at 24h, full use at 5-7 days." },
    { question: "Does epoxy yellow in sunlight?", answer: "Not with our systems. We use UV-stabilized aliphatic polyurethane or polyaspartic topcoats that prevent yellowing." },
  ];

  /* ── Structured data ── */
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t.breadcrumbHome, url: `/${locale}` },
    { name: locale === "es" ? "Pisos Epóxicos" : "Epoxy Floors", url: `/${locale}/epoxy-floors` },
  ]);
  const faqSchema = generateFAQSchema(faqs);

  return (
    <main className={`${serifDisplay.variable} ${sansDisplay.variable} efx-sans min-h-screen bg-[#0b0a09] text-white`}>
      {/* Scoped motion + typography system. CSS-only: entrance is a one-shot
          animation, section reveals ride the scroll timeline where supported
          and render statically everywhere else. */}
      <style>{`
        .efx-serif { font-family: var(--font-epx-serif), Georgia, serif; }
        .efx-sans { font-family: var(--font-epx-sans), system-ui, Arial, sans-serif; }
        @media (prefers-reduced-motion: no-preference) {
          @keyframes efx-rise {
            from { opacity: 0; transform: translateY(26px); filter: blur(10px); }
            to { opacity: 1; transform: none; filter: blur(0); }
          }
          @keyframes efx-kb {
            from { transform: scale(1.07); }
            to { transform: scale(1); }
          }
          .efx-in { animation: efx-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
          .efx-in-2 { animation-delay: 0.18s; }
          .efx-in-3 { animation-delay: 0.34s; }
          .efx-in-4 { animation-delay: 0.5s; }
          .efx-kb { animation: efx-kb 14s cubic-bezier(0.33, 1, 0.68, 1) both; }
          @supports (animation-timeline: view()) {
            @keyframes efx-rise-soft {
              from { opacity: 0; transform: translateY(28px); }
              to { opacity: 1; transform: none; }
            }
            .efx-reveal {
              animation: efx-rise-soft linear both;
              animation-timeline: view();
              animation-range: entry 5% entry 42%;
            }
          }
        }
      `}</style>

      <JsonLd id="epoxy-breadcrumb" data={breadcrumbSchema} />
      <JsonLd id="epoxy-faq" data={faqSchema} />
      <JsonLd
        id="ld-epoxy-service"
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": locale === "es" ? "Instalación de Pisos Epóxicos" : "Epoxy Floor Installation",
          "provider": {
            "@type": "LocalBusiness",
            "name": "SobrePoxi",
            "address": { "@type": "PostalAddress", "streetAddress": "Centro Comercial Velasuma, 2da. Planta local No. 9, San Isidro Downtown", "addressLocality": "Vásquez de Coronado", "addressRegion": "San José", "postalCode": "11101", "addressCountry": "CR" },
            "telephone": "+50685850000",
            "email": "info@sobrepoxi.com"
          },
          "areaServed": { "@type": "Country", "name": "Costa Rica" },
          "description": locale === "es"
            ? "Instalación profesional de pisos epóxicos en Costa Rica: metálicos, industriales, decorativos y 3D. Servicio llave en mano con garantía."
            : "Professional epoxy floor installation in Costa Rica: metallic, industrial, decorative and 3D. Turnkey service with warranty.",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": locale === "es" ? "Tipos de Pisos Epóxicos" : "Epoxy Floor Types",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Metallic 3D Epoxy" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Industrial Epoxy" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Decorative Flake Epoxy" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Self-Leveling Epoxy" } },
            ]
          }
        }}
      />

      {/* ═══════════════ HERO ═══════════════ */}
      {/* The asset carries the composition: gold-veined floor in the bottom
          40%, near-black negative space above where the headline lives — no
          overlay, no scrim. */}
      <section className="relative min-h-[92dvh] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <picture>
            <source media="(max-width: 767px)" srcSet="/epoxy/hero-mobile.webp" />
            <img
              src="/epoxy/hero.webp"
              alt={locale === "es" ? "Piso epóxico de mármol negro con vetas doradas instalado por SobrePoxi en Costa Rica" : "Black marble epoxy floor with gold veins installed by SobrePoxi in Costa Rica"}
              fetchPriority="high"
              decoding="async"
              className="efx-kb h-full w-full object-cover"
            />
          </picture>
        </div>
        {/* Dissolve into the page surface before the next section begins */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0b0a09] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[92dvh] max-w-6xl flex-col justify-center px-4 pb-[16vh] pt-10">
          <nav aria-label="Breadcrumb" className="efx-in mb-10 flex items-center gap-2 text-sm text-white/50">
            <Link href={`/${locale}`} className="transition-colors hover:text-white">{t.breadcrumbHome}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/80">{locale === "es" ? "Pisos Epóxicos" : "Epoxy Floors"}</span>
          </nav>

          <p className="efx-in mb-6 text-[11px] font-medium uppercase tracking-[0.35em] text-white/60 sm:text-xs">
            {t.heroTag}
          </p>
          <h1 className="efx-in efx-in-2 mb-7 max-w-4xl">
            <span className="efx-serif block text-4xl italic font-normal leading-tight text-white/90 sm:text-5xl md:text-6xl">
              {t.heroTitle1}
            </span>
            <span className="gold-gradient-bright block text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
              {t.heroTitle2}
            </span>
          </h1>
          <p className="efx-in efx-in-3 mb-10 max-w-xl text-lg leading-relaxed text-white/70">
            {t.heroSub}
          </p>
          <div className="efx-in efx-in-4 flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="bg-gold-gradient inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold text-black transition-opacity hover:opacity-90"
            >
              {t.heroCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#galeria"
              className="inline-flex items-center gap-2 rounded-full px-6 py-4 font-medium text-white/80 transition-colors hover:text-white"
            >
              {t.heroSecondary}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-14 md:grid-cols-4">
          {t.stats.map(([value, label]) => (
            <div key={label} className="efx-reveal text-center">
              <p className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">{value}</p>
              <p className="mt-2 text-sm text-white/50">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ WHAT IS ═══════════════ */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:gap-16">
          <div className="efx-reveal">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              <span className="efx-serif italic font-normal">{t.whatTitle}</span>
            </h2>
            <p className="text-lg leading-relaxed text-white/70">{t.whatContent}</p>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4">
              {(locale === "es"
                ? ["Sin juntas", "Resistente a químicos", "Ultra duradero", "Fácil de limpiar", "Antideslizante", "Personalizable"]
                : ["Seamless", "Chemical resistant", "Ultra durable", "Easy to clean", "Anti-slip", "Customizable"]
              ).map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-white/70">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-white/40" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="efx-reveal relative aspect-[4/3] overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/epoxy/type-metalico.webp"
              alt={locale === "es" ? "Detalle de piso epóxico metálico negro y oro de alta calidad" : "High quality black and gold metallic epoxy floor detail"}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════ TYPES ═══════════════ */}
      <section className="bg-[#100f0d] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="efx-reveal mb-14 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              <span className="efx-serif italic font-normal">{t.typesTitle}</span>
            </h2>
            <p className="mx-auto max-w-2xl text-white/50">
              {locale === "es"
                ? "Cada espacio tiene necesidades únicas. Te ayudamos a elegir el sistema perfecto."
                : "Each space has unique needs. We help you choose the perfect system."}
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-14">
            {t.types.map((type) => (
              <article key={type.name} className="efx-reveal group">
                <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={type.img}
                    alt={`${type.name} — SobrePoxi`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-semibold text-white">{type.name}</h3>
                  <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                    {type.tag}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{type.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FOR ARCHITECTS ═══════════════ */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:gap-16">
          <div className="efx-reveal relative order-2 aspect-[4/3] overflow-hidden rounded-2xl md:order-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/pisob/pisob2.webp"
              alt={locale === "es" ? "Piso epóxico efecto mármol diseñado para proyecto arquitectónico" : "Marble effect epoxy floor designed for architectural project"}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="efx-reveal order-1 md:order-2">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              <span className="efx-serif italic font-normal">{t.architectsTitle}</span>
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-white/70">{t.architectsContent}</p>
            <ul className="space-y-3">
              {t.architectsPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white/40" />
                  <span className="text-white/70">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════ BENEFITS · editorial list ═══════════════ */}
      <section className="bg-[#100f0d] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="efx-reveal mb-12 text-center text-3xl font-bold text-white md:text-4xl">
            <span className="efx-serif italic font-normal">{t.benefitsTitle}</span>
          </h2>
          <div className="border-t border-white/10">
            {t.benefits.map(([title, text]) => (
              <div key={title} className="efx-reveal grid gap-2 border-b border-white/10 py-6 md:grid-cols-[1fr_2fr] md:gap-8">
                <h3 className="efx-serif text-xl italic text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-white/60 md:text-base">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ GALLERY ═══════════════ */}
      <section id="galeria" className="scroll-mt-20 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="efx-reveal mb-14 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              <span className="efx-serif italic font-normal">{t.galleryTitle}</span>
            </h2>
            <p className="mx-auto max-w-xl text-white/50">{t.gallerySub}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {galleryImages.map((img) => (
              <div
                key={img.src}
                className={`efx-reveal relative overflow-hidden rounded-2xl ${img.featured ? "col-span-2 row-span-2 aspect-square" : "aspect-[3/4]"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PROCESS · editorial steps ═══════════════ */}
      <section className="bg-[#100f0d] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="efx-reveal mb-12 text-center text-3xl font-bold text-white md:text-4xl">
            <span className="efx-serif italic font-normal">{t.processTitle}</span>
          </h2>
          <div className="border-t border-white/10">
            {t.steps.map((step) => (
              <div key={step.num} className="efx-reveal grid grid-cols-[3.5rem_1fr] items-baseline gap-4 border-b border-white/10 py-7 md:grid-cols-[5rem_1fr] md:gap-8">
                <span className="icon-gold-bright text-sm font-semibold tracking-[0.3em]">{step.num}</span>
                <div>
                  <h3 className="mb-1.5 text-lg font-semibold text-white md:text-xl">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60 md:text-base">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHERE ═══════════════ */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="efx-reveal mb-12 text-center text-3xl font-bold text-white md:text-4xl">
            <span className="efx-serif italic font-normal">{t.whereTitle}</span>
          </h2>
          <div className="efx-reveal flex flex-wrap justify-center gap-x-3 gap-y-3">
            {t.whereItems.map((item) => (
              <span key={item} className="rounded-full bg-white/[0.05] px-5 py-2.5 text-sm text-white/70">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="bg-[#100f0d] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="efx-reveal mb-14 text-center text-3xl font-bold text-white md:text-4xl">
            <span className="efx-serif italic font-normal">{t.testimonialsTitle}</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {t.testimonials.map((test) => (
              <figure key={test.name} className="efx-reveal rounded-2xl bg-white/[0.04] p-8">
                <div className="mb-5 flex gap-1">
                  {Array.from({ length: test.stars }).map((_, i) => (
                    <Star key={i} className="icon-gold h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="efx-serif mb-6 text-lg italic leading-relaxed text-white/80">
                  &ldquo;{test.text}&rdquo;
                </blockquote>
                <figcaption>
                  <p className="text-sm font-semibold text-white">{test.name}</p>
                  <p className="text-xs text-white/40">{test.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="efx-reveal mb-12 text-center text-3xl font-bold text-white md:text-4xl">
            <span className="efx-serif italic font-normal">{t.faqTitle}</span>
          </h2>
          <div className="efx-reveal border-t border-white/10">
            {faqs.map((faq, i) => (
              <details key={i} className="group border-b border-white/10">
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 font-medium text-white transition-colors hover:text-white/80">
                  <span className="text-sm md:text-base">{faq.question}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-white/40 transition-transform group-open:rotate-90" />
                </summary>
                <div className="pb-5 text-sm leading-relaxed text-white/60">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA + GUIDES ═══════════════ */}
      {/* Gold pour asset lives bottom-right on black — text occupies the
          natural negative space on the left. No overlay. */}
      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/epoxy/gold-pour.webp"
            alt=""
            role="presentation"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-right-bottom"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 md:py-36">
          <div className="efx-reveal max-w-xl">
            <h2 className="mb-5">
              <span className="efx-serif block text-3xl italic font-normal text-white/90 md:text-4xl">{t.ctaTitle1}</span>
              <span className="gold-gradient-bright block text-4xl font-extrabold tracking-tight md:text-6xl">{t.ctaTitle2}</span>
            </h2>
            <p className="mb-9 leading-relaxed text-white/70">{t.ctaSub}</p>
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <Link
                href={`/${locale}/contact`}
                className="bg-gold-gradient inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold text-black transition-opacity hover:opacity-90"
              >
                {t.ctaButton}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+50685850000"
                className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" />
                <span>{t.ctaPhone} <strong>+506 8585-0000</strong></span>
              </a>
            </div>
            <p className="mt-14 text-sm text-white/50">
              {locale === "es" ? "¿Quieres aprender más sobre pisos epóxicos?" : "Want to learn more about epoxy floors?"}{" "}
              <Link href={`/${locale}/guias`} className="inline-flex items-center gap-1 font-medium text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline">
                {locale === "es" ? "Explora nuestras guías" : "Explore our guides"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
