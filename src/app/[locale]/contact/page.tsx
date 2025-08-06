/* --------------------------------------------------------------------------
 *  ContactPage · SobrePoxi ― server component (Next 15 / app router)
 *  ------------------------------------------------------------------------
 *  – Optimised imports
 *  – Typed params helper
 *  – Locale–aware copy (es-CR / en-US)
 *  – Framer-motion + contact form loaded dynamically (keep SSR ✅)
 *  – SEO helpers: <title>, description & Open Graph via generateMetadata
 * ----------------------------------------------------------------------- */

import { Suspense }                 from "react";

import { FaPhone, FaWhatsapp }      from "react-icons/fa";
import { Facebook, Instagram, Youtube, Mail } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

import type { Metadata }            from "next";
import { buildTitle, getCommonMetadata } from "@/lib/seo";

/* ---------  Lazy-loaded client modules (SSR enabled)  --------- */

import FormMail from "@/components/general/FormMail";

/* ------------  Params helper  ------------ */
type ParamsPromise = Promise<{ locale: "es" | "en" }>;

/* ------------  SEO metadata  ------------ */
export async function generateMetadata(
  { params }: { params: ParamsPromise }
  
): Promise<Metadata> {

  const { locale } = await params;

  return {
    keywords: [
      "SobrePoxi", "contact", "epoxy floors", "muebles de lujo", "resin furniture", "Costa Rica", "WhatsApp", "luxury epoxy"],
    title: buildTitle(locale === "es" ? "Contáctanos" : "Contact us"),
    ...getCommonMetadata(locale, {
      // Page-specific overrides ↓
      description:
        locale === "es"
          ? "¿Proyecto en mente? Contáctanos vía WhatsApp o teléfono y obtén tu cotización de pisos o muebles en resina epóxica."
          : "Have a project in mind? Call or message us on WhatsApp to get a quote for luxury epoxy floors or resin furniture.",
      alternates: { canonical: `/contact` }
    }),
  };
}

