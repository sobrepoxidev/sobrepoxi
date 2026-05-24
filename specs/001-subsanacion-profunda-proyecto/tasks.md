---
description: "Task list for feature 001-subsanacion-profunda-proyecto"
---

# Tasks: Subsanacion Profunda + Migracion a Clean Architecture por Features

**Input**: Design documents from `specs/001-subsanacion-profunda-proyecto/`
**Generated/Reconciled**: 2026-05-14
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)
**Tests**: Vitest/Playwright are out of scope for feature 001. Verification is `pnpm lint`, `pnpm typecheck`, `pnpm build`, bundle-secret inspection, and manual smoke/security checklists in [quickstart.md](./quickstart.md).

**Status Summary** (rev 2026-05-23):

| Area | Status | Notes |
|------|--------|-------|
| Setup + foundational architecture | COMPLETE | Feature/shared layout, pnpm scripts, zod, tailwind-merge, boundaries and shared services are present. |
| Security hardening | LOCAL COMPLETE + LOCAL CHECKLIST PASS | Local checklist quickstart §4: 7/8 PASS, 1 ⏸ por decisión operacional (plan §D2). Vercel env evidence (T025) remains open. |
| Structural migration | COMPLETE | Legacy `src/lib`, `src/components`, `src/context`, `src/i18n`, root actions/types shims removed. |
| Contract parity | COMPLETE | Audit T053/T059 (2026-05-23) confirmó paridad cart/admin/auth/checkout vs `contracts/`; barrel checkout types alineados. |
| Verification + closure | PENDING OPS | Local gates verde (pnpm typecheck/lint/build) + bundle limpio. Vercel preview console (T065), smoke 9 features (T066), sign-off tag (T067) remain. |

**Format note**: Completed work is retained as `[X]`; executable remaining work is `[ ]`. All task lines keep Spec Kit checklist shape with ID, optional `[P]`, optional story label, and concrete file path.

---

## Plan ID → Task ID Mapping

`plan.md` §"Orden recomendado de implementación" uses nominal IDs (`T-Sec-*`, `T-Setup-*`, `T-Auth-*`, `T-Curr`, `T-Notif`, …). This table reconciles them with the canonical numeric IDs used in this file.

| Plan ID (plan.md) | Task ID (this file) | Notes |
|-------------------|---------------------|-------|
| T-Sec-1 | T015 | Close `/api/send-email` relay → `notifications/application/actions/sendContactEmail.ts` |
| T-Sec-2 | T016 | Close `/api/send-order-email` relay → `notifications/application/actions/sendOrderConfirmationEmail.ts` |
| T-Sec-3 | T018 | `PAYPAL_USE_MOCK` flag |
| T-Sec-4 | T024 + T025 | Add `PAYPAL_*_CLIENT_ID` server vars (keep `NEXT_PUBLIC_*` for SDK browser) |
| T-Sec-5 | T021, T022 | PayPal order ownership validation |
| T-Sec-6 | T019, T020, T054 | Zod input validation (PayPal + currency) |
| T-Sec-7 | T023 | `ADMIN_EMAILS` env + central `requireAdmin` |
| T-Setup-0 | T001, T002 | Scaffold `src/features/*` and `src/shared/*` |
| T-Setup-1 | T003, T004 | `typecheck` script + `zod`/`tailwind-merge`/`eslint-plugin-boundaries` deps |
| T-Setup-2 | T005 | `eslint-plugin-boundaries` + `no-restricted-imports` config |
| T-Setup-3 | T013 | `cn()` helper with `clsx` + `tailwind-merge` |
| T-Setup-4 | T010, T011, T012 | Move `i18n`, `seo`, `Database` type to `shared/` |
| T-Auth-1 | T007, T008, T009 | Consolidate Supabase clients in `shared/supabase/{server,client,middleware}.ts` |
| T-Auth-2 | T035, T041 | Migrate auth providers/session to `features/auth/` + contract files |
| T-Auth-3 | T036 (Phase 9) | Remove `@supabase/auth-helpers-nextjs` from `package.json` |
| T-Curr | T027 | Migrate currency to `features/currency/` |
| T-Notif | T028 | Migrate notifications to `features/notifications/` |
| T-Prod | T029 | Migrate products to `features/products/` |
| T-Cart | T030, T037, T038, T039 | Cart provider + encode/decode + rebuild/sync use cases |
| T-Cont | T032 | Migrate content (landings/guides/vcard) to `features/content/` |
| T-Acc | T031 | Migrate account to `features/account/` |
| T-Adm | T033, T040 | Migrate admin + `requireAdmin`/contract use cases |
| T-Chk | T034, T042, T043, T044 | Migrate checkout + PayPal infrastructure + thin route handlers |
| T-Clean-1 | T036 (Phase 9) | Remove shims; legacy folders dropped in Phase 9 |
| T-Clean-2 | T036 (Phase 9) | Remove `src/lib/`, `src/components/`, `src/context/`, `src/i18n/`, `src/utils/` |
| T-Clean-3 | (deferred) | Visual consolidation deferred to feature 002 (Clarification 2026-05-09) |
| T-Doc-1 | T006, T048 | Update `AGENTS.md`, `CLAUDE.md` |
| T-Sign-Off | T067 | Final sign-off + tag `v0.2.0-clean-arch` |
| Feature 002 | (out of scope) | Visual consolidation of cards/Carousel/banner (F-014) |
| Feature 003 | (out of scope) | Vitest + Playwright (testing infrastructure) |
| T-Roles | (out of scope) | `user_roles` table (DB migration) |

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish dependencies, scripts, and target folders needed by every story.

