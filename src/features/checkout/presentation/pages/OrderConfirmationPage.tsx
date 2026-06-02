'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/shared/supabase/client'
import { Link } from '@/shared/i18n/navigation'
import { ShoppingBag } from 'lucide-react'
import { useLocale } from 'next-intl'

interface OrderDetails {
  id: number
  total_amount: number
  created_at: string
  payment_method: string
  shipping_address: {
    name: string
    address: string
  }
}

export default function OrderConfirmationPage() {
  const locale = useLocale()
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const orderId = searchParams.get('order_id')

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return

      const supabase = createBrowserSupabaseClient()
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single()

      if (error) {
        console.error('Error fetching order:', error)
        return
      }

      setOrderDetails(data as OrderDetails)
    }

    fetchOrderDetails()

    // Limpiar localStorage
    localStorage.removeItem('cartItems')
    localStorage.removeItem('checkoutData')
    localStorage.removeItem('discountInfo')
  }, [orderId])

  if (!orderDetails) {
    return (
      <div className="min-h-[60vh] bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white">
            {locale === 'es' ? 'Cargando detalles del pedido...' : 'Loading order details...'}
          </h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] bg-[#121212] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#1a1a1a] border border-white/10 shadow-lg rounded-2xl p-6">
          <div className="text-center mb-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/10">
              <ShoppingBag className="h-6 w-6 text-emerald-400" />
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight gold-gradient-bright">
              {locale === 'es' ? '¡Gracias por tu compra!' : 'Thank you for your purchase!'}
            </h1>
            <p className="mt-2 text-base text-gray-400">
              {locale === 'es' ? 'Tu pedido' : 'Your order'} #{orderDetails.id}{' '}
              {locale === 'es' ? 'ha sido confirmado' : 'has been confirmed'}
            </p>
          </div>

          <dl className="divide-y divide-white/10">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-400">
                {locale === 'es' ? 'Número de orden' : 'Order number'}
              </dt>
              <dd className="mt-1 text-sm text-gray-200 sm:col-span-2 sm:mt-0">#{orderDetails.id}</dd>
            </div>

            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-400">
                {locale === 'es' ? 'Total' : 'Total'}
              </dt>
              <dd className="mt-1 text-sm text-gray-200 sm:col-span-2 sm:mt-0">
                $ {orderDetails.total_amount.toLocaleString()}
              </dd>
            </div>

            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-400">
                {locale === 'es' ? 'Método de pago' : 'Payment method'}
              </dt>
              <dd className="mt-1 text-sm text-gray-200 sm:col-span-2 sm:mt-0">
                {orderDetails.payment_method === 'paypal' ? 'PayPal' : 'SINPE Móvil'}
              </dd>
            </div>

            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-400">
                {locale === 'es' ? 'Dirección de envío' : 'Shipping address'}
              </dt>
              <dd className="mt-1 text-sm text-gray-200 sm:col-span-2 sm:mt-0">
                {orderDetails.shipping_address.name}
                <br />
                {orderDetails.shipping_address.address}
              </dd>
            </div>
          </dl>

          <div className="mt-8 text-center">
            <Link href="/products" className="inline-flex items-center px-5 py-2.5 text-sm font-bold rounded-lg text-black bg-gold-gradient hover:shadow-lg hover:shadow-amber-500/20 transition-all focus:outline-none">
              {locale === 'es' ? 'Continuar comprando' : 'Continue shopping'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
