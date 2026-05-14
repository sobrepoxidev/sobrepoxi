'use client';

import { createBrowserSupabaseClient } from '@/shared/supabase/client';
import { logger } from '@/shared/observability/logger';

interface MediaItem {
  url: string;
  type: 'image' | 'video';
  caption?: string;
}

export interface SearchResult {
  id: number;
  created_at?: string;
  name: string | null;
  name_es: string | null;
  name_en: string | null;
  description: string | null;
  category_id: number | null;
  category_name?: string | null;
  media: MediaItem[] | null;
  colon_price: number | null;
  dolar_price: number | null;
  discount_percentage?: number | null;
  highlight?: string;
}

export async function searchProductsFn(
  query: string,
  locale: string,
  category?: string,
  pageOrLimit: number = 1,
  limit: number = 12,
  sortBy: string = 'relevance',
  isPaginated: boolean = true
): Promise<{ results: SearchResult[]; totalCount: number }> {
  try {
    if (!query || query.trim().length < 2) {
      return { results: [], totalCount: 0 };
    }
    const sanitizedQuery = query.trim().replace(/[^\w\s]/gi, '');
    const supabase = createBrowserSupabaseClient();

    let categoryId: number | null = null;
    if (category && category !== 'Todo') {
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('name', category)
        .single();
      if (categoryData) categoryId = categoryData.id;
    }

    let from: number;
    let to: number;
    if (isPaginated) {
      from = (pageOrLimit - 1) * limit;
      to = from + limit - 1;
    } else {
      from = 0;
      to = pageOrLimit - 1;
    }

    const countQuery = supabase
      .from('products')
      .select('id', { count: 'exact' })
      .or(`${locale === 'es' ? 'name_es' : 'name_en'}.ilike.%${sanitizedQuery}%,description.ilike.%${sanitizedQuery}%`);

    if (categoryId !== null) {
      countQuery.eq('category_id', categoryId);
    }

    let queryBuilder = supabase
      .from('products')
      .select('id, name, name_es, name_en, description, colon_price, dolar_price, media, category_id, discount_percentage, created_at')
      .or(`${locale === 'es' ? 'name_es' : 'name_en'}.ilike.%${sanitizedQuery}%,description.ilike.%${sanitizedQuery}%`);

    if (categoryId !== null) {
      queryBuilder = queryBuilder.eq('category_id', categoryId);
    }
    if (sortBy === 'price-asc') queryBuilder = queryBuilder.order('dolar_price', { ascending: true });
    else if (sortBy === 'price-desc') queryBuilder = queryBuilder.order('dolar_price', { ascending: false });
    else if (sortBy === 'newest') queryBuilder = queryBuilder.order('created_at', { ascending: false });

    queryBuilder = queryBuilder.range(from, to);

    const { data, error } = await queryBuilder;
    if (error) {
      logger.error('[searchProducts]', { error });
      return { results: [], totalCount: 0 };
    }

    const { count: totalCount } = await countQuery;

    const results = await Promise.all((data || []).map(async (product) => {
      const highlight = getHighlightText(product, sanitizedQuery);
      let categoryName: string | null = null;
      if (product.category_id) {
        const { data: catData } = await supabase
          .from('categories')
          .select('name,name_es,name_en')
          .eq('id', product.category_id)
          .single();
        if (catData) categoryName = locale === 'es' ? catData.name_es : catData.name_en || catData.name;
      }
      const searchResult: SearchResult = {
        id: product.id,
        name: product.name,
        name_es: product.name_es,
        name_en: product.name_en,
        description: product.description,
        colon_price: product.colon_price,
        dolar_price: product.dolar_price,
        media: product.media as MediaItem[] | null,
        category_id: product.category_id,
        category_name: categoryName,
        discount_percentage: product.discount_percentage,
        highlight,
      };
      if ('created_at' in product) searchResult.created_at = product.created_at as string;
      return searchResult;
    }));

    return { results, totalCount: totalCount || results.length };
  } catch (error) {
    logger.error('[searchProducts]', { error });
    return { results: [], totalCount: 0 };
  }
}

export async function getProductCategories(locale: string): Promise<{ id: number; name: string; name_es: string; name_en: string }[]> {
  try {
    const supabase = createBrowserSupabaseClient();
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, name_es, name_en')
      .order(locale === 'es' ? 'name_es' : 'name_en');
    if (error) {
      logger.error('[getProductCategories]', { error });
      return [];
    }
    return data || [];
  } catch (error) {
    logger.error('[getProductCategories]', { error });
    return [];
  }
}

function getHighlightText(product: SearchResult, query: string): string {
  if (!product.description) return '';
  const descLower = product.description.toLowerCase();
  const queryLower = query.toLowerCase();
  const position = descLower.indexOf(queryLower);
  if (position === -1) return product.description.substring(0, 100) + '...';
  const start = Math.max(0, position - 40);
  const end = Math.min(product.description.length, position + query.length + 40);
  let highlight = start > 0 ? '...' : '';
  highlight += product.description.substring(start, end);
  if (end < product.description.length) highlight += '...';
  return highlight;
}

export { searchProductsFn as searchProducts };
