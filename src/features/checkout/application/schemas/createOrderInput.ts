import { z } from 'zod';

export const createOrderInputSchema = z.object({
  orderId: z.number().int().positive(),
});

export type CreateOrderInput = z.infer<typeof createOrderInputSchema>;
