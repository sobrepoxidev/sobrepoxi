import { z } from 'zod';

export const capturePaypalInputSchema = z.object({
  paypalOrderId: z.string().min(1),
  orderId: z.number().int().positive(),
});

export type CapturePaypalInput = z.infer<typeof capturePaypalInputSchema>;
