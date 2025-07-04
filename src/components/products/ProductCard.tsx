'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Database } from '@/types-db';
import { supabase } from '@/lib/supabaseClient';
import { useLocale } from 'next-intl';
import { formatUSD } from '@/lib/formatCurrency';

type Product = Database['products'];
type Category = Database['categories'];

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
  const [inventory, setInventory] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();
  const locale = useLocale();
  
  const mainImageUrl = product?.media?.[0]?.url || '/product-placeholder.png';
  
  // Fetch category and inventory data
  useEffect(() => {
    async function fetchData() {
      if (product.category_id) {
        const { data } = await supabase
          .from('categories')
          .select('*')
          .eq('id', product.category_id)
          .single();
          
        if (data) setCategory(data as Category);
      }
      
      // Get inventory data
      const { data: inventoryData } = await supabase
        .from('inventory')
        .select('quantity')
        .eq('product_id', product.id)
        .single();
        
      if (inventoryData) setInventory(inventoryData.quantity);
      
      // Check if user has this product in favorites
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: favoriteData } = await supabase
          .from('favorites')
          .select('id')
          .eq('user_id', session.user.id)
          .eq('product_id', product.id)
          .maybeSingle();
          
        setIsFavorite(!!favoriteData);
      }
    }
    
    fetchData();
  }, [product.id, product.category_id]);
  
  // Calculate final price with discount
  const finalPrice = product.dolar_price ? 
    product.discount_percentage && product.discount_percentage > 0 ?
      product.dolar_price * (1 - product.discount_percentage / 100) :
      product.dolar_price
    : null;
  
  return (
    <div 
      className="bg-gold-gradient-75 border border-[#303030] rounded-lg overflow-hidden flex flex-col transition-shadow duration-300 h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {/* Category badge */}
        {category && (
          <span className=" gold-gradient text-xs px-1 py-0.5 rounded-full border border-[#b68b44]">
            {locale === 'es' ? category.name_es : category.name_en}
          </span>
        )}
        
        {/* Featured badge */}
        {product.is_featured && (
          <span className=" gold-gradient text-xs px-1 py-0.5 rounded-full border border-[#b68b44]">
            <Star className="h-3 w-3 mr-1 icon-gold" />
            {locale === 'es' ? 'Destacado' : 'Featured'}
          </span>
        )}
        
        {/* Discount badge */}
        {Number(product.discount_percentage) > 0 && (
          <span className="text-xs font-medium border sm:ml-1 border-red-700 text-red-700 px-0.5 py-0.5 rounded">
            {product.discount_percentage}% OFF
          </span>
        )}
      </div>
      
      {/* Botón de favorito */}
      <button 
        className="absolute top-3 right-3 z-10 text-gray-300 hover:text-red-500 transition-colors"
        onClick={async (e) => {
          e.preventDefault();
          
          // Get user session
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            try {
              if (isFavorite) {
                // Remove from favorites
                await supabase
                  .from('favorites')
                  .delete()
                  .eq('user_id', session.user.id)
                  .eq('product_id', product.id);
              } else {
                // Add to favorites
                await supabase
                  .from('favorites')
                  .insert({
                    user_id: session.user.id,
                    product_id: product.id
                  });
              }
              
              setIsFavorite(!isFavorite);
            } catch (err) {
              console.error('Error updating favorites:', err);
            }
          } else {
            // Redirect to login or show login modal
            alert('Inicia sesión para guardar favoritos');
          }
        }}
      >
      </button>
      
      {/* Imagen del producto */}
      <Link href={`/product/${product.name}`} className="block h-48 sm:h-60 relative">
      <div className="h-full w-full flex items-center justify-center bg-[#303030]  p-4">
          <Image
            src={mainImageUrl}
            alt={product.name || ''}
            width={180}
            height={180}
            className={`object-contain max-h-full max-w-full  transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
        </div>
      </Link>
      
      {/* Detalles del producto */}
      <div className="p-4 flex-grow flex flex-col">
        <Link 
          href={`/product/${product.name}`}
          className="text-black font-medium mb-1 hover:text-[#303030] transition-colors line-clamp-2 min-h-[48px]"
        >
          {locale === 'es' ? product.name_es : product.name_en}
        </Link>
        
        {/* Calificación simulada - En un sistema real se calcularía basado en reseñas */}
        <div className="flex items-center text-gold-gradient-90 mb-2">
          <Star className="fill-current h-4 w-4 icon-gold" />
          <Star className="fill-current h-4 w-4 icon-gold" />
          <Star className="fill-current h-4 w-4 icon-gold" />
          <Star className="fill-current h-4 w-4 icon-gold" />
          <Star className="fill-current h-4 w-4 icon-gold" />
          <span className="text-xs text-gray-300 ml-1">(5.0)</span>
        </div>
        
        {/* Precio e Inventario */}
        <div className="mt-auto">
          {product.dolar_price ? (
            <div>
              {product.discount_percentage && product.discount_percentage > 0 ? (
                <div className="mb-2">
                  <p className="text-lg font-bold text-green-600">
                    {formatUSD(finalPrice || 0)}
                  </p>
                  <p className="text-xs text-green-600 line-through">
                    {formatUSD(product.dolar_price || 0)}
                  </p>
                </div>
              ) : (
                <p className="text-lg font-bold text-green-600 mb-2">
                  {formatUSD(product.dolar_price || 0)}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm font-semibold text-white  mb-2">
              {locale === 'es' ? 'Precio a consultar' : 'Price to consult'}
            </p>
          )}
          
          {/* Inventory status */}
          <p className="text-xs mb-2">
            {inventory > 0 ? (
              <span className="text-black flex items-center">
                <Check className="h-3 w-3 mr-1" />
                {inventory > 10 ? locale === 'es' ? 'En stock' : 'In stock' : `${inventory} ${locale === 'es' ? 'disponibles' : 'available'}`}
              </span>
            ) : (
              <span className="text-red-600">{locale === 'es' ? 'Agotado' : 'Out of stock'}</span>
            )}
          </p>
          
          {/* Botones de acción */}
          <div className="flex space-x-2 mt-2">
            <Link 
              href={`/product/${product.name}`}
              className="flex-1 py-2 text-sm text-center text-black border border-black rounded hover:bg-black hover:text-white transition"
            >
              {locale === 'es' ? 'Ver detalles' : 'View details'}
            </Link>
            <button 
              onClick={() => addToCart(product, 1)}
              className={`flex items-center justify-center p-2 rounded transition
                ${inventory > 0 ? ' text-black border border-black hover:bg-black hover:text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              aria-label={locale === 'es' ? 'Añadir al carrito' : 'Add to cart'}
              disabled={inventory <= 0}
            >
              <ShoppingCart className="h-4 w-4 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
