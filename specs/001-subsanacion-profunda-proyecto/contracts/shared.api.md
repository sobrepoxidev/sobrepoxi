# Contract: `shared/*`

`shared` no tiene barrel global. Cada subárea expone su propia API estable.

## `shared/supabase`

```ts
// shared/supabase/server.ts
export function createServerSupabaseClient(): Promise<SupabaseClient<Database>>;

// shared/supabase/client.ts (browser)
export function createBrowserSupabaseClient(): SupabaseClient<Database>;

// shared/supabase/middleware.ts
export function createMiddlewareSupabaseClient(req: NextRequest, res: NextResponse): SupabaseClient<Database>;
```

Reglas:
- Todos basados en `@supabase/ssr`.
- `@supabase/auth-helpers-nextjs` se elimina del proyecto al cierre de la migración.
- El singleton `src/lib/supabaseClient.ts` se elimina.

## `shared/i18n`

```ts
export { routing, Link, redirect, usePathname, useRouter } from "./navigation";
export { default as request } from "./request";
```

## `shared/seo`

```ts
export { buildMetadata } from "./seoConfig";
export { renderProductStructuredData, renderBusinessStructuredData } from "./structuredData";
```

## `shared/ui`

```ts
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
export { ScrollToTopButton } from "./ScrollToTopButton";
export { LocaleSwitcher } from "./locale-switcher";
export { Carousel, CarouselClient, CarouselIndicators } from "./carousel";
export { Toaster } from "react-hot-toast"; // re-export por uniformidad
```

## `shared/types`

```ts
export type { Database } from "./database";
```

## `shared/utils`

```ts
export { cn } from "./cn";              // basado en clsx + tailwind-merge
export { formatCurrency } from "./formatCurrency";
```

## Reglas globales de `shared`

- NO importa de `@/features/*` ni de `@/app/*`.
- Cada subárea expone una API mínima; los detalles de implementación se mantienen privados.
- Si una utilidad necesita conocer una feature, no es shared: se relocaliza dentro de la feature owner.
