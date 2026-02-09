/* --------------------------------------------------------------------------
 *  EpoxyFloorsPage · SobrePoxi — Complete redesign
 *  Most indexed page on Google — premium design with images, gallery,
 *  FAQ schema, testimonials and dense SEO content
 * ----------------------------------------------------------------------- */

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seoConfig";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/structuredData";
import { ChevronRight, ArrowRight, Star, Shield, Paintbrush, Sparkles, CheckCircle2, Phone } from "lucide-react";

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

  /* ── Gallery images ── */
  const galleryImages = [
    { src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/black-mirror-floor/mesa_sombra.webp", alt: locale === "es" ? "Piso epóxico negro espejo de alto brillo" : "High-gloss black mirror epoxy floor" },
    { src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/black-mirror-floor/5.webp", alt: locale === "es" ? "Piso epóxico metálico efecto mármol negro" : "Black marble metallic epoxy floor" },
    { src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/pisob/pisob1.webp", alt: locale === "es" ? "Piso epóxico decorativo efecto oceánico" : "Oceanic effect decorative epoxy floor" },
    { src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/pisob/pisob2.webp", alt: locale === "es" ? "Detalle de piso epóxico con efecto metálico azul" : "Blue metallic epoxy floor detail" },
    { src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/pisog/pisog1.webp", alt: locale === "es" ? "Piso epóxico gris efecto concreto pulido" : "Grey polished concrete effect epoxy floor" },
    { src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/pisog/pisog2.webp", alt: locale === "es" ? "Piso epóxico metálico gris para interiores" : "Grey metallic epoxy floor for interiors" },
    { src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/pisog/pisog3.webp", alt: locale === "es" ? "Piso epóxico efecto piedra natural" : "Natural stone effect epoxy floor" },
    { src: "https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/lujo1.webp", alt: locale === "es" ? "Piso epóxico de lujo instalado en residencia" : "Luxury epoxy floor installed in residence" },
  ];

  /* ── Copy ── */
  const t = {
    breadcrumbHome: locale === "es" ? "Inicio" : "Home",
    heroTag: locale === "es" ? "Pisos Epóxicos Profesionales" : "Professional Epoxy Floors",
    heroTitle: locale === "es"
      ? "El piso que tu espacio merece"
      : "The floor your space deserves",
    heroSub: locale === "es"
      ? "Superficies sin juntas, ultra resistentes y con diseños únicos que transforman cocheras, salas, comercios e industrias en toda Costa Rica."
      : "Seamless, ultra-resistant surfaces with unique designs that transform garages, living rooms, commercial and industrial spaces across Costa Rica.",
    heroCta: locale === "es" ? "Cotización gratuita" : "Free quote",
    heroSecondary: locale === "es" ? "Ver galería" : "View gallery",
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
      { icon: "sparkles", name: "Metálico 3D", desc: "Efectos lava, océano, mármol y galaxia con pigmentos metálicos. Cada piso es único e irrepetible. Ideal para salas, lobbies y espacios premium.", tag: "Más popular" },
      { icon: "shield", name: "Industrial de Alto Tráfico", desc: "100% sólidos con cuarzo broadcast. Resiste montacargas, químicos y tráfico pesado 24/7. Para bodegas, fábricas y estacionamientos.", tag: "Máxima resistencia" },
      { icon: "paintbrush", name: "Escamas Decorativas", desc: "Escamas de vinilo multicolor sobre resina. Textura antideslizante natural. Perfecto para cocheras, gimnasios y locales comerciales.", tag: "Versátil" },
      { icon: "star", name: "Autonivelante Sólido", desc: "Superficie lisa como espejo en color sólido personalizado. Acabado minimalista para oficinas, clínicas y espacios modernos.", tag: "Elegante" },
    ] : [
      { icon: "sparkles", name: "3D Metallic", desc: "Lava, ocean, marble and galaxy effects with metallic pigments. Each floor is unique. Ideal for living rooms, lobbies and premium spaces.", tag: "Most popular" },
      { icon: "shield", name: "Industrial Heavy-Duty", desc: "100% solids with quartz broadcast. Withstands forklifts, chemicals and 24/7 heavy traffic. For warehouses, factories and parking.", tag: "Maximum resistance" },
      { icon: "paintbrush", name: "Decorative Flakes", desc: "Multi-color vinyl flakes over resin. Natural anti-slip texture. Perfect for garages, gyms and commercial spaces.", tag: "Versatile" },
      { icon: "star", name: "Self-Leveling Solid", desc: "Mirror-smooth surface in custom solid color. Minimalist finish for offices, clinics and modern spaces.", tag: "Elegant" },
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
    ctaTitle: locale === "es" ? "¿Listo para transformar tu espacio?" : "Ready to transform your space?",
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

  const iconMap: Record<string, React.ReactNode> = {
    sparkles: <Sparkles className="h-6 w-6" />,
    shield: <Shield className="h-6 w-6" />,
    paintbrush: <Paintbrush className="h-6 w-6" />,
    star: <Star className="h-6 w-6" />,
  };

  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <Script id="epoxy-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="epoxy-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="ld-epoxy-service" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": locale === "es" ? "Instalación de Pisos Epóxicos" : "Epoxy Floor Installation",
          "provider": {
            "@type": "LocalBusiness",
            "name": "SobrePoxi",
            "address": { "@type": "PostalAddress", "streetAddress": "Centro Comercial Velasuma, 2da. Planta local No. 9, San Isidro Downtown", "addressLocality": "Vásquez de Coronado", "addressRegion": "San Isidro", "postalCode": "11101", "addressCountry": "CR" },
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
        })}
      </Script>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <Image
          src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/luxury-floor.webp"
          alt={locale === "es" ? "Piso epóxico de lujo instalado por SobrePoxi en Costa Rica" : "Luxury epoxy floor installed by SobrePoxi in Costa Rica"}
          fill
          priority
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-gray-400">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">{t.breadcrumbHome}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{locale === "es" ? "Pisos Epóxicos" : "Epoxy Floors"}</span>
          </nav>

          <span className="inline-block mb-4 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 px-4 py-1.5 text-sm font-medium">
            {t.heroTag}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-2xl leading-tight">
            <span className="gold-gradient-bright">{t.heroTitle}</span>
          </h1>
          <p className="text-lg text-gray-200 mb-8 max-w-xl leading-relaxed">
            {t.heroSub}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 bg-gold-gradient px-6 py-3.5 rounded-lg font-semibold text-black hover:opacity-90 transition-opacity"
            >
              {t.heroCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#galeria"
              className="inline-flex items-center gap-2 border border-white/30 px-6 py-3.5 rounded-lg font-medium text-white hover:bg-white/10 transition-colors"
            >
              {t.heroSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="bg-[#1a1a1a] border-y border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {t.stats.map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold gold-gradient-bright">{value}</p>
              <p className="text-sm text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ WHAT IS ═══════════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.whatTitle}</h2>
            <p className="text-gray-300 leading-relaxed text-lg">{t.whatContent}</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {(locale === "es"
                ? ["Sin juntas", "Resistente a químicos", "Ultra duradero", "Fácil de limpiar", "Antideslizante", "Personalizable"]
                : ["Seamless", "Chemical resistant", "Ultra durable", "Easy to clean", "Anti-slip", "Customizable"]
              ).map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/black-mirror-floor/mesa_sombra.webp"
              alt={locale === "es" ? "Piso epóxico negro espejo de alta calidad" : "High quality black mirror epoxy floor"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════ TYPES ═══════════════ */}
      <section className="py-16 md:py-24 bg-[#0e0e0e]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">{t.typesTitle}</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            {locale === "es"
              ? "Cada espacio tiene necesidades únicas. Te ayudamos a elegir el sistema perfecto."
              : "Each space has unique needs. We help you choose the perfect system."}
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {t.types.map((type) => (
              <div key={type.name} className="relative bg-[#1a1a1a] rounded-xl p-6 border border-gray-800 hover:border-amber-600/40 transition-colors group">
                {type.tag && (
                  <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 rounded-full px-2.5 py-0.5">
                    {type.tag}
                  </span>
                )}
                <div className="w-12 h-12 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center mb-4">
                  {iconMap[type.icon]}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">{type.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ GALLERY ═══════════════ */}
      <section id="galeria" className="py-16 md:py-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">{t.galleryTitle}</h2>
          <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">{t.gallerySub}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className={`relative rounded-xl overflow-hidden ${i === 0 || i === 5 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-[3/4]"}`}>
                <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PROCESS ═══════════════ */}
      <section className="py-16 md:py-24 bg-[#0e0e0e]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">{t.processTitle}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {t.steps.map((step) => (
              <div key={step.num} className="flex gap-5">
                <div className="shrink-0 w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center text-black font-bold text-lg">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHERE ═══════════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">{t.whereTitle}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {t.whereItems.map((item) => (
              <div key={item} className="flex items-center gap-3 bg-[#1a1a1a] rounded-lg px-4 py-3 border border-gray-800">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="py-16 md:py-24 bg-[#0e0e0e]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">{t.testimonialsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {t.testimonials.map((test) => (
              <div key={test.name} className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: test.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">&ldquo;{test.text}&rdquo;</p>
                <div>
                  <p className="text-white font-semibold text-sm">{test.name}</p>
                  <p className="text-gray-500 text-xs">{test.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">{t.faqTitle}</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-gray-800 bg-[#1a1a1a] overflow-hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 text-white font-medium hover:bg-gray-800/50 transition-colors">
                  <span className="text-sm md:text-base">{faq.question}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-4 text-gray-300 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ GUIDES LINK ═══════════════ */}
      <section className="py-12 bg-[#0e0e0e]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-3">
            {locale === "es"
              ? "¿Quieres aprender más sobre pisos epóxicos?"
              : "Want to learn more about epoxy floors?"}
          </p>
          <Link
            href={`/${locale}/guias`}
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium transition-colors"
          >
            {locale === "es" ? "Explora nuestras guías completas" : "Explore our complete guides"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <Image
          src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/industrial-floor.webp"
          alt={locale === "es" ? "Piso epóxico industrial instalado por SobrePoxi" : "Industrial epoxy floor by SobrePoxi"}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.ctaTitle}</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">{t.ctaSub}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 bg-gold-gradient px-8 py-4 rounded-lg font-semibold text-black hover:opacity-90 transition-opacity"
            >
              {t.ctaButton}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+50685850000"
              className="inline-flex items-center gap-2 text-white hover:text-amber-400 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>{t.ctaPhone} <strong>+506 8585-0000</strong></span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
