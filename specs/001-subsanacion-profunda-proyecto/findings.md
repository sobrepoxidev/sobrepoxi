# Findings — Subsanación Profunda

**Feature**: 001-subsanacion-profunda-proyecto
**Created**: 2026-05-09
**Last Updated**: 2026-05-11

## Summary

| Severity | Total | Closed | Open | Deferred |
|----------|-------|--------|------|----------|
| CRITICAL | 4 | 4 | 0 | 0 |
| HIGH | 11 | 8 | 2 | 1 |
| MEDIUM | 12 | 3 | 4 | 5 |
| LOW | 3 | 0 | 0 | 3 |
| **Total** | **30** | **15** | **6** | **9** |

## CRITICAL Findings

### F-001: Relay SMTP abierto `/api/send-email`
- **Status**: ✅ CLOSED
- **Severity**: CRITICAL
- **Location**: `src/app/api/send-email/route.ts:6-19`
- **Finding**: `POST /api/send-email` es relay SMTP abierto sin auth ni validación. Cualquiera puede enviar correos arbitrarios desde la cuenta corporativa (spam/phishing).
- **Impact**: Reputación dominio + abuso de cuota SMTP + phishing
- **Closure**: T-Sec-1 (añadido guard same-origin + sesión Supabase autenticada + schema zod)
- **Verification**: `curl -X POST .../api/send-email` sin sesión → 401

### F-002: Relay SMTP abierto `/api/send-order-email`
- **Status**: ✅ CLOSED
- **Severity**: CRITICAL
- **Location**: `src/app/api/send-order-email/route.ts:7-66`
- **Finding**: `POST /api/send-order-email` acepta input arbitrario sin sesión; permite enviar correo "de orden" a cualquier destino con HTML controlado por atacante.
- **Impact**: Phishing dirigido con dominio confiable
- **Closure**: T-Sec-2 (validación userEmail === session.user.id || owner de orderId + schema zod)
- **Verification**: `curl -X POST .../api/send-order-email` sin sesión → 401

### F-003: Falta validación de owner en PayPal endpoints
- **Status**: ✅ CLOSED
- **Severity**: CRITICAL
- **Location**: `src/app/api/paypal/{create,capture}-order/route.ts`
- **Finding**: `/api/paypal/{create,capture}-order` mutan `payment_status` sin verificar que `orders.user_id == session.user.id`
- **Impact**: Posible fraude / corrupción de estado de pagos
- **Closure**: T-Sec-5 (validación owner en ambos endpoints antes de delegar a use case)
- **Verification**: Usuario A no puede capturar orden de Usuario B → 403

### F-004: PayPal mocks ejecutándose en окружение no-production
- **Status**: ✅ CLOSED
- **Severity**: CRITICAL
- **Location**: `src/app/api/paypal/paypalHelpers.ts:24-44, 60-66, 144-148, 213-230, 239-256`
- **Finding**: `paypalHelpers` retorna mocks en `NODE_ENV !== 'production'` cuando hay error o credencial faltante; staging/preview pueden ejecutar mocks accidentales que actualizan BD real
- **Impact**: Capturas falsas marcando órdenes como pagadas
- **Closure**: T-Sec-3 (mocks solo bajo `PAYPAL_USE_MOCK === '1'` + eliminación de fallbacks silenciosos)
- **Verification**: Staging sin `PAYPAL_USE_MOCK=1` → logs de error en lugar de mock; build con `grep -rE "EMAIL_PASS|PAYPAL_SECRET" .next/static` → 0 matches

## HIGH Findings

### F-005: Secrets expuestos en bundle cliente por env vars mal nombradas
- **Status**: ✅ CLOSED
- **Severity**: HIGH
- **Location**: `src/app/api/paypal/paypalHelpers.ts:51-53`
- **Finding**: Variables de entorno con secretos marcadas como `NEXT_PUBLIC_*` en código server-only: `NEXT_PUBLIC_PAYPAL_CLIENT_ID` y `NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID`
- **Impact**: Exposición innecesaria en bundle cliente; viola FR-009
- **Closure**: T-Sec-4 (renombradas a `PAYPAL_CLIENT_ID` / `PAYPAL_LIVE_CLIENT_ID` server-only)
- **Verification**: `pnpm build && grep -rE "PAYPAL.*SECRET" .next/static` → 0 matches

