# Contract: `features/checkout`

Primary client-safe barrel: `src/features/checkout/index.ts`

Server-only PayPal use cases live in `src/features/checkout/application/use-cases/*` and PayPal provider code lives in `src/features/checkout/infrastructure/paypal/client.ts`. They are intentionally not re-exported by the primary barrel because checkout pages/components consume that barrel on the client.

## Types

```ts
// Derived from createOrderInputSchema (z.infer)
export type CreateOrderInput = z.infer<typeof createOrderInputSchema>;

// Derived from capturePaypalInputSchema (z.infer)
export type CapturePaypalInput = z.infer<typeof capturePaypalInputSchema>;

// Cart / shipping / discount / payment types are re-exported from
// `./application/distribute` and consumed by checkout presentation.
export type { CartItem, ShippingAddress, DiscountInfo, PaymentMethod, Banco } from "./application/distribute";
```

## Client-safe public API

```ts
export { createOrder, updateOrderPaymentReference, clearUserCart, getOrderDetails } from "./application/use-cases/createOrder";
export { calculateCheckout, calculatePayPalTotal } from "./application/use-cases/calculateTotal";
export { processSinpePayment, processPayPalPayment } from "./application/use-cases/processPayment";
export { createOrderInputSchema } from "./application/schemas/createOrderInput";
export { capturePaypalInputSchema } from "./application/schemas/capturePaypalInput";
export { BANCOS, SHIPPING_COST, calculateSubtotal, calculateTotal, calculateCheckoutTotal, formatShippingAddress } from "./application/distribute";
export { useCheckoutForm, useCheckoutSession } from "./application/hooks";
export { CheckoutProvider, useCheckoutContext } from "./presentation";
export { PaymentForm, PayPalCardMethod, StepOne, StepTwo } from "./presentation/components";
```

## Server-only use cases

```ts
export function createPaypalOrder(input: unknown): Promise<CreatePaypalOrderResult>;
export function capturePaypalOrder(input: unknown): Promise<CapturePaypalOrderResult>;
```

## Dependencies

- `@/features/cart` for checkout state.
- `@/features/products` for product data through client-safe APIs.
- `@/features/notifications` for confirmation flows.
- `@/shared/supabase/server` only inside server-only use cases.

## Security rules

- `createPaypalOrder` and `capturePaypalOrder` validate `orders.user_id === session.user.id` before proceeding.
- PayPal mocks only run when `PAYPAL_USE_MOCK === "1"`.
- Client responses use generic error codes; provider details stay in server logs.
