import { getCurrentSession } from './getCurrentSession';

export async function requireSession() {
  const session = await getCurrentSession();
  if (!session) {
    throw new Error('unauthorized');
  }

  return session;
}
