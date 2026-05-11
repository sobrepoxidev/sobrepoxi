import type { CartItem, ShippingAddress, DiscountInfo } from '../distribute';

export interface CheckoutCalculation {
  subtotal: number;
  shipping: number;
  discountAmount: number;
  total: number;
}

export function calculateCheckout(params: {
  cart: CartItem[];
  shippingAddress?: ShippingAddress | null;
  discountInfo?: DiscountInfo | null;
}): CheckoutCalculation {
  const { cart, discountInfo } = params;

  const subtotal = cart.reduce((acc, item) => {
    const price = item.product.colon_price || 0;
    const discount = item.product.discount_percentage || 0;
    return acc + price * (1 - discount / 100) * item.quantity;
  }, 0);

  const shipping = cart.length ? 3200 : 0;
  const totalBeforeDiscount = subtotal + shipping;
  const discountAmount = discountInfo ? totalBeforeDiscount - discountInfo.finalTotal : 0;

  return {
    subtotal,
    shipping,
    discountAmount,
    total: discountInfo ? discountInfo.finalTotal : totalBeforeDiscount,
  };
}

export function calculatePayPalTotal(cart: CartItem[], discountInfo?: DiscountInfo | null): number {
  const subtotal = cart.reduce((acc, item) => acc + (item.product.dolar_price ?? 0) * item.quantity, 0);
  const shipping = cart.length ? 7 : 0;
  return discountInfo ? discountInfo.finalTotal : subtotal + shipping;
}
