import type { Metadata } from "next";
import "./globals.css";

// export const metadata: Metadata = {
//   title: "Just Costa Rica Travel",
//   description: "Descubre Costa Rica con los mejores paquetes turísticos personalizados",
//   keywords: "costa rica, viajes, turismo, aventura, naturaleza, vacaciones",
// };

export const metadata: Metadata = {
  title: {
    default: 'Just Costa Rica Travel',
    template: '%s | Just Costa Rica Travel'
  },
  description: 'Tourism agency in Costa Rica: adventures, destinations and more.',
  keywords: "Costa Rica, travel, tourism, adventure, nature, vacations",
  metadataBase: new URL('https://justcostaricatravel.com')
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}