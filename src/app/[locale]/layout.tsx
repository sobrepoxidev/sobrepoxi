// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { headers } from "next/headers";
import { hasLocale } from "next-intl";
import { routing } from "@/shared/i18n/routing";
import {
  buildMetadata
} from "@/shared/seo/seoConfig";
import Script from "next/script";
import { Navbar, Footer, WhatsAppBubble } from "@/features/content";
import { SessionLayout } from "@/features/auth";
import { NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "@/shared/ui/ErrorBoundary";

type tParams = Promise<{ locale: string }>;
export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-pathname")?.trim() || "/";
  const { locale } = await params;

  // Always use the canonical domain — never trust host headers (avoids www / http variants)
  const CANONICAL_HOST = "sobrepoxi.com";

  const path = pathname === "/" ? "" : pathname;

  return {
    metadataBase: new URL(`https://${CANONICAL_HOST}`),

    ...buildMetadata({
      locale: locale === "es" ? "es" : "en",
      pathname,
      title: locale === "es"
        ? "SobrePoxi - Muebles con Resina Epóxica y Pisos Epóxicos Industriales en Costa Rica"
        : "SobrePoxi - Epoxy Resin Furniture and Industrial Epoxy Floors in Costa Rica",
      description: locale === "es"
        ? "Empresa líder en Costa Rica especializada en muebles únicos con resina epóxica y pisos epóxicos industriales de alta resistencia. Calidad garantizada y diseños personalizados."
        : "Leading company in Costa Rica specialized in unique epoxy resin furniture and high-resistance industrial epoxy floors. Guaranteed quality and custom designs."
    }),

    // ——— Canonical + hreflangs ———
    // x-default SIEMPRE apunta a la versión por defecto (es) en TODAS las
    // páginas. Google exige consistencia: si x-default varía entre páginas,
    // ignora todo el cluster de hreflang. (Fix SEO: /en sin indexar.)
    alternates: {
      canonical: `https://${CANONICAL_HOST}/${locale}${path}`,
      languages: {
        "es-cr": `https://${CANONICAL_HOST}/es${path}`,
        "en-us": `https://${CANONICAL_HOST}/en${path}`,
        "x-default": `https://${CANONICAL_HOST}/es${path}`,
      },
    },
  };
}


export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: tParams;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    // 404 si locale no existe
    throw new Error("Invalid locale");
  }

  return (
    <html lang={locale}>
      <body className="antialiased bg-[#121212]">
        <ErrorBoundary>
          <NextIntlClientProvider locale={locale}>
            <SessionLayout>
              <Navbar locale={locale} />
              {children}
              <Footer locale={locale} />
              <WhatsAppBubble />
              <Toaster position="top-center" />
              <Analytics />
            </SessionLayout>
          </NextIntlClientProvider>
        </ErrorBoundary>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              name: "SobrePoxi",
              description: locale === "es"
                ? "Empresa líder en Costa Rica especializada en muebles únicos con resina epóxica y pisos epóxicos industriales de alta resistencia. Calidad garantizada y diseños personalizados."
                : "Leading company in Costa Rica specialized in unique epoxy resin furniture and high-resistance industrial epoxy floors. Guaranteed quality and custom designs.",
              url: "https://sobrepoxi.com",
              logo: "https://sobrepoxi.com/logo.png",
              image: [
                "https://sobrepoxi.com/og-image.webp",
              ],
              areaServed: "Costa Rica",
              telephone: "+50685850000",
              email: "info@sobrepoxi.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Centro Comercial Velasuma, 2da. Planta local No. 9, San Isidro Downtown",
                addressLocality: "Vásquez de Coronado",
                addressRegion: "San Isidro",
                postalCode: "11101",
                addressCountry: "CR"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 9.9355431,
                longitude: -84.1545449
              },
              hasMap: "https://maps.google.com/?q=9.9355431,-84.1545449",
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
            })
          }}
        />
      </body>
    </html>
  );
}
