'use client'
import { AuthProvider } from '@/features/auth'

export default function SessionLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}