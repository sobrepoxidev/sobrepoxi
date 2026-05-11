import { createBrowserSupabaseClient } from '@/shared/supabase/client';
import type { ShippingAddress } from '../distribute';

export async function updateShippingAddress(
  userId: string,
  address: ShippingAddress
): Promise<void> {
  const supabase = createBrowserSupabaseClient();

  const { error } = await supabase
    .from('user_profiles')
    .update({ shipping_address: address })
    .eq('id', userId);

  if (error) throw error;
}