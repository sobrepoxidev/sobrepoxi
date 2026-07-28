# SobrePoxi — Session Handoff (2026-06)

Dark + gold theme sweep, responsive fixes, category-routing fixes, and dead-code cleanup across the whole app. **16 commits, all pushed to `master`.** `pnpm typecheck` and `pnpm build` both pass (EXIT 0).

---

## 1. What was done (by area → commit)

| Area | Change | Commit |
|---|---|---|
| Home hero | Responsive hero scale + aligned service CTAs | `2273358` |
| Products grid | Responsive 2 / 3 / 4 columns across breakpoints | `955a77c` |
| Product detail | Fix horizontal overflow (currency converter) + dark polish | `ba32b0c` |
| Auth | Rework register/login to dark theme; fix `/privacy-policy`→`/privacy-policies`; locale-aware links | `f0fff63` |
| Search | Category browsing fixed (no more "0 results"); id-or-name + parent→child expansion; dark theme | `554ea04` |
| Products catalog | `/products` filters by category **id** (not only name) | `e48fbab` |
| Cart | Gold BUY CTA (was teal); fix coupon button; "Handmade Art"→SobrePoxi; dark remnants | `086ab32` |
| Checkout | Full flow (StepOne/Two/PaymentForm/wizard/confirmation) to dark; localized wizard headers | `d46c10f` |
| Account | profile/orders/address tabs + shared `@/shared/ui/tabs` + user dropdown; SINPE copy fix | `0c6307e` |
| Product UI | Search suggestions, quick-view modal, recently-viewed, related spinner, grid prices/links | `8198820` |
| Content pages | Shipping + viewed-history to dark | `d21df32` |
| Misc UI | About/contact/paypal/navbar remnants | `da98d2d` |
| Modal | Quick-view fullscreen wrapper to dark; cart palette comment | `047107f` |
| Cleanup | **Deleted 6 dead card components** (no real imports) | `ec8970a` |
| Admin shells | Panel landing + events page to dark | `ef1ce03` |
| Admin dense | Dashboard + product editor (structured className-only swaps) | `e1f3407` |

**Final audit: zero `teal-` left in the codebase; no stray solid `bg-white`/`bg-gray` except the 3 intentional ones below.**

---

## 2. Conventions / decisions (do not regress)

- **Theme tokens:** surfaces `#121212` / `#1a1a1a`; borders `border-white/10`; primary button `bg-gold-gradient text-black`; links/accents `text-amber-400` (hover `amber-300`); headings `gold-gradient-bright`; savings `emerald-400`; muted text `gray-400`.
- **Category routing:** chips and the product-detail category link pass numeric category **id**. Both `/products` and `/search` accept the param as **id OR name** and expand a parent category to its children (e.g. "Mesas" id=2 is parent of "Serie Costa de Resina" id=1). Don't revert to name-only.
- **SINPE "HM-ART"** in `PaymentForm.tsx` is **intentional** (Handmade conglomerate / shared account) — keep it. No real SINPE is live yet.
- **Intentional light surfaces (leave alone):** navbar search input field (`NavbarClient.tsx:167`, Amazon-style), the white chip behind colored payment logos (`StepTwo.tsx`), and `QrPage` (/qr — the QR image must stay white to scan).

---

## 3. Pending (needs human verification — not code)

- [ ] **Logged-in smoke test:** account/profile/orders/address, checkout beyond Step 1, and `/admin` (dashboard/product editor were themed blind via className swaps since auth-gated — verify contrast on the dense tables/forms).
- [ ] **End-to-end test purchase** (SINPE not in production yet).
- [ ] Optional next axes (open a new cycle): **accessibility** (focus/aria/contrast), **performance** (image/LCP), or **i18n** (hardcoded Spanish strings remain in parts of checkout/admin).

---

## 4. Operational notes

- `next dev --turbopack` on this Windows/OneDrive path is flaky — dies after a few requests and leaves orphaned `node` processes (caused fork-resource exhaustion at ~36 procs). Kill stray node before restarting; prefer `pnpm typecheck` / `pnpm build` for verification.
- Project memory (auto-loads next session): `theme-sweep-dark-gold.md`, `sinpe-hm-art-reference.md`.

---

*This file is uncommitted — commit or delete as you prefer.*
