import { createBrowserSupabaseClient } from '@/shared/supabase/client';
import { logger } from '@/shared/observability/logger';
import type { Database } from '@/shared/types/database';

type Product = Database['products'];

type CategoryRow = { id: number; name: string; name_es: string; name_en: string };

export async function getCategoriesFromDB(): Promise<CategoryRow[]> {
  const supabase = createBrowserSupabaseClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    logger.error('[getCategories]', { error });
    return [];
  }

  return data || [];
}

export async function getFeaturedProductsFromDB(limit = 10): Promise<Product[]> {
  const supabase = createBrowserSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select(`id, name, name_es, name_en, price, discount_percentage, media, category_id`)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    logger.error('[getFeaturedProducts]', { error });
    return [];
  }

  return (data as unknown) as Product[] || [];
}

export async function getProductsByCategoryFromDB(categoryId: number, limit = 4): Promise<Product[]> {
  const supabase = createBrowserSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select(`id, name, name_es, name_en, price, discount_percentage, media, category_id`)
    .eq('category_id', categoryId)
    .limit(limit);

  if (error) {
    logger.error('[getProductsByCategory]', { categoryId, error });
    return [];
  }

  return (data as unknown) as Product[] || [];
}
