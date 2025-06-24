import { Geist, Geist_Mono } from "next/font/google";
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
