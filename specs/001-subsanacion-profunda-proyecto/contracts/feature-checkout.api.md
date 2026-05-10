# Contract: `features/checkout`

Barrel: `src/features/checkout/index.ts`

## Tipos

```ts
export interface OrderInput {
  userId: string;
  items: { productId: number; quantity: number }[];
  shippingAddressId: number;
  paymentMethod: "paypal";
}

export interface PaypalOrderRef {
  paypalOrderId: string;
  internalOrderId: number;
}

export interface CaptureResult {
  status: "COMPLETED" | "FAILED" | "PENDING";
  paypalOrderId: string;
  internalOrderId: number;
}
```

## Use cases (server)

```ts
export function placeOrder(input: OrderInput): Promise<{ orderId: number }>;
export function createPaypalOrder(args: {
  userId: string;
  internalOrderId: number;
}): Promise<PaypalOrderRef>;
export function capturePaypalOrder(args: {
  userId: string;
  paypalOrderId: string;
  internalOrderId: number;
}): Promise<CaptureResult>;
```

## Componentes (presentación)

```ts
export { PaymentForm } from "./presentation/components/PaymentForm";
export { PayPalCardMethod } from "./presentation/components/PayPalCardMethod";
export { CheckoutStepOne, CheckoutStepTwo } from "./presentation/components";
```

## Schemas

```ts
export {
  createOrderInputSchema,
  capturePaypalInputSchema,
} from "./application/schemas";
```

## Dependencias declaradas

- `@/features/cart` (snapshot del cart al iniciar checkout).
- `@/features/products` (verificación de inventario / precios).
- `@/features/auth` (sesión / userId).
- `@/features/notifications` (envío de confirmación post-captura).
- `@/shared/supabase` (cliente server con cookies).

## Reglas de seguridad (encarnadas por los use cases)

- `createPaypalOrder` y `capturePaypalOrder` validan `orders.user_id === userId` antes de proceder.
- Mock fallbacks de PayPal solo se activan si `process.env.PAYPAL_USE_MOCK === "1"`.
- Errores devuelven mensajes genéricos al cliente; detalle queda en logs server.
