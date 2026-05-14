export type { AuthState, AuthCredentials, SignUpCredentials, OAuthCredentials, AuthResult, AuthError, AuthCallbackParams, Session, User } from './application/distribute'

export { signIn, signUp, signOut, getSession, getUser } from './application/use-cases/signIn'

export { useAuthState, useAuthActions } from './application/hooks'

export { AuthProvider, useAuth, useSupabase } from './presentation/providers/AuthProvider'
export { AuthStateContext, useAuthStateContext } from './presentation/state/AuthStateContext'

export { default as LoginClient } from './presentation/components/LoginClient'
export { default as RegisterClient } from './presentation/components/RegisterClient'
export { default as SessionLayout } from './presentation/components/SessionLayout'