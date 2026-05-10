# Contract: `features/currency`

Barrel: `src/features/currency/index.ts`

## Tipos

```ts
export type Currency = "USD" | "CRC" | "EUR";

export interface ConversionResult {
  amount: number;
  from: "USD";
  to: Currency;
  rate: number;
  fetchedAt: string; // ISO
}
```

## Use cases

```ts
export function convertUsd(amount: number, to: Currency): Promise<ConversionResult>;
```

## Componentes

```ts
export { CurrencyConverterRow } from "./presentation/CurrencyConverterRow";
```

## Schemas

```ts
export { convertQuerySchema } from "./application/schemas";
```

## Reglas

- Validación: `amount` ∈ [0.01, 1_000_000]; `to` ∈ whitelist de monedas soportadas.
- Caching: respuesta cacheable por 30 min (`s-maxage=1800`).
- Errores: si el proveedor externo falla, devolver error genérico sin filtrar detalle del proveedor.
