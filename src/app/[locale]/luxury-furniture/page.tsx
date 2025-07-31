// src/app/[locale]/luxury-furniture/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

import { Metadata } from 'next';

type ParamsPromise = Promise<{ locale: "es" | "en" }>;

export async function generateMetadata({ params }: { params: ParamsPromise }): Promise<Metadata> {

  const { locale } = await params;

  return {
    title: locale === 'es' 
      ? 'Muebles de Lujo en Resina y Madera para Hogares y Proyectos Comerciales | SobrePoxi' 
      : 'Luxury Resin and Wood Furniture for Homes and Commercial Projects | SobrePoxi',
    description: locale === 'es' 
      ? 'Diseñamos muebles de lujo en resina epóxica y madera para residencias, hoteles y oficinas en Costa Rica. Mesas river, escritorios y piezas personalizadas.' 
      : 'We design luxury epoxy resin and wood furniture for residences, hotels, and offices in Costa Rica. River tables, desks, and custom pieces.',
    openGraph: {
      images: ['/images/og-luxury-furniture.jpg'],
    },
  };
}

export default async function LuxuryFurniturePage({ params }: { params: ParamsPromise }) {
  const { locale } = await params;
  const t = {
    heroTag: locale === "es" ? "Muebles de Lujo" : "Luxury Furniture",
    heroTitle: locale === "es" ? "Arte funcional para tu espacio" : "Functional Art for Your Space",
    heroSub: locale === "es"
      ? "Piezas únicas talladas a mano que combinan madera noble con resina epóxica para crear muebles que son verdaderas obras de arte."
      : "Unique handcrafted pieces that combine fine wood with epoxy resin to create furniture that are true works of art.",
    
    // Sección 1: Ventajas
    section1T: locale === "es" ? "Por qué elegir nuestros muebles" : "Why Choose Our Furniture",
    advantages: [
      {
        title: locale === "es" ? "Hecho a mano" : "Handcrafted",
        description: locale === "es" 
          ? "Cada pieza es única y fabricada artesanalmente con atención al detalle." 
          : "Each piece is unique and handcrafted with attention to detail.",
        icon: "✋"
      },
      {
        title: locale === "es" ? "Materiales premium" : "Premium Materials",
        description: locale === "es" 
          ? "Utilizamos maderas nobles y resina epóxica de la más alta calidad." 
          : "We use noble woods and highest quality epoxy resin.",
        icon: "🌳"
      },
      {
        title: locale === "es" ? "Diseño exclusivo" : "Exclusive Design",
        description: locale === "es" 
          ? "Diseños únicos que transforman cualquier espacio en una experiencia sensorial." 
          : "Unique designs that transform any space into a sensory experience.",
        icon: "✨"
      },
      {
        title: locale === "es" ? "Durabilidad" : "Durability",
        description: locale === "es" 
          ? "Construidos para durar generaciones con el cuidado adecuado." 
          : "Built to last for generations with proper care.",
        icon: "🛡️"
      },
      {
        title: locale === "es" ? "Calidad Comercial" : "Contract Quality",
        description: locale === "es" 
          ? "Construcción reforzada y acabados duraderos para uso comercial de alto tráfico." 
          : "Reinforced construction and durable finishes for high-traffic commercial use.",
        icon: "🏢"
      }
    ],
    
    // Sección para proyectos comerciales
    commercialT: locale === "es" ? "Muebles para Proyectos Comerciales y Hoteleros" : "Furniture for Commercial and Hospitality Projects",
    commercialDesc: locale === "es"
      ? "Entendemos las necesidades de durabilidad y diseño de los sectores hotelero y corporativo. Creamos piezas visualmente impactantes construidas para uso continuo que reflejan la identidad de su marca."
      : "We understand the durability and design needs of the hospitality and corporate sectors. We create visually impactful pieces built for continuous use that reflect your brand identity.",
    applications: [
      {
        title: locale === "es" ? "Hoteles Boutique" : "Boutique Hotels",
        icon: "🏨"
      },
      {
        title: locale === "es" ? "Restaurantes y Cafés" : "Restaurants & Cafés",
        icon: "🍽️"
      },
      {
        title: locale === "es" ? "Recepciones Personalizadas" : "Custom Reception Desks",
        icon: "💼"
      },
      {
        title: locale === "es" ? "Salas de Reuniones" : "Meeting Rooms",
        icon: "🤝"
      },
      {
        title: locale === "es" ? "Espacios Comerciales" : "Commercial Spaces",
        icon: "🏪"
      }
    ],
    commercialTestimonial: {
      quote: locale === "es"
        ? "Los muebles de SobrePoxi han transformado completamente el lobby de nuestro hotel. Nuestros huéspedes constantemente comentan sobre la belleza y originalidad de las piezas."
        : "SobrePoxi's furniture has completely transformed our hotel lobby. Our guests constantly comment on the beauty and originality of the pieces.",
      author: locale === "es" ? "María Rodríguez, Gerente de Hotel Boutique" : "Maria Rodriguez, Boutique Hotel Manager"
    },

    // Sección 2: Proceso
    processT: locale === "es" ? "Nuestro proceso artesanal" : "Our Artisanal Process",
    process: [
      {
        title: locale === "es" ? "Selección de madera" : "Wood Selection",
        description: locale === "es" 
          ? "Elegimos cuidadosamente cada tabla por su veta y características únicas." 
          : "We carefully select each board for its grain and unique characteristics."
      },
      {
        title: locale === "es" ? "Diseño personalizado" : "Custom Design",
        description: locale === "es" 
          ? "Trabajamos contigo para crear un diseño que se ajuste a tu visión y espacio." 
          : "We work with you to create a design that fits your vision and space."
      },
      {
        title: locale === "es" ? "Tallado y moldeado" : "Carving & Shaping",
        description: locale === "es" 
          ? "Nuestros artesanos dan forma a la madera con técnicas tradicionales." 
          : "Our craftsmen shape the wood using traditional techniques."
      },
      {
        title: locale === "es" ? "Vertido de resina" : "Resin Pour",
        description: locale === "es" 
          ? "Aplicamos capas de resina epóxica con precisión para crear efectos únicos." 
          : "We apply layers of epoxy resin with precision to create unique effects."
      },
      {
        title: locale === "es" ? "Acabado y pulido" : "Finishing & Polishing",
        description: locale === "es" 
          ? "Pulimos hasta obtener un acabado de espejo que resalta la belleza natural." 
          : "We polish to a mirror finish that enhances the natural beauty."
      },
      {
        title: locale === "es" ? "Control de calidad" : "Quality Control",
        description: locale === "es" 
          ? "Cada pieza es inspeccionada minuciosamente antes de ser entregada." 
          : "Each piece is thoroughly inspected before delivery."
      }
    ],

    // CTA
    ctaTitle: locale === "es" 
      ? "¿Listo para transformar tu espacio con una pieza única?" 
      : "Ready to transform your space with a unique piece?",
    ctaButton: locale === "es" ? "Solicitar cotización" : "Request a Quote"
  };

  return (
    <main className="min-h-screen bg-[#121212] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-12 pt-2 sm:pt-28">
        <Image
          src="https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/hero_banner2-UU5JSGUliJzY8K0pdtxeg0AeGpHaUq.webp"
          alt="River table made of epoxy resin and Guanacaste wood, luxury furniture made in Costa Rica"
          fill
          priority
          className="object-contain opacity-30"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
          <h1 className="inline-block mb-4 rounded-full bg-gold-gradient-50 text-gray-300 px-4 py-1 text-sm font-medium">
            {t.heroTag}
          </h1>
          <p className="text-4xl py-1.5 sm:text-5xl lg:text-6xl font-extrabold tracking-tight gold-gradient-bright mb-4 max-sm:mt-2">
            {t.heroTitle}
          </p>
          <p className="text-lg max-w-xl text-gray-300 mb-8">
            {t.heroSub}
          </p>
          <Link
            href="/contact"
            className="gold-gradient text-black font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-all"
          >
            {t.ctaButton}
          </Link>
        </div>
      </section>

      {/* Advantages Grid */}
      <section className="py-2 sm:py-8">
        <h2 className="text-center text-3xl font-bold gold-gradient-bright mb-10">
          {t.section1T}
        </h2>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {t.advantages.map((advantage, index) => (
            <div key={index} className="bg-[#1a1a1a] p-6 rounded-xl hover:bg-[#222] transition-colors">
              <div className="text-4xl mb-4">{advantage.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{advantage.title}</h3>
              <p className="text-gray-300">{advantage.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Commercial and Hospitality Section */}
      <section className="py-2 sm:py-8 bg-[#181818]">
        <h2 className="text-center text-3xl font-bold gold-gradient-bright mb-6">
          {t.commercialT}
        </h2>
        <div className="max-w-4xl mx-auto px-4 text-center mb-10">
          <p className="text-lg text-gray-300">
            {t.commercialDesc}
          </p>
        </div>
        
        {/* Applications */}
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {t.applications.map((app, index) => (
            <div key={index} className="bg-[#1a1a1a] p-4 rounded-xl text-center hover:bg-[#222] transition-colors">
              <div className="text-4xl mb-2">{app.icon}</div>
              <h3 className="text-lg font-bold text-white">{app.title}</h3>
            </div>
          ))}
        </div>
        
        {/* Commercial Gallery Placeholder */}
        <div className="max-w-6xl mx-auto px-4 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#1a1a1a] aspect-video rounded-xl flex items-center justify-center">
              <p className="text-gray-400">{locale === "es" ? "Mesa de conferencias" : "Conference table"}</p>
            </div>
            <div className="bg-[#1a1a1a] aspect-video rounded-xl flex items-center justify-center">
              <p className="text-gray-400">{locale === "es" ? "Mostrador de recepción" : "Reception desk"}</p>
            </div>
            <div className="bg-[#1a1a1a] aspect-video rounded-xl flex items-center justify-center">
              <p className="text-gray-400">{locale === "es" ? "Mesas de restaurante" : "Restaurant tables"}</p>
            </div>
          </div>
        </div>
        
        {/* Testimonial */}
        <div className="max-w-4xl mx-auto px-4">
          <blockquote className="bg-[#1a1a1a] p-6 rounded-xl border-l-4 border-[#b68b44]">
            <p className="text-lg italic text-gray-300 mb-4">
              {t.commercialTestimonial.quote}
            </p>
            <footer className="text-right text-gray-400">
              — {t.commercialTestimonial.author}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-2 sm:py-8 bg-[#181818]">
        <h2 className="text-center text-3xl font-bold gold-gradient-bright mb-12">
          {t.processT}
        </h2>
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-8">
            {t.process.map((step, index) => (
              <div key={index} className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#b68b44] to-[#e8c37e] text-black font-bold text-xl">
                    {index + 1}
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-1 text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-2 sm:py-10 text-center bg-[#121212]">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wide gold-gradient-bright mb-6">
          {t.ctaTitle}
        </h2>
        <Link
          href="/contact"
          className="inline-block bg-gold-gradient text-black font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-all"
        >
          {t.ctaButton}
        </Link>
      </section>
       <Script id="ld-furniture-product" type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": locale === "es" ? "Muebles de Lujo en Resina y Madera" : "Luxury Resin and Wood Furniture",
        "brand": {
          "@type": "Brand",
          "name": "Sobrepoxi"
        },
        "manufacturer": {
          "@type": "Organization",
          "name": "Sobrepoxi",
          "areaServed": {
            "@type": "Country",
            "name": "Costa Rica"
          }
        },
        "description": locale === "es" 
          ? "Diseñamos muebles de lujo en resina epóxica y madera para residencias, hoteles y oficinas en Costa Rica. Mesas river, escritorios y piezas personalizadas."
          : "We design luxury epoxy resin and wood furniture for residences, hotels, and offices in Costa Rica. River tables, desks, and custom pieces.",
        "material": "Epoxy Resin, Wood",
        "offers": {
          "@type": "AggregateOffer",
          "areaServed": "Costa Rica",
          "availability": "https://schema.org/PreOrder"
        },
        "category": ["Luxury Furniture", "Epoxy Resin Furniture", "Custom Furniture", "Contract Furniture", "Hospitality Furniture"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Luxury Furniture Collection",
          "itemListElement": [
            {
              "@type": "OfferCatalog",
              "name": "River Tables"
            },
            {
              "@type": "OfferCatalog",
              "name": "Hospitality Furniture"
            },
            {
              "@type": "OfferCatalog",
              "name": "Custom Reception Desks"
            },
            {
              "@type": "OfferCatalog",
              "name": "Conference Tables"
            },
            {
              "@type": "OfferCatalog",
              "name": "Decorative Furniture Pieces"
            }
          ]
        }
      })}
    </Script>
    </main>

   
   
  );
}