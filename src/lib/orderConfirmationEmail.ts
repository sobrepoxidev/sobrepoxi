import { CartItem } from '@/context/CartContext';

interface OrderEmailData {
  orderId: number;
  customerName: string;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    phone: string;
  };
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  discountInfo?: {
    code: string;
    discountAmount: number;
    description?: string;
  } | null;
}

export function generateOrderConfirmationEmail(data: OrderEmailData): string {
  const formatPrice = (price: number) => `₡${price.toLocaleString()}`;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          color: #B55327;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #b3d5c3;
        }
        .container {
          background-color: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .header {
          background-color: #b3d5c3;
          color: #B55327;
          text-align: center;
          padding: 24px;
          border-radius: 8px;
          margin-bottom: 24px;
        }
        .header img {
          max-width: 200px;
          margin-bottom: 16px;
        }
        .section {
          margin-bottom: 24px;
          padding: 16px;
          border-radius: 8px;
          background-color: #b3d5c3;
        }
        .section h2 {
          color: #B55327;
          margin-top: 0;
          font-size: 1.25rem;
          font-weight: 600;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0;
        }
        .items-table th,
        .items-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        .items-table th {
          background-color: #b3d5c3;
          color: #B55327;
        }
        .total-row {
          font-weight: bold;
          background-color: #f9fafb;
        }
        .discount-box {
          background-color: #b3d5c3;
          padding: 16px;
          border-radius: 8px;
          margin: 16px 0;
          border: 2px dashed #B55327;
        }
        .thank-you {
          text-align: center;
          margin-top: 32px;
          color: #B55327;
          font-size: 1.2em;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://handmade-art.vercel.app/logo.png" alt="HANDMADE ART Logo" />
          <h1>¡Gracias por tu compra!</h1>
          <p>Pedido #${data.orderId}</p>
        </div>

        <div class="section">
          <h2>Detalles del envío</h2>
          <p>
            <strong>Nombre:</strong> ${data.shippingAddress.name}<br>
            <strong>Dirección:</strong> ${data.shippingAddress.address}<br>
            <strong>Ciudad:</strong> ${data.shippingAddress.city}<br>
            <strong>Estado/Provincia:</strong> ${data.shippingAddress.state}<br>
            <strong>País:</strong> ${data.shippingAddress.country}<br>
            <strong>Código Postal:</strong> ${data.shippingAddress.postal_code}<br>
            <strong>Teléfono:</strong> ${data.shippingAddress.phone}
          </p>
        </div>

        <div class="section">
          <h2>Productos</h2>
          <table class="items-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${data.items.map(item => `
                <tr>
                  <td>${item.product.name}</td>
                  <td>${item.quantity}</td>
                  <td>${formatPrice(item.product.price || 0)}</td>
                  <td>${formatPrice((item.product.price || 0) * item.quantity)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="section">
          <h2>Resumen del pedido</h2>
          <p><strong>Subtotal:</strong> ${formatPrice(data.subtotal)}</p>
          <p><strong>Envío:</strong> ${formatPrice(data.shipping)}</p>
          ${data.discountInfo ? `
            <div class="discount-box">
              <h3>Descuento aplicado</h3>
              <p><strong>Código:</strong> ${data.discountInfo.code}</p>
              <p><strong>Descuento:</strong> ${formatPrice(data.discountInfo.discountAmount)}</p>
              ${data.discountInfo.description ? `<p>${data.discountInfo.description}</p>` : ''}
            </div>
          ` : ''}
          <p><strong>Total:</strong> ${formatPrice(data.total)}</p>
          <p><strong>Método de pago:</strong> ${data.paymentMethod === 'paypal' ? 'PayPal' : 'SINPE Móvil'}</p>
        </div>

        <div class="thank-you">
          <p>¡Gracias por confiar en HANDMADE ART!</p>
          <p>Recibirás actualizaciones sobre el estado de tu pedido.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
