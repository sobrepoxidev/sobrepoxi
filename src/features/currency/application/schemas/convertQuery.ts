import { z } from "zod";

export const convertQuerySchema = z.object({
  amount: z.number().min(0.01).max(1_000_000),
  to: z.enum(["CRC", "EUR"]),
});

export type ConvertQuery = z.infer<typeof convertQuerySchema>;
