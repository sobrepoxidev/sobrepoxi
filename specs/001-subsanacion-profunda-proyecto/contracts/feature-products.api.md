# Contract: `features/products`

Barrel: `src/features/products/index.ts`

## Tipos

```ts
export type Product = Database["products"];
export type Category = Database["categories"];

export interface ProductSearchParams {
  query?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
}
```

## Use cases

```ts
export function getProductById(id: number): Promise<Product | null>;
export function getProductsByIds(ids: number[]): Promise<Product[]>;
export function searchProducts(params: ProductSearchParams): Promise<{ items: Product[]; total: number }>;
export function listFeaturedProducts(limit?: number): Promise<Product[]>;
export function getCategories(): Promise<Category[]>;
export function distributeProducts(products: Product[], categories: Category[], maxFeatured?: number): {
  gridByCategory: Record<number, Product[]>;
  gifts: Product[];
  featured: Product[];
};
```

## Componentes (presentación pública)

```ts
export { ProductCard } from "./presentation/components/ProductCard";
export { ProductDetail } from "./presentation/components/ProductDetail";
export { ProductsPageContent } from "./presentation/components/ProductsPageContent";
export { ProductFilters } from "./presentation/components/ProductFilters";
export { RelatedProducts } from "./presentation/components/RelatedProducts";
export { ProductsProvider, useProductsContext } from "./presentation/providers/ProductsProvider";
```

## Schemas

```ts
export { productSearchParamsSchema, productIdSchema } from "./application/schemas";
```

## Reglas de boundaries

- No expone tipos internos como `ProductsData` salvo que estén listados aquí.
- No reexporta clientes Supabase ni helpers de `shared`.
