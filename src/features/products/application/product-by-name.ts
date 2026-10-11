import { cache } from 'react';
import { createServerSupabaseClient } from '@/shared/supabase/server';
import type { Database } from '@/shared/types/database';

type Product = Database['products'];

export interface ProductRating {
  average: number;
  count: number;
}

/**
 * Server-side lookup of a product by its slug (the `name` column), shared by
 * generateMetadata and the page through React's request cache so the product
 * renders in the HTML Google receives instead of loading only in the browser.
 */
export const getProductByName = cache(async (name: string): Promise<Product | null> => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from('products').select('*').eq('name', name).maybeSingle();
  if (error) {
    console.error('[getProductByName]', error.message);
    return null;
  }
  return (data as Product | null) ?? null;
});

export const getProductRating = cache(async (productId: number): Promise<ProductRating | null> => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from('reviews').select('rating').eq('product_id', productId);
  if (error || !data || data.length === 0) return null;
  const ratings = data.map((r: { rating: number }) => r.rating);
  return { average: ratings.reduce((a, b) => a + b, 0) / ratings.length, count: ratings.length };
});
