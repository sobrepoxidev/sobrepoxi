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
  htmlLimitedBots:/Googlebot|bingbot|Baiduspider|YandexBot|DuckDuckBot|facebookexternalhit|Twitterbot|MyBot|OtherBot|SimpleCrawler/,

  // 2️⃣  Existing image-domain whitelist
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mzeixepwwyowiqgwkopw.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'r5457gldorgj6mug.public.blob.vercel-storage.com',
      },
    ],
  },
 

  // 3️⃣  Any other Next.js options you may add later…
  // reactStrictMode: true,
};

export default withNextIntl(nextConfig);
