# Guía de Migración SEO - SobrePoxi

## Resumen de la Unificación SEO

Se ha completado la unificación del sistema SEO de SobrePoxi para maximizar el rendimiento SEO y cumplir con las normas de ESLint y Vercel.

## Cambios Principales

### 1. Configuración Centralizada (`src/lib/seoConfig.ts`)

- **SEO_CONFIG**: Configuración centralizada de la empresa
  - Información de contacto completa
  - Coordenadas geográficas
  - URLs y metadatos por defecto

- **SEO_TEXT**: Textos optimizados por idioma (es/en)
  - Títulos y descripciones específicas
  - Keywords optimizadas
  - Configuración Open Graph mejorada

- **buildMetadata()**: Función principal unificada
  - Control completo de robots y indexación
  - URLs canónicas automáticas
  - Metadatos optimizados para SEO

### 2. Datos Estructurados (`src/lib/structuredData.ts`)

- Esquemas JSON-LD centralizados
- Funciones helper para generar structured data
- Tipos TypeScript para mejor mantenimiento
- Esquemas predefinidos comunes

### 3. Funciones de Compatibilidad (`src/lib/seo.ts`)

- `getCommonMetadata()` y `buildTitle()` marcadas como deprecated
- `generatePageMetadata()` como nueva función helper
- Warnings en consola para migración gradual

## Archivos Migrados

### Layout Principal
- `src/app/[locale]/layout.tsx` - Metadatos y structured data optimizados

### Páginas Migradas al Nuevo Sistema
- `src/app/[locale]/about/page.tsx`
- `src/app/[locale]/contact/page.tsx`
- `src/app/[locale]/epoxy-floors/page.tsx`
- `src/app/[locale]/luxury-design-flooring/page.tsx`
- `src/app/[locale]/industrial-epoxy-flooring/page.tsx`
- `src/app/[locale]/search/page.tsx`

### Páginas Pendientes de Migración
- `src/app/[locale]/vcard/page.tsx`
- `src/app/[locale]/privacy-policies/page.tsx`
- `src/app/[locale]/shipping/page.tsx`
- `src/app/[locale]/conditions-service/page.tsx`
- `src/app/[locale]/account/page.tsx`
- `src/app/[locale]/product/[id]/page.tsx`

## Beneficios SEO Implementados

### 1. Metadatos Optimizados
- Títulos únicos y descriptivos por página
- Meta descriptions optimizadas (150-160 caracteres)
- Keywords específicas por contenido
- Control granular de robots

### 2. Structured Data Mejorado
- Schema.org completo para LocalBusiness
- Datos de contacto y ubicación precisos
- Información de servicios estructurada
- FAQs y breadcrumbs preparados

### 3. Internacionalización
- URLs canónicas por idioma
- Hreflang automático
- Metadatos localizados
- Structured data bilingüe

### 4. Optimización Técnica
- Open Graph completo
- Twitter Cards optimizadas
- Verificación de Google preparada
- Robots.txt friendly

## Uso del Nuevo Sistema

### Migrar una Página Existente

```typescript
// ANTES (deprecated)
import { getCommonMetadata, buildTitle } from "@/lib/seo";

export async function generateMetadata({ params }) {
  return {
    title: buildTitle("Mi Página"),
    ...getCommonMetadata(locale)
  };
}

// DESPUÉS (recomendado)
import { buildMetadata } from "@/lib/seoConfig";

export async function generateMetadata({ params }) {
  const { locale } = params;
  
  return buildMetadata({
    locale: locale === "es" ? "es" : "en",
    pathname: `/${locale}/mi-pagina`,
    title: "Mi Página | SobrePoxi",
    description: "Descripción optimizada para SEO...",
    keywords: "palabras, clave, específicas"
  });
}
```

### Crear Structured Data

```typescript
import { generateServiceSchema, schemaToJsonLd } from "@/lib/structuredData";

const serviceSchema = generateServiceSchema(
  "Nombre del Servicio",
  "Descripción del servicio...",
  "ServiceType",
  "Category"
);

// En el componente
<Script
  id="service-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: schemaToJsonLd(serviceSchema)
  }}
/>
```

## Próximos Pasos

1. **Migrar páginas restantes** al nuevo sistema
2. **Implementar breadcrumbs** usando `generateBreadcrumbSchema()`
3. **Añadir más structured data** específico por página
4. **Configurar Google Search Console** con las nuevas URLs
5. **Monitorear rendimiento SEO** post-migración

## Verificación

- ✅ Servidor de desarrollo funcionando
- ✅ Metadatos generándose correctamente
- ✅ Structured data válido
- ✅ URLs canónicas configuradas
- ✅ Compatibilidad con ESLint y Vercel

## Notas Importantes

- Las funciones deprecated seguirán funcionando pero mostrarán warnings
- La migración es gradual y no rompe funcionalidad existente
- Todos los cambios son compatibles con Next.js 15 y Vercel
- El sistema es extensible para futuras mejoras SEO