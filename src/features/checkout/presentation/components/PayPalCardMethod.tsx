'use client';

import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useRouter } from 'next/navigation';
import { Session } from '@supabase/supabase-js';
import { useCart, type CartItem } from '@/features/cart';
import { createBrowserSupabaseClient } from '@/shared/supabase/client';
import type { SupabaseClient } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePaymentOverlay } from '../hooks/usePaymentOverlay';

const PAYPAL_CLIENT_ID: string =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID ?? 'sb'
    : process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? 'sb';

interface PayPalCardMethodProps {
  createdOrderId: number;
  onPaymentSuccess: () => void;
  onPaymentError: (msg: string) => void;
}

export default function PayPalCardMethod({
  createdOrderId,
  onPaymentSuccess,
  onPaymentError,
}: PayPalCardMethodProps) {
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const locale = useLocale();
  const [supabase] = useState<SupabaseClient>(() => createBrowserSupabaseClient());

  const [session, setSession] = useState<Session | null>(null);
  const userId = session?.user?.id || 'guest-user';

  usePaymentOverlay({ redirecting });

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      setSession(session);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="mb-3 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
        <p>Nota: {locale === 'es' ? 'Paypal aplica una tasa de conversión de 1 CRC = 0.0019128 USD' : 'Paypal applies a conversion rate of 1 CRC = 0.0019128 USD'}</p>
        <p className="text-center mt-1 text-xs">{locale === 'es' ? 'Podrás elegir pagar en CRC o USD' : 'You can choose to pay in CRC or USD'}</p>
      </div>

      {loading && !redirecting && (
        <div className="flex items-center justify-center py-2 text-gray-600">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          <p>{locale === 'es' ? 'Procesando...' : 'Processing...'}</p>
        </div>
      )}

      <div className="App">
        <PayPalScriptProvider
          options={{
            clientId: PAYPAL_CLIENT_ID,
            enableFunding: 'paylater,venmo',
            dataSdkIntegrationSource: 'integrationbuilder_sc',
            environment: process.env.NODE_ENV.toString() === 'production'.toString() ? 'production' : 'sandbox',
          }}
        >
          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={async () => {
              setLoading(true);
              const res = await fetch('/api/paypal/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: createdOrderId }),
              });
              const data = await res.json();
              setLoading(false);
              if (data.error) {
                onPaymentError(data.error);
                throw new Error(data.error);
              }
              return data.paypalOrderId;
            }}
            onApprove={async (data) => {
              const paypalOrderId = data.orderID;
              setLoading(true);

              const res = await fetch('/api/paypal/capture-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paypalOrderId, orderId: createdOrderId }),
              });
              const result = await res.json();
              setLoading(false);

              if (result.status === 'COMPLETED') {
                if (userId && userId !== 'guest-user') {
                  try {
                    await supabase.from('cart_items').delete().eq('user_id', userId);
                  } catch (error) {
                    console.error('Error clearing cart items from database:', error);
                  }
                }

                setRedirecting(true);
                clearCart();

                const { data: orderDetails } = await supabase
                  .from('orders')
                  .select('*, order_items(*)')
                  .eq('id', createdOrderId)
                  .single();

                if (orderDetails && session?.user?.email) {
                  await fetch('/api/send-order-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      orderId: createdOrderId,
                      customerName: orderDetails.shipping_address.name,
                      shippingAddress: orderDetails.shipping_address,
                      items: cart,
                      subtotal: cart.reduce((acc: number, item: CartItem) => acc + (item.product.dolar_price || 0) * item.quantity, 0),
                      shipping: 7,
                      total: orderDetails.total_amount,
                      paymentMethod: 'paypal',
                      discountInfo: null,
                      userEmail: session.user.email,
                    }),
                  });
                }

                localStorage.removeItem('cartItems');
                localStorage.removeItem('checkoutData');
                localStorage.removeItem('discountInfo');

                onPaymentSuccess();

                setTimeout(() => {
                  router.push(`/order-confirmation?order_id=${createdOrderId}`);
                }, 500);
              } else {
                onPaymentError(locale === 'es' ? 'La transacción no pudo completarse.' : 'The transaction could not be completed.');
              }
            }}
            onCancel={() => {
              console.log('PayPal Order Canceled');
            }}
            onError={(err) => {
              console.error('PayPal Error:', err);
              onPaymentError(locale === 'es' ? 'Ocurrió un error con PayPal.' : 'An error occurred with PayPal.');
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}
