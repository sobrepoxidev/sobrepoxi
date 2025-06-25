// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { headers } from "next/headers";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import {
  buildMetadata,
  mapLocale
} from "@/lib/seoConfig";

import Navbar from "@/components/general/Navbar";
import Footer from "@/components/general/Footer";
import SessionLayout from "@/components/SessionLayout";
import { NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const h = await headers();
  const host = (await headers()).get("x-forwarded-host")?.trim().toString() ?? (await headers()).get("host")?.trim().toString()!;
  const pathname = (await headers()).get("x-invoke-pathname")?.trim().toString() || "/"; // Vercel Header o fallback
  return {
    metadataBase: new URL(`https://${host}`),
    ...buildMetadata({ locale: params.locale === "es" ? "es" : "en", pathname }),
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) {
    // 404 si locale no existe
    throw new Error("Invalid locale");
  }

  return (
    <html lang={mapLocale(locale)} className="bg-white">
      <body className="antialiased">
        <NextIntlClientProvider locale={locale}>
          <SessionLayout>
            <Navbar locale={locale} />
            {children}
            <Footer locale={locale} />
            <Toaster position="top-center" />
            <Analytics />
          </SessionLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
