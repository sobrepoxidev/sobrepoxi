# Contract: `features/admin`

Barrel: `src/features/admin/index.ts`

## Types

Reuses `Product` and `Category` from admin/product data hooks. Admin role data remains server-only via `ADMIN_EMAILS`.

## Use cases

```ts
export function requireAdmin(locale: string, returnPath: string): Promise<{ userId: string; email: string }>;
export function isAdminEmail(email: string): boolean;
export function adminListProducts(): Promise<Product[]>;
export function adminUpdateProduct(productId: number, patch: Partial<Product>): Promise<{ success: boolean; error?: string }>;
```

## Components

```ts
export { AdminDashboard } from "./presentation/components/AdminDashboard";
export { ProductEditor } from "./presentation/components/ProductEditor";
```

## Schemas

```ts
export { productEditSchema } from "./application/schemas/productEditSchema";
```

## Security rules

- `requireAdmin` reads `ADMIN_EMAILS` from server env.
- Admin pages call `requireAdmin` before rendering protected UI.
- No admin emails are hardcoded in source.
