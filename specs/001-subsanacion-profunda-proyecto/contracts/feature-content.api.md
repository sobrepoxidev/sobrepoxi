# Contract: `features/content`

Barrel: `src/features/content/index.ts`

## Tipos

```ts
export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  bodyHtml: string;
  publishedAt: string;
  locale: "es" | "en";
}
```

## Use cases

```ts
export function getHomePageData(locale: string): Promise<{
  categories: Category[];
  products: Product[];
  productsByCategory: Record<number, Product[]>;
}>;
export function getGuides(locale: string): Promise<Guide[]>;
export function getGuideBySlug(locale: string, slug: string): Promise<Guide | null>;
export function createVCard(prevState: unknown, formData: FormData): Promise<{ error?: string; success?: boolean }>;
```

## Componentes

```ts
export { Home } from "./presentation/Home";
export { Navbar } from "./presentation/layout/Navbar";
export { Footer } from "./presentation/layout/Footer";
export { WhatsAppBubble } from "./presentation/layout/WhatsAppBubble";
export { GuidesGrid } from "./presentation/guides/GuidesGrid";
export { ContactForm } from "./presentation/contact/ContactForm";
export { VCardForm } from "./presentation/vcard/VCardForm";
```

## Schemas

```ts
export { contactFormSchema, vcardFormSchema } from "./application/schemas";
```

## Dependencias declaradas

- `@/features/products` (use case `getHomePageData` compone categorías/productos).
- `@/features/notifications` (formularios de contacto).
- `@/shared/i18n` (routing/navigation).
- `@/shared/seo`.
