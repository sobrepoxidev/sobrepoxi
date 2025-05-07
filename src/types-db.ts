interface MediaItem {
    url: string;
    type: "image" | "video";
    caption?: string;
}

interface ShippingAddress {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
    phone?: string;
}

export type Database = {
    cart_items: {
        id: number;
        user_id: string; // UUID
        product_id: number;
        quantity: number;
        created_at: string;
        updated_at: string;
    },
    categories: {
        id: number;
        name: string;
        parent_id: number | null;
        created_at: string;
    },
    favorites: {
        id: number;
        user_id: string; // UUID
        product_id: number;
        created_at: string;
    },
    inventory: {
        id: number;
        product_id: number;
        quantity: number;
        updated_at: string;
    },
    newsletter_subscribers: {
        id: number;
        email: string;
        user_id: string | null; // Optional user association
        status: 'active' | 'unsubscribed';
        created_at: string;
        updated_at: string;
    },
    order_items: {
        id: number;
        order_id: number;
        product_id: number;
        quantity: number;
        price: number;
        created_at: string;
    },
    orders: {
        id: number;
        user_id: string; // UUID
        payment_method: string;
        payment_status: string;
        payment_reference: string | null;
        total_amount: number;
        created_at: string;
        updated_at: string;
        shipping_address: ShippingAddress | null;
        shipping_status: string | null;
        tracking_number: string | null;
        notes: string | null;
    },
    products: {
        id: number;
        created_at: string;
        name: string | null;
        description: string | null;
        media: MediaItem[] | null;
        price: number | null;
        category_id: number | null;
        sku: string | null;
        brand: string | null;
        is_featured: boolean | null;
        is_active: boolean | null;
        specifications: Record<string, string | number | boolean | null> | null;
        discount_percentage: number | null;
        tags: string[] | null;
    },
    reviews: {
        id: number;
        product_id: number;
        user_id: string; // UUID
        rating: number;
        comment: string | null;
        created_at: string;
        updated_at: string;
    },
    view_history: {
        id: number;
        user_id: string; // UUID
        product_id: number;
        viewed_at: string;
    }
}