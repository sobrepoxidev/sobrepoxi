import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/shared/supabase/server'
import { getCommonMetadata, buildTitle } from '@/shared/seo/seo'
import type { Metadata } from 'next'
import { AccountClient } from '@/features/account'

type tParams = Promise<{ id: string, locale: string }>

export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: buildTitle(locale === 'es' ? 'Mi cuenta' : 'My account'),
    ...getCommonMetadata(locale),
  }
}

export default async function AccountPage() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError) throw userError

    if (!user) {
      redirect('/login')
    }

    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error('Error fetching profile:', profileError)
    }

    return (
      <AccountClient
        user={user}
        initialProfile={profile || null}
      />
    )
  } catch (error) {
    console.error('Error in account page:', error)
    redirect('/login')
  }
}