# Contract: `features/cart`

Barrel: `src/features/cart/index.ts`

## Tipos

```ts
export interface CartItem {
  product: Product;        // re-uso del tipo de @/features/products
  quantity: number;
  id?: number;             // id en cart_items si está sincronizado
}
```

## Hook + Provider

```ts
export { CartProvider } from "./presentation/state/CartContext";
export { useCart } from "./presentation/state/CartContext";
```

`useCart()` retorna:

```ts
{
  cart: CartItem[];
  addToCart(product: Product, quantity?: number): void;
  updateQuantity(productId: number, quantity: number): void;
  removeFromCart(productId: number): void;
  clearCart(): void;
  totalItems: number;
  subtotal: number;
  isLoading: boolean;
  syncCartWithDB(userId?: string): Promise<void>;
}
```

## Use cases / utilidades

```ts
export function encodeCartToUrl(cart: CartItem[]): string;
export function decodeCartFromUrl(encoded: string): { id: number; qty: number }[];
export function rebuildCartFromIds(ids: number[]): Promise<CartItem[]>;
```

## Schemas

```ts
export { cartUrlSchema } from "./application/schemas";
```

## Dependencias declaradas

- `@/features/products` (tipo `Product`, use case `getProductsByIds`).
- `@/shared/supabase` (cliente browser para sync con BD).
