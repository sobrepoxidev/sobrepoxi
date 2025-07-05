// app/page.tsx
import { redirect } from 'next/navigation';

// Redirige dinámicamente a la mejor coincidencia de idioma
// 1. Si el dominio está definido en routing.domains, usa su defaultLocale
// 2. En caso contrario, intenta detectar un idioma soportado a partir de "Accept-Language"
// 3. Si no hay coincidencia, usa routing.defaultLocale
export default async function RootPage() {

  redirect(`/`);
}