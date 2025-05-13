import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/email";
import { generateOrderConfirmationEmail } from "@/lib/orderConfirmationEmail";

// Email de la empresa que siempre debe recibir notificación de pedidos
const COMPANY_EMAIL = "sobrepoxidev@gmail.com";

export async function POST(request: NextRequest) {
  try {
    const {
      orderId,
      customerName,
      shippingAddress,
      items,
      subtotal,
      shipping,
      total,
      paymentMethod,
      discountInfo,
      userEmail
    } = await request.json();

    if (!userEmail) {
      return NextResponse.json(
        { error: "Email del usuario es requerido" },
        { status: 400 }
      );
    }

    const emailData = {
      orderId,
      customerName,
      shippingAddress,
      items,
      subtotal,
      shipping,
      total,
      paymentMethod,
      discountInfo
    };

    // Generar el HTML del correo
    const emailHtml = generateOrderConfirmationEmail(emailData);
    
    // Enviar correo al cliente
    await sendMail('¡Gracias por tu compra en HANDMADE ART!', emailHtml, userEmail);
    
    // Enviar también una copia a la empresa
    await sendMail(`Nuevo pedido #${orderId} - HANDMADE ART`, emailHtml, COMPANY_EMAIL);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return NextResponse.json(
      { error: "Error al enviar el correo de confirmación" },
      { status: 500 }
    );
  }
}
