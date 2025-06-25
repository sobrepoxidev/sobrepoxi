import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from 'react-hot-toast';

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import Navbar from "@/components/general/Navbar";
import Footer from "@/components/general/Footer";
import SessionLayout from "@/components/SessionLayout"; // 👈 nuevo import

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Bilingual SEO metadata
const seoMetadata = {
  es: {
    title: {
      default: "HandMade Art",
      template: "%s | HandMade Art",
    },
    description:
      "Descubre piezas de arte hechas a mano, únicas y auténticas, creadas con pasión en Costa Rica. Cada creación cuenta una historia.",
    keywords:
      "arte hecho a mano, arte artesanal, esculturas, pinturas originales, decoración artesanal, arte contemporáneo, piezas únicas, feria artesanías, empresas de inserción sociolaboral",
  },
  en: {
    title: {
      default: "HandMade Art",
      template: "%s | HandMade Art",
    },
    description:
      "Discover unique handmade art pieces crafted with passion in Costa Rica. Each creation tells a story.",
    keywords:
      "handmade art, artisan crafts, original paintings, sculptures, contemporary art, unique art pieces, crafts fair, socio-labour insertion enterprises",
  },
} as const;

type tParams = {
  params: Promise<{ locale: string }>;
};
export async function generateMetadata({
  params,
}: tParams): Promise<Metadata> {
  const { locale } = await params;
  const meta = seoMetadata[locale as "es" | "en"] ?? seoMetadata.es;

  return {
    ...meta,
    metadataBase: new URL("https://artehechoamano.com"),
    icons: { icon: "/favicon.ico" },
    openGraph: {
      title: meta.title.default,
      description: meta.description,
      url: "https://artehechoamano.com",
      siteName: "HandMade Art",
      images: [
        {
          url: "https://artehechoamano.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "HandMade Art – Creaciones artesanales únicas de Costa Rica",
        },
      ],
      locale,
      type: "website",
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "en-US": "/en",
        "es-CR": "/es",
      },
    },
  } satisfies Metadata;
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className="bg-white">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
        <NextIntlClientProvider locale={locale}>
          <SessionLayout>
            <Navbar locale={locale} />
            {children}
            <Footer locale={locale}/>
            <Toaster position="top-center" />
            <Analytics />
          </SessionLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
