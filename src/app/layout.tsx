// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://artehechoamano.com"),
  icons: { icon: "/favicon.ico" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <CartProvider>{children}</CartProvider>
    </Suspense>
  );
}
