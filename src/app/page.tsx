// app/page.tsx
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { routing } from '@/i18n/routing';
export const runtime = "edge";
export const dynamic = "force-static";          // ⟵ ● cacheable
export const revalidate = 1800;                 // ⟵ ● 30 minutos
// Redirige dinámicamente a la mejor coincidencia de idioma
// 1. Si el dominio está definido en routing.domains, usa su defaultLocale
// 2. En caso contrario, intenta detectar un idioma soportado a partir de "Accept-Language"
// 3. Si no hay coincidencia, usa routing.defaultLocale
export default async function RootPage() {
  const h = await headers();

  // --- Detección por dominio -------------------------------------------------
  const host = (h.get('x-forwarded-host') ?? h.get('host') ?? '').trim().toLowerCase();
  interface DomainEntry {
    domain: string;
    defaultLocale: 'es' | 'en';
  }
  const domainCfg = (routing.domains as readonly DomainEntry[] | undefined)?.find(d => d.domain === host);
  let locale: string | undefined = domainCfg?.defaultLocale;

  // --- Detección por encabezado Accept-Language -----------------------------
  if (!locale) {
    const accept = h.get('accept-language') ?? '';
    const candidates = accept
      .split(',')
      .map(part => part.split(';')[0].trim().split('-')[0]) // es-ES → es
      .filter(Boolean);
    // routing.locales está tipado como ('es' | 'en')[], necesitamos un type guard
    locale = candidates.find((l): l is 'es' | 'en' => (routing.locales as readonly string[]).includes(l));
  }

  // Fallback
  if (!locale) locale = routing.defaultLocale;

  redirect(`/${locale}`);
}