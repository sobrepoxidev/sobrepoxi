import type { Metadata } from "next";
import { getCommonMetadata } from "@/lib/seo";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Suspense } from 'react'
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host');
  return {
    title: {
      default: "HandMade Art",
      template: '%s | HandMade Art'
    },
    ...getCommonMetadata(host === 'artehechoamano.com' ? 'es' : 'en'),
  };
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