import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AdminDashboard from '@/components/admin/AdminDashboard';

// Lista de correos electrónicos de administradores autorizados
const AUTHORIZED_ADMINS = ['sobrepoxidev@gmail.com', 'bryamlopez4@gmail.com']; // Ajustar según necesidades

export default async function AdminPage({
  params
}: {
  params: { locale: string }
}) {
  const locale = params.locale || 'es';
  const supabase = createServerComponentClient({ cookies });
  
  // Verificar si el usuario está autenticado
  const { data: { session } } = await supabase.auth.getSession();
  
  // Si no hay sesión, redirigir al login con el locale correcto
  // Usar el formato correcto para la URL de redirección
  if (!session) {
    // Construir la URL completa para asegurar que la redirección funcione correctamente
    const returnUrl = encodeURIComponent(`/${locale}/admin`);
    redirect(`/${locale}/login?returnUrl=${returnUrl}`);
  }
  
  // Verificar si el usuario es un administrador autorizado
  const userEmail = session.user?.email;
  
  if (!userEmail || !AUTHORIZED_ADMINS.includes(userEmail)) {
    // Usuario no autorizado, redirigir a la página principal con el locale correcto
    redirect(`/${locale}`);
  }
  
  return <AdminDashboard />;
}
