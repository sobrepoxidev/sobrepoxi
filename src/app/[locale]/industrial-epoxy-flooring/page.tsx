/* --------------------------------------------------------------------------
 *  IndustrialEpoxyFlooringPage · SobrePoxi — Complete redesign
 *  Premium industrial flooring page with dense SEO content, FAQ schema,
 *  case studies, testimonials and structured data
 * ----------------------------------------------------------------------- */

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seoConfig";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/structuredData";
import {
  ChevronRight,
  ArrowRight,
  Star,
  Factory,
  Zap,
  CheckCircle2,
  Phone,
  HardHat,
  Truck,
  FlaskConical,
  Utensils,
} from "lucide-react";

export type tParams = Promise<{ id: string; locale: "es" | "en" }>;

/* ──────────── SEO metadata ──────────── */
export async function generateMetadata(
  { params }: { params: tParams }
): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    locale: locale === "es" ? "es" : "en",
    pathname: `/${locale}/industrial-epoxy-flooring`,
    title: locale === "es"
      ? "Pisos Epóxicos Industriales Costa Rica | Bodegas, Fábricas, Grado Alimenticio | SobrePoxi"
      : "Industrial Epoxy Floors Costa Rica | Warehouses, Factories, Food-Grade | SobrePoxi",
    description: locale === "es"
      ? "Pisos epóxicos industriales de alta resistencia para bodegas, fábricas, plantas alimenticias y zonas de alto tráfico en Costa Rica. Certificación HACCP. Instalación sin parar operaciones. Cotización gratuita."
      : "High-resistance industrial epoxy floors for warehouses, factories, food plants and high-traffic zones in Costa Rica. HACCP certified. Installation without stopping operations. Free quote.",
    keywords: locale === "es"
      ? "pisos epóxicos industriales, pisos bodegas Costa Rica, pisos fábricas, pisos grado alimenticio, pisos resistentes químicos, pisos alto tráfico, pisos HACCP, pisos industriales zona franca, sobrepoxi"
      : "industrial epoxy floors, warehouse floors Costa Rica, factory floors, food-grade flooring, chemical resistant floors, heavy traffic floors, HACCP flooring, free zone industrial floors, sobrepoxi"
  });
}