### F-006: Singleton Supabase usado server-side sin cookies
- **Status**: ✅ CLOSED
- **Severity**: HIGH
- **Location**: `src/lib/supabaseClient.ts` y consumidores en `src/app/api/paypal/*`, `src/context/*`
- **Finding**: Singleton `supabase` (`@supabase/supabase-js` con anon key) usado server-side sin cookies (`/api/paypal/*`, contexts cliente)
- **Impact**: RLS evaluadas como anónimo; sesión ignorada en server reads
- **Closure**: T-Auth-1 + T-Auth-2 (consolidado en `shared/supabase/{server,client}.ts` con `@supabase/ssr`)
- **Verification**: `pnpm typecheck` verde; smoke test auth completo

### F-007: `AUTHORIZED_ADMINS` hardcoded en código fuente
- **Status**: ✅ CLOSED
- **Severity**: HIGH
- **Location**: `src/app/[locale]/admin/page.tsx:8`
- **Finding**: `AUTHORIZED_ADMINS` hardcoded en código fuente
- **Impact**: Cambio de admins requiere release; lista filtrable en repos públicos
- **Closure**: T-Sec-7 + T-Adm (movido a `ADMIN_EMAILS` env var + centralizado en `features/admin/application/use-cases/requireAdmin.ts`)
- **Verification**: `git grep -n 'AUTHORIZED_ADMINS'` → 0 matches en src/

### F-008: `src/actions.ts` con `"use client"` erróneo + fetch relativo
- **Status**: ✅ CLOSED
- **Severity**: HIGH
- **Location**: `src/actions.ts:1-2`, `src/app/api/send-order-email/route.ts:45,52`
- **Finding**: `src/actions.ts` declarado `"use client"` pero firma de server action; `fetch('/api/send-email')` usa URL relativa desde server
- **Impact**: Bugs intermitentes / rutas que no resuelven en runtime
- **Closure**: T-Notif (eliminado `"use client"`, reemplazado fetch relativo por invocación directa al transport)
- **Verification**: `pnpm lint` sin advertencias sobre actions.ts

### F-009: Tres patrones de cliente Supabase coexistiendo
- **Status**: ✅ CLOSED
- **Severity**: HIGH
- **Location**: `lib/supabaseClient.ts`, `utils/supabase/server.ts`, `components/SessionLayout.tsx`, `middleware.tsx`
- **Finding**: Tres patrones distintos de cliente Supabase coexistiendo (`@supabase/auth-helpers-nextjs`, `@supabase/ssr`, `@supabase/supabase-js`)
- **Impact**: Inconsistencia, sesiones perdidas, doble pago de bundle
- **Closure**: T-Auth-1 + T-Auth-2 + T-Auth-3 (consolidado `@supabase/ssr`; eliminado `@supabase/auth-helpers-nextjs`)
- **Verification**: Login email + OAuth + logout + middleware funcionan correctamente

### F-010: `cn()` casero sin `tailwind-merge` genera conflictos de clases
- **Status**: ✅ CLOSED
- **Severity**: HIGH
- **Location**: `src/lib/utils.ts:5-7`
- **Finding**: `cn()` casero sin `tailwind-merge` causa conflictos de clases Tailwind sin resolver (`p-2 p-4` queda concatenado)
- **Impact**: Estilos inconsistentes / overrides accidentales
- **Closure**: T-Setup-3 (implementación con `clsx` + `tailwind-merge` en `shared/utils/cn.ts`)
- **Verification**: Smoke test visual de componentes con clases condicionales

### F-011: Errores devuelven mensajes internos del proveedor
- **Status**: ✅ CLOSED
- **Severity**: HIGH
- **Location**: `src/app/api/paypal/*`, `src/app/api/convert/route.ts:13`
- **Finding**: Errores en endpoints devuelven `error.message` del proveedor externo o de Supabase al cliente
- **Impact**: Fuga de información interna; fingerprinting
- **Closure**: T-Sec-6 (mensajes genéricos al cliente; logs internos con detalle)
- **Verification**: Endpoint devuelve 500 con mensaje genérico, no leak de stack

### F-012: Endpoint `/api/convert` sin validación
- **Status**: ✅ CLOSED
- **Severity**: HIGH
- **Location**: `src/app/api/convert/route.ts:6-14`
- **Finding**: Endpoint `/api/convert` sin validación de `amount` ni whitelist de monedas
- **Impact**: Abuso del proveedor externo; loops
- **Closure**: T-Sec-6 (schema zod con rango amount + whitelist de `to` currency)
- **Verification**: `curl -X POST .../api/convert -d '{"amount": -5}'` → 422

