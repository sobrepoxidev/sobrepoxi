export type Database = {
    products: {
        id: number;
        created_at: string;
        name: string | null;
        description: string | null;
        category: string | null;
        media: any[] | null;
        price: number | null;
    }
}