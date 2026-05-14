import { AdminDashboard, requireAdmin } from '@/features/admin'

export default async function AdminProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  await requireAdmin(locale, `/${locale}/admin/products`)

  return <AdminDashboard locale={locale} />
}
