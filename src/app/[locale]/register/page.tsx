import type { Metadata } from 'next';

// Private / transactional page: keep it out of Google.
export const metadata: Metadata = { robots: { index: false, follow: false } };
export { default } from '@/features/auth/presentation/pages/RegisterPage'
