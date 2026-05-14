import { redirect } from 'next/navigation'

type tParams = Promise<{ locale: 'es' | 'en' }>

export default async function LuxuryDesignFlooringRedirect({
  params,
}: {
  params: tParams
}) {
  const { locale } = await params
  redirect(`/${locale}/epoxy-floors`)
}
