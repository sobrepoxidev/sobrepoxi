# Contract: `features/cart`

Barrel: `src/features/cart/index.ts`

## Types

```ts
export interface CartItem {
  product: Product;
  quantity: number;
  id?: number;
}

export interface EncodedCartItem {
  id: number;
  qty: number;
}
```

## Hook + Provider

```ts
export { CartProvider } from "./presentation/providers/CartProvider";
export { useCart } from "./presentation/state/CartContext";
```

`useCart()` returns:

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

## Use cases / utilities

```ts
export function encodeCartToBase64(cart: CartItem[]): string;
export function decodeCartFromBase64(encoded: string): EncodedCartItem[];
export function rebuildCartFromIds(items: EncodedCartItem[]): Promise<CartItem[]>;
export function syncCartWithDB(userId: string | undefined, cart: CartItem[]): Promise<{ success: boolean; error?: string }>;
```

## Dependencies

- Product shape is shared via `Database["products"]` to keep cart client-safe.
- Browser cart rebuild uses `@/shared/supabase/client` because it runs inside `CartProvider`.
