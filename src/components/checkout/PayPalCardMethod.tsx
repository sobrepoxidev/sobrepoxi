"use client";
import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/app/supabase-provider/provider';
import { useCart, CartItem } from "@/context/CartContext";
import { supabase } from "@/lib/supabaseClient";
//importar process las variables de entorno explicitamente con dotenv


// Use a hardcoded sandbox client ID for development
// In production, this should be replaced with your actual client ID from environment variables
const PAYPAL_CLIENT_ID: string =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID ?? 'sb'
    : process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? 'sb';

if(PAYPAL_CLIENT_ID === 'sb') {
    console.error('PayPal client ID not found');
    
}



interface PayPalCardMethodProps {
    createdOrderId: number;
    onPaymentSuccess: () => void;
    onPaymentError: (msg: string) => void;
}

export default function PayPalCardMethod({
    createdOrderId,
    onPaymentSuccess,
    onPaymentError,
}: PayPalCardMethodProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { cart, clearCart } = useCart();
    const { session } = useSupabase();
    const userId = session?.user?.id || 'guest-user';

    // Tasa de conversión fija de PayPal
    useEffect(() => {
        console.log("PayPal client ID: ", PAYPAL_CLIENT_ID);
    }, []);


    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <div className="mb-3 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
                <p>Nota: Paypal aplica una tasa de conversión de 1 CRC = 0.0019128 USD</p>
                <p className="text-center mt-1 text-xs">Podrás elegir pagar en CRC o USD</p>
            </div>

            {loading && <p className="text-gray-600">Procesando...</p>}
            <div className="App">
                <PayPalScriptProvider
                options={{
                    clientId: PAYPAL_CLIENT_ID,
                    enableFunding: "paylater,venmo",
                    dataSdkIntegrationSource: "integrationbuilder_sc",
                    environment: process.env.NODE_ENV.toString() === 'production'.toString() ? 'production' : 'sandbox',
                    
                }}

                   
                >
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={async () => {
                            // Llamar a tu API para crear la orden en PayPal
                            setLoading(true);
                            const res = await fetch("/api/paypal/create-order", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ orderId: createdOrderId })
                            });
                            const data = await res.json();
                            setLoading(false);

                            if (data.error) {
                                onPaymentError(data.error);
                                throw new Error(data.error);
                            }
                            return data.paypalOrderId; // Devuelves el ID de la orden generada en PayPal
                        }}
                        onApprove={async (data) => {
                            // PayPal devolvió: data.orderID
                            const paypalOrderId = data.orderID;
                            setLoading(true);

                            // Capturar la orden en PayPal
                            const res = await fetch("/api/paypal/capture-order", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    paypalOrderId: paypalOrderId,
                                    orderId: createdOrderId
                                })
                            });
                            const result = await res.json();
                            setLoading(false);

                            if (result.status === "COMPLETED") {
                                // Clear cart items from cart_items table if logged in
                                if (userId && userId !== 'guest-user') {
                                    try {
                                        await supabase
                                            .from("cart_items")
                                            .delete()
                                            .eq("user_id", userId);
                                    } catch (error) {
                                        console.error("Error clearing cart items from database:", error);
                                    }
                                }

                                // Clear local cart
                                clearCart();

                                // Call the success callback
                                // Obtener detalles de la orden para el correo
                                const { data: orderDetails } = await supabase
                                    .from('orders')
                                    .select('*, order_items(*)')
                                    .eq('id', createdOrderId)
                                    .single();

                                if (orderDetails && session?.user?.email) {
                                    // Enviar correo de confirmación a través de la API
                                    await fetch('/api/send-order-email', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            orderId: createdOrderId,
                                            customerName: orderDetails.shipping_address.name,
                                            shippingAddress: orderDetails.shipping_address,
                                            items: cart,
                                            subtotal: cart.reduce((acc: number, item: CartItem) => acc + (item.product.price || 0) * item.quantity, 0),
                                            shipping: 3200,
                                            total: orderDetails.total_amount,
                                            paymentMethod: 'paypal',
                                            discountInfo: null,
                                            userEmail: session.user.email
                                        })
                                    });
                                }

                                // Limpiar localStorage
                                localStorage.removeItem('cartItems');
                                localStorage.removeItem('checkoutData');
                                localStorage.removeItem('discountInfo');

                                // Notificar éxito y redirigir
                                onPaymentSuccess();

                                // Redirigir a la página de confirmación
                                router.push(`/order-confirmation?order_id=${createdOrderId}`);
                            } else {
                                onPaymentError("La transacción no pudo completarse.");
                            }
                        }}
                        onCancel={async () => {

                            console.log("PayPal Order Canceled");

                        }}
                        onError={(err) => {
                            console.error("PayPal Error:", err);
                            onPaymentError("Ocurrió un error con PayPal.");
                        }}
                    />
                </PayPalScriptProvider>
            </div>


        </div>
    );
}