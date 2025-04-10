'use client'

import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

/**
 * CartPage – replica sencilla inspirada en la captura aportada.
 * Colores principales:
 *  - Secciones claras   -> #EFE9DB  (bg-[#EFE9DB])
 *  - Secciones acento   -> #E0D5BF  (bg-[#E0D5BF])
 *  - Botones primarios  -> bg-teal-500 / hover:bg-teal-600
 */

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const subtotal = cart.reduce((acc, item) => {
    const price = item.product.price ?? 0;
    return acc + price * item.quantity;
  }, 0);

  // En un caso real se calcularía dinámicamente
  const shipping = cart.length ? 3200 : 0;
  const total = subtotal + shipping;

  return (
    <section className="min-h-screen w-full bg-[#EFE9DB] py-10 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-semibold mb-4 text-slate-800">Carrito de compra</h1>
        <Link href="/shop" className="text-teal-700 hover:underline text-sm">
          Click aquí para seguir comprando
        </Link>

        {/* Tabla del carrito */}
        <div className="mt-6 rounded-md overflow-hidden shadow-md bg-[#E0D5BF]">
          {/* Encabezado dinámico */}
          <div className="px-4 py-2 bg-teal-500 text-white text-sm font-semibold">
            {cart.length === 1 ? "Tienes 1 artículo en el carrito" : `Tienes ${cart.length} artículos en el carrito`}
          </div>

          {cart.length === 0 && (
            <p className="p-6 text-center text-slate-600">Tu carrito está vacío.</p>
          )}

          {cart.map(({ product, quantity }) => (
            <Fragment key={product.id}>
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#d5c8ae] bg-[#EFE9DB] last:border-0">
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
                  {product.category && (
                    <span className="text-xs mt-1 text-slate-500">{product.category}</span>
                  )}
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
                <div className="col-span-6 sm:col-span-2 flex items-center justify-center font-medium text-slate-800">
                ₡ {(product.price ?? 0).toFixed(2)}
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
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cupón */}
            <div className="lg:col-span-2 bg-[#E0D5BF] p-6 rounded shadow-md">
              <h2 className="text-lg font-medium mb-4 text-slate-800">¿Descuento o vale regalo?</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="CÓDIGO DE CUPÓN"
                  className="flex-1 border border-slate-300 rounded px-4 py-2 text-sm placeholder-slate-400"
                />
                <button className="px-6 py-2 rounded bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium shadow">
                  ACTUALIZACIÓN
                </button>
              </div>
            </div>

            {/* Resumen */}
            <div className="bg-[#E0D5BF] p-6 rounded shadow-md space-y-4">
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
              <p className="text-xs text-slate-500">Nota: se te cobrará en EUR para € {total.toFixed(2)}</p>
              <button
                onClick={() => alert("Procesando compra…")}
                className="w-full py-3 rounded bg-teal-500 hover:bg-teal-600 text-white font-semibold text-lg transition-colors"
              >
                COMPRAR
              </button>
              <div className="flex justify-center gap-2 mt-2">
                {[
                  "visa.svg",
                  "mastercard.svg",
                  "amex.svg",
                  "discover.svg",
                  "paypal.svg",
                ].map((icon) => (
                  <Image key={icon} src={`/payments/${icon}`} alt={icon} width={40} height={24} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
