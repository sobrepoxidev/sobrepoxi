// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { routing } from "@/shared/i18n/routing";
import {
  buildMetadata
} from "@/shared/seo/seoConfig";
import { JsonLd } from "@/shared/seo/JsonLd";
import { Navbar, Footer, WhatsAppBubble } from "@/features/content";
import { SessionLayout } from "@/features/auth";
import { NextIntlClientProvider } from "next-intl";
import Script from "next/script";
import { UMAMI_SCRIPT_SRC, UMAMI_WEBSITE_ID } from "@/shared/analytics/track";
import WhatsAppClickTracker from "@/shared/contact/WhatsAppClickTracker";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "@/shared/ui/ErrorBoundary";

type tParams = Promise<{ locale: string }>;
export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  const base = buildMetadata({
    locale: isEs ? "es" : "en",
    pathname: `/${locale}`,
  });

  // Only site-wide defaults live here. Canonical and hreflang are set by each
  // page: a layout-level canonical would be inherited by every page that lacks
  // its own and point them all at the home page.
  return {
    ...base,
    metadataBase: new URL("https://sobrepoxi.com"),
    title: {
      default: isEs ? "Pisos epóxicos en Costa Rica | SobrePoxi" : "Epoxy floors in Costa Rica | SobrePoxi",
      template: "%s | SobrePoxi",
    },
    alternates: undefined,
    openGraph: { ...base.openGraph, url: undefined },
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
              <WhatsAppClickTracker />
            </SessionLayout>
          </NextIntlClientProvider>
        </ErrorBoundary>
        <Script
          src={UMAMI_SCRIPT_SRC}
          data-website-id={UMAMI_WEBSITE_ID}
          data-domains="sobrepoxi.com,www.sobrepoxi.com"
          strategy="afterInteractive"
        />
        <JsonLd
          id="structured-data"
          data={{
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              name: "SobrePoxi",
              description: locale === "es"
                ? "Empresa costarricense especializada en muebles únicos con resina epóxica y pisos epóxicos industriales de alta resistencia, con diseños personalizados."
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
                addressRegion: "San José",
                postalCode: "11101",
                addressCountry: "CR"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 9.9760383,
                longitude: -84.0098602
              },
              hasMap: "https://maps.google.com/?q=9.9760383,-84.0098602",
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
          }}
        />
      </body>
    </html>
  );
}