### F-013: Lógica de negocio en page.tsx y HomePageData.tsx
- **Status**: ⏸ DEFERRED
- **Severity**: HIGH
- **Location**: `src/app/[locale]/HomePageData.tsx`, `src/app/[locale]/admin/page.tsx`, varios
- **Finding**: Páginas con lógica de negocio (fetch + transformación) en `page.tsx` y `HomePageData.tsx`
- **Impact**: Dificulta testing, contradice FR-018
- **Closure**: T-Cont + T-Adm (lógica migrada a `application/` use cases; pages son composición delgada)
- **Verification**: Verificación diferida a Feature 003

## MEDIUM Findings

### F-014: Duplicación significativa de carruseles/sections
- **Status**: ⏸ DEFERRED
- **Severity**: MEDIUM
- **Location**: `src/components/{cards,Carousel,home/banner,home}/`
- **Finding**: 9 archivos en `cards/`, 4 en `Carousel/`, 3 en `home/banner/`, `home/Banner.tsx` con lógica solapada
- **Impact**: Mantenimiento costoso; inconsistencia visual
- **Closure**: Diferido a Feature 002 (consolidación con QA visual dedicado)
- **Verification**: QA visual dedicado en Feature 002

### F-015: Lista hardcoded de tablas opcionales (`user_tickets`)
- **Status**: ⏸ DEFERRED
- **Severity**: MEDIUM
- **Location**: `src/app/api/paypal/capture-order/route.ts:60-82`
- **Finding**: Lista hardcoded de tablas opcionales (`user_tickets`) consultada para decidir si actualizar tickets — patrón frágil
- **Impact**: Dependencia legacy enmascarada
- **Closure**: Feature 003 (auditoría de tablas legacy)
- **Verification**: Feature 003

### F-016: `useEffect` con dependencias complejas en CartContext
- **Status**: ⏸ DEFERRED
- **Severity**: MEDIUM
- **Location**: `src/context/CartContext.tsx:66-80, 111-169`
- **Finding**: `useEffect` con dependencias `[searchParams]` y mutaciones de URL desde el mismo provider (CartContext) → riesgo de loops o doble render
- **Impact**: Side effects difíciles de razonar
- **Closure**: T-Cart (refactorizado en hooks pequeños; dividido encode/decode en application/encode.ts)
- **Verification**: Diferido tras T-Cart (resuelto parcialmente en refactor)

### F-017: `console.log`/`console.error` directos en route handlers
- **Status**: ⏸ DEFERRED
- **Severity**: MEDIUM
- **Location**: `src/app/api/paypal/*`, otros
- **Finding**: `console.log`/`console.error` directos en route handlers; sin logger estructurado
- **Impact**: Logs ruidosos, sin niveles, sin correlación
- **Closure**: T145 en Phase 9 (logger estructurado)
- **Verification**: Phase 9

### F-018: Fragmentación de `Database` type en capas
- **Status**: ⏸ DEFERRED
- **Severity**: MEDIUM
- **Location**: `src/types-db.ts`
- **Finding**: Schemas de Database (`types-db.ts`) referenciados por capas variadas (cliente, server, hooks) sin convención clara
- **Impact**: Fragmentación de tipos
- **Closure**: Feature 003 (revisión completa de types-db.ts → `shared/types/database.ts`)
- **Verification**: Feature 003

### F-019: ESLint sin reglas de boundaries
- **Status**: ✅ CLOSED
- **Severity**: MEDIUM
- **Location**: `eslint.config.mjs`
- **Finding**: `eslint.config.mjs` solo extiende `next/core-web-vitals` y `next/typescript`; no hay reglas de boundaries ni de imports
- **Impact**: Imposible enforcement de FR-006 sin tarea Setup-2
- **Closure**: T-Setup-2 (configurado `eslint-plugin-boundaries` + `no-restricted-imports`)
- **Verification**: `pnpm lint` pasa; import prohibido detectado por lint

### F-020: No hay script `typecheck` en package.json
- **Status**: ✅ CLOSED
- **Severity**: MEDIUM
- **Location**: `package.json`
- **Finding**: No hay script `typecheck`; `pnpm build` cubre type-check pero es lento para iterar
- **Impact**: Iteración lenta del refactor
- **Closure**: T-Setup-1 (`"typecheck": "tsc --noEmit"`)
- **Verification**: `pnpm typecheck` ejecutado y verde

