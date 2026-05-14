import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/shared/supabase/server';

export interface AdminSession {
  userId: string;
  email: string;
}

export function isAdminEmail(email: string): boolean {
  const adminEmails = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((candidate) => candidate.trim())
    .filter(Boolean);

  return adminEmails.includes(email);
}

export async function requireAdmin(locale: string, returnPath: string): Promise<AdminSession> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    const returnUrl = encodeURIComponent(returnPath);
    redirect(`/${locale}/login?returnUrl=${returnUrl}`);
  }

  const email = session.user.email;
  if (!email || !isAdminEmail(email)) {
    redirect(`/${locale}`);
  }

  return { userId: session.user.id, email };
}
