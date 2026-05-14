'use client'

import { AuthProvider, LoginClient } from '@/features/auth'

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginClient />
    </AuthProvider>
  )
}
