interface MediaItem {
    url: string;
    type: "image" | "video";
    caption?: string;
}

export type Database = {
    products: {
        id: number;
        created_at: string;
        name: string | null;
        description: string | null;
        category: string | null;
        media: MediaItem[] | null;
        price: number | null;
    }
}