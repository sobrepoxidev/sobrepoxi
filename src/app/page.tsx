// app/page.tsx
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';//obtener el host

export default async function RootPage() {
  const h = await headers();
  // 2. Reconstruye el origin
  const host  = h.get('x-forwarded-host')  // definido si hay proxy
            ?? h.get('host');              // fallback
  console.log("El host en raiz es:", host);
  if (host === 'artehechoamano.com'){
    redirect('/es');
  }
  redirect('/en');
}