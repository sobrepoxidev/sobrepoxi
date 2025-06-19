import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Lista de correos electrónicos de administradores autorizados
const AUTHORIZED_ADMINS = ['sobrepoxidev@gmail.com', 'bryamlopez4@gmail.com'];

export default async function AdminEventsPage({
  params
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const supabase = createServerComponentClient({ cookies });
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    const returnUrl = encodeURIComponent(`/${locale}/admin/eventos`);
    redirect(`/${locale}/login?returnUrl=${returnUrl}`);
  }
  
  const userEmail = session.user?.email;
  
  if (!userEmail || !AUTHORIZED_ADMINS.includes(userEmail)) {
    redirect(`/${locale}`);
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Eventos</h1>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600">
          Próximamente: Gestión de eventos y actividades.
        </p>
      </div>
    </div>
  );
}
