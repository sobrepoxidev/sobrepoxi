// Types
export type { UserProfile, ShippingAddress, Order } from './application/distribute';

// Hooks
export { useAccount } from './application/hooks/useAccount';
export { useOrders } from './application/hooks/useOrders';

// Use cases
export { getUserProfile, createUserProfile, updateUserFullName } from './application/use-cases/getUserProfile';
export { updateShippingAddress } from './application/use-cases/updateShippingAddress';
export { getUserOrders } from './application/use-cases/getUserOrders';

// Components
export { default as AccountClient } from './presentation/components/AccountClient';
export { default as ProfileTab } from './presentation/components/ProfileTab';
export { default as AddressTab } from './presentation/components/AddressTab';
export { default as OrdersTab } from './presentation/components/OrdersTab';

// Providers & State
export { useAccountContext } from './presentation/state/AccountContext';
