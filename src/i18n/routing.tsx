import { defineRouting } from 'next-intl/routing';
import { headers } from 'next/headers';
import { locales, defaultLocale } from './config';

// Server-side routing configuration
export async function getServerRoutingConfig() {
  const h = await headers();
  const host = h.get('x-forwarded-host')?.trim() ?? h.get('host')?.trim();
  return {
    locales,
    defaultLocale: host === 'artehechoamano.com' ? 'es' : defaultLocale,
    localeDetection: false,
  };
}

export async function routing() {
  const config = await getServerRoutingConfig();
  return defineRouting(config);
}