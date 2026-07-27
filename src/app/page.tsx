// app/page.tsx
import { redirect } from 'next/navigation';

// La raíz "/" redirige al locale por defecto (/es) de forma determinista.
// Antes esto dependía de Accept-Language (localeDetection: true), lo que
// generaba redirecciones 307 temporales y contenido distinto según el
// cliente → mal para SEO. Ahora es estático y cacheable.
export default async function RootPage() {
  redirect('/es');
}