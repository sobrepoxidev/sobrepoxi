import type { Database } from '@/shared/types/database';

type Product = Database['products'];

export interface CartItem {
  product: Product;
  quantity: number;
  id?: number;
}

export interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
}

export interface DiscountInfo {
  valid: boolean;
  discountAmount: number;
  finalTotal: number;
  code: string;
  description?: string;
  discount_type: Database['discount_codes']['discount_type'];
  discount_value: number;
}

export type PaymentMethod = 'sinpe' | 'paypal' | 'transfer' | 'card';

export interface Banco {
  nombre: string;
  sms?: string;
  permiteSMS: boolean;
}

export const BANCOS: Banco[] = [
  { nombre: 'Banco Nacional de Costa Rica (BNCR)', sms: '+2627', permiteSMS: true },
  { nombre: 'Banco de Costa Rica (BCR)', sms: '+2276 (Solo Kolbi)', permiteSMS: true },
  { nombre: 'BAC Credomatic', sms: '+7070-1222', permiteSMS: true },
  { nombre: 'Banco Popular', permiteSMS: false },
  { nombre: 'Davivienda', sms: '+7070 o +7474', permiteSMS: true },
  { nombre: 'Scotiabank', permiteSMS: false },
  { nombre: 'Banco Promerica', sms: '+6223 o +2450', permiteSMS: true },
  { nombre: 'Banco Lafise', sms: '+9091', permiteSMS: true },
];

export const SHIPPING_COST = 3200;

export function calculateSubtotal(cart: CartItem[]): number {
  return cart.reduce((acc, item) => {
    if (!item.product.colon_price) return acc;
    const price = item.product.colon_price;
    const discount = item.product.discount_percentage || 0;
    const finalPrice = price * (1 - discount / 100);
    return acc + finalPrice * item.quantity;
  }, 0);
}

export function calculateTotal(cart: CartItem[], discountInfo?: DiscountInfo | null): number {
  const subtotal = calculateSubtotal(cart);
  const shipping = cart.length ? SHIPPING_COST : 0;
  const totalWithShipping = subtotal + shipping;
  return discountInfo ? discountInfo.finalTotal : totalWithShipping;
}

export function calculateCheckoutTotal(cart: CartItem[], discountInfo?: DiscountInfo | null): number {
  const subtotal = cart.reduce((acc, item) => acc + (item.product.dolar_price ?? 0) * item.quantity, 0);
  const shipping = cart.length ? 7 : 0;
  return discountInfo ? discountInfo.finalTotal : subtotal + shipping;
}

export function formatShippingAddress(data: {
  nombre: string;
  apellidos: string;
  telefono: string;
  direccion1: string;
  direccion2: string;
  provincia: string;
  canton: string;
  distrito: string;
  codigoPostal: string;
}): ShippingAddress {
  return {
    name: `${data.nombre} ${data.apellidos}`.trim(),
    address: data.direccion1 + (data.direccion2 ? `, ${data.direccion2}` : ''),
    city: data.canton,
    state: data.provincia,
    country: 'Costa Rica',
    postal_code: data.codigoPostal,
    phone: data.telefono,
  };
}
