'use client'

import React, { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useSupabase } from "@/app/supabase-provider/provider";
import { Database } from "@/types-db";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaCcPaypal } from "react-icons/fa";
import toast from "react-hot-toast";
import { AlertTriangle, Share2 } from "lucide-react";
import RelatedProductsClient from "@/components/products/RelatedProductsClient";
import { useLocale } from "next-intl";
import { formatUSD } from "@/lib/formatCurrency";
import CurrencyConverterRow from "@/components/CurrencyConverterRow";

// Tipo para la información de descuento basado en la tabla discount_codes
// ──────────────────── Share Cart Button ─────────────────────
const ShareCartButton: React.FC<{ locale: string }> = ({ locale }) => {
  const handleShare = async () => {
    const url = window.location.href;
    const title = locale === 'es' ? 'Mira mi carrito en Handmade Art' : 'Check out my cart on Handmade Art';
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success(locale === 'es' ? 'Enlace copiado al portapapeles' : 'Link copied to clipboard');
      }
    } catch (err) {
      console.error('Share error:', err);
    }
  };
  return (
    <button onClick={handleShare} className="inline-flex items-center gap-1 text-gray-300 hover:text-gray-400 underline text-sm cursor-pointer">
      <Share2 className="w-4 h-4" />
      {locale === 'es' ? 'Compartir carrito' : 'Share cart'}
    </button>
  );
};

// ───────────────────────────────────────────────────────────────

type DiscountInfo = {
  valid: boolean;
  discountAmount: number;
  finalTotal: number;
  code: string;
  description?: string;
  discount_type: Database['discount_codes']['discount_type'];
  discount_value: number;
};



/**
 * CartPage – replica sencilla inspirada en la captura aportada.
 * Colores principales:
 *  - Secciones claras   -> #EFE9DB  (bg-[#EFE9DB])
 *  - Secciones acento   -> #E0D5BF  (bg-[#E0D5BF])
 *  - Botones primarios  -> bg-teal-500 / hover:bg-teal-600
 */

