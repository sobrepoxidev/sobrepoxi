import { createServerSupabaseClient } from '@/shared/supabase/server';
import type { Database } from '@/shared/types/database';

type Product = Database['products'];

export interface ProductSearchParams {
  query?: string;
  categoryId?: number;
  page?: number;
  pageSize?: number;
}

export interface SearchProductsResult {
  items: Product[];
  total: number;
}

export async function searchProducts(params: ProductSearchParams): Promise<SearchProductsResult> {
  const { query = '', categoryId, page = 1, pageSize = 12 } = params;
  const supabase = await createServerSupabaseClient();

  let queryBuilder = supabase
    .from('products')
    .select('id, name, name_es, name_en, description, colon_price, dolar_price, media, category_id, discount_percentage, is_active, created_at', { count: 'exact' })
    .eq('is_active', true);

  if (query.trim().length >= 2) {
    const sanitized = query.trim().replace(/[^\w\s]/gi, '');
    queryBuilder = queryBuilder.or(
      `name_es.ilike.%${sanitized}%,name_en.ilike.%${sanitized}%,description.ilike.%${sanitized}%`
    );
  }

  if (categoryId) {
    queryBuilder = queryBuilder.eq('category_id', categoryId);
  }

  const from = (page - 1) * pageSize;
  queryBuilder = queryBuilder.range(from, from + pageSize - 1);

  const { data, error, count } = await queryBuilder;

  if (error) {
    console.error('[searchProducts]', error);
    return { items: [], total: 0 };
  }

  return { items: (data as unknown ?? []) as Product[], total: count ?? 0 };
}