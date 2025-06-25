import { defineRouting } from 'next-intl/routing';

// Configuración por defecto (fallback) - solo se usa cuando no se puede determinar dinámicamente
export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'en', // fallback default
  localeDetection: false,
  domains: [
    {
      domain: 'artehechoamano.com',
      defaultLocale: 'es',
      locales: ['es']
    },
    {
      domain: 'handmadeart.store',
      defaultLocale: 'en',
      locales: ['en']
    },
  ]
});