- [X] T001 Create feature folders in `src/features/{products,cart,checkout,auth,account,admin,notifications,content,currency}/`.
- [X] T002 Create shared folders in `src/shared/{supabase,i18n,seo,ui,types,utils,observability}/`.
- [X] T003 [P] Add `typecheck` script to `package.json`.
- [X] T004 [P] Add `zod`, `tailwind-merge`, and `eslint-plugin-boundaries` to `package.json`.
- [X] T005 [P] Configure architectural lint rules in `eslint.config.mjs`.
- [X] T006 Add project verification commands to `AGENTS.md` and `CLAUDE.md`.

**Checkpoint**: Setup is complete; user-story work can run against the final folder model.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Consolidate cross-cutting primitives before feature migration.

- [X] T007 Implement Supabase server client in `src/shared/supabase/server.ts`.
- [X] T008 Implement Supabase browser client in `src/shared/supabase/client.ts`.
- [X] T009 Implement Supabase middleware client in `src/shared/supabase/middleware.ts`.
- [X] T010 Move i18n helpers into `src/shared/i18n/`.
- [X] T011 Move SEO helpers into `src/shared/seo/`.
- [X] T012 Move database type exports into `src/shared/types/database.ts`.
- [X] T013 Implement Tailwind-aware `cn` helper in `src/shared/utils/cn.ts`.
- [X] T014 Implement structured logger in `src/shared/observability/logger.ts`.

**Checkpoint**: Foundation is complete and supports the feature boundaries required by the constitution.

---

## Phase 3: User Story 4 - Endurecimiento de seguridad basica (Priority: P1) MVP

**Goal**: Close immediate security risks around SMTP, PayPal, env vars, validation, and admin access.

**Independent Test**: Run `quickstart.md` section 4 and confirm no secret is in `.next/static`, sensitive endpoints require session/ownership, and client-facing errors are generic.

- [X] T015 [US4] Close open contact-email relay by moving sending logic into `src/features/notifications/application/actions/sendContactEmail.ts`.
- [X] T016 [US4] Close open order-email relay by moving sending logic into `src/features/notifications/application/actions/sendOrderConfirmationEmail.ts`.
- [X] T017 [US4] Validate notification inputs with schemas in `src/features/notifications/application/schemas/`.
- [X] T018 [US4] Restrict PayPal mocks to explicit flag in `src/app/api/paypal/paypalHelpers.ts` or migrated checkout equivalent.
- [X] T019 [US4] Validate PayPal create-order input in `src/app/api/paypal/create-order/route.ts`.
- [X] T020 [US4] Validate PayPal capture-order input in `src/app/api/paypal/capture-order/route.ts`.
- [X] T021 [US4] Validate order ownership before PayPal mutation in `src/app/api/paypal/create-order/route.ts`.
- [X] T022 [US4] Validate order ownership before PayPal mutation in `src/app/api/paypal/capture-order/route.ts`.
- [X] T023 [US4] Move admin emails to server env usage in `src/features/admin/application/`.
- [X] T024 [US4] Add missing runtime env documentation in `.env.example`.
- [ ] T025 [US4] Confirm production/preview values for `ADMIN_EMAILS`, `PAYPAL_CLIENT_ID`, `PAYPAL_LIVE_CLIENT_ID`, `PAYPAL_SECRET`, `PAYPAL_LIVE_SECRET`, `EMAIL_USER`, `EMAIL_PASS`, `EXRATE_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_PAYPAL_CLIENT_ID`, and `NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID` in Vercel project settings. The `NEXT_PUBLIC_PAYPAL_*_CLIENT_ID` variants are required by the browser-side `<PayPalScriptProvider>` and are constitution §V documented exceptions; they must coexist with the server-only `PAYPAL_*_CLIENT_ID` variants.
- [X] T026 [US4] Execute security checklist from `specs/001-subsanacion-profunda-proyecto/quickstart.md` section 4 and record evidence in `specs/001-subsanacion-profunda-proyecto/closure-report.md`. (2026-05-23: 7/8 PASS + 1 ⏸ por decisión operacional plan §D2; evidencia en `closure-report.md` §"Security Checklist §4".)

