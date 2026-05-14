"use server";

import { sendOrderEmailInputSchema, type SendOrderEmailInput } from "../schemas";
import { renderOrderConfirmationHtml } from "../templates/order-confirmation";
import { sendMail } from "../../infrastructure/transport/nodemailer.server";
import { createServerSupabaseClient } from "@/shared/supabase/server";
import { logger } from "@/shared/observability/logger";

const COMPANY_EMAIL = "info@sobrepoxi.com";

export async function sendOrderConfirmationEmail(
  input: SendOrderEmailInput
): Promise<{ success: boolean; error?: string }> {
  try {
    const parsed = sendOrderEmailInputSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: "Invalid input" };
    }

    const supabase = await createServerSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("user_id")
      .eq("id", parsed.data.orderId)
      .single();

    if (orderError || !order) {
      return { success: false, error: "Order not found" };
    }
    if (order.user_id !== session.user.id) {
      return { success: false, error: "Forbidden" };
    }

    const html = renderOrderConfirmationHtml(parsed.data);

    await Promise.all([
      sendMail({
        to: session.user.email!,
        subject: "Gracias por tu compra en SobrePoxi!",
        html,
      }),
      sendMail({
        to: COMPANY_EMAIL,
        subject: `Nuevo pedido #${parsed.data.orderId} - SobrePoxi`,
        html,
      }),
    ]);

    return { success: true };
  } catch (error) {
    logger.error("[sendOrderConfirmationEmail]", { error });
    return { success: false, error: "Internal error" };
  }
}
