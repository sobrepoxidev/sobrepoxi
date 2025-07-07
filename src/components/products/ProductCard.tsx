'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
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
      <div className="absolute top-1 left-1 z-10 flex flex-row gap-1">
        {/* Category badge */}
        {category && (
          <span className=" gold-gradient text-[0.5rem] sm:text-xs px-1 py-0.5 rounded-full border border-[#b68b44]">
            {locale === 'es' ? category.name_es : category.name_en}
          </span>
        )}

        {/* Featured badge */}
        {product.is_featured && (
          <span className=" gold-gradient flex flex-row text-[0.5rem] sm:text-xs px-1 py-0.5 rounded-full border border-[#b68b44]">
            <Star className="h-3 w-3 mr-1 icon-gold" />
            {locale === 'es' ? 'Destacado' : 'Featured'}
          </span>
        )}

        {/* Discount badge */}
        {Number(product.discount_percentage) > 0 && (
          <span className="text-[0.5rem] sm:text-xs px-1 py-0.5 rounded-full border border-red-500 text-red-500">
            {product.discount_percentage}% OFF
          </span>
        )}
      </div>

      {/* Botón de favorito */}
      <button
        className="absolute top-1 right-1 z-10 text-[#b68b44] hover:text-[#b68b44] transition-colors"
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
          <Star className="fill-current h-4 w-4 icon-gold-bright" />
          <Star className="fill-current h-4 w-4 icon-gold-bright" />
          <Star className="fill-current h-4 w-4 icon-gold-bright" />
          <Star className="fill-current h-4 w-4 icon-gold-bright" />
          <Star className="fill-current h-4 w-4 icon-gold-bright" />
          <span className="text-xs text-gray-300 ml-1">(5.0)</span>
        </div>

        {/* Precio e Inventario */}
        <div className="mt-auto">
          {product.dolar_price ? (
            <div>
              {product.discount_percentage ? (
                <div className="mb-2">
                  <p className="text-sm sm:text-lg font-bold text-black">
                    {formatUSD(finalPrice || 0)}
                  </p>
                  <p className="text-[0.6rem] sm:text-sm text-black line-through">
                    {formatUSD(product.dolar_price || 0)}
                  </p>
                </div>
              ) : (
                <p className="text-sm sm:text-lg font-bold text-black mb-2">
                  {formatUSD(product.dolar_price || 0)}
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs sm:text-sm font-semibold justify-between  text-black  mb-2">
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
              <span className="text-[#121212]">{locale === 'es' ? 'Consulta vía WhatsAp' : 'Consult via WhatsApp'}</span>
            )}
          </p>

          {/* Botones de acción */}
          <div className="flex space-x-2 mt-2">
            <Link
              href={`/product/${product.name}`}
              className="flex-1 px-0.5 py-1 text-xs sm:text-sm text-center text-black border border-black rounded hover:bg-black hover:text-white transition"
            >
              {locale === 'es' ? 'Ver detalles' : 'View details'}
            </Link>

            {inventory > 0 ? (
              <button
                onClick={() => addToCart(product, 1)}
                className="flex items-center justify-center p-1 rounded transition text-black border border-black hover:bg-black hover:text-white"
                aria-label={locale === 'es' ? 'Agregar al carrito' : 'Add to cart'}
              >
                <ShoppingCart className="h-4 w-4 fill-current" />
              </button>
            ) : (
              <a
                href={`https://wa.me/50685850000?text=Hola, me gustaría consultar sobre el producto: ${locale === 'es' ? product.name_es : product.name_en} (URL: https://sobrepoxi.com/product/${product.name})`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-1 rounded transition text-black border border-black hover:bg-black hover:text-white"
                aria-label={locale === 'es' ? 'Consultar por WhatsApp' : 'Contact via WhatsApp'}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                </svg>
              </a>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
