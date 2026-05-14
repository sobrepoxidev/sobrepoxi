import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/shared/supabase/server'
import { buildMetadata } from '@/shared/seo/seoConfig'
import type { Metadata } from 'next'
import { AccountClient } from '@/features/account'

type tParams = Promise<{ locale: string }>

export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { locale } = await params

  return buildMetadata({
    locale: locale === 'es' ? 'es' : 'en',
    pathname: `/${locale}/account`,
    title: locale === 'es' ? 'Mi cuenta' : 'My account',
    description:
      locale === 'es'
        ? 'Gestiona tu cuenta, datos de perfil y pedidos en SobrePoxi.'
        : 'Manage your profile and orders in SobrePoxi.',
  })
}

export default async function AccountPage({ params }: { params: tParams }) {
  const { locale } = await params

  try {
    const supabase = await createServerSupabaseClient()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) throw userError

    if (!user) {
      redirect(`/${locale}/login`)
    }

    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error('Error fetching profile:', profileError)
    }

    return <AccountClient user={user} initialProfile={profile || null} />
  } catch (error) {
    console.error('Error in account page:', error)
    redirect(`/${locale}/login`)
  }
}
