// app/api/paypal/create-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { getPaypalAccessToken, createPaypalOrder } from "../paypalHelpers";

// For debugging purposes - remove in production
const DEBUG = process.env.NODE_ENV !== 'production';

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json(); // orderId de tu BD
    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    if (DEBUG) {
      console.log(`Processing order ID: ${orderId}`);
    }

    // 1) Buscar la orden en Supabase para conocer el total
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError) {
      console.error('Supabase order fetch error:', orderError);
      return NextResponse.json({ error: `Order fetch error: ${orderError.message}` }, { status: 404 });
    }

    if (!orderData) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (DEBUG) {
      console.log(`Order found with total amount: ${orderData.total_amount}`);
    }

    // 2) Obtener token de PayPal
    try {
      const accessToken = await getPaypalAccessToken();
      
      // 3) Crear orden en PayPal, usando la data de la orden
      const paypalOrder = await createPaypalOrder({
        accessToken,
        // Convertir el monto a dólares y redondear a 2 decimales
        amount: Number((orderData.total_amount / 500).toFixed(2)),
        currency: "USD" // o la que manejes
      });

      if (!paypalOrder) {
        return NextResponse.json({ error: "Failed to create PayPal order" }, { status: 500 });
      }

      if (DEBUG) {
        console.log(`PayPal order created successfully with ID: ${paypalOrder.id}`);
      }

      return NextResponse.json({ paypalOrderId: paypalOrder.id }, { status: 200 });
    } catch (paypalError: unknown) {
      console.error('PayPal API error:', paypalError);
      return NextResponse.json({ 
        error: `PayPal API error: ${paypalError instanceof Error ? paypalError.message : 'Unknown error'}`,
        details: DEBUG ? paypalError : undefined
      }, { status: 500 });
    }
  } catch (err: unknown) {
    console.error("Error in create-order route:", err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
