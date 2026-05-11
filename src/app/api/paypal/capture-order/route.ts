// app/api/paypal/capture-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/shared/supabase/server";
import { getPaypalAccessToken, capturePaypalOrder } from "../paypalHelpers";
import { z } from "zod";

const captureOrderSchema = z.object({
  paypalOrderId: z.string().min(1),
  orderId: z.number().int().positive(),
});

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = captureOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const { paypalOrderId, orderId } = parsed.data;

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("user_id")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.user_id !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const accessToken = await getPaypalAccessToken();
    const captureResult = await capturePaypalOrder({
      accessToken,
      paypalOrderId
    });

    if (captureResult.status !== "COMPLETED") {
      return NextResponse.json({ status: "FAILED" }, { status: 400 });
    }

    const { error: updateOrderError } = await supabase
      .from("orders")
      .update({
        payment_status: "paid",
        payment_reference: paypalOrderId
      })
      .eq("id", orderId)
      .select();

    if (updateOrderError) {
      console.error("Error updating order:", updateOrderError);
      return NextResponse.json({ error: "Error updating order" }, { status: 500 });
    }

    const { count, error: checkTableError } = await supabase
      .from('user_tickets')
      .select('*', { count: 'exact', head: true })
      .eq('order_id', orderId);

    if (!checkTableError && count && count > 0) {
      const { error: updateTicketsError } = await supabase
        .from("user_tickets")
        .update({
          is_locked: true,
          purchase_date: new Date()
        })
        .eq("order_id", orderId);

      if (updateTicketsError) {
        console.log('Continuing despite ticket update error');
      }
    }

    return NextResponse.json({ status: "COMPLETED" }, { status: 200 });
  } catch (err: unknown) {
    console.error("Error in capture-order route:", err);
    const message = err instanceof Error ? err.message : 'Unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
