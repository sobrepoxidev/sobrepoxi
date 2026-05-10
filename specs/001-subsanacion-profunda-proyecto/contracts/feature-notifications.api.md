# Contract: `features/notifications`

Barrel: `src/features/notifications/index.ts`

## Server actions (server-only)

```ts
"use server";
export function sendOrderConfirmationEmail(input: {
  userEmail: string;
  orderId: number;
  customerName: string;
  shippingAddress: string;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  discountInfo?: { code: string; amount: number };
}): Promise<{ success: boolean; error?: string }>;

"use server";
export function sendContactEmail(input: {
  name: string;
  email: string;
  message: string;
  phone?: string;
}): Promise<{ success: boolean; error?: string }>;
```

## Helpers de templates

```ts
export function renderOrderConfirmationHtml(data: OrderConfirmationData): string;
export function renderContactHtml(data: ContactFormData): string;
```

## Schemas

```ts
export { sendOrderEmailInputSchema, contactFormSchema } from "./application/schemas";
```

## Dependencias declaradas

- `@/shared/utils` (formatters).
- Infraestructura: `nodemailer` consumido en `infrastructure/transport/nodemailer.ts` (no expuesto).

## Reglas de seguridad

- NO existe ningún endpoint HTTP público (`/api/send-email`, `/api/send-order-email` quedan **eliminados**).
- Las server actions validan input con `zod` y filtran HTML (sanitización en templates).
- Las credenciales SMTP (`EMAIL_USER`, `EMAIL_PASS`) se leen solo en `infrastructure/`.
- Las direcciones `to` permitidas son: la del usuario autenticado + emails internos definidos en config (`COMPANY_EMAIL`).
