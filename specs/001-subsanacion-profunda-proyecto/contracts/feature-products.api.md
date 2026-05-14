# Contract: `features/products`

Primary client-safe barrel: `src/features/products/index.ts`

Server-only product use cases that import `@/shared/supabase/server` are not exported by the primary barrel, because product components and pages consume that barrel from client bundles.

## Types

```ts
export type Product = Database["products"];
export type Category = Database["categories"];
```

## Client-safe public API

```ts
export { useProducts } from "./application/hooks/useProducts";
export { getCategoriesFromDB, getFeaturedProductsFromDB, getProductsByCategoryFromDB } from "./application/categories";
export { searchProductsFn as searchProducts } from "./application/search";
export { distributeProducts } from "./application/distribute";
export { ProductCard, ProductDetail, ProductsPageContent, ProductFilters, RelatedProducts } from "./presentation/components";
export { ProductsProvider, useProductsContext } from "./presentation/providers/ProductsProvider";
```

## Server-only use cases

```ts
export function getProductById(id: number): Promise<Product | null>;
export function getProductsByIds(ids: number[]): Promise<Product[]>;
export function listFeaturedProducts(limit?: number): Promise<Product[]>;
export function getCategories(): Promise<Category[]>;
```

Route modules or server components may import server-only use cases directly from `src/features/products/application/use-cases/*` when needed.

## Rules

- Do not re-export server-only use cases from `src/features/products/index.ts`.
- Do not expose Supabase clients from the feature API.
- Cross-feature client imports must use the client-safe barrel only.
