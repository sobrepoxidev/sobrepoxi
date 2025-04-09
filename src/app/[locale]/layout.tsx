import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import SupabaseProvider from '@/app/supabase-provider/provider';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import Navbar from "@/components/general/Navbar";
import Footer from "@/components/general/Footer";

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
  const cookieStore = cookies();
const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // 4) Obtener la sesión (por si necesitas user, etc.)
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang={locale}>
      <body
        className={` ${geistSans.variable} ${geistMono.variable} antialiased`} //min-h-screen flex flex-col
      >
        <NextIntlClientProvider locale={locale}>
        <SupabaseProvider session={session}>

        <Navbar />
          {children}
          <Footer />
          <Analytics />
          </SupabaseProvider>
        </NextIntlClientProvider>
      </body>
    </html>

  );
}