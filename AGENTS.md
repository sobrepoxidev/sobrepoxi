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
├── app/                    # Next.js App Router
│   ├── [locale]/          # i18n routing (es, en, etc.)
│   │   ├── products/
│   │   ├── product/[id]/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── admin/
│   │   ├── qr/
│   │   └── ...
│   ├── api/               # API routes
│   └── layout.tsx
├── components/            # React components
│   ├── admin/
│   ├── cards/
│   ├── Carousel/
│   ├── checkout/
│   ├── home/
│   ├── products/
│   └── search/
├── context/               # React contexts (CartContext, etc.)
├── lib/                   # Utilities, hooks, supabase
│   └── hooks/
└── i18n/                  # Internationalization
```

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
