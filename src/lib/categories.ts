import { supabase } from "@/lib/supabaseClient";

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data || [];
}

export async function getFeaturedProducts(limit = 10) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      price,
      discount_percentage,
      media,
      categories(id, name)
    `)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }

  return data || [];
}

export async function getProductsByCategory(categoryId: number, limit = 4) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      price,
      discount_percentage,
      media,
      categories(id, name)
    `)
    .eq('category_id', categoryId)
    .limit(limit);

  if (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    return [];
  }

  return data || [];
}
