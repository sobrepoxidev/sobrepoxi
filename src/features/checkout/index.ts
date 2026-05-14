export type {
  CartItem,
  ShippingAddress,
  DiscountInfo,
  PaymentMethod,
  Banco,
} from './application/distribute';
export { BANCOS, SHIPPING_COST, calculateSubtotal, calculateTotal, calculateCheckoutTotal, formatShippingAddress } from './application/distribute';

export { createOrder, updateOrderPaymentReference, clearUserCart, getOrderDetails } from './application/use-cases/createOrder';
export { calculateCheckout, calculatePayPalTotal } from './application/use-cases/calculateTotal';
export { processSinpePayment, processPayPalPayment } from './application/use-cases/processPayment';
export { createOrderInputSchema } from './application/schemas/createOrderInput';
export type { CreateOrderInput } from './application/schemas/createOrderInput';
export { capturePaypalInputSchema } from './application/schemas/capturePaypalInput';
export type { CapturePaypalInput } from './application/schemas/capturePaypalInput';

export { useCheckoutForm } from './application/hooks/useCheckoutForm';
export type { UseCheckoutFormOptions } from './application/hooks/useCheckoutForm';
export { useCheckoutSession } from './application/hooks/useCheckoutSession';

export { default as StepOne } from './presentation/components/StepOne';
export { default as StepTwo } from './presentation/components/StepTwo';
export { default as PaymentForm } from './presentation/components/PaymentForm';
export { default as PayPalCardMethod } from './presentation/components/PayPalCardMethod';

export { CheckoutProvider } from './presentation/providers/CheckoutProvider';
export { useCheckoutContext } from './presentation/state/CheckoutContext';
