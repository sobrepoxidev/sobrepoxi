import { NextRequest, NextResponse } from "next/server";
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
    await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify({ subject: '¡Gracias por tu compra en HANDMADE ART!', html: emailHtml, to: userEmail }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    // Enviar también una copia a la empresa
    await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify({ subject: `Nuevo pedido #${orderId} - HANDMADE ART`, html: emailHtml, to: COMPANY_EMAIL }),
      headers: { 'Content-Type': 'application/json' },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return NextResponse.json(
      { error: "Error al enviar el correo de confirmación" },
      { status: 500 }
    );
  }
}