/* ════════════════════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                                            */
/* ════════════════════════════════════════════════════════════════════════════ */
export default async function IndustrialEpoxyFlooringPage(
  { params }: { params: tParams }
) {
  const { locale } = await params;

  /* ── Copy ── */
  const t = {
    breadcrumbHome: locale === "es" ? "Inicio" : "Home",
    heroTag: locale === "es" ? "Pisos Industriales de Alto Rendimiento" : "High-Performance Industrial Floors",
    heroTitle: locale === "es"
      ? "Pisos que resisten lo que tu industria exige"
      : "Floors that withstand what your industry demands",
    heroSub: locale === "es"
      ? "Sistemas epóxicos de 100% sólidos diseñados para bodegas, fábricas, plantas alimenticias y zonas de alto tráfico. Instalación sin parar operaciones en toda Costa Rica."
      : "100% solids epoxy systems designed for warehouses, factories, food plants and high-traffic zones. Installation without stopping operations across Costa Rica.",
    heroCta: locale === "es" ? "Evaluación técnica gratuita" : "Free technical assessment",
    heroSecondary: locale === "es" ? "Ver casos de estudio" : "View case studies",
    // Stats
    stats: locale === "es"
      ? [["20+", "Años de vida útil"], ["800+", "m² en una semana"], ["100%", "Sólidos"], ["24/7", "Resistencia continua"]]
      : [["20+", "Years lifespan"], ["800+", "sqm in one week"], ["100%", "Solids"], ["24/7", "Continuous resistance"]],
    // What section
    whatTitle: locale === "es" ? "¿Por qué pisos epóxicos industriales?" : "Why industrial epoxy floors?",
    whatContent: locale === "es"
      ? "Los pisos epóxicos industriales son recubrimientos de alta resistencia mecánica y química, formulados con resinas 100% sólidos y agregados de cuarzo. Se aplican sobre concreto existente creando una superficie monolítica sin juntas que resiste montacargas, derrames químicos, impactos y tráfico pesado continuo. A diferencia del concreto pulido, no generan polvo, son impermeables y cumplen con normas sanitarias internacionales como HACCP y FDA."
      : "Industrial epoxy floors are high-mechanical and chemical-resistance coatings, formulated with 100% solids resins and quartz aggregates. Applied over existing concrete, they create a monolithic seamless surface that withstands forklifts, chemical spills, impacts and continuous heavy traffic. Unlike polished concrete, they don't generate dust, are waterproof and comply with international sanitary standards like HACCP and FDA.",
    // Industries
    industriesTitle: locale === "es" ? "Sectores que servimos" : "Industries we serve",
    industries: locale === "es" ? [
      { icon: "utensils", name: "Plantas alimenticias", desc: "Pisos grado alimenticio con certificación HACCP. Superficie antimicrobiana, fácil de limpiar y sin juntas donde se acumule bacteria. Resistente a lavados con químicos agresivos y agua a presión." },
      { icon: "factory", name: "Fábricas y manufactura", desc: "Sistemas de alta resistencia mecánica con cuarzo broadcast. Soportan impactos de herramientas, vibración de maquinaria pesada y tráfico de montacargas 24/7 sin deterioro." },
      { icon: "truck", name: "Bodegas y centros logísticos", desc: "Pisos de alto tráfico con señalización integrada (carriles, zonas de seguridad, áreas de carga). Resistentes a abrasión por llantas de montacargas y carretillas." },
      { icon: "flask", name: "Farmacéutica y laboratorios", desc: "Ambientes controlados con acabados antimicrobianos. Salas limpias clase 100,000+. Resistencia a solventes, ácidos y productos químicos de laboratorio." },
      { icon: "hardhat", name: "Automotriz y talleres", desc: "Resistencia extrema a aceites, combustibles, líquido de frenos y solventes. Superficies antideslizantes incluso con derrames. Fácil limpieza y mantenimiento." },
      { icon: "zap", name: "Electrónica y ESD", desc: "Pisos conductivos y disipadores de estática (ESD) para proteger componentes electrónicos sensibles. Cumplimiento de normas ANSI/ESD S20.20." },
    ] : [
      { icon: "utensils", name: "Food processing plants", desc: "Food-grade floors with HACCP certification. Antimicrobial surface, easy to clean with no joints where bacteria can accumulate. Resistant to aggressive chemical washes and pressure water." },
      { icon: "factory", name: "Factories & manufacturing", desc: "High mechanical resistance systems with quartz broadcast. Withstand tool impacts, heavy machinery vibration and 24/7 forklift traffic without deterioration." },
      { icon: "truck", name: "Warehouses & logistics", desc: "High-traffic floors with integrated signage (lanes, safety zones, loading areas). Resistant to abrasion from forklift and cart tires." },
      { icon: "flask", name: "Pharmaceutical & labs", desc: "Controlled environments with antimicrobial finishes. Clean rooms class 100,000+. Resistant to solvents, acids and lab chemicals." },
      { icon: "hardhat", name: "Automotive & workshops", desc: "Extreme resistance to oils, fuels, brake fluid and solvents. Anti-slip surfaces even with spills. Easy cleaning and maintenance." },
      { icon: "zap", name: "Electronics & ESD", desc: "Conductive and static-dissipative (ESD) floors to protect sensitive electronic components. ANSI/ESD S20.20 compliance." },
    ],
    // Tech specs
    techSpecsTitle: locale === "es" ? "Especificaciones técnicas" : "Technical specifications",
    techSpecs: locale === "es" ? [
      ["Resistencia a compresión", "> 80 MPa (> 11,600 psi)"],
      ["Resistencia a flexión", "> 30 MPa"],
      ["Adherencia al sustrato", "> 2.5 MPa (fallo de concreto)"],
      ["Resistencia química", "Ácidos, álcalis, solventes, combustibles"],
      ["Antideslizamiento", "Configurable R9 a R13 según norma DIN 51130"],
      ["Espesor del sistema", "2–6 mm según requerimiento"],
      ["Tiempo de curado", "Tráfico peatonal: 24h | Completo: 5–7 días"],
      ["Vida útil esperada", "15–25 años con mantenimiento básico"],
    ] : [
      ["Compressive strength", "> 80 MPa (> 11,600 psi)"],
      ["Flexural strength", "> 30 MPa"],
      ["Bond to substrate", "> 2.5 MPa (concrete failure)"],
      ["Chemical resistance", "Acids, alkalis, solvents, fuels"],
      ["Anti-slip rating", "Configurable R9 to R13 per DIN 51130"],
      ["System thickness", "2–6 mm per requirement"],
      ["Curing time", "Foot traffic: 24h | Full cure: 5–7 days"],
      ["Expected lifespan", "15–25 years with basic maintenance"],
    ],
    // Case studies
    caseStudiesTitle: locale === "es" ? "Casos de estudio" : "Case studies",
    caseStudiesSub: locale === "es"
      ? "Proyectos reales que demuestran el rendimiento de nuestros sistemas industriales"
      : "Real projects that demonstrate the performance of our industrial systems",
    // Process
    processTitle: locale === "es" ? "Nuestro proceso industrial" : "Our industrial process",
    steps: locale === "es" ? [
      { num: "01", title: "Diagnóstico técnico", desc: "Evaluamos humedad, nivelación, resistencia del concreto y condiciones operativas. Definimos el sistema ideal según las exigencias de tu industria." },
      { num: "02", title: "Preparación mecánica", desc: "Esmerilado diamantado o granallado para crear el perfil de anclaje óptimo. Reparación de juntas, grietas y fisuras del sustrato existente." },
      { num: "03", title: "Aplicación del sistema", desc: "Primer de penetración profunda, capa base de epóxico 100% sólidos con agregados de cuarzo, y capas intermedias según el sistema seleccionado." },
      { num: "04", title: "Sellado y señalización", desc: "Topcoat de poliuretano o poliaspártico con protección UV. Demarcación de carriles, zonas de seguridad y áreas especiales con pintura epóxica." },
    ] : [
      { num: "01", title: "Technical assessment", desc: "We evaluate moisture, leveling, concrete strength and operational conditions. Define the ideal system based on your industry demands." },
      { num: "02", title: "Mechanical preparation", desc: "Diamond grinding or shot blasting to create optimal anchor profile. Joint repair, crack and fissure patching of existing substrate." },
      { num: "03", title: "System application", desc: "Deep-penetration primer, 100% solids epoxy base coat with quartz aggregates, and intermediate layers per selected system." },
      { num: "04", title: "Sealing & signage", desc: "Polyurethane or polyaspartic topcoat with UV protection. Lane marking, safety zones and special areas with epoxy paint." },
    ],
    // Benefits
    benefitsTitle: locale === "es" ? "Ventajas competitivas" : "Competitive advantages",
    benefits: locale === "es" ? [
      ["Sin parar operaciones", "Trabajamos por secciones, en turnos nocturnos o fines de semana para minimizar impacto en su producción."],
      ["Cumplimiento normativo", "Sistemas que satisfacen HACCP, FDA, OSHA y regulaciones sanitarias internacionales."],
      ["Señalización integrada", "Carriles de tráfico, zonas de seguridad, códigos de color y demarcaciones incluidas en la instalación."],
      ["Resistencia extrema", "Soporta montacargas, químicos agresivos, impactos pesados y temperaturas de -20°C a +80°C."],
      ["Cero generación de polvo", "Elimina el polvo de concreto que contamina productos y afecta la salud de los trabajadores."],
      ["ROI comprobado", "Inversión que se paga sola: reduce mantenimiento, evita paros y extiende la vida útil del piso 3-5x vs concreto."],
    ] : [
      ["No downtime", "We work in sections, night shifts or weekends to minimize impact on your production."],
      ["Regulatory compliance", "Systems that meet HACCP, FDA, OSHA and international sanitary regulations."],
      ["Integrated signage", "Traffic lanes, safety zones, color codes and markings included in installation."],
      ["Extreme resistance", "Withstands forklifts, aggressive chemicals, heavy impacts and temperatures from -20°C to +80°C."],
      ["Zero dust generation", "Eliminates concrete dust that contaminates products and affects worker health."],
      ["Proven ROI", "Investment that pays for itself: reduces maintenance, avoids shutdowns and extends floor life 3-5x vs concrete."],
    ],
    // Testimonials
    testimonialsTitle: locale === "es" ? "Lo que dicen nuestros clientes industriales" : "What our industrial clients say",
    testimonials: locale === "es" ? [
      { name: "Ing. Roberto Solano", role: "Gerente de planta, Heredia", text: "Instalaron 800m² en nuestra bodega sin parar operaciones. Trabajaron viernes a domingo y el lunes los montacargas ya circulaban sin problema. La inversión se ha pagado sola en reducción de mantenimiento.", stars: 5 },
      { name: "Lic. Andrea Mora", role: "Directora de operaciones, Alajuela", text: "Nuestra planta alimenticia pasó la auditoría HACCP sin una sola observación en pisos. El acabado antimicrobiano y sin juntas fue exactamente lo que necesitábamos.", stars: 5 },
      { name: "Mario Quesada", role: "Jefe de logística, Zona Franca", text: "El piso con señalización integrada transformó nuestras operaciones. Redujimos incidentes de tráfico interno un 60% y la limpieza del almacén es 3 veces más rápida.", stars: 5 },
    ] : [
      { name: "Eng. Roberto Solano", role: "Plant manager, Heredia", text: "They installed 800sqm in our warehouse without stopping operations. Worked Friday to Sunday and Monday the forklifts were running smoothly. The investment has paid for itself in reduced maintenance.", stars: 5 },
      { name: "Andrea Mora", role: "Operations director, Alajuela", text: "Our food plant passed the HACCP audit without a single floor observation. The antimicrobial seamless finish was exactly what we needed.", stars: 5 },
      { name: "Mario Quesada", role: "Logistics manager, Free Zone", text: "The floor with integrated signage transformed our operations. We reduced internal traffic incidents by 60% and warehouse cleaning is 3x faster.", stars: 5 },
    ],
    // FAQ
    faqTitle: locale === "es" ? "Preguntas frecuentes" : "Frequently asked questions",
    // CTA
    ctaTitle: locale === "es" ? "¿Listo para mejorar sus instalaciones?" : "Ready to upgrade your facilities?",
    ctaSub: locale === "es"
      ? "Agenda una evaluación técnica gratuita. Nuestro ingeniero visita tu planta, evalúa condiciones y diseña la solución ideal para tu operación."
      : "Schedule a free technical assessment. Our engineer visits your plant, evaluates conditions and designs the ideal solution for your operation.",
    ctaButton: locale === "es" ? "Solicitar evaluación gratuita" : "Request free assessment",
    ctaPhone: locale === "es" ? "O llámanos:" : "Or call us:",
  };

  const faqs = locale === "es" ? [
    { question: "¿Cuánto cuesta un piso epóxico industrial en Costa Rica?", answer: "El precio varía según el sistema (estándar, grado alimenticio, ESD), el área total, la condición del concreto y los requerimientos especiales (señalización, antideslizamiento, etc.). Proyectos industriales típicos van desde $25 hasta $60+ por m². Solicita una evaluación técnica gratuita para recibir una cotización exacta." },
    { question: "¿Pueden instalar sin parar nuestras operaciones?", answer: "Sí. Trabajamos por secciones, en turnos nocturnos o fines de semana según las necesidades de tu planta. Hemos instalado miles de m² en plantas alimenticias y bodegas activas sin interrumpir producción ni logística." },
    { question: "¿El piso soporta montacargas pesados?", answer: "Absolutamente. Nuestros sistemas industriales de 100% sólidos con cuarzo broadcast están diseñados para tráfico de montacargas de hasta 10 toneladas las 24 horas del día, los 7 días de la semana. La clave está en la preparación del sustrato y el espesor del sistema (4-6mm para tráfico pesado)." },
    { question: "¿Cumplen con normas sanitarias para alimentos (HACCP)?", answer: "Sí. Ofrecemos sistemas de grado alimenticio con certificación HACCP, superficie antimicrobiana, sin juntas y resistentes a lavados con químicos agresivos y agua a presión. Ideales para plantas procesadoras, empacadoras y cocinas industriales." },
    { question: "¿Qué pasa si el concreto existente está muy dañado?", answer: "Evaluamos la condición del sustrato en la visita técnica. Podemos reparar grietas, juntas deterioradas, desniveles y zonas de baja resistencia antes de aplicar el sistema epóxico. En casos extremos, recomendamos una sobrecapa de mortero epóxico para reconstruir la superficie." },
    { question: "¿Cuánto dura un piso industrial epóxico?", answer: "Con mantenimiento básico (limpieza regular), un piso epóxico industrial profesionalmente instalado dura entre 15 y 25 años. Esto es 3-5 veces más que un concreto pulido expuesto a las mismas condiciones industriales." },
    { question: "¿Ofrecen pisos ESD/antiestáticos?", answer: "Sí. Tenemos sistemas conductivos y disipadores de estática (ESD) que cumplen con normas ANSI/ESD S20.20 para plantas electrónicas, salas de servidores y ambientes donde la estática puede dañar componentes sensibles." },
    { question: "¿Trabajan en todo Costa Rica?", answer: "Sí. Realizamos proyectos industriales en toda la GAM, zonas francas (Coyol, Ultra Park, Forum), Guanacaste, zona norte y zona sur. Coordinamos logística para proyectos fuera de la GAM." },
  ] : [
    { question: "How much does an industrial epoxy floor cost in Costa Rica?", answer: "Price varies by system (standard, food-grade, ESD), total area, concrete condition and special requirements (signage, anti-slip, etc.). Typical industrial projects range from $25 to $60+ per sqm. Request a free technical assessment for an exact quote." },
    { question: "Can you install without stopping our operations?", answer: "Yes. We work in sections, night shifts or weekends per your plant's needs. We've installed thousands of sqm in active food plants and warehouses without interrupting production or logistics." },
    { question: "Does the floor withstand heavy forklifts?", answer: "Absolutely. Our 100% solids industrial systems with quartz broadcast are designed for forklift traffic up to 10 tons, 24/7. The key is proper substrate preparation and system thickness (4-6mm for heavy traffic)." },
    { question: "Do you meet HACCP food safety standards?", answer: "Yes. We offer food-grade systems with HACCP certification, antimicrobial surface, seamless and resistant to aggressive chemical washes and pressure water. Ideal for processing plants, packaging and industrial kitchens." },
    { question: "What if our existing concrete is badly damaged?", answer: "We evaluate substrate condition during the technical visit. We can repair cracks, deteriorated joints, uneven areas and low-resistance zones before applying the epoxy system." },
    { question: "How long does an industrial epoxy floor last?", answer: "With basic maintenance (regular cleaning), a professionally installed industrial epoxy floor lasts 15-25 years. That's 3-5x longer than polished concrete under the same industrial conditions." },
  ];

  /* ── Structured data ── */
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t.breadcrumbHome, url: `/${locale}` },
    { name: locale === "es" ? "Pisos Industriales" : "Industrial Floors", url: `/${locale}/industrial-epoxy-flooring` },
  ]);
  const faqSchema = generateFAQSchema(faqs);

  const iconMap: Record<string, React.ReactNode> = {
    utensils: <Utensils className="h-6 w-6" />,
    factory: <Factory className="h-6 w-6" />,
    truck: <Truck className="h-6 w-6" />,
    flask: <FlaskConical className="h-6 w-6" />,
    hardhat: <HardHat className="h-6 w-6" />,
    zap: <Zap className="h-6 w-6" />,
  };

  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <Script id="industrial-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="industrial-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="ld-industrial-service" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": locale === "es" ? "Pisos Epóxicos Industriales" : "Industrial Epoxy Flooring",
          "provider": {
            "@type": "LocalBusiness",
            "name": "SobrePoxi",
            "address": { "@type": "PostalAddress", "streetAddress": "Centro Comercial Velasuma, 2da. Planta local No. 9, San Isidro Downtown", "addressLocality": "Vásquez de Coronado", "addressRegion": "San Isidro", "postalCode": "11101", "addressCountry": "CR" },
            "telephone": "+50685850000",
            "email": "info@sobrepoxi.com"
          },
          "areaServed": { "@type": "Country", "name": "Costa Rica" },
          "description": locale === "es"
            ? "Pisos epóxicos industriales de alta resistencia para bodegas, fábricas, plantas alimenticias y zonas de alto tráfico en Costa Rica."
            : "High-resistance industrial epoxy floors for warehouses, factories, food plants and high-traffic zones in Costa Rica.",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": locale === "es" ? "Sistemas Industriales" : "Industrial Systems",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Food-Grade Epoxy (HACCP)" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Heavy-Duty Quartz Broadcast" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "ESD / Anti-Static Flooring" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Chemical-Resistant Coatings" } },
            ]
          }
        })}
      </Script>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <Image
          src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/industrial-floor.webp"
          alt={locale === "es" ? "Piso epóxico industrial de alto rendimiento por SobrePoxi en Costa Rica" : "High-performance industrial epoxy floor by SobrePoxi in Costa Rica"}
          fill
          priority
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-gray-400">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">{t.breadcrumbHome}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{locale === "es" ? "Pisos Industriales" : "Industrial Floors"}</span>
          </nav>

          <span className="inline-block mb-4 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 px-4 py-1.5 text-sm font-medium">
            {t.heroTag}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-3xl leading-tight">
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
              href="#casos"
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

      {/* ═══════════════ WHY INDUSTRIAL ═══════════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.whatTitle}</h2>
            <p className="text-gray-300 leading-relaxed text-lg">{t.whatContent}</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {(locale === "es"
                ? ["Sin juntas ni poros", "Resiste montacargas", "Grado alimenticio", "Cero generación de polvo", "Señalización integrada", "Antideslizante configurable"]
                : ["Seamless & non-porous", "Forklift-rated", "Food-grade available", "Zero dust generation", "Integrated signage", "Configurable anti-slip"]
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
              src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/industrial.webp"
              alt={locale === "es" ? "Piso epóxico industrial en centro logístico" : "Industrial epoxy floor in logistics center"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════ INDUSTRIES ═══════════════ */}
      <section className="py-16 md:py-24 bg-[#0e0e0e]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">{t.industriesTitle}</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            {locale === "es"
              ? "Cada industria tiene exigencias únicas. Diseñamos el sistema ideal para su operación."
              : "Each industry has unique demands. We design the ideal system for your operation."}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.industries.map((ind) => (
              <div key={ind.name} className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800 hover:border-amber-600/40 transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center mb-4">
                  {iconMap[ind.icon]}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">{ind.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TECH SPECS ═══════════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">{t.techSpecsTitle}</h2>
          <div className="rounded-xl border border-gray-800 overflow-hidden">
            {t.techSpecs.map(([property, value], idx) => (
              <div key={property} className={`flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 ${idx % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#151515]"} ${idx < t.techSpecs.length - 1 ? "border-b border-gray-800/50" : ""}`}>
                <span className="font-medium text-white text-sm">{property}</span>
                <span className="text-amber-400 text-sm font-mono mt-1 sm:mt-0">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CASE STUDIES ═══════════════ */}
      <section id="casos" className="py-16 md:py-24 bg-[#0e0e0e] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">{t.caseStudiesTitle}</h2>
          <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">{t.caseStudiesSub}</p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Case 1 */}
            <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-800 group">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/after-before.webp"
                  alt={locale === "es" ? "Antes y después piso epóxico planta alimenticia" : "Before and after food plant epoxy floor"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-amber-400 bg-amber-400/10 rounded-full px-2.5 py-0.5 mb-3 inline-block">
                  {locale === "es" ? "Grado alimenticio · HACCP" : "Food-grade · HACCP"}
                </span>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {locale === "es" ? "Planta de Producción Alimentaria — Coyol, Alajuela" : "Food Production Facility — Coyol, Alajuela"}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  {locale === "es"
                    ? "1,200 m² de piso epóxico grado alimenticio con certificación HACCP. El cliente necesitaba reemplazar un piso deteriorado que no cumplía estándares sanitarios."
                    : "1,200 sqm food-grade epoxy floor with HACCP certification. Client needed to replace a deteriorated floor that didn't meet sanitary standards."}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(locale === "es" ? ["1,200 m²", "Grado alimenticio", "Sin parar operaciones"] : ["1,200 sqm", "Food-grade", "No downtime"]).map((tag) => (
                    <span key={tag} className="text-xs text-gray-500 bg-gray-800 rounded-full px-2.5 py-0.5">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* Case 2 */}
            <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-800 group">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/industrial.webp"
                  alt={locale === "es" ? "Centro de distribución logística con piso epóxico" : "Logistics distribution center with epoxy floor"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-amber-400 bg-amber-400/10 rounded-full px-2.5 py-0.5 mb-3 inline-block">
                  {locale === "es" ? "Alto tráfico · Señalización" : "Heavy traffic · Signage"}
                </span>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {locale === "es" ? "Centro de Distribución — Zona Franca Metropolitana" : "Distribution Center — Metropolitan Free Zone"}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  {locale === "es"
                    ? "800 m² de piso de alto tránsito con señalización integrada. Carriles de montacargas, zonas de carga y demarcación de seguridad incluidos."
                    : "800 sqm high-traffic floor with integrated signage. Forklift lanes, loading zones and safety markings included."}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(locale === "es" ? ["800 m²", "Señalización integrada", "Fin de semana"] : ["800 sqm", "Integrated signage", "Weekend install"]).map((tag) => (
                    <span key={tag} className="text-xs text-gray-500 bg-gray-800 rounded-full px-2.5 py-0.5">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PROCESS ═══════════════ */}
      <section className="py-16 md:py-24">
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

      {/* ═══════════════ BENEFITS ═══════════════ */}
      <section className="py-16 md:py-24 bg-[#0e0e0e]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">{t.benefitsTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.benefits.map(([title, text]) => (
              <div key={title} className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="py-16 md:py-24">
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
      <section className="py-16 md:py-24 bg-[#0e0e0e]">
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
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-3">
            {locale === "es"
              ? "¿Quieres aprender más sobre pisos industriales?"
              : "Want to learn more about industrial floors?"}
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
          alt={locale === "es" ? "Piso epóxico industrial SobrePoxi" : "SobrePoxi industrial epoxy floor"}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/80" />
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
