import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AccountClient from '@/components/account/AccountClient';
import type { Database } from '@/types-db';

export default async function AccountPage() {
  try {
    const supabase = createServerComponentClient<Database>({ 
      cookies
    });
    
    // Verificar si el usuario está autenticado
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) throw userError;
    
    // Si no hay usuario autenticado, redirigir al inicio de sesión
    if (!user) {
      redirect('/login');
    }
    
    // Intentar obtener el perfil del usuario
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    if (profileError) {
      console.error('Error fetching profile:', profileError);
    }
      
    return (
      <AccountClient 
        user={user}
        initialProfile={profile || null}
      />
    );
  } catch (error) {
    console.error('Error in account page:', error);
    redirect('/login');
  }
}
