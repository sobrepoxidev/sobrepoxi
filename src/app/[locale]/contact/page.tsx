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

// Ensure this page uses the full Node.js runtime (Edge runtime does not support some server-side imports)
export const runtime = "nodejs";
import dynamic                      from "next/dynamic";
import { FaPhone, FaWhatsapp }      from "react-icons/fa";

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
  const t = (es: string, en: string) => (locale === "es" ? es : en);

  /* ------------------------------------------------------------------- */
  return (
    <Suspense>
      <div className="w-full flex flex-col items-center">
        <section className="w-full max-w-7xl py-4 px-4 sm:px-6 lg:px-8">

          {/* ---------- Heading ---------- */}
          <header className="mb-8">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-teal-800">
              {locale === "es" ? "Contáctanos" : "Contact us"}
            </h1>
            <p className="mt-2 text-gray-600 text-base sm:text-lg max-w-2xl">
              {locale === "es" ? "Estamos aquí para ayudarte. ¡No dudes en escribirnos!" : "We are here to help you. Don’t hesitate to reach out!"}
            </p>
          </header>

          {/* ---------- Grid (info + form) ---------- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* --- Contact information card --- */}
            <div
              className="bg-white shadow-md rounded-xl p-6"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-teal-800">
                {locale === "es" ? "Información de contacto" : "Contact information"}
              </h2>

              <ul className="space-y-6">

                {/* Phone */}
                <li className="flex gap-4 items-start">
                  <span className="bg-blue-100 text-blue-600 p-3 rounded-full">
                    <FaPhone className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{locale === "es" ? "Teléfono" : "Phone"}</h3>
                    <p className="text-gray-700">+506 8585 0000</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {locale === "es" ? "Lunes – Viernes · 7 a.m. – 5:30 p.m." : "Mon – Fri · 7 a.m. – 5:30 p.m."}
                    </p>
                  </div>
                </li>

                {/* WhatsApp */}
                <li className="flex gap-4 items-start">
                  <span className="bg-green-100 text-green-600 p-3 rounded-full">
                    <FaWhatsapp className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">WhatsApp</h3>
                    <p className="text-gray-700">+506 8585 0000</p>
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

              </ul>
            </div>

            {/* --- Contact form --- */}
            <div
              
              className="bg-white shadow-md rounded-xl p-6"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-teal-800">
                {locale === "es" ? "Formulario de contacto" : "Contact form"}
              </h2>
              {/* Client-side form */}
              <FormMail />
            </div>
          </div>

          {/* ---------- Social links ---------- */}
          <footer className="mt-12 text-center">
            <p className="text-sm text-gray-500 mb-3">
              {locale === "es" ? "Síguenos en redes sociales" : "Follow us on social media"}
            </p>
            <nav className="flex justify-center gap-4">
              <a
                href="https://www.facebook.com/share/14EpJLUsXwc/"
                aria-label="Facebook"
                target="_blank" rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >FB</a>
              <a
                href="https://www.instagram.com/sobrepoxi?igsh=MTZzd2ljaXNwbWVzaA=="
                aria-label="Instagram"
                target="_blank" rel="noopener noreferrer"
                className="hover:text-pink-600 transition-colors"
              >IG</a>
              <a
                href="https://www.youtube.com/@sobrepoxi"
                aria-label="YouTube"
                target="_blank" rel="noopener noreferrer"
                className="hover:text-red-600 transition-colors"
              >YT</a>
              <a
                href="https://www.tiktok.com/@sobrepoxi3?_t=ZM-8xiKO9MHzEe&_r=1"
                aria-label="TikTok"
                target="_blank" rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >TT</a>
            </nav>
          </footer>

        </section>
      </div>
    </Suspense>
  );
}
