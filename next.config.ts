// next.config.ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/**
 * Complete Next.js configuration.
 *
 * - images.remotePatterns → allows hot-linking from Supabase & Vercel Blob.
 * - htmlLimitedBots       → disables streaming-metadata for listed crawlers
 *                           (they get the “classic” blocking HTML).
 */
const nextConfig: NextConfig = {
  // 1️⃣  Crawler control – disable streaming for these user-agents
  htmlLimitedBots: /Googlebot|bingbot|Baiduspider|YandexBot|DuckDuckBot|facebookexternalhit|Twitterbot|MyBot|OtherBot|SimpleCrawler/,

  // 2️⃣  Existing image-domain whitelist
  images: {
    // 1. Mantén las imágenes en caché 31 días en el edge
    minimumCacheTTL: 26_784_00,      // 60*60*24*31
    // 4. Define los tamaños que realmente usas (px)
    deviceSizes: [375, 640, 768, 1024, 1280],
    imageSizes: [16, 32, 48, 64, 96, 128],

    // 5. Lista blanca de calidades permitidas (novedad 2025)
    qualities: [40, 60, 75],          // la default (75) + dos reducidas
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jhrrachvacurxgotsvbf.supabase.co',
        pathname: '/storage/v1/object/**',
      },
      {
        protocol: 'https',
        hostname: 'hhn7iitaso3wzd0d.public.blob.vercel-storage.com',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/_next/image',             // respuesta del optimizer
        headers: [
          {
            key  : 'Cache-Control',
            value: 'public, max-age=2678400, stale-while-revalidate=86400'
          }
        ]
      }
    ];
  },

  experimental: {
    serverComponentsExternalPackages: ['nodemailer']
  },

  // 3️⃣  Any other Next.js options you may add later…
  // reactStrictMode: true,
};

export default withNextIntl(nextConfig);
