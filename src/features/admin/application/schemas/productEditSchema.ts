import { z } from 'zod';

const mediaItemSchema = z.object({
  url: z.string().url(),
  type: z.enum(['image', 'video']),
  caption: z.string().optional(),
});

export const productEditSchema = z.object({
  name: z.string().nullable().optional(),
  name_es: z.string().nullable().optional(),
  name_en: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  description_es: z.string().nullable().optional(),
  description_en: z.string().nullable().optional(),
  media: z.array(mediaItemSchema).nullable().optional(),
  colon_price: z.number().min(0).nullable().optional(),
  dolar_price: z.number().min(0).nullable().optional(),
  category_id: z.number().int().positive().nullable().optional(),
  sku: z.string().nullable().optional(),
  brand: z.string().nullable().optional(),
  is_featured: z.boolean().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  discount_percentage: z.number().min(0).max(100).nullable().optional(),
  tags: z.array(z.string()).nullable().optional(),
  specifications: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).nullable().optional(),
});

export type ProductEditInput = z.infer<typeof productEditSchema>;
