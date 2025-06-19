import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';

// Lista de correos electrónicos de administradores autorizados
const AUTHORIZED_ADMINS = ['sobrepoxidev@gmail.com', 'bryamlopez4@gmail.com'];

const AdminCard = ({ title, href, description }: { title: string; href: string; description: string }) => (
  <Link href={href} className="block group">
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-blue-500">
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
      <div className="mt-4 text-blue-600 font-medium">
        Ir a {title} →
      </div>
    </div>
  </Link>
);

export default async function AdminPage({
  params
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const supabase = createServerComponentClient({ cookies });
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    const returnUrl = encodeURIComponent(`/${locale}/admin`);
    redirect(`/${locale}/login?returnUrl=${returnUrl}`);
  }
  
  const userEmail = session.user?.email;
  
  if (!userEmail || !AUTHORIZED_ADMINS.includes(userEmail)) {
    redirect(`/${locale}`);
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Panel de Administración</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <AdminCard 
          href={`/${locale}/admin/products`}
          title="Productos"
          description="Administra los productos de la tienda, incluyendo su información, precios y disponibilidad."
        />
        <AdminCard 
          href={`/${locale}/admin/eventos`}
          title="Eventos"
          description="Gestiona los eventos y actividades programadas."
        />
      </div>
    </div>
  );

}
