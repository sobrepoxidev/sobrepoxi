import { supabase } from '@/lib/supabaseClient';
import type { CartItem, ShippingAddress, DiscountInfo, PaymentMethod, Banco } from '../distribute';

export interface CreateOrderParams {
  userId: string;
  cart: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  discountInfo?: DiscountInfo | null;
  bancoSeleccionado?: Banco | null;
  ultimos4?: string;
}

export async function createOrder(params: CreateOrderParams): Promise<{ orderId: number; error?: string }> {
  const { userId, cart, shippingAddress, paymentMethod, discountInfo, bancoSeleccionado, ultimos4 } = params;

  const subtotal = cart.reduce((acc, item) => {
    if (!item.product.colon_price) return acc;
    const price = item.product.colon_price;
    const discount = item.product.discount_percentage || 0;
    const finalPrice = price * (1 - discount / 100);
    return acc + finalPrice * item.quantity;
  }, 0);

  const shipping = cart.length ? 3200 : 0;
  const totalAmount = subtotal + shipping;
  const total = discountInfo ? discountInfo.finalTotal : totalAmount;

  let paymentReference: string | undefined;
  if (paymentMethod === 'sinpe' && bancoSeleccionado) {
    paymentReference = `4 ultimos digitos: ${ultimos4} - Banco: ${bancoSeleccionado.nombre}`;
  }

  const { data: orderInsert, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      payment_method: paymentMethod,
      payment_status: 'pendiente',
      shipping_status: 'pendiente',
      total_amount: total,
      shipping_address: shippingAddress,
      notes: discountInfo ? `Descuento aplicado: ${discountInfo.code} - Monto: ${discountInfo.discountAmount}` : '',
      payment_reference: paymentReference,
    })
    .select()
    .single();

  if (orderError || !orderInsert) {
    return { orderId: 0, error: orderError?.message };
  }

  for (const item of cart) {
    await supabase.from('order_items').insert({
      order_id: orderInsert.id,
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.product.colon_price || 0,
    });
  }

  return { orderId: orderInsert.id };
}

export async function updateOrderPaymentReference(orderId: number, reference: string): Promise<void> {
  await supabase.from('orders').update({ payment_reference: reference }).eq('id', orderId);
}

export async function clearUserCart(userId: string): Promise<void> {
  await supabase.from('cart_items').delete().eq('user_id', userId);
}

export async function getOrderDetails(orderId: number) {
  return supabase.from('orders').select('*, order_items(*)').eq('id', orderId).single();
}
