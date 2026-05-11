import type { CartItem, ShippingAddress, PaymentMethod, Banco } from '../distribute';
import { createOrder, clearUserCart } from './createOrder';

export interface ProcessPaymentParams {
  userId: string;
  cart: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  bancoSeleccionado?: Banco | null;
  ultimos4?: string;
  discountInfo?: { finalTotal: number; code: string; discountAmount: number } | null;
  sessionEmail?: string;
  locale: string;
}

export async function processSinpePayment(params: ProcessPaymentParams): Promise<{ orderId: number; error?: string }> {
  const { userId, cart, shippingAddress, discountInfo, bancoSeleccionado, ultimos4, sessionEmail } = params;

  const result = await createOrder({
    userId,
    cart,
    shippingAddress,
    paymentMethod: 'sinpe',
    discountInfo: discountInfo as import('../distribute').DiscountInfo || null,
    bancoSeleccionado,
    ultimos4,
  });

  if (result.error || !result.orderId) {
    return { orderId: 0, error: result.error };
  }

  if (userId && userId !== 'guest-user') {
    await clearUserCart(userId);
  }

  if (sessionEmail && shippingAddress) {
    await fetch('/api/send-order-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: result.orderId,
        customerName: shippingAddress.name,
        shippingAddress,
        items: cart,
        subtotal: cart.reduce((acc: number, item: CartItem) => acc + (item.product.colon_price || 0) * item.quantity, 0),
        shipping: 3200,
        total: discountInfo ? discountInfo.finalTotal : 0,
        paymentMethod: 'sinpe',
        discountInfo: discountInfo ? { code: discountInfo.code, discountAmount: discountInfo.discountAmount } : null,
        userEmail: sessionEmail,
      }),
    });
  }

  return result;
}

export async function processPayPalPayment(params: ProcessPaymentParams): Promise<{ orderId: number; error?: string }> {
  const { userId, cart, shippingAddress, discountInfo } = params;

  return createOrder({
    userId,
    cart,
    shippingAddress,
    paymentMethod: 'paypal',
    discountInfo: discountInfo as import('../distribute').DiscountInfo || null,
  });
}