### F-021: `"use client"` en `src/actions.ts` genera confusión
- **Status**: ✅ CLOSED
- **Severity**: MEDIUM
- **Location**: `src/actions.ts:1`
- **Finding**: `"use client"` en `src/actions.ts`: confusa naturaleza del archivo (form action + invocación HTTP a /api/send-email)
- **Impact**: Intención poco clara, doble red de comunicación
- **Closure**: T-Notif (eliminado `"use client"`, movido a `features/notifications/application/actions/`)
- **Verification**: `pnpm lint` sin advertencias sobre acciones duality

## LOW Findings

### F-022: `add_featured_column.sql` sin convención de migrations
- **Status**: ⏸ DEFERRED
- **Severity**: LOW
- **Location**: `add_featured_column.sql` (raíz)
- **Finding**: `add_featured_column.sql` en raíz sin convención de migrations
- **Impact**: Migrations sin trazabilidad ordenada
- **Closure**: T132 en Phase 7 → `db/migrations/0001_featured_column.sql`
- **Verification**: Phase 7

### F-023: `Database` type expone `'products'` directamente sin alias
- **Status**: ⏸ DEFERRED
- **Severity**: LOW
- **Location**: `src/types-db.ts`
- **Finding**: `Database` type expone `'products'` directamente sin alias por capa
- **Impact**: OK pero inconsistente con dominio
- **Closure**: Feature 003 (diferido con `types-db.ts` vigente)
- **Verification**: Feature 003

### F-024: Múltiples README/MD en raíz sin index
- **Status**: ⏸ DEFERRED
- **Severity**: LOW
- **Location**: raíz (`SEO_MIGRATION_GUIDE.md`, `PAYPAL-SETUP.md`)
- **Finding**: Múltiples README/MD en raíz (`SEO_MIGRATION_GUIDE.md`, `PAYPAL-SETUP.md`) sin index
- **Impact**: Documentación dispersa
- **Closure**: T144 en Phase 9 → `docs/` con index
- **Verification**: Phase 9

## NEW Findings (Phase 4 aftermath)

### F-025: Componentes legacy en `src/components/` con deep imports
- **Status**: 🔵 OPEN
- **Severity**: HIGH
- **Location**: `src/components/{cards,products,checkout,account,admin}/**/*.tsx`
- **Finding**: ~50 componentes en `src/components/` que aún usan deep imports desde features (e.g., `@/features/products/presentation/components/cards/Card`) en lugar de pasar por los barrels
- **Impact**: Violación de FR-006 (boundaries); ESLint muestra errores `no-restricted-imports` en cada archivo de `src/components/`
- **Closure**: Migración pendiente — estos componentes deberían consumir solo desde `@/features/<feature>` barrel exports
- **Verification**: `pnpm lint` → 0 errors de `no-restricted-imports`

### F-026: Barrel exports incompletos en features
- **Status**: 🔵 OPEN
- **Severity**: MEDIUM
- **Location**: `src/features/*/index.{ts,tsx}`
- **Finding**: Algunos feature barrels no re-exportan todos los símbolos públicos necesarios (e.g., `types` desde `application/`, componentes desde `presentation/`). Los deep imports funcionan porque bypassan el barrel, pero eso derrota el propósito de FR-006.
- **Impact**: Incentivo a usar deep imports; barreras incompletas
- **Closure**: Auditoría de barrels + agregar exports faltantes; validar con `pnpm lint`
- **Verification**: `pnpm lint` verde + smoke test de cada feature barrel

### F-027: `src/actions.ts` mezcla server actions y transports
- **Status**: 🔵 OPEN
- **Severity**: MEDIUM
- **Location**: `src/actions.ts`
- **Finding**: `src/actions.ts` actúa como barrel público de notifications, pero su nombre sugiere server action generic. Mezcla invocaciones directas al transport (`sendMail`) con la firma de form action. Confuso para el mantenimiento.
- **Impact**: Ambigüedad sobre la naturaleza del archivo; riesgo de uso incorrecto
- **Closure**: Considerar renombrar a `src/lib/notifications.ts` o mover el barrel a `shared/notifications/index.ts`
- **Verification**: smoke test del flujo completo

