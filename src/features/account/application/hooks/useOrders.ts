'use client';

import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@/shared/supabase/client';
import type { Order } from '../distribute';

export function useOrders(userId: string) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const supabase = createBrowserSupabaseClient();

        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select(`
            *,
            order_items:order_items (
              *,
              product:products (*)
            )
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (ordersError) throw ordersError;

        if (isMounted) setOrders(ordersData || []);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error loading orders');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (userId) fetchOrders();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return { orders, loading, error };
}