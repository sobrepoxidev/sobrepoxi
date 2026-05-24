# Closure Report — Feature 001: Subsanación Profunda + Migración a Clean Architecture por Features

**Feature**: 001-subsanacion-profunda-proyecto
**Status**: READY FOR PREVIEW SIGN-OFF (local gates green — 2026-05-14)
**Date**: 2026-05-14
**Verification**: `pnpm typecheck` ✅ `pnpm lint` ✅ `pnpm build` ✅

---

## Resumen Ejecutivo

El feature 001 ejecutó una auditoría y corrección profunda del proyecto `hands-made-art`, migrando la estructura a Clean Architecture por features con barreras de import enforced por ESLint. Se cerraron 4 hallazgos CRITICAL, 8 HIGH, 3 MEDIUM, y 5 render-loops introducidos por un agente previo. El estado actual: verde en gates locales (`typecheck`, `lint`, `build`) y pendiente únicamente de evidencia operativa/manual para Vercel preview, variables de entorno y smoke tests.

---

## Features Migradas

| Feature | Archivos | Estado |
|---------|----------|--------|
| `currency` | convert use-case, schemas, CurrencyConverterRow | ✅ Migrated |
| `notifications` | templates, schemas, server actions, nodemailer transport | ✅ Migrated |
| `products` | hooks, distribute, categories, search, viewed-history, use-cases, components | ✅ Migrated |
| `cart` | encode, use-cases, CartContext, provider | ✅ Migrated |
| `content` | guides data, home data use-case, components, layout | ✅ Migrated |
| `account` | use-cases, hooks, components | ✅ Migrated |
| `admin` | use-cases, schemas, components | ✅ Migrated |
| `auth` | SupabaseProvider, SessionLayout, use cases | ✅ Migrated |
| `checkout` | use-cases, schemas, components, PayPal integration | ✅ Migrated |
| `shared` | supabase (server/client/middleware), utils, i18n, seo, ui | ✅ Consolidated |

---

## Hallazgos Cerrados

| ID | Severity | Description | Closure |
|----|----------|-------------|---------|
| F-001 | CRITICAL | Relay SMTP `/api/send-email` abierto | T020-T024: same-origin + session + zod |
| F-002 | CRITICAL | Relay SMTP `/api/send-order-email` abierto | T025-T028: owner validation + schema |
| F-003 | CRITICAL | Falta validación owner en PayPal endpoints | T034-T038: session + owner check |
| F-004 | CRITICAL | PayPal mocks ejecutándose en staging | T029: mocks solo bajo `PAYPAL_USE_MOCK=1` |
| F-005 | HIGH | Secrets en bundle cliente | T031: renombrado a server-only envs |
| F-006 | HIGH | Singleton Supabase sin cookies | T007-T009: `@supabase/ssr` consolidado |
| F-007 | HIGH | `AUTHORIZED_ADMINS` hardcoded | T040-T042: `ADMIN_EMAILS` env var |
| F-008 | HIGH | `"use client"` erróneo en actions.ts | T056: eliminado; server action directo |
| F-009 | HIGH | Tres patrones Supabase coexistiendo | T105-T109: unificado `@supabase/ssr` |
| F-010 | HIGH | `cn()` sin `tailwind-merge` | T012: `clsx` + `tailwind-merge` en `shared/utils` |
| F-011 | HIGH | Mensajes internos en errores | T038: generic errors al cliente |
| F-012 | HIGH | `/api/convert` sin validación | T039: zod schema |
| F-SE-001 | HIGH | Silent catches inventory (49 total) | T127a: 0 silent swallows |
| F-SE-002 | HIGH | Fire-and-forget promises | T127b: 1 fix (StepOne.tsx) |
| F-RL-001..005 | Runtime | Stack overflow / client recreation loops | Phase 4-V: hooks en context, lazy init |

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Tareas completadas | ~120 |
| Archivos migrados | ~150 |
| Features creadas | 9 (`currency`, `notifications`, `products`, `cart`, `content`, `account`, `admin`, `auth`, `checkout`) |
| Componentesmovidos a `presentation/` | ~50 |
| Hooks extraídos | ~15 |
| Use cases creados | ~30 |
| Schemas zod añadidos | ~12 |
| Anti-patterns corregidos | 6 (AP-1..AP-6) |
| Render loops corregidos | 5 |
| Warnings pre-existentes restantes | ~8 (`react-hooks/exhaustive-deps`) |
| Dependencias añadidas | `tailwind-merge`, `zod`, `eslint-plugin-boundaries` |
| Dependencias retiradas | `@supabase/auth-helpers-nextjs` |

