import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mzeixepwwyowiqgwkopw.supabase.co', // TU dominio de Supabase
        pathname: '/storage/v1/object/public/**', // Permitir todas las imágenes en el bucket público
      },
    ],
  },
};

export default nextConfig;
