export type { Product, Category } from './application/hooks/useAdminProducts';
export type { AdminProductsState } from './application/hooks/useAdminProducts';

export { useAdminProducts } from './application/hooks/useAdminProducts';

export { formatModifiedDate, formatDate } from './application/distribute';
export { requireAdmin, isAdminEmail } from './application/use-cases/requireAdmin';
export type { AdminSession } from './application/use-cases/requireAdmin';
export { adminListProducts } from './application/use-cases/adminListProducts';
export { adminUpdateProduct } from './application/use-cases/adminUpdateProduct';
export { productEditSchema } from './application/schemas/productEditSchema';
export type { ProductEditInput } from './application/schemas/productEditSchema';

export { AdminDashboard } from './presentation/components/AdminDashboard';
export { ProductEditor } from './presentation/components/ProductEditor';
