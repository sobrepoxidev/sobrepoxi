import type { Metadata } from "next";
import { getCommonMetadata } from "@/lib/seo";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Suspense } from 'react'

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