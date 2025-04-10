import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: {
    default: 'Hand Made Art',
    template: '%s | Hand Made Art'
  },
  description: 'Discover unique handmade art pieces crafted with passion. Browse our collection of original paintings, sculptures, and artisanal works.',
  keywords: "handmade art, original paintings, sculptures, artisanal works, art gallery, contemporary art, unique art pieces, art collection",
  metadataBase: new URL('https://hand-made-art.vercel.app')
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}