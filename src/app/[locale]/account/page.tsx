import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getCommonMetadata, buildTitle } from '@/lib/seo'
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
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // Ignore
            }
          },
        },
      }
    )

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