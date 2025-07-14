// src/app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { CartProvider } from "@/context/CartContext";
import { Suspense } from "react";

/* ————— METADATA GLOBAL ————— */
export const metadata: Metadata = {
  metadataBase: new URL("https://sobrepoxi.com"),

  // ——— Generales ———
  keywords: [		
    // Core ES-CR		
    "pisos epóxicos Costa Rica",		
    "muebles de resina de lujo",		
    // Long-tail ES		
    "empresas de pisos epóxicos",		
    "mantenimiento de pisos epóxicos",		
    // Core EN-US		
    "pios con  3d y vinilo epoxi", 		
    "como hacer pisos epoxi", 		
    // Long-tail EN		
    "pisos de resina epoxica cr",		
    "resina epoxica cr"		
    ],

  // ——— Open Graph ———
  openGraph: {
    type:        "website",
    url:         "https://sobrepoxi.com",
    title:       "SobrePoxi · Muebles y pisos de resina epóxica de lujo",
    description:
      "Diseño artesanal + resina de alto rendimiento para proyectos residenciales y contract Costa Rica. Descubre nuestro portafolio.",
    locale:      "es_CR",
    alternateLocale: ["en_US"],
    images: [
      {
        url:   "https://sobrepoxi.com/og-image.webp",
        width: 1200,
        height: 630,
        alt:  "Mesa río de madera y resina epóxica · SobrePoxi",
      },
    ],
  },

  // ——— Twitter Card ———
  twitter: {
    card:        "summary_large_image",
    title:       "SobrePoxi · Muebles y pisos de lujo en resina epóxica",
    description:
      "Piezas únicas y pisos artísticos instalados por expertos certificados. #HechoEnCostaRica",
    images:      ["https://sobrepoxi.com/og-image.webp"],
  },

  // ——— Alternates (se sobreescribirán por‐página) ———
  alternates: {
    canonical: "https://sobrepoxi.com/es",
    languages: {
      "es-cr": "https://sobrepoxi.com/es",
      "en-us": "https://sobrepoxi.com/en",
      "x-default": "https://sobrepoxi.com",
    },
  },

  // ——— Otros micro‐detalles útiles ———
  icons: { icon: "/favicon.ico" },
  robots: {
    index: true,
    follow: true,
    googleBot: { "max-video-preview": -1, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",              // Negro ébano de la nueva identidad
  colorScheme: "light",               // Sin modo oscuro por ahora
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // En Next 15 no es obligatorio envolver con <html>, 
  // porque un layout anidado (el de locale) ya lo hace.
  return (
        <Suspense>
          <CartProvider>{children}</CartProvider>
        </Suspense>
  );
}