export default function CartPage() {
  const locale = useLocale();
  const router = useRouter();
  const { session, supabase } = useSupabase();

  // Estado local para el estado de la sesión
  const [currentSession, setCurrentSession] = useState(session);

  // Actualizar el estado local cuando cambia la sesión
  useEffect(() => {
    setCurrentSession(session);

    // Configurar un listener para cambios en la sesión
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setCurrentSession(newSession);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [session, supabase.auth]);

  console.log("currentSession:", currentSession);
  const userId = currentSession?.user?.id || null;
  const correo = currentSession?.user?.email;
  console.log("userId:", userId);
  console.log("correo:", correo);
  const { cart, updateQuantity, removeFromCart, syncCartWithDB } = useCart();




  const [stockWarnings,] = useState<{ [key: number]: string }>({});
  // Estado para el código de descuento
  const [discountCode, setDiscountCode] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [discountInfo, setDiscountInfo] = useState<DiscountInfo | null>(null);
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);

  // Calculate the total price with discounts applied
  const subtotal = cart.reduce((acc, item) => {
    if (!item.product.dolar_price) return acc;

    const price = item.product.dolar_price;
    const discount = item.product.discount_percentage || 0;
    const finalPrice = price * (1 - (discount / 100));

    return acc + finalPrice * item.quantity;
  }, 0);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
      syncCartWithDB();
    }
  }, [cart, syncCartWithDB, userId]);

  // En un caso real se calcularía dinámicamente
  const shipping = cart.length ? 6.99 : 0;

  // Calcular el total final teniendo en cuenta posibles descuentos
  const total = discountInfo ? discountInfo.finalTotal : subtotal + shipping;

  // Related-products logic has been moved to RelatedProductsClient; legacy code kept for reference but disabled
  // Legacy categories fetch (disabled)
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //       if (!cart.length) return;

  //       // Fetch all category_ids from cart products
  //       const categoryIds = [...new Set(
  //         cart
  //           .map(item => item.product.category_id)
  //           .filter(id => id !== null && id !== undefined)
  //       )] as number[];

  //       // Fetch categories
  //       if (categoryIds.length > 0) {
  //         const { data: categoriesData } = await supabase
  //           .from('categories')
  //           .select('*')
  //           .in('id', categoryIds);

  //         if (categoriesData) {
  //           const categoriesMap: {[key: number]: Category} = {};
  //           categoriesData.forEach(category => {
  //             categoriesMap[category.id] = category;
  //           });
  //           setCategories(categoriesMap);
  //         }
  //       }
  //     };

  //     fetchCategories();
  //   }, [cart]);

  // Legacy related products fetch (disabled)
  // useEffect(() => {
  //   const fetchRelatedProducts = async () => {
  //       if (!cart.length) return;

  //       setIsLoading(true);

  //       try {
  //         // Extract category IDs from cart items (avoiding duplicates)
  //         const categoryIdsInCart = [...new Set(
  //           cart
  //             .map(item => item.product.category_id)
  //             .filter(id => id !== undefined && id !== null)
  //         )];

  //         // Extract product IDs from cart items to exclude them from results
  //         const productIdsInCart = cart.map(item => item.product.id);

  //         if (categoryIdsInCart.length === 0) {
  //           console.log('No categories found in cart');
  //           setIsLoading(false);
  //           setRelatedProducts([]);
  //           return;
  //         }

  //         // Ensure we have valid product IDs for the not-in filter
  //         // If cart is empty, provide a dummy ID to avoid query issues
  //         const validProductIds = productIdsInCart.length > 0 ? productIdsInCart : [-1];

  //         // Build query in steps to avoid potential issues
  //         let query = supabase
  //           .from('products')
  //           .select('*')
  //           .in('category_id', categoryIdsInCart)
  //           .eq('is_active', true);

  //         // Only apply the not-in filter if we have products in cart
  //         if (validProductIds.length > 0) {
  //           // Use individual not-equals filters to avoid parser issues
  //           query = query.not('id', 'eq', validProductIds[0]);
  //           for (let i = 1; i < validProductIds.length; i++) {
  //             query = query.not('id', 'eq', validProductIds[i]);
  //           }
  //         }

  //         // Complete the query
  //         const { data, error } = await query
  //           .order('created_at', { ascending: false })
  //           .limit(4);

  //         if (error) {
  //           console.error('Error fetching related products:', error.message);
  //           throw error;
  //         }

  //         // Ensure we always set a valid array
  //         setRelatedProducts(data || []);
  //       } catch (err) {
  //         console.error('Error in fetchRelatedProducts:', err instanceof Error ? err.message : JSON.stringify(err));
  //         // Set empty array on error to prevent UI issues
  //         setRelatedProducts([]);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     fetchRelatedProducts();
  //   }, [cart]);

  return (
    <section className="min-h-screen w-full  py-8 px-4 md:px-12 lg:px-24 bg-[#121212]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-semibold mb-4 gold-gradient-bright">{locale === 'es' ? 'Carrito de compra' : 'Shopping cart'}</h1>
        <div className="flex items-center gap-4 max-sm:gap-2">
          <Link href="/products" className="text-gray-300 hover:text-gray-400 underline text-sm">
            {locale === 'es' ? 'Seguir comprando' : 'Continue shopping'}
          </Link>
          <ShareCartButton locale={locale} />
        </div>

        {/* Tabla del carrito */}
        <div className="mt-6 rounded-md overflow-hidden shadow-md bg-[#303030]">
          {/* Encabezado dinámico */}
          <div className="px-4 py-2 bg-gold-gradient text-white text-sm font-semibold">
            {cart.length === 1 ? locale === 'es' ? "Tienes 1 artículo en el carrito" : "You have 1 item in your cart" : `Tienes ${cart.length} artículos en el carrito`}
          </div>

          {cart.length === 0 && (
            <p className="p-6 text-center text-slate-600">{locale === 'es' ? 'Tu carrito está vacío.' : 'Your cart is empty.'}</p>
          )}

          {cart.map(({ product, quantity }) => (
            <Fragment key={product.id}>
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#121212] last:border-0">
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
                    <div className="w-20 h-20 bg-[#121212] rounded" />
                  )}
                </div>

                {/* Nombre y descripción */}
                <div className="col-span-12 sm:col-span-5 flex flex-col justify-center">
                  <h3 className="font-medium text-white leading-tight">
                    {locale === 'es' ? product.name_es : product.name_en}
                  </h3>
                  {product.description && (
                    <p className="text-sm text-gray-300 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1 mt-1">

                    {product.brand && (
                      <span className="inline-flex items-center text-xs px-2 py-0.5 gold-gradient rounded-full border border-[#d2a857]">
                        {product.brand}
                      </span>
                    )}
                    {stockWarnings[product.id] && (
                      <span className="inline-flex items-center text-xs px-2 py-0.5 gold-gradient rounded-full border border-[#d2a857]">
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
                    className="border border-gray-400 rounded px-2 py-1 text-sm text-gray-300 bg-[#121212]"
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
                      <span className="font-medium text-gray-200">
                        {formatUSD(((product.dolar_price || 0) * (1 - (product.discount_percentage / 100))).toFixed(0))}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        {formatUSD(product.dolar_price || 0)}
                      </span>
                      <span className="text-xs bg-red-100 text-red-700 px-0.5 py-0.5 rounded">
                        {product.discount_percentage}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="font-medium text-gray-200">
                      {formatUSD(product.dolar_price ?? 0)}
                    </span>
                  )}
                </div>

                {/* Eliminar */}
                <div className="col-span-12 sm:col-span-1 flex items-center justify-center sm:justify-end">
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-gray-300 text-sm hover:underline"
                  >
                    {locale === 'es' ? 'Eliminar' : 'Remove'}
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
              <h2 className="text-lg font-medium mb-4 text-gray-300">{locale === 'es' ? '¿Descuento o promoción?' : 'Discount or promotion?'}</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    placeholder={locale === 'es' ? 'CÓDIGO DE CUPÓN' : 'DISCOUNT CODE'}
                    className={`flex-1 border ${discountError ? 'border-red-500' : 'border-gray-600'} rounded px-4 py-2 text-sm placeholder-gray-500 text-gray-300`}
                    value={discountCode}
                    onChange={(e) => {
                      setDiscountCode(e.target.value);
                      if (discountError) setDiscountError('');
                    }}
                  />
                  <button
                    className={`px-6 py-2 rounded ${discountInfo ? 'bg-red-500 hover:bg-red-600' : 'bg-gold-gradient-90 hover:bg-teal-700'} text-white text-sm font-medium shadow flex items-center justify-center`}
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (discountInfo) {
                        // Si ya hay un descuento aplicado, lo eliminamos
                        setDiscountInfo(null);
                        setDiscountCode('');
                        // Eliminar de localStorage
                        localStorage.removeItem('discountInfo');
                        return;
                      }

                      if (!discountCode.trim()) {
                        setDiscountError(locale === 'es' ? 'Ingresa un código de descuento' : 'Enter a discount code');
                        return;
                      }

                      setIsApplyingDiscount(true);
                      try {
                        // Validar el código de descuento directamente con Supabase
                        const { data, error } = await supabase
                          .from("discount_codes")
                          .select("*")
                          .eq("code", discountCode.toLowerCase())
                          .eq("is_active", true)
                          .single();

                        if (error || !data) {
                          setDiscountError(locale === 'es' ? 'Código de descuento inválido o expirado' : 'Invalid or expired discount code');
                          setIsApplyingDiscount(false);
                          return;
                        }

                        // Verificar si el código ha alcanzado el máximo de usos
                        if (data.max_uses !== null && data.current_uses >= data.max_uses) {
                          setDiscountError(locale === 'es' ? 'Este código ha alcanzado el máximo de usos permitidos' : 'This code has reached the maximum number of uses allowed');
                          setIsApplyingDiscount(false);
                          return;
                        }

                        // Verificar si el código está dentro del período de validez
                        const now = new Date();
                        if (data.valid_until && new Date(data.valid_until) < now) {
                          setDiscountError(locale === 'es' ? 'Este código ha expirado' : 'This code has expired');
                          setIsApplyingDiscount(false);
                          return;
                        }

                        // Verificar monto mínimo de compra
                        const cartTotal = subtotal + shipping;
                        if (cartTotal < data.min_purchase_amount) {
                          setDiscountError(locale === 'es' ? `El monto mínimo de compra para este código es ${formatUSD(data.min_purchase_amount)}` : `The minimum purchase amount for this code is ${formatUSD(data.min_purchase_amount)}`);
                          setIsApplyingDiscount(false);
                          return;
                        }

                        // Calcular el descuento según el tipo
                        let discountAmount = 0;
                        let finalTotal = cartTotal;

                        switch (data.discount_type) {
                          case 'percentage':
                            discountAmount = (cartTotal * data.discount_value) / 100;
                            finalTotal = cartTotal - discountAmount;
                            break;
                          case 'fixed':
                            discountAmount = data.discount_value;
                            finalTotal = cartTotal - discountAmount;
                            if (finalTotal < 0) finalTotal = 0;
                            break;
                          case 'total_override':
                            finalTotal = data.discount_value;
                            discountAmount = cartTotal - finalTotal;
                            break;
                        }

                        // Aplicar el descuento
                        const discountData: DiscountInfo = {
                          valid: true,
                          discountAmount,
                          finalTotal,
                          code: data.code,
                          description: data.description,
                          discount_type: data.discount_type,
                          discount_value: data.discount_value
                        };

                        // Guardar en el estado
                        setDiscountInfo(discountData);

                        // Guardar en localStorage para que esté disponible en checkout
                        localStorage.setItem('discountInfo', JSON.stringify(discountData));

                      } catch (err) {
                        console.error(locale === 'es' ? 'Error al validar el código de descuento:' : 'Error validating discount code:', err);
                        setDiscountError(locale === 'es' ? 'Error al validar el código. Inténtalo de nuevo.' : 'Error validating code. Try again.');
                      } finally {
                        setIsApplyingDiscount(false);
                      }
                    }}
                    disabled={isApplyingDiscount}
                  >
                    {isApplyingDiscount ? (
                      <span className="animate-pulse">{locale === 'es' ? 'Validando...' : 'Validating...'}</span>
                    ) : discountInfo ? (
                      <span className="text-black">{locale === 'es' ? 'ELIMINAR CÓDIGO' : 'REMOVE CODE'}</span>
                    ) : (
                      <span className="text-gold-gradient hover:text-gray-600 cursor-pointer">{locale === 'es' ? 'APLICAR CÓDIGO' : 'APPLY CODE'}</span>
                    )}
                  </button>
                </div>
              </form>
              {discountError && (
                <p className="text-red-500 text-sm mt-2">{discountError}</p>
              )}
              {discountInfo && (
                <div className="mt-2 p-2 bg-[#303030] border border-[#d2a857] rounded-md">
                  <p className="gold-gradient text-sm font-bold">{locale === 'es' ? 'Código aplicado correctamente!' : 'Discount applied successfully!'}</p>
                  {discountInfo.description && (
                    <p className="text-sm text-gray-300">{discountInfo.description}</p>
                  )}
                </div>
              )}
            </div>

            {/* Resumen */}
            <div className="p-6 rounded shadow-md space-y-4">
              <h2 className="text-lg font-medium text-gray-200 mb-2">{locale === 'es' ? 'Resumen del pedido' : 'Order summary'}</h2>
              <div className="space-y-2 mb-6 text-gray-300">
                <div className="flex justify-between text-sm text-gray-200">
                  <span>{locale === 'es' ? 'Total del artículo' : 'Total of the article'} ({cart.length} artículo{cart.length !== 1 && "s"})</span>
                  <span>{formatUSD(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-200">
                  <span>{locale === 'es' ? 'Envío' : 'Shipping'}</span>
                  <span>{formatUSD(shipping)}</span>
                </div>
                {discountInfo && (
                  <div className="flex justify-between text-sm text-green-600 font-medium">
                    <span>{locale === 'es' ? 'Descuento' : 'Discount'} ({discountInfo.code})</span>
                    <span>- {formatUSD(discountInfo.discountAmount)}</span>
                  </div>
                )}
                <hr className="border-gray-300" />
                <div className="flex justify-between font-semibold text-base text-gray-200">
                  <span>{locale === 'es' ? 'Total del pedido' : 'Total of the order'}</span>
                  <span>{formatUSD(total)}</span>
                </div>
                {locale === 'es' ? <p>Conoce el valor en tu moneda:</p> : <p>Know the value in your currency:</p>}
                <CurrencyConverterRow amount={total} />
                <p className="text-xs text-slate-500">{locale === 'es' ? `Nota: se te cobrará en USD para ${formatUSD(total)}` : `Note: you will be charged in USD for ${formatUSD(total)}`}</p>
              </div>
              <button
                onClick={async () => {
                  if (currentSession === null) {
                    // If not logged in, redirect to login page with return URL
                    // Construimos la URL completa usando los hooks de Next.js
                    const fullPath = window.location.pathname + window.location.search;
                    router.push(`/login?returnUrl=${fullPath}`);
                    return;
                  }

                  // Check for inventory issues before proceeding to checkout
                  if (Object.keys(stockWarnings).length > 0) {
                    alert(locale === 'es' ? 'Por favor, revise las advertencias de stock antes de continuar.' : 'Please check the stock warnings before proceeding.');
                    return;
                  }

                  // Proceed to checkout
                  router.push('/checkout');
                }}
                className="w-full py-3 rounded bg-teal-600 hover:bg-teal-700 text-white font-semibold text-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>
                  {currentSession === null ? locale === 'es' ? 'INICIAR SESIÓN PARA COMPRAR' : 'SIGN IN TO BUY' : locale === 'es' ? 'COMPRAR' : 'BUY'}
                </span>
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
                <FaCcVisa className="h-10 w-10 text-gray-300" />
                <FaCcMastercard className="h-10 w-10 text-gray-300" />
                <FaCcAmex className="h-10 w-10 text-gray-300" />
                <FaCcDiscover className="h-10 w-10 text-gray-300" />
                <FaCcPaypal className="h-10 w-10 text-gray-300" />
              </div>
            </div>
          </div>
        )}


      </div>
      <RelatedProductsClient
        title={locale === 'es' ? 'Otros productos' : 'Other products'}
        locale={locale}
        excludeIds={cart.map((item) => item.product.id)}
      />
    </section>
  );
}
