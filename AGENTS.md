# Project Agents Documentation

## Project Overview
- **Name**: hands-made-art
- **Type**: E-commerce Next.js 15 application
- **Stack**: Next.js 15 + React 19 + TypeScript + Tailwind CSS 4 + Supabase
- **Package Manager**: pnpm

## Commands

```bash
pnpm install        # Install dependencies
pnpm run dev        # Start development server (turbopack)
pnpm run build      # Production build
pnpm run lint       # ESLint check
pnpm tsc --noEmit   # TypeScript type checking
```

## Scripts (package.json)

```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

## Project Structure

```
src/
├── features/                    # Clean Architecture by feature
│   ├── products/{application,presentation,domain,infrastructure}/
│   ├── cart/{application,presentation}/
│   ├── checkout/{application,presentation,infrastructure}/
│   ├── auth/{application,presentation}/
│   ├── account/{application,presentation}/
│   ├── admin/{application,presentation}/
│   ├── notifications/{application,infrastructure}/
│   ├── content/{application,presentation}/
│   └── currency/{application,infrastructure}/
├── shared/{supabase,i18n,seo,ui,types,utils}/  # Cross-cutting concerns
└── app/[locale]/...            # Thin pages (routing only)
    ├── products/
    ├── product/[id]/
    ├── cart/
    ├── checkout/
    ├── admin/
    ├── qr/
    └── api/                    # Thin API routes delegating to feature use cases
```

**Verification commands** (run after any change):
```bash
pnpm run lint      # ESLint check
pnpm tsc --noEmit  # TypeScript type checking
pnpm run build     # Production build (full verification)
```

**Migration status**: Phase 4 complete (Clean Architecture). Phase 9 pending (deprecated dirs cleanup).

## Key Libraries

- **UI**: Radix UI, Tailwind CSS 4, Framer Motion, Lucide Icons, React Icons
- **E-commerce**: PayPal, Supabase auth/storage
- **i18n**: next-intl
- **Database**: @supabase/supabase-js
- **Email**: nodemailer
- **SEO**: next-intl (i18n routing)

## Notes

- ESLint warnings about `react-hooks/exhaustive-deps` are known and acceptable for this codebase
- `buildTitle` is deprecated — use `buildMetadata` instead
- No test suite configured
- pnpm is the preferred package manager

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->
