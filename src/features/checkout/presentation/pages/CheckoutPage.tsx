'use client'

import { useRouter } from 'next/navigation'
import { useCart, type CartItem } from '@/features/cart'
import { useState, useEffect } from 'react'
import { StepOne, StepTwo, type ShippingAddress, type DiscountInfo, type PaymentMethod, type Banco, calculateCheckoutTotal } from '@/features/checkout'
import { useSupabase } from '@/app/supabase-provider/provider'
import { useLocale } from 'next-intl'
import { Session } from '@supabase/supabase-js'

export default function CheckoutWizardPage() {
  const router = useRouter()
  const { cart, removeFromCart, clearCart } = useCart()
  const { supabase } = useSupabase()
  const [session, setSession] = useState<Session | null>(null)
  const locale = useLocale()

  const [discountInfo, setDiscountInfo] = useState<DiscountInfo | null>(null)
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [bancoSeleccionado, setBancoSeleccionado] = useState<Banco | null>(null)
  const [ultimos4, setUltimos4] = useState('')
  const [createdOrderId, setCreatedOrderId] = useState<number | null>(null)
  const [, setIsProcessing] = useState(false)
  const [, setOrderComplete] = useState(false)

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [supabase])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const discountInfoStr = localStorage.getItem('discountInfo')
      if (discountInfoStr) {
        try {
          setDiscountInfo(JSON.parse(discountInfoStr))
        } catch (e) {
          console.error('Error parsing discount info:', e)
        }
      }
    }
  }, [])

  const goNext = () => setCurrentStep((s) => s + 1)
  const goBack = () => setCurrentStep((s) => s - 1)

  const validateStep1 = (address: ShippingAddress) => {
    setShippingAddress(address)
    goNext()
  }

  const createOrder = async (paymentMethodAux?: string) => {
    setIsProcessing(true)
    try {
      if (!shippingAddress) {
        alert('Se requiere dirección de envío')
        return
      }

      const userId = session?.user?.id || 'guest-user'
      if (!userId || userId === 'guest-user') {
        alert('Error: No se pudo identificar al usuario. Por favor inicia sesión antes de continuar.')
        router.push('/login?redirect=checkout')
        return
      }

      const subtotal = cart.reduce((acc, item) => {
        if (!item.product.colon_price) return acc
        const price = item.product.colon_price
        const discount = item.product.discount_percentage || 0
        return acc + price * (1 - discount / 100) * item.quantity
      }, 0)

      const shipping = cart.length ? 3200 : 0
      const totalAmount = subtotal + shipping
      const total = discountInfo ? discountInfo.finalTotal : totalAmount

      const { data: orderInsert, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userId,
          payment_method: paymentMethodAux ? paymentMethodAux : paymentMethod,
          payment_status: 'pendiente',
          shipping_status: 'pendiente',
          total_amount: total,
          shipping_address: shippingAddress,
          notes: discountInfo ? `Descuento aplicado: ${discountInfo.code} - Monto: ${discountInfo.discountAmount}` : '',
        })
        .select()
        .single()

      if (orderError || !orderInsert) {
        alert(`Error creando la orden en la BD: ${orderError?.message}`)
        setIsProcessing(false)
        return
      }

      setCreatedOrderId(orderInsert.id)

      for (const item of cart) {
        await supabase.from('order_items').insert({
          order_id: orderInsert.id,
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.colon_price || 0,
        })
      }

      return orderInsert.id
    } catch (error) {
      console.error('Error al procesar la orden:', error)
      alert('Error al procesar la orden. Inténtalo de nuevo.')
    } finally {
      setIsProcessing(false)
    }
  }

  const validateStep2 = async () => {
    if (!paymentMethod) {
      alert('Debes seleccionar un método de pago')
      return
    }

    if (paymentMethod === 'sinpe') {
      if (!bancoSeleccionado) {
        alert('Selecciona un banco para SINPE')
        return
      }
      if (ultimos4.length !== 4) {
        alert('Faltan los últimos 4 dígitos del recibo')
        return
      }
    }

    const orderId = await createOrder()

    if (orderId) {
      if (paymentMethod === 'sinpe' && bancoSeleccionado) {
        const paymentReference = `4 ultimos digitos: ${ultimos4} - Banco: ${bancoSeleccionado.nombre}`

        await supabase.from('orders').update({ payment_reference: paymentReference }).eq('id', orderId)

        const userId = session?.user?.id
        if (userId) {
          await supabase.from('cart_items').delete().eq('user_id', userId)
        }

        setOrderComplete(true)

        if (session?.user?.email && shippingAddress) {
          await fetch('/api/send-order-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId,
              customerName: shippingAddress.name,
              shippingAddress: shippingAddress,
              items: cart,
              subtotal: cart.reduce((acc: number, item: CartItem) => acc + (item.product.colon_price || 0) * item.quantity, 0),
              shipping: 3200,
              total: discountInfo ? discountInfo.finalTotal : 0,
              paymentMethod: 'sinpe',
              discountInfo: discountInfo ? { code: discountInfo.code, discountAmount: discountInfo.discountAmount } : null,
              userEmail: session.user.email,
            }),
          })
        }

        clearCart()
        router.push(`/order-confirmation?order_id=${orderId}`)
      }
    }
  }

  if (cart.length === 0) {
    return (
      <main className="w-full min-h-[67vh] bg-[#121212] mx-auto px-6 py-14 flex flex-row items-center gap-4">
        <button onClick={() => router.back()} className="bg-white/5 border border-white/10 text-gray-200 p-2 rounded-md hover:bg-white/10 transition">
          &larr; Regresar
        </button>
        <h1 className="text-2xl font-bold text-white">{locale === 'es' ? 'Carrito vacío' : 'Empty cart'}</h1>
      </main>
    )
  }

  const total = discountInfo ? discountInfo.finalTotal : calculateCheckoutTotal(cart)

  return (
    <main className="w-full flex flex-col min-h-[67vh] bg-[#121212] text-gray-200 py-6 px-4 md:px-12 lg:px-24">
      <header className="flex items-center gap-4 mb-6">
        {currentStep > 1 && currentStep <= 3 && (
          <button onClick={goBack} className="bg-white/5 border border-white/10 text-gray-200 px-3 py-1.5 rounded-md hover:bg-white/10 transition">
            &larr; {locale === 'es' ? 'Paso anterior' : 'Previous step'}
          </button>
        )}
        {currentStep === 1 && (
          <button onClick={() => router.back()} className="bg-white/5 border border-white/10 text-gray-200 px-3 py-1.5 rounded-md hover:bg-white/10 transition">
            &larr; {locale === 'es' ? 'Regresar' : 'Back'}
          </button>
        )}
        {currentStep >= 1 && currentStep <= 3 ? (
          <h1 className="text-base sm:text-2xl font-bold text-white">
            {currentStep === 1 ? (locale === 'es' ? 'Información de entrega' : 'Delivery information') : (locale === 'es' ? 'Pago' : 'Payment')} ({locale === 'es' ? 'Paso' : 'Step'} {currentStep} {locale === 'es' ? 'de' : 'of'} 3)
          </h1>
        ) : (
          <h1 className="text-base sm:text-2xl font-bold text-white">{locale === 'es' ? '¡Compra realizada con éxito!' : 'Purchase completed successfully!'}</h1>
        )}
      </header>

      {currentStep === 1 && (
        <StepOne cart={cart} onContinue={validateStep1} initialData={shippingAddress} locale={locale} />
      )}
      {currentStep === 2 && (
        <StepTwo
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          cart={cart}
          removeFromCart={removeFromCart}
          bancoSeleccionado={bancoSeleccionado}
          setBancoSeleccionado={setBancoSeleccionado}
          ultimos4={ultimos4}
          setUltimos4={setUltimos4}
          total={total}
          onFinalize={validateStep2}
          createdOrderId={createdOrderId}
          createOrder={createOrder}
          locale={locale}
        />
      )}
    </main>
  )
}
