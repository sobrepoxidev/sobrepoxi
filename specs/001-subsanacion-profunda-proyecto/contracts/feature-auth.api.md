# Contract: `features/auth`

Barrel: `src/features/auth/index.ts`

## Tipos

```ts
export type Session = ReturnType<typeof Auth.session>; // re-uso del tipo de Supabase
```

## Use cases

```ts
export function getCurrentSession(): Promise<Session | null>;
export function exchangeOAuthCode(code: string): Promise<Session | null>;
export function signOut(): Promise<void>;
export function requireSession(): Promise<Session>; // throws / redirect si no hay
```

## Componentes / providers

```ts
export { SupabaseProvider, useSupabase } from "./presentation/providers/SupabaseProvider";
export { SessionLayout } from "./presentation/SessionLayout";
```

## Schemas

```ts
export { oauthCallbackSchema } from "./application/schemas";
```

## Dependencias declaradas

- `@/shared/supabase` (clientes server/middleware/browser basados en `@supabase/ssr`).
- `@/shared/i18n` (para construir redirects con prefijo de locale).
