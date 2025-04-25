// FeaturedProducts.tsx (Server Component)
import AddToCartButton from './AddToCartButton';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types-db';
import Link from 'next/link';
import Image from 'next/image';
//import AddToCartButton from './AddToCartButton'; // This will be a client component

export default async function FeaturedProducts() {
  const supabase = createServerComponentClient<Database>({ cookies });
  
  const { data: products } = await supabase
    .from('products')
    .select('id, name, description, price, media, category')
    .order('created_at', { ascending: false })
    .limit(4);

  return (
    <section className="max-w-[1500px] mx-auto mt-2  h-full bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            Destacados
          </span>
          
        </div>
        <div className="relative  h-[26rem] bg-white shadow-sm overflow-hidden">
    <div className="absolute inset-0 flex flex-col ">
      <div className="pl-4 pt-4 bg-gradient-to-b from-white to-transparent">
        <h3 className="text-lg font-semibold text-gray-800">Destacados</h3>
      </div>
      <div className="flex-grow pt-1">
      
      </div>
      <div className="pl-4 pt-0.5 bg-gradient-to-t from-white to-transparent flex items-center justify-center">
        <Link href="/products" className="inline-block p-0.5 text-xs bg-teal-600 text-white hover:bg-teal-700 transition-colors">
          Ver más
        </Link>
      </div>
    </div>
  </div>
        <div>
          
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <div key={product.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group">
              <Link href={`/products?id=${product.id}`} className="block">
                <div className="relative h-56 overflow-hidden bg-gray-50 flex items-center justify-center">
                  <Image
                    src={product.media?.[0]?.url || '/product-placeholder.png'}
                    alt={product.name || ''}
                    width={110}
                    height={0}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    
                  />
                  <span className="absolute top-3 left-3 bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded-full border border-teal-100">
                    {product.category || 'Artesanía'}
                  </span>
                </div>
              </Link>
              
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                  {/* <p className="text-sm text-gray-600 line-clamp-2 mb-2">{product.description}</p> */}
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-teal-700">
                      {product.price ? `₡${product.price}` : 'Consultar'}
                    </p>
                    <span className="bg-amber-50 text-amber-700 text-xs px-2 py-0.5 rounded-full border border-amber-200">
                      Hecho a mano
                    </span>
                  </div>
                </div>
                
                <AddToCartButton productId={product.id} />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link href="/products" className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition shadow-sm font-medium">
            Ver todos los productos
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
