# Contract: `features/currency`

Barrel: `src/features/currency/index.ts`

## Tipos

```ts
export type Currency =
  | "CRC"
  | "EUR"
  | "JPY"
  | "GBP"
  | "CNY"
  | "AUD"
  | "CAD"
  | "CHF"
  | "HKD"
  | "SEK"
  | "MXN";

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

- Validacion: `amount` in [0.01, 1_000_000]; `to` in whitelist de monedas soportadas por la UI (`CRC`, `EUR`, `JPY`, `GBP`, `CNY`, `AUD`, `CAD`, `CHF`, `HKD`, `SEK`, `MXN`).
- Caching: respuesta cacheable por 30 min (`s-maxage=1800`).
- Errores: si el proveedor externo falla, devolver error genÃ©rico sin filtrar detalle del proveedor.

