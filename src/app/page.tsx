// app/page.tsx
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';//obtener el host

export default async function RootPage() {
  const h = await headers();
  const host  = h.get('host');              // handmadeart.store o artehechoamano.com
  console.log("El host es:", host);
  if (host === 'artehechoamano.com'){
    redirect('/es');
  }
  redirect('/en');
}