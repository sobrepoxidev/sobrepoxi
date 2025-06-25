
// src/i18n/config.ts
export function defaultLocale() {
    // Use environment variable to determine default locale
    const isDomainEs = process.env.NEXT_PUBLIC_DEFAULT_LOCALE === 'es' || 
                       process.env.NODE_ENV === 'production' && 
                       process.env.VERCEL_URL?.includes('artehechoamano');
    
    return isDomainEs ? 'es' : 'en';
  }
