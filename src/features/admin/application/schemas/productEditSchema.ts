import { z } from 'zod';

export const productEditSchema = z.object({
  name: z.string().nullable().optional(),
  name_es: z.string().nullable().optional(),
  name_en: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  colon_price: z.number().min(0).nullable().optional(),
  dolar_price: z.number().min(0).nullable().optional(),
  category_id: z.number().int().positive().nullable().optional(),
  sku: z.string().nullable().optional(),
  brand: z.string().nullable().optional(),
  is_featured: z.boolean().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  discount_percentage: z.number().min(0).max(100).nullable().optional(),
  tags: z.array(z.string()).nullable().optional(),
});

export type ProductEditInput = z.infer<typeof productEditSchema>;