---

## Breaking Changes (SC-009)

| Cambio | Tipo | Migración para consumidores |
|--------|------|----------------------------|
| Añadir `PAYPAL_CLIENT_ID` server-only (la `NEXT_PUBLIC_PAYPAL_CLIENT_ID` se conserva para el SDK browser) | Env var addition (constitución §V) | Setear `PAYPAL_CLIENT_ID` en Vercel manteniendo `NEXT_PUBLIC_PAYPAL_CLIENT_ID` |
| Añadir `PAYPAL_LIVE_CLIENT_ID` server-only (la `NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID` se conserva para el SDK browser) | Env var addition (constitución §V) | Setear `PAYPAL_LIVE_CLIENT_ID` en Vercel manteniendo `NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID` |
| Retirado `@supabase/auth-helpers-nextjs` | Paquete eliminado | Usar `@/shared/supabase/{server,client,middleware}` |
| `src/actions.ts` ya no es `"use client"` | Server action | Consumidores migran a imports directos |
| Endpoints `/api/send-email` y `/api/send-order-email` requieren sesión | Security hardening | Ningún consumidor externo (T057 audit) |

---

## Hallazgos Abiertos (Deferred)

| ID | Severity | Razón | Target |
|----|----------|-------|--------|
| F-013 | HIGH | Lógica de negocio en pages | Feature 003 |
| F-014 | MEDIUM | Duplicación carruseles (QA visual) | Feature 002 |
| F-015 | MEDIUM | `user_tickets` hardcoded | Feature 003 |
| F-016 | MEDIUM | useEffect complejas en CartContext | Feature 003 |
| F-017 | MEDIUM | console.log sin estructurar | Phase 9 (T145) |
| F-018 | MEDIUM | types-db.ts fragmentación | Feature 003 |
| F-023 | LOW | Database type sin alias | Feature 003 |
| F-025 | HIGH | Deep imports en `src/components/` | Feature 003 |
| F-026 | MEDIUM | Barrel exports incompletos | Feature 003 |
| F-027 | MEDIUM | `actions.ts` ambiguo | Feature 003 |
| F-028 | MEDIUM | `src/lib/` indirección | Feature 003 |
| F-030 | MEDIUM | Path aliases legacy (shims) | Phase 9 |

---

## PróxImas Features Propuestas

1. **Feature 002**: Consolidación visual — componentes duplicados, carruseles, design system
2. **Feature 003**: Testing + type audit completo — `types-db.ts` → `shared/types/database.ts`, testing framework
3. **Feature `user_roles`**: RLS por rol + permissions granulares

---

## Phase 9 Estado (2026-05-14)

- T136-T142: ✅ Eliminados shims residuales (`src/lib/`, `src/components/`, `src/context/`, `src/i18n/`, `src/utils/supabase/`)
- T143: ✅ `@supabase/auth-helpers-nextjs` desinstalado
- T144: ✅ `docs/` creado con `SEO_MIGRATION_GUIDE.md` y `PAYPAL-SETUP.md`
- T145: ✅ Logger estructurado creado en `src/shared/observability/logger.ts`; aplicado a route handlers/use cases objetivo
- T148: ✅ `pnpm build` ✅ `pnpm typecheck` ✅ `pnpm lint` ✅
- T149: ✅ CLAUDE.md y AGENTS.md actualizados

