interface MediaItem {
    url: string;
    type: "image" | "video";
    caption?: string;
}

/**
 * Tipos de datos para la base de datos de Supabase.
 *
 * - products: tabla de productos
 *   - id: identificador numérico
 *   - created_at: fecha y hora de creación
 *   - name: nombre del producto
 *   - description: descripción del producto
 *   - category: categoría del producto
 *   - media: array de objetos MediaItem (ver arriba)
 *   - price: precio del producto
 *
 * - orders: tabla de órdenes de compra
 *   - id: identificador numérico
 *   - user_id: identificador del usuario que realizó la orden
 *   - payment_method: método de pago
 *   - payment_status: estado del pago (pending, paid, etc.)
 *   - payment_reference: referencia del pago (si aplica)
 *   - total_amount: monto total de la orden
 *   - created_at: fecha y hora de creación                 
 *   - updated_at: fecha y hora de última actualización
 *
 * - order_items: tabla de items de las órdenes de compra
 *   - id: identificador numérico
 *   - order_id: identificador de la orden a la que pertenece
 *   - product_id: identificador del producto relacionado
 *   - quantity: cantidad del producto en la orden
 *   - price: precio unitario del producto en ese momento
 */
export type Database = {
    products: {
        id: number;
        created_at: string;
        name: string | null;
        description: string | null;
        category: string | null;
        media: MediaItem[] | null;
        price: number | null;
    },
    orders: {
        id: number;
        user_id: string;
        payment_method: string;
        payment_status: string;
        payment_reference: string | null;
        total_amount: number;
        created_at: string;
        updated_at: string;
      },
      order_items: {
        id: number;
        order_id: number; // referencia a orders.id
        product_id: number; // referencia a products.id
        quantity: number;
        price: number; // precio unitario en ese momento (por si cambia a futuro)
      }
}