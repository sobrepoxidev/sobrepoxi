import { defineRouting } from 'next-intl/routing';
import { defaultLocale } from './config';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: defaultLocale(),
  localeDetection: false,
});