import type { Database } from '@/shared/types/database';

export type ShippingAddress = Database['user_profiles']['shipping_address'];

export interface UserProfile {
  id: string;
  full_name: string | null;
  shipping_address: ShippingAddress;
  preferences: Record<string, unknown> | null;
  created_at?: string;
  updated_at?: string;
}

export type Order = Database['orders'] & {
  order_items: (Database['order_items'] & {
    product: Database['products'];
  })[];
};