import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
  phone: z.string().max(50).optional(),
});

export const sendOrderEmailInputSchema = z.object({
  orderId: z.number().int().positive(),
  customerName: z.string().min(1).max(200),
  shippingAddress: z.object({
    name: z.string().min(1).max(200),
    address: z.string().min(1).max(500),
    city: z.string().min(1).max(100),
    state: z.string().min(1).max(100),
    country: z.string().min(1).max(100),
    postal_code: z.string().min(1).max(20),
    phone: z.string().min(1).max(50),
  }),
  items: z.array(
    z.object({
      name: z.string().min(1).max(500),
      quantity: z.number().int().positive(),
      price: z.number().nonnegative(),
    })
  ),
  subtotal: z.number().nonnegative(),
  shipping: z.number().nonnegative(),
  total: z.number().nonnegative(),
  paymentMethod: z.enum(["paypal", "sinpe"]),
  discountInfo: z
    .object({
      code: z.string().min(1).max(100),
      discountAmount: z.number().nonnegative(),
      description: z.string().max(500).optional(),
    })
    .nullable()
    .optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type SendOrderEmailInput = z.infer<typeof sendOrderEmailInputSchema>;