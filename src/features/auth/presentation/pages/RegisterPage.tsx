'use client'

import { AuthProvider, RegisterClient } from '@/features/auth'

export default function RegisterPage() {
  return (
    <AuthProvider>
      <RegisterClient />
    </AuthProvider>
  )
}
