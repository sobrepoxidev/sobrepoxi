# Contract: `features/account`

Barrel: `src/features/account/index.ts`

## Tipos

```ts
export interface UserProfile {
  id: string;
  fullName: string | null;
  email: string;
  phone: string | null;
}

export interface UserAddress {
  id: number;
  userId: string;
  line1: string;
  line2: string | null;
  city: string;
  province: string;
  postalCode: string | null;
  country: string;
  isDefault: boolean;
}
```

## Use cases

```ts
export function getUserProfile(userId: string): Promise<UserProfile | null>;
export function updateUserProfile(userId: string, patch: Partial<UserProfile>): Promise<UserProfile>;
export function listUserAddresses(userId: string): Promise<UserAddress[]>;
export function addUserAddress(userId: string, address: Omit<UserAddress, "id" | "userId">): Promise<UserAddress>;
export function listUserOrders(userId: string): Promise<{ id: number; total: number; createdAt: string; paymentStatus: string }[]>;
```

## Componentes

```ts
export { AccountClient } from "./presentation/components/AccountClient";
export { UserDropdown } from "./presentation/components/UserDropdown";
```

## Dependencias declaradas

- `@/features/auth` (sesión).
- `@/shared/supabase`.
