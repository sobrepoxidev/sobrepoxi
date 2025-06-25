import {defineRouting} from 'next-intl/routing';
import { headers } from "next/headers";

export async function routing() {
  const h = await headers();
  const host = h.get('x-forwarded-host')?.trim().toString() ?? h.get('host')?.trim().toString();
  return defineRouting({
    locales: ['es', 'en'],
    defaultLocale: host === 'artehechoamano.com' ? 'es' : 'en',
    localeDetection: false,
  });
}