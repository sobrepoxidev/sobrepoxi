// app/api/paypal/create-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient"; // Ajusta según tu proyecto
import { getPaypalAccessToken, createPaypalOrder } from "../paypalHelpers";

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json(); // orderId de tu BD
    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    // 1) Buscar la orden en Supabase para conocer el total
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !orderData) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // 2) Obtener token de PayPal
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

    return NextResponse.json({ paypalOrderId: paypalOrder.id }, { status: 200 });
  } catch (err: unknown) {
    console.error("Error createOrder route:", err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