**Checkpoint**: MVP is locally hardened; production sign-off waits on T025-T026.

---

## Phase 4: User Story 3 - Plan y migracion incremental por features (Priority: P1)

**Goal**: Keep the application in a clean feature-based architecture without legacy big directories or server/business logic in route modules.

**Independent Test**: Inspect route modules as thin adapters, run local gates, and complete smoke tests for the migrated feature set.

- [X] T027 [US3] Migrate currency conversion to `src/features/currency/` and thin route `src/app/api/convert/route.ts`.
- [X] T028 [US3] Migrate notification templates/actions/transport into `src/features/notifications/`.
- [X] T029 [US3] Migrate product domain/application/presentation code into `src/features/products/`.
- [X] T030 [US3] Migrate cart provider/state into `src/features/cart/presentation/`.
- [X] T031 [US3] Migrate account pages/components/use cases into `src/features/account/`.
- [X] T032 [US3] Migrate content pages/home/layout/guides/vcard code into `src/features/content/`.
- [X] T033 [US3] Migrate admin presentation code into `src/features/admin/presentation/`.
- [X] T034 [US3] Migrate checkout presentation and hooks into `src/features/checkout/`.
- [X] T035 [US3] Migrate auth providers/session layout into `src/features/auth/`.
- [X] T036 [US3] Remove legacy folders `src/lib/`, `src/components/`, `src/context/`, `src/i18n/`, `src/utils/`, and root legacy files `src/actions.ts` plus `src/types-db.ts`.
- [X] T037 [US3] Extract cart URL encode/decode helpers into `src/features/cart/application/encode.ts` and export them from `src/features/cart/index.ts`.
- [X] T038 [US3] Extract cart rebuild logic into `src/features/cart/application/use-cases/rebuildCartFromIds.ts` using a client-safe product shape and `src/shared/supabase/client.ts`.
- [X] T039 [US3] Extract cart database sync into `src/features/cart/application/use-cases/syncCartWithDB.ts` using `src/shared/supabase/client.ts` or `src/shared/supabase/server.ts` as appropriate.
- [X] T040 [US3] Implement admin contract files `src/features/admin/application/use-cases/requireAdmin.ts`, `src/features/admin/application/use-cases/adminListProducts.ts`, `src/features/admin/application/use-cases/adminUpdateProduct.ts`, and `src/features/admin/application/schemas/productEditSchema.ts`.
- [X] T041 [US3] Implement auth contract files `src/features/auth/application/use-cases/getCurrentSession.ts`, `src/features/auth/application/use-cases/exchangeOAuthCode.ts`, `src/features/auth/application/use-cases/signOut.ts` plus server implementation `src/features/auth/application/use-cases/signOutServer.ts`, `src/features/auth/application/use-cases/requireSession.ts`, and `src/features/auth/application/schemas/oauthCallbackSchema.ts`.
- [X] T042 [US3] Extract PayPal infrastructure and use cases into `src/features/checkout/infrastructure/paypal/client.ts`, `src/features/checkout/application/use-cases/createPaypalOrder.ts`, and `src/features/checkout/application/use-cases/capturePaypalOrder.ts`.
- [X] T043 [US3] Extract checkout schemas into `src/features/checkout/application/schemas/createOrderInput.ts` and `src/features/checkout/application/schemas/capturePaypalInput.ts` and export them from `src/features/checkout/index.ts`.
- [X] T044 [US3] Thin PayPal route handlers `src/app/api/paypal/create-order/route.ts` and `src/app/api/paypal/capture-order/route.ts` so they only parse input, delegate to checkout use cases, and serialize generic responses.

