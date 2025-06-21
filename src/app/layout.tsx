import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'HandMade Art',
    template: '%s | HandMade Art'
  },
  description: 'Discover unique handmade art pieces crafted with passion. Browse our collection of original paintings, sculptures, and artisanal works.',
  keywords: "handmade art, original paintings, sculptures, artisanal works, art gallery, contemporary art, unique art pieces, art collection",
  metadataBase: new URL('https://artehechoamano.com'),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "HandMade Art | Unique & Authentic Handmade Creations",
    description: "Explore the beauty of handcrafted decor and artisan pieces made with passion in Costa Rica. Every creation tells a story.",
    url: "https://artehechoamano.com",
    siteName: "HandMade Art",
    images: [
      {
        url: "https://artehechoamano.com/og-image.jpg", // Reemplaza con tu imagen OG real
        width: 1200,
        height: 630,
        alt: "HandMade Art - Artisan home decor from Costa Rica",
      },
    ],
    type: "website",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <CartProvider>
        {children}
      </CartProvider>
    </Suspense>
  );
}