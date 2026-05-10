import { defineRouting } from 'next-intl/routing';

// Configuración por defecto (fallback) - solo se usa cuando no se puede determinar dinámicamente
export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es', // fallback default
  localeDetection: true,
  domains: [
    {
      domain: 'sobrepoxi.com',
      defaultLocale: 'es',
      locales: ['es', 'en']
    },
  ]
});