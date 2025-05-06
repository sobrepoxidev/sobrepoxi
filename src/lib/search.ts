// src/lib/search.ts
import { supabase } from './supabaseClient';
import type { Database } from '@/types-db';

// Define MediaItem interface to match the one in types-db.ts
interface MediaItem {
  url: string;
  type: "image" | "video";
  caption?: string;
}

// Extend the Database products type with optional highlight field
export type SearchResult = {
  id: number;
  created_at?: string; // Make created_at optional to avoid type errors
  name: string | null;
  description: string | null;
  category_id: number | null;
  category_name?: string | null; // Added for convenience
  media: MediaItem[] | null;
  price: number | null;
  discount_percentage?: number | null;
  highlight?: string; // For search results highlighting
};

/**
 * Search products by query string with optional category filter
 * @param query Search query string
 * @param category Optional category filter
 * @param limit Number of results to return
 * @returns Promise with search results
 */
export async function searchProducts(
  query: string,
  category?: string,
  limit: number = 10
): Promise<SearchResult[]> {
  try {
    // Basic input validation
    if (!query || query.trim().length < 2) {
      return [];
    }
    
    // Sanitize input to prevent SQL injection
    const sanitizedQuery = query.trim().replace(/[^\w\s]/gi, '');
    
    // First, get category ID if a category name is provided
    let categoryId: number | null = null;
    if (category && category !== 'Todas') {
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('name', category)
        .single();
        
      if (categoryData) {
        categoryId = categoryData.id;
      }
    }
    
    // Build query
    let queryBuilder = supabase
      .from('products')
      .select('id, name, description, price, media, category_id, discount_percentage')
      .limit(limit);
    
    // Add text search condition
    queryBuilder = queryBuilder.or(
      `name.ilike.%${sanitizedQuery}%,description.ilike.%${sanitizedQuery}%`
    );
    
    // Add category filter if we found a matching category ID
    if (categoryId !== null) {
      queryBuilder = queryBuilder.eq('category_id', categoryId);
    }
    
    const { data, error } = await queryBuilder;
    
    if (error) {
      console.error('Search error:', error);
      return [];
    }
    
    // Process results to add highlights
    const results = await Promise.all((data || []).map(async (product) => {
      const highlight = getHighlight(product, sanitizedQuery);
      
      // Fetch category name if product has a category_id
      let categoryName: string | null = null;
      if (product.category_id) {
        const { data: categoryData } = await supabase
          .from('categories')
          .select('name')
          .eq('id', product.category_id)
          .single();
          
        if (categoryData) {
          categoryName = categoryData.name;
        }
      }
      
      // Create a properly typed SearchResult object
      const searchResult: SearchResult = { 
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        media: product.media,
        category_id: product.category_id,
        category_name: categoryName,
        discount_percentage: product.discount_percentage,
        highlight
      };
      
      // Only add created_at if it exists in the product
      if ('created_at' in product) {
        searchResult.created_at = product.created_at as string;
      }
      
      return searchResult;
    }));
    
    return results;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}

/**
 * Create a highlighted snippet from the product data
 */
function getHighlight(product: SearchResult, query: string): string {
  if (!product.description) return '';
  
  const description = product.description;
  const queryLower = query.toLowerCase();
  const descLower = description.toLowerCase();
  
  // Find position of query in description
  const position = descLower.indexOf(queryLower);
  
  if (position === -1) {
    // If not found in description, return first 100 chars
    return description.substring(0, 100) + '...';
  }
  
  // Create a window around the match
  const start = Math.max(0, position - 40);
  const end = Math.min(description.length, position + query.length + 40);
  
  let highlight = '';
  
  if (start > 0) {
    highlight += '...';
  }
  
  highlight += description.substring(start, end);
  
  if (end < description.length) {
    highlight += '...';
  }
  
  return highlight;
}

/**
 * Get all available product categories
 */
export async function getProductCategories(): Promise<string[]> {
  try {
    // Fetch categories from the categories table
    const { data, error } = await supabase
      .from('categories')
      .select('name')
      .order('name');
    
    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
    
    // Extract category names
    const categories = data.map(item => item.name);
    return categories.filter(Boolean) as string[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
