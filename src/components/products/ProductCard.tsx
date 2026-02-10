'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Star, ShoppingCart, Check, Heart } from 'lucide-react';
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

      const { data: inventoryData } = await supabase
        .from('inventory')
        .select('quantity')
        .eq('product_id', product.id)
        .single();
      if (inventoryData) setInventory(inventoryData.quantity);

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

  const finalPrice = product.dolar_price
    ? product.discount_percentage && product.discount_percentage > 0
      ? product.dolar_price * (1 - product.discount_percentage / 100)
      : product.dolar_price
    : null;

  return (
    <div
      className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden flex flex-col transition-all duration-300 h-full relative group hover:border-amber-600/40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 max-w-[calc(100%-40px)]">
        {category && (
          <span className="text-[9px] sm:text-[11px] font-medium px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/50 text-amber-400 border border-amber-500/20 backdrop-blur-sm truncate">
            {locale === 'es' ? category.name_es : category.name_en}
          </span>
        )}
        {Number(product.discount_percentage) > 0 && (
          <span className="text-[9px] sm:text-[11px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 backdrop-blur-sm w-fit">
            -{product.discount_percentage}%
          </span>
        )}
      </div>

      {/* Favorite button */}
      <button
        className={`absolute top-2 right-2 z-10 p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-all ${
          isFavorite
            ? 'bg-red-500/20 text-red-400'
            : 'bg-black/40 text-gray-400 hover:text-white hover:bg-black/50'
        }`}
        onClick={async (e) => {
          e.preventDefault();
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            try {
              if (isFavorite) {
                await supabase.from('favorites').delete()
                  .eq('user_id', session.user.id).eq('product_id', product.id);
              } else {
                await supabase.from('favorites').insert({
                  user_id: session.user.id, product_id: product.id
                });
              }
              setIsFavorite(!isFavorite);
            } catch (err) {
              console.error('Error updating favorites:', err);
            }
          } else {
            alert(locale === 'es' ? 'Inicia sesión para guardar favoritos' : 'Sign in to save favorites');
          }
        }}
        aria-label={locale === 'es' ? 'Favorito' : 'Favorite'}
      >
        <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
      </button>

      {/* Product image */}
      <Link href={`/product/${product.name}`} className="block aspect-square relative overflow-hidden bg-[#121212]">
        <Image
          src={mainImageUrl}
          alt={product.name || ''}
          fill
          className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized
        />
      </Link>

      {/* Product details */}
      <div className="p-4 flex flex-col flex-1">
        <Link
          href={`/product/${product.name}`}
          className="text-white font-medium hover:text-amber-400 transition-colors line-clamp-2 text-sm sm:text-base mb-2"
        >
          {locale === 'es' ? product.name_es : product.name_en}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-0.5 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          ))}
          <span className="text-xs text-gray-500 ml-1">(5.0)</span>
        </div>

        {/* Price & Inventory */}
        <div className="mt-auto">
          {product.dolar_price ? (
            <div className="mb-3">
              {product.discount_percentage && product.discount_percentage > 0 ? (
                <div className="flex items-baseline gap-2">
                  <p className="text-lg font-bold text-white">
                    {formatUSD(finalPrice || 0)}
                  </p>
                  <p className="text-sm text-gray-500 line-through">
                    {formatUSD(product.dolar_price || 0)}
                  </p>
                </div>
              ) : (
                <p className="text-lg font-bold text-white">
                  {formatUSD(product.dolar_price || 0)}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm font-medium text-amber-400 mb-3">
              {locale === 'es' ? 'Precio a consultar' : 'Price on request'}
            </p>
          )}

          {/* Inventory status */}
          <p className="text-xs mb-3">
            {inventory > 0 ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <Check className="h-3 w-3" />
                {inventory > 10
                  ? (locale === 'es' ? 'En stock' : 'In stock')
                  : `${inventory} ${locale === 'es' ? 'disponibles' : 'available'}`}
              </span>
            ) : (
              <span className="text-gray-500">{locale === 'es' ? 'Consultar disponibilidad' : 'Check availability'}</span>
            )}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            <Link
              href={`/product/${product.name}`}
              className="w-full py-2.5 text-sm text-center font-medium text-white bg-[#252525] rounded-lg border border-gray-700 hover:border-amber-500/50 hover:text-amber-400 transition-all"
            >
              {locale === 'es' ? 'Ver detalles' : 'View details'}
            </Link>

            {inventory > 0 ? (
              <button
                onClick={() => addToCart(product, 1)}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg bg-gold-gradient text-black hover:opacity-90 transition-opacity"
                aria-label={locale === 'es' ? 'Agregar al carrito' : 'Add to cart'}
              >
                <ShoppingCart className="h-4 w-4" />
                {locale === 'es' ? 'Agregar' : 'Add to cart'}
              </button>
            ) : (
              <Link
                href={`https://wa.me/50685850000?text=${encodeURIComponent(
                  `Hola, me gustaría consultar sobre: ${locale === 'es' ? product.name_es : product.name_en} (https://sobrepoxi.com/product/${product.name})`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg border border-emerald-600/30 text-emerald-400 hover:bg-emerald-400/10 transition-colors"
                aria-label={locale === 'es' ? 'Consultar' : 'Consult'}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                </svg>
                WhatsApp
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
