# Contracts — Public APIs por feature y reglas de boundaries

Este directorio define los **contratos de frontera** de cada feature destino y las reglas de import enforced por ESLint. Son la representación verificable de FR-005, FR-006, FR-019, FR-020 y FR-021.

Archivos:

- `boundaries.config.md` — Configuración propuesta para `eslint-plugin-boundaries` y `no-restricted-imports`.
- `feature-products.api.md` — Public API de `features/products`.
- `feature-cart.api.md` — Public API de `features/cart`.
- `feature-checkout.api.md` — Public API de `features/checkout`.
- `feature-auth.api.md` — Public API de `features/auth`.
- `feature-account.api.md` — Public API de `features/account`.
- `feature-admin.api.md` — Public API de `features/admin`.
- `feature-notifications.api.md` — Public API de `features/notifications`.
- `feature-content.api.md` — Public API de `features/content`.
- `feature-currency.api.md` — Public API de `features/currency`.
- `shared.api.md` — Public API de `shared/*`.

Cada `feature-<x>.api.md` lista los símbolos que aparecerán en el barrel `src/features/<x>/index.ts`. Las firmas TypeScript son normativas: si una migración exporta un símbolo no listado, debe primero actualizar el contrato.
