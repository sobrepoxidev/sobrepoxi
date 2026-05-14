import { createServerSupabaseClient } from '@/shared/supabase/server';
import { logger } from '@/shared/observability/logger';
import { capturePaypalInputSchema } from '../schemas/capturePaypalInput';
import { captureProviderPaypalOrder, getPaypalAccessToken } from '../../infrastructure/paypal/client';

export type CapturePaypalOrderResult =
  | { ok: true; status: 'COMPLETED'; paypalOrderId: string; internalOrderId: number }
  | { ok: false; error: 'unauthorized' | 'invalid_input' | 'not_found' | 'forbidden' | 'paypal_failed' | 'internal' };

export async function capturePaypalOrder(input: unknown): Promise<CapturePaypalOrderResult> {
  const parsed = capturePaypalInputSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: 'invalid_input' };

  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { ok: false, error: 'unauthorized' };

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('user_id, payment_reference')
    .eq('id', parsed.data.orderId)
    .single();

  if (orderError || !order) return { ok: false, error: 'not_found' };
  if (order.user_id !== session.user.id) return { ok: false, error: 'forbidden' };
  if (order.payment_reference && order.payment_reference !== parsed.data.paypalOrderId) {
    return { ok: false, error: 'forbidden' };
  }

  try {
    const accessToken = await getPaypalAccessToken();
    const captureResult = await captureProviderPaypalOrder({ accessToken, paypalOrderId: parsed.data.paypalOrderId });
    if (captureResult.status !== 'COMPLETED') return { ok: false, error: 'paypal_failed' };

    const { error: updateOrderError } = await supabase
      .from('orders')
      .update({ payment_status: 'paid', payment_reference: parsed.data.paypalOrderId })
      .eq('id', parsed.data.orderId);

    if (updateOrderError) {
      logger.error('[checkout.capturePaypalOrder] order update failed', { error: updateOrderError });
      return { ok: false, error: 'internal' };
    }

    const { count, error: checkTableError } = await supabase
      .from('user_tickets')
      .select('*', { count: 'exact', head: true })
      .eq('order_id', parsed.data.orderId);

    if (!checkTableError && count && count > 0) {
      const { error: updateTicketsError } = await supabase
        .from('user_tickets')
        .update({ is_locked: true, purchase_date: new Date() })
        .eq('order_id', parsed.data.orderId);

      if (updateTicketsError) logger.warn('[checkout.capturePaypalOrder] continuing despite ticket update error');
    }

    return {
      ok: true,
      status: 'COMPLETED',
      paypalOrderId: parsed.data.paypalOrderId,
      internalOrderId: parsed.data.orderId,
    };
  } catch (error) {
    logger.error('[checkout.capturePaypalOrder]', { error });
    return { ok: false, error: 'paypal_failed' };
  }
}
