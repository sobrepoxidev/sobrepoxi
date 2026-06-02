'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { createBrowserSupabaseClient } from '@/shared/supabase/client';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Database } from '@/shared/types/database';

type Order = Database['orders'] & {
  order_items: (Database['order_items'] & {
    product: Database['products']
  })[]
};

type OrdersTabProps = {
  userId: string;
};

export default function OrdersTab({ userId }: OrdersTabProps) {
  const t = useTranslations('Account');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  useEffect(() => {
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

        setOrders(ordersData || []);
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const formatPrice = (price: number) => `₡${price.toLocaleString()}`;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-CR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const toggleOrderExpansion = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const infoBox = 'bg-[#121212] p-3 rounded-md text-sm border border-white/10';

  return (
    <div className="text-gray-200">
      <h2 className="text-xl font-semibold text-white mb-4">
        {t('orderHistory')}
      </h2>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-400"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-[#121212] rounded-md p-8 text-center border border-white/10">
          <p className="text-gray-400">{t('noOrders')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-white/10 rounded-xl overflow-hidden"
            >
              <div
                className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-[#121212] cursor-pointer hover:bg-[#181818] transition-colors"
                onClick={() => toggleOrderExpansion(order.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                    <span>{t('orderNumber')}:</span>
                    <span className="font-medium text-gray-200">#{order.id}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{t('orderDate')}:</span>
                    <span className="font-medium text-gray-200">
                      {formatDate(order.created_at)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2 md:mt-0">
                  <div className="text-right">
                    <div className="text-sm text-gray-400">{t('total')}:</div>
                    <div className="font-bold gold-gradient-bright">
                      {formatPrice(order.total_amount)}
                    </div>
                  </div>

                  <div className="text-amber-400">
                    {expandedOrderId === order.id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>
                </div>
              </div>

              {expandedOrderId === order.id && (
                <div className="p-4 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-4 p-2 bg-[#121212] rounded">
                    <span className="text-sm font-medium text-gray-300">{t('status')}:</span>
                    <span className="bg-amber-400/10 text-amber-300 border border-amber-500/20 px-2 py-1 rounded text-xs font-medium">
                      {order.shipping_status || t('processing')}
                    </span>
                  </div>

                  <div className="border border-white/10 rounded-md overflow-hidden mb-4">
                    <table className="min-w-full divide-y divide-white/10">
                      <thead className="bg-[#121212]">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            {t('product')}
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                            {t('quantity')}
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                            {t('price')}
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                            {t('subtotal')}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-[#1a1a1a] divide-y divide-white/10 text-gray-200">
                        {order.order_items.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className="font-medium">{item.product.name || 'Producto'}</span>
                            </td>
                            <td className="px-4 py-3 text-right whitespace-nowrap">
                              {item.quantity}
                            </td>
                            <td className="px-4 py-3 text-right whitespace-nowrap">
                              {formatPrice(item.price)}
                            </td>
                            <td className="px-4 py-3 text-right whitespace-nowrap font-medium">
                              {formatPrice(item.price * item.quantity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {order.shipping_address && (
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-300 mb-2">
                        {t('shippingAddress')}
                      </h3>
                      <div className={infoBox}>
                        <p className="font-medium">{order.shipping_address.name}</p>
                        <p>{order.shipping_address.address}</p>
                        <p>
                          {order.shipping_address.city}, {order.shipping_address.state}, {order.shipping_address.country}
                          {order.shipping_address.postal_code && ` - ${order.shipping_address.postal_code}`}
                        </p>
                        <p>{order.shipping_address.phone}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-300 mb-2">
                        {t('paymentMethod')}
                      </h3>
                      <div className={infoBox}>
                        <p className="capitalize">
                          {order.payment_method === 'paypal' ? 'PayPal' : 'SINPE Móvil'}
                        </p>
                        {order.payment_reference && (
                          <p className="text-gray-400">
                            {t('reference')}: {order.payment_reference}
                          </p>
                        )}
                      </div>
                    </div>

                    {order.tracking_number && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-300 mb-2">
                          {t('trackingInfo')}
                        </h3>
                        <div className={infoBox}>
                          <p>{order.tracking_number}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
