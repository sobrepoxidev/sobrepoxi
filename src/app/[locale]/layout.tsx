// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { headers } from "next/headers";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import {
  buildMetadata
} from "@/lib/seoConfig";
import Script from "next/script";
import Navbar from "@/components/general/Navbar";
import Footer from "@/components/general/Footer";
import SessionLayout from "@/components/SessionLayout";
import { NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

type tParams = Promise<{ locale: string }>;
export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const headersList = await headers();
  const host =
    headersList.get("x-forwarded-host")?.trim() ||
    headersList.get("host")?.trim() ||
    "sobrepoxi.com";
  const pathname = headersList.get("x-invoke-pathname")?.trim() || "/";
  const { locale } = await params;

  const path = pathname === "/" ? "" : pathname;       
  const otherLocale = locale === "es" ? "en" : "es";

  return {
    metadataBase: new URL(`https://${host}`),

    ...buildMetadata({
      locale: locale === "es" ? "es" : "en",
      pathname,
    }),

    // ——— Canonical + hreflangs ———
    alternates: {
      canonical: `https://${host}/${locale}${path}`,
      languages: {
        [locale === "es" ? "es-cr" : "en-us"]:
          `https://${host}/${locale}${path}`,
        [otherLocale === "es" ? "es-cr" : "en-us"]:
          `https://${host}/${otherLocale}${path}`,
        "x-default": `https://${host}/${locale}${path}`,
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
        <NextIntlClientProvider locale={locale}>
          <SessionLayout>
            <Navbar locale={locale} />
            {children}
            <Footer locale={locale} />
            <Toaster position="top-center" />
            <Analytics />
          </SessionLayout>
        </NextIntlClientProvider>
        <Script id="ld-localbusiness" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HomeAndConstructionBusiness",
            "@id": "https://sobrepoxi.com/#sobrepoxi",
            "name": "SobrePoxi",
            "description": "Muebles de lujo en madera y resina, y pisos epóxicos de diseño e industriales. Proyectos en Costa Rica y EE. UU.",
            "url": "https://sobrepoxi.com",
            "logo": "https://hhn7iitaso3wzd0d.public.blob.vercel-storage.com/public/logo_sobrepoxi-bU2or8H7kNX2ViS8sklfTK4Nk7BENo.webp",
            "areaServed": ["CR", "US"],
            "telephone": "+50685850000",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "CR",
              "addressRegion": "San José",
              "addressLocality": "San José",
              "postalCode": "10001",
            },
            "geo": { "@type": "GeoCoordinates", "latitude": 9.9355431, "longitude": -84.1545449 },
            "hasMap": "https://maps.app.goo.gl/6HMDWY7bBbwdS3rN7",
            "sameAs": [
              "https://www.facebook.com/share/14EpJLUsXwc/",
              "https://www.instagram.com/sobrepoxi?igsh=MTZzd2ljaXNwbWVzaA==",
              "https://www.youtube.com/@sobrepoxi",
              "https://www.tiktok.com/@sobrepoxi3?_t=ZM-8xiKO9MHzEe&_r=1"
            ]
          })}
        </Script>
      </body>
    </html>
  );
}
