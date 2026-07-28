// src/shared/seo/JsonLd.tsx
/* --------------------------------------------------------------------------
 *  JsonLd · SobrePoxi — Render de JSON-LD en el HTML SSR
 *
 *  Renderiza schemas schema.org mediante un <script type="application/ld+json">
 *  NATIVO (no next/script). next/script inyecta los schemas en cliente y
 *  Googlebot no siempre los ejecuta, con lo que pierden valor SEO.
 *
 *  Este componente los deja en el HTML inicial que lee el crawler.
 *
 *  Uso:
 *    <JsonLd id="ld-organization" data={orgSchema} />
 *    <JsonLd id="ld-faq" data={generateFAQSchema(faqs)} />
 * ----------------------------------------------------------------------- */

import type { JSX } from "react";

type JsonLdProps = {
  /** Identificador único del <script> dentro del documento. */
  id: string;
  /** Objeto schema.org serializable (se le pasa por JSON.stringify). */
  data: unknown;
};

/**
 * Devuelve un <script type="application/ld+json"> nativo con el schema
 * ya serializado en el HTML que recibe el navegador/crawler.
 */
export function JsonLd({ id, data }: JsonLdProps): JSX.Element {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
