// app/api/paypal/create-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/shared/supabase/server";
import { getPaypalAccessToken, createPaypalOrder } from "../paypalHelpers";
import { logger } from "@/shared/observability/logger";
import { z } from "zod";

const createOrderSchema = z.object({
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
    const parsed = createOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const { orderId } = parsed.data;

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .select("user_id, total_amount")
      .eq("id", orderId)
      .single();

    if (orderError || !orderData) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (orderData.user_id !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
      const accessToken = await getPaypalAccessToken();
      const amountUSD = orderData.total_amount;

      const paypalOrder = await createPaypalOrder({
        accessToken,
        amount: amountUSD,
        currency: "USD"
      });

      return NextResponse.json({ paypalOrderId: paypalOrder.id }, { status: 200 });
    } catch (paypalError: unknown) {
      logger.error('PayPal API error:', { error: paypalError });
      const message = paypalError instanceof Error ? paypalError.message : 'Unknown error';
      return NextResponse.json({ error: `PayPal error: ${message}` }, { status: 500 });
    }
  } catch (err: unknown) {
    logger.error("Error in create-order route:", { error: err });
    const message = err instanceof Error ? err.message : 'Unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
