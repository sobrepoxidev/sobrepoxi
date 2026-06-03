import { Calendar, Plus, Clock, MapPin, Users } from 'lucide-react'
import Link from 'next/link'
import { requireAdmin } from '@/features/admin'

export default async function AdminEventsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  await requireAdmin(locale, `/${locale}/admin/events`)

  const newEventBtn = "inline-flex items-center px-4 py-2 text-sm font-bold rounded-md shadow-sm text-black bg-gold-gradient hover:shadow-lg hover:shadow-amber-500/20 focus:outline-none transition-all"

  return (
    <div className="min-h-screen bg-[#121212]">
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center">
            <Calendar className="w-8 h-8 mr-3 text-amber-400" />
            {locale === 'es' ? 'Gestión de Eventos' : 'Events Management'}
          </h1>
          <p className="text-gray-400 mt-1">{locale === 'es' ? 'Administra los eventos y actividades de la plataforma' : 'Manage the platform events and activities'}</p>
        </div>
        <Link href={`/${locale}/admin/events/new`} className={newEventBtn}>
          <Plus className="w-4 h-4 mr-2" />
          {locale === 'es' ? 'Nuevo Evento' : 'New Event'}
        </Link>
      </div>

      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl shadow overflow-hidden">
        <div className="p-6">
          <div className="text-center py-12">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-amber-400/10 mb-4">
              <Calendar className="h-12 w-12 text-amber-400" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-white">{locale === 'es' ? 'No hay eventos programados' : 'No events scheduled'}</h3>
            <p className="mt-1 text-sm text-gray-400">{locale === 'es' ? 'Comienza creando tu primer evento para mostrar aquí.' : 'Start by creating your first event to display here.'}</p>
            <div className="mt-6">
              <Link href={`/${locale}/admin/events/new`} className={newEventBtn}>
                <Plus className="w-4 h-4 mr-2" />
                {locale === 'es' ? 'Crear Evento' : 'Create Event'}
              </Link>
            </div>
          </div>

          <div className="mt-8 border border-white/10 rounded-lg overflow-hidden">
            <div className="p-4 bg-[#121212] border-b border-white/10">
              <h4 className="text-sm font-medium text-gray-400">{locale === 'es' ? 'EJEMPLO' : 'EXAMPLE'}</h4>
            </div>
            <div className="p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-amber-400/10 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-amber-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">{locale === 'es' ? 'Taller de Artesanías' : 'Crafts Workshop'}</h3>
                  <div className="mt-2 space-y-2 text-sm text-gray-300">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{locale === 'es' ? '25 de Junio, 2024 - 10:00 AM a 2:00 PM' : 'June 25, 2024 - 10:00 AM to 2:00 PM'}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{locale === 'es' ? 'Centro Cultural de la Ciudad' : 'City Cultural Center'}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{locale === 'es' ? '15 participantes registrados' : '15 registered participants'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
