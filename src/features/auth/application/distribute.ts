import type { Session, User } from '@supabase/supabase-js'

export interface AuthState {
  session: Session | null
  user: User | null
  loading: boolean
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface SignUpCredentials extends AuthCredentials {
  name?: string
  phone?: string
  receivePromotions?: boolean
  metadata?: Record<string, unknown>
}

export interface OAuthCredentials {
  provider: 'google'
  returnUrl?: string
}

export interface AuthResult {
  error: AuthError | null
}

export interface AuthError {
  message: string
  status?: number
}

export interface AuthCallbackParams {
  code: string
  next?: string
}

export type { Session, User }