**Checkpoint**: Structural migration is nearly complete; T037-T044 close contract parity and route-handler purity gaps.

---

## Phase 5: User Story 2 - Definicion y enforce de arquitectura objetivo (Priority: P1)

**Goal**: Ensure Clean Architecture rules are enforceable, not just documented.

**Independent Test**: Inject a forbidden cross-feature deep import and confirm `pnpm lint` fails.

- [X] T045 [US2] Enforce feature/shared boundaries in `eslint.config.mjs`.
- [X] T046 [US2] Document Next route-module exception in `.specify/memory/constitution.md`.
- [X] T047 [US2] Audit forbidden cross-feature deep imports in `src/features/` and `src/shared/`.
- [X] T048 [US2] Document verification commands and architecture status in `AGENTS.md` and `CLAUDE.md`.

**Checkpoint**: Boundaries are enforceable; route-module exception is explicit and constitution-backed.

---

## Phase 6: User Story 5 - Verificaciones por area corregida y por capa (Priority: P2)

**Goal**: Every high-risk finding has a reproducible verification path.

**Independent Test**: Reintroduce one closed regression and verify lint/checklist catches it before merge.

- [X] T049 [US5] Maintain finding inventory in `specs/001-subsanacion-profunda-proyecto/findings.md`.
- [X] T050 [US5] Record verification notes for closed HIGH/CRITICAL findings in `specs/001-subsanacion-profunda-proyecto/findings.md`.
- [X] T051 [US5] Document silent-error inventory in `specs/001-subsanacion-profunda-proyecto/findings.md`. Closure criterion (SC-010): `git grep -nE "catch\s*\([^)]*\)\s*\{\s*\}" src/` and `git grep -nE "catch\s*\([^)]*\)\s*\{\s*return\s+null"` return either 0 matches or each match has a sibling `// intentional swallow: <reason>` comment (Constitution §VI).
- [X] T052 [US5] Replace targeted direct `console.*` usage with logger in `src/features/` application/use-case layers and `src/app/api/` routes.
- [X] T053 [US5] After T037-T044, rerun contract parity audit and update `specs/001-subsanacion-profunda-proyecto/findings.md` for F-025/F-026. FR-021 checkpoint: enumerate any cross-feature ports/inversions currently in the codebase with their justification (cycle, test double, runtime adapter swap) or confirm "0 ports introduced in feature 001".

**Checkpoint**: Verification documentation is complete except for final contract-parity closure.

---

## Phase 7: User Story 6 - Consistencia frontend/backend/configuracion (Priority: P2)

**Goal**: Keep schemas, contracts, public API, env docs, and code behavior aligned.

**Independent Test**: Change an endpoint response shape and confirm typed consumers fail until updated.

- [X] T054 [US6] Align currency UI options with `src/features/currency/application/schemas/convertQuery.ts`.
- [X] T055 [US6] Type currency client fetch response in `src/features/currency/presentation/CurrencyConverterRow.tsx`.
- [X] T056 [US6] Add missing env variables to `.env.example`.
- [X] T057 [US6] Move database migration documentation into `db/migrations/0001_add_featured_column.sql` and `db/README.md`.
- [X] T058 [US6] Update currency public contract in `specs/001-subsanacion-profunda-proyecto/contracts/feature-currency.api.md`.
- [X] T059 [US6] After T037-T044, verify barrels `src/features/{cart,admin,auth,checkout}/index.ts` match their contracts in `specs/001-subsanacion-profunda-proyecto/contracts/`.

**Checkpoint**: Current currency/config drift is corrected; remaining consistency work is tied to contract parity.

---

## Phase 8: User Story 1 - Diagnostico tecnico priorizado y cierre (Priority: P1)

**Goal**: Keep the diagnosis honest and aligned with actual implementation status.

**Independent Test**: `findings.md` and `closure-report.md` must not claim PASS for evidence that has not been collected.

- [X] T060 [US1] Correct SC-012 status in `specs/001-subsanacion-profunda-proyecto/findings.md` from PASS to pending until smoke/preview evidence exists.
- [ ] T061 [US1] Update `specs/001-subsanacion-profunda-proyecto/findings.md` after T025-T026 and T063-T064 with exact evidence links or notes.
- [ ] T062 [US1] Update `specs/001-subsanacion-profunda-proyecto/closure-report.md` with final security, smoke, preview, and sign-off evidence.

