// app/api/paypal/capture-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { getPaypalAccessToken, capturePaypalOrder } from "../paypalHelpers";

// For debugging purposes - remove in production
const DEBUG = process.env.NODE_ENV !== 'production';

export async function POST(request: NextRequest) {
  try {
    const { paypalOrderId, orderId } = await request.json();
    if (!paypalOrderId || !orderId) {
      return NextResponse.json({ error: "Missing arguments" }, { status: 400 });
    }

    if (DEBUG) {
      console.log(`Processing PayPal order capture: ${paypalOrderId} for order ID: ${orderId}`);
    }

    try {
      //1) Capturar la orden en PayPal
      const accessToken = await getPaypalAccessToken();
      const captureResult = await capturePaypalOrder({
        accessToken,
        paypalOrderId
      });

      if (DEBUG) {
        console.log('Capture result:', JSON.stringify(captureResult, null, 2));
      }

      //Evalúa si fue exitosa
      if (captureResult.status !== "COMPLETED") {
        return NextResponse.json({ 
          status: "FAILED", 
          details: DEBUG ? captureResult : undefined 
        }, { status: 400 });
      }

      // 2) Actualizar la orden en la BD a 'paid'
      const { data: orderData, error: updateOrderError } = await supabase
        .from("orders")
        .update({
          payment_status: "paid",
          payment_reference: paypalOrderId
        })
        .eq("id", orderId)
        .select();

      if (updateOrderError) {
        console.error("Error updating order:", updateOrderError);
        return NextResponse.json({ error: `Error updating order: ${updateOrderError.message}` }, { status: 500 });
      }

      if (DEBUG) {
        console.log(`Order ${orderId} updated successfully`);
      }

      // Check if user_tickets table exists before trying to update it
      const { count, error: checkTableError } = await supabase
        .from('user_tickets')
        .select('*', { count: 'exact', head: true })
        .eq('order_id', orderId);

      if (checkTableError) {
        console.log('user_tickets table may not exist or is empty for this order, skipping update');
      } else if (count && count > 0) {
        // 3) Marcar tickets de esa orden como is_locked = true (solo si existen)
        const { error: updateTicketsError } = await supabase
          .from("user_tickets")
          .update({
            is_locked: true,
            purchase_date: new Date()
          })
          .eq("order_id", orderId);

        if (updateTicketsError) {
          console.error("Error updating tickets:", updateTicketsError);
          // Don't fail the whole transaction if this fails
          console.log('Continuing despite ticket update error');
        }
      }

      return NextResponse.json({ status: "COMPLETED" }, { status: 200 });
    } catch (paypalError: unknown) {
      console.error('PayPal API error:', paypalError);
      const errorMessage = paypalError instanceof Error ? paypalError.message : 'Unknown PayPal error';
      return NextResponse.json({ 
        error: `PayPal API error: ${errorMessage}`,
        details: DEBUG ? paypalError : undefined
      }, { status: 500 });
    }
  } catch (err: unknown) {
    console.error("Error in capture-order route:", err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
