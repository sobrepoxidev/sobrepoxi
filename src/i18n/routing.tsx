import { defineRouting } from 'next-intl/routing';
import { defaultLocale } from './config';

export async function routing() {
  const locale = await defaultLocale();
  return defineRouting({
    locales: ['es', 'en'],
    defaultLocale: locale,
    localeDetection: false,
  });
}