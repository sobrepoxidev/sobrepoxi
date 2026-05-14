# Contract: `features/auth`

Primary client-safe barrel: `src/features/auth/index.ts`

Server-only use cases live in `src/features/auth/application/use-cases/*` and are imported directly by Next route modules. They are intentionally not re-exported by the primary barrel because that barrel is consumed by client components such as `SessionLayout`, `LoginPage`, and `RegisterPage`.

## Types

```ts
export type { Session, User } from "./application/distribute";
```

## Client-safe public API

```ts
export { signIn, signUp, signOut, getSession, getUser } from "./application/use-cases/signIn";
export { AuthProvider, useAuth, useSupabase } from "./presentation/providers/AuthProvider";
export { SessionLayout } from "./presentation/components/SessionLayout";
export { LoginClient } from "./presentation/components/LoginClient";
export { RegisterClient } from "./presentation/components/RegisterClient";
export { oauthCallbackSchema } from "./application/schemas/oauthCallbackSchema";
```

## Server-only use cases

```ts
export function getCurrentSession(): Promise<Session | null>;
export function exchangeOAuthCode(input: unknown): Promise<{ session: Session | null; error: null | "invalid_input" | "oauth_failed" }>;
export function requireSession(): Promise<Session>;
export function signOut(): Promise<{ error: { message: string } | null }>;
```

## Rules

- Server-only use cases may import `@/shared/supabase/server`.
- Server-only use cases are not exported by `src/features/auth/index.ts`.
- Route handlers may import these use cases directly from `src/features/auth/application/use-cases/*`.
