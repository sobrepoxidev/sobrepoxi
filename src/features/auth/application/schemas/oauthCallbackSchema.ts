import { z } from 'zod';

export const oauthCallbackSchema = z.object({
  code: z.string().min(1),
  next: z.string().optional(),
});

export type OAuthCallbackInput = z.infer<typeof oauthCallbackSchema>;