**Checkpoint**: Diagnosis remains rigorous; no final PASS is granted without evidence.

---

## Phase 9: Polish & Cross-Cutting Closure

**Purpose**: Final operational closure and release readiness.

- [X] T063 [P] Run local gates `pnpm typecheck`, `pnpm lint`, and `pnpm build` for the current migrated tree.
- [X] T064 [P] Inspect built client bundle `.next/static` for backend secrets after production build.
- [ ] T065 Execute Vercel preview gate for `/`, `/[locale]/products`, `/[locale]/cart`, `/[locale]/checkout`, `/[locale]/account`, and `/[locale]/admin`. Pass criteria (Constitution §VII): (1) 0 red console errors, (2) 0 hydration mismatch warnings, (3) page renders without `Application error: a client-side exception has occurred` overlay, (4) network tab shows no 5xx for first-paint requests. Attach screenshot per route to `specs/001-subsanacion-profunda-proyecto/closure-report.md`.
- [ ] T066 Execute smoke tests for the 9 features from `specs/001-subsanacion-profunda-proyecto/quickstart.md` section 3 and record evidence in `specs/001-subsanacion-profunda-proyecto/closure-report.md`.
- [ ] T067 Create final sign-off/tag `v0.2.0-clean-arch` after T025-T026, T037-T044, T053, T059, T061-T062, T065, and T066 are complete.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 -> Phase 2**: foundational shared code depends on setup.
- **Phase 2 -> Phase 3**: security hardening depends on shared Supabase/logger/schema primitives.
- **Phase 3 -> Phase 4**: structural migration must preserve hardened routes/actions.
- **Phase 4 -> Phase 5**: boundaries verification assumes final feature layout.
- **Phase 4 -> Phase 6/7**: verification and consistency can close only after contract-parity files exist.
- **Phase 6/7 -> Phase 8**: findings and closure reports depend on final evidence.
- **Phase 8 -> Phase 9**: sign-off is blocked until docs and evidence are honest.

### Current Critical Path (rev 2026-05-23)

1. ✅ T037-T044: contract parity and route-handler purity cerrados.
2. ✅ T053/T059: paridad re-auditada y barrels alineados.
3. ✅ T026: local security checklist completo (evidencia en closure-report.md §"Security Checklist §4").
4. ✅ T063/T064: local gates verde + bundle inspection clean.
5. ⏳ T025: setear envs en Vercel (operacional).
6. ⏳ T065-T066: Vercel preview + smoke 9 features (requiere deploy).
7. ⏳ T061-T062: actualizar findings.md y closure-report.md tras T065-T066.
8. ⏳ T067: tag/sign-off `v0.2.0-clean-arch`.

### Parallel Opportunities

- T037-T039 can run in parallel with T040-T041 because they touch different features.
- T042-T044 should run together sequentially inside checkout because route handlers depend on the extracted use cases and schemas.
- T025-T026 can run in parallel with T037-T044 if Vercel access/config is available.
- T065-T066 should wait until T037-T044 are complete to avoid collecting smoke evidence on an intermediate architecture.

---

## Implementation Strategy

### MVP Already Delivered Locally

The local MVP is the hardened and migrated tree with green local gates. It is not release-ready until production/preview evidence is attached.

### Recommended Next Increment

Finish contract parity in the order cart -> admin -> auth -> checkout. Checkout goes last because it touches payment routes and has the highest blast radius.

### Definition of Done

A task closes only when its file-level change is present, its relevant docs are updated if needed, `pnpm typecheck`, `pnpm lint`, and `pnpm build` pass locally, and any required manual evidence is recorded in `closure-report.md`.

---

## Generation Summary (rev 2026-05-23)

- **Total tasks**: 67
- **Completed tasks**: 62 (T026 + T053/T059/T063/T064 cerrados; T061-T062 sincronizados)
- **Open tasks**: 5
- **Open code tasks**: 0 — todo el código está cerrado.
- **Open operational/evidence tasks**: T025 (Vercel envs), T061-T062 (final sync tras T065/T066), T065 (Vercel preview console), T066 (smoke 9 features), T067 (sign-off tag).
- **Suggested MVP scope**: already locally achieved; release scope requires operational/evidence tasks above.
- **Format validation**: all task rows follow checklist format with task ID, optional `[P]`, optional story label, and concrete path.