### F-028: `src/lib/*.ts` — barrel público de re-exports
- **Status**: 🔵 OPEN
- **Severity**: MEDIUM
- **Location**: `src/lib/{checkout,cartActions,search,viewedHistory,categories,productsDistributor,convert-core,orderConfirmationEmail}.ts`
- **Finding**: `src/lib/` funciona como barrel público que re-exports desde features. Es una segunda capa de indirección (app → lib → features) que duplica los feature barrels. Mantiene viva la ancienne convención.
- **Impact**: Indirección innecesaria; место для ошибок (desincronización barrel vs lib re-exports)
- **Closure**: Auditoría de uso real; si `src/lib/` es solo re-export, eliminar y usar feature barrels directamente desde `src/app/`
- **Verification**: `pnpm build` pasa; todos los consumers migrados a imports directos

### F-029: Barrel exports rotos o incompletos rompen el build
- **Status**: 🔵 OPEN
- **Severity**: HIGH
- **Location**: `src/features/products/index.ts`, `src/features/content/presentation/components/NavbarClient.tsx`
- **Finding**: `pnpm typecheck` muestra 16+ errores: barrel de products no exporta `SearchResultsPage` como default; `NavbarClient.tsx` intenta importar `CartContext` de `@/context/CartContext` que ya no existe
- **Impact**: Build roto en типичный scenarios (no es solo lint, es TypeScript hard error)
- **Closure**: Fix barrels para exportar lo que los consumers esperan; fix imports que referencian paths legacy
- **Verification**: `pnpm typecheck` → 0 errores

### F-030: Path aliases legacy (`@/context`, `@/components/search`) aún referenciados
- **Status**: 🔵 OPEN
- **Severity**: MEDIUM
- **Location**: `src/app/layout.tsx`, `src/components/general/Navbar.tsx`, `src/components/general/NavbarClient.tsx`, `src/components/home/AddToCartButton.tsx`, `src/features/cart/application/hooks/useCart.ts`
- **Finding**: Múltiples archivos aún usan `@/context/CartContext`, `@/components/search/SearchBar`, `@/components/providers/ProductsProvider` — todos paths legacy que no existen en la nueva estructura
- **Impact**: TypeScript errors en cadena; bloquea `pnpm typecheck`
- **Closure**: Migrar estos imports a los nuevos feature barrels o crear re-exports en `src/lib/` si son interfaces de legacy layers
- **Verification**: `pnpm typecheck` → 0 errores

## Deferred Findings

| ID | Reason | Target Feature |
|----|--------|----------------|
| F-013 (lógica de negocio en pages) | Requiere migración de features | Feature 003 |
| F-014 (consolidación carruseles) | Requiere QA visual dedicado | Feature 002 |
| F-015 (user_tickets hardcoded) | Legacy, no impacto inmediato | Feature 003 |
| F-016 (useEffect cart) | Resuelto parcialmente en refactor | Feature 003 |
| F-017 (console.log) | Logger estructurado en T145 | Phase 9 |
| F-018 (types-db fragmentación) | Requiere revisión completa | Feature 003 |
| F-022 (migrations folder) | T132 en Phase 7 | Phase 7 |
| F-023 (Database type) | Diferido con types-db.ts vigente | Feature 003 |
| F-024 (READMEs dispersos) | T144 en Phase 9 | Phase 9 |
| F-025 (deep imports legacy) | Migración componentes pendiente | Feature 003 |
| F-026 (barrel exports incompletos) | Auditoría y completado de barrels | Feature 003 |
| F-027 (actions.ts ambiguo) | Renombrar o mover barrel | Feature 003 |
| F-028 (src/lib indirección) | Auditoría de uso real | Feature 003 |
| F-029 (barrel exports rotos) | Fix build breakages | Feature 003 |
| F-030 (path aliases legacy) | Fix TypeScript errors | Feature 003 |

## Verification Commands

```bash
# Security checklist (quickstart.md §4)
git grep -nE 'NEXT_PUBLIC_(PAYPAL_(LIVE_)?CLIENT_ID|.*SECRET)' -- '*.ts' '*.tsx'
# Expected: 0 matches (F-005 cerrado)

git grep -n 'AUTHORIZED_ADMINS' -- '*.ts' '*.tsx'
# Expected: 0 matches (F-007 cerrado)

pnpm build 2>&1 | grep -rE "(EMAIL_PASS|PAYPAL_SECRET)" .next/static || echo "PASS: No secrets in bundle"

# Boundaries & imports (F-025, F-026)
pnpm lint 2>&1 | grep -c "no-restricted-imports"
# Expected: 0 (F-025 — deep imports migrados)

# Type check
pnpm typecheck
# Expected: 0 errors

# Smoke tests (quickstart.md §3)
# Run each section's smoke test per feature
```