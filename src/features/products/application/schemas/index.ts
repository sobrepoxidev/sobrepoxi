import { z } from 'zod';

export const productIdSchema = z.number();

export const productSearchParamsSchema = z.object({
  query: z.string().optional(),
  categoryId: z.number().optional(),
  page: z.number().optional().default(1),
  pageSize: z.number().optional().default(12),
});