**Pendiente para sign-off final (T150)**:
- T033/T043 (T025 en tasks.md actuales): setear `PAYPAL_CLIENT_ID`, `PAYPAL_LIVE_CLIENT_ID`, `PAYPAL_SECRET`, `PAYPAL_LIVE_SECRET`, `ADMIN_EMAILS` en Vercel — sin retirar `NEXT_PUBLIC_PAYPAL_CLIENT_ID` ni `NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID` (necesarias para el SDK browser, ver constitución §V)
- T146: Security checklist §4 — requiere Vercel preview deployment y/o sesión real
- T147: Smoke tests §3 — requiere Vercel preview deployment y sesión/datos reales
- T150: Sign-off y tag `v0.2.0-clean-arch` — pendiente Vercel preview verde

---

**Aprobado para merge**: pending Vercel preview smoke test (DevTools console clean on 6 rutas críticas)

---

## Local Gates Evidence (2026-05-23, rama `001-subsanacion-profunda-proyecto`)

| Gate | Comando | Resultado |
|------|---------|-----------|
| Typecheck | `pnpm typecheck` | ✅ exit 0 (0 errors) |
| Lint | `pnpm lint` | ✅ exit 0 — 111 warnings (108 son `max-lines*` / `complexity` del gate "No BIG Components" v1.0.2 introducido como `warn` y diferido a feature 002; 3 son `react-hooks/exhaustive-deps` preexistentes). 0 errors. |
| Build | `pnpm build` | ✅ exit 0 — build completo en `.next/`. Todas las rutas i18n + API + middleware compilan. |
| Bundle inspection | `grep -rE "(EMAIL_PASS\|PAYPAL_(LIVE_)?SECRET\|SUPABASE_SERVICE_ROLE_KEY\|ADMIN_EMAILS)" .next/static` | ✅ 0 matches — ningún secreto server-only aparece en el bundle cliente. |
| Bundle public IDs | `grep -rl "NEXT_PUBLIC_PAYPAL_*_CLIENT_ID" .next/static` | ✅ solo en `chunks/app/[locale]/checkout/page-*.js` — esperado por `<PayPalScriptProvider>`. Excepción constitución §V. |
| FR-021 ports | `find src/features -name "port*.ts" -o -name "adapter*.ts"` | ✅ 0 archivos — 0 puertos cross-feature en feature 001. |

Phase 9 status: T063 ✅ y T064 ✅. Quedan T025 (Vercel envs), T065 (Vercel preview console), T066 (smoke 9 features), T067 (sign-off tag).

---

## Security Checklist §4 — Evidencia (T026, 2026-05-23)

Resultados ejecutados sobre rama `001-subsanacion-profunda-proyecto`, commit local pendiente de commit.

| # | Check | Resultado | Comando / Evidencia |
|---|-------|-----------|---------------------|
| 1 | Secretos verdaderos bajo `NEXT_PUBLIC_*` | ✅ 0 | `grep -rnE 'NEXT_PUBLIC_.*(SECRET\|EMAIL_PASS\|SERVICE_ROLE)' src/` → exit 1 (no matches). `NEXT_PUBLIC_PAYPAL_*_CLIENT_ID` son excepciones constitucionales §V. |
| 2 | `AUTHORIZED_ADMINS` hardcoded en código | ✅ 0 | `grep -rn 'AUTHORIZED_ADMINS' src/` → exit 1 (no matches). |
| 3 | Bundle `.next/static` sin secretos | ✅ 0 | `grep -rE "(EMAIL_PASS\|PAYPAL_(LIVE_)?SECRET\|SUPABASE_SERVICE_ROLE_KEY\|ADMIN_EMAILS)" .next/static` → exit 1. |
| 4 | `/api/send-email` y `/api/send-order-email` | ⏸ Vivos con auth | Plan §D2: eliminación condicionada a ≥1 sprint de logs sin callers externos. Endpoints actuales están blindados con `requireSession` + same-origin + zod + logger. |
| 5 | PayPal `create-order` y `capture-order`: session + ownership | ✅ Pass | `createPaypalOrder.ts:15-16` valida `session`; `:25` valida `order.user_id === session.user.id`. Análogo en `capturePaypalOrder.ts`. Route handlers en `src/app/api/paypal/*/route.ts` delegan al use case. |
| 6 | `/api/convert` valida `amount` y `to` | ✅ Pass | `convertQuerySchema.safeParse({ amount, to })` en `src/app/api/convert/route.ts:10`. |
| 7 | `console.error` directo en route handlers | ✅ 0 | `grep -rnE "console\.error" src/app/api/` → 0 matches. Todos usan `logger.error` de `@/shared/observability/logger`. |
| 8 | Silent errors (Constitución §VI, SC-010) | ✅ 0 | `grep -rnE "catch\s*\([^)]*\)\s*\{\s*\}" src/` → 0; `grep -rnE "catch\s*\([^)]*\)\s*\{\s*return\s+null" src/` → 0. |

