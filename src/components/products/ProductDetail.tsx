'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CurrencyConverterRow from '../CurrencyConverterRow';
import { 
  ChevronRight, 
  MinusCircle, 
  PlusCircle, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Search, 
  ArrowLeft,
  Check,
  Tag,
  MessageSquare,
  PlayCircle
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useSupabase } from '@/app/supabase-provider/provider';
import { useCart } from '@/context/CartContext';
import { Database } from '@/types-db';
import ReviewsList from '@/components/products/ReviewsList';
import RelatedProductsClient from '@/components/products/RelatedProductsClient';
import ReviewForm from '@/components/products/ReviewForm';
import { formatUSD } from '@/lib/formatCurrency';

type Product = Database['products'];
type Category = Database['categories'];

// The client component that handles UI and state
export default function ProductDetail({ name, locale }: { name: string, locale: string }) {
  // Ensure viewport starts at top when navigating to product page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, []);

  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [inventory, setInventory] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [reviewsRefreshKey, setReviewsRefreshKey] = useState<number>(0);
  
  const { addToCart } = useCart();
  const router = useRouter();
  
  // Get Supabase session at the component level
  const { session } = useSupabase();
  
  // Cargar producto por ID y sus datos relacionados
  useEffect(() => {
    async function fetchProductAndRelatedData() {
      setLoading(true);
      try {
        // Fetch product data
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('name', name)
          .single();

        if (productError) {
          throw productError;
        }

        if (!productData) {
          setError('Producto no encontrado');
          setLoading(false);
          return;
        }

        setProduct(productData as Product);

        // Registrar la visualización en el historial (si hay un usuario autenticado)
        if (session?.user) {
          // Record view in view_history table
          await supabase.from('view_history').insert({
            user_id: session.user.id,
            product_id: productData.id,
          }).select();
        }

        // Fetch category if available
        if (productData.category_id) {
          const { data: categoryData } = await supabase
            .from('categories')
            .select('*')
            .eq('id', productData.category_id)
            .single();
          
          setCategory(categoryData as Category);
        }

        // Fetch inventory data
        const { data: inventoryData } = await supabase
          .from('inventory')
          .select('quantity')
          .eq('product_id', productData.id)
          .single();
        
        if (inventoryData) {
          setInventory(inventoryData.quantity);
        }

        // Check if product is in favorites (if user is logged in)
        if (session?.user) {
          const { data: favoriteData } = await supabase
            .from('favorites')
            .select('name')
            .eq('user_id', session.user.id)
            .eq('product_id', productData.id)
            .single();

          setIsFavorite(!!favoriteData);
        }

      } catch {
        setError('Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    }

    if (name) {
      fetchProductAndRelatedData();
    }
  }, [name]); // Use id as dependency

  // Manejar la cantidad
  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Manejar el zoom de la imagen
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomPosition({ x, y });
  };

  // Añadir o quitar de favoritos
  const handleToggleFavorite = async () => {
    if (!product) return;
    
    // Verificar si hay un usuario autenticado
    // Usamos el session del nivel de componente
    if (!session?.user) {
      // Redireccionar a login si no hay usuario
      router.push('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }
    
    try {
      if (isFavorite) {
        // Eliminar de favoritos
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', session.user.id)
          .eq('product_id', product.id);
          
        if (error) throw error;
        setIsFavorite(false);
      } else {
        // Añadir a favoritos
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: session.user.id,
            product_id: product.id
          });
          
        if (error) throw error;
        setIsFavorite(true);
      }
    } catch (err) {
      console.error('Error al actualizar favoritos:', err);
    }
  };

  // Añadir al carrito
  const handleAddToCart = async () => {
    if (!product) return;
    
    // Añadir al carrito
    addToCart(product, quantity);
    
    // Sincronizar con la base de datos si hay un usuario
    // Usamos el session del nivel de componente
    if (session?.user) {
      try {
        // Verificar si ya existe en el carrito
        const { data: existingItem } = await supabase
          .from('cart_items')
          .select('id, quantity')
          .eq('user_id', session.user.id)
          .eq('product_id', product.id)
          .single();
        
        if (existingItem) {
          // Actualizar cantidad
          await supabase
            .from('cart_items')
            .update({ quantity: existingItem.quantity + quantity })
            .eq('id', existingItem.id);
        } else {
          // Insertar nuevo item
          await supabase
            .from('cart_items')
            .insert({
              user_id: session.user.id,
              product_id: product.id,
              quantity: quantity
            });
        }
      } catch (error) {
        console.error('Error al sincronizar con la base de datos:', error);
      }
    }
    
  };

  // Si está cargando, muestra un spinner
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center bg-[#121212] items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#b68b44]"></div>
      </div>
    );
  }

  // Si hay un error, muestra un mensaje
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center bg-[#121212]">
        <div className="bg-[#303030] border border-[#b68b44] rounded-lg p-6 inline-block">
          <h1 className="text-xl font-semibold gold-gradient-bright mb-2">
            {error || 'Producto no encontrado'}
          </h1>
          <p className="gold-gradient mb-4">
            {locale === 'es' ? 'Lo sentimos, no pudimos encontrar el producto que estás buscando.' : 'We apologize, we were unable to find the product you were looking for.'}
          </p>
          <Link 
            href="/products" 
            className="inline-flex items-center justify-center px-4 py-2 bg-gold-gradient-100 text-black font-semibold rounded-md hover:bg-gold-gradient-bright transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {locale === 'es' ? 'Volver a productos' : 'Back to products'}
          </Link>
        </div>
      </div>
    );
  }

  // Detect current media item and type
  const currentMedia = product.media?.[activeImageIndex];
  const mainMediaUrl = currentMedia?.url || '/product-placeholder.png';
  const isVideo = currentMedia?.type === 'video';

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-8 bg-[#121212]">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center text-sm text-[#b68b44]">
        <Link href="/" className="hover:text-teal-600">Inicio</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/products" className="hover:text-teal-600"> {locale === 'es' ? 'Productos' : 'Products'}</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="font-medium text-[#b68b44] truncate max-sm:max-w-[200px]">{locale === 'es' ? product.name_es : product.name_en}</span>
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col md:flex-row md:gap-8">
        {/* Columna izquierda: Imágenes */}
        <div className="w-full md:w-7/12">
          <div className="sticky top-24">
            {/* Media principal: imagen o video */}
            <div
              className={`relative bg-[#303030] h-[400px] md:h-[500px] flex items-center justify-center border border-[#b68b44] rounded-lg overflow-hidden mb-4 ${isVideo ? '' : 'cursor-zoom-in'}`}
              onMouseEnter={!isVideo ? () => setIsZoomed(true) : undefined}
              onMouseLeave={!isVideo ? () => setIsZoomed(false) : undefined}
              onMouseMove={!isVideo ? handleMouseMove : undefined}
              onClick={!isVideo ? () => setIsZoomed(!isZoomed) : undefined}
            >
              <div className="relative w-full h-full">
                {isVideo ? (
                  <video
                    className="object-contain w-full h-full gold-gradient-bright"
                    preload="none"
                    controls
                    playsInline
                    poster="/video-placeholder.png"
                  >
                    <source src={mainMediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={mainMediaUrl}
                    alt={product.name || ''}
                    fill
                    className={`object-contain transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                    style={isZoomed ? { transformOrigin: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%` } : undefined}
                    priority
                  />
                )}
                {!isVideo && isZoomed && (
                  <div className="absolute top-2 right-2 bg-[#303030] bg-opacity-80 rounded-full p-2">
                    <Search className="h-4 w-4 icon-gold" />
                  </div>
                )}
              </div>
            </div>

            {/* Galería de miniaturas */}
            {product.media && product.media.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {product.media.map((item, index) => (
                  <button
                    key={index}
                    className={`relative h-20 border rounded-md overflow-hidden transition hover:border-[#b68b44] ${
                      activeImageIndex === index ? 'border-[#b68b44] ring-2 ring-[#b68b44]' : 'border-gray-200'
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`Ver media ${index + 1}`}
                  >
                    {item.type === 'video' ? (
                      <>
                        <video
                          src={item.url + '#t=0.1'}
                          preload="metadata"
                          className="object-cover absolute inset-0 w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <PlayCircle className="h-6 w-6 icon-gold" />
                        </div>
                      </>
                    ) : (
                      <Image
                        src={item.url}
                        alt={`Media ${index + 1} de ${locale === 'es' ? product.name_es : product.name_en}`}
                        fill
                        className="object-contain p-1"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Columna derecha: Información del producto */}
        <div className="w-full md:w-5/12">
          <h1 className="text-2xl sm:text-3xl font-bold gold-gradient-bright mb-2">
            {locale === 'es' ? product.name_es : product.name_en}
          </h1>
          
          {/* Categoría */}
          <div className="mb-4">
            {category && (
              <Link 
                href={`/products?category=${category.id}`}
                className="inline-block px-3 py-1 bg-[#303030] gold-gradient text-sm rounded-full border border-[#b68b44] hover:bg-[#b68b44] transition"
              >
                {locale === 'es' ? category.name_es : category.name_en}
              </Link>
            )}
            {product.brand && (
              <span className="ml-2 inline-block px-3 py-1 bg-[#303030] gold-gradient text-sm rounded-full border border-[#b68b44]">
                {product.brand}
              </span>
            )}
          </div>
          
          {/* Precio */}
          <div className="mb-6">
            {product.dolar_price ? (
               <div className="flex flex-col sm:flex-row sm:justify-start items-start sm:items-center gap-1 sm:gap-4">
                 {/* Price & discount section */}
                 <div className="flex items-center gap-0.5">
                   {product.discount_percentage && product.discount_percentage > 0 ? (
                     <>
                       <p className="text-3xl font-bold text-green-600 ">
                         {formatUSD((Number(product.dolar_price) || 0) * (1 - (Number(product.discount_percentage) || 0) / 100))}
                       </p>
                       <p className="text-lg text-green-600 line-through">
                         {formatUSD((Number(product.dolar_price) || 0))}
                       </p>
                       <span className="text-xs font-medium border sm:ml-1 border-red-700 text-red-700 px-0.5 py-0.5 rounded">
                         {product.discount_percentage}% OFF
                       </span>
                     </>
                   ) : (
                     <p className="text-3xl font-bold text-green-600">
                       {formatUSD((Number(product.dolar_price) || 0) * (1 - (Number(product.discount_percentage) || 0) / 100))}
                     </p>
                   )}
                 </div>

                 {/* Placeholder column for future parallel content */}
                 <div className="flex items-center sm:mx-auto">
                   {/* TODO: add additional content here (e.g., currency conversion or promos) */}
                   <CurrencyConverterRow amount={Number(product.dolar_price || 0)} />
                 </div>
               </div>
            ) : (
              <p className="text-xl font-bold text-white">
                {locale === 'es' ? 'Precio a consultar' : 'Price to consult'}
              </p>
            )}
            
            {/* Inventario */}
            <p className="mt-2 text-sm">
              {inventory > 0 ? (
                <span className="text-green-600 flex items-center">
                  <Check className="h-4 w-4 mr-1" />
                  {inventory > 10 ? 'En stock' : inventory==1 ? 'Última unidad' : `Solo quedan ${inventory} unidades`}
                </span>
              ) : (
                <span className="text-red-600">{locale === 'es' ? 'Vendido' : 'Sold out'}</span>
              )}
            </p>
            
            {/* SKU */}
            {product.sku && (
              <p className="text-xs text-gray-400 mt-1">
                SKU: {product.sku}
              </p>
            )}
          </div>
          
          {/* Descripción */}
          <div className="mb-8 border-b border-[#b68b44] pb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-200">{locale === 'es' ? 'Descripción' : 'Description'}</h2>
            <p className="text-gray-300 whitespace-pre-line">
              {product.description || 'No hay descripción disponible para este producto.'}
            </p>
          </div>
          
          {/* Acciones */}
          <div className="space-y-6 border-b border-[#b68b44] pb-6 mb-6">
            {/* Selector de cantidad */}
            <div>
              <h2 className="text-sm font-medium mb-2 text-gray-200">{locale === 'es' ? 'Cantidad' : 'Quantity'}</h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="text-gray-200 disabled:text-gray-300"
                  aria-label="Disminuir cantidad"
                >
                  <MinusCircle className="h-6 w-6" />
                </button>
                <span className="w-8 text-center font-medium text-gray-200">{quantity}</span>
                <button 
                  onClick={handleIncrement}
                  disabled={quantity >= 10}
                  className="text-gray-200 disabled:text-gray-300"
                  aria-label="Aumentar cantidad"
                >
                  <PlusCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="flex flex-col space-y-3">
              {inventory > 0 ? (
                <button 
                  onClick={handleAddToCart}
                  className="flex items-center justify-center w-full py-3 px-4 bg-gold-gradient-bright sm:text-lg font-semibold text-black rounded-lg hover:bg-[#b68b44] transition shadow-sm"
                >
                  <ShoppingCart className="h-5 w-5 mr-2 text-black fill-black" />
                  {locale === 'es' ? 'Añadir al carrito' : 'Add to cart'}
                </button>
              ) : (
                <Link 
                  href={`https://wa.me/50684237555?text=${encodeURIComponent(
                    locale === 'es' ? 'Hola, estoy interesado en el producto: ' + product?.name_es + ' (' + window.location.href + ')' : 'Hello, I am interested in the product: ' + product?.name_en + ' (' + window.location.href + ')'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                   className="flex items-center bg-teal-200 justify-center w-full px-4 py-2 text-sm font-medium text-teal-700 hover:text-teal-900 border border-teal-600 rounded-md hover:bg-teal-400 transition-colors"
                >
                 
                  {locale === 'es' ? 'Consultar disponibilidad' : 'Check availability'}
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
        </svg>
                </Link>
              )}
              
              <div className="flex space-x-3">
                <button 
                  onClick={handleToggleFavorite}
                  className={`flex items-center justify-center flex-1 py-2 px-4 border rounded-lg transition ${isFavorite ? 'bg-red-50 text-red-600 border-red-300' : ' text-gray-200 hover:bg-[#303030]'}`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isFavorite ? 'fill-red-600' : 'text-gray-200'}`} />
                  {isFavorite ? (locale === 'es' ? 'Guardado' : 'Saved') : (locale === 'es' ? 'Favorito' : 'Favorite')}
                </button>
                <button 
                  className="flex items-center justify-center flex-1 py-2 px-4 border border-gray-300 text-gray-200 rounded-lg hover:bg-[#303030] transition"
                  onClick={() => {
                    // Use Web Share API if available
                    if (navigator.share) {
                      navigator.share({
                        title: product?.name || 'Producto artesanal',
                        text: product?.description || 'Mira este increíble producto artesanal',
                        url: window.location.href
                      })
                      .catch(err => console.error('Error al compartir:', err));
                    } else {
                      // Fallback - copy to clipboard
                      navigator.clipboard.writeText(window.location.href);
                      alert('Enlace copiado al portapapeles');
                    }
                  }}
                >
                  <Share2 className="h-5 w-5 mr-2 text-gray-200" />
                  {locale === 'es' ? 'Compartir' : 'Share'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Detalles adicionales */}
          <div className="space-y-6">
            {/* Especificaciones */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3 text-gray-200">{locale === 'es' ? 'Especificaciones' : 'Specifications'}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="py-1 border-b border-gray-100">
                      <span className="text-gray-200 text-sm">{key}: </span>
                      <span className="text-gray-200 font-medium text-sm">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Etiquetas */}
            {product.tags && product.tags.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3 text-gray-200">{locale === 'es' ? 'Etiquetas' : 'Tags'}</h2>
                <div className="flex flex-wrap gap-1">
                  {product.tags.map((tag, index) => (
                    <Link 
                      key={index} 
                      href={`/products?tag=${tag}`}
                      className="inline-flex items-center px-1 py-0.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm transition"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {locale === 'es' ? tag : tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Características generales */}
            <div>
              <h2 className="text-lg font-semibold mb-3 text-gray-200">{locale === 'es' ? 'Características' : 'Features'}</h2>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-teal-700 font-medium mr-2">•</span>
                  <span className="text-gray-200">{locale === 'es' ? 'Producto hecho a mano con materiales de calidad' : 'Product made by hand with quality materials'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-700 font-medium mr-2">•</span>
                  <span className="text-gray-200">{locale === 'es' ? 'Diseño único y exclusivo' : 'Unique and exclusive design'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-700 font-medium mr-2">•</span>
                  <span className="text-gray-200">{locale === 'es' ? 'Artesanía local de Costa Rica' : 'Local craftsmanship from Costa Rica'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related products */}
      {product && (
        <RelatedProductsClient
          title={locale === 'es' ? 'Otros productos' : 'Other products'}
          locale={locale}
          categoryId={product.category_id}
          excludeIds={[product.id]}
        />
      )}

      {/* Reviews Section */}
      {!loading && !error && product && (
        <div className="mt-16 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold flex items-center mb-6 text-gray-200">
            <MessageSquare className="h-6 w-6 mr-2" />
            {locale === 'es' ? 'Reseñas y opiniones' : 'Reviews and opinions'}
          </h2>
          
          <div className="space-y-8">
            <ReviewsList productId={product.id} key={reviewsRefreshKey} />
            <ReviewForm 
              productId={product.id} 
              onReviewSubmitted={() => setReviewsRefreshKey(prev => prev + 1)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
