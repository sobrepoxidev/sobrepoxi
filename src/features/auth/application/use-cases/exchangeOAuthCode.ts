import { createServerSupabaseClient } from '@/shared/supabase/server';
import { logger } from '@/shared/observability/logger';
import { oauthCallbackSchema } from '../schemas/oauthCallbackSchema';

export async function exchangeOAuthCode(input: unknown) {
  const parsed = oauthCallbackSchema.safeParse(input);
  if (!parsed.success) {
    return { session: null, error: 'invalid_input' as const };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.exchangeCodeForSession(parsed.data.code);
  if (error) {
    logger.error('[auth.exchangeOAuthCode]', { error });
    return { session: null, error: 'oauth_failed' as const };
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { session, error: null };
}