**Resultado global**: 7/8 PASS + 1 ⏸ (decisión operacional documentada). Ningún hallazgo de seguridad crítico/alto abierto.

---

## Vercel Preview / Production Smoke — Evidencia (T065-T066, 2026-05-23)

Smoke ejecutado contra **producción `https://sobrepoxi.com`** (el feature 001 ya fue mergeado a master vía PR #18 — commit `d209c86`, deployment `dpl_7dCffjH4fGvoWgrWzRCnKJea4MTF`, target `production`). El "preview" del feature 001 estricto vive en `sobrepoxi-git-001-subsanacion-profun-c328e5-sobrepoxis-projects.vercel.app` (último deploy READY `dpl_4FNtxe7zCTrcSz2VcdhKZ78R5bRh` con commit `f315b5c`); como ambos contienen el mismo código, validamos sobre producción.

| Ruta | Status HTTP | Console errors (red) | Console warnings | Hallazgos |
|------|-------------|----------------------|-------------------|-----------|
| `/es` | 200 | 0 | 1 "Multiple GoTrueClient" | F-NEW-3 + F-NEW-5 (2 imágenes 400 de Supabase storage en `products/resina-epoxica-scultorica/pata34.webp`) |
| `/es/products` | 200 | 0 | 0 | OK |
| `/es/cart` | 200 | 0 | 1 GoTrueClient | F-NEW-1 (`console.log("currentSession", "userId", "correo")` debug leak) |
| `/es/checkout` | 200 | **1 ERROR** `PayPal client ID not found` | 1 GoTrueClient | F-NEW-2 (`console.log("PayPal client ID: ...")` debug leak) + **F-NEW-4** (env `NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID` falta en Vercel production) |
| `/es/account` → `/es/login` | 200 (redirige) | 0 | 2 GoTrueClient | OK — redirección correcta sin sesión |
| `/es/admin` → `/es/login?returnUrl=%2Fes%2Fadmin` | 200 (redirige) | 0 | 2 GoTrueClient | OK — guard funciona |

Runtime logs Vercel production (últimos 7 días, level error/fatal): **0 entradas** (`mcp__vercel__get_runtime_logs`).

### Findings nuevos (smoke-driven)

| ID | Severity | Status | Acción |
|----|----------|--------|--------|
| F-NEW-1 | MEDIUM | ✅ FIXED 2026-05-23 | Eliminado `console.log("currentSession/userId/correo", ...)` en `src/features/cart/presentation/pages/CartPage.tsx:89-93` |
| F-NEW-2 | MEDIUM | ✅ FIXED 2026-05-23 | Eliminado `console.log("PayPal client ID: ", ...)` en `src/features/checkout/presentation/components/PayPalCardMethod.tsx:51-53` |
| F-NEW-3 | LOW | ✅ FIXED 2026-05-23 | Memoización del cliente browser en `src/shared/supabase/client.ts` (un solo `GoTrueClient` por contexto). Server-side intacto (lee cookies por request). |
| F-NEW-4 | **HIGH** | ⏸ OPS ACTION REQUIRED | Setear `NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID` en Vercel production env. Sin esto, el SDK PayPal en producción falla con "PayPal client ID not found" y la página de checkout no puede iniciar pagos LIVE. T025 reabre. |
| F-NEW-5 | LOW | ⏸ DATA FIX | Imagen `products/resina-epoxica-scultorica/pata34.webp` referenciada en BD pero ausente en Supabase storage. Subir el archivo o nullear `image_url` en BD. No bloqueante. |

**Resultado smoke**: 5/6 rutas críticas verde + 1 (`/es/checkout`) bloqueada por F-NEW-4 (env var faltante en Vercel). 3 hallazgos de código FIXED localmente. 2 hallazgos pendientes de acción operacional (envs + storage data).

### API smoke (T066 — quickstart §3.8 currency, §3.6 notifications)

```bash
GET  /api/convert?amount=100&to=CRC                 → 200 {amount,currency,converted,rate,...}
GET  /api/convert?amount=99999999999&to=CRC         → 200  ❌ (esperaba 400; ver F-NEW-6)
GET  /api/convert?amount=10&to=XXX                  → 400  ✅
GET  /api/convert?amount=0&to=CRC                   → 400  ✅
POST /api/send-email   sin auth, body {}             → 500  ⚠️ (esperaba 401; ver F-NEW-7)
```

### CONTEXTO CRÍTICO descubierto durante T066 (2026-05-23)

`git log origin/master` revela que **el PR #18 (`d209c86`) mergeó SOLO los artefactos de Spec Kit** (spec.md, plan.md, research.md, contracts/) hacia master. **El refactor estructural completo del feature 001 (Phases 1-9, ~70 commits) sigue sin mergear**:

- Master HEAD: `f3ce27f fix(ui): resolve WhatsApp bubble click reliability on mobile`
- `git ls-tree origin/master` muestra estructura legacy: `src/lib/convert-core.ts`, `src/components/`, `src/context/CartContext.tsx`, etc.
- `src/features/` NO existe en master.
- `src/app/api/convert/route.ts` en master usa `@/lib/convert-core` y NO valida con zod (devuelve `err.message` directo al cliente → viola §V).
- `src/app/[locale]/cart/page.tsx` en master tiene los mismos `console.log("currentSession/userId/correo", ...)` (líneas 89-93) que F-NEW-1.

Esto significa que:
1. **Producción (`sobrepoxi.com`) corre código pre-001**. Todos los findings ORIGINALES (F-001..F-024) siguen vigentes en producción tal como estaban antes del refactor.
2. **El feature 001 está completo localmente en la rama `001-subsanacion-profunda-proyecto`** y pasa todos los gates locales (typecheck/lint/build) y la security checklist §4 sobre el código LOCAL.
3. **F-NEW-1..F-NEW-3 son fixes adicionales** que apliqué en la rama 001 sobre el código migrado; cuando se mergee a master, esos archivos legacy se sustituyen por los nuevos features ya sin los console.log y con browser client memoizado.
4. **F-NEW-4** (env `NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID` ausente en Vercel) seguirá aplicando tras el merge — es operacional.
5. **F-NEW-5** (imagen 400 en Supabase storage) es un problema de datos en BD, independiente del merge.
6. **F-NEW-6** (convert API sin range cap) y **F-NEW-7** (send-email 500 sin auth) se resuelven AUTOMÁTICAMENTE al mergear 001 (zod schema + requireSession ya están en la rama 001).

### Acción recomendada para sign-off (T067)

1. **Commit local pendiente**: hacer commit de los fixes de esta sesión (F-NEW-1, F-NEW-2, F-NEW-3) y actualizaciones de docs (N1, H1-H3, M1, etc.) en la rama `001-subsanacion-profunda-proyecto`.
2. **PR #19 (o re-abrir #18)**: levantar PR de la rama 001 hacia master. Cuerpo del PR debe documentar:
   - Migración completa Phases 1-9
   - Security baseline aplicado (F-001..F-013)
   - Breaking changes operacionales: añadir `PAYPAL_CLIENT_ID`, `PAYPAL_LIVE_CLIENT_ID`, `ADMIN_EMAILS` en Vercel envs ANTES del merge
   - Mantener `NEXT_PUBLIC_PAYPAL_CLIENT_ID` y `NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID` (constitución §V)
3. **Vercel envs**: setear F-NEW-4 (`NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID`) antes del merge, junto con las nuevas server-only.
4. **Smoke post-merge**: re-correr T065-T066 contra el preview deploy del PR (no contra master directo) y confirmar `/es/checkout` con PayPal LIVE funcionando.
5. **Tag**: `v0.2.0-clean-arch` tras smoke verde en preview.

Sin el merge, el trabajo del feature 001 NO está en producción y los hallazgos originales siguen abiertos en el código vivo.