/* ====================================================================== */
/*  MAIN COMPONENT                                                        */
/* ====================================================================== */
export default async function ContactPage({ params }: { params: ParamsPromise }) {

  const { locale } = await params;

  /* Copy helper */
  /* ------------------------------------------------------------------- */
  return (
    <Suspense>
      <div className="w-full flex flex-col items-center bg-[#121212]">
        <section className="w-full max-w-7xl py-0.5 px-4 sm:px-6 lg:px-8">

          {/* ---------- Heading ---------- */}
          <header className="mb-2">
            <h1 className="text-3xl sm:text-5xl font-extrabold gold-gradient-bright">
              {locale === "es" ? "Contáctanos" : "Contact us"}
            </h1>
            <p className="mt-2 text-gray-300 text-base sm:text-lg max-w-2xl">
              {locale === "es" ? "Estamos aquí para ayudarte. ¡No dudes en escribirnos!" : "We are here to help you. Don’t hesitate to reach out!"}
            </p>
          </header>

          {/* ---------- Grid (info + form) ---------- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* --- Contact information card --- */}
            <div
              className="bg-[#303030] shadow-md rounded-xl p-6"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-6 gold-gradient">
                {locale === "es" ? "Información de contacto" : "Contact information"}
              </h2>

              <ul className="space-y-6">

                {/* Phone */}
                <li className="flex gap-4 items-start">
                  <span className="bg-blue-100 text-blue-600 p-3 rounded-full">
                    <FaPhone className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold ">{locale === "es" ? "Teléfono" : "Phone"}</h3>
                    <p className="text-gray-300 font-semibold">(+506) 8585-0000</p>
                    <p className="text-gray-300 font-semibold">(+506) 8875-7576</p>
           
                     
                  </div>
                </li>

                {/* WhatsApp */}
                <li className="flex gap-4 items-start">
                  <span className="bg-[#25D366] hover:bg-[#128C7E] p-2 rounded-full transition-colors text-white">
                    <FaWhatsapp className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">WhatsApp</h3>
                    <p className="text-gray-300 font-semibold">(+506) 8585-0000</p>
                    <a
                      href="https://wa.me/50685850000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                    >
                      {locale === "es" ? "Abrir chat" : "Open chat"}
                    </a>
                  </div>
                </li>

                {/* Email */}
                <li className="flex gap-4 items-start">
                  <span className="bg-yellow-100 text-yellow-600 p-3 rounded-full">
                    <Mail className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a href="mailto:info@sobrepoxi.com" className="text-gray-300 font-semibold hover:underline">info@sobrepoxi.com</a>
                  </div>
                </li>

              </ul>
               {/* ---------- Social links ---------- */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold mb-4 gold-gradient-bright">
              {locale === 'es' ? 'Síguenos' : 'Follow Us'}
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="https://www.facebook.com/share/14EpJLUsXwc/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#3b5998] hover:bg-[#4c70ba] p-1 rounded-full transition-colors text-white"
                aria-label="Facebook"
                
              >
                <Facebook className="w-5 h-5"/>
              </Link>
              <Link
                href="https://www.instagram.com/sobrepoxi?igsh=MTZzd2ljaXNwbWVzaA=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 p-1 rounded-full transition-colors text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.tiktok.com/@sobrepoxi3?_t=ZM-8xiKO9MHzEe&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black hover:bg-gray-800 p-1 rounded-full transition-colors text-white"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.93a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04.64z" fill="currentColor" />
                </svg>
              </Link>
              <Link
                href="https://www.youtube.com/@sobrepoxi"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ff0000] hover:bg-[#cc0000] p-1 rounded-full transition-colors text-white"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </Link>
              
            </div>
          
            
          </div>
            </div>

            {/* --- Contact form --- */}
            <div
              
              className="bg-[#303030] shadow-md rounded-xl p-6"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-6 gold-gradient">
                {locale === "es" ? "Formulario de contacto" : "Contact form"}
              </h2>
              {/* Client-side form */}
              <FormMail />
            </div>
          </div>

         

        </section>
      </div>
       <Script id="ld-contact-localbusiness" type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://sobrepoxi.com/#sobrepoxi",
        "name": "SobrePoxi",
        "description": locale === "es" 
          ? "Muebles de lujo en madera y resina, y pisos epóxicos de diseño e industriales. Proyectos en Costa Rica y EE. UU."
          : "Luxury furniture in wood and resin, and designer & industrial epoxy floors. Projects in Costa Rica and USA.",
        "url": "https://sobrepoxi.com",
        "logo": "https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/logo_sobrepoxi-bU2or8H7kNX2ViS8sklfTK4Nk7BENo.webp",
        "areaServed": ["CR", "US"],
        "telephone": "+50685850000",
        "email": "info@sobrepoxi.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Centro Comercial Velasuma, 2da. Planta local No. 9, San Isidro Downtown",
          "addressLocality": "Vásquez de Coronado",
          "addressRegion": "San Isidro",
          "postalCode": "11101",
          "addressCountry": "CR"
        },
        "geo": { "@type": "GeoCoordinates", "latitude": 9.9355431, "longitude": -84.1545449 },
        "hasMap": "https://maps.app.goo.gl/6HMDWY7bBbwdS3rN7",
        "sameAs": [
          "https://www.facebook.com/share/14EpJLUsXwc/",
          "https://www.instagram.com/sobrepoxi?igsh=MTZzd2ljaXNwbWVzaA==",
          "https://www.youtube.com/@sobrepoxi",
          "https://www.tiktok.com/@sobrepoxi3?_t=ZM-8xiKO9MHzEe&_r=1"
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "17:00"
          }
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+50685850000",
            "contactType": "customer service",
            "availableLanguage": ["Spanish", "English"]
          }
        ]
      })}
    </Script>
    </Suspense>


   
  );
}
