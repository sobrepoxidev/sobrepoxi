# Contract: `features/admin`

Barrel: `src/features/admin/index.ts`

## Tipos

Re-utiliza `Product`, `Category` desde `@/features/products`. No define dominio nuevo de admin a menos que se introduzca tabla `user_roles`.

## Use cases (server)

```ts
export function requireAdmin(): Promise<{ userId: string; email: string }>; // redirect si no es admin
export function isAdminEmail(email: string): boolean;                       // helper puro
export function adminListProducts(): Promise<Product[]>;
export function adminUpdateProduct(productId: number, patch: Partial<Product>): Promise<{ success: boolean; error?: string }>;
```

## Componentes

```ts
export { AdminDashboard } from "./presentation/components/AdminDashboard";
export { ProductEditor } from "./presentation/components/ProductEditor";
```

## Schemas

```ts
export { productEditSchema } from "./application/schemas";
```

## Dependencias declaradas

- `@/features/products` (tipos, use cases CRUD si aplican).
- `@/features/auth` (sesión + check de rol).
- `@/shared/supabase`.

## Reglas de seguridad

- `requireAdmin` lee la lista de admins desde `process.env.ADMIN_EMAILS` (server-only) o desde tabla `user_roles` si la migración M-001 se aprueba.
- Nunca hardcodea emails en código fuente.
