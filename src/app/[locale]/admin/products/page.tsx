import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/shared/supabase/server';
import AdminDashboard from '@/components/admin/AdminDashboard';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map(e => e.trim())
  .filter(Boolean);

export default async function AdminProductsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createServerSupabaseClient();
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    const returnUrl = encodeURIComponent(`/${locale}/admin/products`);
    redirect(`/${locale}/login?returnUrl=${returnUrl}`);
  }
  
  const userEmail = session.user?.email;
  
  if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
    redirect(`/${locale}`);
  }
  
  return <AdminDashboard locale={locale} />;
}
