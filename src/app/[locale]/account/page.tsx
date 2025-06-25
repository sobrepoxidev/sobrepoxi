import { redirect } from 'next/navigation';
import AccountClient from '@/components/account/AccountClient';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types-db';
import { cookies } from 'next/headers';
import { getCommonMetadata, buildTitle } from '@/lib/seo';
import type { Metadata } from "next";
type tParams = Promise<{ id: string, locale: string }>;
export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: buildTitle(locale === "es" ? "Mi cuenta" : "My account"),
    ...getCommonMetadata(locale),
  };
}

export default async function AccountPage() {
  try {
    // Usar createServerComponentClient para acceder a Supabase desde un componente de servidor
    // Usamos cookies() de forma directa sin await ya que la API ha cambiado
    const cookieStore = cookies();
    const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
    
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
