/* --------------------------------------------------------------------------
 *  LuxuryFurniturePage · SobrePoxi — Complete redesign
 *  Premium furniture page with dense SEO content, gallery, FAQ schema,
 *  testimonials, process and structured data
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
  CheckCircle2,
  Phone,
  Gem,
  TreePine,
  Palette,
  Hotel,
  UtensilsCrossed,
  Building2,
  Handshake,
  Store,
  Lamp,
} from "lucide-react";

export type tParams = Promise<{ id: string; locale: "es" | "en" }>;

/* ──────────── SEO metadata ──────────── */
export async function generateMetadata(
  { params }: { params: tParams }
): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    locale: locale === "es" ? "es" : "en",
    pathname: `/${locale}/luxury-furniture`,
    title: locale === "es"
      ? "Muebles de Lujo en Resina Epóxica y Madera | Mesas River, Escritorios | SobrePoxi"
      : "Luxury Epoxy Resin & Wood Furniture | River Tables, Desks | SobrePoxi",
    description: locale === "es"
      ? "Muebles artesanales de lujo en resina epóxica y madera para hogares, hoteles y oficinas en Costa Rica. Mesas river table, escritorios, barras y piezas únicas hechas a mano. Diseño personalizado."
      : "Handcrafted luxury epoxy resin and wood furniture for homes, hotels and offices in Costa Rica. River tables, desks, bars and unique handmade pieces. Custom design.",
    keywords: locale === "es"
      ? "muebles resina epóxica, mesas river table Costa Rica, muebles lujo madera, mesas epóxicas, escritorios resina, barras epóxicas, muebles artesanales, muebles hotel, sobrepoxi"
      : "epoxy resin furniture, river tables Costa Rica, luxury wood furniture, epoxy tables, resin desks, epoxy bars, artisan furniture, hotel furniture, sobrepoxi"
  });
}

