import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types-db'
import OptimizedNew from '@/components/home/OptimizedNew'

export default async function HomePageData({ locale }: { locale: string }) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignore
          }
        },
      },
    }
  )

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  const firstCategories = categories?.slice(0, 3) || []
  const firstCategoryIds = firstCategories.map(category => category.id)

  const secondCategories = categories?.slice(6, 12) || []
  const secondCategoryIds = secondCategories.map(category => category.id)

  let initialProducts: Database['products'][] = []

  if (firstCategoryIds.length > 0) {
    const { data: firstCategoryProducts } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .in('category_id', firstCategoryIds)
      .order('created_at', { ascending: false })
      .limit(16)

    if (firstCategoryProducts) {
      initialProducts = [...initialProducts, ...firstCategoryProducts]
    }

    if (secondCategoryIds.length > 0) {
      const { data: secondCategoryProducts } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .in('category_id', secondCategoryIds)
        .order('created_at', { ascending: false })
        .limit(8)

      if (secondCategoryProducts) {
        initialProducts = [...initialProducts, ...secondCategoryProducts]
      }
    }
  }

  return (
    <OptimizedNew
      initialCategories={categories || []}
      initialProducts={initialProducts}
      locale={locale}
    />
  )
}