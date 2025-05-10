"use client";
import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useSupabase } from "@/app/supabase-provider/provider";
import { supabase } from "@/lib/supabaseClient";

// Use a hardcoded sandbox client ID for development
// In production, this should be replaced with your actual client ID from environment variables
const PAYPAL_CLIENT_ID = process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID
    : process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb';

interface PayPalCardMethodProps {
  createdOrderId: number;
  onPaymentSuccess: () => void;
  onPaymentError: (msg: string) => void;
}

export default function PayPalCardMethod({
    createdOrderId, 
    onPaymentSuccess,
    onPaymentError
}: PayPalCardMethodProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { clearCart } = useCart();
    const { session } = useSupabase();
    const userId = session?.user?.id || 'guest-user';
    
    // Log the client ID for debugging (remove in production)
    console.log('PayPal Client ID:', PAYPAL_CLIENT_ID ? 'Available' : 'Missing');

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            
            {loading && <p className="text-gray-600">Procesando...</p>}
            <PayPalScriptProvider
                options={{
                    clientId: PAYPAL_CLIENT_ID || 'sb',
                    currency: "USD",
                    intent: "capture"
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
                            onPaymentSuccess();
                            
                            // Redirect to confirmation page
                            router.push(`/order-confirmation/${createdOrderId}`);
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
    );
}