import Link from 'next/link'
import { Package, Calendar, ArrowRight } from 'lucide-react'
import { requireAdmin } from '@/features/admin'

const AdminCard = ({
  title,
  href,
  description,
  icon: Icon,
  locale,
}: {
  title: string
  href: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  locale: string
}) => (
  <Link href={href} className="block group transition-transform hover:scale-[1.02]">
    <div className="h-full p-6 bg-[#1a1a1a] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-white/10 hover:border-amber-500/40 flex flex-col">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-amber-400/10 rounded-lg text-amber-400">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="ml-3 text-xl font-semibold text-white group-hover:text-amber-400">{title}</h3>
      </div>
      <p className="flex-grow text-gray-400">{description}</p>
      <div className="mt-4 text-amber-400 font-medium flex items-center group-hover:translate-x-1 transition-transform">
        {locale === 'es' ? 'Ir a' : 'Go to'} {title}
        <ArrowRight className="ml-1 w-4 h-4" />
      </div>
    </div>
  </Link>
)

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  await requireAdmin(locale, `/${locale}/admin`)

  return (
    <div className="min-h-screen bg-[#121212]"><div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold gold-gradient-bright mb-8">
        {locale === 'es' ? 'Panel de Administracion' : 'Admin Panel'}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <AdminCard
          href={`/${locale}/admin/products`}
          title={locale === 'es' ? 'Productos' : 'Products'}
          description={
            locale === 'es'
              ? 'Administra los productos de la tienda, incluyendo su informacion, precios y disponibilidad.'
              : 'Manage the products in the store, including their information, prices, and availability.'
          }
          icon={Package}
          locale={locale}
        />
        <AdminCard
          href={`/${locale}/admin/events`}
          title={locale === 'es' ? 'Eventos' : 'Events'}
          description={
            locale === 'es'
              ? 'Gestiona los eventos y actividades programadas.'
              : 'Manage the events and activities scheduled.'
          }
          icon={Calendar}
          locale={locale}
        />
      </div>
    </div></div>
  )
}
