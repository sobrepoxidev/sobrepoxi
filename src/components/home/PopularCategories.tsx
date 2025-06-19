// PopularCategories.tsx (Server Component)
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types-db';
import Image from 'next/image';
import Link from 'next/link';

export default async function PopularCategories(props: Promise<{locale: string}>) {
  const cookieStore = cookies();
  const { locale } = await props;
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
  
  // Get unique categories and count their products
  const { data: categoriesData } = await supabase
    .from('products')
    .select('category')
    .not('category', 'is', null);
  
  // Count products per category and get the top 6
  const categoryCounts: {[key: string]: number} = {};
  
  categoriesData?.forEach(item => {
    if (item.category) {
      categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
    }
  });
  
  // Convert to array, sort, and take top 6
  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([category]) => category);
  
  // Preset images for categories (you would replace these with actual category images)
  const categoryImages: {[key: string]: string} = {
    'Espejos': '/images/category-mirrors.jpg',
    'Chorreadores': '/images/category-coffee.jpg',
    'Adornos': '/images/category-decor.jpg',
    'Marcos': '/images/category-frames.jpg',
    'Muebles': '/images/category-furniture.jpg',
    'Joyería': '/images/category-jewelry.jpg',
    // Default image for other categories
    'default': '/img.webp'
  };

  return (
    <section className="py-8 bg-teal-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            {locale === 'es' ? 'Explora por categorías' : 'Explore by categories'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-4">{locale === 'es' ? 'Categorías populares' : 'Popular categories'}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {locale === 'es' ? 'Encuentra la artesanía perfecta entre nuestra variedad de categorías, cada una con diseños únicos' : 'Discover the perfect craft among our variety of categories, each with unique designs'}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mx-auto">
          {topCategories.map((category) => (
            <Link 
              key={category} 
              href={`/products?category=${encodeURIComponent(category)}`}
              className="group"
            >
              <div className="relative h-40 rounded-xl overflow-hidden">
                <Image
                  src={categoryImages[category] || categoryImages.default}
                  alt={category}
                  fill
                  className="object-cover transition-transform group-hover:scale-105 duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white font-medium text-center">
                  {category}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}