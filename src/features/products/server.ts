// Server-only use cases — import ONLY from this barrel in Server Components / API routes
export { getProductById } from './application/use-cases/getProductById';
export { getProductsByIds } from './application/use-cases/getProductsByIds';
export { searchProducts } from './application/use-cases/searchProducts';
export { listFeaturedProducts } from './application/use-cases/listFeaturedProducts';
export { getCategories } from './application/use-cases/getCategories';
export { distributeProducts, distribuirProductos } from './application/distribute';
export type { ProductSearchParams } from './application/use-cases/searchProducts';
export { productSearchParamsSchema, productIdSchema } from './application/schemas';