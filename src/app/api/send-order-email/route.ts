export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { generateOrderConfirmationEmail } from "@/lib/orderConfirmationEmail";
import { createServerSupabaseClient } from "@/shared/supabase/server";

const COMPANY_EMAIL = "sobrepoxidev@gmail.com";

const shippingAddressSchema = z.object({
  name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postal_code: z.string(),
  phone: z.string(),
});

const discountInfoSchema = z
  .object({
    code: z.string(),
    discountAmount: z.number(),
    description: z.string().optional(),
  })
  .nullable()
  .optional();

const sendOrderEmailSchema = z.object({
  orderId: z.number().int().positive(),
  customerName: z.string().min(1),
  shippingAddress: shippingAddressSchema,
  // El render confía en CartItem[]; validamos que sea un array no vacío y dejamos
  // pasar la estructura interna (Product es muy ancho para revalidar aquí).
  items: z.array(z.unknown()).min(1),
  subtotal: z.number(),
  shipping: z.number(),
  total: z.number(),
  paymentMethod: z.string().min(1),
  discountInfo: discountInfoSchema,
  userEmail: z.string().email(),
});

function getAllowedOrigins(req: NextRequest): Set<string> {
  const allowed = new Set<string>();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    try {
      allowed.add(new URL(siteUrl).origin);
    } catch {
      // invalid env value, fallback to host header
    }
  }
  const host = req.headers.get("host");
  if (host) {
    const proto = req.headers.get("x-forwarded-proto") || "https";
    allowed.add(`${proto}://${host}`);
  }
  return allowed;
}

function isSameOrigin(req: NextRequest): boolean {
  const allowed = getAllowedOrigins(req);
  const origin = req.headers.get("origin");
  if (origin && allowed.has(origin)) return true;
  const referer = req.headers.get("referer");
  if (referer) {
    try {
      if (allowed.has(new URL(referer).origin)) return true;
    } catch {
      // invalid referer URL
    }
  }
  return false;
}

async function sendMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: `"SobrePoxi" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isSameOrigin(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = sendOrderEmailSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const data = parsed.data;

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("user_id")
      .eq("id", data.orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    if (order.user_id !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    console.log(
      JSON.stringify({
        event: "send-order-email-call",
        timestamp: new Date().toISOString(),
        origin: request.headers.get("origin"),
        userId: session.user.id,
        to: data.userEmail,
        subject: `order-${data.orderId}`,
      })
    );

    const emailHtml = generateOrderConfirmationEmail({
      orderId: data.orderId,
      customerName: data.customerName,
      shippingAddress: data.shippingAddress,
      // CartItem[] estructural — el renderer maneja la forma interna.
      items: data.items as Parameters<typeof generateOrderConfirmationEmail>[0]["items"],
      subtotal: data.subtotal,
      shipping: data.shipping,
      total: data.total,
      paymentMethod: data.paymentMethod,
      discountInfo: data.discountInfo,
    });

    await sendMail({
      to: data.userEmail,
      subject: "¡Gracias por tu compra en SobrePoxi!",
      html: emailHtml,
    });
    await sendMail({
      to: COMPANY_EMAIL,
      subject: `Nuevo pedido #${data.orderId} - SobrePoxi`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[send-order-email] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
