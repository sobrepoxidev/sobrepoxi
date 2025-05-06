'use client'

import React, { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaCcPaypal } from "react-icons/fa";
import { AlertTriangle, Check, Info, ShoppingBag, Tag } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types-db";
import { GalleryModal } from "@/components/products/ClientComponents";
import { ProductCardModal } from "@/components/products/ProductModal";

type Product = Database['products'];
type Category = Database['categories'];
type CartItemDB = Database['cart_items'];
type InventoryItem = Database['inventory'];

/**
 * CartPage – replica sencilla inspirada en la captura aportada.
 * Colores principales:
 *  - Secciones claras   -> #EFE9DB  (bg-[#EFE9DB])
 *  - Secciones acento   -> #E0D5BF  (bg-[#E0D5BF])
 *  - Botones primarios  -> bg-teal-500 / hover:bg-teal-600
 */

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, syncCartWithDB, totalItems, subtotal: cartSubtotal, isLoading: isCartLoading } = useCart();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{[key: number]: Category}>({});
  const [inventory, setInventory] = useState<{[key: number]: number}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [stockWarnings, setStockWarnings] = useState<{[key: number]: string}>({});

  // Calculate the total price with discounts applied
  const subtotal = cart.reduce((acc, item) => {
    if (!item.product.price) return acc;
    
    const price = item.product.price;
    const discount = item.product.discount_percentage || 0;
    const finalPrice = price * (1 - (discount / 100));
    
    return acc + finalPrice * item.quantity;
  }, 0);

  // En un caso real se calcularía dinámicamente
  const shipping = cart.length ? 3200 : 0;
  const total = subtotal + shipping;

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      
      if (session?.user) {
        // Sync cart with database if user is logged in
        syncCartWithDB(session.user.id);
      }
    };
    
    checkAuth();
  }, [syncCartWithDB]);
  
  // Fetch categories and inventory data for cart items
  useEffect(() => {
    const fetchCategoriesAndInventory = async () => {
      if (!cart.length) return;
      
      // Get all product IDs from cart
      const productIds = cart.map(item => item.product.id);
      
      // Fetch all category_ids from cart products
      const categoryIds = [...new Set(
        cart
          .map(item => item.product.category_id)
          .filter(id => id !== null && id !== undefined)
      )] as number[];
      
      // Fetch categories
      if (categoryIds.length > 0) {
        const { data: categoriesData } = await supabase
          .from('categories')
          .select('*')
          .in('id', categoryIds);
          
        if (categoriesData) {
          const categoriesMap: {[key: number]: Category} = {};
          categoriesData.forEach(category => {
            categoriesMap[category.id] = category;
          });
          setCategories(categoriesMap);
        }
      }
      
      // Fetch inventory data
      if (productIds.length > 0) {
        const { data: inventoryData } = await supabase
          .from('inventory')
          .select('*')
          .in('product_id', productIds);
          
        if (inventoryData) {
          const inventoryMap: {[key: number]: number} = {};
          const warningsMap: {[key: number]: string} = {};
          
          inventoryData.forEach(item => {
            inventoryMap[item.product_id] = item.quantity;
            
            // Check for stock warnings
            const cartItem = cart.find(c => c.product.id === item.product_id);
            if (cartItem && cartItem.quantity > item.quantity) {
              if (item.quantity === 0) {
                warningsMap[item.product_id] = 'Producto agotado';
              } else {
                warningsMap[item.product_id] = `Solo ${item.quantity} disponible(s)`;
              }
            }
          });
          
          setInventory(inventoryMap);
          setStockWarnings(warningsMap);
        }
      }
    };
    
    fetchCategoriesAndInventory();
  }, [cart]);

  // Fetch related products based on categories in cart
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!cart.length) return;
      
      setIsLoading(true);

      try {
        // Extract category IDs from cart items (avoiding duplicates)
        const categoryIdsInCart = [...new Set(
          cart
            .map(item => item.product.category_id)
            .filter(id => id !== undefined && id !== null)
        )];

        // Extract product IDs from cart items to exclude them from results
        const productIdsInCart = cart.map(item => item.product.id);

        if (categoryIdsInCart.length === 0) {
          console.log('No categories found in cart');
          setIsLoading(false);
          return;
        }

        // Optimized query: 
        // 1. Only get products from the same category_ids as in cart
        // 2. Exclude products already in cart
        // 3. Limit to just 4 products for display
        // 4. Only show active products
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .in('category_id', categoryIdsInCart)
          .not('id', 'in', productIdsInCart)
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(4);

        if (error) {
          console.error('Error fetching related products:', error.message);
          throw error;
        }

        setRelatedProducts(data as Product[] || []);
      } catch (err) {
        console.error('Error in fetchRelatedProducts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [cart]);

  return (
    <section className="min-h-screen w-full  py-8 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-semibold mb-4 text-slate-800">Carrito de compra</h1>
        <Link href="/products" className="text-teal-600 hover:underline text-sm">
          Click aquí para seguir comprando
        </Link>

        {/* Tabla del carrito */}
        <div className="mt-6 rounded-md overflow-hidden shadow-md ">
          {/* Encabezado dinámico */}
          <div className="px-4 py-2 bg-teal-600 text-white text-sm font-semibold">
            {cart.length === 1 ? "Tienes 1 artículo en el carrito" : `Tienes ${cart.length} artículos en el carrito`}
          </div>

          {cart.length === 0 && (
            <p className="p-6 text-center text-slate-600">Tu carrito está vacío.</p>
          )}

          {cart.map(({ product, quantity }) => (
            <Fragment key={product.id}>
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-teal-500  last:border-0">
                {/* Imagen */}
                <div className="col-span-12 sm:col-span-2 flex items-center justify-center">
                  {product.media?.[0] ? (
                    <Image
                      src={product.media[0].url}
                      alt={product.name ?? "producto"}
                      width={80}
                      height={80}
                      className="rounded"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-slate-200 rounded" />
                  )}
                </div>

                {/* Nombre y descripción */}
                <div className="col-span-12 sm:col-span-5 flex flex-col justify-center">
                  <h3 className="font-medium text-slate-800 leading-tight">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.category_id && categories[product.category_id] && (
                      <span className="inline-flex items-center text-xs px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full border border-teal-100">
                        {categories[product.category_id].name}
                      </span>
                    )}
                    {product.brand && (
                      <span className="inline-flex items-center text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                        {product.brand}
                      </span>
                    )}
                    {stockWarnings[product.id] && (
                      <span className="inline-flex items-center text-xs px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full border border-amber-100">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {stockWarnings[product.id]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Cantidad */}
                <div className="col-span-6 sm:col-span-2 flex items-center justify-center">
                  <select
                    value={quantity}
                    onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                    className="border border-slate-600 rounded px-2 py-1 text-sm text-slate-800"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Precio */}
                <div className="col-span-6 sm:col-span-2 flex flex-col items-center justify-center">
                  {product.discount_percentage && product.discount_percentage > 0 ? (
                    <>
                      <span className="font-medium text-slate-800">
                        ₡{((product.price || 0) * (1 - (product.discount_percentage / 100))).toFixed(0)}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        ₡{(product.price || 0).toFixed(0)}
                      </span>
                      <span className="text-xs bg-red-100 text-red-700 px-1 py-0.5 rounded">
                        {product.discount_percentage}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="font-medium text-slate-800">
                      ₡{(product.price ?? 0).toFixed(0)}
                    </span>
                  )}
                </div>

                {/* Eliminar */}
                <div className="col-span-12 sm:col-span-1 flex items-center justify-center sm:justify-end">
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-teal-700 text-sm hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </Fragment>
          ))}
        </div>

        {/* Cupón & Totales */}
        {cart.length > 0 && (
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cupón */}
            <div className="lg:col-span-2  p-6 rounded shadow-md">
              <h2 className="text-lg font-medium mb-4 text-slate-800">¿Descuento o promoción?</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="CÓDIGO DE CUPÓN"
                  className="flex-1 border border-gray-600 rounded px-4 py-2 text-sm placeholder-gray-500 text-gray-950"
                />
                <button className="px-6 py-2 rounded bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium shadow">
                  ACTUALIZACIÓN
                </button>
              </div>
            </div>

            {/* Resumen */}
            <div className="p-6 rounded shadow-md space-y-4">
              <h2 className="text-lg font-medium text-slate-800 mb-2">Resumen del pedido</h2>
              <div className="flex justify-between text-sm text-slate-700">
                <span>Total del artículo ({cart.length} artículo{cart.length !== 1 && "s"})</span>
                <span>₡ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-700">
                <span>Envío</span>
                <span>₡ {shipping.toFixed(2)}</span>
              </div>
              <hr className="border-slate-300" />
              <div className="flex justify-between font-semibold text-base text-slate-800">
                <span>Total del pedido:</span>
                <span>₡ {total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-slate-500">Nota: se te cobrará en CRC para ₡ {total.toFixed(2)}</p>
              <button
                onClick={async () => {
                  if (!isLoggedIn) {
                    // If not logged in, redirect to login page with return URL
                    router.push(`/login?redirect=${encodeURIComponent('/checkout')}`);
                    return;
                  }
                  
                  // Check for inventory issues before proceeding to checkout
                  if (Object.keys(stockWarnings).length > 0) {
                    alert('Por favor, revise las advertencias de stock antes de continuar.');
                    return;
                  }
                  
                  // Proceed to checkout
                  router.push('/checkout');
                }}
                className="w-full py-3 rounded bg-teal-600 hover:bg-teal-700 text-white font-semibold text-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>{isLoggedIn ? 'COMPRAR' : 'INICIAR SESIÓN PARA COMPRAR'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <div className="flex justify-center gap-2 mt-2">
                {/* {[
                  "visa.svg",
                  "mastercard.svg",
                  "amex.svg",
                  "discover.svg",
                  "paypal.svg",
                ].map((icon) => (
                  <Image key={icon} src={`/payments/${icon}`} alt={icon} width={40} height={24} />
                ))} */}
                <FaCcVisa className="h-10 w-10 text-gray-900" />
                <FaCcMastercard className="h-10 w-10 text-gray-900" />
                <FaCcAmex className="h-10 w-10 text-gray-900" />
                <FaCcDiscover className="h-10 w-10 text-gray-900" />
                <FaCcPaypal className="h-10 w-10 text-gray-900" />
              </div>
            </div>
          </div>
        )}
        {/* Otros productos */}
        {relatedProducts.length > 0 && (
          <div className="mt-6 rounded-md overflow-hidden shadow-md">
            {/* Encabezado */}
            <div className="px-4 py-2 bg-teal-600 text-white text-sm font-semibold">
              Otros productos
            </div>

            {/* Grid de productos relacionados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
              {isLoading ? (
                <div className=" text-center p-2 flex flex-col items-center justify-center">Cargando productos relacionados...</div>
              ) : (
                relatedProducts.map((product) => (
                  <ProductCardModal key={product.id} product={product} activeExpandButton={true} />
                ))
              )}
            </div>
          </div>
        )}
        <GalleryModal />
      </div>
    </section>
  );
}