/* ════════════════════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                                            */
/* ════════════════════════════════════════════════════════════════════════════ */
export default async function LuxuryFurniturePage(
  { params }: { params: tParams }
) {
  const { locale } = await params;

  /* ── Gallery images ── */
  const galleryImages = [
    { src: "https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/hero_banner2-UU5JSGUliJzY8K0pdtxeg0AeGpHaUq.webp", alt: locale === "es" ? "Mesa river table de resina epóxica y madera de Guanacaste" : "River table in epoxy resin and Guanacaste wood" },
    { src: "https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/hero-7P2YkpjviaOMNuCSiZzgwWXpIRzcGc.webp", alt: locale === "es" ? "Mesa river de madera y resina turquesa" : "River table with turquoise resin and wood" },
    { src: "https://jhrrachvacurxgotsvbf.supabase.co/storage/v1/object/public/products/black-mirror-floor/mesa_sombra.webp", alt: locale === "es" ? "Mesa con acabado espejo negro en resina epóxica" : "Black mirror finish epoxy resin table" },
    { src: "https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/lujo1.webp", alt: locale === "es" ? "Pieza de mobiliario de lujo con resina y madera" : "Luxury furniture piece with resin and wood" },
  ];

  /* ── Copy ── */
  const t = {
    breadcrumbHome: locale === "es" ? "Inicio" : "Home",
    heroTag: locale === "es" ? "Muebles Artesanales de Lujo" : "Handcrafted Luxury Furniture",
    heroTitle: locale === "es"
      ? "Arte funcional que transforma espacios"
      : "Functional art that transforms spaces",
    heroSub: locale === "es"
      ? "Piezas únicas talladas a mano que combinan madera noble costarricense con resina epóxica cristalina. Mesas river table, escritorios, barras y mobiliario a medida para hogares, hoteles y oficinas."
      : "Unique handcrafted pieces combining Costa Rican fine wood with crystal-clear epoxy resin. River tables, desks, bars and custom furniture for homes, hotels and offices.",
    heroCta: locale === "es" ? "Solicitar diseño personalizado" : "Request custom design",
    heroSecondary: locale === "es" ? "Ver galería" : "View gallery",
    // Stats
    stats: locale === "es"
      ? [["100%", "Hecho a mano"], ["50+", "Piezas entregadas"], ["∞", "Diseños posibles"], ["20+", "Años de durabilidad"]]
      : [["100%", "Handmade"], ["50+", "Pieces delivered"], ["∞", "Possible designs"], ["20+", "Years durability"]],
    // What section
    whatTitle: locale === "es" ? "¿Qué son los muebles river table?" : "What are river table furniture?",
    whatContent: locale === "es"
      ? "Una river table es una pieza de mobiliario donde dos losas de madera natural se unen mediante un río de resina epóxica cristalina. La resina puede ser transparente, con pigmentos metálicos, con efectos de océano, galaxia o cualquier color que imagine. Cada pieza es irrepetible porque la veta de la madera y el flujo de la resina crean patrones únicos. Usamos maderas nobles costarricenses como Guanacaste, Cenízaro y Laurel, combinadas con resina epóxica de grado artístico libre de VOC."
      : "A river table is a furniture piece where two slabs of natural wood are joined by a river of crystal-clear epoxy resin. The resin can be transparent, with metallic pigments, ocean effects, galaxy effects or any color you imagine. Each piece is one-of-a-kind because the wood grain and resin flow create unique patterns. We use Costa Rican fine woods like Guanacaste, Cenízaro and Laurel, combined with VOC-free artistic-grade epoxy resin.",
    // Types
    typesTitle: locale === "es" ? "Nuestras creaciones" : "Our creations",
    types: locale === "es" ? [
      { icon: "gem", name: "River Tables", desc: "Mesas de comedor y centro con ríos de resina entre losas de madera noble. Desde diseños minimalistas transparentes hasta efectos de océano profundo con pigmentos metálicos.", tag: "Más solicitada" },
      { icon: "tree", name: "Escritorios Ejecutivos", desc: "Escritorios para oficinas y home office con combinaciones de madera y resina. Superficies amplias, resistentes a rayones y con opciones de pasacables integrados.", tag: "Profesional" },
      { icon: "palette", name: "Barras y Mostradores", desc: "Barras para restaurantes, cafeterías y hogares. Superficies continuas resistentes a líquidos con efectos visuales que se convierten en el centro de atención del espacio.", tag: "Impacto visual" },
      { icon: "lamp", name: "Piezas Decorativas", desc: "Mesas auxiliares, repisas flotantes, lámparas y arte de pared. Piezas de acento que complementan y elevan cualquier ambiente con la belleza natural de la madera y resina.", tag: "Acento" },
    ] : [
      { icon: "gem", name: "River Tables", desc: "Dining and coffee tables with resin rivers between fine wood slabs. From minimalist transparent designs to deep ocean effects with metallic pigments.", tag: "Most requested" },
      { icon: "tree", name: "Executive Desks", desc: "Desks for offices and home office with wood and resin combinations. Wide surfaces, scratch-resistant with integrated cable management options.", tag: "Professional" },
      { icon: "palette", name: "Bars & Countertops", desc: "Bars for restaurants, cafés and homes. Continuous liquid-resistant surfaces with visual effects that become the focal point of any space.", tag: "Visual impact" },
      { icon: "lamp", name: "Decorative Pieces", desc: "Side tables, floating shelves, lamps and wall art. Accent pieces that complement and elevate any environment with the natural beauty of wood and resin.", tag: "Accent" },
    ],
    // Gallery
    galleryTitle: locale === "es" ? "Galería de proyectos" : "Project gallery",
    gallerySub: locale === "es"
      ? "Cada pieza cuenta una historia — estos son algunos de nuestros trabajos reales"
      : "Each piece tells a story — these are some of our real projects",
    // Commercial
    commercialTitle: locale === "es" ? "Mobiliario para proyectos comerciales" : "Furniture for commercial projects",
    commercialContent: locale === "es"
      ? "Colaboramos con hoteles, restaurantes, oficinas corporativas y espacios comerciales para crear piezas que reflejan su identidad de marca. Construcción reforzada para uso de alto tráfico con acabados que mantienen su belleza por décadas."
      : "We collaborate with hotels, restaurants, corporate offices and commercial spaces to create pieces that reflect your brand identity. Reinforced construction for high-traffic use with finishes that maintain their beauty for decades.",
    commercialSectors: locale === "es" ? [
      { icon: "hotel", name: "Hoteles Boutique", desc: "Lobbies, habitaciones y áreas comunes con piezas que definen la experiencia del huésped." },
      { icon: "utensils", name: "Restaurantes y Cafés", desc: "Mesas, barras y mostradores que se convierten en el elemento diferenciador de su marca." },
      { icon: "building", name: "Oficinas Corporativas", desc: "Escritorios ejecutivos y mesas de conferencia que proyectan imagen de innovación." },
      { icon: "handshake", name: "Recepciones y Lobbies", desc: "Mostradores y piezas de recepción que causan una primera impresión inolvidable." },
      { icon: "store", name: "Retail y Showrooms", desc: "Exhibidores, vitrinas y mostradores que elevan la presentación de productos." },
    ] : [
      { icon: "hotel", name: "Boutique Hotels", desc: "Lobbies, rooms and common areas with pieces that define the guest experience." },
      { icon: "utensils", name: "Restaurants & Cafés", desc: "Tables, bars and counters that become your brand's differentiating element." },
      { icon: "building", name: "Corporate Offices", desc: "Executive desks and conference tables that project an innovative image." },
      { icon: "handshake", name: "Receptions & Lobbies", desc: "Reception desks and pieces that create an unforgettable first impression." },
      { icon: "store", name: "Retail & Showrooms", desc: "Displays, showcases and counters that elevate product presentation." },
    ],
    // Process
    processTitle: locale === "es" ? "Nuestro proceso artesanal" : "Our artisan process",
    steps: locale === "es" ? [
      { num: "01", title: "Consulta de diseño", desc: "Escuchamos tu visión, medimos el espacio y definimos juntos el diseño ideal: tipo de madera, color de resina, dimensiones y estilo. Te mostramos muestras de maderas y resinas." },
      { num: "02", title: "Selección de madera", desc: "Elegimos personalmente cada losa de madera por su veta, color y carácter. Usamos maderas nobles costarricenses secadas al horno para garantizar estabilidad dimensional." },
      { num: "03", title: "Taller artesanal", desc: "Preparamos la madera, construimos el molde, vertimos la resina en capas controladas y dejamos curar. Los diseños metálicos requieren técnicas especiales de manipulación de pigmentos." },
      { num: "04", title: "Lijado y pulido", desc: "Lijado progresivo desde grano 80 hasta 3000. Pulido a espejo que resalta la profundidad de la resina y la calidez de la veta natural de la madera." },
      { num: "05", title: "Acabado protector", desc: "Aplicamos topcoat de poliuretano resistente a UV, calor y rayones. Protección para uso diario sin perder la belleza del acabado cristalino." },
      { num: "06", title: "Entrega e instalación", desc: "Entregamos e instalamos en tu espacio. Incluimos guía de cuidado para que tu pieza mantenga su belleza por generaciones." },
    ] : [
      { num: "01", title: "Design consultation", desc: "We listen to your vision, measure the space and define the ideal design together: wood type, resin color, dimensions and style. We show you wood and resin samples." },
      { num: "02", title: "Wood selection", desc: "We personally select each wood slab for its grain, color and character. We use kiln-dried Costa Rican fine woods to guarantee dimensional stability." },
      { num: "03", title: "Artisan workshop", desc: "We prepare the wood, build the mold, pour resin in controlled layers and let it cure. Metallic designs require special pigment manipulation techniques." },
      { num: "04", title: "Sanding & polishing", desc: "Progressive sanding from 80 to 3000 grit. Mirror polish that highlights the depth of the resin and the warmth of the natural wood grain." },
      { num: "05", title: "Protective finish", desc: "We apply UV, heat and scratch-resistant polyurethane topcoat. Protection for daily use without losing the beauty of the crystal finish." },
      { num: "06", title: "Delivery & installation", desc: "We deliver and install in your space. Includes care guide so your piece maintains its beauty for generations." },
    ],
    // Testimonials
    testimonialsTitle: locale === "es" ? "Lo que dicen nuestros clientes" : "What our clients say",
    testimonials: locale === "es" ? [
      { name: "María Rodríguez", role: "Gerente, Hotel Boutique, Escazú", text: "Los muebles de SobrePoxi transformaron completamente el lobby de nuestro hotel. Nuestros huéspedes constantemente comentan sobre la belleza y originalidad de las piezas. La mesa river table del restaurante se convirtió en nuestra firma visual.", stars: 5 },
      { name: "Carlos Jiménez", role: "Arquitecto, Studio Design CR", text: "Como arquitecto, busco proveedores que entiendan la visión del diseño. El equipo de SobrePoxi no solo entendió nuestro concepto para la oficina, sino que lo elevó con su experiencia técnica en madera y resina.", stars: 5 },
      { name: "Ana Lucía Mora", role: "Propietaria, residencia en Santa Ana", text: "Nuestra mesa de comedor river table es el centro de todas las conversaciones cuando recibimos invitados. La calidad del acabado y la profundidad de la resina es impresionante. Vale cada colón.", stars: 5 },
    ] : [
      { name: "María Rodríguez", role: "Manager, Boutique Hotel, Escazú", text: "SobrePoxi's furniture completely transformed our hotel lobby. Our guests constantly comment on the beauty and originality of the pieces. The restaurant river table became our visual signature.", stars: 5 },
      { name: "Carlos Jiménez", role: "Architect, Studio Design CR", text: "As an architect, I look for vendors who understand design vision. The SobrePoxi team not only understood our office concept but elevated it with their technical expertise in wood and resin.", stars: 5 },
      { name: "Ana Lucía Mora", role: "Homeowner, Santa Ana", text: "Our dining river table is the center of every conversation when we have guests. The quality of the finish and the depth of the resin is impressive. Worth every colón.", stars: 5 },
    ],
    // FAQ
    faqTitle: locale === "es" ? "Preguntas frecuentes" : "Frequently asked questions",
    // CTA
    ctaTitle: locale === "es" ? "¿Listo para tu pieza única?" : "Ready for your unique piece?",
    ctaSub: locale === "es"
      ? "Agenda una consulta de diseño gratuita. Te mostramos maderas, colores de resina y creamos un diseño a la medida de tu espacio y visión."
      : "Schedule a free design consultation. We show you woods, resin colors and create a design tailored to your space and vision.",
    ctaButton: locale === "es" ? "Solicitar consulta gratuita" : "Request free consultation",
    ctaPhone: locale === "es" ? "O llámanos:" : "Or call us:",
  };

  const faqs = locale === "es" ? [
    { question: "¿Cuánto cuesta una mesa river table?", answer: "El precio depende del tamaño, tipo de madera, complejidad del diseño de resina y acabados especiales. Una mesa de centro inicia desde $800 y una mesa de comedor para 6-8 personas desde $2,500. Cada pieza se cotiza individualmente. Solicita una consulta gratuita para recibir un presupuesto exacto." },
    { question: "¿Cuánto tiempo toma fabricar una pieza?", answer: "El proceso completo toma entre 4 y 8 semanas dependiendo de la complejidad: selección de madera (1 semana), secado y preparación (1-2 semanas), vertido y curado de resina (1-2 semanas), lijado, pulido y acabado (1-2 semanas). Las piezas complejas con múltiples capas de resina pueden tomar hasta 10 semanas." },
    { question: "¿Qué tipos de madera utilizan?", answer: "Trabajamos con maderas nobles costarricenses: Guanacaste (nuestra favorita por sus vetas dramáticas), Cenízaro, Laurel, Cocobolo y Teca. Todas nuestras maderas son de fuentes sostenibles y secadas al horno para garantizar estabilidad. También podemos trabajar con maderas importadas bajo pedido." },
    { question: "¿La resina es tóxica?", answer: "No. Usamos resina epóxica de grado artístico libre de VOC (compuestos orgánicos volátiles). Una vez curada, la superficie es completamente inerte, segura para contacto con alimentos y no emite gases. Nuestras resinas tienen certificación de seguridad alimentaria." },
    { question: "¿Cómo cuido mi mueble de resina?", answer: "El mantenimiento es muy sencillo: limpieza diaria con paño húmedo y jabón neutro. Evite colocar objetos calientes directamente (use posavasos). No requiere encerado ni tratamientos especiales. El topcoat de poliuretano protege contra UV, rayones superficiales y líquidos." },
    { question: "¿Hacen muebles para proyectos comerciales?", answer: "Sí. Trabajamos con hoteles, restaurantes, oficinas y espacios comerciales. Nuestras piezas comerciales tienen construcción reforzada para uso de alto tráfico. Podemos producir series pequeñas (5-20 piezas) manteniendo el carácter artesanal y la unicidad de cada pieza." },
    { question: "¿Hacen envíos fuera de Costa Rica?", answer: "Actualmente nos enfocamos en Costa Rica donde podemos garantizar entrega e instalación personal. Para proyectos internacionales especiales, evaluamos caso por caso la logística de embalaje y envío." },
    { question: "¿Puedo elegir el color de la resina?", answer: "¡Por supuesto! Tenemos más de 50 pigmentos disponibles: transparentes, opacos, metálicos, neón y fosforescentes. Los efectos más populares son océano turquesa, galaxia púrpura, transparente cristalino y negro metálico. Te mostramos muestras físicas en la consulta de diseño." },
  ] : [
    { question: "How much does a river table cost?", answer: "Price depends on size, wood type, resin design complexity and special finishes. A coffee table starts from $800 and a 6-8 person dining table from $2,500. Each piece is individually quoted. Request a free consultation for an exact budget." },
    { question: "How long does it take to make a piece?", answer: "The complete process takes 4-8 weeks depending on complexity: wood selection (1 week), drying and preparation (1-2 weeks), resin pour and curing (1-2 weeks), sanding, polishing and finishing (1-2 weeks)." },
    { question: "What types of wood do you use?", answer: "We work with Costa Rican fine woods: Guanacaste (our favorite for its dramatic grain), Cenízaro, Laurel, Cocobolo and Teak. All our woods are sustainably sourced and kiln-dried for stability." },
    { question: "Is the resin toxic?", answer: "No. We use VOC-free artistic-grade epoxy resin. Once cured, the surface is completely inert, food-safe and emits no gases. Our resins have food safety certification." },
    { question: "How do I care for my resin furniture?", answer: "Very simple maintenance: daily cleaning with a damp cloth and neutral soap. Avoid placing hot objects directly (use coasters). No waxing or special treatments needed. The polyurethane topcoat protects against UV, superficial scratches and liquids." },
    { question: "Do you make furniture for commercial projects?", answer: "Yes. We work with hotels, restaurants, offices and commercial spaces. Our commercial pieces have reinforced construction for high-traffic use. We can produce small series (5-20 pieces) maintaining artisan character." },
  ];

  /* ── Structured data ── */
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t.breadcrumbHome, url: `/${locale}` },
    { name: locale === "es" ? "Muebles de Lujo" : "Luxury Furniture", url: `/${locale}/luxury-furniture` },
  ]);
  const faqSchema = generateFAQSchema(faqs);

  const typeIconMap: Record<string, React.ReactNode> = {
    gem: <Gem className="h-6 w-6" />,
    tree: <TreePine className="h-6 w-6" />,
    palette: <Palette className="h-6 w-6" />,
    lamp: <Lamp className="h-6 w-6" />,
  };

  const sectorIconMap: Record<string, React.ReactNode> = {
    hotel: <Hotel className="h-5 w-5" />,
    utensils: <UtensilsCrossed className="h-5 w-5" />,
    building: <Building2 className="h-5 w-5" />,
    handshake: <Handshake className="h-5 w-5" />,
    store: <Store className="h-5 w-5" />,
  };

  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <Script id="furniture-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="furniture-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="ld-furniture-product" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": locale === "es" ? "Muebles de Lujo en Resina Epóxica y Madera" : "Luxury Epoxy Resin & Wood Furniture",
          "brand": { "@type": "Brand", "name": "SobrePoxi" },
          "manufacturer": {
            "@type": "Organization",
            "name": "SobrePoxi",
            "address": { "@type": "PostalAddress", "streetAddress": "Centro Comercial Velasuma, 2da. Planta local No. 9, San Isidro Downtown", "addressLocality": "Vásquez de Coronado", "addressRegion": "San Isidro", "postalCode": "11101", "addressCountry": "CR" },
            "telephone": "+50685850000",
            "email": "info@sobrepoxi.com"
          },
          "description": locale === "es"
            ? "Muebles artesanales de lujo en resina epóxica y madera noble para hogares, hoteles y oficinas en Costa Rica."
            : "Handcrafted luxury epoxy resin and fine wood furniture for homes, hotels and offices in Costa Rica.",
          "material": ["Epoxy Resin", "Guanacaste Wood", "Cenízaro Wood", "Laurel Wood"],
          "offers": { "@type": "AggregateOffer", "areaServed": "Costa Rica", "availability": "https://schema.org/PreOrder", "priceCurrency": "USD", "lowPrice": "800" },
          "category": ["Luxury Furniture", "River Tables", "Epoxy Resin Furniture", "Custom Furniture", "Hospitality Furniture"],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Luxury Furniture Collection",
            "itemListElement": [
              { "@type": "OfferCatalog", "name": "River Tables" },
              { "@type": "OfferCatalog", "name": "Executive Desks" },
              { "@type": "OfferCatalog", "name": "Bars & Countertops" },
              { "@type": "OfferCatalog", "name": "Decorative Pieces" },
              { "@type": "OfferCatalog", "name": "Hospitality Furniture" },
            ]
          }
        })}
      </Script>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <Image
          src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/hero_banner2-UU5JSGUliJzY8K0pdtxeg0AeGpHaUq.webp"
          alt={locale === "es" ? "Mesa river table de resina epóxica y madera de Guanacaste por SobrePoxi" : "River table in epoxy resin and Guanacaste wood by SobrePoxi"}
          fill
          priority
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-gray-400">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">{t.breadcrumbHome}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{locale === "es" ? "Muebles de Lujo" : "Luxury Furniture"}</span>
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
                ? ["Pieza única e irrepetible", "Madera noble costarricense", "Resina libre de VOC", "Acabado a espejo", "Resistente a líquidos", "Personalizable al 100%"]
                : ["One-of-a-kind piece", "Costa Rican fine wood", "VOC-free resin", "Mirror finish", "Liquid resistant", "100% customizable"]
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
              src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/hero-7P2YkpjviaOMNuCSiZzgwWXpIRzcGc.webp"
              alt={locale === "es" ? "Detalle de mesa river table con resina turquesa y madera" : "Detail of river table with turquoise resin and wood"}
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
              ? "Cada pieza nace de la colaboración entre tu visión y nuestras manos"
              : "Each piece is born from the collaboration between your vision and our hands"}
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
                  {typeIconMap[type.icon]}
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className={`relative rounded-xl overflow-hidden ${i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-[3/4]"}`}>
                <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ COMMERCIAL PROJECTS ═══════════════ */}
      <section className="py-16 md:py-24 bg-[#0e0e0e]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">{t.commercialTitle}</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">{t.commercialContent}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {t.commercialSectors.map((sector) => (
              <div key={sector.name} className="bg-[#1a1a1a] rounded-xl p-5 border border-gray-800 hover:border-amber-600/40 transition-colors text-center group">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center mb-3 mx-auto">
                  {sectorIconMap[sector.icon]}
                </div>
                <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-amber-400 transition-colors">{sector.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{sector.desc}</p>
              </div>
            ))}
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
              ? "¿Quieres aprender más sobre muebles en resina epóxica?"
              : "Want to learn more about epoxy resin furniture?"}
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
          src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/hero_banner2-UU5JSGUliJzY8K0pdtxeg0AeGpHaUq.webp"
          alt={locale === "es" ? "Mesa river table artesanal por SobrePoxi" : "Handcrafted river table by SobrePoxi"}
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
