import { SEO_CONFIG } from './seoConfig';

/**
 * Tipos para datos estructurados
 */
export interface LocalBusinessSchema {
  "@context": "https://schema.org";
  "@type": "LocalBusiness" | "HomeAndConstructionBusiness";
  name: string;
  description?: string;
  url: string;
  logo?: string;
  image?: string[];
  telephone: string;
  email?: string;
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
  areaServed?: string;
  priceRange?: string;
  openingHours?: string[];
  sameAs?: string[];
}

export interface ServiceSchema {
  "@context": "https://schema.org";
  "@type": "Service";
  name: string;
  description: string;
  provider: LocalBusinessSchema;
  areaServed?: string;
  serviceType?: string;
  category?: string;
}

export interface ProductSchema {
  "@context": "https://schema.org";
  "@type": "Product";
  name: string;
  description: string;
  image?: string[];
  brand?: {
    "@type": "Brand";
    name: string;
  };
  manufacturer?: LocalBusinessSchema;
  category?: string;
  material?: string;
}

export interface FAQSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

export interface BreadcrumbSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * Genera el esquema de LocalBusiness base para SobrePoxi
 */
export function generateLocalBusinessSchema(
  type: "LocalBusiness" | "HomeAndConstructionBusiness" = "LocalBusiness"
): LocalBusinessSchema {
  const config = SEO_CONFIG;
  
  return {
    "@context": "https://schema.org",
    "@type": type,
    name: config.company.name,
    description: "Empresa líder en Costa Rica especializada en muebles con resina epóxica y pisos epóxicos industriales de alta calidad.",
    url: config.siteUrl,
    logo: `${config.siteUrl}/logo.png`,
    image: [
      `${config.siteUrl}/og-image.jpg`,
      `${config.siteUrl}/gallery/epoxy-floors-1.jpg`,
      `${config.siteUrl}/gallery/luxury-furniture-1.jpg`
    ],
    telephone: config.company.phone,
    email: config.company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.company.address.streetAddress,
      addressLocality: config.company.address.addressLocality,
      addressRegion: config.company.address.addressRegion,
      postalCode: config.company.address.postalCode,
      addressCountry: config.company.address.addressCountry
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: config.company.geo.latitude,
      longitude: config.company.geo.longitude
    },
    areaServed: "Costa Rica",
    priceRange: "$$-$$$",
    openingHours: [
      "Mo-Fr 08:00-17:00",
      "Sa 08:00-12:00"
    ],
    sameAs: [
      "https://www.facebook.com/sobrepoxi",
      "https://www.instagram.com/sobrepoxi",
      "https://www.tiktok.com/@sobrepoxi",
      "https://www.youtube.com/@sobrepoxi"
    ]
  };
}

/**
 * Genera esquema de servicio
 */
export function generateServiceSchema(
  serviceName: string,
  serviceDescription: string,
  serviceType?: string,
  category?: string
): ServiceSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: serviceDescription,
    provider: generateLocalBusinessSchema(),
    areaServed: "Costa Rica",
    serviceType: serviceType || "Construction",
    category: category || "Flooring"
  };
}

/**
 * Genera esquema de producto
 */
export function generateProductSchema(
  productName: string,
  productDescription: string,
  images?: string[],
  category?: string,
  material?: string
): ProductSchema {
  const config = SEO_CONFIG;
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: productDescription,
    image: images || [`${config.siteUrl}/products/${productName.toLowerCase().replace(/\s+/g, '-')}.jpg`],
    brand: {
      "@type": "Brand",
      name: config.company.name
    },
    manufacturer: generateLocalBusinessSchema(),
    category: category || "Furniture",
    material: material || "Epoxy Resin"
  };
}

/**
 * Genera esquema de FAQ
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): FAQSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

/**
 * Genera esquema de breadcrumbs
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
): BreadcrumbSchema {
  const config = SEO_CONFIG;
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${config.siteUrl}${crumb.url}`
    }))
  };
}

/**
 * Convierte un esquema a JSON-LD string
 */
export function schemaToJsonLd(schema: any): string {
  return JSON.stringify(schema, null, 0);
}

/**
 * Esquemas predefinidos comunes
 */
export const COMMON_SCHEMAS = {
  // Esquema principal de la empresa
  homeAndConstruction: () => generateLocalBusinessSchema("HomeAndConstructionBusiness"),
  
  // Servicios principales
  epoxyFlooring: () => generateServiceSchema(
    "Pisos Epóxicos Industriales",
    "Instalación profesional de pisos epóxicos de alta resistencia para uso industrial y comercial en Costa Rica.",
    "Flooring Installation",
    "Industrial Flooring"
  ),
  
  luxuryFurniture: () => generateServiceSchema(
    "Muebles con Resina Epóxica",
    "Diseño y fabricación de muebles únicos con resina epóxica de alta calidad para espacios residenciales y comerciales.",
    "Furniture Design",
    "Custom Furniture"
  ),
  
  // FAQs comunes
  generalFAQ: () => generateFAQSchema([
    {
      question: "¿Qué es la resina epóxica?",
      answer: "La resina epóxica es un polímero termoestable que se forma a partir de la reacción entre una resina y un endurecedor. Es conocida por su alta resistencia, durabilidad y acabado brillante."
    },
    {
      question: "¿Cuánto tiempo dura un piso epóxico?",
      answer: "Un piso epóxico bien instalado puede durar entre 15 a 20 años con el mantenimiento adecuado, siendo ideal para áreas de alto tráfico industrial."
    },
    {
      question: "¿Ofrecen garantía en sus trabajos?",
      answer: "Sí, ofrecemos garantía de 2 años en todos nuestros trabajos de pisos epóxicos y 1 año en muebles con resina epóxica."
    }
  ])
};