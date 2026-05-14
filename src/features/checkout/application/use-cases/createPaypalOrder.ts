import { createServerSupabaseClient } from '@/shared/supabase/server';
import { logger } from '@/shared/observability/logger';
import { createOrderInputSchema } from '../schemas/createOrderInput';
import { createProviderPaypalOrder, getPaypalAccessToken } from '../../infrastructure/paypal/client';

export type CreatePaypalOrderResult =
  | { ok: true; paypalOrderId: string }
  | { ok: false; error: 'unauthorized' | 'invalid_input' | 'not_found' | 'forbidden' | 'paypal_failed' | 'internal' };

export async function createPaypalOrder(input: unknown): Promise<CreatePaypalOrderResult> {
  const parsed = createOrderInputSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: 'invalid_input' };

  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { ok: false, error: 'unauthorized' };

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('user_id, total_amount')
    .eq('id', parsed.data.orderId)
    .single();

  if (orderError || !order) return { ok: false, error: 'not_found' };
  if (order.user_id !== session.user.id) return { ok: false, error: 'forbidden' };

  try {
    const accessToken = await getPaypalAccessToken();
    const paypalOrder = await createProviderPaypalOrder({ accessToken, amount: order.total_amount, currency: 'USD' });
    if (!paypalOrder?.id) return { ok: false, error: 'paypal_failed' };

    const { error: updateError } = await supabase
      .from('orders')
      .update({ payment_reference: paypalOrder.id })
      .eq('id', parsed.data.orderId);

    if (updateError) {
      logger.error('[checkout.createPaypalOrder] payment reference update failed', { error: updateError });
      return { ok: false, error: 'internal' };
    }

    return { ok: true, paypalOrderId: paypalOrder.id };
  } catch (error) {
    logger.error('[checkout.createPaypalOrder]', { error });
    return { ok: false, error: 'paypal_failed' };
  }
}
